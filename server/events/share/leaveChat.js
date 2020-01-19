const Users = require("../../models/users");
const Rooms = require("../../models/rooms");
const generateAlertMessage = require("../../others/generateAlertMessage");

const leaveChat = (socket, socketID) => {
  Users.findOne({ socketID: socketID })
    .then(user => {
      if (user) {
        // Clean up
        // update Users to remove the socketID from the user
        Users.findOneAndUpdate(
          { socketID: socketID },
          { $pull: { socketID: socketID } }
        ).catch(err => {
          console.log(err);
        });
        // change onlineUsers and typingUsers for all rooms of user
        Rooms.updateMany(
          { _id: { $in: user.rooms } },
          { $pull: { onlineUsers: user.user, typingUsers: user.user } }
        )
          .then(res => {
            //send room details to all in the room except user and socket.leave(room)
            Rooms.find({ _id: { $in: user.rooms } })
              .then(rooms => {
                //
                rooms.forEach(room => {
                  // Send room's updated info to all members except client
                  socket.to(room._id).emit("update-room", room);
                  // Alert message
                  // socket.to(room._id).emit(
                  //   "message",
                  //   generateAlertMessage({
                  //     room: room._id,
                  //     text: `${user.user} has left.`
                  //   })
                  // );
                  // User leave room
                  socket.leave(room._id);
                });
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = leaveChat;
