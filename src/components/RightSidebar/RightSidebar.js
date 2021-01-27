import React from "react";

import "./RightSidebar.scss";

const RightSidebar = ({
  isRightSidebarOpen,
  toggleRightSidebar,
  rightSidebarContent,
}) => {
  const rightSidebarClasses = isRightSidebarOpen
    ? "right-sidebar right-sidebar--active"
    : "right-sidebar";
  return (
    <div className={rightSidebarClasses}>
      <button onClick={toggleRightSidebar} className="right-sidebar__close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </button>
      <div className="right-sidebar__content">{rightSidebarContent}</div>
    </div>
  );
};

export default RightSidebar;
