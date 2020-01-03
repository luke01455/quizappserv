const { AuthenticationError } = require('apollo-server')
const Quiz = require('../../models/Quiz')
const checkAuth = require('../../utils/checkAuth')

module.exports = {
    Query: {
        async getQuiz(){
            try{
                const quizzes = await Quiz.find().sort({ createdAt: -1 });
                return quizzes;
            } catch(err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async createQuiz(parent, { maxUsers }, ctx, info){
            const newQuiz = new Quiz({
                maxUsers,
                createdAt: new Date().toISOString()
            })

            const quiz = await newQuiz.save();

            return quiz;
        },
    }
}  