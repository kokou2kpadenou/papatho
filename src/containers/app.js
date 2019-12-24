import { connect } from "react-redux";
import { onEvent } from "../actions";
import App from "../App";

// const mapStateToProps = state => ({
//   rooms: state.rooms,
//   user: state.user
// });

const mapDispatchToProps = dispatch => ({
  // onOldRooms: () => dispatch(onOldRooms()),
  // closeConnection: () => dispatch(closeConnection()),
  // onConnect: () => dispatch(onConnect()),
  // onDisconnect: () => dispatch(onDisconnect()),
  onEvent: data => dispatch(onEvent(data))
});

export default connect(null, mapDispatchToProps)(App);
