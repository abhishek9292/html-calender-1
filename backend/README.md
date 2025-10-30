# भारत कैलेंडर - Python Flask Backend

Flask-based REST API backend for Hindi Calendar Application.

## 📋 Requirements

- Python 3.8+
- Flask
- Flask-CORS

## 🚀 Installation

```bash
# Install dependencies
pip install -r requirements.txt
```

## ▶️ Run Server

```bash
python app.py
```

Server will start at `http://localhost:5000`

## 📡 API Endpoints

### Panchang

-**GET /api/panchang/{date}**
  - Get Panchang data for specific date
  - Example: `/api/panchang/2025-10-30`

### Calendar

- **GET /api/calendar/{year}/{month}**
  - Get complete month calendar
  - Example: `/api/calendar/2025/10`

### Festivals

- **GET /api/festivals/{year}/{month}**
  - Get all festivals for a month
  - Example: `/api/festivals/2025/10`

### Shubh Muhurat

- **GET /api/muhurat/{year}/{month}**
  - Get auspicious timings
  - Example: `/api/muhurat/2025/10`

### Rashifal (Horoscope)

- **GET /api/rashifal/{date}**
  - Get horoscope for all signs
  - Example: `/api/rashifal/2025-10-30`

### Vrat (Fasting)

- **GET /api/vrat/{year}/{month}**
  - Get fasting days
  - Example: `/api/vrat/2025/10`

### Today's Data

- **GET /api/today**
  - Get complete data for today

## 📂 Data Directory Structure

```
backend/data/
├── panchang_2025-10-30.json
├── calendar_2025_10.json
├── festivals_2025_10.json
├── muhurat_2025_10.json
├── rashifal_2025-10-30.json
└── vrat_2025_10.json
```

## 🔗 Frontend Integration

Update frontend to use API:

```javascript
// In your JS files
const API_BASE = 'http://localhost:5000/api';

// Get today's panchang
fetch(`${API_BASE}/today`)
    .then(res => res.json())
    .then(data => console.log(data));
```

## 📝 Notes

- All data files are in JSON format with UTF-8 encoding
- Hindi text is fully supported
- CORS is enabled for frontend access
