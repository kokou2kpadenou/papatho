import { combineReducers } from "redux";
import { rooms } from "./room";
import { messages } from "./messages";
import { user } from "./user";
import { roomsVisible } from "./roomsVisible";
import { connected } from "./connection";

export default combineReducers({
  user,
  rooms,
  messages,
  roomsVisible,
  connected
});
