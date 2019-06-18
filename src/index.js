const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const models = require('./models');

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models: models,
    me: models.users[1]
  },
  playground: true
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
});
