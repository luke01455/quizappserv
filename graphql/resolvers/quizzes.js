const Quiz = require('../../models/Quiz')
const { UserInputError } = require('apollo-server')
const checkAuth = require('../../utils/checkAuth')
let moment = require('moment');
var now = moment();

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
                isActive: true,
                createdAt: new Date().toISOString()
            })

            const quiz = await newQuiz.save();
            return quiz;
        },
        async endQuiz(parent, { quizId }, ctx, info){
            const user = checkAuth(ctx)

            const quiz = await Quiz.findById(quizId)

            if (!quiz) {
                throw new UserInputError('Quiz not found', {
                    error: {
                        quiz: 'quiz doesnt exist'
                    }
                })
            }
            if (!user) {
                throw new UserInputError('Please log in', {
                    error: {
                        user: 'user not logged in'
                    }
                })
            }

            if(quiz && user){
                quiz.isActive = false;
                await quiz.save()
                return quiz
            }

        },
        async drawWinner(parent, args, ctx, info){
            try{
            const quizzes = await Quiz.find()
            const quizzesInActive = quizzes.filter(quiz => quiz.isActive === false)
            const quizIsReady = quizzesInActive.filter(quiz => moment(quiz.usersScores[0].createdAt).add(30, 'minutes') < now)
            return quizIsReady;
        } catch(err) {
            throw new Error(err)
        }
        }
    }
}  