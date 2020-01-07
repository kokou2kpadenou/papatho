import React from "react";
import Badge from "../../common/badge/badge";

import "./infoBar.css";

const InfoBar = ({ user, currentRoom, emit }) => {
  const _exit = () => {
    emit({ emit: "leave-chat", payload: "", handle: "RESET_ALL" });
  };

  const _action = owner => {
    if (owner) {
      emit({
        emit: "remove-room",
        payload: currentRoom._id,
        handle: "REMOVE_ROOM"
      });
    } else {
      emit({
        emit: "leave-room",
        payload: { userName: user, room: currentRoom._id },
        handle: ""
      });
    }

    // TODO:
  };

  const _clientsTyping = clientsTypingList => {
    if (clientsTypingList.length === 0) {
      return "...";
    }

    if (clientsTypingList > 0 && clientsTypingList < 5) {
      return `${clientsTypingList.join(",")} are typing.`;
    }

    if (clientsTypingList >= 5) {
      return `${clientsTypingList.slice(0, 4).join(",")} and more are typing.`;
    }
  };

  return (
    <div className="info__container">
      <div>
        <h3>
          {currentRoom.roomName}
          {currentRoom.roomName !== "COMMON" && (
            <button
              style={{ color: "#f00", marginLeft: "5px" }}
              className="info__button"
              onClick={() => _action(user === currentRoom.roomOwner)}
            >
              {user === currentRoom.roomOwner ? "Delete" : "Leave"}
            </button>
          )}
        </h3>
        {currentRoom.roomName !== "COMMON" && (
          <div className="info__details">
            <div>
              <Badge label="Owner">{currentRoom.roomOwner}</Badge>
              <Badge label="Joined">{currentRoom.joinedUsers.length}</Badge>
              <Badge label="Online">{currentRoom.onlineUsers.length}</Badge>
            </div>
            <div>{_clientsTyping(currentRoom.typingUsers)}</div>
          </div>
        )}
      </div>
      <div>
        <button className="info__button" onClick={_exit}>
          Exit chat
        </button>
      </div>
    </div>
  );
};

export default InfoBar;
