import React, { useState } from "react";
import LineRoom from "./lineRoom/lineRoom";
import NewRoom from "./newRoom/newRoom";
import "./rooms.css";

export default ({ rooms, user, emit, history }) => {
  const [search, setSearch] = useState("");
  const [showNewRoom, setShowNewRoom] = useState(false);
  return (
    <div className="rooms__container">
      {showNewRoom && (
        <NewRoom user={user} emit={emit} setShowNewRoom={setShowNewRoom} />
      )}
      <div className="rooms__header">
        <button className="room__button" onClick={() => history.goBack()}>
          &lt; Back
        </button>
        <div className="rooms__input-container">
          <label htmlFor="room-search" className="rooms__input-icon">
            {" "}
            &#128269;
          </label>
          <input
            id="room-search"
            className="rooms__input"
            value={search}
            aria-label="search rooms"
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button
          className="room__button"
          onClick={() => {
            setShowNewRoom(!showNewRoom);
          }}
        >
          + New Room
        </button>
      </div>
      <div className="rooms__lists">
        {rooms
          .filter(room =>
            room.roomName.toLowerCase().startsWith(search.toLowerCase())
          )
          .map(room => (
            <LineRoom key={room.roomName} user={user} room={room} emit={emit} />
          ))}
      </div>
    </div>
  );
};
