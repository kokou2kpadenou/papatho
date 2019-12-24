export const messages = (state = [], action) => {
  switch (action.type) {
    case "RESET_MESSAGES":
      return [];

    case "SET_MESSAGES":
      return action.result;

    case "ADD_MESSAGE":
      return [...state, { ...action.message }];

    case "REMOVE_MESSAGES":
      return state.filter(message => message.room !== action.room);

    case "CHANGE_STATUS":
      return state.map(message =>
        !message.view && message.room === action.room
          ? { ...message, status: action.status }
          : message
      );

    default:
      return state;
  }
};
