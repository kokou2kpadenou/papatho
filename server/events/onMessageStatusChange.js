const Users = require("../models/users");
const Messages = require("../models/messages");

const onMessageStatusChange = socket => {
  socket.on("message-status-change", ({ userName, room, status }) => {
    Messages.find({ room: room })
      .then(messages => {
        userRoomMessages = messages.map(({ _id }) => _id);
        Users.updateMany(
          {
            user: userName,
            messages: { message: { $in: userRoomMessages } }
          },
          { messages: { status: status } }
        ).catch(err => {
          console.log(err);
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

module.exports = onMessageStatusChange;
