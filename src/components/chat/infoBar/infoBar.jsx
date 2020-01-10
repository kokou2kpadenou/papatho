import React, { useState } from "react";
import Badge from "../../common/badge/badge";
import ConfirmationDlg from "../../common/confirmationDlg/confirmationDlg";

import "./infoBar.css";

const InfoBar = ({ user, currentRoom, emit, history }) => {
  const [showDlg, setShowDlg] = useState(false);

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
    history.replace("/rooms/COMMON");
  };

  const _clientsTyping = clientsTypingList => {
    // retrieve current user from the list before
    const clientsWithoutCurrentUser = clientsTypingList.filter(
      client => client !== user
    );

    const nbrOfClientsTyping = clientsWithoutCurrentUser.length;

    if (nbrOfClientsTyping === 0) {
      return "...";
    }

    if (nbrOfClientsTyping === 1) {
      return `${clientsWithoutCurrentUser.join(",")} is typing.`;
    }

    if (nbrOfClientsTyping > 1 && nbrOfClientsTyping < 5) {
      return `${clientsWithoutCurrentUser.join(",")} are typing.`;
    }

    if (nbrOfClientsTyping >= 5) {
      return `${clientsWithoutCurrentUser
        .slice(0, 4)
        .join(",")} and more are typing.`;
    }
  };

  return (
    <div className="info__container">
      {showDlg && (
        <ConfirmationDlg
          actionFnc={_action}
          owner={user === currentRoom.roomOwner ? "Delete?" : "Leave?"}
          cancelFunc={() => setShowDlg(false)}
        >
          {user === currentRoom.roomOwner ? (
            <>
              <p>The room and it messages will be deleted from all users</p>
              <p>Are you sure to continue?</p>
            </>
          ) : (
            <>
              <p>You can not receive messages from the room forward.</p>
              <p>Are you sure to continue?</p>
            </>
          )}
        </ConfirmationDlg>
      )}
      <div>
        <h3>
          {currentRoom.roomName}
          {currentRoom.roomName !== "COMMON" && (
            <button
              style={{ color: "#f00", marginLeft: "5px" }}
              className="info__button"
              onClick={() => setShowDlg(true)}
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
