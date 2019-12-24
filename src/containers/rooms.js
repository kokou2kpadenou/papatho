import { connect } from "react-redux";
import { addRoom, removeRoom, joinRoom } from "../actions";
import ManageRooms from "../components/room/manageRooms/manageRooms";

const mapStateToProps = state => ({
  rooms: state.rooms,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  addRooms: newRoom => dispatch(addRoom(newRoom)),
  joinRoom: rName => dispatch(joinRoom(rName)),
  deleteRoom: rName => dispatch(removeRoom(rName))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageRooms);
