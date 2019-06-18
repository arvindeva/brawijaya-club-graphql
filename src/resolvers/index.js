const uuidv4 = require('uuid/v4');
let { users, messages } = require('../models');

const resolvers = {
  Query: {
    me: (parent, args, { me }) => {
      return me;
    },
    user: (parent, { id }) => {
      return users[id];
    },
    users: () => {
      return Object.values(users);
    },
    message: (parent, { id }) => {
      return messages[id];
    },
    messages: () => {
      return Object.values(messages);
    }
  },
  Mutation: {
    createMessage: (parent, { text }, { me }) => {
      const newId = uuidv4();
      const newMessage = {
        id: newId,
        text: text,
        userId: me.id
      };
      messages[newId] = newMessage;
      users[me.id].messageIds.push(newId);
      return newMessage;
    },
    deleteMessage: (parent, { id }) => {
      const { [id]: message, ...rest } = messages;
      if (!message) {
        return false;
      }
      messages = rest;
      return true;
    },
    updateMessage: (parent, { id, text }) => {
      const message = messages[id];
      if (!message) {
        let err = new Error('Id not found');
        console.error(err);
        throw err;
      }
      message.text = text;
      return messages[id];
    }
  },
  User: {
    messages: user => {
      return Object.values(messages).filter(
        message => message.userId === user.id
      );
    }
  },
  Message: {
    user: message => {
      return users[message.userId];
    }
  }
};

module.exports = resolvers;
