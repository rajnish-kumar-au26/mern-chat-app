const Messages = require("../models/messageModel");

class MessageService {
  getMessages = async ({ from, to }) => {
    try {
      if (!from) {
        throw { message: "from is required" };
      }
      if (!to) {
        throw { message: "to is required" };
      }
      const messages = await Messages.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });

      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      return {
        message: "Get All Messages Successfully",
        status: 200,
        error: false,
        data: projectedMessages,
      };
    } catch (error) {
      return { message: error.message, status: 400, error: true };
    }
  };

  addMessage = async ({ from, to, message }) => {
    try {
      // if (!form) {
      //   throw { message: "from is required" };
      // }
      // if (!to) {
      //   throw { message: "to is required" };
      // }
      // if (!message) {
      //   throw { message: "message is required" };
      // }
      const data = await Messages.create({
        message: { text: message },
        users: [from, to],
        sender: from,
      });

      if (data) {
        return {
          message: "Message added successfully",
          status: 200,
          error: false,
        };
      } else {
        return {
          message: "Failed to add message to the database",
          status: 200,
          error: false,
        };
      }
    } catch (error) {
      return { message: error.message, status: 400, error: true };
    }
  };
}

module.exports = new MessageService();
