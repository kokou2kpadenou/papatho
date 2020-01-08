import React from "react";
import RoomLink from "../../common/roomLink/roomLink";
import Badge from "../../common/badge/badge";
import "./lineRoom.css";

export default ({ user, room, emit }) => {
  const {
    _id,
    roomName,
    roomDesc,
    roomOwner,
    joinedUsers,
    onlineUsers,
    newMessages
  } = room;

  return (
    <div className="lineroom">
      <RoomLink
        roomName={roomName}
        link={joinedUsers.includes(user)}
        rootPath="/rooms/"
        newMessage={
          newMessages && (joinedUsers.includes(user) || roomOwner === user)
        }
        extraClass={
          roomName === "COMMON" ? "roomname--common" : "roomname--joined"
        }
      />

      <div className="lineroom__details">
        <p className="lineroom__desc">{roomDesc}</p>
        <p
          className="lineroom__owner"
          style={{ display: roomOwner === "admin" ? "none" : "block" }}
        >
          <Badge label="Owner">{roomOwner}</Badge>
          <Badge label="Joined">{joinedUsers.length}</Badge>
          <Badge label="Online">{onlineUsers.length}</Badge>
        </p>
      </div>

      <div className="lineroom__buttons">
        {roomOwner !== user && (
          <button
            className="lineroom__button"
            style={{
              color: "green",
              display: roomOwner === "admin" ? "none" : "block"
            }}
            onClick={() =>
              emit({
                emit: joinedUsers.includes(user) ? "leave-room" : "join-room",
                payload: { userName: user, room: _id },
                handle: ""
              })
            }
          >
            {joinedUsers.includes(user) ? "Leave" : "Join"}
          </button>
        )}
        {roomOwner === user && (
          <button
            className="lineroom__button"
            style={{ color: "#f00" }}
            onClick={() =>
              emit({ emit: "remove-room", payload: _id, handle: "REMOVE_ROOM" })
            }
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
