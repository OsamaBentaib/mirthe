const { UserInputError, AuthenticationError } = require("apollo-server");
const Follow = require("../../models/follow");
const User = require("../../models/user");
const Notification = require("../../models/notification");
const { transformFollows } = require("./merge");
const Messages = require("./../../constants/messages");

module.exports = {
  Query: {
    getFollows: async (_, { rel, userId, start, limit }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const check = await User.findById(userId);
        if (!check) throw new UserInputError("Post not found!");
        let follows = [];
        if (rel === 0) {
          /// fetch Folowers
          follows = await Follow.find({ followed: userId })
            .skip(start)
            .limit(limit)
            .sort({ createdAt: -1 });
        } else if (rel === 1) {
          /// fetch Following
          follows = await Follow.find({ followedBy: userId })
            .skip(start)
            .limit(limit)
            .sort({ createdAt: -1 });
        } else throw new UserInputError("Invalid action type");

        return follows.map((follow) => {
          return transformFollows(follow, user.ID);
        });
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createFollow: async (_, args, { user }) => {
      const { followedBy, followed } = args;
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const user1 = await User.findById(followedBy);
        if (!user1) {
          throw new UserInputError("Followed By not found");
        }
        const user2 = await User.findById(followed);
        if (!user2) {
          throw new UserInputError("Followed By not found");
        }
        const addNot = new Notification({
          createdBy: user.ID,
          for: followed,
          content: "Follow",
          message: Messages[0].message,
          createdAt: new Date().toISOString(),
        });
        await addNot.save();
        const check = await Follow.findOne({
          followedBy: followedBy,
          followed: followed,
        });
        let res;
        if (!check) {
          const follow = new Follow({
            followedBy: followedBy,
            followed: followed,
            createdAt: new Date().toISOString(),
          });
          const response = await follow.save();
          return transformFollows(response);
        } else {
          res = check;
          await Follow.deleteOne({
            followedBy: followedBy,
            followed: followed,
          });
          return transformFollows(res);
        }
      } catch (err) {
        throw err;
      }
    },
  },
};
