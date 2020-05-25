const DUMMY_DATA =  [
    { id: 'd1', value: 10, region: 'USA'},
    { id: 'd2', value: 12, region: 'Izrael'},
    { id: 'd3', value: 15, region: 'UK'},
    { id: 'd4', value: 13, region: 'NL'},
];

d3.select('div')
    .selectAll('p')
    .data(DUMMY_DATA)
    .enter()
    .append('p')
    .text(data => data.region);