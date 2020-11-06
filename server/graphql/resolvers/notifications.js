const { UserInputError, AuthenticationError } = require("apollo-server");
const Notification = require("../../models/notification");
const { transformNotification } = require("./merge");

module.exports = {
  Query: {
    getNotification: async (_, { start, limit }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const notifications = await Notification.find({ for: user.Id })
          .skip(start)
          .limit(limit)
          .sort({ createdAt: -1 });
        return notifications.map((notification) => {
          return transformNotification(notification);
        });
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    NotificationOpen: async (_, __, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        await Notification.updateMany({ for: user.Id }, { seen: true });
        return true;
      } catch (err) {
        throw err;
      }
    },
  },
};
