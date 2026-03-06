const width = 500;
const height = 450;
const radius = Math.min(width, height) / 2 - 10;

const svg = d3.select("#donutChart")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .append("g")
  .attr("transform", `translate(${width/2}, ${height/2})`);

d3.csv("data/Screen_Tech_TV.csv").then(data => {

  // convert count to number
  data.forEach(d => {
    d.count = +d["Count(Model_No)"];
  });

  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.Screen_Tech))
    .range(d3.schemeCategory10);

  const pie = d3.pie()
    .value(d => d.count);

  const arc = d3.arc()
    .innerRadius(radius * 0.5)   // donut hole
    .outerRadius(radius);

  const arcs = svg.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g");

  // draw slices
  arcs.append("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.Screen_Tech))
    .attr("stroke", "white")
    .style("stroke-width", "2px");

  // add labels
  arcs.append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text(d => d.data.Screen_Tech);

});