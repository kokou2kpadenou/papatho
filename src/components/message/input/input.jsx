import React, { useState } from "react";
import "./input.css";

const Input = () => {
  const [message, setMessage] = useState("");

  const sendMessage = e => {
    e.preventDefault();
    // if (message) {
    //   socket.emit("sendMessage", message, () => setMessage(""));
    // }
  };

  return (
    <form className="input__container">
      <input
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
