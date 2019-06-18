export default {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findOne({
        where: {
          id: id
        }
      });
    },
    me: async (parent, args, { models, me }) => {
      return await models.User.findOne({
        where: {
          id: me.id
        }
      });
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
