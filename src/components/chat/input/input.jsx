import React, { useState } from "react";
import { autoGenID } from "../../../helper";
import "./input.css";

const TYPING_TIMER_LENGTH = 2000;
let lastTypingTime;
let typing = false;

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
      emit({
        emit: "stop-typing",
        payload: { userName: user, room: roomId },
        handle: ""
      });
      typing = false;
    }
  };

  const updateTyping = () => {
    if (!typing) {
      typing = true;
      emit({
        emit: "typing",
        payload: { userName: user, room: roomId },
        handle: ""
      });
    }
    lastTypingTime = new Date().getTime();

    setTimeout(() => {
      const typingTimer = new Date().getTime();
      const timeDiff = typingTimer - lastTypingTime;
      if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
        emit({
          emit: "stop-typing",
          payload: { userName: user, room: roomId },
          handle: ""
        });

        typing = false;
      }
    }, TYPING_TIMER_LENGTH);
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
        onInput={e => {
          updateTyping();
        }}
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
