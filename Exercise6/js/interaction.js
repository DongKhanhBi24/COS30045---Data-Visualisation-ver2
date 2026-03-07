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

    yScale.domain([0,d3.max(bins,d=>d.length)])

    const bars=chart.selectAll(".bar")
    .data(bins)

    bars.join("rect")
        .transition()
        .duration(600)
        .attr("x",d=>xScale(d.x0))
        .attr("y",d=>yScale(d.length))
        .attr("width",d=>xScale(d.x1)-xScale(d.x0)-1)
        .attr("height",d=>height - yScale(d.length))
}