const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// Server port
const PORT = process.env.PORT || 5000;

// MongoDB database url
const URL = "mongodb://localhost:27017/papatho";

// import all the model
const Rooms = require("./models/rooms");
const Messages = require("./models/messages");
const Users = require("./models/users");

const router = require("./router");

io.on("connection", socket => {
  console.log("We have a new connection.");

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

  // When client add a new room
  socket.on("add-room", ({ name, room }, callback) => {
    //
  });

  // When client remove a room
  socket.on("remove-room", ({ name, room }, callback) => {
    //
  });

  // When client join a room, we emit to all clients in the room
  socket.on("join-room", ({ name, room }, callback) => {
    socket.broadcast.to(room).emit("message", {
      user: "admin",
      text: `${name}, has joined!`
    });
    socket.join(room);
  });

  // When client unjoin a room, we emit to all clients in the room
  socket.on("leave-room", ({ name, room }, callback) => {
    socket.broadcast.to(room).emit("message", {
      user: "admin",
      text: `${name}, has left!`
    });
    socket.leave(room);
  });

  // When a client emits 'typing', we emit to all clients in the room
  socket.on("typing", ({ username, room }) => {
    io.to(room).emit("typing", {
      username: username
    });
  });

  // When a client emits 'stop typing', we emit to all clients in the room
  socket.on("stop typing", ({ username, room }) => {
    io.to(room).emit("stop typing", {
      username: username
    });
  });

  // When a client emits 'sendMessage', we emit to all clients in the room
  socket.on("sendMessage", (message, callback) => {
    // // const user = getUser(socket.id);

    // io.to(user.room).emit("message", {
    //   user: user.name,
    //   text: message
    // });

    // io.to(user.room).emit("roomData", {
    //   room: user.room,
    //   users: getUsersInRoom(user.room)
    // });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("User had left.");
    // // const user = removeUser(socket.id);

    // if (user) {
    //   io.to(user.room).emit("message", {
    //     user: "admin",
    //     text: `${user.name} has left.`
    //   });
    // }
  });
});

app.use(router);

mongoose
  .connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() =>
    server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
  )
  .catch(error => console.log(error));
