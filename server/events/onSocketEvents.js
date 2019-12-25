const onJoinChat = require("./onJoinChat");

const onSocketEvents = (io, socket) => {
  // Join chat
  onJoinChat(socket);

  // When client add a new room

  // When client remove a room

  // When client join a room, we emit to all clients in the room

  // When client unjoin a room, we emit to all clients in the room

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
};
module.exports = onSocketEvents;
