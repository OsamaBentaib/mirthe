const {
  UserInputError,
  AuthenticationError,
  withFilter,
} = require("apollo-server");
const Comment = require("../../models/comment");
const Post = require("../../models/Post");
const User = require("../../models/user");
const Notification = require("../../models/notification");
const { transformComment } = require("./merge");
const Messages = require("./../../constants/messages");

module.exports = {
  Query: {
    getComments: async (_, { postId, start, limit }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const post = await Post.findById(postId);
        if (!post) throw new UserInputError("Post not found!");
        const comments = await Comment.find({ postId: postId })
          .skip(start)
          .limit(limit)
          .sort({ createdAt: -1 });
        return comments.map((comment) => {
          return transformComment(comment);
        });
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createComment: async (_, args, { user }) => {
      const { content, postId } = args;
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const post = await Post.findById(postId);
        if (!post) {
          throw new UserInputError("Post not found");
        }
        if (content.trim() === "") {
          throw new UserInputError("Comment can't be is empty");
        }
        const addNot = new Notification({
          createdBy: user.ID,
          for: post.createdBy,
          content: '"' + content + '"',
          message: Messages[1].message,
          createdAt: new Date().toISOString(),
        });
        await addNot.save();
        const comment = new Comment({
          createdBy: user.ID,
          postId: postId,
          content: content,
          createdAt: new Date().toISOString(),
        });
        const response = await comment.save();
        return transformComment(response);
      } catch (err) {
        throw err;
      }
    },
  },
};
