let users = {
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

let messages = {
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

module.exports = { users, messages };
