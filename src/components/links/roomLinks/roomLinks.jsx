import React from "react";
import RoomLink from "../roomLink/roomLink";
import { Link } from "react-router-dom";
import "./roomLinks.css";

export default ({ show, joinedRooms }) => (
  <div className={`joined_room ${show ? "show" : ""}`}>
    <Link className="room" to="/rooms">
      All
    </Link>
    {joinedRooms.map(joinedRoom => (
      <RoomLink key={joinedRoom.roomName} room={joinedRoom.roomName}>
        {joinedRoom.roomName}
      </RoomLink>
    ))}
  </div>
);
