const usersResolvers = require('./users')
const quizResolvers = require('./quizzes')
const scoreResolvers = require('./quizScore')

module.exports = {
    Quiz: {
        userCount(parent, args, ctx, info){
            return parent.users.length
        }
    },
    Query: {
        ...usersResolvers.Query,
        ...quizResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...quizResolvers.Mutation,
        ...scoreResolvers.Mutation
    }
}