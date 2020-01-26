import React from "react";
import FocusTrap from "focus-trap-react";
import "./dialog.css";

export default ({ children, cancelFn, dlgType, dlgTitle }) => {
  const _cancel = e => {
    if (e.target === e.currentTarget) {
      cancelFn();
    }
  };

  const _escape = e => {
    if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
      cancelFn();
    }
  };

  return (
    <FocusTrap>
      <div
        role="dialog"
        aria-labelledby={dlgTitle}
        aria-modal="true"
        className="dlg__container"
        onClick={e => _cancel(e)}
        onKeyDown={e => _escape(e)}
      >
        <div className="dlg__form">
          <DlgBar dlgType={dlgType}>{dlgTitle}</DlgBar>
          <div className="dlg__content">{children}</div>
        </div>
      </div>
    </FocusTrap>
  );
};

const DlgBar = ({ dlgType, children }) => {
  return (
    <div className="dlg__bar">
      <svg className="dlg__icon" viewBox="0 0 20 20">
        <Icon iconName={dlgType} />
      </svg>
      <span className="dlg__title">{children}</span>
    </div>
  );
};

const Icon = ({ iconName = "info" }) => {
  if (iconName === "info") {
    return (
      <path
        fill="#00f"
        d="M12.432 0c1.34 0 2.010 0.912 2.010 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-0.75-1.974-1.99 0-1.043 0.881-2.479 2.643-2.479zM8.309 20c-1.058 0-1.833-0.652-1.093-3.524l1.214-5.092c0.211-0.814 0.246-1.141 0-1.141-0.317 0-1.689 0.562-2.502 1.117l-0.528-0.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273 0.705 3.23l-1.391 5.352c-0.246 0.945-0.141 1.271 0.106 1.271 0.317 0 1.357-0.392 2.379-1.207l0.6 0.814c-2.502 2.547-5.235 3.527-6.291 3.527z"
      ></path>
    );
  }
  if (iconName === "warning") {
    return (
      <path
        fill="#f00"
        d="M19.511 17.98l-8.907-16.632c-0.124-0.215-0.354-0.348-0.604-0.348s-0.481 0.133-0.604 0.348l-8.906 16.632c-0.121 0.211-0.119 0.471 0.005 0.68 0.125 0.211 0.352 0.34 0.598 0.34h17.814c0.245 0 0.474-0.129 0.598-0.34 0.124-0.209 0.126-0.469 0.006-0.68zM11 17h-2v-2h2v2zM11 13.5h-2v-6.5h2v6.5z"
      ></path>
    );
  }
  if (iconName === "group") {
    return (
      <path
        style={{ fill: "var(--main-bright-color)" }}
        d="M7 8c-2.209 0-4-1.791-4-4s1.791-4 4-4v0c2.209 0 4 1.791 4 4s-1.791 4-4 4v0zM7 9c2.15 0 4.2 0.4 6.1 1.090l-1.1 5.91h-1.25l-0.75 4h-6l-0.75-4h-1.25l-1.1-5.91c1.813-0.684 3.909-1.083 6.097-1.090h0.003zM15.31 9.17c1.32 0.18 2.59 0.48 3.8 0.92l-1.11 5.91h-1.25l-0.75 4h-3.96l0.37-2h1.25l1.65-8.83zM13 0c0.010-0 0.022-0 0.034-0 2.209 0 4 1.791 4 4s-1.791 4-4 4c-0.49 0-0.958-0.088-1.392-0.249l0.028 0.009c0.832-1.017 1.336-2.329 1.336-3.76s-0.504-2.743-1.344-3.771l0.008 0.011c0.43-0.14 0.86-0.24 1.33-0.24z"
      ></path>
    );
  }
};
