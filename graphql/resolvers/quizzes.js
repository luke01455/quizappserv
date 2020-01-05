const Quiz = require('../../models/Quiz')

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
    }
}  