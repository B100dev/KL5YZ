// 1. Live UTC Clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    document.getElementById('utc-clock').textContent = `UTC: ${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

// 2. Mock Logbook Data (Replace this with real JSON or API data later)
const contacts = [
    { date: '2023-10-27', time: '14:30', call: 'K1ABC', freq: '14.225', mode: 'SSB', rst: '59' },
    { date: '2023-10-27', time: '14:45', call: 'G4XYZ', freq: '21.074', mode: 'FT8', rst: '-12' },
    { date: '2023-10-28', time: '09:15', call: 'JA1HJK', freq: '7.030', mode: 'CW', rst: '599' },
    { date: '2023-10-28', time: '11:00', call: 'VK3ZL', freq: '14.190', mode: 'SSB', rst: '57' },
    { date: '2023-10-29', time: '23:10', call: 'PY2ERA', freq: '28.400', mode: 'SSB', rst: '59' },
];

const tableBody = document.querySelector('#log-table tbody');

function renderTable(data) {
    tableBody.innerHTML = '';
    data.forEach(qso => {
        const row = `
            <tr>
                <td>${qso.date}</td>
                <td>${qso.time}</td>
                <td style="font-weight:bold; color:#4ecca3">${qso.call}</td>
                <td>${qso.freq}</td>
                <td>${qso.mode}</td>
                <td>${qso.rst}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Initial Render
renderTable(contacts);

// 3. Search Function
function filterLog() {
    const input = document.getElementById('log-search').value.toUpperCase();
    const filtered = contacts.filter(qso => qso.call.includes(input));
    renderTable(filtered);
}
