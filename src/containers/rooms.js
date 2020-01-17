import { connect } from "react-redux";
import { emit, roomHasNewMessage } from "../actions";
import ManageRooms from "../components/rooms/rooms";

const mapStateToProps = state => ({
  rooms: state.rooms.map(userRoom => ({
    ...userRoom,
    newMessages: roomHasNewMessage(userRoom._id, state.messages.messages)
  })),
  user: state.user.currentUser,
  connected: state.connected
});

const mapDispatchToProps = dispatch => ({
  emit: data => dispatch(emit(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageRooms);
