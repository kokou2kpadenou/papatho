import React from "react";
import Button from "../button/button";
import Dialog from "../dialog/dialog";
import "./confirmationDlg.css";

export default ({ children, actionFn, cancelFn, dlgType, dlgTitle }) => {
  const _action = e => {
    e.preventDefault();
    actionFn();
  };

  return (
    <Dialog cancelFn={cancelFn} dlgType={dlgType} dlgTitle={dlgTitle}>
      <div className="dlg__msg">{children}</div>
      <div className="dlg__buttons">
        <Button autoFocus onClick={cancelFn}>
          No
        </Button>
        <Button onClick={e => _action(e)}>Yes</Button>
      </div>
    </Dialog>
  );
};
