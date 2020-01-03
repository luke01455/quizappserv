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
        users: [User!]!
        maxUsers: Int!
        usersScores: [UserScore!]!
        userCount: Int!
    }
    type UserScore {
        id: ID!
        username: String!
        score: String!
        quiz: String!
    }
    type Query {
        getUsers: [User]!
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
    }
`