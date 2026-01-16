/* =========================================
   1. LIVE UTC CLOCK
   ========================================= */
function updateClock() {
    const now = new Date();
    const timeString = now.toISOString().split('T')[1].split('.')[0];
    document.getElementById('utc-clock').textContent = `UTC: ${timeString}`;
}
setInterval(updateClock, 1000);
updateClock();

/* =========================================
   2. ON AIR STATUS TOGGLE
   ========================================= */
const statusDiv = document.getElementById('status-indicator');
const statusText = document.getElementById('status-text');

function toggleStatus() {
    // Note: This only toggles the local view. 
    // To make this visible to others, you would need a database.
    if (statusDiv.classList.contains('status-off')) {
        statusDiv.classList.remove('status-off');
        statusDiv.classList.add('status-on');
        statusText.textContent = "TRANSMITTING";
    } else {
        statusDiv.classList.remove('status-on');
        statusDiv.classList.add('status-off');
        statusText.textContent = "OFF AIR";
    }
}

/* =========================================
   3. CONTEST COUNTDOWN TIMER
   ========================================= */
// Set your next contest date here (YYYY-MM-DDTHH:MM:SS)
const contestDate = new Date("2025-10-25T00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = contestDate - now;

    if (distance < 0) {
        document.getElementById("contest-timer").textContent = "IN PROGRESS / ENDED";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    // Pad with zeros for aesthetics
    const d = String(days).padStart(2, '0');
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');

    document.getElementById("contest-timer").textContent = `${d}d ${h}h ${m}m`;
}
setInterval(updateCountdown, 60000); // Update every minute
updateCountdown();

/* =========================================
   4. LOGBOOK & SEARCH
   ========================================= */
const contacts = [
    { date: '2023-11-01', time: '23:15', call: 'K1ABC', freq: '14.225', mode: 'SSB', rst: '59' },
    { date: '2023-11-02', time: '01:30', call: 'G4XYZ', freq: '7.074', mode: 'FT8', rst: '-10' },
    { date: '2023-11-02', time: '14:00', call: 'JA1HJK', freq: '21.030', mode: 'CW', rst: '599' },
    { date: '2023-11-03', time: '18:45', call: 'VK3ZL', freq: '14.190', mode: 'SSB', rst: '57' },
    { date: '2023-11-04', time: '09:20', call: 'ZS6BUR', freq: '28.450', mode: 'SSB', rst: '55' },
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

function filterLog() {
    const input = document.getElementById('log-search').value.toUpperCase();
    const filtered = contacts.filter(qso => qso.call.includes(input));
    renderTable(filtered);
}

// Initial Render
renderTable(contacts);
