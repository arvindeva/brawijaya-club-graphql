import models from '../models';

export default async () => {
  await models.User.create(
    {
      username: 'arvindeva',
      email: 'arvindeva@gmail.com',
      password: 'arvindeva',
      exercises: [
        {
          type: 'bench',
          reps: 5,
          sets: 5,
          weight: 50
        },
        {
          type: 'squat',
          reps: 5,
          sets: 5,
          weight: 70
        },
        {
          type: 'deadlift',
          reps: 5,
          sets: 5,
          weight: 90
        }
      ]
    },
    {
      include: [models.Exercise]
    }
  );
  await models.User.create(
    {
      username: 'sapayoa',
      email: 'sapayoa@gmail.com',
      password: 'sapayoa',
      exercises: [
        {
          type: 'bench',
          reps: 12,
          sets: 4,
          weight: 30
        },
        {
          type: 'squat',
          reps: 12,
          sets: 2,
          weight: 70
        },
        {
          type: 'deadlift',
          reps: 6,
          sets: 4,
          weight: 70
        }
      ]
    },
    {
      include: [models.Exercise]
    }
  );
};
