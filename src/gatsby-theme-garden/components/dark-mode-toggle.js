import React from "react";
import useDarkMode from "use-dark-mode";

import "./dark-mode-toggle.css";

const DarkModeToggle = () => {
  const { value: isDark, toggle: toggleDarkMode } = useDarkMode(false);

  const utterancesThemeChange = () => {
    toggleDarkMode();

    const message = {
      type: 'set-theme',
      theme: isDark ? 'github-light' : 'github-dark'
    };
//    const utterances = document.querySelector('iframe').contentWindow; // try event.source instead
    Array.from(document.getElementsByClassName("utterances-frame")).forEach(
      function(element, index, array) {
        element.contentWindow.postMessage(message, 'https://utteranc.es');
      }
    );
  }

  return (
    <label
      className="dark-mode-toggle"
      aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
      title={isDark ? "Activate light mode" : "Activate dark mode"}
    >
      <input type="checkbox" checked={!isDark} />
      <div />
    </label>
  );
};

export default DarkModeToggle;