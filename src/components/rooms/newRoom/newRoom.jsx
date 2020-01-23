import React, { useState, useRef } from "react";
import Button from "../../common/button/button";
import "./newRoom.css";
import { autoGenID } from "../../../helper";

export default ({ user, rooms, emit, setShowNewRoom }) => {
  const [roomName, setRoomName] = useState("");
  const [roomDesc, setRoomDesc] = useState("");

  const ref = useRef(null);

  const _Clear = () => {
    setRoomName("");
    setRoomDesc("");
    ref.current.focus();
    setShowNewRoom(false);
  };

  const _AddRoom = e => {
    e.preventDefault();
    emit({
      emit: "add-room",
      payload: {
        _id: autoGenID(user),
        roomName,
        roomDesc,
        roomOwner: user,
        joinedUsers: [user],
        onlineUsers: [user],
        typingUsers: []
      },
      handle: ""
    });
    _Clear();
  };

  const _cancel = e => {
    if (e.target === e.currentTarget) {
      _Clear();
    }
  };

  const _exist = () => {
    return rooms.filter(room => room.roomName === roomName).length > 0;
  };

  console.log(_exist());

  return (
    <div className="newroom_container" onClick={e => _cancel(e)}>
      <div className="newroom_form">
        <div className={_exist() ? "msg-error" : ""}>
          <input
            ref={ref}
            className="newroom__input"
            placeholder="Room Name"
            aria-label="Room Name"
            type="text"
            value={roomName}
            minLength="2"
            maxLength="6"
            onChange={e =>
              setRoomName(e.target.value.replace(/[^\w]/gi, "").toUpperCase())
            }
          />
        </div>

        <div>
          <input
            className="newroom__input"
            placeholder="Room Description"
            aria-label="Room Description"
            type="text"
            value={roomDesc}
            onChange={e => setRoomDesc(e.target.value)}
          />
        </div>
        <div className="newroom__buttons">
          <Button
            type="submit"
            onClick={e => _AddRoom(e)}
            disabled={!roomName || !roomDesc || roomName.length < 2 || _exist()}
          >
            Add
          </Button>

          <Button onClick={_Clear}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};
