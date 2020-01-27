import React from "react";
import { Redirect } from "react-router-dom";

import { useMessageStatusChange } from "./useMessageStatusChange";

import InfoBar from "./infoBar/infoBar";
import Messages from "./messages/messages/messages";
import RoomLinks from "./roomLinks/roomLinks";
import Sender from "./sender/sender";

import "./chat.css";

const Chat = ({
  rooms,
  user,
  messages,
  connected,
  showRooms,
  currentRoom,
  currentRoomId,
  currentRoomHasNewMessages,
  emit,
  setShowRooms,
  setCurrentRoom,
  match: { params },
  history
}) => {
  const _showListRooms = () => {
    setShowRooms(!showRooms);
  };

  useMessageStatusChange(
    currentRoomId,
    emit,
    user,
    setCurrentRoom,
    currentRoomHasNewMessages
  );

  if (!user) {
    return <Redirect to="/" />;
  }

  if (!currentRoom) {
    return <Redirect to="/rooms/COMMON" />;
  }

  return (
    <div className="chat__container">
      <div className="chat__content">
        <InfoBar
          user={user}
          currentRoom={currentRoom}
          emit={emit}
          history={history}
          connected={connected}
        />
        <Messages messages={messages} user={user} />
        <RoomLinks
          show={showRooms}
          joinedRooms={rooms}
          showListRooms={_showListRooms}
        />
        {params.room !== "COMMON" && (
          <Sender
            user={user}
            emit={emit}
            roomId={currentRoom._id}
            connected={connected}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
