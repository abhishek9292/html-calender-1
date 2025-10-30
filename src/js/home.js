// Home Page JavaScript
$(document).ready(function() {
    loadHomePage();
    setupEventHandlers();
});

function loadHomePage() {
    renderWeekCalendar();
    renderPanchangCard();
    renderTrendingGods();
    renderRashifal();
}

function renderWeekCalendar() {
    const weekDays = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
    const weekData = [
        { date: 26, tithi: 'द्वादशी', time: '06:04 तक', event: 'होश पंचमी' },
        { date: 27, tithi: 'त्रयोदशी', time: '07:03 तक', event: 'शूर सातालस' },
        { date: 28, tithi: 'चतुर्दशी', time: '07:58 तक', event: '' },
        { date: 29, tithi: 'पूर्णिमा', time: '09:23 तक', event: 'शरद पूर्णिमा' },
        { date: 30, tithi: 'प्रतिपदा', time: '10:06 तक', event: 'गोपाष्टमी', active: true },
        { date: 31, tithi: 'द्वितीया', time: '10:05 तक', event: '' },
        { date: 1, tithi: 'तृतीया', time: '09:38 तक', event: '' }
    ];

    let html = `<div class="week-days">${weekDays.map(d => `<div>${d}</div>`).join('')}</div>
        <div class="week-dates">`;

    weekData.forEach(day => {
        html += `<div class="date-card ${day.active ? 'active' : ''}">
            <div class="date-info">${day.tithi}</div>
            <div class="date-info">${day.time}</div>
            <span class="date-number">${day.date}</span>
            ${day.event ? `<div class="date-info">${day.event}</div>` : ''}
        </div>`;
    });

    html += '</div>';
    $('#weekCalendar').html(html);
}

function renderPanchangCard() {
    const p = calendarData.panchang;
    const html = `
        <div class="panchang-header">
            <i class="fas fa-om has-text-warning"></i>
            <div class="panchang-date">${p.date}</div>
            <button class="share-btn" onclick="shareApp()">
                <i class="fas fa-share-nodes"></i><span>शेयर</span>
            </button>
        </div>
        <div class="panchang-body">
            <div class="panchang-row"><div><strong>तिथि</strong> - ${p.tithiEnd}</div></div>
            <div class="panchang-row"><div><strong>नक्षत्र</strong> - ${p.nakshatraEnd}</div></div>
            <div class="sunrise-box"><i class="fas fa-sun"></i><span>${p.sunrise} - ${p.sunset}</span></div>
            <div class="rahu-kaal"><span class="label">राहु काल</span><span class="time-value">${p.rahuKaal}</span></div>
            <div class="gulik-kaal"><span class="label">गुलिक काल</span><span class="time-value">${p.gulikKaal}</span></div>
            <div class="moon-phase">
                <div class="moon-icon"></div>
                <div><div class="rahu-kaal"><span class="label">पक्ष</span> ${p.paksha}</div>
                <div class="time-value">ऋतु - ${p.season}</div></div>
            </div>
            <div class="festival-info">
                <i class="fas fa-calendar-check has-text-info"></i>
                <span>${p.festivals.join(', ')}</span>
                <span class="festival-more" onclick="navigateTo('tyohaar')">+अधिक</span>
            </div>
        </div>
        <div class="panchang-footer">
            <i class="fas fa-om"></i><span>पंचांगो</span>
            <button onclick="navigateTo('calendar')">खरीदना</button>
        </div>`;
    $('#panchangCard').html(html);
}

function renderTrendingGods() {
    const gods = [
        'शुभ प्रभात', 'उद्धरण', 'हनुमान', 'लक्ष्मी', 'भगवान विष्णु', 'Krishna', 'गणेश', 'दुर्गा'
    ];
    let html = '';
    gods.forEach(god => {
        html += `<div class="trending-item" onclick="navigateTo('music')">
            <div class="trending-img">
                <div style="width:100%;height:100%;background:#e0e0e0;display:flex;align-items:center;justify-content:center;">
                    <i class="fas fa-image" style="font-size:2rem;color:#999;"></i>
                </div>
            </div>
            <div>${god}</div>
        </div>`;
    });
    $('#trendingGods').html(html);
}

function renderRashifal() {
    let html = '';
    calendarData.rashifal.forEach(rashi => {
        html += `<div class="trending-item" onclick="navigateTo('kundali')">
            <div class="trending-img">
                <div style="width:100%;height:100%;background:#e0e0e0;display:flex;align-items:center;justify-content:center;">
                    <i class="fas fa-star" style="font-size:2rem;color:#999;"></i>
                </div>
            </div>
            <div>${rashi.name}</div>
        </div>`;
    });
    $('#rashifalScroll').html(html);
}

function setupEventHandlers() {
    // Menu Toggle
    $('#menuBtn').click(function() {
        $('#sidebar').addClass('active');
        $('#mainContent').addClass('sidebar-open');
    });

    $(document).click(function(e) {
        if (!$(e.target).closest('#sidebar, #menuBtn').length) {
            $('#sidebar').removeClass('active');
            $('#mainContent').removeClass('sidebar-open');
        }
    });

    // Plus Button
    $('#plusBtn').click(function() {
        $('#plusModal').addClass('is-active');
    });
}

function closePlusModal() {
    $('#plusModal').removeClass('is-active');
}

function shareApp() {
    alert('शेयर फीचर जल्द ही उपलब्ध होगा');
}

function openInstagram() {
    window.open('https://instagram.com', '_blank');
}
