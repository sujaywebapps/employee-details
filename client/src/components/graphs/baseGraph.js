import * as d3 from "d3";

export function drawxAxis(selectedEle, config) {
  const data = config.data;
  var xAxis = selectedEle
    .append("g")
    .attr("calss", "x")
    .attr("transform", `translate(0, ${config.height})`)
    .call(
      d3.axisBottom(config.x).tickFormat((d, i) => {
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
  return xAxis;
}
