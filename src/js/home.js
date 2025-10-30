// Home Page JavaScript with NEW Date Card Design and jQuery UI Dialog
$(document).ready(function() {
    loadHomePage();
    setupEventHandlers();
});

function loadHomePage() {
    renderWeekCalendar();
    renderPanchangCard();
    renderChoghadiya();
    renderEventPromotion();
    renderTrendingGods();
    renderRashifal();
    renderMusicSection();
    renderFeatureCards();
    renderSupportSection();
}

// Calendar state
let isCalendarExpanded = false;

// NEW: Week Calendar with Centered Date and Micro Text Around It
function renderWeekCalendar() {
    const weekData = [
        {
            date: 26, day: 'रवि',
            tithi: 'द्वादशी', time: '06:04 तक',
            nakshatra: 'मघा', event: 'होश पंचमी',
            moonPhase: 'शुक्ल पक्ष'
        },
        {
            date: 27, day: 'सोम',
            tithi: 'त्रयोदशी', time: '07:03 तक',
            nakshatra: 'पू.फा', event: 'शूर सातालस',
            moonPhase: 'शुक्ल पक्ष'
        },
        {
            date: 28, day: 'मंगल',
            tithi: 'चतुर्दशी', time: '07:58 तक',
            nakshatra: 'उ.फा', event: '',
            moonPhase: 'शुक्ल पक्ष'
        },
        {
            date: 29, day: 'बुध',
            tithi: 'पूर्णिमा', time: '09:23 तक',
            nakshatra: 'हस्त', event: 'शरद पूर्णिमा',
            moonPhase: 'पूर्णिमा'
        },
        {
            date: 30, day: 'गुरु',
            tithi: 'प्रतिपदा', time: '10:06 तक',
            nakshatra: 'चित्रा', event: 'गोपाष्टमी',
            moonPhase: 'कृष्ण पक्ष', active: true
        },
        {
            date: 31, day: 'शुक्र',
            tithi: 'द्वितीया', time: '10:05 तक',
            nakshatra: 'स्वाति', event: '',
            moonPhase: 'कृष्ण पक्ष'
        },
        {
            date: 1, day: 'शनि',
            tithi: 'तृतीया', time: '09:38 तक',
            nakshatra: 'विशाखा', event: '',
            moonPhase: 'कृष्ण पक्ष'
        }
    ];

    renderCalendarView(weekData, false);
}

// Generate full month data (October 2025)
function getFullMonthData() {
    const days = ['बुध', 'गुरु', 'शुक्र', 'शनि', 'रवि', 'सोम', 'मंगल'];
    const fullMonth = [];

    for (let date = 1; date <= 31; date++) {
        const dayIndex = (date - 1 + 2) % 7; // Oct 1, 2025 is Wednesday (index 2)
        fullMonth.push({
            date: date,
            day: days[dayIndex],
            tithi: calendarData.dates[date - 1]?.tithi || 'तिथि',
            time: calendarData.dates[date - 1]?.time || '00:00 तक',
            nakshatra: calendarData.dates[date - 1]?.nakshatra || 'नक्षत्र',
            event: calendarData.dates[date - 1]?.event || '',
            moonPhase: date <= 17 ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष',
            active: date === 30
        });
    }

    return fullMonth;
}

// Render calendar (week or full month)
function renderCalendarView(data, isFullMonth) {
    const weekDaysHeader = $('#weekCalendar .week-days');
    let html = '';

    if (isFullMonth) {
        // Full month grid view
        $('#weekCalendar').addClass('month-view');
        weekDaysHeader.addClass('month-header-visible');

        data.forEach((day, index) => {
            if (index % 7 === 0) {
                html += '<div class="month-row">';
            }

            html += `
                <div class="date-card-wrapper">
                    <div class="date-card ${day.active ? 'active' : ''}" onclick="showDateDetails(${JSON.stringify(day).replace(/"/g, '&quot;')})">
                        <div class="date-number">
                            <div class="date-micro-top">${day.tithi}</div>
                            <div class="date-micro-left">${day.nakshatra}</div>
                            ${day.date}
                            <div class="date-micro-right">${day.moonPhase}</div>
                            <div class="date-micro-bottom">${day.time}</div>
                        </div>
                        ${day.event ? `<div class="date-event-badge"></div>` : ''}
                    </div>
                </div>`;

            if (index % 7 === 6 || index === data.length - 1) {
                html += '</div>';
            }
        });

        // Append month rows after week days header
        weekDaysHeader.after(html);
    } else {
        // Week view
        $('#weekCalendar').removeClass('month-view');
        weekDaysHeader.removeClass('month-header-visible');

        data.forEach(day => {
            html += `
                <div class="date-card-wrapper">
                    <div class="date-day-header">${day.day}</div>
                    <div class="date-card ${day.active ? 'active' : ''}" onclick="showDateDetails(${JSON.stringify(day).replace(/"/g, '&quot;')})">
                        <div class="date-number">
                            <div class="date-micro-top">${day.tithi}</div>
                            <div class="date-micro-left">${day.nakshatra}</div>
                            ${day.date}
                            <div class="date-micro-right">${day.moonPhase}</div>
                            <div class="date-micro-bottom">${day.time}</div>
                        </div>
                        ${day.event ? `<div class="date-event-badge"></div>` : ''}
                    </div>
                </div>`;
        });

        // Replace everything after week days header with week view cards
        weekDaysHeader.nextAll().remove();
        weekDaysHeader.after(html);
    }
}

// Toggle calendar view
function toggleCalendarView() {
    isCalendarExpanded = !isCalendarExpanded;

    if (isCalendarExpanded) {
        const fullMonthData = getFullMonthData();
        renderCalendarView(fullMonthData, true);
        $('#calendarContainer').addClass('expanded');
    } else {
        renderWeekCalendar();
        $('#calendarContainer').removeClass('expanded');
    }
}

// NEW: Show Date Details in jQuery UI Dialog
function showDateDetails(dayData) {
    const data = typeof dayData === 'string' ? JSON.parse(dayData) : dayData;

    const dialogContent = `
        <div class="date-detail-row">
            <div class="date-detail-label">📅 तारीख</div>
            <div class="date-detail-value">${data.date} अक्टूबर 2025 (${data.day}वार)</div>
        </div>
        <div class="date-detail-row">
            <div class="date-detail-label">🌙 तिथि</div>
            <div class="date-detail-value">${data.tithi} (${data.time})</div>
        </div>
        <div class="date-detail-row">
            <div class="date-detail-label">⭐ नक्षत्र</div>
            <div class="date-detail-value">${data.nakshatra}</div>
        </div>
        <div class="date-detail-row">
            <div class="date-detail-label">🌜 पक्ष</div>
            <div class="date-detail-value">${data.moonPhase}</div>
        </div>
        ${data.event ? `
        <div class="date-detail-row">
            <div class="date-detail-label">🎉 त्योहार / विशेष</div>
            <div class="date-detail-value">${data.event}</div>
        </div>` : ''}
        <div class="date-detail-row">
            <div class="date-detail-label">☀️ सूर्योदय</div>
            <div class="date-detail-value">06:32 ए एम</div>
        </div>
        <div class="date-detail-row">
            <div class="date-detail-label">🌅 सूर्यास्त</div>
            <div class="date-detail-value">05:37 पी एम</div>
        </div>
        <div class="date-detail-row">
            <div class="date-detail-label">⏰ राहु काल</div>
            <div class="date-detail-value">01:28 पी एम से 02:51 पी एम</div>
        </div>
        <div class="date-detail-row">
            <div class="date-detail-label">⏰ गुलिक काल</div>
            <div class="date-detail-value">09:18 ए एम से 10:41 ए एम</div>
        </div>
        <div style="margin-top:1rem;text-align:center;">
            <button class="button is-danger" onclick="navigateTo('calendar')">पूर्ण कैलेंडर देखें</button>
        </div>
    `;

    $('#dateDialog').html(dialogContent);
    $('#dateDialog').dialog({
        title: `📆 ${data.date} अक्टूबर 2025 - पूर्ण विवरण`,
        width: Math.min(400, $(window).width() - 40),
        modal: true,
        draggable: false,
        closeText: '✕',
        buttons: {
            'बंद करें': function() {
                $(this).dialog('close');
            }
        }
    });
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
                <div>
                    <div class="rahu-kaal"><span class="label">पक्ष</span> ${p.paksha}</div>
                    <div class="time-value">ऋतु - ${p.season}</div>
                </div>
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
    // Default to first rashi (can be changed based on user login)
    let selectedRashi = 0; // Index of selected rashi (0 = मेष)

    let html = '';
    calendarData.rashifal.forEach((rashi, index) => {
        const isSelected = index === selectedRashi;
        html += `<div class="rashi-item ${isSelected ? 'selected' : ''}" onclick="selectRashi(${index})">
            <div class="rashi-img">
                <div style="width:100%;height:100%;background:#e0e0e0;display:flex;align-items:center;justify-content:center;">
                    <i class="fas fa-star" style="font-size:2rem;color:#999;"></i>
                </div>
            </div>
            <div class="rashi-name">${rashi.name}</div>
        </div>`;
    });
    $('#rashifalScroll').html(html);

    // Show the first rashi details by default
    showRashifalDetails(selectedRashi);
}

function selectRashi(index) {
    // Remove selected class from all rashis
    $('.rashi-item').removeClass('selected');

    // Add selected class to clicked rashi
    $('.rashi-item').eq(index).addClass('selected');

    // Show the rashifal details for selected rashi
    showRashifalDetails(index);
}

function showRashifalDetails(index) {
    const rashi = calendarData.rashifal[index];

    const detailsHtml = `
        <div class="rashifal-details-box">
            <h3 class="rashifal-title">${rashi.name}</h3>
            <p class="rashifal-prediction">${rashi.prediction}</p>
            <a class="rashifal-read-more" onclick="navigateTo('kundali')">..और पढ़ें</a>
        </div>
    `;

    $('#rashifalDetails').html(detailsHtml);
}

// Make functions available globally
window.selectRashi = selectRashi;
window.toggleCalendarView = toggleCalendarView;

// Choghadiya Section
function renderChoghadiya() {
    const choghadiyaData = [
        { name: 'अमृत', time: '01:56 pm - 03:25 pm', type: 'good', date: '30 अक्टू° 2025' },
        { name: 'काल', time: '03:25 pm - 04:54 pm', type: 'bad', date: '30 अक्टू° 2025' }
    ];

    const html = `
        <div class="choghadiya-grid">
            ${choghadiyaData.map(item => `
                <div class="choghadiya-card ${item.type}">
                    <div class="choghadiya-name">${item.name}</div>
                    <div class="choghadiya-date">${item.date}</div>
                    <div class="choghadiya-time">${item.time}</div>
                </div>
            `).join('')}
        </div>
    `;

    $('#choghadiyaSection').html(html);
}

// Event Promotion Card
function renderEventPromotion() {
    const html = `
        <div class="event-promo-card">
            <div class="event-promo-content">
                <h3 class="event-promo-title">आयोजन आयोजन</h3>
                <p class="event-promo-subtitle">दुनिया को पता चले</p>
                <button class="event-promo-btn" onclick="navigateTo('event')">इवेंट बनाएं</button>
            </div>
        </div>
    `;

    $('#eventPromotion').html(html);
}

// Music Section
function renderMusicSection() {
    const musicItems = [
        { name: 'भक्तिगीत', icon: 'om' },
        { name: 'विष्णु', icon: 'vishnu' },
        { name: 'शिव', icon: 'shiv' },
        { name: 'दुर्गा', icon: 'durga' },
        { name: 'लक्ष्मी', icon: 'lakshmi' }
    ];

    const html = musicItems.map(item => `
        <div class="music-item" onclick="navigateTo('music')">
            <div class="music-img">
                <div style="width:100%;height:100%;background:#e0e0e0;display:flex;align-items:center;justify-content:center;">
                    <i class="fas fa-music" style="font-size:2rem;color:#999;"></i>
                </div>
                <div class="music-note-icon">🎵</div>
            </div>
            <div class="music-name">${item.name}</div>
        </div>
    `).join('');

    $('#musicSection').html(html);
}

// Feature Cards Grid
function renderFeatureCards() {
    const features = [
        { icon: 'fa-users', name: 'इवेंट्स', action: 'ayojan' },
        { icon: 'fa-clipboard', name: 'नोट्स', action: 'notes' },
        { icon: 'fa-calendar-check', name: 'चेक लिस्ट', action: 'checklist' },
        { icon: 'fa-chalkboard-user', name: 'छुट्टियां', action: 'chuttiyaan' }
    ];

    const html = features.map(feature => `
        <div class="feature-card" onclick="navigateTo('${feature.action}')">
            <i class="fas ${feature.icon}"></i>
            <span>${feature.name}</span>
        </div>
    `).join('');

    $('#featureCardsGrid').html(html);
}

// Support Section
function renderSupportSection() {
    const html = `
        <div class="support-card">
            <div class="support-illustration">
                <div style="width:100%;height:150px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;border-radius:12px;">
                    <i class="fas fa-headset" style="font-size:3rem;color:#4a90e2;"></i>
                </div>
            </div>
            <h3 class="support-title">समर्थन से संपर्क करें</h3>
            <p class="support-text">किसी भी समय त्वरित सहायता और समाधान के लिए हमारे समर्थन से चैट करें</p>
            <button class="support-btn" onclick="alert('सपोर्ट चैट जल्द ही')">अभी चैट करें</button>
        </div>
    `;

    $('#supportSection').html(html);
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

    // Calendar Drag Toggle
    setupCalendarDrag();
}

// Setup calendar drag/swipe to expand/collapse
function setupCalendarDrag() {
    const dragHandle = document.getElementById('calendarDragHandle');
    const weekCalendar = document.getElementById('weekCalendar');
    let startY = 0;
    let isDragging = false;

    // Touch events
    const touchStart = (e) => {
        startY = e.touches ? e.touches[0].clientY : e.clientY;
        isDragging = true;
    };

    const touchMove = (e) => {
        if (!isDragging) return;

        const currentY = e.touches ? e.touches[0].clientY : e.clientY;
        const deltaY = currentY - startY;

        // Visual feedback during drag
        if (Math.abs(deltaY) > 10) {
            e.preventDefault();
        }
    };

    const touchEnd = (e) => {
        if (!isDragging) return;

        const endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
        const deltaY = endY - startY;

        // If dragged down more than 50px, toggle
        if (deltaY > 50 && !isCalendarExpanded) {
            toggleCalendarView();
        } else if (deltaY < -50 && isCalendarExpanded) {
            toggleCalendarView();
        }

        isDragging = false;
    };

    // Add event listeners for touch
    dragHandle.addEventListener('touchstart', touchStart, { passive: false });
    dragHandle.addEventListener('touchmove', touchMove, { passive: false });
    dragHandle.addEventListener('touchend', touchEnd, { passive: false });

    // Add event listeners for mouse (desktop testing)
    dragHandle.addEventListener('mousedown', touchStart);
    dragHandle.addEventListener('mousemove', touchMove);
    dragHandle.addEventListener('mouseup', touchEnd);

    // Click on drag handle to toggle
    dragHandle.addEventListener('click', (e) => {
        if (!isDragging) {
            toggleCalendarView();
        }
    });

    // Click on week calendar area to toggle
    weekCalendar.addEventListener('click', (e) => {
        // Only toggle if not clicking on a date card
        if (!e.target.closest('.date-card')) {
            toggleCalendarView();
        }
    });
}

function closePlusModal() {
    $('#plusModal').removeClass('is-active');
}

function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'भारत कैलेंडर',
            text: 'हिंदी कैलेंडर ऐप - पंचांग, राशिफल, मुहूर्त',
            url: window.location.href
        });
    } else {
        alert('शेयर फीचर जल्द ही उपलब्ध होगा');
    }
}

function openInstagram() {
    window.open('https://instagram.com', '_blank');
}

// Make showDateDetails available globally
window.showDateDetails = showDateDetails;
