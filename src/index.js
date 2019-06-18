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

// dev server
app.listen({ port: 8000 }, () => {
  console.log(`🚀 Server ready at http://localhost:8000/graphql`);
});
