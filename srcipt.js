let fields = [
    'circle',
    'circle',
    'circle',
    'circle',
    null,
    null,
    'cross',
    'cross',
    null
];

function init() {
    render();
}

function render() {
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let value = fields[index];

            if (value === 'circle') {
                let svgCircle = generateSvgCircle();
                tableHTML += '<td>';
                tableHTML += svgCircle.outerHTML;
                tableHTML += '</td>';
            } else if (value === 'cross') {
                tableHTML += '<td class="cross">X</td>';
            } else {
                tableHTML += '<td></td>';
            }
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';

    document.getElementById('Content').innerHTML = tableHTML;
}

function generateSvgCircle() {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "40px");
    svg.setAttribute("height", "40px");
    svg.setAttribute("viewBox", "0 0 40 40");

    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "20");
    circle.setAttribute("cy", "20");
    circle.setAttribute("r", "18");
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", "blue");
    circle.setAttribute("stroke-width", "4");
    circle.setAttribute("stroke-dasharray", "113.097");
    circle.setAttribute("stroke-dashoffset", "113.097");
    circle.setAttribute("transform", "rotate(-90 20 20)");

    let animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animate.setAttribute("attributeName", "stroke-dashoffset");
    animate.setAttribute("from", "113.097");
    animate.setAttribute("to", "0");
    animate.setAttribute("dur", "200ms");
    animate.setAttribute("fill", "freeze");

    circle.appendChild(animate);
    svg.appendChild(circle);

    return svg;
}
