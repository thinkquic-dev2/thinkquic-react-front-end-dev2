import React from "react";
import "./AlertModal.scss";
const AlertModal = ({ close, message }) => {
  return (
    <div className="alert-modal">
      <div className="alert-modal__content alert-danger">
        <p className="alert-modal__message">{message}</p>
        <div className="alert-modal__close-container">
          <button className="alert-modal__close" onClick={close}>
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
