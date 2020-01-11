import React from "react";
import Button from "../button/button";
import "./confirmationDlg.css";

export default ({ children, actionFn, cancelFn }) => {
  const _action = e => {
    e.preventDefault();
    actionFn();
    cancelFn();
  };

  const _cancel = e => {
    if (e.target === e.currentTarget) {
      cancelFn();
    }
  };

  return (
    <div className="dlg__container" onClick={e => _cancel(e)}>
      <form className="dlg__form">
        <div className="dlg__icon"> &#9888;</div>
        <div className="dlg__msg">{children}</div>
        <div className="dlg__buttons">
          <Button type="submit" onClick={e => _action(e)}>
            Yes
          </Button>
          <Button onClick={cancelFn}>No</Button>
        </div>
      </form>
    </div>
  );
};
