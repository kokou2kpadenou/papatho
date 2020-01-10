import { connect } from "react-redux";
import {
  emit,
  setRoomsVisibility,
  roomHasNewMessage,
  findRoomIdByName,
  setCurrentRoom
} from "../actions";
import Chat from "../components/chat/chat";

const mapStateToProps = (state, ownProps) => ({
  rooms: state.rooms
    .filter(room => room.joinedUsers.includes(state.user))
    .map(userRoom => ({
      ...userRoom,
      newMessages: roomHasNewMessage(userRoom._id, state.messages.messages)
    })),

  user: state.user,

  connected: state.connected,

  showRooms: state.roomsVisible,

  currentRoomId: findRoomIdByName(ownProps.match.params.room, state.rooms),

  currentRoomHasNewMessages: roomHasNewMessage(
    findRoomIdByName(ownProps.match.params.room, state.rooms),
    state.messages.messages
  ),

  currentRoom: state.rooms.filter(
    ({ roomName }) => roomName === ownProps.match.params.room
  )[0],

  messages: state.messages.messages.filter(
    message =>
      message.room === findRoomIdByName(ownProps.match.params.room, state.rooms)
  )
});

const mapDispatchToProps = dispatch => ({
  emit: data => dispatch(emit(data)),
  setShowRooms: visible => dispatch(setRoomsVisibility(visible)),
  setCurrentRoom: room => dispatch(setCurrentRoom(room))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
