const { model, Schema } = require('mongoose');

const quizSchema = new Schema ({
    maxUsers: Number,
    createdAt: String,
    type: String,
    isActive: String,
    winner: String,
    usersScores: [
        {
            score: Number,
            username: String,
            createdAt: String,
            userId: String,
            ticketsLow: Number,
            ticketsHigh: Number,
            quiz: String
        }
    ]
})

module.exports = model('Quiz', quizSchema)