const createToken = async user => {
  return user;
};

export default {
  Query: {
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }
      return await models.User.findByPk(me.id);
    },
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findByPk(id);
    }
  },

  Mutation: {
    signUp: async (parent, args, { models }) => {
      const { username, email, password } = args;
      const user = await models.User.create({
        username,
        email,
        password
      });

      return { token: createToken(user) };
    }
  },

  User: {
    messages: async (user, args, { models }) => {
      return await models.Message.findAll({
        where: {
          userId: user.id
        }
      });
    }
  }
};
