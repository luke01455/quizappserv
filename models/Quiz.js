const { model, Schema } = require('mongoose');

const quizSchema = new Schema ({
    maxUsers: Number,
    createdAt: String,
    usersScores: [
        {
            score: Number,
            username: String
        }
    ],
    users: [
        {
            username: String,
            password: String,
            createdAt: String
        }
    ]

})

module.exports = model('Quiz', quizSchema)