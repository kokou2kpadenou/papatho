import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./join.css";

const Join = ({ rooms, user, connected, emit }) => {
  const [name, setName] = useState("");

  const _onClick = e => {
    e.preventDefault();
    if (name) {
      emit({ emit: "join-chat", payload: name, handle: "UPDATE_USER" });
    }
  };

  const checkRoomsLoaded = () => {
    if (rooms.length > 0) {
      if (rooms.filter(room => room.roomName === "COMMON").length > 0) {
        return true;
      }
    }
    return false;
  };

  if (user && checkRoomsLoaded()) {
    return <Redirect to="/rooms/COMMON" />;
  }

  return (
    <div className="join__container">
      <form className="join__content">
        <div>
          {!connected && <p style={{ color: "red" }}>Network Issue</p>}
          <h1 className="join__title">Join</h1>
          <input
            className="join__input"
            placeholder="Name"
            aria-label="Name"
            type="text"
            onChange={e => setName(e.target.value)}
          />
        </div>
        <button
          className="join__btn"
          type="submit"
          disabled={!name || !connected}
          onClick={e => _onClick(e)}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Join;
