(function(){

const width = 700;
const height = 450;
const margin = {top:40, right:150, bottom:60, left:80};

const svg = d3.select("#barChart")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`);

d3.csv("data/TV_most_Energy.csv").then(data => {

  // convert value to number
  data.forEach(d => {
    d.energy = +d["Mean(Labelled energy consumption (kWh/year))"];
  });

  // consistent colour scale (same as donut chart)
  const color = d3.scaleOrdinal()
    .domain(["LCD","LCD (LED)","OLED","Plasma"])
    .range(d3.schemeCategory10);

  // X scale
  const x = d3.scaleBand()
    .domain(data.map(d => d.Screen_Tech))
    .range([margin.left, width - margin.right])
    .padding(0.3);

  // Y scale
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.energy) * 1.1])
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
    .attr("fill", d => color(d.Screen_Tech))
    .attr("rx",4);

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
    .text(d => d.energy + " kWh");

  // legend
  const legend = svg.selectAll(".legend")
    .data(color.domain())
    .enter()
    .append("g")
    .attr("transform", (d,i)=>`translate(${width-130}, ${40 + i*25})`);

  legend.append("rect")
    .attr("width",15)
    .attr("height",15)
    .attr("fill", d=>color(d));

  legend.append("text")
    .attr("x",22)
    .attr("y",12)
    .text(d=>d)
    .style("font-size","13px");

});

})();