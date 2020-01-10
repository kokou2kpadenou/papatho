/**
 * Return True il the roomm has NEW messages and false otherwise.
 * @param {*} roomToCheck
 * @param {*} messages
 */
export const roomHasNewMessage = (roomToCheck, messages) => {
  return (
    messages.filter(
      message => message.room === roomToCheck && message.status === "NEW"
    ).length > 0
  );
};

/**
 * Find Room Id by Name.
 * @param {*} roomNameToFind
 * @param {*} rooms
 */
export const findRoomIdByName = (roomNameToFind, rooms) => {
  const roomFound = rooms.filter(({ roomName }) => roomName === roomNameToFind);
  if (roomFound.length > 0) {
    return roomFound[0]._id;
  }

  return "";
};

/**
 ** Interface Room Visibility Actions
 **/

export const setRoomsVisibility = visible => ({
  type: "SET_ROOM_VISIBILITY",
  visible
});

/**
 ** Current Room Actions
 **/
export const setCurrentRoom = room => ({
  type: "UPDATE_CURRENT_ROOM",
  room
});

/**
 ** Event Actions
 **/

export const onEvent = ({ event, handle, leave }) => ({ event, handle, leave });

/**
 ** Emit Actions
 **/
export const emit = ({ emit, payload, handle }) => ({ emit, payload, handle });
