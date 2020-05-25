const DUMMY_DATA =  [
    { id: 'd1', value: 10, region: 'USA'},
    { id: 'd2', value: 12, region: 'Izrael'},
    { id: 'd3', value: 15, region: 'UK'},
    { id: 'd4', value: 13, region: 'NL'},
];

const container = d3.select('div')
    .classed('container', true)
    .style('border','1px solid red');

const bars = container
    .selectAll('.bar')
    .data(DUMMY_DATA)
    .enter()
    .append('div')
    .classed('bar', true)
    .style('width', '50px')
    .style('height', data => `${data.value * 12}px`)