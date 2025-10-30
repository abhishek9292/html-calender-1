// Hindi Calendar App - jQuery Implementation
$(document).ready(function() {

    // Initialize App
    initializeApp();

    // ========== NAVIGATION ==========

    // Bottom Navigation
    $('.nav-item[data-page]').click(function() {
        const page = $(this).data('page');
        $('.nav-item').removeClass('active');
        $(this).addClass('active');
        showPage(page);
    });

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

    // Plus Button Modal
    $('#plusBtn').click(function() {
        $('#plusModal').addClass('is-active');
    });

    $('.modal-background, .plus-option').click(function() {
        $('#plusModal').removeClass('is-active');
    });

    // Search Button
    $('#searchBtn').click(function() {
        showPage('search');
    });

    // Back Buttons
    $('.back-btn').click(function() {
        showPage('home');
        $('.nav-item').removeClass('active');
        $('.nav-item[data-page="home"]').addClass('active');
    });

    // ========== PAGE RENDERING ==========

    function showPage(pageName) {
        $('.page').removeClass('active');

        switch(pageName) {
            case 'home':
                $('#homePage').addClass('active');
                break;
            case 'calendar':
                $('#calendarPage').addClass('active');
                renderCalendarPage();
                break;
            case 'music':
                alert('संगीत पृष्ठ जल्द ही आ रहा है');
                break;
            case 'ayojan':
                alert('आयोजन पृष्ठ जल्द ही आ रहा है');
                break;
            case 'search':
                $('#searchPage').addClass('active');
                break;
            case 'muhurt':
                $('#muhurtPage').addClass('active');
                renderMuhurtPage();
                break;
        }
    }

    // ========== HOME PAGE ==========

    function renderHomePage() {
        const html = `
            <div class="feature-icons">
                <div class="feature-icon" data-action="calendar">
                    <div class="icon-circle"><i class="fas fa-calendar-alt"></i></div>
                    <span>कैलेंडर</span>
                </div>
                <div class="feature-icon" data-action="muhurt">
                    <div class="icon-circle"><i class="fas fa-om"></i></div>
                    <span>शुभ मुहूर्त</span>
                </div>
                <div class="feature-icon" data-action="festival">
                    <div class="icon-circle"><i class="fas fa-star"></i></div>
                    <span>त्योहार</span>
                </div>
                <div class="feature-icon" data-action="holiday">
                    <div class="icon-circle"><i class="fas fa-umbrella-beach"></i></div>
                    <span>छुट्टियां</span>
                </div>
                <div class="feature-icon" data-action="kundali">
                    <div class="icon-circle"><i class="fas fa-scroll"></i></div>
                    <span>कुण्डली</span>
                </div>
            </div>

            <div class="week-calendar">
                <div class="week-days">
                    ${calendarData.weekDays.map(day => `<div>${day}</div>`).join('')}
                </div>
                <div class="week-dates">
                    ${calendarData.weekCalendar.map(day => `
                        <div class="date-card ${day.active ? 'active' : ''}">
                            <div class="date-info">${day.hindi}</div>
                            <div class="date-info">${day.time}</div>
                            <span class="date-number">${day.date}</span>
                            ${day.event ? `<div class="date-info">${day.event}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>

            <div style="text-align: center; padding: 1rem;">
                <h2 class="section-title">आज पंचांग</h2>
            </div>

            <div class="panchang-card">
                <div class="panchang-header">
                    <i class="fas fa-om has-text-warning"></i>
                    <div class="panchang-date">${calendarData.panchangData.date}</div>
                    <button class="share-btn">
                        <i class="fas fa-share-nodes"></i>
                        <span>शेयर</span>
                    </button>
                </div>

                <div class="panchang-body">
                    <div class="panchang-row">
                        <div>
                            <strong>अमंगी</strong> - ${calendarData.panchangData.amavasya.split(',')[0]}
                        </div>
                    </div>
                    <div class="panchang-row">
                        <div>
                            <strong>श्रवण</strong> - ${calendarData.panchangData.shravana.split(',')[0]}
                        </div>
                    </div>

                    <div class="sunrise-box">
                        <i class="fas fa-sun"></i>
                        <span>${calendarData.panchangData.sunrise}</span>
                    </div>

                    <div class="rahu-kaal">
                        <span class="label">राहु काल</span>
                        <span class="time-value">${calendarData.panchangData.rahuKaal}</span>
                    </div>

                    <div class="gulik-kaal">
                        <span class="label">गुलिक काल</span>
                        <span class="time-value">${calendarData.panchangData.gulikKaal}</span>
                    </div>

                    <div class="moon-phase">
                        <div class="moon-icon"></div>
                        <div>
                            <div class="rahu-kaal"><span class="label">राहु काल</span></div>
                            <div class="time-value">${calendarData.panchangData.rahuKaal}</div>
                            <div class="gulik-kaal"><span class="label">गुलिक काल</span></div>
                            <div class="time-value">${calendarData.panchangData.gulikKaal}</div>
                        </div>
                    </div>

                    <div class="festival-info">
                        <i class="fas fa-calendar-check has-text-info"></i>
                        <span>गोपाष्टमी, मासिक दुर्गाष्टमी</span>
                        <span class="festival-more">+1More</span>
                    </div>
                </div>

                <div class="panchang-footer">
                    <i class="fas fa-om"></i>
                    <span>${calendarData.panchangData.panchang}</span>
                    <button>खरीदना</button>
                </div>
            </div>

            <div class="trending-section">
                <h2 class="section-title">ट्रेंडिंग स्टेटस</h2>
                <div class="trending-scroll">
                    ${calendarData.trendingGods.map(god => `
                        <div class="trending-item">
                            <div class="trending-img">
                                <div style="width:100%;height:100%;background:#e0e0e0;display:flex;align-items:center;justify-content:center;">
                                    <i class="fas fa-image" style="font-size:2rem;color:#999;"></i>
                                </div>
                            </div>
                            <div>${god.name}</div>
                        </div>
                    `).join('')}
                </div>

                <h2 class="section-title">आज का राशिफल</h2>
                <div class="trending-scroll">
                    ${calendarData.rashifal.map(rashi => `
                        <div class="trending-item">
                            <div class="trending-img">
                                <div style="width:100%;height:100%;background:#e0e0e0;display:flex;align-items:center;justify-content:center;">
                                    <i class="fas fa-star" style="font-size:2rem;color:#999;"></i>
                                </div>
                            </div>
                            <div>${rashi.name}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        $('#homePage').html(html);

        // Feature Icon Actions
        $('.feature-icon').click(function() {
            const action = $(this).data('action');
            handleFeatureClick(action);
        });
    }

    function handleFeatureClick(action) {
        switch(action) {
            case 'calendar':
                $('.nav-item').removeClass('active');
                $('.nav-item[data-page="calendar"]').addClass('active');
                showPage('calendar');
                break;
            case 'muhurt':
                showPage('muhurt');
                break;
            case 'festival':
                alert('त्योहार पृष्ठ जल्द ही आ रहा है');
                break;
            case 'holiday':
                alert('छुट्टियां पृष्ठ जल्द ही आ रहा है');
                break;
            case 'kundali':
                alert('कुण्डली पृष्ठ जल्द ही आ रहा है');
                break;
        }
    }

    // ========== CALENDAR PAGE ==========

    function renderCalendarPage() {
        const html = `
            <div class="calendar-header">
                <button class="back-btn"><i class="fas fa-arrow-left"></i></button>
                <div class="calendar-title">
                    <h1 class="title has-text-white" style="font-size:1rem;margin:0;">आज</h1>
                </div>
                <div style="display:flex;gap:1rem;">
                    <i class="fas fa-share-nodes"></i>
                    <i class="fas fa-ellipsis-v"></i>
                </div>
            </div>

            <div class="calendar-nav">
                <button class="nav-arrow" id="prevMonth"><i class="fas fa-chevron-left"></i></button>
                <div>
                    <div class="month-display">${calendarData.monthCalendar.degree}</div>
                    <div class="month-subtitle">${calendarData.monthCalendar.monthSubtitle}</div>
                </div>
                <button class="nav-arrow" id="nextMonth"><i class="fas fa-chevron-right"></i></button>
            </div>

            <div class="day-tabs">
                ${calendarData.weekDays.map((day, idx) => `
                    <div class="day-tab">${day}</div>
                `).join('')}
            </div>

            <div class="calendar-grid">
                ${calendarData.monthCalendar.days.map(day => {
                    if (day.empty) return '<div class="calendar-cell"></div>';
                    return `
                        <div class="calendar-cell ${day.today ? 'today' : ''} ${day.event ? 'holiday' : ''}">
                            <span class="cell-date">${day.date}</span>
                            <div class="cell-info">${day.hindi || ''}</div>
                            <div class="cell-info">${day.time || ''}</div>
                            ${day.event ? `<div class="cell-info" style="font-size:0.65rem;">${day.event}</div>` : ''}
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="calendar-footer">
                <div class="toggle-buttons">
                    <button class="toggle-btn active" data-toggle="holidays">छुट्टियां</button>
                    <button class="toggle-btn" data-toggle="fasting">उपवास के दिन</button>
                </div>

                <div class="holiday-list">
                    <div class="holiday-header">
                        <span>हिन्दू छुट्टियाँ</span>
                        <i class="fas fa-bell-slash"></i>
                    </div>
                    ${calendarData.holidays.map(holiday => `
                        <div class="holiday-item">
                            <span class="holiday-date">${holiday.date}</span>
                            <span class="holiday-name">${holiday.name}</span>
                            <i class="fas fa-arrow-right holiday-arrow"></i>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        $('#calendarPage').html(html);

        // Toggle Buttons
        $('.toggle-btn').click(function() {
            $('.toggle-btn').removeClass('active');
            $(this).addClass('active');
            const toggle = $(this).data('toggle');
            if (toggle === 'fasting') {
                alert('उपवास के दिन जल्द ही आ रहा है');
            }
        });

        // Navigation
        $('#prevMonth, #nextMonth').click(function() {
            alert('महीना नेविगेशन जल्द ही आ रहा है');
        });
    }

    // ========== MUHURAT PAGE ==========

    function renderMuhurtPage() {
        const html = `
            <div class="muhurat-header">
                <button class="back-btn"><i class="fas fa-arrow-left"></i></button>
                <h1 class="title has-text-white" style="font-size:1.2rem;margin:0;">शुभ मुहूर्त</h1>
                <i class="fas fa-share-nodes"></i>
            </div>

            <div class="calendar-nav">
                <button class="nav-arrow"><i class="fas fa-chevron-left"></i></button>
                <div class="month-display">अक्टूबर, 2025</div>
                <button class="nav-arrow"><i class="fas fa-chevron-right"></i></button>
            </div>

            <div class="muhurat-tabs">
                ${calendarData.muhurtData.categories.map((cat, idx) => `
                    <div class="muhurat-tab ${idx === 0 ? 'active' : ''}">${cat}</div>
                `).join('')}
            </div>

            <div class="muhurat-content" style="padding-bottom:2rem;">
                <div style="text-align:center;padding:1rem 0;color:#7a7a7a;font-size:0.9rem;">
                    2 October, Thursday
                </div>

                ${calendarData.muhurtData.events.map(event => `
                    <div class="muhurat-card">
                        <div class="muhurat-badge">
                            <i class="fas ${event.icon}"></i>
                            <span>${event.type}</span>
                        </div>

                        <div class="muhurat-time">
                            <div class="time-box">
                                <div class="time-label">From</div>
                                <div class="time-value-large">${event.from}</div>
                            </div>
                            <div class="time-box">
                                <div class="time-label">To</div>
                                <div class="time-value-large">${event.to}</div>
                            </div>
                        </div>

                        <div class="muhurat-tags">
                            ${event.tags.map(tag => `
                                <div class="muhurat-tag">
                                    <i class="fas fa-star"></i>
                                    <span>${tag}</span>
                                </div>
                            `).join('')}
                        </div>

                        <div class="muhurat-tags" style="margin-top:0.5rem;">
                            <div class="muhurat-tag">
                                <i class="fas fa-clock"></i>
                                <span>Dashami</span>
                            </div>
                            <div class="muhurat-tag">
                                <i class="fas fa-clock"></i>
                                <span>Ekadashi</span>
                            </div>
                        </div>
                    </div>

                    <div style="text-align:center;padding:1rem 0;color:#7a7a7a;font-size:0.9rem;">
                        3 October, Friday
                    </div>
                `).join('')}
            </div>
        `;

        $('#muhurtPage').html(html);

        // Muhurat Tab Switching
        $('.muhurat-tab').click(function() {
            $('.muhurat-tab').removeClass('active');
            $(this).addClass('active');
            alert('श्रेणी बदलें: ' + $(this).text());
        });
    }

    // ========== SEARCH ==========

    $('#clearSearch').click(function() {
        $('#searchInput').val('');
    });

    $('#searchInput').on('input', function() {
        const query = $(this).val();
        if (query.length > 0) {
            // Simulate search
            $('.search-results').html('<p class="has-text-centered">खोज रहा है...</p>');
        } else {
            $('.search-results').html('<p class="has-text-centered has-text-grey">पोस्ट उपलब्ध नहीं हैं</p>');
        }
    });

    // ========== MENU ITEMS ==========

    $('.menu-item').click(function() {
        const menuText = $(this).find('span').first().text();
        alert('मेनू आइटम: ' + menuText);
    });

    // ========== PLUS OPTIONS ==========

    $('.plus-option').click(function() {
        const action = $(this).data('action');
        alert('विकल्प चयनित: ' + $(this).find('span').text());
    });

    // ========== INITIALIZE ==========

    function initializeApp() {
        renderHomePage();

        // Set current date in header
        const today = new Date();
        console.log('भारत कैलेंडर ऐप लोड किया गया');
    }

    // Disable pull-to-refresh on mobile
    $(document).on('touchmove', function(e) {
        if ($(window).scrollTop() === 0) {
            // Allow only if not at top
        }
    });

    // Prevent zoom on mobile
    $(document).on('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    });

    // Shopping Cart
    $('#cartBtn').click(function() {
        alert('शॉपिंग कार्ट जल्द ही आ रहा है');
    });
});
