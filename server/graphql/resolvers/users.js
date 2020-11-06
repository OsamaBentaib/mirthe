const bcrypt = require("bcryptjs");
const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const Profile = require("../../models/profile");
const processUpload = require("../../upload/process");
const { transformUser } = require("./merge");

module.exports = {
  Query: {
    authCheck: async (_, args, { user }) => {
      try {
        if (user) return true;
        else return false;
      } catch (err) {
        throw err;
      }
    },
    getUser: async (_, args, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        const responese = await User.findById(args.ID);
        return transformUser(responese, null, user.ID);
      } catch (err) {
        throw err;
      }
    },
    getUsers: async (_, args, { user }) => {
      try {
        let users;
        if (!user) throw new AuthenticationError("Unauthenticated");
        if (args.keyword === "") {
          users = await User.find().skip(args.start).limit(args.limit);
        } else {
          const query = args.keyword.toString();
          users = await User.find({
            username: { $regex: query, $options: "i" },
          }).limit(10);
        }
        return users.map((i) => {
          return transformUser(i, null, user.ID);
        });
      } catch (err) {
        throw err;
      }
    },
    login: async (_, args) => {
      const { username, password } = args;
      let errors = {};
      try {
        if (username.trim() === "")
          errors.username = "username must not be empty";
        if (password === "") errors.password = "password must not be empty";

        if (Object.keys(errors).length > 0) {
          throw new UserInputError("bad input", { errors });
        }

        const user = await User.findOne({ username: username });

        if (!user) {
          errors.username = "user not found";
          throw new UserInputError("user not found", { errors });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
          errors.password = "password is incorrect";
          throw new UserInputError("password is incorrect", { errors });
        }

        const token = jwt.sign(
          { username: username, ID: user._id },
          "JWT_SECRET_WORD_#$",
          {
            expiresIn: 60 * 60,
          }
        );
        return transformUser(user, token);
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      let { username, email, password, confirmPassword } = args;
      let errors = {};
      try {
        // Validate input data
        if (email.trim() === "") errors.email = "email must not be empty";
        if (username.trim() === "")
          errors.username = "username must not be empty";
        if (password.trim() === "")
          errors.password = "password must not be empty";
        if (confirmPassword.trim() === "")
          errors.confirmPassword = "repeat password must not be empty";

        if (password !== confirmPassword)
          errors.confirmPassword = "passwords must match";
        /**
         *  Check if the username or email already exist
         */
        const userByUsername = await User.findOne({ username: username });
        const userByEmail = await User.findOne({ email: email });

        if (userByUsername) errors.username = "Username is taken";
        if (userByEmail) errors.email = "Email is taken";

        if (Object.keys(errors).length > 0) {
          throw errors;
        }

        // Hash password
        password = await bcrypt.hash(password, 6);
        // Create user
        const user = new User({
          username: username,
          email: email,
          password: password,
          createdAt: new Date().toISOString(),
        });
        const response = await user.save();
        const profile = new Profile({
          user: response._id,
          firstName: "Untitled",
          lastName: "",
          location: "",
          birthday: "",
          phone: "",
          createdAt: new Date().toISOString(),
          avatar: {
            path: "media/avatar/default.png",
            filename: "default.png",
            mimetype: "image/png",
          },
        });
        await profile.save();
        return response;
      } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
          err.errors.forEach(
            (e) => (errors[e.path] = `${e.path} is already taken`)
          );
        } else if (err.name === "SequelizeValidationError") {
          err.errors.forEach((e) => (errors[e.path] = e.message));
        }
        throw new UserInputError("Bad input", { errors });
      }
    },
    profile: async (_, args, { user }) => {
      let {
        firstName,
        lastName,
        location,
        birthday,
        phone,
        avatar,
      } = args.profileInput;
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        let UploadAvatar = null;
        if (avatar) {
          const uploadImage = await processUpload(avatar, false);
          UploadAvatar = {
            path: uploadImage.path,
            filename: uploadImage.name,
            mimetype: uploadImage.mimetype,
          };
        }
        const fields = {
          user: user.ID,
          firstName: firstName,
          lastName: lastName,
          location: location,
          birthday: birthday,
          phone: phone,
          createdAt: new Date().toISOString(),
        };
        let flds = fields;
        if (UploadAvatar) flds = { ...fields, avatar: UploadAvatar };
        const check = await Profile.findOne({ user: user.ID });
        if (check) {
          // Already have a profile -> update
          await Profile.updateOne({ user: user.ID }, flds);
          return fields;
        } else {
          // create the profile
          const createProfile = new Profile(fields);
          await createProfile.save();
          return fields;
        }
      } catch (err) {
        throw err;
      }
    },
    deteteAccount: async (_, args, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");
        await Profile.deleteOne({ user: user.ID });
        await User.findByIdAndDelete(user.ID);
        return true;
      } catch (err) {
        throw err;
      }
    },
  },
};
