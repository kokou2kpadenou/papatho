import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../message/message";
import "./messages.css";

const Messages = ({ messages, user }) => {
  return (
    <div
      className="messages__container"
      style={{ height: "calc(100% - 250px)" }}
    >
      <ScrollToBottom
        className="messages__content"
        scrollViewClassName="messages__scroll-view"
        followButtonClassName="messages__followButton"
        mode="bottom"
      >
        {messages.map((message, i) => (
          <div key={i}>
            <Message message={message} user={user} />
          </div>
        ))}
      </ScrollToBottom>
    </div>
  );
};

export default Messages;
