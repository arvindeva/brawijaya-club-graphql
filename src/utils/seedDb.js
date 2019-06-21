import models from '../models';

export default async () => {
  await models.User.create(
    {
      username: 'arvindeva',
      email: 'arvindeva@gmail.com',
      password: 'arvindeva',
      messages: [
        {
          text: 'Hello'
        },
        {
          text: 'world'
        },
        {
          text: "I'm EZ"
        }
      ]
    },
    {
      include: [models.Message]
    }
  );
  await models.User.create(
    {
      username: 'sapayoa',
      email: 'sapayoa@gmail.com',
      password: 'sapayoa',
      messages: [
        {
          text: 'Sapa'
        },
        {
          text: 'Yoa!'
        }
      ]
    },
    {
      include: [models.Message]
    }
  );
};
