import React, { useState, lazy, Suspense } from "react";
// import Emoji from "./emoji/emoji";
import { autoGenID } from "../../../helper";
import "./sender.css";

const Emoji = lazy(() => import("./emoji/emoji"));

const TYPING_TIMER_LENGTH = 2000;
let lastTypingTime;
let typing = false;
const isTouchDevice = "ontouchstart" in document.documentElement;

const Input = ({ user, emit, roomId, connected }) => {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const sendMessage = e => {
    e.preventDefault();
    const payload = {
      sender: user,
      text: message,
      room: roomId,
      ref: autoGenID(user)
    };

    if (message && connected) {
      emit({ emit: "message", payload, handle: "ADD_MESSAGE" });
      setMessage("");
      emit({
        emit: "stop-typing",
        payload: { userName: user, room: roomId },
        handle: ""
      });
      typing = false;
      setShowEmoji(false);
    }
  };

  const addEmoji = emojiToAdd => {
    setMessage(message + emojiToAdd);
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
      {(showEmoji || !connected) && (
        <Suspense
          fallback={
            <div
              style={{
                fontSize: "0.6rem",
                position: "absolute",
                left: "0px",
                bottom: "100%",
                zIndez: "100"
              }}
            >
              Loading...
            </div>
          }
        >
          <Emoji addEmoji={addEmoji} />
        </Suspense>
      )}
      <button
        className="input__button input__button--emoji"
        onClick={e => {
          e.preventDefault();
          setShowEmoji(!showEmoji);
        }}
        disabled={!connected}
      >
        <svg className="input__emoji" viewBox="0 0 20 20">
          <path d="M10 0.4c-5.302 0-9.6 4.298-9.6 9.6s4.298 9.6 9.6 9.6c5.301 0 9.6-4.298 9.6-9.601 0-5.301-4.299-9.599-9.6-9.599zM10 17.599c-4.197 0-7.6-3.402-7.6-7.6s3.402-7.599 7.6-7.599c4.197 0 7.601 3.402 7.601 7.6s-3.404 7.599-7.601 7.599zM7.501 9.75c0.828 0 1.499-0.783 1.499-1.75s-0.672-1.75-1.5-1.75-1.5 0.783-1.5 1.75 0.672 1.75 1.501 1.75zM12.5 9.75c0.829 0 1.5-0.783 1.5-1.75s-0.672-1.75-1.5-1.75-1.5 0.784-1.5 1.75 0.672 1.75 1.5 1.75zM14.341 11.336c-0.363-0.186-0.815-0.043-1.008 0.32-0.034 0.066-0.869 1.593-3.332 1.593-2.451 0-3.291-1.513-3.333-1.592-0.188-0.365-0.632-0.514-1.004-0.329-0.37 0.186-0.52 0.636-0.335 1.007 0.050 0.099 1.248 2.414 4.672 2.414 3.425 0 4.621-2.316 4.67-2.415 0.184-0.367 0.036-0.81-0.33-0.998z"></path>
        </svg>
      </button>
      <input
        autoFocus={!isTouchDevice}
        type="text"
        className="input__input"
        placeholder={connected ? "Type a message..." : "Server no available!!!"}
        aria-label="Type a message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
        onInput={e => {
          updateTyping();
        }}
        onFocus={() => {
          setShowEmoji(false);
        }}
        disabled={!connected}
      />
      <button
        className="input__button input__button--send"
        type="submit"
        onClick={e => sendMessage(e)}
        disabled={!connected || !message}
      >
        SEND
      </button>
    </form>
  );
};

export default Input;
