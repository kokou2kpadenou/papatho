const generateAlertMessage = require("../others/generateAlertMessage");

// import all the model
const Rooms = require("../models/rooms");
const Messages = require("../models/messages");
const Users = require("../models/users");

const onRemoveRoom = (socket, COMMON_ROOM_ID) => {
  // fail message
  const failMessage = generateAlertMessage({
    room: COMMON_ROOM_ID,
    text: `Fail to delete the room for unkown raison.`
  });

  socket.on("remove-room", room => {
    //
    Rooms.deleteOne({ _id: room })
      .then(result => {
        // send alert message to client.
        socket.emit(
          "message",
          generateAlertMessage({
            room: COMMON_ROOM_ID,
            text: `The room is deleted successfully.`
          })
        );
        socket.broadcast.emit("remove-room", room);
        socket.broadcast.to(room).emit("remove-messages", room);
        // broadcast message to clients of the room
        socket.broadcast.emit(
          "message",
          generateAlertMessage({
            room: room,
            text: `${room} removed.`
          })
        );

        // cleaning up messages and users
        Messages.find({ room: room })
          .then(messages => {
            const roomMessages = messages.map(({ _id }) => _id);
            Messages.deleteMany({ room: room }).catch(err => console.log(err));
            Users.updateMany(
              {},
              {
                $pull: {
                  rooms: room,
                  messages: { message: { $in: roomMessages } }
                }
              }
            ).catch(err => {
              console.log(err);
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(
        // error in deleting room
        err => {
          socket.emit("message", failMessage);
          console.log(err);
        }
      );
  });
};

module.exports = onRemoveRoom;
