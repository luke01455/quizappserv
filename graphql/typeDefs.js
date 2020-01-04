const { gql } = require('apollo-server');

module.exports = gql`
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Quiz {
        id: ID!
        users: [User]
        maxUsers: Int!
        createdAt: String!
        usersScores: [UserScore]
        userCount: Int!
    }
    type UserScore {
        id: ID!
        username: String!
        score: Int!
        quiz: String!
        createdAt: String!
    }
    type Query {
        getUsers: [User]!
        getQuiz: [Quiz]!
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createQuiz(maxUsers: Int!): Quiz!
        createScore(quizId: String!, score: Int!): Quiz!
    }
`