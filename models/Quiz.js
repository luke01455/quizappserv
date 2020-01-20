const { model, Schema } = require('mongoose');

const quizSchema = new Schema ({
    maxUsers: Number,
    createdAt: String,
    type: String,
    isActive: Boolean,
    usersScores: [
        {
            score: Number,
            username: String,
            createdAt: String,
            userId: String,
            ticketsLow: Number,
            ticketsHigh: Number
        }
    ]
})

module.exports = model('Quiz', quizSchema)