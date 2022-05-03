const UserController = require("../controllers/UserController");
const JwtValidation = require("../middlewares/JwtValidation");

const router = require("express").Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.get(
  "/allusers/:id",
  JwtValidation.verifyToken,
  UserController.getAllUsers
);
router.post(
  "/setavatar/:id",
  JwtValidation.verifyToken,
  UserController.setAvatar
);
router.get("/logout/:id", UserController.logOut);

module.exports = router;
