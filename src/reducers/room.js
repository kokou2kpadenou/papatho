const rooms_initial = [];

export const rooms = (state = rooms_initial, action) => {
  switch (action.type) {
    case "SET_ROOMS":
      return action.result;

    case "RESET_ROOM":
      return [];

    case "ADD_ROOM":
      return [...state, action.room];

    case "DELETE_ROOM":
      return state.filter(room => room.roomName !== action.roomName);

    case "JOIN_ROOM":
      return state.map(room =>
        room.roomName === action.roomName
          ? { ...room, joined: !room.joined }
          : room
      );

    default:
      return state;
  }
};
