(function(){
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
    .style("font-size", "17px")
    .each(function(d) {

        const percentage = (d.data.count / d3.sum(data, d => d.count)) * 100;

        if (percentage > 3) {   // hide labels for very small slices
            const text = d3.select(this);

            text.append("tspan")
                .attr("x", 0)
                .attr("dy", "-0.2em")
                .text(d.data.Screen_Tech);

            text.append("tspan")
                .attr("x", 0)
                .attr("dy", "1.2em")
                .style("font-size", "15px")
                .text(percentage.toFixed(1) + "%");
        }
    });

    // add legend
    const legend = svg.selectAll(".legend")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", (d,i)=>`translate(${radius+20}, ${i*20-radius})`);

    legend.append("rect")
        .attr("width",12)
        .attr("height",12)
        .attr("fill", d=>color(d.Screen_Tech));

    legend.append("text")
        .attr("x",18)
        .attr("y",10)
        .each(function(d) {
            const text = d3.select(this);
            text.append("tspan")
                .attr("font-weight", "bold")
                .text(d.Screen_Tech);
        })
        .style("font-size","14px");
});
})();
