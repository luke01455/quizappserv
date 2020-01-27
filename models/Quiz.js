const { model, Schema } = require('mongoose');

const quizSchema = new Schema ({
    maxUsers: Number,
    createdAt: String,
    quizType: String,
    isActive: String,
    winner: String,
    price: Number,
    usersScores: [
        {
            score: Number,
            username: String,
            createdAt: String,
            userId: String,
            ticketsLow: Number,
            ticketsHigh: Number,
            quiz: String,
            price: Number,
            quizType: String
        }
    ]
})

module.exports = model('Quiz', quizSchema)