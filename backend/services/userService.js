const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const JwtValidation = require("../middlewares/JwtValidation");

class UserService {
  login = async ({ username, password }) => {
    try {
      const user = await User.findOne({ username });
      if (!user) throw { message: "Incorrect Username or Password" };
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw { message: "Incorrect Username or Password" };
      }
      const { token } = await JwtValidation.generateToken(user._id);

      user.password = undefined;
      return {
        message: "Welcome to Login page",
        status: 200,
        data: user,
        error: false,
        token: token,
      };
    } catch (error) {
      return { message: error.message, status: 400, error: true };
    }
  };

  register = async ({ username, email, password }) => {
    try {
      const usernameCheck = await User.findOne({ username });
      if (usernameCheck) throw { message: "Username already used" };
      const emailCheck = await User.findOne({ email });
      if (emailCheck) throw { message: "Email already used" };
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
      });
      user.password = undefined;
      const { token } = await JwtValidation.generateToken(user._id);

      return {
        message: "User Register Successfully",
        status: 201,
        data: user,
        error: false,
        token: token,
      };
    } catch (error) {
      console.log({ message: error.message, status: 400, error: true });
      return { message: error.message, status: 400, error: true };
    }
  };

  getAllUsers = async ({ id }) => {
    try {
      const users = await User.find({ _id: { $ne: id } }).select([
        "email",
        "username",
        "avatarImage",
        "_id",
      ]);
      return {
        message: "Get All Users Successfully",
        status: 200,
        error: false,
        data: users,
      };
    } catch (error) {
      return { message: error.message, status: 400, error: true };
    }
  };

  setAvatar = async ({ userId, avatarImage }) => {
    try {
      //   const userId = req.params.id;
      //   const avatarImage = req.body.image;
      const userData = await User.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );
      return {
        message: "User AvatarImage Set Successfully",
        status: 200,
        error: false,
        data: {
          isSet: userData.isAvatarImageSet,
          image: userData.avatarImage,
        },
      };
    } catch (error) {
      return { message: error.message, status: 400, error: true };
    }
  };

  logOut = ({ id }) => {
    try {
      if (!id) {
        throw { message: "User id is required " };
      }
      onlineUsers.delete(id);
      return {
        message: "Users Logout Successfully",
        status: 200,
        error: false,
      };
    } catch (error) {
      return { message: error.message, status: 400, error: true };
    }
  };
}

module.exports = new UserService();
