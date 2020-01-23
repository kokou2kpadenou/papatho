import React, { useState } from "react";
import LineRoom from "./lineRoom/lineRoom";
import NewRoom from "./newRoom/newRoom";
import Button from "../common/button/button";
import "./rooms.css";

export default ({ connected, rooms, user, emit, history }) => {
  const [search, setSearch] = useState("");
  const [showNewRoom, setShowNewRoom] = useState(false);
  return (
    <div className="rooms__container">
      {showNewRoom && (
        <NewRoom
          user={user}
          rooms={rooms}
          emit={emit}
          setShowNewRoom={setShowNewRoom}
        />
      )}
      <div className="rooms__header">
        <Button onClick={() => history.goBack()}>&lt; Back</Button>
        <div className="rooms__input-container">
          <label htmlFor="room-search" className="rooms__input-icon">
            <span role="img" aria-label="magnifying glass">
              &#128269;
            </span>
          </label>
          <input
            id="room-search"
            className="rooms__input"
            value={search}
            aria-label="search rooms"
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Button
          disabled={!connected}
          onClick={() => {
            setShowNewRoom(!showNewRoom);
          }}
        >
          + New Room
        </Button>
      </div>
      <div className="rooms__lists">
        {rooms
          .filter(room =>
            room.roomName.toLowerCase().startsWith(search.toLowerCase())
          )
          .map(room => (
            <LineRoom
              key={room.roomName}
              connected={connected}
              user={user}
              room={room}
              emit={emit}
            />
          ))}
      </div>
    </div>
  );
};
