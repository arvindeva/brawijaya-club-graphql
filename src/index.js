import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import hidePoweredBy from 'hide-powered-by';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';
import seedDb from './utils/seedDb';

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    return {
      ...req,
      models,
      me: await models.User.findByLogin('arvindeva'),
      secret: process.env.USER_SECRET
    };
  },
  playground: true
});

const app = express();

var corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
};

app.use(hidePoweredBy({ setTo: 'PHP 4.2.0' }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.USER_SECRET);
    req.userId = userId;
  }
  next();
});

app.use(async (req, res, next) => {
  if (!req.userId) return next();
  const user = await models.findByPk({
    where: { id: req.userId }
  });
  req.user = user;
  next();
});

server.applyMiddleware({
  app: app,
  path: '/graphql',
  cors: false
});

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    seedDb();
  }

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  });
});
