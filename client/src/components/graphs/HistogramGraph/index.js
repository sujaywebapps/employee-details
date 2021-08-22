import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import PropTypes from "prop-types";

const GraphWrp = styled.div`
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function HistogramGraph({ data }) {
  const histoContainer = useRef(null);
  //   const data = { a: 9, b: 20, c: 30, d: 8, e: 12 };
  //   const data = [
  //     { label: "10-09-2020", value: 10 },
  //     { label: "10-10-2020", value: 20 },
  //     { label: "10-11-2020", value: 25 },
  //     { label: "10-12-2020", value: 15 },
  //     { label: "10-01-2021", value: 23 },
  //     { label: "10-02-2021", value: 18 },
  //     { label: "10-03-2021", value: 26 },
  //     { label: "10-04-2021", value: 10 },
  //   ];

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

    // set the parameters for the histogram
    // const histogram = d3
    //   .bin()
    //   .value(function (d) {
    //     return d.value;
    //   }) // I need to give the vector of value
    //   .domain(x.domain()); // then the domain of the graphic
    // //   .thresholds(x.ticks(70)); // then the numbers of bins

    // // And apply this function to data to get the bins
    // const bins = histogram(data);

    // Y axis: scale and draw:
    const y = d3.scaleLinear().range([height, 0]);
    y.domain([0, d3.max(data.map((da) => da.value))]); // d3.hist has to be called before the Y axis obviously
    svg.append("g").call(d3.axisLeft(y));
    const barWidth = x.bandwidth() / 2;
    // append the bar rectangles to the svg element
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
      .style("fill", "#000")
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
