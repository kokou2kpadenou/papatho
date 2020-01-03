const Rooms = require("../models/rooms");

const onMessage = require("./onMessage");
const onMessageStatusChange = require("./onMessageStatusChange");

const onAddRoom = require("./onAddRoom");
const onRemoveRoom = require("./onRemoveRoom");
const onJoinRoom = require("./onJoinRoom");
const onLeaveRoom = require("./onLeaveRoom");

const onJoinChat = require("./onJoinChat");
const onLeaveChat = require("./onLeaveChat");

const onDisconnect = require("./onDisconnect");

const onTyping = require("./onTyping");
const onStopTyping = require("./onStopTyping");

const onSocketEvents = (io, socket) => {
  Rooms.findCommonRoom()
    .then(room => {
      // retrieve common room id from the db
      const COMMON_ROOM_ID = room[0]._id;

      // Join chat event
      onJoinChat(socket, COMMON_ROOM_ID);
      // Leave chat event
      onLeaveChat(socket);
      // Add room event
      onAddRoom(io, socket, COMMON_ROOM_ID);
      // Remove room event
      onRemoveRoom(socket, COMMON_ROOM_ID);
      // Join room event
      onJoinRoom(io, socket);
      // Leave room event
      onLeaveRoom(io, socket);
      // Typing event
      onTyping(io, socket);
      // Stop typing event
      onStopTyping(io, socket);
      // Send message event
      onMessage(socket, COMMON_ROOM_ID);
      // Message status change event
      onMessageStatusChange(socket);
      // Disconnect Event
      onDisconnect(socket);
    })
    .catch(err => {
      console.log(err);
    });
};
module.exports = onSocketEvents;
