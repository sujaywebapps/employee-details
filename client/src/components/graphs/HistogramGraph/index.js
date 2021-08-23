import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import PropTypes from "prop-types";
import { drawxAxis } from "../baseGraph";

const GraphWrp = styled.div`
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function HistogramGraph({ data }) {
  const histoContainer = useRef(null);

  // set the dimensions and margins of the graph
  const margin = { top: 40, right: 0, bottom: 80, left: 0 },
    width = 660 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const drawGraph = () => {
    d3.select(histoContainer.current).select("svg").remove();
    const svg = d3
      .select(histoContainer.current)
      .append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X axis: scale and draw:
    const x = d3
      .scaleBand()
      .domain(data.map((da) => da.label))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data.map((da) => da.value))])
      .range([height, 0]);

    const config = {
      data,
      height,
      width,
      x,
      y,
    };

    const xAxis = drawxAxis(svg, config);

    svg.append("g").call(d3.axisLeft(y));

    const barWidth = x.bandwidth() / 2;

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", 1)
      .attr("transform", function (d) {
        return `translate(${x(d.label) + barWidth / 2} , ${y(d.value)})`;
      })
      .attr("width", function (d) {
        return barWidth;
      })
      .attr("height", function (d) {
        return height - y(d.value);
      })
      .style("fill", "#69b3a2");

    svg
      .append("g")
      .selectAll("text")
      .data(data)
      .join("text")
      .text((d) => d.value)
      .attr("transform", function (d) {
        return `translate(${x(d.label) + barWidth} , ${y(d.value) - 15})`;
      })
      .style("fill", "currentColor")
      .style("text-anchor", "middle");
  };
  useEffect(() => {
    drawGraph();
  });
  return <GraphWrp ref={histoContainer}></GraphWrp>;
}

HistogramGraph.propTypes = {
  data: PropTypes.array.isRequired,
};

export default HistogramGraph;
