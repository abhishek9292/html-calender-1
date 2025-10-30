// Calendar Data
const calendarData = {
    currentDate: new Date(2025, 9, 30), // October 30, 2025

    weekDays: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],

    months: [
        'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
        'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
    ],

    weekCalendar: [
        { date: 26, day: 'रवि', hindi: 'अष्टमी', time: '06:04 से', event: 'होश पञ्चमी' },
        { date: 27, day: 'सोम', hindi: 'अष्टमी', time: '07:03 रात को', event: 'शूर सातालस' },
        { date: 28, day: 'मंगल', hindi: 'नवमी', time: '07:58 से', event: '' },
        { date: 29, day: 'बुध', hindi: 'दशमी', time: '09:23 से', event: 'जलाशय माघ जलेबी' },
        { date: 30, day: 'गुरु', hindi: 'ऐकादशी', time: '10:06 ए एम', event: 'गोपाष्टमी', active: true },
        { date: 31, day: 'शुक्र', hindi: 'ऐकादशी', time: '10:05 ए एम', event: 'अष्टमी पञ्चमी' },
        { date: 1, day: 'शनि', hindi: 'द्वादशी', time: '09:38 से', event: '' }
    ],

    panchangData: {
        date: '30 October, 2025 Thursday',
        amavasya: 'अमंगी - 10:06 ए एम तक, नवमी',
        shravana: 'श्रवण - 06:33 पी एम तक, धनिष्ठा',
        sunrise: '06:32 ए एम-05:37 पी एम',
        rahuKaal: '01:28 पी एम से 02:51 पी एम',
        gulikKaal: '09:18 ए एम से 10:41 ए एम',
        festivals: 'गोपाष्टमी, मासिक दुर्गाष्टमी',
        panchang: 'पंचांगो'
    },

    holidays: [
        { date: '01 बुधवार', name: 'महानवमी' },
        { date: '02 गुरुवार', name: 'दशहरा' },
        { date: '03 शुक्रवार', name: 'दशहरा (द्वितीय दिवस)' },
        { date: '31 गुरुवार', name: 'हैलोवीन' }
    ],

    monthCalendar: {
        month: 'अक्टूबर, 2025',
        monthSubtitle: 'आश्विन -कार्तिक',
        degree: 'अंक° 25',
        days: [
            { date: '', empty: true },
            { date: '', empty: true },
            { date: '', empty: true },
            { date: 1, hindi: 'द्वितीया', time: '07:01 से', event: 'महा नवमी' },
            { date: 2, hindi: 'तृतीया', time: '07:10 से', event: 'सरस्वती तिसड़ी' },
            { date: 3, hindi: 'चतुर्थी', time: '06:32 से', event: 'पापाङ्कुशा एकादशी' },
            { date: 4, hindi: 'पञ्चमी', time: '05:09 से', event: 'पापाङ्कुशा एकादशी' },
            { date: 5, hindi: 'षष्टमी', time: '03:03 से', event: 'होष पञ्चमी' },
            { date: 6, hindi: 'सप्तमी', time: '12:23 से' },
            { date: 7, hindi: 'अष्टमी', time: '09:48 से', event: 'इसा + Durga' },
            { date: 8, hindi: 'अष्टमी', time: '02:22 ए', event: 'आंश्विक सूर्य ग्रहण' },
            { date: 9, hindi: 'नवमी', time: '10:54 से', event: 'आंश पूर्ण' },
            { date: 10, hindi: 'दशमी', time: '07:38 से', event: 'कलज दाध' },
            { date: 11, hindi: 'ऐकादशी', time: '04:43 से', event: 'तीज' },
            { date: 12, hindi: 'द्वादशी', time: '02:16 पी तक', event: 'नवदुर्गा पञ्चमी' },
            { date: 13, hindi: 'त्रयोदशी', time: '12:44 से', event: 'माहें हानी' },
            { date: 14, hindi: 'चतुर्दशी', time: '11:09 से' },
            { date: 15, hindi: 'पूर्णिमा', time: '05:54 से', event: 'दुर्गा अष्टमसा' },
            { date: 16, hindi: 'प्रतिपदा', time: '10:33 से', event: 'गोवर्धन पूजा' },
            { date: 17, hindi: 'द्वितीया', time: '11:12 से', event: 'भैय्या दूज' },
            { date: 18, hindi: 'तृतीया', time: '12:18 से' },
            { date: 19, hindi: 'चतुर्थी', time: '01:51 से', event: 'करवा चौथी' },
            { date: 20, hindi: 'पञ्चमी', time: '03:44 से', event: 'लाहौरी पूजा' },
            { date: 21, hindi: 'षष्टमी', time: '05:54 से', event: 'दुर्गा अष्टमसा' },
            { date: 22, hindi: 'षष्टमी', time: '08:16 से', event: 'गोविद्धन पूजा' },
            { date: 23, hindi: 'सप्तमी', time: '10:48 से', event: 'भैया दूज' },
            { date: 24, hindi: 'अष्टमी', time: '07:01 से', event: 'मदन चतुर्दशी' },
            { date: 25, hindi: 'नवमी', time: '03:48 से', event: 'नागपुर डायरिया' },
            { date: 26, hindi: 'दशमी', time: '06:04 से', event: 'होष पञ्चमी' },
            { date: 27, hindi: 'अष्टमी', time: '07:03 रात को', event: 'शूर सातालस' },
            { date: 28, hindi: 'नवमी', time: '07:58 से' },
            { date: 29, hindi: 'दशमी', time: '09:23 से', event: 'जलाशय माघ जलेबी' },
            { date: 30, hindi: 'ऐकादशी', time: '10:06 ए एम', event: 'गोपाष्टमी', today: true },
            { date: 31, hindi: 'ऐकादशी', time: '10:05 ए एम', event: 'अष्टमी पञ्चमी' }
        ]
    },

    muhurtData: {
        categories: ['वाहन', 'संपत्ति', 'गृह प्रवेश', 'विवाह', 'नामकरण', 'अन्य'],
        events: [
            {
                date: '2 October, Thursday',
                type: 'VEHICLE BUYING',
                icon: 'fa-car',
                from: '09:13 AM • 02 OCT',
                to: '06:15 AM • 03 OCT',
                tags: ['Shravana', 'Dashami', 'Ekadashi']
            },
            {
                date: '3 October, Friday',
                type: 'VEHICLE BUYING',
                icon: 'fa-car',
                from: '06:15 AM • 03 OCT',
                to: '06:32 PM • 03 OCT',
                tags: ['Shravana', 'Dhanishtha', 'Ekadashi']
            }
        ]
    },

    trendingGods: [
        { name: 'शुभ प्रभात', img: null },
        { name: 'उद्धरण', img: null },
        { name: 'हनुमान', img: null },
        { name: 'लक्ष्मी', img: null },
        { name: 'भगवान विष्णु', img: null },
        { name: 'Krishna', img: null }
    ],

    rashifal: [
        { name: 'मेष', sign: 'aries' },
        { name: 'वृष', sign: 'taurus' },
        { name: 'मिथुन', sign: 'gemini' },
        { name: 'कर्क', sign: 'cancer' },
        { name: 'सिंह', sign: 'leo' }
    ]
};
