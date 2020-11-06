const { UserInputError, AuthenticationError } = require("apollo-server");
const Reaction = require("../../models/Reaction");
const Post = require("../../models/Post");
const Notification = require("../../models/notification");
const { transformReaction } = require("./merge");

module.exports = {
  Query: {
    getReactions: async (_, { postId, start, limit }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const post = await Post.findById(postId);
        if (!post) throw new UserInputError("Post not found!");
        const reaction = await Reaction.find({ postId: postId })
          .skip(start)
          .limit(limit)
          .sort({ createdAt: -1 });
        return reaction.map((react) => {
          return transformReaction(react);
        });
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createReaction: async (_, args, { user }) => {
      const { content, postId } = args;
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const post = await Post.findById(postId);
        if (!post) {
          throw new UserInputError("Post not found");
        }
        if (content.trim() === "") {
          throw new UserInputError("Reaction can't be is empty");
        }
        const checkR = await Reaction.findOne({
          createdBy: user.ID,
          postId: postId,
        });
        let response = {
          _id: null,
          createdBy: user.ID,
          postId: postId,
          content: content,
          createdAt: new Date().toISOString(),
        };
        if (checkR) {
          if (checkR.content === content) {
            // remove the reaction
            await Reaction.deleteOne({
              createdBy: user.ID,
              postId: postId,
              content: content,
            });
          } else {
            // remove the old and create a new reaction
            await Reaction.deleteOne({
              createdBy: user.ID,
              postId: postId,
              content: content,
            });
            const reaction = new Reaction({
              createdBy: user.ID,
              postId: postId,
              content: content,
              createdAt: new Date().toISOString(),
            });
            response = await reaction.save();
          }
        } else {
          // create the reaction for the first time
          const addNot = new Notification({
            createdBy: user.ID,
            for: post.createdBy,
            content: content,
            message: "has reacted to your post with",
            createdAt: new Date().toISOString(),
          });
          await addNot.save();
          const reaction = new Reaction({
            createdBy: user.ID,
            postId: postId,
            content: content,
            createdAt: new Date().toISOString(),
          });
          response = await reaction.save();
        }
        return transformReaction(response);
      } catch (err) {
        throw err;
      }
    },
  },
};
