import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import PropTypes from "prop-types";

const GraphWrp = styled.div`
  height: 35rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function LineGraph(props) {
  const lineContainer = useRef(null);
  const data = [
    { label: "10-09-2020", value: 10 },
    { label: "10-10-2020", value: 20 },
    { label: "10-11-2020", value: 25 },
    { label: "10-12-2020", value: 15 },
    { label: "10-01-2021", value: 23 },
    { label: "10-02-2021", value: 18 },
    { label: "10-03-2021", value: 26 },
    { label: "10-04-2021", value: 10 },
  ];

  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 80, left: 60 },
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

    const xAxis = svg
      .append("g")
      .attr("calss", "x")
      .attr("transform", `translate(0, ${height})`)
      .call(
        d3.axisBottom(x).tickFormat((d, i) => {
          if (data.length > 50) {
            return i % Math.round(data.length / 15) === 0 ? d : "";
          }
          if (d.toString().length >= 15) {
            return `${d.toString().slice(0, 13)}..`;
          }
          return d;
        })
      );

    if (data.length > 6) {
      xAxis
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
    }
    xAxis
      .selectAll("text")
      .append("svg:title")
      .text((d) => d)
      .style("cursor", "default")
      .attr("y", 0);

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
    svg.append("g").call(d3.axisLeft(y));

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
      );
  };
  useEffect(() => {
    drawGraph();
  });
  return <GraphWrp ref={lineContainer}></GraphWrp>;
}

LineGraph.propTypes = {};

export default LineGraph;
