const { AuthenticationError, UserInputError } = require('apollo-server')
const Quiz = require('../../models/Quiz')
const checkAuth = require('../../utils/checkAuth')

module.exports = {
    Mutation: {
        async createScore(parent, { quizId, score }, ctx, info){
            //authorization
            const { username } = checkAuth(ctx)

            const quiz = await Quiz.findById(quizId)

            if(quiz){
                quiz.usersScores.unshift({
                    score,
                    username,
                    createdAt: new Date().toISOString()
                })
                await quiz.save()
                return quiz
            } else throw new UserInputError('Quiz not found')
        }
    }
}  