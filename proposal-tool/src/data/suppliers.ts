export interface Supplier {
  id: string;
  name: string;
  type: 'distributor' | 'manufacturer' | 'both';
  location: { city: string; province: string };
  website: string;
  phone?: string;
  email?: string;
  brands: string[];
  products: ('panels' | 'inverters' | 'mounting' | 'cables' | 'monitoring' | 'batteries')[];
  priceRange: 'economy' | 'standard' | 'premium';
  minOrderUsd?: number;
  deliveryDays: string;
  paymentTerms: { en: string; he: string };
  strengths: { en: string[]; he: string[] };
  weaknesses: { en: string[]; he: string[] };
  tips: { en: string[]; he: string[] };
  rating: number;
  notes: { en: string; he: string };
}

export const suppliers: Supplier[] = [
  {
    id: 'enertik',
    name: 'Enertik',
    type: 'distributor',
    location: { city: 'Buenos Aires', province: 'Buenos Aires' },
    website: 'https://enertik.com.ar',
    phone: '+54 11 5263-2222',
    email: 'ventas@enertik.com.ar',
    brands: ['JinkoSolar', 'LONGi', 'Trina Solar', 'Canadian Solar', 'Fronius', 'Huawei', 'GoodWe', 'Growatt'],
    products: ['panels', 'inverters', 'mounting', 'cables', 'monitoring', 'batteries'],
    priceRange: 'premium',
    minOrderUsd: 500,
    deliveryDays: '10-15',
    paymentTerms: {
      en: 'Bank transfer, 50% upfront / 50% on delivery. Credit available for recurring clients.',
      he: 'העברה בנקאית, 50% מראש / 50% באספקה. אשראי זמין ללקוחות חוזרים.',
    },
    strengths: {
      en: [
        'Largest solar distributor in Argentina with nationwide coverage',
        'Excellent technical support team with certified engineers',
        'Wide product range covering all major brands and tiers',
        'Training programs and workshops for installers',
      ],
      he: [
        'המפיץ הסולארי הגדול בארגנטינה עם כיסוי ארצי',
        'צוות תמיכה טכנית מצוין עם מהנדסים מוסמכים',
        'מגוון מוצרים רחב המכסה את כל המותגים והרמות',
        'תוכניות הכשרה וסדנאות למתקינים',
      ],
    },
    weaknesses: {
      en: [
        'Premium pricing — not the cheapest option',
        'Lead times can extend to 20+ days during peak season',
        'Minimum order values may be high for small installers',
      ],
      he: [
        'תמחור פרימיום — לא האפשרות הזולה ביותר',
        'זמני אספקה עלולים להתארך ל-20+ ימים בעונת שיא',
        'ערכי הזמנה מינימליים עלולים להיות גבוהים למתקינים קטנים',
      ],
    },
    tips: {
      en: [
        'Ask about volume discount tiers — significant savings above 50 kWp orders',
        'Request access to their installer training program for priority support',
        'Check stock availability before quoting — some brands have 30-day lead times',
        'Negotiate payment terms after 3+ orders to build credit history',
      ],
      he: [
        'שאלו על מדרגות הנחות כמות — חיסכון משמעותי מעל הזמנות 50 קילוואט',
        'בקשו גישה לתוכנית ההכשרה למתקינים לתמיכה עדיפה',
        'בדקו זמינות מלאי לפני הצעת מחיר — למותגים מסוימים זמני אספקה של 30 יום',
        'נהלו משא ומתן על תנאי תשלום אחרי 3+ הזמנות לבניית היסטוריית אשראי',
      ],
    },
    rating: 4.5,
    notes: {
      en: 'Market leader in Argentina. Best choice for premium residential and commercial projects. Strong after-sales support.',
      he: 'מובילי שוק בארגנטינה. בחירה הטובה ביותר לפרויקטים פרימיום למגורים ומסחריים. תמיכה חזקה לאחר המכירה.',
    },
  },
  {
    id: 'fiasa',
    name: 'Fiasa',
    type: 'both',
    location: { city: 'Buenos Aires', province: 'Buenos Aires' },
    website: 'https://fiasa.com.ar',
    phone: '+54 11 4312-8800',
    email: 'info@fiasa.com.ar',
    brands: ['Fiasa (own)', 'JA Solar', 'Risen', 'Solis', 'Deye'],
    products: ['panels', 'inverters', 'mounting', 'cables'],
    priceRange: 'standard',
    minOrderUsd: 1000,
    deliveryDays: '7-12',
    paymentTerms: {
      en: 'Wire transfer or check. 30-day net for established accounts. Financing options for large orders.',
      he: 'העברה בנקאית או צ\'ק. נטו 30 יום לחשבונות מבוססים. אפשרויות מימון להזמנות גדולות.',
    },
    strengths: {
      en: [
        'Manufactures own mounting systems — competitive pricing and fast availability',
        'Long-established company with decades of industrial experience',
        'Good balance of quality and price in the standard segment',
        'Reliable delivery timelines with local warehouse stock',
      ],
      he: [
        'מייצרים מערכות הרכבה משלהם — תמחור תחרותי וזמינות מהירה',
        'חברה ותיקה עם עשרות שנות ניסיון תעשייתי',
        'איזון טוב בין איכות למחיר בסגמנט הסטנדרטי',
        'זמני אספקה אמינים עם מלאי מחסן מקומי',
      ],
    },
    weaknesses: {
      en: [
        'Smaller brand selection compared to Enertik',
        'Less specialized in solar — comes from general industrial background',
        'Technical support less focused on solar-specific issues',
      ],
      he: [
        'מבחר מותגים קטן יותר בהשוואה ל-Enertik',
        'פחות מתמחים בסולארי — רקע תעשייתי כללי',
        'תמיכה טכנית פחות ממוקדת בבעיות ספציפיות לסולארי',
      ],
    },
    tips: {
      en: [
        'Bundle mounting systems with panels for better overall pricing',
        'Ask about their industrial-grade mounting systems for commercial projects',
        'Visit their Buenos Aires warehouse to inspect mounting quality firsthand',
        'Request references from other solar installers using their products',
      ],
      he: [
        'שלבו מערכות הרכבה עם פאנלים לתמחור כולל טוב יותר',
        'שאלו על מערכות ההרכבה לדרג תעשייתי לפרויקטים מסחריים',
        'בקרו במחסן שלהם בבואנוס איירס לבדיקת איכות ההרכבה מקרוב',
        'בקשו המלצות ממתקינים סולאריים אחרים שמשתמשים במוצרים שלהם',
      ],
    },
    rating: 4.0,
    notes: {
      en: 'Solid choice for standard-tier projects. Own mounting system manufacturing is a unique advantage. Good for cost-conscious commercial installations.',
      he: 'בחירה מוצקה לפרויקטים ברמה סטנדרטית. ייצור מערכות הרכבה עצמאי הוא יתרון ייחודי. טוב להתקנות מסחריות מודעות עלויות.',
    },
  },
  {
    id: 'soluciones-renovables',
    name: 'Soluciones Renovables',
    type: 'distributor',
    location: { city: 'Buenos Aires', province: 'Buenos Aires' },
    website: 'https://solucionesrenovables.com.ar',
    phone: '+54 11 5032-7000',
    email: 'contacto@solucionesrenovables.com.ar',
    brands: ['Amerisolar', 'Luxen', 'DAH Solar', 'Growatt', 'Solis', 'Deye'],
    products: ['panels', 'inverters', 'mounting', 'cables', 'batteries'],
    priceRange: 'economy',
    minOrderUsd: 2000,
    deliveryDays: '12-20',
    paymentTerms: {
      en: '100% upfront for new clients. 50/50 split after 5+ orders. Cash discount available.',
      he: '100% מראש ללקוחות חדשים. חלוקה 50/50 אחרי 5+ הזמנות. הנחת מזומן זמינה.',
    },
    strengths: {
      en: [
        'Most competitive prices in the market for economy and standard tiers',
        'Strong relationships with Chinese manufacturers for direct importing',
        'Good stock levels on popular economy models',
      ],
      he: [
        'המחירים התחרותיים ביותר בשוק לרמות אקונומי וסטנדרט',
        'קשרים חזקים עם יצרנים סיניים לייבוא ישיר',
        'רמות מלאי טובות על דגמי אקונומי פופולריים',
      ],
    },
    weaknesses: {
      en: [
        'Higher minimum order quantities — not ideal for one-off residential jobs',
        'Technical support can be slow to respond',
        'Limited premium brand availability',
      ],
      he: [
        'כמויות הזמנה מינימליות גבוהות — לא אידיאלי לעבודות מגורים חד-פעמיות',
        'תמיכה טכנית עשויה להיות איטית בתגובה',
        'זמינות מוגבלת של מותגי פרימיום',
      ],
    },
    tips: {
      en: [
        'Pool orders with other installers to meet MOQ and get better prices',
        'Always inspect delivered goods carefully — economy brands need more QC attention',
        'Ask for COO (Certificate of Origin) documentation for customs verification',
        'Compare their Growatt prices with Enertik — sometimes competitive',
      ],
      he: [
        'אגדו הזמנות עם מתקינים אחרים כדי לעמוד ב-MOQ ולקבל מחירים טובים יותר',
        'בדקו תמיד את הסחורה שנמסרה בקפידה — מותגי אקונומי דורשים יותר בקרת איכות',
        'בקשו תיעוד COO (תעודת מקור) לאימות מכס',
        'השוו את מחירי Growatt שלהם עם Enertik — לפעמים תחרותיים',
      ],
    },
    rating: 3.5,
    notes: {
      en: 'Best for price-sensitive projects and bulk purchasing. Good entry point for new installers building a cost-competitive portfolio.',
      he: 'הטוב ביותר לפרויקטים רגישים למחיר ורכישות בכמויות. נקודת כניסה טובה למתקינים חדשים שבונים תיק עבודות תחרותי בעלויות.',
    },
  },
  {
    id: 'solarpool',
    name: 'SolarPool',
    type: 'distributor',
    location: { city: 'Online', province: 'Buenos Aires' },
    website: 'https://solarpool.com.ar',
    email: 'info@solarpool.com.ar',
    brands: ['JinkoSolar', 'Trina Solar', 'JA Solar', 'LONGi', 'Growatt', 'Solis', 'GoodWe', 'Fronius'],
    products: ['panels', 'inverters', 'mounting', 'cables', 'monitoring'],
    priceRange: 'standard',
    deliveryDays: '5-25',
    paymentTerms: {
      en: 'Online payment, bank transfer, or MercadoPago. Some items ship from international warehouses.',
      he: 'תשלום מקוון, העברה בנקאית, או MercadoPago. חלק מהפריטים נשלחים ממחסנים בינלאומיים.',
    },
    strengths: {
      en: [
        'Online marketplace with transparent pricing and wide catalog',
        'Competitive prices through multi-brand comparison shopping',
        'Convenient ordering process with shipping nationwide',
        'Good for comparing prices across multiple brands quickly',
      ],
      he: [
        'שוק מקוון עם תמחור שקוף וקטלוג רחב',
        'מחירים תחרותיים דרך השוואת קניות רב-מותגית',
        'תהליך הזמנה נוח עם משלוח ארצי',
        'טוב להשוואת מחירים בין מותגים מרובים במהירות',
      ],
    },
    weaknesses: {
      en: [
        'Variable delivery times — some items may take 3-4 weeks',
        'Limited technical support compared to dedicated distributors',
        'No physical showroom or warehouse visits possible',
      ],
      he: [
        'זמני אספקה משתנים — חלק מהפריטים עלולים לקחת 3-4 שבועות',
        'תמיכה טכנית מוגבלת בהשוואה למפיצים ייעודיים',
        'אין אולם תצוגה פיזי או אפשרות ביקור במחסן',
      ],
    },
    tips: {
      en: [
        'Use SolarPool for price benchmarking before negotiating with physical distributors',
        'Check delivery source — local stock ships faster than international',
        'Read reviews from other installers before buying unfamiliar brands',
        'Consider warranty claim logistics — online purchases may complicate returns',
      ],
      he: [
        'השתמשו ב-SolarPool כהשוואת מחירים לפני משא ומתן עם מפיצים פיזיים',
        'בדקו מקור משלוח — מלאי מקומי נשלח מהר יותר מבינלאומי',
        'קראו ביקורות ממתקינים אחרים לפני רכישת מותגים לא מוכרים',
        'שקלו לוגיסטיקת תביעות אחריות — רכישות מקוונות עלולות לסבך החזרות',
      ],
    },
    rating: 3.5,
    notes: {
      en: 'Useful as a price reference and for specific hard-to-find items. Best used alongside a primary physical distributor.',
      he: 'שימושי כייחוס מחירים ולפריטים ספציפיים שקשה למצוא. הכי טוב לשימוש לצד מפיץ פיזי ראשי.',
    },
  },
  {
    id: 'energia-verde',
    name: 'Energia Verde',
    type: 'distributor',
    location: { city: 'Cordoba', province: 'Cordoba' },
    website: 'https://energiaverde.com.ar',
    phone: '+54 351 456-7890',
    email: 'ventas@energiaverde.com.ar',
    brands: ['Canadian Solar', 'JA Solar', 'Risen', 'GoodWe', 'Growatt', 'Solis'],
    products: ['panels', 'inverters', 'mounting', 'cables', 'monitoring'],
    priceRange: 'standard',
    minOrderUsd: 800,
    deliveryDays: '5-10',
    paymentTerms: {
      en: 'Bank transfer, 30% deposit + balance on delivery. Local pickup available from Cordoba warehouse.',
      he: 'העברה בנקאית, 30% מקדמה + יתרה באספקה. איסוף עצמי זמין ממחסן קורדובה.',
    },
    strengths: {
      en: [
        'Strategic location in central Argentina — faster delivery to interior provinces',
        'Local stock in Cordoba reduces shipping times for central region',
        'Good personal relationships and responsive customer service',
        'Competitive pricing for the central Argentine market',
      ],
      he: [
        'מיקום אסטרטגי במרכז ארגנטינה — אספקה מהירה יותר לפרובינציות הפנימיות',
        'מלאי מקומי בקורדובה מצמצם זמני משלוח לאזור המרכזי',
        'יחסים אישיים טובים ושירות לקוחות רספונסיבי',
        'תמחור תחרותי לשוק הארגנטינאי המרכזי',
      ],
    },
    weaknesses: {
      en: [
        'Smaller inventory than Buenos Aires-based distributors',
        'Fewer brand options in the premium segment',
        'Limited battery and storage solutions',
      ],
      he: [
        'מלאי קטן יותר ממפיצים מבוסנוס איירס',
        'פחות אפשרויות מותגים בסגמנט הפרימיום',
        'פתרונות סוללות ואחסון מוגבלים',
      ],
    },
    tips: {
      en: [
        'Best choice for projects in Cordoba, Mendoza, San Luis, or Santa Fe provinces',
        'Ask about combo deals — they often bundle panels + inverters at a discount',
        'Visit their Cordoba warehouse for same-day pickup on in-stock items',
        'Build a relationship with the sales team for priority stock notifications',
      ],
      he: [
        'בחירה הטובה ביותר לפרויקטים בקורדובה, מנדוזה, סן לואיס, או סנטה פה',
        'שאלו על עסקאות חבילה — לעתים קרובות מציעים פאנלים + אינוורטרים בהנחה',
        'בקרו במחסן בקורדובה לאיסוף באותו יום על פריטים במלאי',
        'בנו קשר עם צוות המכירות להתראות עדיפות על מלאי',
      ],
    },
    rating: 4.0,
    notes: {
      en: 'Ideal regional partner for projects outside Buenos Aires. Saves significantly on shipping costs for interior provinces.',
      he: 'שותף אזורי אידיאלי לפרויקטים מחוץ לבואנוס איירס. חוסך משמעותית בעלויות משלוח לפרובינציות הפנימיות.',
    },
  },
  {
    id: 'epse',
    name: 'EPSE (Energia Provincial Sociedad del Estado)',
    type: 'manufacturer',
    location: { city: 'San Juan', province: 'San Juan' },
    website: 'https://epse.sanjuan.gob.ar',
    phone: '+54 264 421-4000',
    email: 'comercial@epse.com.ar',
    brands: ['EPSE (own production)'],
    products: ['panels'],
    priceRange: 'economy',
    minOrderUsd: 5000,
    deliveryDays: '15-30',
    paymentTerms: {
      en: 'Government entity — formal purchase orders required. Payment terms negotiable for large volumes.',
      he: 'גוף ממשלתי — נדרשות הזמנות רכש רשמיות. תנאי תשלום ניתנים למשא ומתן בהיקפים גדולים.',
    },
    strengths: {
      en: [
        'Only panel manufacturer in Argentina with 400 MW annual capacity',
        'Direct factory pricing — 10-15% below imported panel costs',
        'Government-backed entity with long-term stability',
        'Supports "Buy Argentine" procurement requirements for public projects',
      ],
      he: [
        'יצרן הפאנלים היחיד בארגנטינה עם קיבולת שנתית של 400 MW',
        'תמחור ישירות מהמפעל — 10-15% מתחת לעלויות פאנלים מיובאים',
        'גוף מגובה ממשלתי עם יציבות לטווח ארוך',
        'תומך בדרישות רכש "קנה ארגנטינאי" לפרויקטים ציבוריים',
      ],
    },
    weaknesses: {
      en: [
        'Only produces panels — need separate suppliers for inverters and BOS',
        'Bureaucratic procurement process typical of government entities',
        'Limited panel models and efficiency ratings vs top-tier imports',
      ],
      he: [
        'מייצרים רק פאנלים — צריך ספקים נפרדים לאינוורטרים ו-BOS',
        'תהליך רכש בירוקרטי טיפוסי לגופים ממשלתיים',
        'דגמי פאנלים מוגבלים ודירוגי יעילות לעומת ייבוא שורה ראשונה',
      ],
    },
    tips: {
      en: [
        'Essential for public sector bids requiring Argentine-made components',
        'Contact their commercial team early — lead times are longer than private sector',
        'Request technical datasheets and compare efficiency with imported alternatives',
        'Combine EPSE panels with imported inverters for optimal cost-quality balance',
      ],
      he: [
        'חיוני למכרזים ציבוריים הדורשים רכיבים מתוצרת ארגנטינה',
        'צרו קשר עם הצוות המסחרי שלהם מוקדם — זמני אספקה ארוכים יותר מהמגזר הפרטי',
        'בקשו גיליונות נתונים טכניים והשוו יעילות עם חלופות מיובאות',
        'שלבו פאנלי EPSE עם אינוורטרים מיובאים לאיזון עלות-איכות אופטימלי',
      ],
    },
    rating: 3.5,
    notes: {
      en: 'Unique as the only Argentine panel manufacturer. Strategic for public projects and cost-sensitive large installations. Limited to panels only.',
      he: 'ייחודי כיצרן הפאנלים הארגנטינאי היחיד. אסטרטגי לפרויקטים ציבוריים ולהתקנות גדולות רגישות לעלויות. מוגבל לפאנלים בלבד.',
    },
  },
  {
    id: 'ypf-solar',
    name: 'YPF Solar',
    type: 'both',
    location: { city: 'Buenos Aires', province: 'Buenos Aires' },
    website: 'https://ypfsolar.com',
    phone: '+54 11 5441-2000',
    email: 'solar@ypf.com',
    brands: ['YPF Solar (own)', 'LONGi', 'Huawei', 'BYD'],
    products: ['panels', 'inverters', 'mounting', 'monitoring', 'batteries'],
    priceRange: 'premium',
    minOrderUsd: 3000,
    deliveryDays: '10-20',
    paymentTerms: {
      en: 'Corporate payment terms. Financing available through YPF Luz. Leasing options for commercial projects.',
      he: 'תנאי תשלום תאגידיים. מימון זמין דרך YPF Luz. אפשרויות ליסינג לפרויקטים מסחריים.',
    },
    strengths: {
      en: [
        'Backed by YPF — Argentina\'s largest energy company with massive brand trust',
        'Turnkey solutions including design, installation, and maintenance',
        'Financing and leasing options through YPF financial services',
        'Strong presence in commercial and industrial segment',
      ],
      he: [
        'מגובים על ידי YPF — חברת האנרגיה הגדולה בארגנטינה עם אמון מותגי עצום',
        'פתרונות טורנקי כולל עיצוב, התקנה ותחזוקה',
        'אפשרויות מימון וליסינג דרך שירותי YPF פיננסיים',
        'נוכחות חזקה בסגמנט המסחרי והתעשייתי',
      ],
    },
    weaknesses: {
      en: [
        'Premium pricing — highest cost option in the market',
        'May prefer to work as EPC rather than just supply equipment',
        'Corporate bureaucracy can slow down small project procurement',
      ],
      he: [
        'תמחור פרימיום — האפשרות היקרה ביותר בשוק',
        'עשויים להעדיף לעבוד כ-EPC ולא רק לספק ציוד',
        'בירוקרטיה תאגידית עלולה להאט רכש פרויקטים קטנים',
      ],
    },
    tips: {
      en: [
        'Leverage YPF brand for customer confidence in commercial proposals',
        'Explore their financing programs — can be a strong sales differentiator',
        'Ask about partnership programs for certified installer benefits',
        'Best for large commercial/industrial projects where brand trust matters',
      ],
      he: [
        'נצלו את מותג YPF לביטחון לקוחות בהצעות מסחריות',
        'חקרו את תוכניות המימון שלהם — יכולים להיות מבדל מכירות חזק',
        'שאלו על תוכניות שותפות להטבות מתקין מוסמך',
        'הטוב ביותר לפרויקטים מסחריים/תעשייתיים גדולים שבהם אמון במותג חשוב',
      ],
    },
    rating: 4.0,
    notes: {
      en: 'Premium option with strong corporate backing. Best for commercial/industrial projects where financing and brand trust are key selling points.',
      he: 'אפשרות פרימיום עם גיבוי תאגידי חזק. הטוב ביותר לפרויקטים מסחריים/תעשייתיים שבהם מימון ואמון במותג הם נקודות מכירה מפתח.',
    },
  },
];
