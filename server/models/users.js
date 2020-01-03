const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = Schema({
  _id: Schema.Types.ObjectId,
  user: String,
  socketID: [String],
  rooms: [{ type: Schema.Types.ObjectId, ref: "Rooms" }],
  messages: [
    {
      _id: false,
      message: { type: Schema.Types.ObjectId, ref: "Messages" },
      status: String
    }
  ]
});

module.exports = mongoose.model("Users", usersSchema);
