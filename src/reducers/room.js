const rooms_initial = [];

export const rooms = (state = rooms_initial, action) => {
  switch (action.type) {
    case "RESET_ALL":
      return [];

    case "RESET_ROOMS":
      return [];

    case "ADD_ROOMS":
      return action.result;

    case "ADD_ROOM":
      return [...state, { ...action.result }];

    case "REMOVE_ROOM":
      return state.filter(room => room._id !== action.result);

    case "UPDATE_ROOM":
      return state.map(room =>
        room._id === action.result._id ? action.result : room
      );

    default:
      return state;
  }
};
