const uuidv4 = require('uuid/v4');

const resolvers = {
  Query: {
    me: (parent, args, { me }) => {
      return me;
    },
    user: (parent, { id }, { models }) => {
      return models.users[id];
    },
    users: (parent, args, { models }) => {
      return Object.values(models.users);
    },
    message: (parent, { id }, { models }) => {
      return models.messages[id];
    },
    messages: (parent, args, { models }) => {
      return Object.values(models.messages);
    }
  },
  Mutation: {
    createMessage: (parent, { text }, { me, models }) => {
      const newId = uuidv4();
      const newMessage = {
        id: newId,
        text: text,
        userId: me.id
      };
      models.messages[newId] = newMessage;
      models.users[me.id].messageIds.push(newId);
      return newMessage;
    },
    deleteMessage: (parent, { id }, { models }) => {
      const { [id]: message, ...rest } = models.messages;
      if (!message) {
        return false;
      }
      models.messages = rest;
      return true;
    },
    updateMessage: (parent, { id, text }, { models }) => {
      const message = models.messages[id];
      if (!message) {
        throw new Error('id not found');
      }
      message.text = text;
      return models.messages[id];
    }
  },
  User: {
    messages: (user, args, { models }) => {
      return Object.values(models.messages).filter(
        message => message.userId === user.id
      );
    }
  },
  Message: {
    user: (message, args, { models }) => {
      return models.users[message.userId];
    }
  }
};

module.exports = resolvers;
