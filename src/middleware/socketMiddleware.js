import io from "socket.io-client";
const ENDPOINT = "localhost:5000";

const socketMiddleware = () => {
  const socket = io(ENDPOINT);

  return ({ dispatch }) => next => action => {
    console.log(action);

    if (typeof action === "function") {
      return next(action);
    }

    const { event, leave, handle, emit, payload, ...rest } = action;

    if (!event && !emit) {
      return next(action);
    }

    if (leave) {
      // socket.removeListener(event);
      socket.disconnect();
    }

    if (emit) {
      socket.emit(emit, payload);
      if (handle) {
        let handleAction = () => ({ type: handle, data: payload });
        return next(handleAction);
      } else {
        return;
      }
    }

    console.log("I am here!");

    let handleEvent = handle;
    if (typeof handleEvent === "string") {
      handleEvent = result => dispatch({ type: handle, result, ...rest });
    }
    console.log(handleEvent);

    return socket.on(event, handleEvent);
  };
};

export default socketMiddleware;
