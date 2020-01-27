const { model, Schema } = require('mongoose');

const userSchema = new Schema ({
    username: String,
    password: String,
    email: String,
    createdAt: String,
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

module.exports = model('User', userSchema)