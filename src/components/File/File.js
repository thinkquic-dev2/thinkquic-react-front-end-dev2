import React from "react";

const File = ({ type, text, onClick }) => {
  const displayIcon = () => {
    if (type === "folder") {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
        </svg>
      );
    } else {
      const textFileArray = text.split(".");
      const fileExt = textFileArray[textFileArray.length - 1];
      if (fileExt === "csv" || fileExt === "xlsx") {
        return (
          <svg
            className="svg-excel"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g>
              <rect fill="none" />
              <path d="M20.41,8.41l-4.83-4.83C15.21,3.21,14.7,3,14.17,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V9.83 C21,9.3,20.79,8.79,20.41,8.41z M7,7h7v2H7V7z M17,17H7v-2h10V17z M17,13H7v-2h10V13z" />
            </g>
          </svg>
        );
      } else if (fileExt === "html") {
        return (
          <svg
            className="svg-html"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g>
              <rect fill="none" />
              <path d="M20.41,8.41l-4.83-4.83C15.21,3.21,14.7,3,14.17,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V9.83 C21,9.3,20.79,8.79,20.41,8.41z M7,7h7v2H7V7z M17,17H7v-2h10V17z M17,13H7v-2h10V13z" />
            </g>
          </svg>
        );
      } else if (fileExt === "js") {
        return (
          <svg
            className="svg-js"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g>
              <rect fill="none" />
              <path d="M20.41,8.41l-4.83-4.83C15.21,3.21,14.7,3,14.17,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V9.83 C21,9.3,20.79,8.79,20.41,8.41z M7,7h7v2H7V7z M17,17H7v-2h10V17z M17,13H7v-2h10V13z" />
            </g>
          </svg>
        );
      } else {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g>
              <rect fill="none" />
              <path d="M20.41,8.41l-4.83-4.83C15.21,3.21,14.7,3,14.17,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V9.83 C21,9.3,20.79,8.79,20.41,8.41z M7,7h7v2H7V7z M17,17H7v-2h10V17z M17,13H7v-2h10V13z" />
            </g>
          </svg>
        );
      }
    }
  };
  return (
    <button
      className="file"
      onClick={() => {
        if (onClick) {
          onClick(text);
        } else {
          // no op
        }
      }}
    >
      <div className="file__icon">{displayIcon()}</div>
      <div className="file__name">{text}</div>
    </button>
  );
};

export default File;
