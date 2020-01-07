import React from "react";
import "./badge.css";

export default ({ label, children }) => (
  <span className="badge">{`${label}: ${children}`}</span>
);
