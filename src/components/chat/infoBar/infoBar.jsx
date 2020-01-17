import React, { useState } from "react";
import Badge from "../../common/badge/badge";
import ConfirmationDlg from "../../common/confirmationDlg/confirmationDlg";
import Button from "../../common/button/button";
import Icon from "../../common/icon/icon";

import "./infoBar.css";

const InfoBar = ({ user, currentRoom, emit, connected, history }) => {
  const [showDlg, setShowDlg] = useState(false);

  const _exit = () => {
    emit({ emit: "leave-chat", payload: "", handle: "RESET_ALL" });
  };

  const _action = () => {
    if (user === currentRoom.roomOwner) {
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
    setShowDlg(false);
    history.replace("/rooms/COMMON");
  };

  const _clientsTyping = clientsTypingList => {
    // retrieve current user from the list before
    const clientsWithoutCurrentUser = clientsTypingList.filter(
      client => client !== user
    );

    const nbrOfClientsTyping = clientsWithoutCurrentUser.length;

    if (nbrOfClientsTyping === 0 || !connected) {
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

  const dlgMsg =
    user === currentRoom.roomOwner ? (
      <>
        <p>The room and it messages will be deleted from all users.</p>
        <p>Are you sure to continue?</p>
      </>
    ) : (
      <>
        <p>You can not receive messages from the room forward.</p>
        <p>Are you sure to continue?</p>
      </>
    );

  return (
    <div className="info__container">
      {showDlg && (
        <ConfirmationDlg actionFn={_action} cancelFn={() => setShowDlg(false)}>
          {dlgMsg}
        </ConfirmationDlg>
      )}
      <div>
        <h3>
          <Icon
            style={{ margin: "0 1rem 0 0", width: "2rem", height: "2rem" }}
          />
          {currentRoom.roomName}
          {currentRoom.roomName !== "COMMON" && (
            <Button
              disabled={!connected}
              genre={user === currentRoom.roomOwner ? "danger" : "warning"}
              onClick={() => setShowDlg(true)}
            >
              {user === currentRoom.roomOwner ? "Delete" : "Leave"}
            </Button>
          )}
        </h3>
        {currentRoom.roomName !== "COMMON" && (
          <div className="info__details">
            <div>
              <Badge label="Owner">{currentRoom.roomOwner}</Badge>
              {connected && (
                <Badge label="Joined">{currentRoom.joinedUsers.length}</Badge>
              )}
              {connected && (
                <Badge label="Online">{currentRoom.onlineUsers.length}</Badge>
              )}
            </div>
            <div>{_clientsTyping(currentRoom.typingUsers)}</div>
          </div>
        )}
      </div>
      <div>
        <Button onClick={_exit}>Exit Chat</Button>
      </div>
    </div>
  );
};

export default InfoBar;
