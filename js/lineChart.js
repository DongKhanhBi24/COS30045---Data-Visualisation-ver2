(function(){

const width = 700;
const height = 450;
const margin = {top:40, right:40, bottom:100, left:80};

const svg = d3.select("#lineChart")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`);

const parseYear = d3.timeParse("%Y");

d3.csv("data/Spot_Prices.csv").then(data => {

  data.forEach(d => {
    d.year = parseYear(d.Year);
    d.price = +d["Average Price (notTas-Snowy)"];
  });

  // X scale
  const x = d3.scaleTime()
  .domain([
      d3.timeYear.offset(d3.min(data, d => d.year), -1),
      d3.timeYear.offset(d3.max(data, d => d.year), 1)
  ])
  .range([margin.left, width - margin.right]);

  // Y scale
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.price) * 1.1])
    .range([height - margin.bottom, margin.top]);

  // Line generator
  const line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.price));

  // X axis
  svg.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .style("opacity", 0.7)
  .call(
    d3.axisBottom(x)
      .ticks(d3.timeYear.every(2))
      .tickFormat(d3.timeFormat("%Y"))
  );
  
  // Y axis
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .style("opacity", 0.7)
    .call(d3.axisLeft(y));

  //add labels for X and Y axes
  svg.append("text")
  .attr("x", width / 2)
  .attr("y", height - 60)
  .attr("text-anchor", "middle")
  .style("font-size", "20px")
  .style("opacity", 0.7)
  .text("Year");

  svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2 + 20)
  .attr("y", 20)
  .attr("text-anchor", "middle")
  .style("font-size", "20px")
  .style("opacity", 0.7)
  .text("Average Power Prices ($/MWh)");

  // draw line
  svg.append("path")
    .datum(data)
    .attr("fill","none")
    .attr("stroke","#d39696")
    .attr("stroke-width",2)
    .attr("d", line);

  // points
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.year))
    .attr("cy", d => y(d.price))
    .attr("r",4)
    .attr("fill","#e21313");

  // legends
    const legend = svg.append("g")
   .attr("transform", `translate(${width / 2 - 80}, ${height - 50})`);
    legend.append("line")
    .attr("x1", 0)
    .attr("x2", 25)
    .attr("y1", 10)
    .attr("y2", 10)
    .attr("stroke", "#e45756")
    .attr("stroke-width", 2);

    legend.append("circle")
    .attr("cx", 12)
    .attr("cy", 10)
    .attr("r", 4)
    .attr("fill", "#e45756");

    legend.append("text")
    .attr("x", 35)
    .attr("y", 14)
    .style("font-size", "16px")
    .text("Average Price");

});
})();