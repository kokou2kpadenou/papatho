const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  roomName: String,
  roomDesc: String,
  roomOwner: String,
  joinedUsers: [String],
  onlineUsers: [String],
  typingUsers: [String]
});

roomsSchema.static("findCommonRoom", function() {
  return this.find({ roomName: "COMMON" });
});

module.exports = mongoose.model("Rooms", roomsSchema);
