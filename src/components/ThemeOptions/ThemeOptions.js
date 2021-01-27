import React from "react";

import "./ThemeOptions.scss";

const ThemeOptionsContainer = ({
  theme,
  setTheme,
  isThemeOptionsVisible,
  toggleIsThemeOptionsVisible,
}) => {
  const themeOptionsClasses = isThemeOptionsVisible
    ? "theme-options theme-options--visible"
    : "theme-options";

  const selectedThemeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );

  const closeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
  return (
    <div className={themeOptionsClasses}>
      <div className="theme-options__header">
        <span className="theme-options__heading">Themes</span>
        <button
          className="theme-options__close-button"
          onClick={toggleIsThemeOptionsVisible}
        >
          {closeIcon}
        </button>
      </div>
      <button
        className="theme-options__option"
        onClick={() => setTheme("default")}
      >
        default
        {theme === "default" ? selectedThemeIcon : null}
      </button>
      <button
        className="theme-options__option"
        onClick={() => setTheme("theme-one")}
      >
        theme-one
        {theme === "theme-one" ? selectedThemeIcon : null}
      </button>
      <button
        className="theme-options__option"
        onClick={() => setTheme("theme-two")}
      >
        theme-two
        {theme === "theme-two" ? selectedThemeIcon : null}
      </button>
      <button
        className="theme-options__option"
        onClick={() => setTheme("theme-three")}
      >
        theme-three
        {theme === "theme-three" ? selectedThemeIcon : null}
      </button>
    </div>
  );
};

export default ThemeOptionsContainer;
