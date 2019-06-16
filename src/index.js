const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true
});

server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
});
