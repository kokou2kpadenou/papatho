const initialUser = { currentUser: "", newUser: "", ref: "", count: 0 };

export const user = (state = initialUser, action) => {
  switch (action.type) {
    case "UPDATE_CURRENT_USER":
      return action.result.ref === state.ref
        ? {
            currentUser: action.result.userName,
            newUser: "",
            ref: "",
            count: 0
          }
        : initialUser;

    case "UPDATE_NEW_USER":
      return action.result.ref === state.ref
        ? {
            currentUser: "",
            newUser: action.result.userName,
            ref: action.result.ref,
            count: state.count + 1
          }
        : initialUser;

    case "UPDATE_USER_REF":
      return {
        currentUser: "",
        newUser: "",
        ref: action.result.ref,
        count: state.count + 1
      };

    case "CLEAR_USER":
      return initialUser;

    case "RESET_ALL":
      return initialUser;

    default:
      return state;
  }
};
