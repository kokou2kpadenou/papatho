import React from "react";
import "./message.css";

const Message = ({
  message: { sender, text, dateCreated, alertMessage, status },
  user
}) => {
  if (alertMessage) {
    return (
      <div className="alert-message">
        <span className="alert-message__text">{text}</span>
      </div>
    );
  }

  if (sender === user) {
    return (
      <div className="message message--own">
        <div className="message__text message__text--own">
          <p>{text}</p>
        </div>
        {dateCreated && (
          <div className="message__time">
            <p>{dateCreated.slice(0, 10)}</p>
            <p>{dateCreated.slice(11, 19)}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="message">
      <div className="message__time">
        <p className="message__sender">{sender}</p>
        <p>{dateCreated.slice(0, 10)}</p>
        <p>{dateCreated.slice(11, 19)}</p>
      </div>
      <div
        className={`message__text message__text--other ${
          status === "NEW" ? "message__new" : ""
        }`}
      >
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Message;
