const { AuthenticationError, UserInputError } = require('apollo-server')
const Quiz = require('../../models/Quiz')
const checkAuth = require('../../utils/checkAuth')

module.exports = {
    Mutation: {
        async createScore(parent, { quizId, score }, ctx, info){
            //authorization
            const user = checkAuth(ctx)

            const quiz = await Quiz.findById(quizId)

            if(quiz){
                quiz.usersScores.unshift({
                    score,
                    username: user.username,
                    createdAt: new Date().toISOString(),
                    userId: user.id
                })
                await quiz.save()
                return quiz
            } else throw new UserInputError('Quiz not found')
        }
    }
}  