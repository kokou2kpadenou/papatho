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
    setShowDlg(false);
  };

  const roomOptions = () => {
    if (user === roomOwner) {
      return {
        dlgMsg: (
          <>
            <p>
              The room ({roomName})and its messages will be deleted from all
              users in the room include yourself.
            </p>
            <p>Are you sure to continue?</p>
          </>
        ),
        dlgTitle: "Delete Room",
        dlgType: "warning",
        buttonLabel: "Delete"
      };
    }

    if (joinedUsers.includes(user)) {
      return {
        dlgMsg: (
          <>
            <p>
              By leaving {roomName}, you can no longer receive a message from
              the room in the future.
            </p>
            <p>Are you sure to continue?</p>
          </>
        ),
        dlgTitle: "Leave Room",
        dlgType: "warning",
        buttonLabel: "Leave"
      };
    }

    return {
      dlgMsg: (
        <>
          <p>You are about to join {roomName}.</p>
          <p>Are you sure to continue?</p>
        </>
      ),
      dlgTitle: "Join Room",
      dlgType: "info",
      buttonLabel: "Join"
    };
  };

  return (
    <div className="lineroom">
      {showDlg && (
        <ConfirmationDlg
          actionFn={_action}
          cancelFn={() => setShowDlg(false)}
          dlgType={roomOptions().dlgType}
          dlgTitle={roomOptions().dlgTitle}
        >
          {roomOptions().dlgMsg}
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
          {roomOptions().buttonLabel}
        </Button>
      </div>
    </div>
  );
};
