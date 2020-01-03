const Rooms = require("../models/rooms");
const Users = require("../models/users");

const cleanUp = () => {
  Rooms.updateMany({}, { onlineUsers: [], typingUsers: [] })
    .then(res => {
      // console.log(res);
    })
    .catch(err => {
      console.log(err);
    });

  Users.updateMany({}, { socketID: [] })
    .then(res => {
      // console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = cleanUp;
