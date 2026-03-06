(function(){

const width = 700;
const height = 450;
const margin = {top:40, right:30, bottom:60, left:80};

const svg = d3.select("#barChart")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`);

d3.csv("data/TV_most_Energy.csv").then(data => {

  // convert value to number
  data.forEach(d => {
    d.energy = +d["Mean(Labelled energy consumption (kWh/year))"];
  });

  // X scale
  const x = d3.scaleBand()
    .domain(data.map(d => d.Screen_Tech))
    .range([margin.left, width - margin.right])
    .padding(0.3);

  // Y scale
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.energy)])
    .range([height - margin.bottom, margin.top]);

  // X axis
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  // Y axis
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  // Axis labels
  svg.append("text")
    .attr("x", width/2)
    .attr("y", height - 15)
    .attr("text-anchor", "middle")
    .text("Screen Technology");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height/2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .text("Energy Consumption (kWh/year)");

  // bars
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.Screen_Tech))
    .attr("y", d => y(d.energy))
    .attr("width", x.bandwidth())
    .attr("height", d => height - margin.bottom - y(d.energy))
    .attr("fill", "#4C78A8");

  // value labels
  svg.selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", d => x(d.Screen_Tech) + x.bandwidth()/2)
    .attr("y", d => y(d.energy) - 5)
    .attr("text-anchor", "middle")
    .style("font-size","13px")
    .text(d => d.energy);

});

})();