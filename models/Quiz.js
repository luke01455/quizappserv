const { model, Schema } = require('mongoose');

const userSchema = new Schema ({
    maxUsers: Int,
    userScore: [
        {
            score: Int,
            username: String
        }
    ],
    users: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }

})

module.exports = model('User', userSchema)