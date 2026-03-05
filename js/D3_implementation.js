const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");
svg
  .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");

d3.csv("../data/technology_Aus_count.csv", d => {
  return {
    tech: d["Screen_Tech"],
    count: +d["Count(Model_No)"]
  }
}) .then(data => {
  console.log(data);
  console.log("Length:", data.length);
  console.log("Max:", d3.max(data, d => d.count));
  console.log("Min:", d3.min(data, d => d.count));
  console.log("Extent:", d3.extent(data, d => d.count));
  data.sort((a, b) => b.count - a.count);

  createBarChart(data);
});

const createBarChart = (data) => {
  console.log("Bar chart data:", data);
};