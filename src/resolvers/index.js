const resolvers = {
  Query: {
    hello: () => 'Hello',
    me: () => {
      return {
        username: 'Test'
      };
    }
  }
};

module.exports = resolvers;
