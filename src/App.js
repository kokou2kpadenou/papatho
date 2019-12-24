import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Join from "./containers/joinChat";
import Chat from "./containers/chatRooms";
import Rooms from "./containers/rooms";
import NotFound from "./components/notfound/notfound";

const App = ({ onEvent }) => {
  useEffect(() => {
    [
      { event: "connect", handle: "SET_CONNECTED" },
      { event: "connect_error", handle: "SET_DISCONNECTED" },
      { event: "old-rooms", handle: "SET_ROOMS" },
      { event: "old-messages", handle: "SET_MESSAGES" }
    ].map(event => {
      onEvent(event);
      return null;
    });

    return () => {
      onEvent({ event: "close_connection", leave: true });
    };
  });

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Join} />
        <Route path="/rooms" exact component={Rooms} />
        <Route path="/:room?" component={Chat} />
        <Route path="/notfound" component={NotFound} />
        <Redirect to="notfound" />
      </Switch>
    </Router>
  );
};

export default App;
