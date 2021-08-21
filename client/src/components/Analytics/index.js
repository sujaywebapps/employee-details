import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CascadeLayout from "../CascadeLayout";
import mockData from "./mockData";
import LineGraph from "../graphs/LineGraph";

const RotateText = styled.div`
  ${window.innerWidth > 768
    ? "transform: rotate(180deg); writing-mode: vertical-lr;text-orientation: mixed;"
    : ""}
`;
const DemoDiv = styled.div`
  background: #999999;
  width: 100%;
  height: 100%;
  height: 35rem;
  min-height: 35rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AccWrp = styled.div`
  width: 80%;
`;
const selectedGraphs = ["Line", "Pie", "Histogram", "Hierarchy"];
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
    value: index === 0 ? <LineGraph /> : <div>{selectedGraphs[index]}</div>,
  });
});
function Analytics(props) {
  return (
    <AccWrp>
      <CascadeLayout accordianList={elementList} defaultSelection={0} />
    </AccWrp>
  );
}

Analytics.propTypes = {};

export default Analytics;
