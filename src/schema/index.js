import { gql } from 'apollo-server-express';

import userSchema from './user';
import exerciseSchema from './exercise';

const schema = gql`
  scalar Date

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

export default [schema, userSchema, exerciseSchema];
