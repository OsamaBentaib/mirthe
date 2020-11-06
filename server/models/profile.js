const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  avatar: {
    path: { type: String },
    filename: { type: String },
    mimetype: { type: String },
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  birthday: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  createdAt: {
    type: String,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
