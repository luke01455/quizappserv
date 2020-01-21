const Quiz = require('../../models/Quiz')
const { UserInputError } = require('apollo-server')
const checkAuth = require('../../utils/checkAuth')
let moment = require('moment');
let now = moment();

module.exports = {
    Query: {
        async getQuiz(){
            try{
                const quizzes = await Quiz.find().sort({ createdAt: -1 });
                return quizzes;
            } catch(err) {
                throw new Error(err)
            }
        },
        async getThisQuiz(parent, { quizId }, ctx, info){
            const quiz = await Quiz.findById(quizId)

            if (!quiz) {
                throw new UserInputError('Quiz not found', {
                    error: {
                        quiz: 'quiz doesnt exist'
                    }
                })
            }
            if(quiz){
                return quiz
            }

        }
    },
    Mutation: {
        async createQuiz(parent, { maxUsers, type }, ctx, info){
            const newQuiz = new Quiz({
                maxUsers,
                type,
                winner: 'undrawn',
                isActive: 'filling',
                createdAt: new Date().toISOString()
            })

            const quiz = await newQuiz.save();
            return quiz;
        },
        async drawWinner(parent, args, ctx, info){
            try{
            const quizzes = await Quiz.find()
            const quizzesInActive = quizzes.filter(quiz => quiz.isActive === false)
            const quizIsReady = quizzesInActive.filter(quiz => moment(quiz.usersScores[0].createdAt).add(1, 'second') < now)
            quizzesInActive.forEach(function(quiz){
                if(quiz.winner === 'undrawn') {
                    quiz.winner = 'drawn'
                    quiz.isActive = 'complete'
                }
            })
            return quizIsReady;
        } catch(err) {
            throw new Error(err)
        }
        }
    }
}  