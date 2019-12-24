import React from "react";
import { NavLink } from "react-router-dom";
import "./roomLink.css";

export default ({ room, children }) => (
  <NavLink
    exact
    to={`/${room}`}
    className="room"
    activeStyle={{ display: "none" }}
  >
    {children}
  </NavLink>
);
