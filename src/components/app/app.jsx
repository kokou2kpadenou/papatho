import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Join from "../../containers/join";
import Chat from "../../containers/chat";
import Rooms from "../../containers/rooms";
import NotFound from "../notfound/notfound";

const App = ({ onEvent }) => {
  useEffect(() => {
    const events = [
      { event: "connect", handle: "SET_CONNECTED" },
      { event: "connect_error", handle: "SET_DISCONNECTED" },
      { event: "messages", handle: "ADD_MESSAGES" },
      { event: "message", handle: "ADD_MESSAGE" },
      { event: "update-message", handle: "UPDATE_MESSAGE" },
      { event: "remove-messages", handle: "REMOVE_MESSAGES" },
      { event: "rooms", handle: "ADD_ROOMS" },
      { event: "room", handle: "ADD_ROOM" },
      { event: "update-room", handle: "UPDATE_ROOM" },
      { event: "remove-room", handle: "REMOVE_ROOM" }
    ];

    events.forEach(event => {
      onEvent(event);
    });

    return () => {
      onEvent({ event: "close_connection", leave: true });
    };
  });

  return (
    <Router>
      <Switch>
        <Route path="/rooms/:room" component={Chat} />
        <Route path="/rooms" exact component={Rooms} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/" exact component={Join} />
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  );
};

export default App;
