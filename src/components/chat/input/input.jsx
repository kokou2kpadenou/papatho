import React, { useState } from "react";
import { autoGenID } from "../../../helper";
import "./input.css";

const Input = ({ user, emit, roomId }) => {
  const [message, setMessage] = useState("");

  const sendMessage = e => {
    e.preventDefault();
    const payload = {
      sender: user,
      text: message,
      room: roomId,
      ref: autoGenID(user)
    };

    if (message) {
      emit({ emit: "message", payload, handle: "ADD_MESSAGE" });
      setMessage("");
    }
  };

  return (
    <form className="input__container">
      <input
        autoFocus
        type="text"
        className="input__input"
        placeholder="Type a message..."
        aria-label="Type a message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
      />
      <button
        className="input__button"
        type="submit"
        onClick={e => sendMessage(e)}
        disabled={!message}
      >
        SEND
      </button>
    </form>
  );
};

export default Input;
