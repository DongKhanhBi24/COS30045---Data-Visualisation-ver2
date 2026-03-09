function populateFilters(data){

const container = d3.select("#filters")

const buttons = container
    .selectAll("button")
    .data(filters_screen)
    .enter()
    .append("button")
    .text(d=>d.label)
    .classed("active",d=>d.isActive)

buttons.on("click",function(event,d){

    filters_screen.forEach(f=>f.isActive=false)
    d.isActive=true

    buttons.classed("active",f=>f.isActive)

    updateHistogram(d.id,data)

})

}

function updateHistogram(filterID,data){

let filteredData

if(filterID==="all"){
    filteredData=data
}
else{
    filteredData=data.filter(d=>d.screenTech===filterID)
}

const binGenerator=d3.bin()
    .value(d=>d.energyConsumption)
    .thresholds(30)

const bins=binGenerator(filteredData)

// update y scale
yScale.domain([0,d3.max(bins,d=>d.length)])

chart.select(".y-axis")
    .transition()
    .duration(600)
    .call(d3.axisLeft(yScale));
// select existing bars
const bars=chart.selectAll(".bar")
    .data(bins)

// UPDATE only (no join)
bars
    .transition()
    .duration(600)
    .attr("y",d=>yScale(d.length))
    .attr("height",d=>height - yScale(d.length))

}

// --------------------------------------------
// Create tooltip
// --------------------------------------------

function createTooltip(){

const tooltip = innerChartS
    .append("g")
    .attr("class","tooltip")
    .style("opacity",0)

// background rectangle

tooltip.append("rect")
    .attr("width",tooltipWidth)
    .attr("height",tooltipHeight)
    .attr("rx",5)
    .attr("ry",5)
    .attr("fill",barColor)
    .attr("fill-opacity",0.75)

// tooltip text

tooltip.append("text")
    .text("NA")
    .attr("x",tooltipWidth/2)
    .attr("y",tooltipHeight/2 + 2)
    .attr("text-anchor","middle")
    .attr("alignment-baseline","middle")
    .attr("fill","white")
    .style("font-weight",900)

}

// --------------------------------------------
// Handle mouse events
// --------------------------------------------

function handleMouseEvents(){

innerChartS.selectAll("circle")

.on("mouseenter",(e,d)=>{

    d3.select(".tooltip text")
        .text(d.screenSize)

    const cx = e.target.getAttribute("cx")
    const cy = e.target.getAttribute("cy")

    d3.select(".tooltip")
        .attr("transform",
        `translate(${cx - 0.5*tooltipWidth}, ${cy - 1.5*tooltipHeight})`)
        .transition()
        .duration(200)
        .style("opacity",1)

})

.on("mouseleave",(e,d)=>{

    d3.select(".tooltip")
        .style("opacity",0)
        .attr("transform","translate(0,500)")

})

}