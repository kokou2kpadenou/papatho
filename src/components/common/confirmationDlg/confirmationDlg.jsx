import React from "react";
import "./confirmationDlg.css";

export default ({ children, actionFnc, owner, cancelFunc }) => {
  const _action = e => {
    e.preventDefault();
    actionFnc(owner);
    cancelFunc();
  };

  const _cancel = e => {
    if (e.target === e.currentTarget) {
      cancelFunc();
    }
  };

  return (
    <div className="dlg__container" onClick={_cancel}>
      <form className="dlg__form">
        <div className="dlg__icon"> &#9888;</div>
        <div className="dlg__msg">{children}</div>
        <div className="dlg__buttons">
          <button
            type="submit"
            className="dlg__button"
            onClick={e => _action(e)}
          >
            Yes
          </button>
          <button type="reset" className="dlg__button" onClick={cancelFunc}>
            No
          </button>
        </div>
      </form>
    </div>
  );
};
