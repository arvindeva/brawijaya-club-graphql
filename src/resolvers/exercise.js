import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isExerciseOwner } from './authorization';

export default {
  Query: {
    exercises: async (parent, args, { models }) => {
      return await models.Exercise.findAll();
    },
    exercise: async (parent, { id }, { models }) => {
      return await models.Exercise.findByPk(id);
    }
  },
  Mutation: {
    createExercise: combineResolvers(
      isAuthenticated,
      async (parent, args, { me, models }) => {
        try {
          return await models.Exercise.create({
            args,
            userId: me.id
          });
        } catch (error) {
          throw new Error(error);
        }
      }
    ),
    deleteExercise: combineResolvers(
      isExerciseOwner,
      async (parent, { id }, { models }) => {
        return await models.Exercise.destroy({ where: { id } });
      }
    ),
    updateExercise: async (parent, args, { models }) => {
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
  },
  Exercise: {
    user: async (exercise, args, { models }) => {
      return await models.User.findByPk(exercise.userId);
    }
  }
};
