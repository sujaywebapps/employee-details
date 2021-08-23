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

function LineGraph({ data }) {
  const lineContainer = useRef(null);

  // set the dimensions and margins of the graph
  const margin = { top: 40, right: 30, bottom: 80, left: 60 },
    width = 660 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const drawGraph = () => {
    d3.select(lineContainer.current).select("svg").remove();
    const svg = d3
      .select(lineContainer.current)
      .append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((da) => da.label))
      .range([0, width]);

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return +d.value;
        }),
      ])
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

    const firstXtick = xAxis
      .selectAll(".tick")
      .nodes()[0]
      .transform.baseVal.consolidate().matrix.e;
    // Add the line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d.label);
          })
          .y(function (d) {
            return y(d.value);
          })
      )
      .style("transform", `translateX(${firstXtick}px)`);
  };
  useEffect(() => {
    drawGraph();
  });
  return <GraphWrp ref={lineContainer}></GraphWrp>;
}

LineGraph.propTypes = {
  data: PropTypes.array.isRequired,
};

export default LineGraph;
