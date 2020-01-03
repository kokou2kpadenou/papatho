const leaveChat = require("./share/leaveChat");

const onLeaveChat = socket => {
  socket.on("leave-chat", () => {
    const SOCKET_ID = socket.id;

    leaveChat(socket, SOCKET_ID);
  });
};

module.exports = onLeaveChat;
