const ObjectId = require("mongoose").Types.ObjectId;
const generateAlertMessage = require("../others/generateAlertMessage");

// import all the model
const Messages = require("../models/messages");
const Users = require("../models/users");
const Rooms = require("../models/rooms");

const onLeaveRoom = (io, socket) => {
  socket.on("leave-room", ({ userName, room }) => {
    Messages.find({ room: room })
      .then(messages => {
        const roomMessages = messages.map(({ _id }) => _id);

        Users.findOneAndUpdate(
          { user: userName },
          {
            $pull: { rooms: room, messages: { message: { $in: roomMessages } } }
          }
        )
          .then(user => {
            socket.leave(room);
            socket.broadcast.to(room).emit(
              "message",
              generateAlertMessage({
                room: room,
                text: `${userName} left the room.`
              })
            );

            /** Additional process for room info */
            // Remove user from joinedUsers and onlineUsers and typing
            Rooms.findOneAndUpdate(
              { _id: ObjectId(room) },
              {
                $pull: {
                  joinedUsers: userName,
                  onlineUsers: userName,
                  typingUsers: userName
                }
              }
            )
              .then(res => {
                // Send the room new info details to all clients in the room
                Rooms.findOne({ _id: ObjectId(room) })
                  .then(roomInfo => {
                    io.emit("update-room", roomInfo);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
              .catch(err => {
                console.log(err);
              });
            /** End additional process for room info */
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });
};

module.exports = onLeaveRoom;
