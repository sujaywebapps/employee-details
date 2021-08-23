import React, { useContext } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { ThemeContext } from "../Provider";

export default function ToggleBtn({ btnOnClick }) {
  const { setThemeC } = useContext(ThemeContext);
  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Dark Mode"
          onChange={() => {
            setThemeC();
            btnOnClick();
          }}
        />
      </FormGroup>
    </>
  );
}
