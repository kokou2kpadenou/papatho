const ObjectId = require("mongoose").Types.ObjectId;
const generateAlertMessage = require("../others/generateAlertMessage");

const Messages = require("../models/messages");
const Users = require("../models/users");
const Rooms = require("../models/rooms");

const onJoinRoom = (io, socket) => {
  socket.on("join-room", ({ userName, room }) => {
    Messages.find({ room: ObjectId(room) })
      .then(messages => {
        const userNewRoomMessages = messages.map(({ _id }) => ({
          message: _id,
          status: "NEW"
        }));

        const messagesToClient = messages.map(
          ({ _id, text, dateCreated, sender, room, alertMessage }) => ({
            _id,
            text,
            dateCreated,
            sender,
            room,
            alertMessage,
            status: "NEW"
          })
        );

        Users.findOneAndUpdate(
          { user: userName },
          {
            $addToSet: {
              rooms: room,
              messages: { $each: userNewRoomMessages }
            }
          }
        )
          .then(user => {
            socket.join(room);

            socket.emit("messages", [
              ...messagesToClient,
              generateAlertMessage({
                room: room,
                text: `${userName}, you are welcome to this room`
              })
            ]);

            // Send messaege to all clients of the room except the sender.
            socket.to(room).emit(
              "message",
              generateAlertMessage({
                room: room,
                text: `${userName} joined`
              })
            );

            /** Additional process for room info */
            // Add user to joinedUsers and onlineUsers
            Rooms.findOneAndUpdate(
              { _id: ObjectId(room) },
              { $addToSet: { joinedUsers: userName, onlineUsers: userName } }
            )
              .then(res => {
                // Send the room new info details to all clients in the room
                Rooms.find({ _id: ObjectId(room) })
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
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });
};

module.exports = onJoinRoom;
