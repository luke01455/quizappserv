const Quiz = require('../../models/Quiz')
const { UserInputError } = require('apollo-server')
const checkAuth = require('../../utils/checkAuth')
let moment = require('moment');
let now = moment();

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
        async createQuiz(parent, { maxUsers, quizType, price }, ctx, info){
            const newQuiz = new Quiz({
                maxUsers,
                quizType,
                price,
                winner: 'undrawn',
                isActive: 'filling',
                createdAt: new Date().toISOString()
            })

            const quiz = await newQuiz.save();
            return quiz;
        },
        async drawWinner(parent, args, ctx, info){
            console.log('starting draw')
            // console.log(Date.now())
            try{
            const quizzes = await Quiz.find()
            const quizzesInActive = quizzes.filter(quiz => quiz.isActive === 'filled')
            const quizIsReady = quizzesInActive.find(quiz => moment(quiz.usersScores[0].createdAt).add(15, 'minutes') < Date.now())
            if(quizIsReady){
                if(quizIsReady.winner === 'undrawn') {
                    const highTicket = quizIsReady.usersScores[0].ticketsHigh
                    
                    

                    const drawUser = async () => {
                        const winningTicket = Math.floor(Math.random() * highTicket) + 1
                        const winningUser = Math.floor(winningTicket / 6)
                        const reversedArray = quizIsReady.usersScores.reverse()
                        // console.log(winningTicket, "winning ticket")
                        // console.log(winningUser, "winning user")
                        // console.log(reversedArray, "array")
                        
                        if(reversedArray[winningUser].ticketsHigh >= winningTicket 
                            && 
                            reversedArray[winningUser].ticketsLow <= winningTicket) {
                                return reversedArray[winningUser].username
                            } else {
                                drawUser()
                            }
                    }

                    const winner = await drawUser()
                        console.log('got here')
                        console.log('winner', winner)
                        quizIsReady.winner = winner
                        quizIsReady.isActive = 'complete'
                        await quizIsReady.save()
                        return quizIsReady
                }
                await quizIsReady.save()
                return quizIsReady
            }
            return quizIsReady
            
        } catch(err) {
            throw new Error(err)
        }
        }
    }
}  