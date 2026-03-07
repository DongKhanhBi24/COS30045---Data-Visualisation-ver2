// Load the CSV file with a row conversion function
d3.csv("data/Ex6_TVdata_cleaned.csv", d => ({
    brand: d.brand,
    
    screenSize: +d.screenSize, 
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption, 
    star: +d.star, 
    model_cleaned: d.model
})).then(data => {

    console.log(data);

    drawHistogram(data);
    populateFilters(data);
})