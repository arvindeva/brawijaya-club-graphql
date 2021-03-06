import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]
  }

  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): Token!
    signIn(login: String!, password: String!): Token!
    signOut: String!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    exercises: [Exercise!]
    createdAt: String!
    updatedAt: String!
  }
`;
