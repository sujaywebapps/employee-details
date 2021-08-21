import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import styled from "styled-components";
import { groupList, managersList } from "../../const";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TableWrp = styled.div`
  width: 70%;
  height: 80%;
  overflow: scroll-x;
  background-color: white;

  thead th {
    font-weight: 600;
  }
  tbody > tr:nth-child(odd) {
    background-color: #f5f5f5;
  }
  table {
    border-top: 1px solid #ccc;
  }
`;

const getGroup = (g) => {
  let indexVal = groupList.findIndex((grp) => grp.value === g);
  return indexVal >= 0 ? groupList[indexVal].label : "";
};

const getManagerp = (m) => {
  let indexVal = managersList.findIndex((manager) => manager.value === m);
  return indexVal >= 0 ? managersList[indexVal].label : "";
};

function EmployeeList(props) {
  const classes = useStyles();
  const [empList, setElist] = useState([]);
  useEffect(() => {
    axios.get("/api/v1/employees").then((res) => {
      setElist(res.data.data);
    });
  }, []);

  return (
    <TableWrp>
      <h2>Employee List</h2>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Group</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="right">Manager</TableCell>
            <TableCell align="right">Onboard Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empList.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{getGroup(row.group)}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">{row.salary}</TableCell>
              <TableCell align="right">{getManagerp(row.manager)}</TableCell>
              <TableCell align="right">
                {row.createdAt ? new Date(row.createdAt).toLocaleString() : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrp>
  );
}

EmployeeList.propTypes = {};

export default EmployeeList;
