const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]
  }

  type User {
    id: ID!
    username: String!
    email: String!
    messages: [Message!]
  }
`;
