const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 500 1500")
      .style("border", "1px solid black");
svg
  .append("rect")
    .attr("class", "test-rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");

d3.csv("../data/count_models_of_brands.csv", d => {
  return {
    brand: d["Brand_final"],
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
  const leftPadding = 70;  // labels

  const xScale = d3.scaleLinear() 
  .domain([0, d3.max(data, d => d.count)])
  .range([0, 500 - leftPadding - 20]); // -20 for right padding

  const yScale = d3.scaleBand() 
  .domain(data.map(d => d.brand))
  .range([0, 500])
  .padding(0.3);

  svg
    .selectAll("rect.bar")         
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", leftPadding)
    .attr("y", d => 50 + yScale(d.brand))
    .attr("height", yScale.bandwidth())
    .attr("width", d => xScale(d.count))    
    .attr("fill", "steelblue");
};