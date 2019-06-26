import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isExerciseOwner } from './authorization';
import { sequelize } from '../models/';

export default {
  Query: {
    exercises: async (_, __, { models }) => {
      return await models.Exercise.findAll();
    },
    exercise: async (_, { id }, { models }) => {
      return await models.Exercise.findByPk(id);
    },
    exercisesByName: async (_, args, { models }) => {
      return await models.Exercise.findAll({
        where: {
          name: args.name
        },
        order: [['weight', 'DESC']]
      });
    },
    leaderboards: async (_, args, { models }) => {
      console.log(models);
      return await sequelize.query(
        `
        SELECT
          *
        FROM
          exercises
        WHERE
          NOT EXISTS (
            SELECT * 
            FROM exercises AS lookup 
            WHERE "userId" = exercises."userId"
            AND name = exercises.name
            AND weight > exercises.weight
        ) AND name ='${args.name}'
        ORDER BY
          weight DESC;
        `,
        {
          type: sequelize.QueryTypes.SELECT
        }
      );
    }
  },
  Mutation: {
    createExercise: combineResolvers(
      isAuthenticated,
      async (_, args, { me, models }) => {
        try {
          return await models.Exercise.create({
            ...args,
            userId: me.id
          });
        } catch (error) {
          throw new Error(error);
        }
      }
    ),
    deleteExercise: combineResolvers(
      isAuthenticated,
      isExerciseOwner,
      async (_, { id }, { models }) => {
        return await models.Exercise.destroy({ where: { id } });
      }
    ),
    updateExercise: combineResolvers(
      isAuthenticated,
      isExerciseOwner,
      async (_, args, { models }) => {
        try {
          // the update method returns [total updated rows, [updated rows]]
          const updatedExercise = await models.Exercise.update(
            {
              ...args
            },
            { returning: true, where: { id: args.id } }
          );
          return updatedExercise[1][0];
        } catch (error) {
          throw new Error(error);
        }
      }
    )
  },
  Exercise: {
    user: async (exercise, _, { models }) => {
      return await models.User.findByPk(exercise.userId);
    }
  }
};
