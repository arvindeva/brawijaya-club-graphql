const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]
    message(id: ID!): Message
    messages: [Message!]
  }

  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
    updateMessage(id: ID!, text: String!): Message
  }

  type User {
    id: ID!
    username: String!
    email: String!
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;

module.exports = typeDefs;
