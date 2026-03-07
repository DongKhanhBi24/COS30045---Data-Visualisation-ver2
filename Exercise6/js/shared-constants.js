const margin = {top:40,right:30,bottom:50,left:70}

const width = 800 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

const barColor = "#606464"
const bodyBackgroundColor = "#fffaf0"

const svg = d3.select("#histogram")
    .append("svg")
    .attr("width",width + margin.left + margin.right)
    .attr("height",height + margin.top + margin.bottom)

const chart = svg.append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`)

const xScale = d3.scaleLinear().range([0,width])
const yScale = d3.scaleLinear().range([height,0])

const filters_screen = [
    { id:"all", label:"All", isActive:true },
    { id:"LCD", label:"LCD", isActive:false },
    { id:"LED", label:"LED", isActive:false },
    { id:"OLED", label:"OLED", isActive:false }
]