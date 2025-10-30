# 🤖 AI Guide: Hindi Calendar PDF Data Extraction

## 📋 Purpose

This guide helps AI systems (Claude, ChatGPT, etc.) extract data from **Thakur Prasad Calendar PDFs** or similar Hindi calendar PDFs to populate the भारत कैलेंडर application.

---

## 📁 Target PDF Format

**Source**: Thakur Prasad Calendar PDF (Monthly format)
**Language**: Hindi (Devanagari script)
**Example**: `thakur-prasad-calendar-2025-October.pdf`

---

## 🎯 Data Sections to Extract

### 1. **Daily Panchang Data** (प्रतिदिन पंचांग)

Extract for EACH day of the month:

#### Required Fields:

```json
{
  "date": 30,
  "day": "गुरु",  // Day of week
  "month": "अक्टूबर",
  "year": 2025,
  "tithi": "प्रतिपदा",  // Lunar day
  "tithiEnd": "10:06 ए एम तक, नवमी",
  "nakshatra": "चित्रा",  // Star/constellation
  "nakshatraEnd": "06:33 पी एम तक, धनिष्ठा",
  "yoga": "विष्कम्भ",
  "karana": "बव",
  "paksha": "शुक्ल पक्ष",  // Lunar fortnight (शुक्ल/कृष्ण)
  "sunrise": "06:32 ए एम",
  "sunset": "05:37 पी एम",
  "moonrise": "07:15 पी एम",
  "moonset": "08:30 ए एम",
  "rahuKaal": "01:28 पी एम से 02:51 पी एम",
  "gulikKaal": "09:18 ए एम से 10:41 ए एम",
  "yamaghantaKaal": "07:46 ए एम से 09:18 ए एम",
  "abhijitMuhurt": "11:47 ए एम से 12:34 पी एम",
  "season": "शरद ऋतु",
  "festivals": ["गोपाष्टमी", "मासिक दुर्गाष्टमी"],
  "vrat": []  // Fasting days if any
}
```

#### Extraction Logic:

1. **Date & Day**: Look for large numbers (1-31) with day names (रवि, सोम, मंगल, बुध, गुरु, शुक्र, शनि)
2. **Tithi**: Look for terms like द्वितीया, तृतीया, चतुर्थी, पंचमी, षष्ठी, सप्तमी, अष्टमी, नवमी, दशमी, एकादशी, द्वादशी, त्रयोदशी, चतुर्दशी, पूर्णिमा, प्रतिपदा
3. **Nakshatra**: 27 nakshatras - अश्विनी, भरणी, कृतिका, रोहिणी, मृगशिरा, आर्द्रा, पुनर्वसु, पुष्य, आश्लेषा, मघा, पूर्वा फाल्गुनी, उत्तरा फाल्गुनी, हस्त, चित्रा, स्वाति, विशाखा, अनुराधा, ज्येष्ठा, मूल, पूर्वाषाढ़ा, उत्तराषाढ़ा, श्रवण, धनिष्ठा, शतभिषा, पूर्वाभाद्रपद, उत्तराभाद्रपद, रेवती
4. **Times**: Look for patterns like "XX:XX ए एम", "XX:XX पी एम", "XX:XX तक", "XX:XX से"

---

### 2. **Monthly Calendar Grid** (मासिक कैलेंडर)

Create a complete month view:

```json
{
  "month": "अक्टूबर 2025",
  "hindiMonth": "आश्विन - कार्तिक",
  "dates": [
    { "date": "",  "empty": true },  // Empty cells for alignment
    { "date": "",  "empty": true },
    { "date": "",  "empty": true },
    {
      "date": 1,
      "day": "बुध",
      "tithi": "द्वितीया",
      "time": "07:01 तक",
      "nakshatra": "उत्तरा फाल्गुनी",
      "event": "",
      "today": false,
      "holiday": false
    },
    // ... continue for all 31 days
  ]
}
```

---

### 3. **Festivals & Events** (त्योहार और विशेष दिन)

Extract ALL festivals mentioned:

```json
{
  "festivals": [
    {
      "date": 5,
      "name": "रवि विवाह",
      "type": "धार्मिक",  // धार्मिक, राष्ट्रीय अवकाश, प्रमुख, पश्चिमी
      "description": "Sun God marriage ceremony",
      "importance": "medium"  // low, medium, high
    },
    {
      "date": 9,
      "name": "विजयदशमी (दशहरा)",
      "type": "राष्ट्रीय अवकाश",
      "description": "Victory of good over evil",
      "importance": "high"
    }
    // ... all festivals
  ]
}
```

#### Common Festival Terms:

- रवि विवाह, शीतल सप्तमी, दुर्गा अष्टमी, महा नवमी, विजयदशमी, दशहरा
- एकादशी, प्रदोष व्रत, शिवरात्रि, अमावस्या, पूर्णिमा
- करवा चौथ, छठ पूजा, गोपाष्टमी, शरद पूर्णिमा
- दिवाली, होली, गणेश चतुर्थी, जन्माष्टमी, etc.

---

### 4. **Shubh Muhurat** (शुभ मुहूर्त)

Extract auspicious timings for various activities:

```json
{
  "muhurat": {
    "vehicle": [  // वाहन खरीदी
      {
        "date": "2 अक्टूबर, गुरुवार",
        "from": "09:13 AM",
        "to": "06:15 AM",
        "tags": ["श्रवण", "दशमी", "एकादशी"],
        "notes": ""
      }
    ],
    "property": [],  // संपत्ति
    "grihPravesh": [],  // गृह प्रवेश
    "vivah": [],  // विवाह
    "namkaran": [],  // नामकरण
    "other": []  // अन्य
  }
}
```

#### Muhurat Categories to Look For:

1. **वाहन खरीदी** (Vehicle buying)
2. **संपत्ति खरीदी** (Property purchase)
3. **गृह प्रवेश** (Housewarming)
4. **विवाह** (Marriage)
5. **नामकरण** (Naming ceremony)
6. **मुंडन** (Head shaving ceremony)
7. **यज्ञोपवीत** (Sacred thread ceremony)
8. **व्यापार प्रारंभ** (Business start)

---

### 5. **Vrat/Upvas** (व्रत - उपवास)

Extract fasting days:

```json
{
  "vrat": [
    {
      "date": 10,
      "name": "पापांकुशा एकादशी",
      "type": "एकादशी व्रत",
      "rules": "निर्जला/फलाहार",  // Type of fasting
      "significance": "पाप नाशक",
      "specialPuja": "विष्णु पूजा"
    },
    {
      "date": 13,
      "name": "मासिक शिवरात्रि",
      "type": "शिवरात्रि",
      "rules": "रात्रि जागरण",
      "significance": "शिव आराधना",
      "specialPuja": "शिव पूजा"
    }
  ]
}
```

#### Common Vrat Types:

- एकादशी (11th day - twice a month)
- प्रदोष व्रत (13th day)
- शिवरात्रि (Monthly on Krishna Paksha Chaturdashi)
- पूर्णिमा व्रत
- संकष्टी चतुर्थी
- करवा चौथ
- नवरात्रि व्रत

---

### 6. **Rashifal** (राशिफल - Horoscope)

Extract horoscope for 12 zodiac signs:

```json
{
  "rashifal": [
    {
      "name": "मेष",
      "sign": "aries",
      "dailyPrediction": "आज का दिन आपके लिए शुभ रहेगा। व्यापार में लाभ।",
      "luckyNumber": 3,
      "luckyColor": "लाल",
      "luckyDirection": "पूर्व",
      "financialAdvice": "निवेश के लिए उचित समय",
      "healthAdvice": "स्वास्थ्य अच्छा रहेगा",
      "loveAdvice": "प्रेम जीवन में मधुरता"
    }
    // ... all 12 rashis
  ]
}
```

#### 12 Rashis (Zodiac Signs):

1. मेष (Aries)
2. वृष (Taurus)
3. मिथुन (Gemini)
4. कर्क (Cancer)
5. सिंह (Leo)
6. कन्या (Virgo)
7. तुला (Libra)
8. वृश्चिक (Scorpio)
9. धनु (Sagittarius)
10. मकर (Capricorn)
11. कुंभ (Aquarius)
12. मीन (Pisces)

---

### 7. **Taa-Vaar Vitran** (ता-वार वितरण)

Day-wise distribution and special information:

```json
{
  "dayWiseInfo": {
    "रवि": {  // Sunday
      "ruling Planet": "सूर्य",
      "color": "लाल",
      "deity": "सूर्य देव",
      "gemstone": "माणिक",
      "speciality": "पितृ कार्य शुभ"
    }
    // ... for all 7 days
  }
}
```

---

### 8. **Aakaashi Lakshan** (आकाशी लक्षण)

Astronomical/astrological signs:

```json
{
  "aakaashiLakshan": {
    "planetaryPositions": {
      "सूर्य": "तुला राशि",
      "चंद्र": "मीन राशि",
      // ... other planets
    },
    "weatherPredictions": "शरद ऋतु, सुखद मौसम",
    "agriculturalAdvice": "रबी की फसल की बुआई",
    "specialNotes": []
  }
}
```

---

## 🔍 Extraction Steps

### Step 1: PDF Text Extraction

```python
# Using PyPDF2 or pdfplumber
import pdfplumber

with pdfplumber.open("calendar.pdf") as pdf:
    for page in pdf.pages:
        text = page.extract_text()
        # Process text
```

### Step 2: Identify Sections

Look for section headers:
- **पंचांग** / **Panchang**
- **त्योहार** / **Festivals**
- **शुभ मुहूर्त** / **Shubh Muhurat**
- **राशिफल** / **Rashifal**
- **व्रत-त्योहार** / **Vrat-Tyohaar**

### Step 3: Parse Date Grid

1. Identify calendar grid (usually 7 columns × 5-6 rows)
2. Extract date numbers (1-31)
3. Extract associated info for each date
4. Handle empty cells for month alignment

### Step 4: Extract Timings

Regex patterns for Hindi times:
- `\d{1,2}:\d{2}\s*[ए|पी]\s*[एम|एम]`
- `\d{1,2}:\d{2}\s*तक`
- `\d{1,2}:\d{2}\s*से`

### Step 5: Map Hindi Terms

Create mapping dictionaries:

```python
DAYS = {
    "रवि": "Sunday",
    "सोम": "Monday",
    "मंगल": "Tuesday",
    "बुध": "Wednesday",
    "गुरु": "Thursday",
    "शुक्र": "Friday",
    "शनि": "Saturday"
}

TITHIS = [
    "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी",
    "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी",
    "नवमी", "दशमी", "एकादशी", "द्वादशी",
    "त्रयोदशी", "चतुर्दशी", "पूर्णिमा/अमावस्या"
]
```

---

## 📝 Output Format

### Directory Structure:

```
backend/data/
├── calendar_2025_10.json      # Complete month calendar
├── panchang_2025-10-30.json   # Daily panchang
├── festivals_2025_10.json     # All festivals
├── muhurat_2025_10.json        # Auspicious timings
├── rashifal_2025-10-30.json   # Daily horoscope
├── vrat_2025_10.json          # Fasting days
└── aakaashi_2025_10.json      # Astronomical data
```

### File Naming Convention:

- **Calendar**: `calendar_{YYYY}_{MM}.json`
- **Panchang**: `panchang_{YYYY}-{MM}-{DD}.json`
- **Festivals**: `festivals_{YYYY}_{MM}.json`
- **Muhurat**: `muhurat_{YYYY}_{MM}.json`
- **Rashifal**: `rashifal_{YYYY}-{MM}-{DD}.json`
- **Vrat**: `vrat_{YYYY}_{MM}.json`

---

## ✅ Validation Checklist

Before finalizing extracted data, verify:

- [ ] All 30/31 days have complete data
- [ ] No empty required fields
- [ ] Date numbers are sequential
- [ ] Day names match actual calendar
- [ ] Hindi text is properly encoded (UTF-8)
- [ ] Time formats are consistent
- [ ] All festivals are captured
- [ ] Muhurat timings are accurate
- [ ] JSON is valid (use jsonlint.com)

---

## 🎯 Example: Complete October 30, 2025 Data

```json
{
  "date": "2025-10-30",
  "day": "गुरु",
  "dayEnglish": "Thursday",
  "panchang": {
    "tithi": "प्रतिपदा",
    "tithiEnd": "10:06 ए एम तक, नवमी",
    "nakshatra": "चित्रा",
    "nakshatraEnd": "06:33 पी एम तक, धनिष्ठा",
    "yoga": "विष्कम्भ",
    "karana": "बव",
    "paksha": "कृष्ण पक्ष",
    "sunrise": "06:32 ए एम",
    "sunset": "05:37 पी एम",
    "moonrise": "07:15 पी एम",
    "moonset": "08:30 ए एम",
    "rahuKaal": "01:28 पी एम से 02:51 पी एम",
    "gulikKaal": "09:18 ए एम से 10:41 ए एम",
    "yamaghantaKaal": "07:46 ए एम से 09:18 ए एम",
    "abhijitMuhurt": "11:47 ए एम से 12:34 पी एम",
    "season": "शरद ऋतु"
  },
  "festivals": [
    "गोपाष्टमी",
    "मासिक दुर्गाष्टमी"
  ],
  "vrat": [],
  "specialNotes": "कृष्ण पक्ष प्रतिपदा, शुभ दिन"
}
```

---

## 🔄 Monthly Data Generation Process

1. **Read PDF**: Extract text from Thakur Prasad Calendar PDF
2. **Parse Calendar Grid**: Get all 30/31 dates with info
3. **Extract Panchang**: For each date, extract complete panchang
4. **Identify Festivals**: Mark all festival dates
5. **Extract Muhurat**: Get auspicious timings by category
6. **Get Rashifal**: Extract horoscope for all 12 signs
7. **Extract Vrat**: Identify all fasting days
8. **Generate JSON**: Create separate JSON files
9. **Validate**: Check all data is complete and accurate
10. **Save**: Save to `backend/data/` directory

---

## 📚 Reference: Hindi Calendar Terms

### Months (मास):
- चैत्र (Chaitra) - March-April
- वैशाख (Vaishakha) - April-May
- ज्येष्ठ (Jyeshtha) - May-June
- आषाढ़ (Ashadha) - June-July
- श्रावण (Shravana) - July-August
- भाद्रपद (Bhadrapada) - August-September
- आश्विन (Ashwin) - September-October
- कार्तिक (Kartika) - October-November
- मार्गशीर्ष (Margashirsha) - November-December
- पौष (Pausha) - December-January
- माघ (Magha) - January-February
- फाल्गुन (Phalguna) - February-March

### Seasons (ऋतु):
- वसंत (Vasant) - Spring
- ग्रीष्म (Grishma) - Summer
- वर्षा (Varsha) - Monsoon
- शरद (Sharad) - Autumn
- हेमंत (Hemant) - Pre-winter
- शिशिर (Shishir) - Winter

---

## 🚀 Quick Start for AI

When given a Thakur Prasad Calendar PDF:

1. **Identify month and year** from PDF title
2. **Extract calendar grid** (dates 1-31)
3. **For each date**, extract:
   - Day name (रवि-शनि)
   - Tithi (lunar day)
   - Nakshatra
   - Timings
   - Events/festivals
4. **Create JSON files** in required format
5. **Validate** all data
6. **Save** to `backend/data/` folder

---

## 📞 Support

For questions about data format or extraction, refer to:
- `/backend/data/` - Example data files
- `/js/calendar-data.js` - Frontend data format
- This guide for complete specifications

---

**Last Updated**: October 2025
**Version**: 1.0
**Maintained for**: भारत कैलेंडर Application
