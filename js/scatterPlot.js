const width = 700;
const height = 450;
const margin = { top: 30, right: 30, bottom: 50, left: 70 };

const svg = d3.select("#scatterPlot")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`);

d3.csv("data/Energy_Star.csv").then(data => {
  data.forEach(d => {
    d.energy = +d["Labelled energy consumption (kWh/year)"];
    d.star = +d["Star2"];
  });

  // X scale (Star Rating)
  const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.star)])
    .range([margin.left, width - margin.right]);

  // Y scale (Energy consumption)
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.energy)])
    .range([height - margin.bottom, margin.top]);

  // X axis
  svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  // Y axis
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  // X axis label
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .attr("text-anchor", "middle")
    .text("Energy Star Rating");

  // Y axis label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .text("Energy Consumption (kWh/year)");

  // Scatter points
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.star))
    .attr("cy", d => y(d.energy))
    .attr("r", 4)
    .attr("fill", "steelblue")
});