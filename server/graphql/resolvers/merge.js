const Profile = require("../../models/profile");
const Follow = require("../../models/follow");
const User = require("../../models/user");
const Comment = require("../../models/comment");
const Reaction = require("../../models/Reaction");

const bolFollow = async (userId, me, rel) => {
  if (rel === 0) {
    const isMyFollowers = await Follow.findOne({
      followed: me,
      followedBy: userId,
    });
    return isMyFollowers ? true : false;
  } else {
    const isMyFollowing = await Follow.findOne({
      followed: userId,
      followedBy: me,
    });
    return isMyFollowing ? true : false;
  }
};

const profile = async (userId) => {
  try {
    const profile = await Profile.findOne({ user: userId });
    return profile;
  } catch (err) {
    throw err;
  }
};
const user = async (userId, me) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      profile: profile.bind(this, userId),
      isMyFollowers: bolFollow.bind(this, user._id, me, 0),
      isMyFollowing: bolFollow.bind(this, user._id, me, 1),
    };
  } catch (err) {
    throw err;
  }
};
const comments = async (postId) => {
  try {
    const comments = await Comment.find({ postId: postId })
      .limit(3)
      .sort({ createdAt: -1 });
    return comments.map((comment) => {
      return {
        ...comment._doc,
        createdBy: user.bind(this, comment.createdBy),
      };
    });
  } catch (err) {
    throw err;
  }
};
const reactions = async (postId) => {
  try {
    const reactions = await Reaction.find({ postId: postId }).sort({
      createdAt: -1,
    });
    return reactions.map((reaction) => {
      return {
        ...reaction._doc,
        createdBy: user.bind(this, reaction.createdBy),
      };
    });
  } catch (err) {
    throw err;
  }
};
const commentsCount = async (postId) => {
  try {
    const count = await Comment.find({ postId: postId });
    return count.length;
  } catch (err) {
    throw err;
  }
};
const reactionsCount = async (postId) => {
  try {
    const count = await Reaction.find({ postId: postId });
    return count.length;
  } catch (err) {
    throw err;
  }
};
const transformPost = (Post) => {
  return {
    ...Post._doc,
    createdBy: user.bind(this, Post.createdBy),
    comments: comments.bind(this, Post._id),
    reactions: reactions.bind(this, Post._id),
    commentsCount: commentsCount.bind(this, Post._id),
    reactionsCount: reactionsCount.bind(this, Post._id),
  };
};
const transformReaction = (Reaction) => {
  return {
    ...Reaction._doc,
    createdBy: user.bind(this, Reaction.createdBy),
  };
};
const transformComment = (Comment) => {
  return {
    ...Comment._doc,
    createdBy: user.bind(this, Comment.createdBy),
  };
};
const transformNotification = (notification) => {
  return {
    ...notification._doc,
    createdBy: user.bind(this, notification.createdBy),
  };
};
const transformFollows = (follow, me) => {
  return {
    ...follow._doc,
    followed: user.bind(this, follow.followed, me),
    followedBy: user.bind(this, follow.followedBy, me),
  };
};

const transformUser = (user, token, me) => {
  return {
    ...user._doc,
    profile: profile.bind(this, user._id),
    token: token,
    isMyFollowers: bolFollow.bind(this, user._id, me, 0),
    isMyFollowing: bolFollow.bind(this, user._id, me, 1),
  };
};

exports.transformPost = transformPost;
exports.transformReaction = transformReaction;
exports.transformComment = transformComment;
exports.transformNotification = transformNotification;
exports.transformFollows = transformFollows;
exports.transformUser = transformUser;
