import React from "react";
import RoomLink from "../../common/roomLink/roomLink";
import "./roomLinks.css";

export default ({ show, joinedRooms, showListRooms }) => (
  <div className="nav-rooms">
    <div className="nav-rooms__show-button" onClick={showListRooms}>
      <span className={`nav-rooms__icon ${show ? "show-left" : "hide-icon"}`}>
        ↓
      </span>
      <span className="nav-rooms__label">{`${
        show ? "Show Rooms Lists" : "Hide Rooms List"
      }`}</span>
      <span className={`nav-rooms__icon ${show ? "show-right" : "hide-icon"}`}>
        ↓
      </span>

      {/* {show ? (
        <>
          <span>↑</span>
          <span className="nav-rooms__label">Show Rooms Lists</span>
          <span>↑</span>
        </>
      ) : (
        <>
          <span>↓</span>
          <span className="nav-rooms__label">Hide Rooms List</span>
          <span>↓</span>
        </>
      )} */}
    </div>
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
