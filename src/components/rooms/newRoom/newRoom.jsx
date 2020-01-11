import React, { useState, useRef } from "react";
import Button from "../../common/button/button";
import "./newRoom.css";
import { autoGenID } from "../../../helper";

export default ({ user, emit, setShowNewRoom }) => {
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

  return (
    <div className="newroom_container" onClick={e => _cancel(e)}>
      <form className="newroom_form">
        <div>
          <input
            ref={ref}
            className="newroom__input"
            placeholder="Room Name"
            aria-label="Room Name"
            type="text"
            value={roomName}
            onChange={e => setRoomName(e.target.value)}
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
            disabled={!roomName || !roomDesc}
          >
            Add
          </Button>

          <Button onClick={_Clear}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};
