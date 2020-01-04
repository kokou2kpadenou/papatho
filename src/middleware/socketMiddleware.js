import io from "socket.io-client";
const ENDPOINT = "localhost:5000";

const socketMiddleware = () => {
  const socket = io(ENDPOINT);

  return ({ dispatch }) => next => action => {
    if (typeof action === "function") {
      return next(action);
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
