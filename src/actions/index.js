/**
 ** Messages Actions
 **/
export const resetMessages = () => ({
  type: "RESET_MESSAGES"
});

export const setMessages = newMessages => ({
  type: "SET_MESSAGES",
  newMessages
});

export const addMessage = message => ({
  type: "ADD_MESSAGE",
  message
});

export const removeMessages = room => ({
  type: "REMOVE_MESSAGES",
  room
});

export const messageStatusChange = (room, status) => ({
  type: "CHANGE_STATUS",
  room,
  status
});

/**
 ** Rooms Actions
 **/

export const setRoom = rooms => ({
  type: "SET_ROOM",
  rooms
});

export const resetRoom = () => ({ type: "RESET_ROOM" });

export const addRoom = room => ({
  type: "ADD_ROOM",
  room
});

export const removeRoom = roomName => ({
  type: "DELETE_ROOM",
  roomName
});

export const joinRoom = roomName => ({
  type: "JOIN_ROOM",
  roomName
});

/**
 ** User Actions
 **/

export const updateUser = data => ({
  type: "UPDATE_USER",
  data
});

/**
 ** Interface Room Visibility Actions
 **/

export const setRoomsVisibility = visible => ({
  type: "SET_ROOM_VISIBILITY",
  visible
});

/**
 ** Event Actions
 **/

// export const onConnect = () => ({
//   event: "connect",
//   handle: "SET_CONNECTED"
// });

// export const onDisconnect = () => ({
//   event: "connect_error",
//   handle: "SET_DISCONNECTED"
// });

// export const closeConnection = () => ({
//   event: "close_connection",
//   leave: true
// });

// export const onOldMessages = () => ({
//   event: "old-messages",
//   hanlde: "SET_MESSAGES"
// });

// export const onOldRooms = () => ({
//   event: "old-rooms",
//   handle: "SET_ROOMS"
// });

export const onEvent = ({ event, handle, leave }) => ({ event, handle, leave });

export const emit = ({ emit, payload, handle }) => ({ emit, payload, handle });

/**
 ** Emit Actions
 **/

//  export const emitJoinCaht = (data) => ({
//    emit: 'join-chat',
//    payload: data
//    handle: ""
//  })
