import 'dotenv/config';
import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import cors from 'cors';
import hidePoweredBy from 'hide-powered-by';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';
import seedDb from './utils/seedDb';

const getMe = async req => {
  const { token } = req.cookies;
  if (token) {
    try {
      return await jwt.verify(token, process.env.USER_SECRET);
    } catch (error) {
      throw new AuthenticationError('Your session has expired');
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    const me = await getMe(req);
    return {
      ...req,
      models,
      me: me && me.user,
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
    seedDb(new Date());
  }

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  });
});
