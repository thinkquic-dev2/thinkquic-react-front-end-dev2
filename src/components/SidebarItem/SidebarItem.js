import React from "react";

import "./SidebarItem.scss";

const SidebarItem = ({ icon, tooltipText, clickHandler, position }) => {
  let sidebarItemClasses = "sidebar-item";
  if (position && position === "bottom") {
    sidebarItemClasses = "sidebar-item sidebar-item--bottom";
  }
  return (
    <div className={sidebarItemClasses}>
      <button className="sidebar-item__button" onClick={clickHandler}>
        {icon}
      </button>
      <div className="sidebar-item__tooltip">{tooltipText}</div>
    </div>
  );
};

/*const SidebarItem = (props) => {
  if (props.type && props.type === 'button') {

    return (
      <button
        className={props.className ? "sidebar-item " + props.className : "sidebar-item"}
        onClick={props.onClickHandler}
      >
        <span className="sidebar-item__icon">{props.icon}</span>
        <span className="sidebar-item__text">{props.text}</span>
        {props.children}
      </button>
    )
  } else {
    return (
      <div
        className={props.className ? "sidebar-item " + props.className : "sidebar-item"}
        onClick={props.onClickHandler}
      >
        <span className="sidebar-item__icon">{props.icon}</span>
        <span className="sidebar-item__text">{props.text}</span>
        {props.children}
      </div>
    )
  }
}*/

export default SidebarItem;
