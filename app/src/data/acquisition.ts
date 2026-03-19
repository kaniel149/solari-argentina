// ============================================
// Solari Argentina — Customer Acquisition Data
// Strategies, Sales Funnel, KPIs
// ============================================

export interface AcquisitionStrategy {
  id: string;
  title: { en: string; he: string };
  category: 'digital' | 'direct' | 'referral' | 'partnership';
  difficulty: 'easy' | 'medium' | 'hard';
  costLevel: 'free' | 'low' | 'medium' | 'high';
  expectedLeadsPerMonth: string;
  timeToFirstLead: { en: string; he: string };
  description: { en: string; he: string };
  steps: Array<{
    title: { en: string; he: string };
    description: { en: string; he: string };
  }>;
  tools: string[];
  tips: { en: string[]; he: string[] };
  metrics: { en: string[]; he: string[] };
  sampleContent?: { en: string; he: string };
  icon: string;
}

export interface SalesFunnel {
  stages: Array<{
    name: { en: string; he: string };
    description: { en: string; he: string };
    conversionRate: string;
    actions: { en: string[]; he: string[] };
    duration: { en: string; he: string };
  }>;
}

export const acquisitionStrategies: AcquisitionStrategy[] = [
  // 1. Google Ads
  {
    id: 'google-ads',
    title: { en: 'Google Ads Campaigns', he: 'קמפיינים בגוגל' },
    category: 'digital',
    difficulty: 'medium',
    costLevel: 'medium',
    expectedLeadsPerMonth: '15-30',
    timeToFirstLead: { en: '3-5 days', he: '3-5 ימים' },
    description: {
      en: 'Run targeted Google Search and Display ads for solar energy keywords in Argentina. Focus on high-intent searches like "paneles solares precio" and "instalacion solar Argentina".',
      he: 'הרצת מודעות ממוקדות בגוגל עבור מילות מפתח של אנרגיה סולארית בארגנטינה. מיקוד בחיפושים עם כוונת רכישה גבוהה.',
    },
    steps: [
      {
        title: { en: 'Keyword Research', he: 'מחקר מילות מפתח' },
        description: {
          en: 'Research high-intent keywords: "paneles solares", "energia solar argentina", "precio instalacion solar", "ahorro energia electrica"',
          he: 'חקור מילות מפתח עם כוונת רכישה: "paneles solares", "energia solar argentina", "precio instalacion solar"',
        },
      },
      {
        title: { en: 'Create Landing Page', he: 'יצירת דף נחיתה' },
        description: {
          en: 'Build a Spanish-language landing page with solar calculator, testimonials, and a clear contact form. Include pricing transparency.',
          he: 'בנה דף נחיתה בספרדית עם מחשבון סולארי, עדויות וטופס יצירת קשר. כלול שקיפות מחירים.',
        },
      },
      {
        title: { en: 'Set Up Campaigns', he: 'הגדרת קמפיינים' },
        description: {
          en: 'Create Search campaigns targeting solar keywords, Display campaigns for remarketing, and location targeting by province.',
          he: 'צור קמפיינים בחיפוש, קמפיינים של רימרקטינג ומיקוד גיאוגרפי לפי מחוז.',
        },
      },
      {
        title: { en: 'Budget Allocation', he: 'הקצאת תקציב' },
        description: {
          en: 'Start with $500-1,000/month. Allocate 70% to Search, 20% to Display remarketing, 10% to YouTube pre-roll.',
          he: 'התחל עם $500-1,000 לחודש. הקצה 70% לחיפוש, 20% לרימרקטינג, 10% ליוטיוב.',
        },
      },
      {
        title: { en: 'Optimize & Scale', he: 'אופטימיזציה וסקיילינג' },
        description: {
          en: 'Monitor CPC and CPA weekly. Pause underperforming keywords, increase budget on winners. Target CPL under $15.',
          he: 'עקוב אחר CPC ו-CPA שבועית. עצור מילות מפתח לא יעילות, הגדל תקציב על המנצחות. יעד CPL מתחת ל-$15.',
        },
      },
    ],
    tools: ['Google Ads', 'Google Analytics', 'Google Tag Manager', 'Unbounce/Carrd'],
    tips: {
      en: [
        'Use negative keywords to exclude "gratis" and "curso" searches',
        'Target provinces with highest electricity costs (Buenos Aires, Mendoza)',
        'Include price extensions showing system costs from $X',
        'Run ads during business hours when conversion rates are highest',
      ],
      he: [
        'השתמש במילות מפתח שליליות לסנן חיפושים של "gratis" ו-"curso"',
        'מקד מחוזות עם עלויות חשמל גבוהות (בואנוס איירס, מנדוסה)',
        'כלול תוספי מחיר שמציגים עלויות מערכת מ-$X',
        'הרץ מודעות בשעות עסקים כשיחסי ההמרה הכי גבוהים',
      ],
    },
    metrics: {
      en: [
        'Cost Per Lead (CPL) — target: $10-20',
        'Click-Through Rate (CTR) — target: >3%',
        'Conversion Rate — target: >5%',
        'Return on Ad Spend (ROAS) — target: >5x',
      ],
      he: [
        'עלות לליד (CPL) — יעד: $10-20',
        'אחוז הקלקות (CTR) — יעד: מעל 3%',
        'יחס המרה — יעד: מעל 5%',
        'תשואה על הוצאות פרסום (ROAS) — יעד: מעל 5x',
      ],
    },
    sampleContent: {
      en: 'Ad: "Solar Panels Argentina | Save 70% on Electricity | Free Quote in 24h" — Landing: Calculator + testimonials + form',
      he: 'מודעה: "פאנלים סולאריים ארגנטינה | חסכו 70% בחשמל | הצעת מחיר חינם ב-24 שעות" — דף נחיתה: מחשבון + עדויות + טופס',
    },
    icon: 'Search',
  },

  // 2. Social Media
  {
    id: 'social-media',
    title: { en: 'Social Media Marketing', he: 'שיווק ברשתות חברתיות' },
    category: 'digital',
    difficulty: 'medium',
    costLevel: 'medium',
    expectedLeadsPerMonth: '10-25',
    timeToFirstLead: { en: '1-2 weeks', he: '1-2 שבועות' },
    description: {
      en: 'Leverage Facebook and Instagram to reach homeowners and businesses interested in solar energy. Use visual content showing before/after energy bills and installation projects.',
      he: 'נצל פייסבוק ואינסטגרם להגיע לבעלי בתים ועסקים המעוניינים באנרגיה סולארית. השתמש בתוכן ויזואלי שמראה חשבונות חשמל לפני/אחרי.',
    },
    steps: [
      {
        title: { en: 'Create Business Profiles', he: 'יצירת פרופילים עסקיים' },
        description: {
          en: 'Set up Facebook Business Page and Instagram Business account with professional branding, logo, and cover images of installations.',
          he: 'הקם דף עסקי בפייסבוק וחשבון אינסטגרם עסקי עם מיתוג מקצועי, לוגו ותמונות כיסוי של התקנות.',
        },
      },
      {
        title: { en: 'Content Calendar', he: 'לוח שנה לתוכן' },
        description: {
          en: 'Plan 3-4 posts/week: Mon=educational, Wed=project showcase, Fri=savings calculator, Sun=testimonial/before-after.',
          he: 'תכנן 3-4 פוסטים בשבוע: שני=חינוכי, רביעי=תצוגת פרויקט, שישי=מחשבון חיסכון, ראשון=עדות/לפני-אחרי.',
        },
      },
      {
        title: { en: 'Run Lead Generation Ads', he: 'הרצת מודעות ליצירת לידים' },
        description: {
          en: 'Use Facebook Lead Ads with pre-filled forms. Target: age 30-60, homeowners, interest in sustainability/savings, Buenos Aires + Cordoba + Mendoza.',
          he: 'השתמש ב-Facebook Lead Ads עם טפסים מלאים מראש. מיקוד: גיל 30-60, בעלי בתים, עניין בקיימות/חיסכון.',
        },
      },
      {
        title: { en: 'Engagement Strategy', he: 'אסטרטגיית מעורבות' },
        description: {
          en: 'Respond to all comments within 2 hours. Use Messenger bot for instant quotes. Share user-generated content from happy customers.',
          he: 'הגב לכל התגובות תוך שעתיים. השתמש בבוט מסנג\'ר להצעות מיידיות. שתף תוכן שנוצר על ידי לקוחות מרוצים.',
        },
      },
      {
        title: { en: 'Analyze & Iterate', he: 'ניתוח ואיטרציה' },
        description: {
          en: 'Track performance weekly: reach, engagement, leads, CPL. A/B test ad creatives every 2 weeks.',
          he: 'עקוב אחר ביצועים שבועית: חשיפה, מעורבות, לידים, CPL. בצע A/B טסט על קריאייטיב כל שבועיים.',
        },
      },
    ],
    tools: ['Meta Business Suite', 'Canva', 'Later/Buffer', 'ManyChat'],
    tips: {
      en: [
        'Video content gets 3x more engagement — show real installations',
        'Use carousel ads showing savings timeline (Year 1, Year 5, Year 25)',
        'Partner with local influencers interested in sustainability',
      ],
      he: [
        'תוכן וידאו מקבל פי 3 יותר מעורבות — הראה התקנות אמיתיות',
        'השתמש במודעות קרוסלה שמציגות ציר זמן חיסכון (שנה 1, שנה 5, שנה 25)',
        'שתף פעולה עם משפיענים מקומיים המעוניינים בקיימות',
      ],
    },
    metrics: {
      en: [
        'Engagement Rate — target: >3%',
        'Cost Per Lead — target: $8-15',
        'Lead Form Completion Rate — target: >15%',
        'Monthly Follower Growth — target: >10%',
      ],
      he: [
        'שיעור מעורבות — יעד: מעל 3%',
        'עלות לליד — יעד: $8-15',
        'שיעור מילוי טפסים — יעד: מעל 15%',
        'גידול עוקבים חודשי — יעד: מעל 10%',
      ],
    },
    sampleContent: {
      en: 'Post: "This family in Mendoza went from $85,000 ARS/month electricity bill to $12,000. Here\'s how..." [Before/after photo]',
      he: 'פוסט: "המשפחה הזו במנדוסה ירדה מחשבון חשמל של $85,000 ARS לחודש ל-$12,000. ככה הם עשו את זה..." [תמונת לפני/אחרי]',
    },
    icon: 'Share2',
  },

  // 3. WhatsApp Business
  {
    id: 'whatsapp-business',
    title: { en: 'WhatsApp Business', he: 'וואטסאפ ביזנס' },
    category: 'digital',
    difficulty: 'easy',
    costLevel: 'free',
    expectedLeadsPerMonth: '5-10',
    timeToFirstLead: { en: '1-3 days', he: '1-3 ימים' },
    description: {
      en: 'Set up WhatsApp Business as a primary communication channel. In Argentina, WhatsApp is the #1 messaging app with 90%+ penetration. Use it for instant quotes and follow-ups.',
      he: 'הגדר וואטסאפ ביזנס כערוץ תקשורת ראשי. בארגנטינה, וואטסאפ היא אפליקציית ההודעות מספר 1 עם מעל 90% חדירה.',
    },
    steps: [
      {
        title: { en: 'Set Up WhatsApp Business', he: 'הגדרת וואטסאפ ביזנס' },
        description: {
          en: 'Download WhatsApp Business app. Set up business profile with logo, description, hours, website, and catalog of solar services.',
          he: 'הורד את אפליקציית וואטסאפ ביזנס. הגדר פרופיל עסקי עם לוגו, תיאור, שעות פעילות, אתר וקטלוג שירותים.',
        },
      },
      {
        title: { en: 'Create Quick Replies', he: 'יצירת תגובות מהירות' },
        description: {
          en: 'Set up templates: greeting, pricing inquiry, site visit scheduling, post-installation support. Use Spanish language.',
          he: 'הגדר תבניות: ברכה, שאילתת מחיר, תיאום ביקור באתר, תמיכה לאחר התקנה. בספרדית.',
        },
      },
      {
        title: { en: 'Build Product Catalog', he: 'בניית קטלוג מוצרים' },
        description: {
          en: 'Add 3-5 solar packages to catalog: Residential 3kWp, Residential 5kWp, Commercial 10kWp, Commercial 30kWp with prices.',
          he: 'הוסף 3-5 חבילות סולאריות לקטלוג: מגורים 3kWp, מגורים 5kWp, מסחרי 10kWp, מסחרי 30kWp עם מחירים.',
        },
      },
      {
        title: { en: 'Add WhatsApp Link Everywhere', he: 'הוסף לינק לוואטסאפ בכל מקום' },
        description: {
          en: 'Add wa.me link to website, social media bios, Google Business, email signature, and physical marketing materials.',
          he: 'הוסף קישור wa.me לאתר, ביו ברשתות חברתיות, גוגל ביזנס, חתימת אימייל וחומרים שיווקיים פיזיים.',
        },
      },
    ],
    tools: ['WhatsApp Business', 'WhatsApp Web', 'wa.me link generator'],
    tips: {
      en: [
        'Reply within 5 minutes for 3x higher conversion',
        'Use voice messages for a personal touch — common in Argentina',
        'Send solar savings calculations as PDF attachments',
      ],
      he: [
        'הגב תוך 5 דקות להמרה גבוהה פי 3',
        'השתמש בהודעות קוליות למגע אישי — נפוץ בארגנטינה',
        'שלח חישובי חיסכון סולאריים כקבצי PDF מצורפים',
      ],
    },
    metrics: {
      en: [
        'Response Time — target: <5 minutes',
        'Message-to-Lead Rate — target: >30%',
        'Lead-to-Visit Rate — target: >40%',
      ],
      he: [
        'זמן תגובה — יעד: פחות מ-5 דקות',
        'יחס הודעה-לליד — יעד: מעל 30%',
        'יחס ליד-לביקור — יעד: מעל 40%',
      ],
    },
    icon: 'MessageCircle',
  },

  // 4. Local SEO
  {
    id: 'local-seo',
    title: { en: 'Local SEO & Google Business', he: 'SEO מקומי וגוגל ביזנס' },
    category: 'digital',
    difficulty: 'easy',
    costLevel: 'free',
    expectedLeadsPerMonth: '5-15',
    timeToFirstLead: { en: '2-4 weeks', he: '2-4 שבועות' },
    description: {
      en: 'Optimize your online presence for local solar searches. Create Google Business listing, collect reviews, and rank for "energia solar + [city]" searches.',
      he: 'מטב את הנוכחות המקוונת שלך לחיפושים סולאריים מקומיים. צור רישום גוגל ביזנס, אסוף ביקורות ודרג ל"energia solar + [עיר]".',
    },
    steps: [
      {
        title: { en: 'Google Business Profile', he: 'פרופיל גוגל ביזנס' },
        description: {
          en: 'Create and verify Google Business profile. Add photos of installations, services, operating hours, and service area covering target provinces.',
          he: 'צור ואמת פרופיל גוגל ביזנס. הוסף תמונות של התקנות, שירותים, שעות פעילות ואזור שירות.',
        },
      },
      {
        title: { en: 'Collect Reviews', he: 'איסוף ביקורות' },
        description: {
          en: 'Ask every completed installation customer for a Google review. Target 5-star reviews mentioning savings and professionalism.',
          he: 'בקש מכל לקוח שהסתיימה אצלו התקנה ביקורת בגוגל. יעד: ביקורות 5 כוכבים שמזכירות חיסכון ומקצועיות.',
        },
      },
      {
        title: { en: 'Local Content', he: 'תוכן מקומי' },
        description: {
          en: 'Create location-specific pages: "Solar Panels in Cordoba", "Solar Installation Mendoza", etc. Include local tariff data and savings calculations.',
          he: 'צור דפים ספציפיים למיקום: "פאנלים סולאריים בקורדובה", "התקנה סולארית מנדוסה". כלול נתוני תעריף מקומיים.',
        },
      },
      {
        title: { en: 'Citations & Directories', he: 'ציטוטים ומדריכים' },
        description: {
          en: 'List in local directories: Paginas Amarillas, MercadoLibre services, Habitissimo, local chamber of commerce.',
          he: 'רשום במדריכים מקומיים: Paginas Amarillas, שירותי MercadoLibre, Habitissimo, לשכת מסחר מקומית.',
        },
      },
      {
        title: { en: 'Review Monitoring', he: 'ניטור ביקורות' },
        description: {
          en: 'Respond to all reviews within 24 hours. Address negative reviews professionally and publicly.',
          he: 'הגב לכל הביקורות תוך 24 שעות. התייחס לביקורות שליליות בצורה מקצועית ופומבית.',
        },
      },
    ],
    tools: ['Google Business Profile', 'Google Search Console', 'Semrush/Ahrefs'],
    tips: {
      en: [
        'Post weekly updates on Google Business — Google rewards active profiles',
        'Use photos of real local installations, not stock photos',
        'Include province-specific keywords in your website meta tags',
        'Answer Q&A section on Google Business proactively',
      ],
      he: [
        'פרסם עדכונים שבועיים בגוגל ביזנס — גוגל מתגמל פרופילים פעילים',
        'השתמש בתמונות של התקנות מקומיות אמיתיות, לא תמונות סטוק',
        'כלול מילות מפתח ספציפיות למחוז בתגיות מטא של האתר שלך',
        'ענה על שאלות בסעיף שאלות ותשובות בגוגל ביזנס באופן יזום',
      ],
    },
    metrics: {
      en: [
        'Google Business Profile views — target: >500/month',
        'Direction requests — target: >20/month',
        'Phone calls from listing — target: >15/month',
        'Average review rating — target: >4.5 stars',
      ],
      he: [
        'צפיות בפרופיל גוגל ביזנס — יעד: מעל 500 לחודש',
        'בקשות ניווט — יעד: מעל 20 לחודש',
        'שיחות טלפון מהרישום — יעד: מעל 15 לחודש',
        'דירוג ביקורות ממוצע — יעד: מעל 4.5 כוכבים',
      ],
    },
    icon: 'MapPin',
  },

  // 5. Door-to-Door
  {
    id: 'door-to-door',
    title: { en: 'Door-to-Door Sales', he: 'מכירות דלת לדלת' },
    category: 'direct',
    difficulty: 'hard',
    costLevel: 'low',
    expectedLeadsPerMonth: '3-8',
    timeToFirstLead: { en: '1-3 days', he: '1-3 ימים' },
    description: {
      en: 'Target high-consumption residential neighborhoods with door-to-door visits. Focus on areas with visible high electricity usage (AC units, pools) and suitable rooftops.',
      he: 'מקד שכונות מגורים עם צריכת חשמל גבוהה עם ביקורי דלת לדלת. התמקד באזורים עם שימוש חשמלי גבוה (מזגנים, בריכות).',
    },
    steps: [
      {
        title: { en: 'Identify Target Neighborhoods', he: 'זיהוי שכונות יעד' },
        description: {
          en: 'Map neighborhoods with: single-family homes, visible AC units, pool areas, good roof access, high-income indicators.',
          he: 'מפה שכונות עם: בתים צמודי קרקע, מזגנים נראים לעין, אזורי בריכות, גישה טובה לגג, אינדיקטורים להכנסה גבוהה.',
        },
      },
      {
        title: { en: 'Prepare Materials', he: 'הכנת חומרים' },
        description: {
          en: 'Print bilingual flyers with QR code to calculator. Prepare tablet with proposal tool. Carry business cards with WhatsApp QR.',
          he: 'הדפס פליירים דו-לשוניים עם QR לינק למחשבון. הכן טאבלט עם כלי הצעות מחיר. נשא כרטיסי ביקור עם QR לוואטסאפ.',
        },
      },
      {
        title: { en: 'Door Approach Script', he: 'תסריט פנייה' },
        description: {
          en: 'Opening: "Buenos dias, somos de Solari. Notamos que su casa tiene buen potencial solar. Podemos mostrarle cuanto puede ahorrar?"',
          he: 'פתיחה: "בוקר טוב, אנחנו מסולארי. שמנו לב שלבית שלכם יש פוטנציאל סולארי טוב. נוכל להראות לכם כמה תוכלו לחסוך?"',
        },
      },
      {
        title: { en: 'On-Spot Proposal', he: 'הצעה מיידית' },
        description: {
          en: 'Use proposal tool on tablet to show instant savings calculation. Ask for their monthly bill and generate proposal on the spot.',
          he: 'השתמש בכלי הצעות מחיר בטאבלט להצגת חישוב חיסכון מיידי. שאל על החשבון החודשי שלהם וצור הצעה במקום.',
        },
      },
      {
        title: { en: 'Follow-Up Protocol', he: 'פרוטוקול מעקב' },
        description: {
          en: 'Send WhatsApp within 2 hours. Follow up after 3 days, 1 week, 2 weeks. Maximum 4 touchpoints.',
          he: 'שלח הודעת וואטסאפ תוך שעתיים. עקוב אחרי 3 ימים, שבוע, שבועיים. מקסימום 4 נקודות מגע.',
        },
      },
      {
        title: { en: 'Track & Optimize Routes', he: 'מעקב ואופטימיזציית מסלולים' },
        description: {
          en: 'Track conversion by neighborhood. Focus on areas with >10% interest rate. Best hours: 10-12 AM, 4-6 PM on weekdays.',
          he: 'עקוב אחר המרה לפי שכונה. התמקד באזורים עם יחס עניין מעל 10%. שעות מיטביות: 10-12 בבוקר, 16-18 בימי חול.',
        },
      },
    ],
    tools: ['Google Maps', 'Proposal Tool (tablet)', 'WhatsApp Business', 'CRM spreadsheet'],
    tips: {
      en: [
        'Saturday mornings work best — people are home and relaxed',
        'Bring a printed electricity bill comparison showing real savings',
        'Offer a free roof assessment as a non-threatening entry point',
      ],
      he: [
        'שבתות בבוקר הכי טובות — אנשים בבית ורגועים',
        'הבא השוואת חשבון חשמל מודפסת שמראה חיסכון אמיתי',
        'הצע הערכת גג חינם כנקודת כניסה לא מאיימת',
      ],
    },
    metrics: {
      en: [
        'Doors Knocked Per Day — target: 30-50',
        'Interest Rate — target: >10%',
        'Appointments Set — target: 3-5/day',
        'Close Rate from Appointments — target: >25%',
      ],
      he: [
        'דלתות ביום — יעד: 30-50',
        'שיעור עניין — יעד: מעל 10%',
        'פגישות שנקבעו — יעד: 3-5 ליום',
        'שיעור סגירה מפגישות — יעד: מעל 25%',
      ],
    },
    icon: 'DoorOpen',
  },

  // 6. Real Estate Partnerships
  {
    id: 'real-estate',
    title: { en: 'Real Estate Partnerships', he: 'שותפויות נדל"ן' },
    category: 'partnership',
    difficulty: 'medium',
    costLevel: 'free',
    expectedLeadsPerMonth: '5-10',
    timeToFirstLead: { en: '2-4 weeks', he: '2-4 שבועות' },
    description: {
      en: 'Partner with real estate agents and property developers to offer solar as a value-add for new construction and home sales. Solar increases property value by 3-5%.',
      he: 'שתף פעולה עם סוכני נדל"ן ויזמי בנייה להציע סולארי כערך מוסף לבנייה חדשה ומכירת בתים. סולארי מעלה ערך נכס ב-3-5%.',
    },
    steps: [
      {
        title: { en: 'Identify Partners', he: 'זיהוי שותפים' },
        description: {
          en: 'Find top real estate agencies in target cities. Focus on those selling houses (not apartments) with values above $100,000 USD.',
          he: 'מצא סוכנויות נדל"ן מובילות בערים יעד. התמקד באלו שמוכרות בתים (לא דירות) עם ערכים מעל $100,000.',
        },
      },
      {
        title: { en: 'Create Partnership Proposal', he: 'יצירת הצעת שותפות' },
        description: {
          en: 'Offer: 2-3% referral commission per closed deal, co-branded marketing materials, joint workshops for clients.',
          he: 'הצע: עמלת הפניה 2-3% לעסקה סגורה, חומרים שיווקיים משותפים, סדנאות משותפות ללקוחות.',
        },
      },
      {
        title: { en: 'Pitch & Onboard', he: 'פיטש והטמעה' },
        description: {
          en: 'Present to agency managers: solar adds value, differentiates listings, reduces buyer electricity costs. Train agents on solar basics.',
          he: 'הצג למנהלי סוכנויות: סולארי מוסיף ערך, מבדל נכסים, מפחית עלויות חשמל לקונים. הכשר סוכנים בנושאי סולארי.',
        },
      },
      {
        title: { en: 'Co-Marketing', he: 'שיווק משותף' },
        description: {
          en: 'Create "Solar-Ready" badge for property listings. Joint Facebook ads targeting new homebuyers.',
          he: 'צור תג "מוכן לסולארי" לרישומי נכסים. מודעות פייסבוק משותפות שמכוונות לרוכשי בתים חדשים.',
        },
      },
    ],
    tools: ['CRM', 'Co-branded flyers', 'Referral tracking spreadsheet'],
    tips: {
      en: [
        'Focus on developers building new residential complexes',
        'Offer "solar pre-wiring" service for new construction at minimal cost',
        'Provide agents with a simple 1-page solar fact sheet',
        'Host joint "sustainable living" events at model homes',
      ],
      he: [
        'התמקד ביזמים שבונים מתחמי מגורים חדשים',
        'הצע שירות "חיווט מוקדם לסולארי" לבנייה חדשה בעלות מינימלית',
        'ספק לסוכנים גיליון עובדות סולאריות פשוט בעמוד אחד',
        'ארח אירועי "חיים ירוקים" משותפים בבתים לדוגמה',
      ],
    },
    metrics: {
      en: [
        'Active agent partners — target: 5-10',
        'Referrals per agent per month — target: 1-2',
        'Close rate from referrals — target: >30%',
      ],
      he: [
        'שותפי סוכנים פעילים — יעד: 5-10',
        'הפניות לסוכן לחודש — יעד: 1-2',
        'שיעור סגירה מהפניות — יעד: מעל 30%',
      ],
    },
    icon: 'Home',
  },

  // 7. Electrician Referral
  {
    id: 'electrician-referral',
    title: { en: 'Electrician Referral Network', he: 'רשת הפניות חשמלאים' },
    category: 'referral',
    difficulty: 'easy',
    costLevel: 'low',
    expectedLeadsPerMonth: '3-8',
    timeToFirstLead: { en: '1-2 weeks', he: '1-2 שבועות' },
    description: {
      en: 'Build a network of local electricians who refer solar installation leads. Electricians are trusted by homeowners and often asked about solar options.',
      he: 'בנה רשת חשמלאים מקומיים שמפנים לידים להתקנות סולאריות. חשמלאים נהנים מאמון בעלי בתים ולעתים קרובות נשאלים על אפשרויות סולאריות.',
    },
    steps: [
      {
        title: { en: 'Find Local Electricians', he: 'מצא חשמלאים מקומיים' },
        description: {
          en: 'Contact 20-30 licensed electricians in target areas through Paginas Amarillas, Google Maps, and local trade associations.',
          he: 'צור קשר עם 20-30 חשמלאים מורשים באזורי יעד דרך Paginas Amarillas, גוגל מפות ואיגודים מקצועיים.',
        },
      },
      {
        title: { en: 'Offer Referral Fee', he: 'הצע עמלת הפניה' },
        description: {
          en: 'Offer $100-200 USD per closed deal (or 1-2% of system value). Pay upon installation completion.',
          he: 'הצע $100-200 לעסקה סגורה (או 1-2% מערך המערכת). תשלום בסיום ההתקנה.',
        },
      },
      {
        title: { en: 'Provide Training & Materials', he: 'ספק הכשרה וחומרים' },
        description: {
          en: 'Give electricians: business cards with QR code, simple talking points, and a "when to mention solar" guide.',
          he: 'תן לחשמלאים: כרטיסי ביקור עם QR, נקודות דיבור פשוטות ומדריך "מתי להזכיר סולארי".',
        },
      },
      {
        title: { en: 'Monthly Check-ins', he: 'מעקב חודשי' },
        description: {
          en: 'Call each electrician monthly to maintain relationship, ask about potential leads, and share success stories.',
          he: 'התקשר לכל חשמלאי מדי חודש לשמור על הקשר, שאל על לידים פוטנציאליים ושתף סיפורי הצלחה.',
        },
      },
    ],
    tools: ['CRM', 'Referral tracking sheet', 'Printed business cards'],
    tips: {
      en: [
        'Target electricians who work in residential areas',
        'Pay referral fees promptly — word spreads fast',
        'Offer subcontracting work for electrical portions of installations',
      ],
      he: [
        'מקד חשמלאים שעובדים באזורי מגורים',
        'שלם עמלות הפניה מיידית — מילה עוברת מהר',
        'הצע עבודת קבלנות משנה על חלקים חשמליים בהתקנות',
      ],
    },
    metrics: {
      en: [
        'Active referral partners — target: 10-15',
        'Referrals per month — target: 5-10',
        'Close rate from referrals — target: >35%',
        'Average referral fee paid — target: $150',
      ],
      he: [
        'שותפי הפניה פעילים — יעד: 10-15',
        'הפניות לחודש — יעד: 5-10',
        'שיעור סגירה מהפניות — יעד: מעל 35%',
        'עמלת הפניה ממוצעת — יעד: $150',
      ],
    },
    icon: 'Zap',
  },

  // 8. Business Parks
  {
    id: 'business-parks',
    title: { en: 'Business & Industrial Parks', he: 'פארקים עסקיים ותעשייתיים' },
    category: 'direct',
    difficulty: 'medium',
    costLevel: 'low',
    expectedLeadsPerMonth: '5-10',
    timeToFirstLead: { en: '2-4 weeks', he: '2-4 שבועות' },
    description: {
      en: 'Target commercial and industrial buildings in business parks. These properties have large flat roofs, high electricity consumption, and fast ROI on solar installations.',
      he: 'מקד מבנים מסחריים ותעשייתיים בפארקים עסקיים. למבנים אלו יש גגות שטוחים גדולים, צריכת חשמל גבוהה ו-ROI מהיר על התקנות סולאריות.',
    },
    steps: [
      {
        title: { en: 'Map Business Districts', he: 'מיפוי אזורי תעסוקה' },
        description: {
          en: 'Identify industrial parks, commercial zones, and business districts. Use Google Maps satellite view to find large flat roofs.',
          he: 'זהה פארקים תעשייתיים, אזורי מסחר ומרכזי עסקים. השתמש בתצוגת לוויין של גוגל מפות למציאת גגות שטוחים.',
        },
      },
      {
        title: { en: 'Research Building Owners', he: 'חקור בעלי מבנים' },
        description: {
          en: 'Find building management contacts. Focus on owner-operators who pay their own electricity bills.',
          he: 'מצא אנשי קשר של ניהול מבנים. התמקד בבעלים-מפעילים שמשלמים את חשבונות החשמל שלהם.',
        },
      },
      {
        title: { en: 'Prepare Commercial Proposals', he: 'הכנת הצעות מסחריות' },
        description: {
          en: 'Create proposals showing: electricity cost savings, ROI timeline, tax benefits (Ley 27.424 deductions), green credentials for ESG reporting.',
          he: 'צור הצעות שמציגות: חיסכון בעלויות חשמל, ציר זמן ROI, הטבות מס (ניכויי חוק 27.424), אישורים ירוקים לדיווח ESG.',
        },
      },
      {
        title: { en: 'Direct Outreach', he: 'פנייה ישירה' },
        description: {
          en: 'Cold email + LinkedIn + phone calls to facility managers. Offer free energy audit as entry point.',
          he: 'אימייל קר + לינקדאין + שיחות טלפון למנהלי מתקנים. הצע ביקורת אנרגיה חינם כנקודת כניסה.',
        },
      },
      {
        title: { en: 'Site Visits & Assessments', he: 'ביקורי אתר והערכות' },
        description: {
          en: 'Conduct free roof assessments. Bring drone for roof inspection. Present findings with detailed proposal within 48 hours.',
          he: 'בצע הערכות גג חינם. הבא רחפן לבדיקת גג. הצג ממצאים עם הצעה מפורטת תוך 48 שעות.',
        },
      },
    ],
    tools: ['Google Earth', 'LinkedIn Sales Navigator', 'Drone', 'Proposal Tool'],
    tips: {
      en: [
        'Commercial systems have faster payback (2.5-4 years) — lead with this',
        'Offer PPA (Power Purchase Agreement) model for large installations',
        'Target businesses with peak daytime usage (offices, manufacturing)',
      ],
      he: [
        'למערכות מסחריות יש החזר מהיר יותר (2.5-4 שנים) — פתח עם זה',
        'הצע מודל PPA עבור התקנות גדולות',
        'מקד עסקים עם שיא שימוש בשעות היום (משרדים, ייצור)',
      ],
    },
    metrics: {
      en: [
        'Buildings contacted per week — target: 10-15',
        'Site visits per month — target: 5-8',
        'Proposal-to-Close rate — target: >20%',
        'Average system size — target: >15 kWp',
      ],
      he: [
        'מבנים שפנינו אליהם בשבוע — יעד: 10-15',
        'ביקורי אתר לחודש — יעד: 5-8',
        'יחס הצעה-סגירה — יעד: מעל 20%',
        'גודל מערכת ממוצע — יעד: מעל 15 kWp',
      ],
    },
    icon: 'Building2',
  },

  // 9. Community Events
  {
    id: 'community-events',
    title: { en: 'Community Solar Events', he: 'אירועי סולאר קהילתיים' },
    category: 'direct',
    difficulty: 'medium',
    costLevel: 'medium',
    expectedLeadsPerMonth: '10-20',
    timeToFirstLead: { en: '1-2 weeks', he: '1-2 שבועות' },
    description: {
      en: 'Host free solar education workshops and information sessions in local communities. Build trust and generate qualified leads through education-first approach.',
      he: 'ארח סדנאות חינוך סולאריות וערבי מידע חינם בקהילות מקומיות. בנה אמון וצור לידים איכותיים דרך גישה חינוכית.',
    },
    steps: [
      {
        title: { en: 'Choose Event Format', he: 'בחר פורמט אירוע' },
        description: {
          en: 'Options: evening workshop (2h), weekend open house, neighborhood solar tour (visit existing installations), webinar for remote areas.',
          he: 'אפשרויות: סדנת ערב (שעתיים), יום פתוח בסופ"ש, סיור סולארי שכונתי (ביקור בהתקנות קיימות), וובינר לאזורים מרוחקים.',
        },
      },
      {
        title: { en: 'Secure Venue & Promote', he: 'השג מקום ופרסם' },
        description: {
          en: 'Partner with community centers, libraries, country clubs. Promote via Facebook events, neighborhood WhatsApp groups, printed flyers.',
          he: 'שתף פעולה עם מרכזים קהילתיים, ספריות, מועדונים. פרסם דרך אירועי פייסבוק, קבוצות וואטסאפ שכונתיות, פליירים.',
        },
      },
      {
        title: { en: 'Prepare Presentation', he: 'הכנת מצגת' },
        description: {
          en: 'Cover: how solar works, Argentina regulations, real savings examples, financing options, Q&A. Keep it educational, not salesy.',
          he: 'כסה: איך סולארי עובד, רגולציה בארגנטינה, דוגמאות חיסכון אמיתיות, אפשרויות מימון, שאלות ותשובות. שמור על גישה חינוכית.',
        },
      },
      {
        title: { en: 'Collect Information', he: 'איסוף מידע' },
        description: {
          en: 'Registration form at entry. Offer free consultation signup. Raffle prize (solar charger) for business card drop.',
          he: 'טופס הרשמה בכניסה. הצע הרשמה לייעוץ חינם. הגרלת פרס (מטען סולארי) להשארת כרטיס ביקור.',
        },
      },
      {
        title: { en: 'Post-Event Follow-Up', he: 'מעקב לאחר האירוע' },
        description: {
          en: 'Send thank-you WhatsApp within 24h. Include event slides PDF. Offer personalized quote within 1 week.',
          he: 'שלח הודעת תודה בוואטסאפ תוך 24 שעות. כלול PDF מצגת האירוע. הצע הצעת מחיר מותאמת אישית תוך שבוע.',
        },
      },
    ],
    tools: ['Event registration (Google Forms)', 'Canva (materials)', 'WhatsApp Groups', 'Projector/Screen'],
    tips: {
      en: [
        'Invite a happy customer to share their experience — peer testimonials are powerful',
        'Partner with municipality for "green neighborhood" initiatives',
        'Offer group discounts for neighborhoods that sign up together',
        'Film the event for social media content',
      ],
      he: [
        'הזמן לקוח מרוצה לשתף את הניסיון שלו — עדויות עמיתים חזקות',
        'שתף פעולה עם עירייה ליוזמות "שכונה ירוקה"',
        'הצע הנחות קבוצתיות לשכונות שנרשמות יחד',
        'צלם את האירוע לתוכן ברשתות חברתיות',
      ],
    },
    metrics: {
      en: [
        'Attendees per event — target: 20-40',
        'Lead capture rate — target: >60%',
        'Post-event consultation bookings — target: >25%',
        'Events per month — target: 2-4',
      ],
      he: [
        'משתתפים לאירוע — יעד: 20-40',
        'שיעור לכידת לידים — יעד: מעל 60%',
        'הזמנות ייעוץ לאחר אירוע — יעד: מעל 25%',
        'אירועים לחודש — יעד: 2-4',
      ],
    },
    icon: 'Users',
  },

  // 10. Referral Program
  {
    id: 'referral-program',
    title: { en: 'Customer Referral Program', he: 'תוכנית הפניית לקוחות' },
    category: 'referral',
    difficulty: 'easy',
    costLevel: 'low',
    expectedLeadsPerMonth: '3-10',
    timeToFirstLead: { en: '2-4 weeks', he: '2-4 שבועות' },
    description: {
      en: 'Turn happy customers into brand ambassadors with a structured referral program. Offer monetary incentives for successful referrals that result in installations.',
      he: 'הפוך לקוחות מרוצים לשגרירי מותג עם תוכנית הפניות מובנית. הצע תמריצים כספיים עבור הפניות מוצלחות שמובילות להתקנות.',
    },
    steps: [
      {
        title: { en: 'Design Incentive Structure', he: 'עיצוב מבנה תמריצים' },
        description: {
          en: 'Offer: $150 USD cash or $200 energy credit per closed referral. Bonus: $50 for the referred customer too (win-win).',
          he: 'הצע: $150 מזומן או $200 קרדיט אנרגיה לכל הפניה שנסגרה. בונוס: $50 גם ללקוח המופנה (ווין-ווין).',
        },
      },
      {
        title: { en: 'Create Referral Materials', he: 'יצירת חומרי הפניה' },
        description: {
          en: 'Print referral cards with unique codes. Create shareable WhatsApp message template. Set up referral tracking page.',
          he: 'הדפס כרטיסי הפניה עם קודים ייחודיים. צור תבנית הודעת וואטסאפ לשיתוף. הקם דף מעקב הפניות.',
        },
      },
      {
        title: { en: 'Launch to Existing Customers', he: 'השקה ללקוחות קיימים' },
        description: {
          en: 'Send WhatsApp blast to all completed installations. Follow up with a phone call to top 20% best customers.',
          he: 'שלח הודעת וואטסאפ לכל ההתקנות שהושלמו. עקוב עם שיחת טלפון ל-20% הלקוחות הטובים ביותר.',
        },
      },
      {
        title: { en: 'Timing is Key', he: 'תזמון הוא מפתח' },
        description: {
          en: 'Ask for referrals at 3 key moments: right after installation, after first electricity bill showing savings, and on 1-year anniversary.',
          he: 'בקש הפניות ב-3 רגעים מפתח: מיד אחרי ההתקנה, אחרי חשבון חשמל ראשון שמראה חיסכון וביום השנה.',
        },
      },
    ],
    tools: ['Referral tracking (Google Sheets)', 'WhatsApp Business', 'Printed referral cards'],
    tips: {
      en: [
        'Satisfied customers are 4x more likely to refer during the first month',
        'Make the referral process as easy as possible — one-click WhatsApp share',
        'Celebrate referral success publicly on social media (with permission)',
      ],
      he: [
        'לקוחות מרוצים נוטים פי 4 יותר להפנות בחודש הראשון',
        'הפוך את תהליך ההפניה לקל ככל האפשר — שיתוף בלחיצה אחת בוואטסאפ',
        'חגוג הצלחות הפניה בפומבי ברשתות חברתיות (באישור)',
      ],
    },
    metrics: {
      en: [
        'Referral rate (% of customers who refer) — target: >20%',
        'Referrals per referring customer — target: 1.5',
        'Referral close rate — target: >40%',
        'Customer acquisition cost via referral — target: <$200',
      ],
      he: [
        'שיעור הפניה (% לקוחות שמפנים) — יעד: מעל 20%',
        'הפניות ללקוח מפנה — יעד: 1.5',
        'שיעור סגירת הפניות — יעד: מעל 40%',
        'עלות רכישת לקוח דרך הפניה — יעד: פחות מ-$200',
      ],
    },
    icon: 'Gift',
  },
];

// ============================================
// Sales Funnel — 7 Stages
// ============================================
export const salesFunnel: SalesFunnel = {
  stages: [
    {
      name: { en: 'Awareness', he: 'מודעות' },
      description: {
        en: 'Potential customer becomes aware of solar energy as an option. First touchpoint through ads, content, or referral.',
        he: 'לקוח פוטנציאלי מודע לאנרגיה סולארית כאופציה. נקודת מגע ראשונה דרך מודעות, תוכן או הפניה.',
      },
      conversionRate: '100%',
      actions: {
        en: [
          'Social media presence & content',
          'Google Ads for solar keywords',
          'Community events & workshops',
          'Referral network activation',
        ],
        he: [
          'נוכחות ותוכן ברשתות חברתיות',
          'מודעות גוגל למילות מפתח סולאריות',
          'אירועים וסדנאות קהילתיות',
          'הפעלת רשת הפניות',
        ],
      },
      duration: { en: 'Ongoing', he: 'מתמשך' },
    },
    {
      name: { en: 'Interest', he: 'עניין' },
      description: {
        en: 'Customer shows active interest — clicks ad, visits website, asks questions, requests information.',
        he: 'הלקוח מראה עניין פעיל — לוחץ על מודעה, מבקר באתר, שואל שאלות, מבקש מידע.',
      },
      conversionRate: '60%',
      actions: {
        en: [
          'Send educational content via WhatsApp',
          'Share savings calculator link',
          'Respond to inquiries within 5 minutes',
          'Add to CRM and tag source',
        ],
        he: [
          'שלח תוכן חינוכי דרך וואטסאפ',
          'שתף קישור למחשבון חיסכון',
          'הגב לפניות תוך 5 דקות',
          'הוסף ל-CRM ותייג מקור',
        ],
      },
      duration: { en: '1-3 days', he: '1-3 ימים' },
    },
    {
      name: { en: 'Evaluation', he: 'הערכה' },
      description: {
        en: 'Customer actively evaluates solar — compares options, asks about pricing, checks references.',
        he: 'הלקוח מעריך באופן פעיל — משווה אפשרויות, שואל על מחירים, בודק המלצות.',
      },
      conversionRate: '40%',
      actions: {
        en: [
          'Schedule site visit and roof assessment',
          'Provide reference contacts from nearby installations',
          'Share financing options and ROI analysis',
          'Address objections and concerns',
        ],
        he: [
          'קבע ביקור באתר והערכת גג',
          'ספק אנשי קשר להמלצות מהתקנות סמוכות',
          'שתף אפשרויות מימון וניתוח ROI',
          'התייחס להתנגדויות וחששות',
        ],
      },
      duration: { en: '3-7 days', he: '3-7 ימים' },
    },
    {
      name: { en: 'Proposal', he: 'הצעה' },
      description: {
        en: 'Formal proposal with system design, pricing, timeline, and financial projections.',
        he: 'הצעה רשמית עם עיצוב מערכת, תמחור, לוח זמנים ותחזיות פיננסיות.',
      },
      conversionRate: '30%',
      actions: {
        en: [
          'Generate detailed proposal with Proposal Tool',
          'Present in-person or via video call',
          'Offer 2-3 system options (economy/standard/premium)',
          'Include 25-year savings projection',
        ],
        he: [
          'צור הצעה מפורטת עם כלי ההצעות',
          'הצג פנים אל פנים או בשיחת וידאו',
          'הצע 2-3 אפשרויות מערכת (חסכונית/סטנדרט/פרימיום)',
          'כלול תחזית חיסכון ל-25 שנה',
        ],
      },
      duration: { en: '1-3 days', he: '1-3 ימים' },
    },
    {
      name: { en: 'Negotiation', he: 'משא ומתן' },
      description: {
        en: 'Customer reviews proposal, negotiates pricing, asks final questions, checks with family.',
        he: 'הלקוח סוקר את ההצעה, מנהל משא ומתן על מחירים, שואל שאלות אחרונות, מתייעץ עם המשפחה.',
      },
      conversionRate: '20%',
      actions: {
        en: [
          'Follow up within 48 hours',
          'Offer limited-time discount or bonus',
          'Address remaining concerns',
          'Provide payment plan options',
        ],
        he: [
          'עקוב תוך 48 שעות',
          'הצע הנחה או בונוס לזמן מוגבל',
          'התייחס לחששות שנותרו',
          'ספק אפשרויות תשלום',
        ],
      },
      duration: { en: '3-14 days', he: '3-14 ימים' },
    },
    {
      name: { en: 'Close', he: 'סגירה' },
      description: {
        en: 'Customer signs contract and makes deposit. Installation scheduled.',
        he: 'הלקוח חותם חוזה ומבצע מקדמה. ההתקנה מתוזמנת.',
      },
      conversionRate: '15%',
      actions: {
        en: [
          'Send digital contract for signature',
          'Collect 30-50% deposit',
          'Order equipment from suppliers',
          'Schedule installation date',
          'Submit grid connection paperwork',
        ],
        he: [
          'שלח חוזה דיגיטלי לחתימה',
          'אסוף מקדמה 30-50%',
          'הזמן ציוד מספקים',
          'קבע תאריך התקנה',
          'הגש ניירת חיבור לרשת',
        ],
      },
      duration: { en: '1-3 days', he: '1-3 ימים' },
    },
    {
      name: { en: 'Installation', he: 'התקנה' },
      description: {
        en: 'System installed, tested, and connected to grid. Customer trained on monitoring.',
        he: 'המערכת מותקנת, נבדקת ומחוברת לרשת. הלקוח מוכשר על ניטור.',
      },
      conversionRate: '14%',
      actions: {
        en: [
          'Coordinate installation team',
          'Complete installation (1-3 days)',
          'Grid connection and meter setup',
          'Customer training on monitoring app',
          'Collect final payment',
          'Request review and referral',
        ],
        he: [
          'תאם צוות התקנה',
          'השלם התקנה (1-3 ימים)',
          'חיבור לרשת והתקנת מונה',
          'הכשרת לקוח על אפליקציית ניטור',
          'אסוף תשלום סופי',
          'בקש ביקורת והפניה',
        ],
      },
      duration: { en: '1-4 weeks', he: '1-4 שבועות' },
    },
  ],
};
