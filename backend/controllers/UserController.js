const UserService = require("../services/userService");

class UserController {
  login = async (req, res) => {
    const { username, password } = req.body;
    const getRes = await UserService.login({ username, password });
    return res.status(getRes.status).json({
      message: getRes.message,
      data: getRes.data,
      token: getRes.token,
      error: getRes.error,
    });
  };

  register = async (req, res) => {
    const { username, email, password } = req.body;
    const getRes = await UserService.register({ username, email, password });
    return res.status(getRes.status).json({
      message: getRes.message,
      data: getRes.data,
      token: getRes.token,
      error: getRes.error,
    });
  };

  getAllUsers = async (req, res) => {
    const id = req.params.id;
    const getRes = await UserService.getAllUsers({ id });
    return res.status(getRes.status).json({
      message: getRes.message,
      data: getRes.data,
      error: getRes.error,
    });
  };

  setAvatar = async (req, res) => {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    const getRes = await UserService.setAvatar({ userId, avatarImage });
    return res.status(getRes.status).json({
      message: getRes.message,
      data: getRes.data,
      error: getRes.error,
    });
  };

  logOut = async (req, res) => {
    const id = req.params.id;
    const getRes = await UserService.logOut({ id });
    return res.status(getRes.status).json({
      message: getRes.message,
      data: getRes.data,
      error: getRes.error,
    });
  };
}

module.exports = new UserController();
