import { connect } from "react-redux";
import { emit, cancelUserCreation } from "../actions";
import Join from "../components/join/join";

const mapStateToProps = state => ({
  rooms: state.rooms,
  currentUser: state.user.currentUser,
  newUser: state.user.newUser,
  userRef: state.user.ref,
  nbOfAttent: state.user.count,
  connected: state.connected
});

const mapDispatchToProps = dispatch => ({
  emit: data => dispatch(emit(data)),
  cancelUserCreation: () => dispatch(cancelUserCreation())
});

export default connect(mapStateToProps, mapDispatchToProps)(Join);
