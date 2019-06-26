import models from '../models';

export default async () => {
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
          weight: 80
        },
        {
          name: 'bench',
          reps: 5,
          sets: 5,
          weight: 60
        },
        {
          name: 'bench',
          reps: 5,
          sets: 5,
          weight: 70
        },
        {
          name: 'squat',
          reps: 5,
          sets: 5,
          weight: 70
        },
        {
          name: 'deadlift',
          reps: 5,
          sets: 5,
          weight: 90
        },
        {
          name: 'overhead_press',
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
          name: 'bench',
          reps: 12,
          sets: 4,
          weight: 30
        },
        {
          name: 'squat',
          reps: 12,
          sets: 2,
          weight: 70
        },
        {
          name: 'deadlift',
          reps: 6,
          sets: 4,
          weight: 70
        },
        {
          name: 'overhead_press',
          reps: 6,
          sets: 4,
          weight: 70
        },
        {
          name: 'deadlift',
          reps: 6,
          sets: 4,
          weight: 50
        }
      ]
    },
    {
      include: [models.Exercise]
    }
  );
  await models.User.create(
    {
      username: 'matt',
      email: 'matt@gmail.com',
      password: 'matt1234',
      exercises: [
        {
          name: 'bench',
          reps: 12,
          sets: 4,
          weight: 30
        },
        {
          name: 'squat',
          reps: 5,
          sets: 2,
          weight: 120
        },
        {
          name: 'deadlift',
          reps: 6,
          sets: 4,
          weight: 70
        },
        {
          name: 'overhead_press',
          reps: 5,
          sets: 4,
          weight: 40
        },
        {
          name: 'bench',
          reps: 5,
          sets: 4,
          weight: 80
        },
        {
          name: 'squat',
          reps: 5,
          sets: 4,
          weight: 110
        },
        {
          name: 'deadlift',
          reps: 6,
          sets: 4,
          weight: 100
        }
      ]
    },
    {
      include: [models.Exercise]
    }
  );
  await models.User.create(
    {
      username: 'jeff',
      email: 'jeff@gmail.com',
      password: 'jeff1234',
      exercises: [
        {
          name: 'bench',
          reps: 12,
          sets: 4,
          weight: 50
        },
        {
          name: 'bench',
          reps: 5,
          sets: 2,
          weight: 60
        },
        {
          name: 'bench',
          reps: 6,
          sets: 4,
          weight: 70
        },
        {
          name: 'overhead_press',
          reps: 5,
          sets: 4,
          weight: 50
        },
        {
          name: 'overhead_press',
          reps: 5,
          sets: 4,
          weight: 40
        },
        {
          name: 'overhead_press',
          reps: 5,
          sets: 4,
          weight: 45
        },
        {
          name: 'deadlift',
          reps: 6,
          sets: 4,
          weight: 90
        },
        {
          name: 'deadlift',
          reps: 6,
          sets: 4,
          weight: 110
        },
        {
          name: 'deadlift',
          reps: 6,
          sets: 4,
          weight: 115
        },
        {
          name: 'squat',
          reps: 6,
          sets: 4,
          weight: 80
        },
        {
          name: 'squat',
          reps: 6,
          sets: 4,
          weight: 90
        },
        {
          name: 'squat',
          reps: 6,
          sets: 4,
          weight: 95
        },
        {
          name: 'squat',
          reps: 6,
          sets: 4,
          weight: 97.5
        }
      ]
    },
    {
      include: [models.Exercise]
    }
  );
  await models.User.create(
    {
      username: 'anwar',
      email: 'anwar@gmail.com',
      password: 'anwar1234',
      exercises: [
        {
          name: 'bench',
          reps: 12,
          sets: 4,
          weight: 20
        },
        {
          name: 'bench',
          reps: 5,
          sets: 2,
          weight: 30
        },
        {
          name: 'bench',
          reps: 6,
          sets: 4,
          weight: 40
        },
        {
          name: 'overhead_press',
          reps: 5,
          sets: 4,
          weight: 20
        },
        {
          name: 'overhead_press',
          reps: 5,
          sets: 4,
          weight: 25
        },
        {
          name: 'overhead_press',
          reps: 5,
          sets: 4,
          weight: 30
        },
        {
          name: 'deadlift',
          reps: 6,
          sets: 4,
          weight: 50
        },
        {
          name: 'deadlift',
          reps: 6,
          sets: 4,
          weight: 55
        },
        {
          name: 'deadlift',
          reps: 6,
          sets: 4,
          weight: 60
        },
        {
          name: 'squat',
          reps: 6,
          sets: 4,
          weight: 35
        },
        {
          name: 'squat',
          reps: 6,
          sets: 4,
          weight: 40
        },
        {
          name: 'squat',
          reps: 6,
          sets: 4,
          weight: 50
        },
        {
          name: 'squat',
          reps: 6,
          sets: 4,
          weight: 42.5
        }
      ]
    },
    {
      include: [models.Exercise]
    }
  );
};
