import { connect } from "react-redux";
import { emit, setRoomsVisibility } from "../actions";
import Chat from "../components/chat/chat";

const findRoomIdByName = (roomNameToFind, rooms) => {
  const roomFound = rooms.filter(({ roomName }) => roomName === roomNameToFind);
  return roomFound[0]._id;
};

const mapStateToProps = (state, ownProps) => ({
  rooms: state.rooms.filter(room => room.joinedUsers.includes(state.user)),
  user: state.user,
  showRooms: state.roomsVisible,
  roomId: findRoomIdByName(ownProps.match.params.room, state.rooms),
  messages: state.messages.filter(
    message =>
      message.room === findRoomIdByName(ownProps.match.params.room, state.rooms)
  )
});

const mapDispatchToProps = dispatch => ({
  emit: data => dispatch(emit(data)),
  setShowRooms: visible => dispatch(setRoomsVisibility(visible))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
