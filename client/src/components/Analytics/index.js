import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import styled from "styled-components";
import CascadeLayout from "../CascadeLayout";
import mockData from "./mockData";
import LineGraph from "../graphs/LineGraph";
import DateRange from "../DateRange";
import DonutGraph from "../graphs/DonutGraph";
import { groupByDate } from "./utils";
import { getGroup, sortArr, getMax } from "../../utils";
import HistogramGraph from "../graphs/HistogramGraph";

const RotateText = styled.div`
  ${window.innerWidth > 768
    ? "transform: rotate(180deg); writing-mode: vertical-lr;text-orientation: mixed;"
    : ""}
`;

const AccWrp = styled.div`
  width: 80%;

  .acc-item-desc {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LineWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
`;

const DonutWrp = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;
  align-items: center;
`;
const HistoWrp = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;
  align-items: center;
`;
const selectedGraphs = ["Line", "Pie", "Histogram", "Hierarchy"];

function Analytics(props) {
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [histoData, setHistoData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  useEffect(() => {
    async function getData() {
      let url = "/api/v1/employees-group";
      await axios.get(url).then((res) => {
        let grpData = res?.data?.data || {};
        let pieDataArr = Object.keys(grpData).map((grp) => {
          return { label: getGroup(parseInt(grp)), value: grpData[grp].length };
        });
        const sortedData = sortArr(pieDataArr, "label", 2);
        setPieData(sortedData);
      });
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      let url = "/api/v1/employees-group";
      await axios.get(url).then((res) => {
        let grpData = res?.data?.data || {};
        let histoDataArr = Object.keys(grpData).map((grp) => {
          return {
            label: getGroup(parseInt(grp)),
            value: getMax(grpData[grp], "salary"),
          };
        });
        const sortedData = sortArr(histoDataArr, "label", 2);
        console.log("sortedData", sortedData);
        setHistoData(sortedData);
      });
    }
    getData();
  }, []);

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
            <h2>Employee On-boarded Details</h2>
            <DateRange changeFunc={dateChangeFunc} />
            <LineGraph data={lineData} />
          </LineWrap>
        ) : index === 1 ? (
          <DonutWrp>
            <h2>Employee Group Details</h2>
            <DonutGraph data={pieData} />
          </DonutWrp>
        ) : index === 2 ? (
          <HistoWrp>
            <h2>Employee Salary Details</h2>
            <HistogramGraph data={histoData} />
          </HistoWrp>
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
