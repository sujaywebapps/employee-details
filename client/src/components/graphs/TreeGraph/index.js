import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import PropTypes from "prop-types";

const GraphWrp = styled.div`
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .node circle {
    fill: #fff;
    stroke: steelblue;
    stroke-width: 3px;
  }

  .node text {
    font: 12px sans-serif;
  }

  .node--internal text {
    text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
  }

  .link {
    fill: none;
    stroke: #ccc;
    stroke-width: 2px;
  }
`;

function TreeGraph({ data }) {
  const treeContainer = useRef(null);

  // set the dimensions and margins of the graph
  const margin = { top: 40, right: 30, bottom: 80, left: 80 },
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const drawGraph = () => {
    var treemap = d3.tree().size([height, width / 1.5]);
    //  assigns the data to a hierarchy using parent-child relationships
    var nodes = d3.hierarchy(data, function (d) {
      return d.children;
    });

    // maps the node data to the tree layout
    nodes = treemap(nodes);

    d3.select(treeContainer.current).select("svg").remove();
    const svg = d3
        .select(treeContainer.current)
        .append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom),
      g = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // adds the links between the nodes
    var link = g
      .selectAll(".link")
      .data(nodes.descendants().slice(1))
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", function (d) {
        return (
          "M" +
          d.y +
          "," +
          d.x +
          "C" +
          (d.y + d.parent.y) / 2 +
          "," +
          d.x +
          " " +
          (d.y + d.parent.y) / 2 +
          "," +
          d.parent.x +
          " " +
          d.parent.y +
          "," +
          d.parent.x
        );
      });

    // adds each node as a group
    var node = g
      .selectAll(".node")
      .data(nodes.descendants())
      .enter()
      .append("g")
      .attr("class", function (d) {
        return "node" + (d.children ? " node--internal" : " node--leaf");
      })
      .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      });

    // adds the circle to the node
    node.append("circle").attr("r", 10);

    // adds the text to the node
    node
      .append("text")
      .attr("dy", ".35em")
      .attr("x", function (d) {
        return d.children ? -13 : 13;
      })
      .style("text-anchor", function (d) {
        return d.children ? "end" : "start";
      })
      .text(function (d) {
        return d.data.name;
      });
  };
  useEffect(() => {
    drawGraph();
  });
  return <GraphWrp ref={treeContainer}></GraphWrp>;
}

TreeGraph.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TreeGraph;
