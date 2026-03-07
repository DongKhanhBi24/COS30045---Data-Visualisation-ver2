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