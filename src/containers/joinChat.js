import { connect } from "react-redux";
import { emit } from "../actions";
import Join from "../components/join/join";

const mapStateToProps = state => ({
  user: state.user,
  connected: state.connected
});

const mapDispatchToProps = dispatch => ({
  emit: data => dispatch(emit(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Join);
