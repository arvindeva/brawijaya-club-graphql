const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String!
    me: User
  }

  type User {
    username: String!
  }
`;

module.exports = typeDefs;
