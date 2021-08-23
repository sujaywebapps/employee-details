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
import { getGroup, getManager, sortArr, getMax } from "../../utils";
import HistogramGraph from "../graphs/HistogramGraph";
import TreeGraph from "../graphs/TreeGraph";

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

const TreeWrp = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;
  align-items: center;
`;

const treeData1 = {
  name: "Employee",
  children: [
    {
      name: "Group A",
      children: [
        {
          name: "Manager A",
          children: [{ name: "Employee A" }, { name: "Employee B" }],
        },
        {
          name: "Manager B",
          children: [{ name: "Employee C" }, { name: "Employee D" }],
        },
      ],
    },
    {
      name: "Group B",
      children: [
        {
          name: "Manager C",
          children: [{ name: "Employee E" }, { name: "Employee F" }],
        },
        {
          name: "Manager D",
          children: [{ name: "Employee G" }, { name: "Employee H" }],
        },
      ],
    },
  ],
};

function Analytics(props) {
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [histoData, setHistoData] = useState([]);
  const [treeData, setTreeData] = useState({});
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

  const getEmployeeList = (arr) => {
    let employeeByMgList = [];
    [...new Set(arr.map((item) => item.name))].forEach((emp) => {
      employeeByMgList.push({
        name: emp,
      });
    });
    return employeeByMgList;
  };

  const getManagerList = (arr) => {
    let managersByGrp = [];
    [...new Set(arr.map((item) => item.manager))].forEach((mg) => {
      managersByGrp.push({
        name: getManager(mg),
        children: getEmployeeList(arr.filter((item) => item.manager === mg)),
      });
    });
    return managersByGrp;
  };

  const getGroupList = (arr) => {
    let distinctGroups = [];
    [...new Set(arr.map((item) => item.group))].forEach((dg) => {
      distinctGroups.push({
        name: getGroup(parseInt(dg)),
        children: getManagerList(arr.filter((item) => item.group === dg)),
      });
    });
    return distinctGroups;
  };

  useEffect(() => {
    async function getData() {
      let url = "/api/v1/employees";
      await axios.get(url).then((res) => {
        let grpData = res?.data?.data || [];
        let treeDataPrep = {
          name: "Employees",
          children: getGroupList(grpData),
        };
        console.log("grpData", treeDataPrep);
        setTreeData(treeDataPrep);
      });
    }
    getData();
  }, []);

  const dateChangeFunc = (dateArr) => {
    setStartDate(moment(dateArr[0]).format("YYYY-MM-DD"));
    setEndDate(moment(dateArr[1]).format("YYYY-MM-DD"));
  };

  const selectedGraphs = [
    <LineWrap>
      <h2>Employee On-boarded Details</h2>
      <DateRange changeFunc={dateChangeFunc} />
      <LineGraph data={lineData} />
    </LineWrap>,
    <DonutWrp>
      <h2>Employee Group Details</h2>
      <DonutGraph data={pieData} />
    </DonutWrp>,
    <HistoWrp>
      <h2>Employee Salary Details</h2>
      <HistogramGraph data={histoData} />
    </HistoWrp>,
    <TreeWrp>
      <h2>Employee Manager Relation</h2>
      <TreeGraph data={treeData} />
    </TreeWrp>,
  ];

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
      value: selectedGraphs[index],
    });
  });
  return (
    <AccWrp>
      <CascadeLayout accordianList={elementList} />
    </AccWrp>
  );
}

Analytics.propTypes = {};

export default Analytics;
