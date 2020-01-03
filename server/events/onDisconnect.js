const leaveChat = require("./share/leaveChat");

const onDisconnect = socket => {
  socket.on("disconnect", () => {
    const SOCKET_ID = socket.id;

    leaveChat(socket, SOCKET_ID);
  });
};

module.exports = onDisconnect;
