const { model, Schema } = require('mongoose');

const quizSchema = new Schema ({
    maxUsers: Number,
    createdAt: String,
    usersScores: [
        {
            score: Number,
            username: String,
            createdAt: String
        }
    ],
    users: [
        {
            username: String,
            createdAt: String
        }
    ]

})

module.exports = model('Quiz', quizSchema)