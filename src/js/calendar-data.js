// Calendar Data from Thakur Prasad Calendar October 2025
const calendarData = {
    month: 'अक्टूबर 2025',
    monthEnglish: 'October 2025',
    hindiMonth: 'आश्विन - कार्तिक',

    // October 2025 Calendar Data
    dates: [
        // Week 1
        { date: '', day: '', empty: true },
        { date: '', day: '', empty: true },
        { date: '', day: '', empty: true },
        { date: 1, day: 'बुध', tithi: 'द्वितीया', time: '07:01 तक', nakshatra: 'उत्तरा फाल्गुनी', event: '' },
        { date: 2, day: 'गुरु', tithi: 'तृतीया', time: '07:10 तक', nakshatra: 'हस्त', event: '' },
        { date: 3, day: 'शुक्र', tithi: 'चतुर्थी', time: '06:32 तक', nakshatra: 'चित्रा', event: '' },
        { date: 4, day: 'शनि', tithi: 'पञ्चमी', time: '05:09 तक', nakshatra: 'स्वाति', event: '' },

        // Week 2
        { date: 5, day: 'रवि', tithi: 'षष्टमी', time: '03:03 तक', nakshatra: 'विशाखा', event: 'रवि विवाह' },
        { date: 6, day: 'सोम', tithi: 'सप्तमी', time: '12:23 तक', nakshatra: 'अनुराधा', event: 'शीतल सप्तमी' },
        { date: 7, day: 'मंगल', tithi: 'अष्टमी', time: '09:48 तक', nakshatra: 'ज्येष्ठा', event: 'दुर्गा अष्टमी' },
        { date: 8, day: 'बुध', tithi: 'नवमी', time: '02:22 तक', nakshatra: 'मूल', event: 'महा नवमी' },
        { date: 9, day: 'गुरु', tithi: 'दशमी', time: '10:54 तक', nakshatra: 'पूर्वाषाढ़ा', event: 'विजयदशमी, दशहरा' },
        { date: 10, day: 'शुक्र', tithi: 'एकादशी', time: '07:38 तक', nakshatra: 'उत्तराषाढ़ा', event: 'पापांकुशा एकादशी' },
        { date: 11, day: 'शनि', tithi: 'द्वादशी', time: '04:43 तक', nakshatra: 'श्रवण', event: '' },

        // Week 3
        { date: 12, day: 'रवि', tithi: 'त्रयोदशी', time: '02:16 तक', nakshatra: 'धनिष्ठा', event: 'प्रदोष व्रत' },
        { date: 13, day: 'सोम', tithi: 'चतुर्दशी', time: '12:44 तक', nakshatra: 'शतभिषा', event: 'मासिक शिवरात्रि' },
        { date: 14, day: 'मंगल', tithi: 'अमावस्या', time: '11:09 तक', nakshatra: 'पूर्वाभाद्रपद', event: 'सर्व पितृ अमावस्या' },
        { date: 15, day: 'बुध', tithi: 'प्रतिपदा', time: '05:54 तक', nakshatra: 'उत्तराभाद्रपद', event: '' },
        { date: 16, day: 'गुरु', tithi: 'द्वितीया', time: '10:33 तक', nakshatra: 'रेवती', event: '' },
        { date: 17, day: 'शुक्र', tithi: 'तृतीया', time: '11:12 तक', nakshatra: 'अश्विनी', event: 'करवा चौथ' },
        { date: 18, day: 'शनि', tithi: 'चतुर्थी', time: '12:18 तक', nakshatra: 'भरणी', event: '' },

        // Week 4
        { date: 19, day: 'रवि', tithi: 'पञ्चमी', time: '01:51 तक', nakshatra: 'कृतिका', event: 'उपांग लाल लहटा' },
        { date: 20, day: 'सोम', tithi: 'षष्टमी', time: '03:44 तक', nakshatra: 'रोहिणी', event: 'षष्ठी पूजा' },
        { date: 21, day: 'मंगल', tithi: 'सप्तमी', time: '05:54 तक', nakshatra: 'मृगशिरा', event: '' },
        { date: 22, day: 'बुध', tithi: 'अष्टमी', time: '08:16 तक', nakshatra: 'आर्द्रा', event: '' },
        { date: 23, day: 'गुरु', tithi: 'नवमी', time: '10:48 तक', nakshatra: 'पुनर्वसु', event: '' },
        { date: 24, day: 'शुक्र', tithi: 'दशमी', time: '01:26 तक', nakshatra: 'पुष्य', event: 'छठ पूजा' },
        { date: 25, day: 'शनि', tithi: 'एकादशी', time: '04:14 तक', nakshatra: 'आश्लेषा', event: '' },

        // Week 5
        { date: 26, day: 'रवि', tithi: 'द्वादशी', time: '06:04 तक', nakshatra: 'मघा', event: 'होश पंचमी' },
        { date: 27, day: 'सोम', tithi: 'त्रयोदशी', time: '07:03 तक', nakshatra: 'पूर्वा फाल्गुनी', event: 'शूर सातालस' },
        { date: 28, day: 'मंगल', tithi: 'चतुर्दशी', time: '07:58 तक', nakshatra: 'उत्तरा फाल्गुनी', event: '' },
        { date: 29, day: 'बुध', tithi: 'पूर्णिमा', time: '09:23 तक', nakshatra: 'हस्त', event: 'शरद पूर्णिमा' },
        { date: 30, day: 'गुरु', tithi: 'प्रतिपदा', time: '10:06 तक', nakshatra: 'चित्रा', event: 'गोपाष्टमी', today: true },
        { date: 31, day: 'शुक्र', tithi: 'द्वितीया', time: '10:05 तक', nakshatra: 'स्वाति', event: 'अष्टमी पंचमी' }
    ],

    // Festivals and Holidays
    festivals: [
        { date: 5, name: 'रवि विवाह', type: 'धार्मिक' },
        { date: 6, name: 'शीतल सप्तमी', type: 'धार्मिक' },
        { date: 7, name: 'दुर्गा अष्टमी', type: 'प्रमुख' },
        { date: 8, name: 'महा नवमी', type: 'प्रमुख' },
        { date: 9, name: 'विजयदशमी (दशहरा)', type: 'राष्ट्रीय अवकाश' },
        { date: 10, name: 'पापांकुशा एकादशी', type: 'धार्मिक' },
        { date: 12, name: 'प्रदोष व्रत', type: 'धार्मिक' },
        { date: 13, name: 'मासिक शिवरात्रि', type: 'धार्मिक' },
        { date: 14, name: 'सर्व पितृ अमावस्या', type: 'धार्मिक' },
        { date: 17, name: 'करवा चौथ', type: 'प्रमुख' },
        { date: 19, name: 'उपांग लाल लहटा', type: 'धार्मिक' },
        { date: 20, name: 'षष्ठी पूजा', type: 'धार्मिक' },
        { date: 24, name: 'छठ पूजा', type: 'प्रमुख' },
        { date: 26, name: 'होश पंचमी', type: 'धार्मिक' },
        { date: 29, name: 'शरद पूर्णिमा', type: 'प्रमुख' },
        { date: 30, name: 'गोपाष्टमी', type: 'धार्मिक' },
        { date: 31, name: 'हैलोवीन', type: 'पश्चिमी' }
    ],

    // Panchang for October 30, 2025
    panchang: {
        date: '30 अक्टूबर, 2025 गुरुवार',
        dateEnglish: '30 October, 2025 Thursday',
        tithi: 'प्रतिपदा',
        tithiEnd: '10:06 ए एम तक, नवमी',
        nakshatra: 'चित्रा',
        nakshatraEnd: '06:33 पी एम तक, धनिष्ठा',
        yoga: 'विष्कम्भ',
        karana: 'बव',
        sunrise: '06:32 ए एम',
        sunset: '05:37 पी एम',
        moonrise: '07:15 पी एम',
        moonset: '08:30 ए एम',
        rahuKaal: '01:28 पी एम से 02:51 पी एम',
        gulikKaal: '09:18 ए एम से 10:41 ए एम',
        yamaghantaKaal: '07:46 ए एम से 09:18 ए एम',
        abhijitMuhurt: '11:47 ए एम से 12:34 पी एम',
        paksha: 'शुक्ल पक्ष',
        season: 'शरद ऋतु',
        festivals: ['गोपाष्टमी', 'मासिक दुर्गाष्टमी']
    },

    // Shubh Muhurat Categories
    muhurat: {
        categories: ['वाहन', 'संपत्ति', 'गृह प्रवेश', 'विवाह', 'नामकरण', 'अन्य'],
        vehicle: [
            { date: '2 अक्टूबर, गुरुवार', from: '09:13 AM', to: '06:15 AM', tags: ['श्रवण', 'दशमी', 'एकादशी'] },
            { date: '3 अक्टूबर, शुक्रवार', from: '06:15 AM', to: '06:32 PM', tags: ['श्रवण', 'धनिष्ठा', 'एकादशी'] }
        ],
        property: [
            { date: '5 अक्टूबर, रविवार', from: '06:32 AM', to: '05:37 PM', tags: ['विशाखा', 'षष्ठमी'] }
        ],
        grihPravesh: [
            { date: '10 अक्टूबर, शुक्रवार', from: '07:00 AM', to: '09:00 AM', tags: ['उत्तराषाढ़ा', 'एकादशी'] }
        ],
        vivah: [
            { date: '16 अक्टूबर, गुरुवार', from: '10:00 AM', to: '02:00 PM', tags: ['रेवती', 'द्वितीया'] },
            { date: '23 अक्टूबर, गुरुवार', from: '11:00 AM', to: '03:00 PM', tags: ['पुनर्वसु', 'नवमी'] }
        ],
        namkaran: [
            { date: '15 अक्टूबर, बुधवार', from: '08:00 AM', to: '11:00 AM', tags: ['उत्तराभाद्रपद', 'प्रतिपदा'] },
            { date: '22 अक्टूबर, बुधवार', from: '09:00 AM', to: '12:00 PM', tags: ['आर्द्रा', 'अष्टमी'] }
        ]
    },

    // Rashifal (Horoscopes)
    rashifal: [
        { name: 'मेष', sign: 'aries', prediction: 'आज का दिन आपके लिए शुभ रहेगा। व्यापार में लाभ।' },
        { name: 'वृष', sign: 'taurus', prediction: 'धन लाभ के योग। परिवार में खुशी।' },
        { name: 'मिथुन', sign: 'gemini', prediction: 'नए अवसर मिलेंगे। सावधानी बरतें।' },
        { name: 'कर्क', sign: 'cancer', prediction: 'स्वास्थ्य का ध्यान रखें। शुभ समाचार।' },
        { name: 'सिंह', sign: 'leo', prediction: 'करियर में तरक्की। मेहनत रंग लाएगी।' },
        { name: 'कन्या', sign: 'virgo', prediction: 'मित्रों का साथ मिलेगा। खर्च नियंत्रित रखें।' },
        { name: 'तुला', sign: 'libra', prediction: 'प्रेम जीवन में मधुरता। व्यापार शुभ।' },
        { name: 'वृश्चिक', sign: 'scorpio', prediction: 'संतान सुख। धार्मिक कार्यों में रुचि।' },
        { name: 'धनु', sign: 'sagittarius', prediction: 'यात्रा योग। नए संबंध बनेंगे।' },
        { name: 'मकर', sign: 'capricorn', prediction: 'कार्यक्षेत्र में सफलता। धैर्य रखें।' },
        { name: 'कुम्भ', sign: 'aquarius', prediction: 'आर्थिक लाभ। परिवार सहयोग करेगा।' },
        { name: 'मीन', sign: 'pisces', prediction: 'मानसिक शांति। भाग्य साथ देगा।' }
    ],

    // Aarti and Bhajans
    aartiBhajan: [
        { name: 'शुभ प्रभात', type: 'सुप्रभातम', deity: 'सामान्य' },
        { name: 'हनुमान चालीसा', type: 'चालीसा', deity: 'हनुमान जी' },
        { name: 'गणेश आरती', type: 'आरती', deity: 'गणेश जी' },
        { name: 'लक्ष्मी आरती', type: 'आरती', deity: 'लक्ष्मी जी' },
        { name: 'विष्णु आरती', type: 'आरती', deity: 'विष्णु जी' },
        { name: 'शिव आरती', type: 'आरती', deity: 'शिव जी' },
        { name: 'दुर्गा आरती', type: 'आरती', deity: 'दुर्गा जी' },
        { name: 'सरस्वती वंदना', type: 'वंदना', deity: 'सरस्वती जी' }
    ]
};
