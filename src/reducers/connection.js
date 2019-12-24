export const connected = (state = true, action) => {
  switch (action.type) {
    case "SET_CONNECTED":
      return true;

    case "SET_DISCONNECTED":
      return false;

    default:
      return state;
  }
};
