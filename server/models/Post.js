const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Image: {
    path: { type: String },
    filename: { type: String },
    mimetype: { type: String },
  },
  createdAt: {
    type: String,
    require: true,
  },
  reactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reaction",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("Post", PostSchema);
