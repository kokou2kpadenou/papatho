import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../message/message";
import "./messages.css";

const Messages = ({ messages, user }) => {
  return (
    <ScrollToBottom
      className="messages__container"
      scrollViewClassName="messages__content"
    >
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} user={user} />
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
