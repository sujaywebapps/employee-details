import React, { useState, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import DateRangePicker from "@material-ui/lab/DateRangePicker";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import Box from "@material-ui/core/Box";

export default function DateRange({ changeFunc }) {
  const [value, setValue] = useState([null, null]);

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
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
