let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
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

            tableHTML += `<td onclick="handleCellClick(${index})">`;

            if (value === 'circle') {
                tableHTML += generateSvgCircle();
            } else if (value === 'cross') {
                tableHTML += generateSvgCross();
            }

            tableHTML += '</td>';
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    document.getElementById('Content').innerHTML = tableHTML;
}

function handleCellClick(index) {
    // Überprüfen, ob die Zelle bereits gefüllt ist
    if (fields[index] !== null) return;

    // Wechsle zwischen 'circle' und 'cross' basierend auf dem aktuellen Zustand
    const isCircleTurn = fields.filter(value => value !== null).length % 2 === 0;
    fields[index] = isCircleTurn ? 'circle' : 'cross';

    render();
}

function generateSvgCircle() {
    return `
        <svg width="40px" height="40px" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="none" stroke="blue" stroke-width="4"
                stroke-dasharray="113.097" stroke-dashoffset="113.097" transform="rotate(-90 20 20)">
                <animate attributeName="stroke-dashoffset" from="113.097" to="0"
                    dur="0.2s" fill="freeze" />
            </circle>
        </svg>
    `;
}

function generateSvgCross() {
    return `
        <svg width="80px" height="80px" viewBox="0 0 40 40">
            <!-- Erste Linie des Kreuzes -->
            <line x1="10" y1="10" x2="30" y2="30" stroke="yellow" stroke-width="2"
                stroke-dasharray="28.28" stroke-dashoffset="28.28">
                <animate attributeName="stroke-dashoffset" from="28.28" to="0"
                    dur="0.2s" fill="freeze" />
            </line>
            <!-- Zweite Linie des Kreuzes -->
            <line x1="30" y1="10" x2="10" y2="30" stroke="yellow" stroke-width="2"
                stroke-dasharray="28.28" stroke-dashoffset="28.28">
                <animate attributeName="stroke-dashoffset" from="28.28" to="0"
                    dur="0.2s" begin="0.2s" fill="freeze" />
            </line>
        </svg>
    `;
}