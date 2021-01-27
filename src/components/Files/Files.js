import React from "react";

import SidebarItem from "../SidebarItem/SidebarItem";

const Files = ({ isFileExplorerVisible, setIsFileExplorerVisible }) => {
  const toggleDisplayFileExplorer = () => {
    if (isFileExplorerVisible) {
      setIsFileExplorerVisible(false);
    } else {
      setIsFileExplorerVisible(true);
    }
  };
  const filesIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        className="svg-color"
        d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"
      />
    </svg>
  );
  return (
    <SidebarItem
      icon={filesIcon}
      text={"Files"}
      onClickHandler={toggleDisplayFileExplorer}
    ></SidebarItem>
  );
};

export default Files;
