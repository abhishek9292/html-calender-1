# भारत कैलेंडर - Complete Multi-Page Hindi Calendar Application

A comprehensive mobile-first Hindi calendar application with multiple pages and complete navigation system.

## 📁 Project Structure

```
hindi-calender/
├── src/
│   ├── index.html              # Home page
│   ├── calendar.html           # Calendar view page
│   ├── shubh-muhurat.html      # Auspicious timings page
│   ├── search.html             # Search page
│   ├── music.html              # Aarti & Bhajan page
│   ├── tyohaar.html            # Festivals page
│   ├── chuttiyaan.html         # Holidays page
│   ├── kundali.html            # Horoscope/Rashifal page
│   ├── ayojan.html             # Events/Planning page
│   ├── event.html              # Event creation page
│   ├── language.html           # Language selection page
│   ├── css/
│   │   └── styles.css          # Shared styles (159 lines)
│   └── js/
│       ├── routes.js           # Navigation system
│       ├── calendar-data.js    # Calendar data from PDF
│       └── home.js             # Home page logic
├── Calender-ui/                # UI mockup images (29 files)
├── thakur-prasad-calendar-2025-October.pdf
└── README.md
```

## ✨ Features Implemented

### Pages (11 Complete Pages)

1. **🏠 Home Page (index.html)**
   - Feature icons navigation
   - Week calendar view
   - Today's Panchang card
   - Trending status section
   - Rashifal preview

2. **📅 Calendar Page (calendar.html)**
   - Monthly grid view
   - Day tabs
   - Hindi dates (Tithi)
   - Festivals and events
   - Holidays toggle
   - Fasting days toggle

3. **🕉️ Shubh Muhurat Page (shubh-muhurat.html)**
   - Category tabs (वाहन, संपत्ति, गृह प्रवेश, विवाह, नामकरण, अन्य)
   - Auspicious timings
   - Date navigation
   - Detailed muhurat cards

4. **🔍 Search Page (search.html)**
   - Search input with clear button
   - Tabs (लोग, इवेंट्स)
   - Results display

5. **🎵 Music/Aarti Page (music.html)**
   - Aarti list
   - Bhajan categories
   - Mantras
   - Chalisa
   - Play functionality

6. **⭐ Festivals Page (tyohaar.html)**
   - All festivals for October 2025
   - Festival types
   - Date-wise listing
   - Detailed festival info

7. **🏖️ Holidays Page (chuttiyaan.html)**
   - National holidays
   - State holidays
   - Bank holidays
   - School holidays
   - Date badges

8. **🔮 Kundali/Rashifal Page (kundali.html)**
   - 12 Rashis grid
   - Daily predictions
   - Weekly/Monthly/Yearly tabs
   - Detailed horoscopes

9. **📋 Ayojan/Events Page (ayojan.html)**
   - User events listing
   - Upcoming/Completed tabs
   - Empty state with CTA
   - Navigation to event creation

10. **➕ Event Creation Page (event.html)**
    - Event name input
    - Date & time picker
    - Location field
    - Description textarea
    - Category selector
    - Reminder checkbox

11. **🌐 Language Selection Page (language.html)**
    - 10 Indian languages
    - Visual selection
    - Selected state indicator

### Navigation System

- **Bottom Navigation**: 5 tabs (होम, कैलेंडर, +, म्यूजिक, आयोजन)
- **Sidebar Menu**: Hamburger menu with all options
- **Routes System**: Centralized navigation management (routes.js)
- **Back Navigation**: Consistent back button on all pages
- **Feature Icons**: Quick access from home page

### Components

- **Header**: Brand logo, icons (shop, search, language, share, menu)
- **Sidebar**: Menu drawer with ads, guest login, options
- **Plus Button Modal**: Quick actions (छुट्टियां, नोट्स, चेक लिस्ट, इवेंट्स, सामाजिक)
- **Bottom Navigation**: Persistent navigation with center FAB
- **Shopping Cart FAB**: Floating action button

## 📊 Data Source

All calendar data extracted from **Thakur Prasad Calendar 2025 October** PDF:
- Dates with Hindi Tithi
- Nakshatra information
- Festivals and events
- Panchang details
- Auspicious timings (Muhurat)
- Rashifal predictions

### October 2025 Data Included

- 31 days with complete Tithi information
- 17+ festivals marked
- Sunrise/Sunset times
- Rahu Kaal & Gulik Kaal
- Moon phases
- All major Hindu festivals (Dussehra, Karva Chauth, Chhath Puja, Sharad Purnima, etc.)

## 🎨 Design Features

- **Mobile-First**: Optimized for mobile screens (375px)
- **Hindi Language**: Complete Hindi (Devanagari) interface
- **Color Scheme**: Red (#f14668) primary, custom colors
- **Responsive**: Works on all mobile devices
- **Touch-Optimized**: Large tap targets, smooth animations
- **Modern UI**: Clean, minimal design

## 🚀 How to Run

### Option 1: Direct Open
```bash
cd src
# Open index.html in browser
```

### Option 2: Local Server
```bash
cd src
python -m http.server 8000
# Visit http://localhost:8000
```

### Option 3: Live Server (VS Code)
1. Install "Live Server" extension
2. Right-click `src/index.html`
3. Select "Open with Live Server"

## 🔗 Navigation Flow

```
Home (index.html)
  ├─→ Calendar (calendar.html)
  ├─→ Shubh Muhurat (shubh-muhurat.html)
  ├─→ Festivals (tyohaar.html)
  ├─→ Holidays (chuttiyaan.html)
  ├─→ Kundali (kundali.html)
  ├─→ Music (music.html)
  ├─→ Ayojan (ayojan.html)
  │    └─→ Event (event.html)
  ├─→ Search (search.html)
  └─→ Language (language.html)
```

## 💻 Technology Stack

- **HTML5**: Semantic markup
- **Bulma CSS**: Responsive framework
- **Font Awesome 6**: Icon library
- **jQuery 3.7**: DOM manipulation & AJAX
- **Vanilla JavaScript**: Navigation & routing

## 📏 Code Statistics

Total files: **14 HTML + 3 JS + 1 CSS = 18 files**

| File | Lines | Purpose |
|------|-------|---------|
| index.html | ~146 | Home page |
| calendar.html | ~95 | Calendar view |
| shubh-muhurat.html | ~80 | Muhurat page |
| search.html | ~50 | Search page |
| music.html | ~70 | Music/Aarti |
| tyohaar.html | ~75 | Festivals |
| chuttiyaan.html | ~65 | Holidays |
| kundali.html | ~75 | Horoscope |
| ayojan.html | ~60 | Events list |
| event.html | ~95 | Event form |
| language.html | ~70 | Language selector |
| routes.js | ~30 | Navigation |
| calendar-data.js | ~200 | Calendar data |
| home.js | ~90 | Home logic |
| styles.css | ~159 | Shared styles |

**Total: ~1,360 lines** (well within limits)

## 🎯 Key Features

### 1. Multi-Page Architecture
- Separate HTML files for each page
- Centralized navigation system
- Shared styles and scripts
- Efficient routing

### 2. Complete Navigation
- Bottom navigation bar
- Sidebar menu
- Back buttons
- Feature icon navigation
- Plus button modal

### 3. Rich Data
- Complete October 2025 calendar
- All festivals and holidays
- Panchang information
- Muhurat timings
- Rashifal predictions

### 4. User Features
- Event creation
- Language selection
- Search functionality
- Music player
- Festival details

## 📱 Mobile Optimization

- Viewport configured for mobile
- Touch-friendly buttons
- Swipeable elements
- Mobile-first design
- Responsive grids
- Bottom navigation
- FAB buttons

## 🔮 Future Enhancements

- Backend integration
- User authentication
- Local storage
- Push notifications
- Offline mode
- PWA support
- More languages
- Voice search
- PDF export
- Share functionality

## 📝 Notes

- All pages interconnected via routes.js
- Data extracted from Thakur Prasad Calendar PDF
- Fully mobile responsive
- Hindi language throughout
- Modular architecture
- Easy to extend

## 🙏 Credits

- **Calendar Data**: Thakur Prasad Calendar 2025
- **Design**: Based on UI mockups in `Calender-ui/`
- **Icons**: Font Awesome
- **Framework**: Bulma CSS
- **Library**: jQuery

## 📄 License

Educational/Demo Project

---

**Made with ❤️ for Hindi Calendar Users**

Navigate between pages using bottom navigation or feature icons!
