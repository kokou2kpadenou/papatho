import React from "react";

import InfoBar from "../message/infoBar/infoBar";
import Input from "../message/input/input";
import Messages from "../message/messages/messages";

import RoomLinks from "../links/roomLinks/roomLinks";

import "./chat.css";

const Chat = ({
  rooms,
  user,
  messages,
  showRooms,
  setShowRooms,
  match: { params }
}) => {
  const _showListRooms = () => {
    setShowRooms(!showRooms);
  };
  return (
    <div className="chat__container">
      <div className="chat__content">
        <InfoBar room={params.room} showListRooms={_showListRooms} />
        <Messages messages={messages} name={user} />
        <RoomLinks
          show={showRooms}
          joinedRooms={rooms.filter(
            room => room.joined || room.roomOwner === user
          )}
        />
        <Input />
      </div>
    </div>
  );
};

export default Chat;
