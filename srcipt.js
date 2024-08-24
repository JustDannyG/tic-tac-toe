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

function checkWin() {
    const winPatterns = [
        [0, 1, 2], // obere Reihe
        [3, 4, 5], // mittlere Reihe
        [6, 7, 8], // untere Reihe
        [0, 3, 6], // linke Spalte
        [1, 4, 7], // mittlere Spalte
        [2, 5, 8], // rechte Spalte
        [0, 4, 8], // diagonale von oben links nach unten rechts
        [2, 4, 6]  // diagonale von oben rechts nach unten links
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return { pattern, winner: fields[a] };
        }
    }
    return null;
}

function displayWinningLine(winInfo) {
    const { pattern } = winInfo;
    
    // Bestimme die Position der Linie basierend auf dem Gewinnmuster
    const startCell = document.querySelectorAll('td')[pattern[0]];
    const endCell = document.querySelectorAll('td')[pattern[2]];

    // Hole die Positionen und Größen der Zellen
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    // Berechne die Mitte der ersten und letzten Zelle
    const startX = startRect.left + startRect.width / 2;
    const startY = startRect.top + startRect.height / 2;
    const endX = endRect.left + endRect.width / 2;
    const endY = endRect.top + endRect.height / 2;

    // Berechne die Länge und den Winkel der Linie
    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

    // Erzeuge die Linie
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.backgroundColor = 'white';
    line.style.opacity = '0.7';
    line.style.height = '4px';
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.transformOrigin = '0 0';
    line.style.left = `${startX}px`;
    line.style.top = `${startY}px`;

    // Füge die Linie zum Spielfeld hinzu
    document.body.appendChild(line);
}

function calculateAngle(pattern) {
    const angleMap = {
        '0,1,2': 0,   // obere Reihe horizontal
        '3,4,5': 0,   // mittlere Reihe horizontal
        '6,7,8': 0,   // untere Reihe horizontal
        '0,3,6': 90,  // linke Spalte vertikal
        '1,4,7': 90,  // mittlere Spalte vertikal
        '2,5,8': 90,  // rechte Spalte vertikal
        '0,4,8': 45,  // diagonale von oben links nach unten rechts
        '2,4,6': -45  // diagonale von oben rechts nach unten links
    };
    return angleMap[pattern.sort().join(',')];
}

function handleCellClick(index) {
    // Überprüfen, ob das Spiel bereits gewonnen wurde
    if (checkWin() || fields[index] !== null) return;

    // Wechsle zwischen 'circle' und 'cross' basierend auf dem aktuellen Zustand
    const isCircleTurn = fields.filter(value => value !== null).length % 2 === 0;
    fields[index] = isCircleTurn ? 'circle' : 'cross';

    render();

    // Überprüfen, ob der aktuelle Zug zum Sieg geführt hat
    const winInfo = checkWin();
    if (winInfo) {
        displayWinningLine(winInfo);
    }
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