import React from "react";
import closeIcon from "../../../icons/closeIcon.png";
// import onlineIcon from "../../../icons/onlineIcon.png";

import "./infoBar.css";

const InfoBar = ({ room, showListRooms }) => (
  <div className="info__container">
    <div>
      {/* <img src={onlineIcon} alt="Online" /> */}
      <h3>{room}</h3>
    </div>
    <div>
      <button onClick={showListRooms}>
        <img src={closeIcon} alt="Close" />
      </button>
    </div>
  </div>
);

export default InfoBar;
