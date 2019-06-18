const { gql } = require('apollo-server-express');

const userSchema = require('./user');
const messageSchema = require('./message');

const schema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

module.exports = [schema, userSchema, messageSchema];
