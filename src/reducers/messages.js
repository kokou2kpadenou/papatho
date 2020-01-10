const initialMessages = { currentRoom: "", messages: [] };

export const messages = (state = initialMessages, action) => {
  switch (action.type) {
    case "RESET_ALL":
      return { currentRoom: "", messages: [] };

    case "UPDATE_CURRENT_ROOM":
      return { ...state, currentRoom: action.room };

    case "RESET_MESSAGES":
      return { ...state, messages: [] };

    case "ADD_MESSAGES":
      return { ...state, messages: action.result };

    case "ADD_MESSAGE":
      console.log(state.currentRoom);

      return {
        ...state,
        messages: [
          ...state.messages,
          state.currentRoom === action.result.room &&
          action.result.status === "NEW"
            ? { ...action.result, status: "VIEW" }
            : action.result
        ]
      };

    case "UPDATE_MESSAGE":
      return {
        ...state,
        messages: state.messages.map(message =>
          message.ref === action.result.ref ? action.result : message
        )
      };

    case "REMOVE_MESSAGES":
      return {
        ...state,
        messages: state.messages.filter(
          message => message.room !== action.result
        )
      };

    case "CHANGE_STATUS":
      return {
        ...state,
        messages: state.messages.map(message =>
          message.status === "NEW" && message.room === action.result.room
            ? { ...message, status: action.result.status }
            : message
        )
      };

    default:
      return state;
  }
};
