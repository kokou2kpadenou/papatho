import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./roomLink.css";

export default ({
  roomName,
  nav = false,
  link = false,
  newMessage = false,
  rootPath = "/"
}) => {
  const shortName = roomName.slice(0, 1);
  const roomNewMessageClass = `roomname ${newMessage ? "new-message" : ""}`;

  if (!nav) {
    return link ? (
      <Link
        to={`${rootPath}${roomName}`}
        className={roomNewMessageClass}
        data-short={shortName}
      >
        {roomName}
      </Link>
    ) : (
      <div className="roomname" data-short={shortName}>
        {roomName}
      </div>
    );
  }

  return (
    <NavLink
      exact
      to={`${rootPath}${roomName}`}
      className={roomNewMessageClass}
      data-short={shortName}
      activeStyle={{ display: "none" }}
    >
      {roomName}
    </NavLink>
  );
};
