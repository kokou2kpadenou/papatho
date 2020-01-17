import React from "react";
import "./button.css";

export default ({
  disabled = false,
  onClick,
  genre = "normal",
  show = true,
  children
}) => {
  return (
    <button
      className={`button ${genre} ${show ? "" : "no-show"}`}
      disabled={disabled}
      onClick={e => onClick(e)}
    >
      {children}
    </button>
  );
};
