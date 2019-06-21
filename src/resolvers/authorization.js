import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');

export const isMessageOwner = async (parent, args, context) => {
  const message = await context.models.Message.findByPk(args.id, { raw: true });

  if (message.userId !== context.me.id) {
    throw new ForbiddenError('Not authenticated as owner');
  }

  return skip;
};
