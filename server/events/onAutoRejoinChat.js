const ObjectId = require("mongoose").Types.ObjectId;
const generateAlertMessage = require("../others/generateAlertMessage");

// import all the model
const Rooms = require("../models/rooms");
const Users = require("../models/users");

const oldMessages = (user, alertMessage) => {
  const messages = user.messages
    .filter(({ message }) => message)
    .map(
      ({
        message: { _id, room, text, dateCreated, sender, alertMessage },
        status
      }) => ({
        _id,
        room,
        text,
        dateCreated,
        sender,
        alertMessage,
        status
      })
    );
  return [...messages, alertMessage];
};

const onAutoRejoinChat = (socket, COMMON_ROOM_ID) => {
  socket.on("auto-rejoin-chat", userName => {
    Users.findOne({ user: userName })
      .populate("messages.message")
      .then(user => {
        if (user) {
          // Update the user
          Users.findOneAndUpdate(
            { user: userName },
            { $addToSet: { socketID: socket.id } }
          )
            .then(_user => {
              Rooms.updateMany(
                { _id: { $in: user.rooms } },
                { $addToSet: { onlineUsers: user.user } }
              )
                .then(res => {
                  /** ------------------------------------------------------ */
                  // Rejoin all existing rooms of the client
                  user.rooms.forEach(room => {
                    socket.join(room);
                  });
                  // Send room update to connected users of those rooms.
                  Rooms.find({ _id: { $in: user.rooms } })
                    .then(userRooms => {
                      userRooms.forEach(userRoom => {
                        socket.to(userRoom._id).emit("update-room", userRoom);
                      });
                    })
                    .catch(err => {
                      console.log(err);
                    });
                  // Send all rooms to client
                  Rooms.find()
                    .then(rooms => {
                      socket.emit("rooms", rooms);
                    })
                    .catch(err => {
                      console.log(err);
                    });

                  /** ---------------------------------------------------- */
                })
                .catch(err => {
                  console.log(err);
                });

              socket.emit(
                "messages",
                oldMessages(
                  user,
                  generateAlertMessage({
                    room: COMMON_ROOM_ID,
                    text: "Welcome back to papatho."
                  })
                )
              );
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
};

module.exports = onAutoRejoinChat;
