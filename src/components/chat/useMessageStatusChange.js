import { useEffect } from "react";

export const useMessageStatusChange = (
  currentRoomId,
  emit,
  user,
  setCurrentRoom,
  currentRoomHasNewMessages
) => {
  useEffect(() => {
    let timeoutId;

    if (currentRoomId) {
      setCurrentRoom(currentRoomId);
      if (currentRoomHasNewMessages) {
        timeoutId = setTimeout(() => {
          emit({
            emit: "message-status-change",
            payload: {
              userName: user,
              room: currentRoomId,
              status: "VIEW"
            },
            handle: "CHANGE_STATUS"
          });
        }, 3000);
      }
    }

    return () => {
      setCurrentRoom("");
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentRoomId, emit, user, setCurrentRoom, currentRoomHasNewMessages]);
};
