// Navigation Routes Configuration
const routes = {
    pages: {
        home: 'index.html',
        calendar: 'calendar.html',
        muhurat: 'shubh-muhurat.html',
        search: 'search.html',
        music: 'music.html',
        ayojan: 'ayojan.html',
        tyohaar: 'tyohaar.html',
        chuttiyaan: 'chuttiyaan.html',
        kundali: 'kundali.html',
        event: 'event.html',
        settings: 'settings.html',
        language: 'language.html'
    },

    navigate: function(page) {
        const path = this.pages[page];
        if (path) {
            window.location.href = path;
        } else {
            console.error('Page not found:', page);
        }
    },

    back: function() {
        window.history.back();
    },

    getCurrentPage: function() {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf('/') + 1);
        for (const [key, value] of Object.entries(this.pages)) {
            if (value === filename) return key;
        }
        return 'home';
    }
};

// Navigation Helper Functions
function navigateTo(page) {
    routes.navigate(page);
}

function goBack() {
    routes.back();
}

function setActiveNav(page) {
    $('.nav-item').removeClass('active');
    $(`.nav-item[data-page="${page}"]`).addClass('active');
}
