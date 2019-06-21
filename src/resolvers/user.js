import { AuthenticationError, UserInputError } from 'apollo-server';
import jwt from 'jsonwebtoken';

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
      const { models, secret, res } = context;

      // TODO: Input validation

      // Create the user
      const user = await models.User.create({
        username,
        email,
        password
      });

      // Generate new token
      const token = jwt.sign({ user }, secret);

      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 31
      });

      return { token };
    },
    signIn: async (_, args, context) => {
      const { login, password } = args;
      const { models, secret, res } = context;

      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError('No user found with this login credential');
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid Password');
      }
      const token = jwt.sign({ user }, secret);

      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 31
      });

      return { token };
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
