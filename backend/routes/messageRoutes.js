const MessageController = require("../controllers/MessageController");
const router = require("express").Router();
const JwtValidation = require("../middlewares/JwtValidation");

router.post("/addmsg/", MessageController.addMessage);
router.post("/getmsg/", MessageController.getMessages);

module.exports = router;
