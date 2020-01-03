const ObjectId = require("mongoose").Types.ObjectId;
const generateAlertMessage = require("../others/generateAlertMessage");

// import all the model
const Messages = require("../models/messages");
const Users = require("../models/users");

const onMessage = (socket, COMMON_ROOM_ID) => {
  // Fail message
  const failMessage = generateAlertMessage({
    room: COMMON_ROOM_ID,
    text: `failed to send the message.`
  });

  socket.on("message", ({ sender, text, room, ref }) => {
    Messages.create({
      _id: new ObjectId(),
      text: text,
      dateCreated: Date().toLocaleString(),
      sender: sender,
      alertMessage: false,
      room: ObjectId(room)
    })
      .then(message => {
        messageToSend = {
          _id: message._id,
          text: message.text,
          dateCreated: message.dateCreated,
          sender: message.sender,
          alertMessage: message.alertMessage,
          room: message.room
        };

        Users.findOneAndUpdate(
          { user: sender },
          { $addToSet: { messages: { message: message._id, status: "SENT" } } }
        )
          .then(user => {
            socket.emit("update-message", {
              ...messageToSend,
              status: "SENT",
              ref
            });
          })
          .catch(err => {
            console.log(err);
          });

        Users.updateMany(
          {
            user: { $ne: sender },
            rooms: ObjectId(room)
          },
          { $addToSet: { messages: { message: message._id, status: "NEW" } } }
        )
          .then(users => {
            socket
              .to(room)
              .emit("message", { ...messageToSend, status: "NEW" });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        socket.emit("message", failMessage);
        console.log(err);
      });
  });
};

module.exports = onMessage;
