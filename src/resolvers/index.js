import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './user';
import exerciseResolvers from './exercise';

const customScalarResolvers = {
  Date: GraphQLDateTime
};

export default [customScalarResolvers, userResolvers, exerciseResolvers];
