import React, { useContext } from "react";

import { FileUploadContext } from "../../FileUploadContext";

const UploadFile = () => {
  const fileUploadContext = useContext(FileUploadContext);

  const handleInputChange = (inputField) => {
    fileUploadContext.handleFileInputChange(inputField);
  };

  return (
    <form className="upload-file__form" action="/action_page.php">
      <label className="sr-only" htmlFor="myfile">
        Select a file:
      </label>
      <input
        ref={fileUploadContext.fileInputRef}
        onChange={(event) => handleInputChange(event.target)}
        className="d-none"
        type="file"
        id="myfile"
        name="myfile"
      />
    </form>
  );
};

export default UploadFile;
