(function () {
  const width = 500;
  const height = 650;
  const radius = Math.min(width, height) / 2 - 10;

  const svg = d3.select("#donutChart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

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

    const outerArc = d3.arc()
      .innerRadius(radius * 1.05)
      .outerRadius(radius * 1.05);

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

    const labelYOffset = d => {
    const tech = d.data.Screen_Tech;

    if (tech === "Plasma") return -38;
    if (tech === "OLED") return -18;
    if (tech === "LCD") return 14;
    return 0;
    };

    // leader lines 
    arcs.append("polyline")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("points", d => {
        const posA = arc.centroid(d);        
        const posB = outerArc.centroid(d);   
        const posC = outerArc.centroid(d);   

        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;

        posC[0] = radius * 0.8 * (midAngle < Math.PI ? 1 : -1);
        posC[1] += labelYOffset(d);

        return [posA, posB, posC];
      });

    // add outside labels
    arcs.append("text")
      .text(d => {
        const percentage = (d.data.count / d3.sum(data, d => d.count)) * 100;
        return `${d.data.Screen_Tech}: ${percentage.toFixed(1)}%`;
      })
      .attr("transform", d => {
        const pos = outerArc.centroid(d);
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;

        pos[0] = radius * 0.85 * (midAngle < Math.PI ? 1 : -1);
        pos[1] += labelYOffset(d);

        return `translate(${pos})`;
      })
      .style("text-anchor", d => {
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midAngle < Math.PI ? "start" : "end";
      })
      .style("font-size", "20px");

    // add legend 
    const legend = svg.selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(${radius + 20}, ${i * 20 - radius})`);

    legend.append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", d => color(d.Screen_Tech));

    legend.append("text")
      .attr("x", 18)
      .attr("y", 10)
      .text(d => d.Screen_Tech)
      .style("font-size", "20px");
  });
})();