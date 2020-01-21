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
                    userId: user.id,
                    ticketsLow: quiz.usersScores.length * 6 + 1,
                    ticketsHigh: quiz.usersScores.length * 6 + 1,
                })
                if(quiz.usersScores.length >= quiz.maxUsers) {
                    const newQuiz = new Quiz({
                        maxUsers: quiz.maxUsers,
                        type: quiz.type,
                        isActive: true,
                        createdAt: new Date().toISOString()
                    }) 
                    await newQuiz.save();
                }
                if(quiz.usersScores.length >= quiz.maxUsers) {
                    quiz.isActive = 'filled'
                    await quiz.save()
                    return quiz
                }


                await quiz.save()
                return quiz
            } else throw new UserInputError('Quiz not found')
        },
        async updateScore(parent, { quizId, scoreId, score}, ctx, info){
            const user = checkAuth(ctx)

            const quiz = await Quiz.findById(quizId)

            if(quiz){
                const userScore = quiz.usersScores.find(el => el.id = scoreId)


                if(userScore) {
                    userScore.score = score
                    userScore.ticketsHigh = userScore.ticketsLow + score
                    await quiz.save()
                    return quiz
                }

            }
        }
    }
}  