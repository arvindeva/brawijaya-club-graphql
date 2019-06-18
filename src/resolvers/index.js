let users = {
  1: {
    id: '1',
    username: 'arvindeva',
    email: 'arvindeva@gmail.com'
  },
  2: {
    id: '2',
    username: 'sapayoa',
    email: 'sapayoa@gmail.com'
  }
};

const me = users[1];

const resolvers = {
  Query: {
    me: () => {
      return me;
    },
    user: (parent, args) => {
      return users[args.id];
    },
    users: () => {
      return Object.values(users);
    }
  }
};

module.exports = resolvers;
