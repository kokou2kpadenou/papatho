const ObjectId = require("mongoose").Types.ObjectId;

const Rooms = require("../models/rooms");

const onStopTyping = (io, socket) => {
  socket.on("stop-typing", ({ userName, room }) => {
    /** Additional process for room info */
    // Add user to joinedUsers and onlineUsers
    Rooms.findOneAndUpdate(
      { _id: ObjectId(room) },
      {
        $pull: {
          typingUsers: userName
        }
      }
    )
      .then(res => {
        // Send the room new info details to all clients in the room
        Rooms.find({
          _id: ObjectId(room)
        })
          .then(roomInfo => {
            io.in(room).emit("update-room", roomInfo);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
    /** End additional process for room info */
  });
};

module.exports = onStopTyping;
