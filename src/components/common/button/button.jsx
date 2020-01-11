import React from "react";
import "./button.css";

export default ({
  type,
  disabled = false,
  onClick,
  genre = "normal",
  show = true,
  children
}) => {
  return (
    <button
      type={type}
      className={`button ${genre} ${show ? "" : "no-show"}`}
      disabled={disabled}
      onClick={e => onClick(e)}
    >
      {children}
    </button>
  );
};
