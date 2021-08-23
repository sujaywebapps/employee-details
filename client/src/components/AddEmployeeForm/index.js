import React, { useReducer } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { reducer, initialState } from "./reducer";
import { groupList, managersList } from "../../const";

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    maxWidth: 600,
    minHeight: 600,
  },
  textRoot: {
    padding: "3rem",
    "& > div": {
      margin: "1rem 0rem",
      width: "100%",
    },
    "& > button": {
      margin: "1rem 0rem",
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
          variant="standard"
          label="Name"
          value={state.name}
          onChange={(event) => {
            dispatch({ type: "name", payload: event.target.value });
          }}
        />
        <FormControl variant="standard" className={classes.formControl}>
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
            {groupList.map((g) => (
              <MenuItem key={g.value} value={g.value}>
                {g.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="employee-city"
          variant="standard"
          label="City"
          value={state.city}
          onChange={(event) => {
            dispatch({ type: "city", payload: event.target.value });
          }}
        />
        <TextField
          id="employee-salary"
          variant="standard"
          label="Salary"
          value={state.salary}
          onChange={(event) => {
            dispatch({ type: "salary", payload: event.target.value });
          }}
        />
        <FormControl variant="standard" className={classes.formControl}>
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
            {managersList.map((m) => (
              <MenuItem key={m.value} value={m.value}>
                {m.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            axios
              .post("/api/v1/add-employee", {
                ...state,
                createdAt: new Date(),
                // createdAt: "2021-08-21T05:58:19.866Z",
              })
              .then((res) => {
                console.log("res", res);
                if (res.status === 200) {
                  dispatch({ type: "reset", payload: {} });
                }
              });
          }}
        >
          Add
        </Button>
      </form>
    </Card>
  );
}

AddEmployeeForm.propTypes = {};

export default AddEmployeeForm;
