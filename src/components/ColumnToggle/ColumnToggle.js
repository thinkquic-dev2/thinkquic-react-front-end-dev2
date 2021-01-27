import React from "react";
import "./ColumnToggle.css";

import SidebarItem from "../SidebarItem/SidebarItem";
import Submenu from "../Submenu/Submenu";

const ColumnToggle = ({
  uploadedJsonFile,
  resetState,
  gridColumnApi,
  saveColumnState,
}) => {
  const icon = (
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
      icon={icon}
      text={"Options"}
      onClickHandler={() => {
        console.log("sidebar item clicked");
      }}
    >
      <Submenu>
        <SidebarItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                className="svg-color"
                d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"
              />
            </svg>
          }
          text={"Reset Columns"}
          onClickHandler={() => {
            console.log("sidebar item clicked");
          }}
        />
      </Submenu>
    </SidebarItem>
  );
};

export default ColumnToggle;
