import { AuthenticationError, UserInputError } from 'apollo-server';

import createToken from '../utils/createToken';

export default {
  Query: {
    me: async (_, __, { models, me }) => {
      if (!me) {
        return null;
      }
      return await models.User.findByPk(me.id);
    },
    users: async (_, __, { models }) => {
      return await models.User.findAll();
    },
    user: async (_, { id }, { models }) => {
      return await models.User.findByPk(id);
    }
  },

  Mutation: {
    signUp: async (_, args, context) => {
      const { username, email, password } = args;
      const { models, secret } = context;
      const user = await models.User.create({
        username,
        email,
        password
      });

      return { token: createToken(user, secret, '30m') };
    },
    signIn: async (_, args, context) => {
      const { login, password } = args;
      const { models, secret } = context;

      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError('No user found with this login credential');
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid Password');
      }

      return { token: createToken(user, secret, '30m') };
    }
  },

  User: {
    messages: async (user, _, { models }) => {
      return await models.Message.findAll({
        where: {
          userId: user.id
        }
      });
    }
  }
};
