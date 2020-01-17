import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Icon from "../common/icon/icon";
import ConfirmationDlg from "../common/confirmationDlg/confirmationDlg";
import "./join.css";

import { autoGenID } from "../../helper/index";

const Join = ({
  rooms,
  currentUser,
  newUser,
  userRef,
  connected,
  emit,
  cancelUserCreation
}) => {
  const [name, setName] = useState("");

  const _onClick = e => {
    e.preventDefault();
    if (name) {
      emit({
        emit: "join-chat",
        payload: { userName: name, ref: autoGenID("user") },
        handle: "UPDATE_USER_REF"
      });
    }
  };

  const _action = () => {
    //
    if (name) {
      emit({
        emit: "create-user",
        payload: { userName: name, ref: userRef },
        handle: "UPDATE_USER_REF"
      });
    }
  };

  const _cancel = () => {
    cancelUserCreation();
    setName("");
  };

  const checkRoomsLoaded = () => {
    if (rooms.length > 0) {
      if (rooms.filter(room => room.roomName === "COMMON").length > 0) {
        return true;
      }
    }
    return false;
  };

  const dlgMsg = `It is the first time for ${name}. Do you want to continue and create new user as ${name}?`;

  if (currentUser && checkRoomsLoaded()) {
    return <Redirect to="/rooms/COMMON" />;
  }

  return (
    <div className="join__container">
      {userRef && newUser && (
        <ConfirmationDlg actionFn={_action} cancelFn={_cancel}>
          {dlgMsg}
        </ConfirmationDlg>
      )}
      <form className="join__content">
        <div>
          {!connected && <p style={{ color: "red" }}>Network Issue</p>}
          {userRef && !newUser && <p>Trying to retrieve data...</p>}
          <Icon style={{ width: "10rem", height: "10rem" }} />
          <h1 className="join__title">PAPATHO</h1>
          <input
            autoFocus
            disabled={userRef && newUser}
            className="join__input"
            placeholder="USERNAME"
            aria-label="USERNAME"
            type="text"
            value={name}
            minLength="3"
            maxLength="8"
            onChange={e =>
              setName(e.target.value.replace(/[^\w]/gi, "").toUpperCase())
            }
          />
        </div>
        <button
          className="join__btn"
          type="submit"
          disabled={!name || name.length < 3 || (userRef && newUser)}
          onClick={e => _onClick(e)}
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default Join;
