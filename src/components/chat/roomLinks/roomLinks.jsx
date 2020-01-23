import React from "react";
import RoomLink from "../../common/roomLink/roomLink";
import "./roomLinks.css";

/**
 *
 */
const Arrow = () => (
  <svg viewBox="0 0 20 20">
    <path d="M17.418 6.109c0.272-0.268 0.709-0.268 0.979 0s0.271 0.701 0 0.969l-7.908 7.83c-0.27 0.268-0.707 0.268-0.979 0l-7.908-7.83c-0.27-0.268-0.27-0.701 0-0.969s0.709-0.268 0.979 0l7.419 7.141 7.418-7.141z"></path>
  </svg>
);

/**
 *
 */
const SwitchShowHide = ({ show, showListRooms }) => (
  <div className="nav-rooms__show-button" onClick={showListRooms}>
    <span className={`nav-rooms__icon ${show ? "show-left" : "hide-icon"}`}>
      <Arrow />
    </span>
    <span className="nav-rooms__label">{`${
      show ? "Show Rooms Lists" : "Hide Rooms List"
    }`}</span>
    <span className={`nav-rooms__icon ${show ? "show-right" : "hide-icon"}`}>
      <Arrow />
    </span>
  </div>
);

export default ({ show, joinedRooms, showListRooms }) => (
  <div className="nav-rooms">
    <SwitchShowHide show={show} showListRooms={showListRooms} />
    <div className={`nav-rooms__list ${show ? "no" : ""}`}>
      <RoomLink roomName="ROOMS" link={true}>
        ROOMS
      </RoomLink>
      {joinedRooms.map(joinedRoom => (
        <RoomLink
          key={joinedRoom._id}
          roomName={joinedRoom.roomName}
          nav={true}
          rootPath="/rooms/"
          newMessage={joinedRoom.newMessages}
          extraClass={
            joinedRoom.roomName === "COMMON"
              ? "roomname--common"
              : "roomname--joined"
          }
        />
      ))}
    </div>
  </div>
);
