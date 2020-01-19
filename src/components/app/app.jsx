import React, { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const Join = lazy(() => import("../../containers/join"));
const Chat = lazy(() => import("../../containers/chat"));
const Rooms = lazy(() => import("../../containers/rooms"));
const NotFound = lazy(() => import("../notfound/notfound"));

const App = ({ onEvent }) => {
  useEffect(() => {
    const events = [
      { event: "connect", handle: "SET_CONNECTED" },
      { event: "connect_error", handle: "SET_DISCONNECTED" },
      { event: "messages", handle: "ADD_MESSAGES" },
      { event: "new-messages", handle: "ADD_NEW_MESSAGES" },
      { event: "message", handle: "ADD_MESSAGE" },
      { event: "update-message", handle: "UPDATE_MESSAGE" },
      { event: "remove-messages", handle: "REMOVE_MESSAGES" },
      { event: "rooms", handle: "ADD_ROOMS" },
      { event: "room", handle: "ADD_ROOM" },
      { event: "update-room", handle: "UPDATE_ROOM" },
      { event: "remove-room", handle: "REMOVE_ROOM" },
      { event: "user-exist", handle: "UPDATE_CURRENT_USER" },
      { event: "user-not-exist", handle: "UPDATE_NEW_USER" },
      { event: "user-taken", handle: "CLEAR_USER" }
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
      <Suspense fallback={<div>Loding...</div>}>
        <Switch>
          <Route path="/rooms/:room" component={Chat} />
          <Route path="/rooms" exact component={Rooms} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Join} />
          <Redirect to="/not-found" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
