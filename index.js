const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/schema");

const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");

const cron = require("node-cron");
let shell = require("shelljs");

const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

// cron.schedule("2 * * * * *", function() {
//     if(shell.exec("node drawWinner.js").code !== 0){
//         console.log("something went wrong")
//     }
// });

mongoose
  .connect(MONGODB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("MongoDb connected");
    return server.listen({ port: PORT });
  })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err);
  });

