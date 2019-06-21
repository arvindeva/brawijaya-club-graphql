import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isMessageOwner } from './authorization';

export default {
  Query: {
    messages: async (parent, args, { models }) => {
      return await models.Message.findAll();
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findByPk(id);
    }
  },
  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { me, models }) => {
        try {
          return await models.Message.create({
            text,
            userId: me.id
          });
        } catch (error) {
          throw new Error(error);
        }
      }
    ),
    deleteMessage: combineResolvers(
      isMessageOwner,
      async (parent, { id }, { models }) => {
        return await models.Message.destroy({ where: { id } });
      }
    ),
    updateMessage: async (parent, { id, text }, { models }) => {
      try {
        // the update method returns [total updated rows, [updated rows]]
        const updatedMessage = await models.Message.update(
          {
            text: text
          },
          { returning: true, where: { id: id } }
        );
        return updatedMessage[1][0];
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Message: {
    user: async (message, args, { models }) => {
      return await models.User.findByPk(message.userId);
    }
  }
};
