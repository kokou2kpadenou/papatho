import { connect } from "react-redux";
import { onEvent } from "../actions";
import App from "../components/app/app";

const mapDispatchToProps = dispatch => ({
  onEvent: data => dispatch(onEvent(data))
});

export default connect(null, mapDispatchToProps)(App);
