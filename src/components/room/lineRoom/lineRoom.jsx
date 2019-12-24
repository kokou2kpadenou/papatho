import React from "react";
import { Link } from "react-router-dom";
import "./lineRoom.css";

export default ({ user, room, joinRoom, deleteRoom }) => {
  const { roomName, roomDesc, roomOwner, joined } = room;

  return (
    <div className="lineroom">
      {room.joined ? (
        <Link to={`/${roomName}`} className="lineroom__name">
          {roomName}
        </Link>
      ) : (
        <div to={`/${roomName}`} className="lineroom__name">
          {roomName}
        </div>
      )}
      <div className="lineroom__details">
        <p className="lineroom__desc">{roomDesc}</p>
        <p className="lineroom__owner">{roomOwner}</p>
      </div>
      <div className="lineroom__buttons">
        {roomOwner !== user && (
          <button
            className="lineroom__button"
            disabled={roomOwner === "admin"}
            style={{ color: "green" }}
            onClick={() => joinRoom(roomName)}
          >
            {joined ? "Unjoin" : "Join"}
          </button>
        )}
        {roomOwner === user && (
          <button
            className="lineroom__button"
            style={{ color: "#f00" }}
            onClick={() => deleteRoom(roomName)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
