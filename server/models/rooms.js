const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  roomName: String,
  roomDesc: String,
  roomOwner: String
});

module.exports = mongoose.model("Rooms", roomsSchema);
