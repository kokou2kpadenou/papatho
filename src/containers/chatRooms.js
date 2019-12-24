import { connect } from "react-redux";
import { addMessage, setRoomsVisibility } from "../actions";
import Chat from "../components/chat/chat";

const mapStateToProps = (state, ownProps) => ({
  rooms: state.rooms,
  user: state.user,
  messages: state.messages,
  // messages: state.messages.filter(
  //   message => message.room === ownProps.params.room
  // ),
  showRooms: state.roomsVisible
});

const mapDispatchToProps = dispatch => ({
  addMessage: message => dispatch(addMessage(message)),
  setShowRooms: visible => dispatch(setRoomsVisibility(visible))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
