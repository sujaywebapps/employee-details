import React, { useState, Fragment, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import DateRangePicker from "@material-ui/lab/DateRangePicker";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import Box from "@material-ui/core/Box";
import { ThemeContext } from "../Provider";
import { styled } from "@material-ui/core/styles";
import { lightTheme, darkTheme } from "../Themes";

export default function DateRange({ changeFunc }) {
  const [value, setValue] = useState([null, null]);
  const { theme } = useContext(ThemeContext);
  console.log("theme date", theme);
  const CssTextField = styled(TextField)({
    "& label": {
      color: theme === "light" ? lightTheme.text : darkTheme.text,
    },
    "& label.Mui-focused": {
      color: theme === "light" ? lightTheme.text : darkTheme.text,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor:
        theme === "light" ? lightTheme.toggleBorder : darkTheme.toggleBorder,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor:
          theme === "light" ? lightTheme.toggleBorder : darkTheme.toggleBorder,
      },
      "& fieldset legend": {
        color: theme === "light" ? lightTheme.text : darkTheme.text,
      },
      "&:hover fieldset": {
        borderColor:
          theme === "light" ? darkTheme.toggleBorder : lightTheme.toggleBorder,
      },
      "&.Mui-focused fieldset": {
        borderColor:
          theme === "light" ? lightTheme.toggleBorder : darkTheme.toggleBorder,
      },
    },
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Start Date"
        endText="End Date"
        value={value}
        onChange={(newValue) => {
          console.log("date range", newValue);
          setValue(newValue);
          changeFunc(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <Fragment>
            <CssTextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <CssTextField {...endProps} />
          </Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
