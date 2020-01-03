const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  text: String,
  dateCreated: { type: Date, default: Date.now },
  sender: String,
  alertMessage: { type: Boolean, dafault: false },
  room: { type: Schema.Types.ObjectId, ref: "Rooms" }
});

module.exports = mongoose.model("Messages", messagesSchema);
