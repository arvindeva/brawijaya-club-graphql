import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isExerciseOwner } from './authorization';

export default {
  Query: {
    exercises: async (_, __, { models }) => {
      return await models.Exercise.findAll();
    },
    exercise: async (_, { id }, { models }) => {
      return await models.Exercise.findByPk(id);
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
