import models from '../models';

export default async date => {
  await models.User.create(
    {
      username: 'arvindeva',
      email: 'arvindeva@gmail.com',
      password: 'arvindeva',
      exercises: [
        {
          name: 'bench',
          reps: 5,
          sets: 5,
          weight: 50,
          createdAt: date.setSeconds(date.getSeconds() + 1),
          updatedAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          name: 'bench',
          reps: 5,
          sets: 5,
          weight: 60,
          createdAt: date.setSeconds(date.getSeconds() + 1),
          updatedAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          name: 'bench',
          reps: 5,
          sets: 5,
          weight: 70,
          createdAt: date.setSeconds(date.getSeconds() + 1),
          updatedAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          name: 'squat',
          reps: 5,
          sets: 5,
          weight: 70,
          createdAt: date.setSeconds(date.getSeconds() + 1),
          updatedAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          name: 'deadlift',
          reps: 5,
          sets: 5,
          weight: 90,
          createdAt: date.setSeconds(date.getSeconds() + 1),
          updatedAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          name: 'overhead_press',
          reps: 5,
          sets: 5,
          weight: 90,
          createdAt: date.setSeconds(date.getSeconds() + 1),
          updatedAt: date.setSeconds(date.getSeconds() + 1)
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
          name: 'bench',
          reps: 12,
          sets: 4,
          weight: 30,
          createdAt: date.setSeconds(date.getSeconds() + 1),
          updatedAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          name: 'squat',
          reps: 12,
          sets: 2,
          weight: 70,
          createdAt: date.setSeconds(date.getSeconds() + 1),
          updatedAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          name: 'deadlift',
          reps: 6,
          sets: 4,
          weight: 70,
          createdAt: date.setSeconds(date.getSeconds() + 1),
          updatedAt: date.setSeconds(date.getSeconds() + 1)
        }
      ]
    },
    {
      include: [models.Exercise]
    }
  );
};
