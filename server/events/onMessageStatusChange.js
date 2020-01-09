const Users = require("../models/users");
const Messages = require("../models/messages");

const onMessageStatusChange = socket => {
  socket.on("message-status-change", ({ userName, room, status }) => {
    Messages.find({ room: room })
      .then(messages => {
        messages.forEach(({ _id }) => {
          Users.updateOne(
            {
              user: userName,
              messages: { $elemMatch: { message: _id } }
            },
            { $set: { "messages.$.status": status } }
          ).catch(err => {
            console.log(err);
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

module.exports = onMessageStatusChange;
