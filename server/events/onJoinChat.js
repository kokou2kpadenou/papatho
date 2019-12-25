const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// import all the model
const Rooms = require("../models/rooms");
const Messages = require("../models/messages");
const Users = require("../models/users");

const onJoinChat = socket => {
  socket.on("join-chat", userName => {
    // let existingRooms;
    // All existing rooms at this moment
    Rooms.find()
      .then(rooms => {
        const roomAlertsID = rooms.filter(room => room.roomName === "Alerts")[0]
          ._id;
        // console.log(existingRooms, roomAlertsID);
        Users.findOne({ user: userName })
          .populate("messages.message")
          .then(user => {
            if (user) {
              console.log("user exist");
              console.log(user);
              // console.log(user.messages);

              socket.emit(
                "old-rooms",
                rooms.map(({ _id, roomName, roomDesc, roomOwner }) => ({
                  _id,
                  roomName,
                  roomDesc,
                  roomOwner,
                  joined: user.rooms.includes(_id)
                }))
              );
              socket.emit(
                "old-messages",
                user.messages.map(
                  ({
                    message: { _id, room, text, dateCreated, sender },
                    status
                  }) => ({
                    _id,
                    room,
                    text,
                    dateCreated,
                    sender,
                    status
                  })
                )
              );
            } else {
              console.log("user do not exist");
              Users.create({
                _id: new ObjectId(),
                user: userName,
                rooms: roomAlertsID._id,
                messages: []
              })
                .then(user => {
                  console.log(user);
                })
                .catch(err => {
                  console.log(err);
                });
            }
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log("err");
      });

    socket.join("Alerts");

    // callback();
  });
};

module.exports = onJoinChat;
