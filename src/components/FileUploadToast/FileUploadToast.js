import React, { useContext, useEffect, useRef, useState } from "react";

import useConfig from "../../hooks/useConfig";

import "./FileUploadToast.scss";

import { closeIcon } from "../../Icons/Icons";

const FileUploadToast = ({ status, closeFileUploadToast }) => {
  const { fileUploadPendingMessage, fileUploadSuccessMessage } = useConfig().app;
  const closeFileUploadToastTimer = useRef();
  const fadeOutTimer = useRef();
  const fileUploadToastRef = useRef();

  const startFileUploadToastCloseTimer = () => {
    clearTimeout(closeFileUploadToastTimer.current);
    clearTimeout(fadeOutTimer.current);
    closeFileUploadToastTimer.current = setTimeout(fadeOutFileUploadToast, 10000);
  };

  const fadeOutFileUploadToast = () => {
    clearTimeout(fadeOutTimer.current);
    fileUploadToastRef.current.classList.add("file-upload-toast--closing");
    fadeOutTimer.current = setTimeout(closeFileUploadToast, 250);
  };

  const closeClickHandler = () => {
    clearTimeout(closeFileUploadToastTimer.current);
    fadeOutFileUploadToast();
  };

  const alertVariantClass = () => {
    switch (status) {
      case "success":
        return " alert-success";
      case "uploading":
        return " alert-info";
      case "fail":
      default:
        return " alert-danger";
    }
  };

  const closeButtonVariantClass = () => {
    switch (status) {
      case "success":
        return " btn-success";
      case "uploading":
        return " btn-info";
      case "fail":
      default:
        return " btn-danger";
    }
  };

  const displayToastMessage = () => {
    switch (status) {
      case "success":
        return fileUploadSuccessMessage;
      case "uploading":
        return (
          <div className="d-flex align-items-center">
            <div className="spinner-border text-info mr-2" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            {fileUploadPendingMessage}
          </div>
        );
      case "fail":
      default:
        return "There was an error uploading your file";
    }
  };

  useEffect(() => {
    startFileUploadToastCloseTimer();
  });

  return (
    <div className={"file-upload-toast alert" + alertVariantClass()} ref={fileUploadToastRef}>
      <div className="file-upload-toast__message">{displayToastMessage()}</div>
      <button onClick={closeClickHandler} className={"file-upload-toast__close btn" + closeButtonVariantClass()}>
        {closeIcon}
      </button>
    </div>
  );
};

export default FileUploadToast;
