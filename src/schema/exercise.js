import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    exercises: [Exercise!]!
    exercise(id: ID!): Exercise!
  }

  extend type Mutation {
    createExercise(text: String!): Exercise!
    deleteExercise(id: ID!): Boolean!
    updateExercise(id: ID!, text: String!): Exercise
  }

  type Exercise {
    id: ID!
    type: String!
    sets: Int!
    reps: Int!
    weight: Float!
    user: User!
  }
`;
