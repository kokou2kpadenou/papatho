export const user = (state = "", action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return action.result;

    case "RESET_ALL":
      return "";

    default:
      return state;
  }
};
