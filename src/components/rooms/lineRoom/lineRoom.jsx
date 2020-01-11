import React, { useState } from "react";
import RoomLink from "../../common/roomLink/roomLink";
import Badge from "../../common/badge/badge";
import Button from "../../common/button/button";
import ConfirmationDlg from "../../common/confirmationDlg/confirmationDlg";
import "./lineRoom.css";

export default ({ connected, user, room, emit }) => {
  const {
    _id,
    roomName,
    roomDesc,
    roomOwner,
    joinedUsers,
    onlineUsers,
    newMessages
  } = room;

  const [showDlg, setShowDlg] = useState(false);

  const _action = () => {
    if (roomOwner === user) {
      emit({
        emit: "remove-room",
        payload: _id,
        handle: "REMOVE_ROOM"
      });
    } else {
      emit({
        emit: joinedUsers.includes(user) ? "leave-room" : "join-room",
        payload: { userName: user, room: _id },
        handle: ""
      });
    }
  };

  const dlgMsg =
    user === roomOwner ? (
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
    <div className="lineroom">
      {showDlg && (
        <ConfirmationDlg actionFn={_action} cancelFn={() => setShowDlg(false)}>
          {dlgMsg}
        </ConfirmationDlg>
      )}
      <RoomLink
        roomName={roomName}
        link={joinedUsers.includes(user)}
        rootPath="/rooms/"
        newMessage={
          newMessages && (joinedUsers.includes(user) || roomOwner === user)
        }
        extraClass={
          roomName === "COMMON" ? "roomname--common" : "roomname--joined"
        }
      />

      <div className="lineroom__details">
        <p className="lineroom__desc">{roomDesc}</p>
        <p
          className="lineroom__owner"
          style={{ display: roomOwner === "admin" ? "none" : "block" }}
        >
          <Badge label="Owner">{roomOwner}</Badge>
          {connected && <Badge label="Joined">{joinedUsers.length}</Badge>}
          {connected && <Badge label="Online">{onlineUsers.length}</Badge>}
        </p>
      </div>

      <div className="lineroom__buttons">
        <Button
          disabled={!connected}
          show={roomOwner !== "admin"}
          genre={roomOwner === user ? "danger" : "warning"}
          onClick={() => setShowDlg(true)}
        >
          {roomOwner === user
            ? "Delete"
            : joinedUsers.includes(user)
            ? "Leave"
            : "Join"}
        </Button>
      </div>
    </div>
  );
};
