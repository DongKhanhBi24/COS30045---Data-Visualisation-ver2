function drawHistogram(data){

const binGenerator = d3.bin()
    .value(d=>d.energyConsumption)
    .thresholds(30)

const bins = binGenerator(data)

xScale.domain([
    d3.min(bins,d=>d.x0),
    d3.max(bins,d=>d.x1)
])

yScale.domain([
    0,
    d3.max(bins,d=>d.length)
])

chart.selectAll(".bar")
    .data(bins)
    .enter()
    .append("rect")
    .attr("class","bar")
    .attr("x",d=>xScale(d.x0))
    .attr("y",d=>yScale(d.length))
    .attr("width",d=>xScale(d.x1)-xScale(d.x0)-1)
    .attr("height",d=>height - yScale(d.length))

chart.append("g")
    .attr("transform",`translate(0,${height})`)
    .call(d3.axisBottom(xScale))

chart.append("g")
    .call(d3.axisLeft(yScale))
}