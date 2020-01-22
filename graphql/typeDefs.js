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
        type: String!
        maxUsers: Int!
        createdAt: String!
        usersScores: [UserScore]
        userCount: Int!
        isActive: String!
        winner: String!
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
    }
    type Query {
        getUsers: [User]!
        getQuiz: [Quiz]!
        getThisQuiz(quizId: String!): Quiz!
        
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createQuiz(maxUsers: Int!, type: String!): Quiz!
        createScore(quizId: String!, score: Int!): Quiz!
        updateScore(quizId: String!, scoreId: String!, score: Int!): Quiz!
        endQuiz(quizId: String!): Quiz!
        drawWinner: Quiz!
    }
`