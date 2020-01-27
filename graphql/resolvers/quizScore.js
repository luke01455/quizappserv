const { AuthenticationError, UserInputError } = require('apollo-server')
const Quiz = require('../../models/Quiz')
const User = require('../../models/User')
const checkAuth = require('../../utils/checkAuth')

module.exports = {
    Mutation: {
        async createScore(parent, { quizId, score }, ctx, info){
            //authorization
            const user = checkAuth(ctx)
            const thisUser = await User.findById(user.id)

            const quiz = await Quiz.findById(quizId)
            

            if(quiz){
                thisUser.usersScores.unshift({
                    score,
                    username: user.username,
                    createdAt: new Date().toISOString(),
                    userId: user.id,
                    ticketsLow: quiz.usersScores.length * 6 + 1,
                    ticketsHigh: quiz.usersScores.length * 6 + 1,
                    quiz: quizId,
                    price: quiz.price,
                    quizType: quiz.quizType
                })
                quiz.usersScores.unshift({
                    score,
                    username: user.username,
                    createdAt: new Date().toISOString(),
                    userId: user.id,
                    ticketsLow: quiz.usersScores.length * 6 + 1,
                    ticketsHigh: quiz.usersScores.length * 6 + 1,
                    quiz: quizId,
                    price: quiz.price,
                    quizType: quiz.quizType
                })

                await thisUser.save()

                if(quiz.usersScores.length >= quiz.maxUsers) {
                    const newQuiz = new Quiz({
                        maxUsers: quiz.maxUsers,
                        quizType: quiz.quizType,
                        price: quiz.price,
                        isActive: 'filling',
                        winner: 'undrawn',
                        createdAt: new Date().toISOString()
                    }) 
                    await newQuiz.save()
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
            const thisUser = await User.findById(user.id)

            const quiz = await Quiz.findById(quizId)

            if(quiz){
                const userScore = quiz.usersScores.find(el => el.id = scoreId)

                // find latest userscore by user and update it
                thisUser.usersScores[0].score = score
                thisUser.usersScores[0].ticketsHigh = thisUser.usersScores[0].ticketsLow + score
                await thisUser.save()

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