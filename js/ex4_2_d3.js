d3.select("h1")
  .style("color", "green");

d3.select("div")
  .append("p")
  .style("color", "red")
  .style("font-style", "italic")
  .style("font-size", "25px")
  .text("Purchasing a low energy consumption TV will help with your energy bills!");


d3.select("svg") 
  .append("rect")
  .attr("x", 100)
  .attr("y", 100)
  .attr("width", 200)
  .attr("height", 350)
  .attr("fill", "green");

d3.select("body")
    .style("background-color", "#f0f0f0");