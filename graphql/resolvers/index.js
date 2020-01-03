const usersResolvers = require('./users')
const quizResolvers = require('./quizzes')

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
        ...quizResolvers.Mutation
    }
}