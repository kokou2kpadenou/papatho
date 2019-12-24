import React from "react";
import LineRoom from "../lineRoom/lineRoom";
import NewRoom from "../newRoom/newRoom";
import "./manageRooms.css";

export default ({ rooms, user, addRooms, joinRoom, deleteRoom, history }) => {
  console.log(rooms);

  return (
    <div className="rooms__container">
      <button onClick={() => history.goBack()}>Back</button>
      <NewRoom user={user} addRooms={addRooms} />
      <div>
        {rooms.map(room => (
          <LineRoom
            key={room.roomName}
            user={user}
            room={room}
            joinRoom={joinRoom}
            deleteRoom={deleteRoom}
          />
        ))}
      </div>
    </div>
  );
};
