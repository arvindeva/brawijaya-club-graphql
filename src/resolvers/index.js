const users = {
  1: {
    id: '1',
    username: 'arvindeva',
    email: 'arvindeva@gmail.com',
    messageIds: [1]
  },
  2: {
    id: '2',
    username: 'sapayoa',
    email: 'sapayoa@gmail.com',
    messageIds: [2]
  }
};

const messages = {
  1: {
    id: '1',
    text: 'Hello',
    userId: '1'
  },
  2: {
    id: '2',
    text: 'World',
    userId: '2'
  }
};

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

module.exports = { resolvers, users, messages };
