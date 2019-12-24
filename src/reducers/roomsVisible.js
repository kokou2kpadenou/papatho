export const roomsVisible = (state = false, action) => {
  switch (action.type) {
    case "SET_ROOM_VISIBILITY":
      return action.visible;

    default:
      return state;
  }
};
