import React, { useContext } from "react";
import { ThemeContext } from "../Provider";

export default function ToggleBtn({ btnOnClick }) {
  const { setThemeC } = useContext(ThemeContext);
  return (
    <>
      <button
        onClick={() => {
          setThemeC();
          btnOnClick();
        }}
      >
        Switch Theme
      </button>
    </>
  );
}
