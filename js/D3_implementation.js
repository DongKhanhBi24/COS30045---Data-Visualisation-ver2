const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 500 350")
      .style("border", "1px solid black");
svg
  .append("rect")
    .attr("class", "test-rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");

d3.csv("data/count_models_of_brands.csv", d => {
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

  const top10 = data.slice(0, 10);

  createBarChart(top10);
});

const createBarChart = (data) => {
  const leftPadding = 70;  // labels
  const chartheight = data.length * 30; 

  const xScale = d3.scaleLinear() 
  .domain([0, d3.max(data, d => d.count)])
  .range([0, 500 - leftPadding - 20]); // -20 for right padding

  const yScale = d3.scaleBand() 
  .domain(data.map(d => d.brand))
  .range([0, chartheight])
  .padding(0.3);

  const barAndLabel = svg
  .selectAll("g.bar-and-label")
  .data(data)
  .join("g")
  .attr("class", "bar-and-label")
  .attr("transform", d => `translate(0, ${50 + yScale(d.brand)})`);

  barAndLabel
  .append("rect")
  .attr("class", d => `bar bar-${d.count}`)
  .attr("x", leftPadding)
  .attr("y", 0)
  .attr("height", yScale.bandwidth())
  .attr("width", d => xScale(d.count))
  .attr("fill", "green");

  barAndLabel
  .append("text")
  .text(d => d.brand)
  .attr("x", leftPadding - 5)
  .attr("y", yScale.bandwidth() / 2)
  .attr("dominant-baseline", "middle")
  .attr("text-anchor", "end")
  .style("font-family", "sans-serif")
  .style("font-size", "6px");

  barAndLabel
  .append("text")
  .text(d => d.count)
  .attr("x", d => leftPadding + xScale(d.count) + 4)
  .attr("y", yScale.bandwidth() / 2)
  .attr("dominant-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "6px");
};

