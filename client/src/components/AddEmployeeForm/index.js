import React, { useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { reducer, initialState } from "./reducer";

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    maxWidth: 600,
    minHeight: 600,
  },
  textRoot: {
    padding: "1rem",
    "& > *": {
      margin: "2rem 0rem",
      width: "100%",
    },
  },
  selectRoot: {
    "& > div": {
      display: "flex",
      justifyContent: "flex-start",
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function AddEmployeeForm(props) {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Card className={classes.root}>
      <h2>Add Employee Details</h2>
      <form className={classes.textRoot} noValidate autoComplete="off">
        <TextField
          id="employee-name"
          label="Name"
          value={state.name}
          onChange={(event) => {
            dispatch({ type: "name", payload: event.target.value });
          }}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Group</InputLabel>
          <Select
            className={classes.selectRoot}
            labelId="employee-group"
            id="employee-group-select"
            value={state.group}
            onChange={(event) => {
              dispatch({ type: "group", payload: event.target.value });
            }}
          >
            <MenuItem value={1}>Group 1</MenuItem>
            <MenuItem value={2}>Group 2</MenuItem>
            <MenuItem value={3}>Group 3</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="employee-city"
          label="City"
          value={state.city}
          onChange={(event) => {
            dispatch({ type: "city", payload: event.target.value });
          }}
        />
        <TextField
          id="employee-salary"
          label="Salary"
          value={state.salary}
          onChange={(event) => {
            dispatch({ type: "salary", payload: event.target.value });
          }}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Manager</InputLabel>
          <Select
            className={classes.selectRoot}
            labelId="employee-manager"
            id="employee-manager-select"
            value={state.manager}
            onChange={(event) => {
              dispatch({ type: "manager", payload: event.target.value });
            }}
          >
            <MenuItem value={"m1"}>Manager 1</MenuItem>
            <MenuItem value={"m2"}>Manager 2</MenuItem>
            <MenuItem value={"m3"}>Manager 3</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary">
          Add
        </Button>
      </form>
    </Card>
  );
}

AddEmployeeForm.propTypes = {};

export default AddEmployeeForm;
