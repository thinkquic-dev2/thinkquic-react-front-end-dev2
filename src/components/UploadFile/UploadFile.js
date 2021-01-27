import React from "react";
import { useContext } from "react";

import { AppContext } from "../../AppContext";

const UploadFile = () => {
  const { handleFileSelection, uploadFileInputRef } = useContext(AppContext);

  const isFileValid = () => {
    const files = uploadFileInputRef.current.files;
    if (files.length < 1) {
      return false;
    }
    return true;
  };
  const handleInputChange = () => {
    if (isFileValid()) {
      handleFileSelection();
    }
  };

  return (
    <React.Fragment>
      <form className="upload-file__form" action="/action_page.php">
        <label className="sr-only" htmlFor="myfile">
          Select a file:
        </label>
        <input
          onChange={handleInputChange}
          ref={uploadFileInputRef}
          className="d-none"
          type="file"
          id="myfile"
          name="myfile"
        />
      </form>
    </React.Fragment>
  );
};

export default UploadFile;
