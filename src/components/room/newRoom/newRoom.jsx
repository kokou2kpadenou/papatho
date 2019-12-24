import React, { useState, useRef } from "react";
import "./newRoom.css";

export default ({ addRooms }) => {
  const [roomName, setRoomName] = useState("");
  const [roomDesc, setRoomDesc] = useState("");

  const ref = useRef(null);

  const _Clear = () => {
    setRoomName("");
    setRoomDesc("");
    ref.current.focus();
  };

  const _AddRoom = () => {
    addRooms({ roomName, roomDesc, roomOwner: "kokou", joined: true });
    _Clear();
  };

  return (
    <form>
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
        <button
          type="submit"
          className="newroom__button"
          onClick={_AddRoom}
          disabled={!roomName || !roomDesc}
        >
          Add
        </button>
        <button
          type="reset"
          className="newroom__button"
          onClick={_Clear}
          disabled={!roomName && !roomDesc}
        >
          Clear
        </button>
      </div>
    </form>
  );
};
