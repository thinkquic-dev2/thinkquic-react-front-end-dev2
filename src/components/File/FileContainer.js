import React, { useState } from "react";

import { folderIcon, excelIcon, htmlFileIcon, jsFileIcon, defaultFileIcon, moreVerticalIcon } from "../../Icons/Icons";

const FileContainer = ({ type, text, onClick, deleteFile }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const displayIcon = () => {
    if (type === "folder") {
      return folderIcon;
    } else {
      const textFileArray = text.split(".");
      const fileExt = textFileArray[textFileArray.length - 1];
      if (fileExt === "csv" || fileExt === "xlsx") {
        return excelIcon;
      } else if (fileExt === "html") {
        return htmlFileIcon;
      } else if (fileExt === "js") {
        return jsFileIcon;
      } else {
        return defaultFileIcon;
      }
    }
  };

  const fileClickHandler = () => {
    if (onClick) {
      onClick(text);
    } else {
      // no op
    }
  };

  const optionsToggleClickHandler = (event) => {
    event.stopPropagation();
    setIsOptionsOpen(!isOptionsOpen);
  };

  const openClickHandler = (event) => {
    event.stopPropagation();
    fileClickHandler();
  };

  const deleteClickHandler = (event) => {
    event.stopPropagation();
    setIsOptionsOpen(false);
    deleteFile(text);
  };

  const optionsListClass = isOptionsOpen ? "file__options-list file__options-list--is-open" : "file__options-list";

  return (
    <div className="file" onClick={fileClickHandler}>
      <div className="file__icon">{displayIcon()}</div>
      <div className="file__name">{text}</div>
      <div className={optionsListClass}>
        <button className="btn btn-sm btn-success file__option" onClick={(event) => openClickHandler(event)}>
          open
        </button>
        <button className="btn btn-sm btn-danger file__option" onClick={(event) => deleteClickHandler(event)}>
          delete
        </button>
      </div>
      <button className="file__options-toggle" onClick={(event) => optionsToggleClickHandler(event)}>
        {moreVerticalIcon}
      </button>
    </div>
  );
};

export default FileContainer;
