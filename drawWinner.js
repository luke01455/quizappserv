//  const useMutation = require("@apollo/react-hooks")
//  const gql = require("graphql-tag")
// // import { useMutation } from '@apollo/react-hooks'
// // import gql from 'graphql-tag'


// const [drawWinner] = useMutation(DRAW_WINNER_MUTATION, {
//     update(proxy, { data }) {
//         console.log('mutation executed')
//     }
// })

// const DRAW_WINNER_MUTATION = gql`
//   mutation createScore($quizId: String!, $score: Int!) {
//     createScore(quizId: $quizId, score: $score) {
//       id
//       usersScores {
//         id
//         score
//         createdAt
//       }
//     }
//   }
// `;

const express = require ('express');
const { graphql } = require('graphql')
const schema = require('./graphql/schema')
const app = express();

app.get('/execute', function(req, res){
  var mutation = `
      mutation drawWinner{
          drawWinner{
              username
          }
      }
  `;

  graphql(schema, query, null)
  .then((result) => {
      console.log('wat')
  });
})