import io from "socket.io-client";

// SOCKET URL
const ENDPOINT = process.env.REACT_APP_SERVER_URL;

const socketMiddleware = () => {
  //
  const socket = io(ENDPOINT);

  return ({ getState, dispatch }) => next => action => {
    if (typeof action === "function") {
      return next(action);
    }

    if (action.type === "ADD_MESSAGE") {
      if (
        getState().currentRoom === action.result.room &&
        action.result.status === "NEW"
      ) {
        socket.emit("message-status-change", {
          userName: action.result.sender,
          room: action.result.room,
          status: "VIEW"
        });
      }
    }

    const { event, leave, handle, emit, payload, ...rest } = action;

    if (!event && !emit) {
      return next(action);
    }

    if (leave) {
      socket.disconnect();
    }

    if (emit) {
      socket.emit(emit, payload);
      if (handle) {
        dispatch({ type: handle, result: payload });
      }
      return;
    }

    let handleEvent = handle;
    if (typeof handleEvent === "string") {
      handleEvent = result => dispatch({ type: handle, result, ...rest });
    }

    return socket.on(event, handleEvent);
  };
};

export default socketMiddleware;
