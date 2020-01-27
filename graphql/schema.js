const { gql } = require('apollo-server');

module.exports = gql`
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
        usersScores: [UserScore]
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Quiz {
        id: ID!
        quizType: String!
        maxUsers: Int!
        createdAt: String!
        usersScores: [UserScore]
        userCount: Int!
        isActive: String!
        winner: String!
        price: Float!
    }
    type UserScore {
        id: ID!
        username: String!
        score: Int!
        quiz: String!
        createdAt: String!
        userId: String!
        ticketsLow: Int!
        ticketsHigh: Int!
        quizType: String!
        price: Float!
    }
    type Query {
        getUsers: [User]!
        getQuiz: [Quiz]!
        getThisQuiz(quizId: String!): Quiz!
        getMyScores: [UserScore]
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createQuiz(maxUsers: Int!, quizType: String!, price: Float!): Quiz!
        createScore(quizId: String!, score: Int!): Quiz!
        updateScore(quizId: String!, scoreId: String!, score: Int!): Quiz!
        endQuiz(quizId: String!): Quiz!
        drawWinner: Quiz
    }
`