const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  for: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seen: {
    type: Boolean,
   default: false,
  },
  createdAt: {
    type: String,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
