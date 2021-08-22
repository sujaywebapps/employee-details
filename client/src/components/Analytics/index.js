import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import styled from "styled-components";
import CascadeLayout from "../CascadeLayout";
import mockData from "./mockData";
import LineGraph from "../graphs/LineGraph";

import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import DateRange from "../DateRange";

const RotateText = styled.div`
  ${window.innerWidth > 768
    ? "transform: rotate(180deg); writing-mode: vertical-lr;text-orientation: mixed;"
    : ""}
`;

const AccWrp = styled.div`
  width: 80%;
`;

const LineWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;

  & > div {
    margin-bottom: 2rem;
  }
`;
const selectedGraphs = ["Line", "Pie", "Histogram", "Hierarchy"];

function Analytics(props) {
  const [lineData, setLineData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const groupByDate = (arrObj) => {
    const groupedResult = arrObj.reduce(function (r, a) {
      const createdAt = moment(new Date(a.createdAt)).format("DD/MM/YYYY");
      r[createdAt] = r[createdAt] || 0;
      r[createdAt] = r[createdAt] + 1;
      return r;
    }, Object.create(null));
    return groupedResult;
  };
  useEffect(() => {
    async function getData() {
      let url = "/api/v1/employees";
      if (startDate !== "" && endDate !== "") {
        url = `${url}?startDate=${startDate}&endDate=${endDate}`;
      }
      await axios.get(url).then((res) => {
        let empData = res?.data?.data || [];
        let result = groupByDate(empData);
        const lineDataFormat = Object.keys(result).map((da) => ({
          label: da,
          value: result[da],
        }));
        setLineData(lineDataFormat);
      });
    }
    getData();
  }, [startDate, endDate]);

  const dateChangeFunc = (dateArr) => {
    setStartDate(moment(dateArr[0]).format("YYYY-MM-DD"));
    setEndDate(moment(dateArr[1]).format("YYYY-MM-DD"));
  };
  const elementList = [];
  mockData.forEach((item, index) => {
    elementList.push({
      label: (
        <>
          <RotateText>{item.label}</RotateText>
          <div>
            <div>{item.value}</div>
            <div>{item.quarter}</div>
          </div>
        </>
      ),
      value:
        index === 0 ? (
          <LineWrap>
            <DateRange changeFunc={dateChangeFunc} />
            <LineGraph data={lineData} />
          </LineWrap>
        ) : (
          <div>{selectedGraphs[index]}</div>
        ),
    });
  });
  return (
    <AccWrp>
      <CascadeLayout accordianList={elementList} defaultSelection={0} />
    </AccWrp>
  );
}

Analytics.propTypes = {};

export default Analytics;
