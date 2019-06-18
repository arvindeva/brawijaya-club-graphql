const users = [
  {
    id: 1,
    username: 'arvindeva',
    email: 'arvindeva@gmail.com'
  },
  {
    id: 2,
    username: 'sapayoa',
    email: 'sapayoa@gmail.com'
  }
];

const resolvers = {
  Query: {
    me: (parent, args, context) => {
      return context.me;
    },
    user: (parent, { id }) => {
      return users[id - 1];
    },
    users: () => {
      return users;
    }
  }
};

module.exports = { resolvers, users };
