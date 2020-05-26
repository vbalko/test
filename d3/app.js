const DUMMY_DATA = [
    { id: 'd1', region: 'USA', value: 10 },
    { id: 'd2', region: 'India', value: 12 },
    { id: 'd3', region: 'China', value: 12 },
    { id: 'd4', region: 'Germany', value: 6 },
];
let selectedData = DUMMY_DATA;
let unselectedIds = [];

const MARGINS = { top: 20, bottom: 10, left: 20, right: 10 };
const CHART_WIDTH = 600 - MARGINS.left - MARGINS.right;
const CHART_HEIGHT = 400 - MARGINS.top - MARGINS.bottom;

const x = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1);
const y = d3.scaleLinear().range([CHART_HEIGHT, 0]);

const chartContainer = d3.select('svg')
    .attr('width', CHART_WIDTH + MARGINS.left + MARGINS.right)
    .attr('height', CHART_HEIGHT + MARGINS.top + MARGINS.bottom);

x.domain(DUMMY_DATA.map((d) => d.region));
y.domain([0, d3.max(DUMMY_DATA, d => d.value + 3)]);

const chart = chartContainer.append('g');

chart.append('g').call(d3.axisBottom(x))
    .attr('transform', `translate(0,${CHART_HEIGHT})`)

chart.append('g').call(d3.axisLeft(y))
    .attr('transform', `translate(${CHART_WIDTH},0)`)

function renderChart() {
chart.selectAll('.bar')
    .data(selectedData, data => data.id)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', x.bandwidth())
    .attr('height', data => CHART_HEIGHT - y(data.value))
    .attr('x', data => x(data.region))
    .attr('y', data => y(data.value))

chart.selectAll('.bar')
    .data(selectedData, data => data.id)
    .exit()
    .remove();

chart.selectAll('.label')
    .data(selectedData, data => data.id)
    .enter()
    .append('text')
    .text(data => data.value)
    .attr('x', data => x(data.region) + x.bandwidth() / 2)
    .attr('y', data => y(data.value) - 20)
    .attr('text-anchor', 'middle')
    .classed('label', true);

chart.selectAll('.label')
    .data(selectedData, data => data.id)
    .exit()
    .remove();

}

renderChart();

const listItems = d3.select('#data').select('ul').selectAll('li')
    .data(DUMMY_DATA)
    .enter()
    .append('li')

listItems.append('span').text(data => data.region);

listItems.append('input').attr('type', 'checkbox').attr('checked', true).on('change', data => {
    if (unselectedIds.indexOf(data.id) === -1) {
        unselectedIds.push(data.id);
    } else {
        unselectedIds = unselectedIds.filter(id => id !== data.id);
    }
    selectedData = DUMMY_DATA.filter(item => unselectedIds.indexOf(item.id) ===  -1);
    renderChart();
})
