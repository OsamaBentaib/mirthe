const { UserInputError, AuthenticationError } = require("apollo-server");
const processUpload = require("../../upload/process");
const Post = require("../../models/Post");
const User = require("../../models/user");
const Comment = require("../../models/comment");
const Reaction = require("../../models/Reaction");
const { transformPost } = require("./merge");
module.exports = {
  Query: {
    getPosts: async (_, { start, limit }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const posts = await Post.find()
          .skip(start)
          .limit(limit)
          .sort({ createdAt: -1 });
        return posts.map((post) => {
          return transformPost(post);
        });
      } catch (err) {
        throw err;
      }
    },
    getPost: async (_, { postId }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const post = await Post.findById(postId);
        return transformPost(post);
      } catch (err) {
        throw err;
      }
    },
    getUserPosts: async (_, { userId, start, limit }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const check = await User.findById(userId);
        if (!check) throw new UserInputError("User not found");
        const posts = await Post.find({ createdBy: userId })
          .skip(start)
          .limit(limit)
          .sort({ createdAt: -1 });
        return posts.map((post) => {
          return transformPost(post);
        });
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createPost: async (_, args, { user }) => {
      const { content, Image } = args;
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        if (content.trim() === "" && !Image) {
          throw new UserInputError("Post can't be is empty");
        }
        let image = null;
        if (Image) {
          const uploadImage = await processUpload(Image, true);
          image = {
            path: uploadImage.path,
            filename: uploadImage.name,
            mimetype: uploadImage.mimetype,
          };
        }
        const post = new Post({
          createdBy: user.ID,
          content: content,
          createdAt: new Date().toISOString(),
          Image: image,
        });
        const response = await post.save();
        return transformPost(response);
      } catch (err) {
        throw err;
      }
    },
    updatePost: async (_, args, { user }) => {
      const { content, Image, postId } = args;
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const post = await Post.findById(postId);
        if (!post) throw new UserInputError("Post not found");
        if (content.trim() === "" && !Image) {
          throw new UserInputError("Post can't be is empty");
        }
        let image = null;
        if (Image) {
          const uploadImage = await processUpload(Image, true);
          image = {
            path: uploadImage.path,
            filename: uploadImage.name,
            mimetype: uploadImage.mimetype,
          };
        }

        const response = await Post.updateOne(
          { _id: postId },
          {
            content: content,
            Image: image,
          }
        );
        console.log(response);
        return true;
      } catch (err) {
        throw err;
      }
    },
    detetePost: async (_, args, { user }) => {
      const { postId } = args;
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const post = await Post.findById(postId);
        if (!post) throw new UserInputError("Post not found");
        await Post.deleteOne({ _id: postId });
        await Comment.deleteOne({ postId: postId });
        await Reaction.deleteOne({ postId: postId });
        return true;
      } catch (err) {
        throw err;
      }
    },
  },
};
