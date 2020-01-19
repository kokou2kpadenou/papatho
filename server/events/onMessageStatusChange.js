const Users = require("../models/users");
// const Messages = require("../models/messages");

const onMessageStatusChange = socket => {
  socket.on("message-status-change", ({ userName, messageId, status }) => {
    Users.updateOne(
      {
        user: userName,
        messages: { $elemMatch: { message: messageId } }
      },
      { $set: { "messages.$.status": status } }
    ).catch(err => {
      console.log(err);
    });
  });
};

module.exports = onMessageStatusChange;
