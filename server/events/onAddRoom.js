const ObjectId = require("mongoose").Types.ObjectId;
const generateAlertMessage = require("../others/generateAlertMessage");

// import all the model
const Rooms = require("../models/rooms");
const Users = require("../models/users");

const onAddRoom = (io, socket, COMMON_ROOM_ID) => {
  socket.on("add-room", ({ roomName, roomDesc, roomOwner }) => {
    // fail message
    const failMessage = generateAlertMessage({
      room: COMMON_ROOM_ID,
      text: `Fail to create the new room (${roomName}) for unkown raison.`
    });
    // Check if the room exists.
    Rooms.findOne({ roomName: roomName })
      .then(ExistingRoom => {
        if (ExistingRoom) {
          // room already exist, send the room details back to client
          socket.emit("room", ExistingRoom);
          // message to client
          socket.emit(
            "message",
            generateAlertMessage({
              room: COMMON_ROOM_ID,
              text: `Fail to create room (${roomName}), it already exists.`
            })
          );
        } else {
          // room do not exists, create a new room
          Rooms.create({
            _id: new ObjectId(),
            roomName,
            roomDesc,
            roomOwner,
            joinedUsers: [roomOwner],
            onlineUsers: [roomOwner],
            typingUsers: []
          })
            .then(newRoon => {
              socket.join(newRoon._id);
              // send room details back to everyone
              io.emit("room", newRoon);
              // Send message to all user except sender about the new room in room COMMON.
              socket.broadcast.emit(
                "message",
                generateAlertMessage({
                  room: COMMON_ROOM_ID,
                  text: `New room, ${roomName}, is added by ${roomOwner}.`
                })
              );
              // message to the client
              socket.emit(
                "message",
                generateAlertMessage({
                  room: COMMON_ROOM_ID,
                  text: `Room (${roomName}) created successfully.`
                })
              );

              /** Add room _id to user rooms element */
              Users.findOneAndUpdate(
                { user: roomOwner },
                {
                  $addToSet: {
                    rooms: newRoon._id
                  }
                }
              ).catch(err => {
                console.log(err);
              });
            })
            .catch(err => {
              socket.emit("message", failMessage);
              console.log(err);
            });
        }
      })
      .catch(err => {
        socket.emit("message", failMessage);
        console.log(err);
      });
  });
};

module.exports = onAddRoom;
