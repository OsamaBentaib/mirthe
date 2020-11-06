const mongoose = require("mongoose");

const followSchema = mongoose.Schema({
  followed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  followedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: String,
  },
});

module.exports = mongoose.model("Follow", followSchema);
