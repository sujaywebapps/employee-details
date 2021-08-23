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

function DonutGraph({ data }) {
  const donutContainer = useRef(null);
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
  const margin = { top: 40, right: 0, bottom: 40, left: 0 },
    width = 660 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const drawGraph = () => {
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin.top;

    d3.select(donutContainer.current).select("svg").remove();
    const svg = d3
      .select(donutContainer.current)
      .append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // set the color scale
    const color = d3.scaleOrdinal().range(d3.schemeSet2);

    // Compute the position of each group on the pie:
    const pie = d3.pie().value(function (d) {
      return d.value;
    });
    const data_ready = pie(data);
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll("mySlices")
      .data(data_ready)
      .join("path")
      .attr("d", arcGenerator)
      .attr("fill", function (d) {
        return color(d.data.label);
      })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
      .selectAll("mySlices")
      .data(data_ready)
      .join("text")
      .text(function (d) {
        if (Math.abs(d.endAngle - d.startAngle) < 0.5) {
          return "";
        }
        return d?.data?.value;
      })
      .attr("transform", function (d) {
        return `translate(${arcGenerator.centroid(d)})`;
      })
      .style("fill", "white")
      .style("text-anchor", "middle")
      .style("font-size", 20);

    let legends = svg
      .append("g")
      .attr("class", "legend")
      .selectAll("text")
      .data(data_ready)
      .enter()
      .append("g");

    legends
      .append("text")
      .attr("x", -1 * (width / 2 - 20))
      .attr("y", (d, i) => -1 * (i * 20))
      .text((d) => d.data.label)
      .style("font-size", "15px")
      .style("fill", function (d) {
        return color(d.data.label);
      })
      .attr("alignment-baseline", "middle");

    legends
      .append("circle")
      .attr("cx", -1 * (width / 2 - 6))
      .attr("cy", (d, i) => -1 * (i * 20))
      .attr("r", 6)
      .style("fill", function (d) {
        return color(d.data.label);
      });

    // create a tooltip
    d3.select(donutContainer.current).select(".tooltip").remove();
    var Tooltip = d3
      .select(donutContainer.current)
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "#6d6565")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("position", "absolute")
      .style("color", "currentColor");

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (event, d) {
      Tooltip.style("opacity", 1);
      d3.select(this).style("stroke", "black").style("opacity", 1);
    };
    var mousemove = function (event, d) {
      console.log("d3.pointer(event, this)", d3.pointer(event, this));
      Tooltip.html(d.data.label + " : " + d.value)
        .style("left", "70%")
        .style("top", "20%");
    };
    var mouseleave = function (event, d) {
      Tooltip.style("opacity", 0);
      d3.select(this).style("stroke", "none").style("opacity", 0.8);
    };

    legends
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
  };
  useEffect(() => {
    drawGraph();
  });
  return <GraphWrp ref={donutContainer}></GraphWrp>;
}

DonutGraph.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DonutGraph;
