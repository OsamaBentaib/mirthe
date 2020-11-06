const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    rel: "Profile",
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model("User", userSchema);
