import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Must be logged in.');

export const isExerciseOwner = async (parent, args, context) => {
  const exercise = await context.models.Exercise.findByPk(args.id, {
    raw: true
  });

  if (exercise.userId !== context.me.id) {
    throw new ForbiddenError('Not authenticated as owner');
  }

  return skip;
};
