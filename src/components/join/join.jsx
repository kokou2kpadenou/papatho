import React, { useState } from "react";
// import { Link, Redirect } from "react-router-dom";
import "./join.css";

const Join = ({ connected, emit, history }) => {
  const [name, setName] = useState("");
  // const [room, setRoom] = useState("");

  const _onClick = e => {
    if (!name) {
      e.preventDefault();
    } else {
      emit({ emit: "join-chat", payload: name, handle: "UPDATE_USER" });
      // history.replace({ pathname: "/Alerts" });
      e.preventDefault();
    }
  };

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
        {/* <Link onClick={e => (!name ? e.preventDefault() : null)} to={`/Alerts`}> */}
        <button
          className="join__btn"
          type="submit"
          disabled={!name || !connected}
          onClick={e => _onClick(e)}
        >
          Sign In
        </button>
        {/* </Link> */}
      </form>
    </div>
  );
};

export default Join;
