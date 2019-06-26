import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    exercises: [Exercise!]!
    exercise(id: ID!): Exercise!
    exercisesByName(name: String!): [Exercise!]!
    leaderboards(name: String!): [Exercise!]!
  }

  extend type Mutation {
    createExercise(
      name: String!
      sets: Int!
      reps: Int!
      weight: Float!
    ): Exercise!
    deleteExercise(id: ID!): Boolean!
    updateExercise(
      id: ID!
      name: String!
      sets: Int!
      reps: Int!
      weight: Float!
    ): Exercise
  }

  type Exercise {
    id: ID!
    name: String!
    sets: Int!
    reps: Int!
    weight: Float!
    user: User!
    comment: String
    createdAt: Date!
    updatedAt: Date!
  }
`;
