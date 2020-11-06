const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const MONGO_CONNECTION = require("./db/db");

const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const contextMiddleware = require("./auth/auth-check");
/**
 *  ======================
 *   CREATE APOLLO SERVER
 *  ======================
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware,
});
const app = express();
server.applyMiddleware({ app });
app.use(cors());
app.use(express.static("media"));
app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000`);
  /**
   *  ======================
   *   Connect to MongoDB
   *  ======================
   *
   *  ======================
   *    ./db/db.js
   *  ======================
   */
  mongoose
    .connect(
      MONGO_CONNECTION,
      { useNewUrlParser: true },
      { useUnifiedTopology: true }
    )
    .then(() => {
      /**
       *  =================================
       *   succesfully connected to mongoDB
       *  =================================
       */
      console.log("Connected 🚀 To MongoDB Successfully");
    })
    .catch((err) => {
      throw err;
    });
});
