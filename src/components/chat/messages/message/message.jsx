import React from "react";
import "./message.css";

const Message = ({
  message: { sender, text, dateCreated, alertMessage, status },
  user
}) => {
  const sendindDate = new Date(dateCreated);
  const formatDate = sendindDate.toDateString().slice(4);
  const formatTime = sendindDate.toTimeString().slice(0, 8);

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
            <p>{formatDate}</p>
            <p>{formatTime}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="message">
      <div className="message__time">
        <p className="message__sender">{sender}</p>
        <p>{formatDate}</p>
        <p>{formatTime}</p>
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
