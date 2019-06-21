import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import hidePoweredBy from 'hide-powered-by';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';
import seedDb from './utils/seedDb';

const app = express();

app.use(hidePoweredBy({ setTo: 'PHP 6.6.6' }));
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  formatError: error => {
    const message = error.message.replace('Validation error: ', '');
    return {
      ...error,
      message
    };
  },
  context: async () => ({
    models: models,
    me: await models.User.findByLogin('arvindeva'),
    secret: process.env.SECRET
  }),
  playground: true
});

server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    seedDb();
  }

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  });
});
