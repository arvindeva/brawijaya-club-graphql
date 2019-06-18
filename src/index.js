const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
});
