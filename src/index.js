import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  context: async () => ({
    models: models,
    me: await models.User.findByLogin('arvindeva')
  }),
  playground: true
});

server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  });
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'arvindeva',
      messages: [
        {
          text: 'Hello'
        }
      ]
    },
    {
      include: [models.Message]
    }
  );
  await models.User.create(
    {
      username: 'sapayoa',
      messages: [
        {
          text: 'Sapa'
        },
        {
          text: 'Yoa!'
        }
      ]
    },
    {
      include: [models.Message]
    }
  );
};
