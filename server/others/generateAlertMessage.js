const ObjectId = require("mongoose").Types.ObjectId;

const generateAlertMessage = ({ room, text }) => ({
  _id: new ObjectId(),
  text,
  dateCreated: Date().toLocaleString(),
  sender: "admin",
  alertMessage: true,
  room,
  status: "NEW"
});

module.exports = generateAlertMessage;
