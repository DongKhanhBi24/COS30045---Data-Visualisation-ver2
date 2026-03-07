function drawScatterPlot(data){

const svgS = d3.select("#scatterPlot")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

innerChartS = svgS.append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`)

xScaleS
    .domain([0, d3.max(data,d=>d.star)])
    .range([0,width-margin.left-margin.right])

yScaleS
    .domain([0, d3.max(data,d=>d.energyConsumption)])
    .range([height-margin.top-margin.bottom,0])

colorScale
    .domain(data.map(d => d.screenTech))
    .range(d3.schemeCategory10)

// draw circles

innerChartS.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx",d=>xScaleS(d.star))
    .attr("cy",d=>yScaleS(d.energyConsumption))
    .attr("r",3)
    .attr("fill",d=>colorScale(d.screenTech))
    .attr("opacity",0.6)

// X axis

innerChartS.append("g")
    .attr("transform",`translate(0,${height-margin.top-margin.bottom})`)
    .call(d3.axisBottom(xScaleS))

// Y axis

innerChartS.append("g")
    .call(d3.axisLeft(yScaleS))

// X label
innerChartS.append("text")
    .attr("x", width/2 + margin.left + 150)
    .attr("y", height - margin.bottom)
    .attr("text-anchor","middle")
    .style("font-size","12=4px")
    .text("Star Rating")

// Y label
innerChartS.append("text")
    .attr("transform","rotate(-90)")
    .attr("x", -height/2+margin.top)
    .attr("y", -50)
    .attr("text-anchor","middle")
    .style("font-size","14px")
    .text("Labeled Energy Consumption (kWh/year)")

// Legend
const legend = innerChartS
    .selectAll(".legend")
    .data(colorScale.domain())
    .enter()
    .append("g")
    .attr("transform",(d,i)=>`translate(${width-130},${i*20})`)

legend.append("rect")
    .attr("width",12)
    .attr("height",12)
    .attr("fill",d=>colorScale(d))

legend.append("text")
    .attr("x",18)
    .attr("y",10)
    .text(d=>d)
    .style("font-size","12px")
}