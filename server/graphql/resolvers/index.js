const userResolvers = require("./users");
const postResolvers = require("./Posts");
const commentResolvers = require("./comments");
const followResolvers = require("./follows");
const notificationResolvers = require("./notifications");
const reactionResolvers = require("./reactions");

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...postResolvers.Query,
    ...commentResolvers.Query,
    ...followResolvers.Query,
    ...notificationResolvers.Query,
    ...reactionResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...followResolvers.Mutation,
    ...notificationResolvers.Mutation,
    ...reactionResolvers.Mutation,
  },
};
