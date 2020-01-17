import io from "socket.io-client";
import { get, set } from "idb-keyval";

// SOCKET URL
const ENDPOINT = process.env.REACT_APP_SERVER_URL;

const socketMiddleware = () => {
  //
  const socket = io(ENDPOINT);

  return ({ getState, dispatch }) => next => action => {
    /**
     * Save Data localy functon
     */
    const saveDataLocaly = () => {
      if (getState().user.currentUser) {
        // Save
        set(getState().user.currentUser, getState())
          .then(() => {})
          .catch(err => {
            console.log(err);
          });
      }
    };

    if (typeof action === "function") {
      return next(action);
    }

    /**
     * change status of new message to VIEW when room of the message idem to current room
     */
    if (action.type === "ADD_MESSAGE") {
      if (
        getState().messages.currentRoom === action.result.room &&
        action.result.status === "NEW"
      ) {
        socket.emit("message-status-change", {
          userName: action.result.sender,
          room: action.result.room,
          status: "VIEW"
        });
      }
    }

    /**
     * When connection stablished and user joined chat then emit auto-rejoin-chat to server
     */

    if (action.type === "SET_CONNECTED") {
      if (getState().user.currentUser) {
        socket.emit("auto-rejoin-chat", getState().user.currentUser);
      }
    }

    /**
     * Save user's data before reset
     */

    if (action.type === "RESET_ALL") {
      saveDataLocaly();
    }

    const { event, leave, handle, emit, payload, ...rest } = action;

    if (!event && !emit) {
      return next(action);
    }

    if (leave) {
      saveDataLocaly();
      socket.disconnect();
    }

    if (emit) {
      if (handle) {
        dispatch({ type: handle, result: payload });
      }

      if (getState().connected) {
        socket.emit(emit, payload);
      } else {
        if (emit === "join-chat") {
          get(payload.userName)
            .then(val => {
              if (val) {
                dispatch({ type: "UPDATE_CURRENT_USER", result: payload });
                dispatch({ type: "ADD_ROOMS", result: val.rooms });
                dispatch({
                  type: "ADD_MESSAGES",
                  result: val.messages.messages
                });
              } else {
                dispatch({ type: "UPDATE_NEW_USER", result: payload });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
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
