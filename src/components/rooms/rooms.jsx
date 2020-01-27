import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import LineRoom from "./lineRoom/lineRoom";
import NewRoom from "./newRoom/newRoom";
import Button from "../common/button/button";
import "./rooms.css";

export default ({ connected, rooms, user, emit, history }) => {
  const [search, setSearch] = useState("");
  const [showNewRoom, setShowNewRoom] = useState(false);

  if (!user) {
    return <Redirect to="/" />;
  }

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
        <Button onClick={() => history.goBack()}>
          <span className="rooms__button-wrap">
            <svg className="rooms__svg" viewBox="0 0 24 24">
              <path d="M15.422 7.406l-4.594 4.594 4.594 4.594-1.406 1.406-6-6 6-6z"></path>
            </svg>
            <span>Back</span>
          </span>
        </Button>
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
            onChange={e =>
              setSearch(e.target.value.replace(/[^\w]/gi, "").toUpperCase())
            }
          />
        </div>
        <Button
          disabled={!connected}
          onClick={() => {
            setShowNewRoom(!showNewRoom);
          }}
        >
          <span className="rooms__button-wrap">
            <svg className="rooms__svg" viewBox="0 0 24 24">
              <path d="M12.984 12.984q1.875 0 3.938 0.82t2.063 2.18v2.016h-12v-2.016q0-1.359 2.063-2.18t3.938-0.82zM19.641 13.172q1.734 0.281 3.047 1.008t1.313 1.805v2.016h-3v-2.016q0-1.594-1.359-2.813zM12.984 11.016q-1.219 0-2.109-0.891t-0.891-2.109 0.891-2.109 2.109-0.891 2.109 0.891 0.891 2.109-0.891 2.109-2.109 0.891zM18 11.016q-0.469 0-0.891-0.141 0.891-1.266 0.891-2.859t-0.891-2.859q0.422-0.141 0.891-0.141 1.219 0 2.109 0.891t0.891 2.109-0.891 2.109-2.109 0.891zM8.016 9.984v2.016h-3v3h-2.016v-3h-3v-2.016h3v-3h2.016v3h3z"></path>
            </svg>
            <span> New Room</span>
          </span>
        </Button>
      </div>
      <div className="rooms__lists">
        {rooms
          .filter(room =>
            room.roomName.toLowerCase().includes(search.toLowerCase())
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
