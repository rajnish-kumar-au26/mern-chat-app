const MessageService = require("../services/messageService");

class MessageController {
  getMessages = async (req, res) => {
    const { from, to } = req.body;

    const getRes = await MessageService.getMessages({ from, to });

    return res.status(getRes.status).send({
      message: getRes.message,
      error: getRes.error,
      data: getRes.data,
    });
  };

  addMessage = async (req, res) => {
    const { from, to, message } = req.body;
    const getRes = await MessageService.addMessage({ from, to, message });

    return res.status(getRes.status).send({
      message: getRes.message,
      error: getRes.error,
    });
  };
}

module.exports = new MessageController();
