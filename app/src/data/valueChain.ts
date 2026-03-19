export interface ValueChainPhase {
  id: number;
  phase: string;
  title: { en: string; he: string };
  duration: { en: string; he: string };
  description: { en: string; he: string };
  steps: Array<{
    title: { en: string; he: string };
    description: { en: string; he: string };
    tips: { en: string[]; he: string[] };
    documents?: { en: string[]; he: string[] };
    tools?: string[];
  }>;
  deliverables: { en: string[]; he: string[] };
  risks: { en: string[]; he: string[] };
  costEstimate?: { en: string; he: string };
  icon: string;
}

export const valueChainPhases: ValueChainPhase[] = [
  {
    id: 1,
    phase: 'acquisition',
    title: {
      en: 'Customer Acquisition & Assessment',
      he: 'רכישת לקוחות והערכה ראשונית',
    },
    duration: { en: '2 weeks', he: '2 שבועות' },
    description: {
      en: 'Generate leads, qualify prospects, conduct initial site visits, analyze consumption patterns, and determine project feasibility before investing in detailed engineering.',
      he: 'ייצור לידים, סינון לקוחות פוטנציאליים, ביצוע ביקור ראשוני באתר, ניתוח דפוסי צריכה וקביעת היתכנות הפרויקט לפני השקעה בתכנון מפורט.',
    },
    steps: [
      {
        title: { en: 'Lead Generation', he: 'ייצור לידים' },
        description: {
          en: 'Attract potential customers through digital marketing, referrals, partnerships with electricians, and local community engagement. Focus on areas with high electricity tariffs and good solar irradiance.',
          he: 'משיכת לקוחות פוטנציאליים באמצעות שיווק דיגיטלי, הפניות, שותפויות עם חשמלאים ומעורבות קהילתית מקומית. מיקוד באזורים עם תעריפי חשמל גבוהים והקרנה סולארית טובה.',
        },
        tips: {
          en: [
            'Target neighborhoods with high EDENOR/EDESUR tariffs (R4-R9 categories)',
            'Partner with local electricians — they are often the first point of contact for homeowners',
            'Use social media ads targeting homeowners aged 35-60 in specific provinces',
            'Attend local renewable energy fairs and chamber of commerce events',
          ],
          he: [
            'מיקוד בשכונות עם תעריפי EDENOR/EDESUR גבוהים (קטגוריות R4-R9)',
            'שיתוף פעולה עם חשמלאים מקומיים — הם לעתים קרובות נקודת המגע הראשונה עם בעלי בתים',
            'שימוש בפרסומות ברשתות חברתיות המכוונות לבעלי בתים בגילאי 35-60 בפרובינציות ספציפיות',
            'השתתפות בירידי אנרגיה מתחדשת מקומיים ואירועי לשכת המסחר',
          ],
        },
        documents: {
          en: ['Marketing materials', 'Company brochure', 'Reference project portfolio'],
          he: ['חומרי שיווק', 'ברושור חברה', 'תיק פרויקטי התייחסות'],
        },
        tools: ['Google Ads', 'Meta Business Suite', 'WhatsApp Business'],
      },
      {
        title: { en: 'Lead Qualification', he: 'סינון לידים' },
        description: {
          en: 'Screen leads to determine if the customer is a good fit: property ownership, electricity consumption level, roof condition, budget availability, and decision-making timeline.',
          he: 'סינון לידים כדי לקבוע אם הלקוח מתאים: בעלות על הנכס, רמת צריכת חשמל, מצב הגג, זמינות תקציב ולוח זמנים לקבלת החלטות.',
        },
        tips: {
          en: [
            'Minimum viable consumption is typically 300 kWh/month for residential',
            'Ask for recent electricity bills (last 3-6 months) upfront',
            'Confirm property ownership — renters rarely invest in solar',
            'Qualify budget expectations early to avoid wasted site visits',
          ],
          he: [
            'צריכה מינימלית כדאית היא בדרך כלל 300 קוט"ש/חודש למגורים',
            'בקשו חשבונות חשמל עדכניים (3-6 חודשים אחרונים) מראש',
            'אשרו בעלות על הנכס — שוכרים לעתים רחוקות משקיעים בסולארי',
            'סננו ציפיות תקציב מוקדם כדי להימנע מביקורי אתר מיותרים',
          ],
        },
        tools: ['CRM System', 'WhatsApp Business'],
      },
      {
        title: { en: 'Initial Site Visit', he: 'ביקור ראשוני באתר' },
        description: {
          en: 'Visit the property to assess roof condition, orientation, available area, shading obstacles, electrical panel condition, and access logistics for installation.',
          he: 'ביקור בנכס להערכת מצב הגג, כיוון, שטח זמין, מכשולי הצללה, מצב לוח החשמל ולוגיסטיקת גישה להתקנה.',
        },
        tips: {
          en: [
            'Bring a compass, tape measure, and camera for documentation',
            'Check roof structural integrity — age, material, and load capacity',
            'Note any trees, buildings, or structures that could cause shading',
            'Verify the electrical panel has capacity for a solar connection',
            'Take photos from multiple angles including the electrical meter',
          ],
          he: [
            'הביאו מצפן, סרט מידה ומצלמה לתיעוד',
            'בדקו שלמות מבנית של הגג — גיל, חומר וכושר עמידה בעומס',
            'שימו לב לעצים, בניינים או מבנים שעלולים לגרום להצללה',
            'ודאו שללוח החשמל יש קיבולת לחיבור סולארי',
            'צלמו מזוויות מרובות כולל מד החשמל',
          ],
        },
        documents: {
          en: ['Site assessment form', 'Photo checklist', 'Customer information form'],
          he: ['טופס הערכת אתר', 'רשימת בדיקה לצילום', 'טופס מידע לקוח'],
        },
        tools: ['Compass App', 'SunCalc', 'Google Earth'],
      },
      {
        title: { en: 'Consumption Analysis', he: 'ניתוח צריכה' },
        description: {
          en: 'Analyze the customer electricity bills to understand consumption patterns, tariff categories, peak usage hours, and determine the optimal system size to offset their consumption.',
          he: 'ניתוח חשבונות חשמל הלקוח להבנת דפוסי צריכה, קטגוריות תעריף, שעות צריכת שיא וקביעת גודל המערכת האופטימלי לקיזוז הצריכה.',
        },
        tips: {
          en: [
            'Analyze at least 6 months of bills to capture seasonal variation',
            'Identify the tariff category — higher categories benefit more from solar',
            'Calculate average daily consumption to size the system correctly',
            'Consider future consumption changes (EV, pool heater, etc.)',
          ],
          he: [
            'נתחו לפחות 6 חודשי חשבונות כדי ללכוד שונות עונתית',
            'זהו את קטגוריית התעריף — קטגוריות גבוהות יותר מפיקות יותר מסולארי',
            'חשבו צריכה יומית ממוצעת כדי לגדל את המערכת בצורה נכונה',
            'שקלו שינויי צריכה עתידיים (רכב חשמלי, מחמם בריכה וכו\')',
          ],
        },
        documents: {
          en: ['Electricity bills (6-12 months)', 'Consumption analysis spreadsheet'],
          he: ['חשבונות חשמל (6-12 חודשים)', 'גיליון ניתוח צריכה'],
        },
        tools: ['Excel/Sheets', 'Proposal Tool'],
      },
      {
        title: { en: 'Feasibility Determination', he: 'קביעת היתכנות' },
        description: {
          en: 'Combine site assessment and consumption data to determine if the project is technically and financially viable. Calculate preliminary ROI, payback period, and system specifications.',
          he: 'שילוב נתוני הערכת אתר וצריכה כדי לקבוע אם הפרויקט בר ביצוע טכנית וכלכלית. חשבו החזר השקעה ראשוני, תקופת החזר ומפרטי מערכת.',
        },
        tips: {
          en: [
            'A viable project typically has a payback period under 5 years',
            'Minimum usable roof area: ~7 m² per kWp of solar capacity',
            'Consider north-facing orientation (southern hemisphere) as ideal',
            'Factor in local net billing rates — injection credits vary by province',
          ],
          he: [
            'פרויקט כדאי בדרך כלל בעל תקופת החזר מתחת ל-5 שנים',
            'שטח גג מינימלי שמיש: ~7 מ"ר לכל kWp של קיבולת סולארית',
            'כיוון צפון (חצי הכדור הדרומי) נחשב לאידיאלי',
            'הביאו בחשבון תעריפי net billing מקומיים — זיכויי הזרקה משתנים לפי פרובינציה',
          ],
        },
        tools: ['Proposal Tool', 'PVsyst', 'Google Solar API'],
      },
    ],
    deliverables: {
      en: [
        'Qualified lead database with contact information',
        'Site assessment report with photos and measurements',
        'Consumption analysis with tariff classification',
        'Preliminary feasibility report with ROI estimate',
      ],
      he: [
        'מאגר לידים מסוננים עם פרטי קשר',
        'דו"ח הערכת אתר עם תמונות ומידות',
        'ניתוח צריכה עם סיווג תעריפי',
        'דו"ח היתכנות ראשוני עם אומדן החזר השקעה',
      ],
    },
    risks: {
      en: [
        'Roof structural issues discovered late — always check early to avoid wasted engineering time',
        'Customer expectations mismatch — qualify budget and timeline expectations upfront',
        'Regulatory changes affecting net billing rates — stay updated on CAMMESA regulations',
      ],
      he: [
        'בעיות מבניות בגג שמתגלות מאוחר — בדקו מוקדם כדי להימנע מבזבוז זמן תכנון',
        'אי-התאמה בציפיות הלקוח — סננו ציפיות תקציב ולוח זמנים מראש',
        'שינויים רגולטוריים המשפיעים על תעריפי net billing — הישארו מעודכנים בתקנות CAMMESA',
      ],
    },
    costEstimate: {
      en: '$200-500 per lead (marketing + visit costs)',
      he: '$200-500 לליד (שיווק + עלויות ביקור)',
    },
    icon: 'Users',
  },
  {
    id: 2,
    phase: 'design',
    title: {
      en: 'Site Survey & System Design',
      he: 'סקר אתר ותכנון מערכת',
    },
    duration: { en: '1 week', he: 'שבוע' },
    description: {
      en: 'Conduct detailed roof measurements, shading analysis, structural assessment, and design the optimal solar system including equipment selection and production simulation.',
      he: 'ביצוע מדידות גג מפורטות, ניתוח הצללה, הערכה מבנית ותכנון המערכת הסולארית האופטימלית כולל בחירת ציוד וסימולציית ייצור.',
    },
    steps: [
      {
        title: { en: 'Detailed Roof Survey', he: 'סקר גג מפורט' },
        description: {
          en: 'Measure exact roof dimensions, slope angle, orientation (azimuth), and identify all penetrations, vents, and obstacles. Document structural members and load capacity.',
          he: 'מדידת מימדי גג מדויקים, זווית שיפוע, כיוון (אזימוט) וזיהוי כל החדירות, פתחי האוורור והמכשולים. תיעוד איברים מבניים וכושר עמידה בעומס.',
        },
        tips: {
          en: [
            'Use a drone for accurate measurements on difficult-to-access roofs',
            'Measure all roof planes — sometimes secondary planes have better orientation',
            'Check roof age and remaining lifespan — panels last 25+ years',
            'Document existing roof waterproofing condition',
          ],
          he: [
            'השתמשו ברחפן למדידות מדויקות בגגות קשי גישה',
            'מדדו את כל מישורי הגג — לפעמים למישורים משניים יש כיוון טוב יותר',
            'בדקו גיל הגג ואורך חיים נותר — פאנלים מחזיקים 25+ שנה',
            'תעדו מצב איטום גג קיים',
          ],
        },
        documents: {
          en: ['Detailed roof measurement sheet', 'Structural assessment form', 'Drone photography report'],
          he: ['גיליון מדידות גג מפורט', 'טופס הערכה מבנית', 'דו"ח צילום רחפן'],
        },
        tools: ['Drone', 'Laser Distance Meter', 'Compass', 'Inclinometer'],
      },
      {
        title: { en: 'Shading Analysis', he: 'ניתוח הצללה' },
        description: {
          en: 'Map all shading sources throughout the year using sun path analysis. Identify trees, neighboring buildings, chimneys, and water tanks that reduce solar production at different times.',
          he: 'מיפוי כל מקורות ההצללה לאורך השנה באמצעות ניתוח מסלול שמש. זיהוי עצים, בניינים שכנים, ארובות ומכלי מים שמפחיתים ייצור סולארי בזמנים שונים.',
        },
        tips: {
          en: [
            'Use SunCalc or Solar Pathfinder to trace shadow patterns year-round',
            'Winter shadows are longest — check December/June solstice shadows',
            'Even partial shading of one cell can reduce entire string output by 50%',
            'Consider microinverters or optimizers for partially shaded roofs',
          ],
          he: [
            'השתמשו ב-SunCalc או Solar Pathfinder לעקיבת דפוסי צל לאורך השנה',
            'צללי חורף הם הארוכים ביותר — בדקו צללי היפוך יוני/דצמבר',
            'אפילו הצללה חלקית של תא אחד יכולה להפחית תפוקת שרשרת שלמה ב-50%',
            'שקלו מיקרו-אינוורטרים או אופטימיזרים לגגות עם הצללה חלקית',
          ],
        },
        tools: ['SunCalc', 'Solar Pathfinder', 'PVsyst', 'SketchUp'],
      },
      {
        title: { en: 'System Design & Layout', he: 'תכנון מערכת ופריסה' },
        description: {
          en: 'Design the panel layout, determine string configuration, select inverter sizing, and optimize system for maximum energy production while respecting structural and code requirements.',
          he: 'תכנון פריסת פאנלים, קביעת תצורת שרשרות, בחירת גודל אינוורטר ואופטימיזציה של המערכת לייצור אנרגיה מקסימלי תוך עמידה בדרישות מבניות וקוד.',
        },
        tips: {
          en: [
            'Leave 50cm clearance from roof edges for wind load and maintenance access',
            'Match inverter capacity to panel array within 10% for optimal efficiency',
            'Consider string voltage limits — adjust panel count per string by temperature range',
            'Design for the customer consumption goal, not maximum roof capacity',
          ],
          he: [
            'השאירו 50 ס"מ פינוי מקצוות הגג לעומס רוח וגישת תחזוקה',
            'התאימו קיבולת אינוורטר למערך פאנלים בטווח 10% ליעילות אופטימלית',
            'שקלו מגבלות מתח שרשרת — התאימו מספר פאנלים לכל שרשרת לפי טווח טמפרטורות',
            'תכננו ליעד צריכת הלקוח, לא לקיבולת גג מקסימלית',
          ],
        },
        documents: {
          en: ['System design drawing', 'Panel layout diagram', 'Single-line electrical diagram'],
          he: ['שרטוט תכנון מערכת', 'תרשים פריסת פאנלים', 'תרשים חשמלי חד-קווי'],
        },
        tools: ['PVsyst', 'AutoCAD', 'Helioscope', 'SketchUp'],
      },
      {
        title: { en: 'Equipment Selection', he: 'בחירת ציוד' },
        description: {
          en: 'Select specific panel model, inverter, mounting system, cables, and protection devices based on design requirements, budget tier, and local availability.',
          he: 'בחירת דגם פאנל ספציפי, אינוורטר, מערכת הרכבה, כבלים והתקני הגנה בהתבסס על דרישות התכנון, רמת תקציב וזמינות מקומית.',
        },
        tips: {
          en: [
            'Select Tier-1 panels only — LONGi, JA Solar, Trina, or Canadian Solar',
            'Match inverter brand availability with local service support',
            'Factor in import lead times — some equipment takes 4-6 weeks to arrive',
            'Consider EPSE panels from San Juan for 10-15% cost savings on polycrystalline',
          ],
          he: [
            'בחרו רק פאנלים Tier-1 — LONGi, JA Solar, Trina, או Canadian Solar',
            'התאימו זמינות מותג אינוורטר עם תמיכת שירות מקומית',
            'הביאו בחשבון זמני אספקה ביבוא — חלק מהציוד לוקח 4-6 שבועות להגיע',
            'שקלו פאנלים של EPSE מסן חואן לחיסכון של 10-15% על פוליקריסטלי',
          ],
        },
        tools: ['Supplier Directory', 'PVsyst Component Database'],
      },
      {
        title: { en: 'Production Simulation', he: 'סימולציית ייצור' },
        description: {
          en: 'Run a detailed energy production simulation using local weather data, panel specifications, shading data, and system losses to predict annual energy yield and financial returns.',
          he: 'הרצת סימולציית ייצור אנרגיה מפורטת באמצעות נתוני מזג אוויר מקומיים, מפרטי פאנלים, נתוני הצללה והפסדי מערכת לחיזוי תפוקת אנרגיה שנתית ותשואות כספיות.',
        },
        tips: {
          en: [
            'Use NASA POWER or Meteonorm data for Argentine locations',
            'Apply realistic system losses: 14-18% total (soiling, wiring, inverter, temperature)',
            'Validate simulation against known installations in the same area',
            'Include 0.5-0.7% annual degradation rate for production projections',
          ],
          he: [
            'השתמשו בנתוני NASA POWER או Meteonorm למיקומים ארגנטינאיים',
            'החילו הפסדי מערכת ריאליסטיים: 14-18% סה"כ (לכלוך, כבילה, אינוורטר, טמפרטורה)',
            'אמתו סימולציה מול התקנות ידועות באותו אזור',
            'כללו שיעור ירידה שנתי של 0.5-0.7% לתחזיות ייצור',
          ],
        },
        tools: ['PVsyst', 'PVWatts', 'Google Solar API', 'Proposal Tool'],
      },
    ],
    deliverables: {
      en: [
        'Detailed roof survey report with measurements and photos',
        'Shading analysis report with annual shadow map',
        'Complete system design with panel layout and electrical diagrams',
        'Equipment specification sheet with selected components',
      ],
      he: [
        'דו"ח סקר גג מפורט עם מידות ותמונות',
        'דו"ח ניתוח הצללה עם מפת צל שנתית',
        'תכנון מערכת מלא עם פריסת פאנלים ותרשימים חשמליים',
        'גיליון מפרט ציוד עם רכיבים נבחרים',
      ],
    },
    risks: {
      en: [
        'Roof structural inadequacy discovered during detailed survey — require engineering assessment',
        'Shading more severe than estimated — reducing expected production significantly',
        'Equipment availability delays — check stock before finalizing design',
      ],
      he: [
        'חוסר התאמה מבנית של הגג שמתגלה בסקר מפורט — דורש הערכה הנדסית',
        'הצללה חמורה יותר מהמוערך — מפחיתה ייצור צפוי באופן משמעותי',
        'עיכובים בזמינות ציוד — בדקו מלאי לפני סיום התכנון',
      ],
    },
    costEstimate: {
      en: '$300-800 per project (survey + design labor)',
      he: '$300-800 לפרויקט (סקר + עבודת תכנון)',
    },
    icon: 'Ruler',
  },
  {
    id: 3,
    phase: 'proposal',
    title: {
      en: 'Proposal & Financing',
      he: 'הצעת מחיר ומימון',
    },
    duration: { en: '2-4 weeks', he: '2-4 שבועות' },
    description: {
      en: 'Generate a professional proposal with system specifications, financial analysis, financing options, negotiate terms, and collect the initial deposit to secure the project.',
      he: 'הכנת הצעת מחיר מקצועית עם מפרטי מערכת, ניתוח פיננסי, אפשרויות מימון, משא ומתן על תנאים וגביית פיקדון ראשוני להבטחת הפרויקט.',
    },
    steps: [
      {
        title: { en: 'Generate Professional Proposal', he: 'הכנת הצעת מחיר מקצועית' },
        description: {
          en: 'Create a comprehensive proposal document including system specifications, energy production estimates, financial analysis (ROI, IRR, NPV, payback), environmental impact, and installation timeline.',
          he: 'יצירת מסמך הצעה מקיף הכולל מפרטי מערכת, אומדני ייצור אנרגיה, ניתוח פיננסי (ROI, IRR, NPV, החזר), השפעה סביבתית ולוח זמנים להתקנה.',
        },
        tips: {
          en: [
            'Use the Proposal Tool to generate accurate financial projections',
            'Include at least 2 system options (good/better) for customer comparison',
            'Show monthly savings in ARS — customers relate to immediate bill reduction',
            'Add environmental impact metrics — CO2 reduction resonates with many buyers',
          ],
          he: [
            'השתמשו בכלי הצעת המחיר ליצירת תחזיות פיננסיות מדויקות',
            'כללו לפחות 2 אפשרויות מערכת (טובה/טובה יותר) להשוואת הלקוח',
            'הציגו חיסכון חודשי ב-ARS — לקוחות מתחברים להפחתת חשבון מיידית',
            'הוסיפו מדדי השפעה סביבתית — הפחתת CO2 מהדהדת אצל קונים רבים',
          ],
        },
        documents: {
          en: ['Proposal document (PDF)', 'System specification sheet', 'Financial projection spreadsheet'],
          he: ['מסמך הצעה (PDF)', 'גיליון מפרט מערכת', 'גיליון תחזית פיננסית'],
        },
        tools: ['Proposal Tool', 'Canva/Adobe', 'Excel/Sheets'],
      },
      {
        title: { en: 'Pricing & Cost Breakdown', he: 'תמחור ופירוט עלויות' },
        description: {
          en: 'Build a transparent cost breakdown covering equipment, installation labor, permitting fees, grid connection costs, and warranty/maintenance packages.',
          he: 'בניית פירוט עלויות שקוף הכולל ציוד, עבודת התקנה, אגרות רישוי, עלויות חיבור לרשת וחבילות אחריות/תחזוקה.',
        },
        tips: {
          en: [
            'Price in USD for equipment (hedges against ARS inflation) and ARS for labor',
            'Include a 5-10% contingency buffer for unexpected costs',
            'Be transparent about what is included vs optional extras',
            'Benchmark against market average: $1,400-1,750 USD/kWp installed',
          ],
          he: [
            'תמחרו ב-USD לציוד (הגנה מאינפלציית ARS) וב-ARS לעבודה',
            'כללו חיץ מגירה של 5-10% לעלויות בלתי צפויות',
            'היו שקופים לגבי מה כלול מול תוספות אופציונליות',
            'השוו מול ממוצע שוק: $1,400-1,750 USD/kWp מותקן',
          ],
        },
        tools: ['Cost Calculator', 'Supplier Price Lists'],
      },
      {
        title: { en: 'Financing Options', he: 'אפשרויות מימון' },
        description: {
          en: 'Present available financing mechanisms: cash purchase, bank loans (Banco Nacion green credit), provincial subsidies, on-bill financing, and lease options where available.',
          he: 'הצגת מנגנוני מימון זמינים: רכישה במזומן, הלוואות בנקאיות (אשראי ירוק בנקו נסיון), סובסידיות פרובינציאליות, מימון על חשבון ואפשרויות ליסינג היכן שזמינות.',
        },
        tips: {
          en: [
            'Banco Nacion offers subsidized green credit lines — check current terms',
            'Some provinces offer tax credits or reduced IVA on solar equipment',
            'Financing that matches monthly payments to electricity savings sells better',
            'Offer a discount for full cash payment to improve your cash flow',
          ],
          he: [
            'בנקו נסיון מציע קווי אשראי ירוק מסובסדים — בדקו תנאים עדכניים',
            'חלק מהפרובינציות מציעות זיכויי מס או IVA מופחת על ציוד סולארי',
            'מימון שמתאים תשלומים חודשיים לחיסכון בחשמל נמכר טוב יותר',
            'הציעו הנחה לתשלום מזומן מלא כדי לשפר את תזרים המזומנים שלכם',
          ],
        },
        documents: {
          en: ['Financing comparison sheet', 'Bank loan requirements', 'Subsidy application forms'],
          he: ['גיליון השוואת מימון', 'דרישות הלוואה בנקאית', 'טופסי בקשת סובסידיה'],
        },
      },
      {
        title: { en: 'Negotiation & Closing', he: 'משא ומתן וסגירה' },
        description: {
          en: 'Present the proposal to the customer, address questions and objections, negotiate pricing if needed, and close the deal with a signed agreement.',
          he: 'הצגת ההצעה ללקוח, מענה לשאלות והתנגדויות, משא ומתן על מחיר במידת הצורך וסגירת העסקה עם הסכם חתום.',
        },
        tips: {
          en: [
            'Present proposals in person — conversion rates are 3x higher than email',
            'Focus on savings and payback, not technical specifications',
            'Have a "limited time" incentive ready (e.g., free monitoring for 1 year)',
            'Always get a signed contract before ordering any equipment',
          ],
          he: [
            'הציגו הצעות פנים אל פנים — שיעורי המרה גבוהים פי 3 מאימייל',
            'התמקדו בחיסכון והחזר, לא במפרטים טכניים',
            'הכינו תמריץ "זמן מוגבל" (למשל, ניטור חינם לשנה)',
            'תמיד קבלו חוזה חתום לפני הזמנת כל ציוד',
          ],
        },
        documents: {
          en: ['Sales contract template', 'Terms and conditions', 'Payment schedule'],
          he: ['תבנית חוזה מכירה', 'תנאים והגבלות', 'לוח תשלומים'],
        },
      },
      {
        title: { en: 'Deposit Collection', he: 'גביית פיקדון' },
        description: {
          en: 'Collect the initial deposit (typically 30-50% of project cost) to secure the project and initiate equipment procurement. Set up payment milestones for the remainder.',
          he: 'גביית פיקדון ראשוני (בדרך כלל 30-50% מעלות הפרויקט) להבטחת הפרויקט ולהתחלת רכש ציוד. הגדרת אבני דרך תשלום ליתרה.',
        },
        tips: {
          en: [
            'Standard deposit is 30-50% upfront, 40% at installation start, 10-30% at commissioning',
            'Accept USD deposits to protect against ARS devaluation',
            'Provide a receipt with project specifications and timeline commitments',
            'Never start procurement without a signed contract and deposit in hand',
          ],
          he: [
            'פיקדון סטנדרטי הוא 30-50% מראש, 40% בתחילת התקנה, 10-30% בהפעלה',
            'קבלו פיקדונות ב-USD להגנה מפיחות ARS',
            'ספקו קבלה עם מפרטי פרויקט והתחייבויות לוח זמנים',
            'לעולם אל תתחילו רכש ללא חוזה חתום ופיקדון בידיים',
          ],
        },
        documents: {
          en: ['Payment receipt', 'Project timeline commitment'],
          he: ['קבלת תשלום', 'התחייבות לוח זמנים פרויקט'],
        },
      },
    ],
    deliverables: {
      en: [
        'Professional proposal document with financial analysis',
        'Signed sales contract with payment schedule',
        'Collected deposit and payment receipt',
      ],
      he: [
        'מסמך הצעה מקצועי עם ניתוח פיננסי',
        'חוזה מכירה חתום עם לוח תשלומים',
        'פיקדון שנגבה וקבלת תשלום',
      ],
    },
    risks: {
      en: [
        'ARS currency devaluation between proposal and equipment purchase — price in USD or add inflation clause',
        'Customer comparison shopping with competitors — differentiate on service quality and warranties',
        'Financing delays from banks — have alternative financing options ready',
      ],
      he: [
        'פיחות מטבע ARS בין הצעה לרכישת ציוד — תמחרו ב-USD או הוסיפו סעיף אינפלציה',
        'לקוח משווה מחירים עם מתחרים — התבדלו באיכות שירות ואחריות',
        'עיכובי מימון מבנקים — הכינו אפשרויות מימון חלופיות',
      ],
    },
    costEstimate: {
      en: '$100-300 per project (proposal preparation + meetings)',
      he: '$100-300 לפרויקט (הכנת הצעה + פגישות)',
    },
    icon: 'FileText',
  },
  {
    id: 4,
    phase: 'permitting',
    title: {
      en: 'Permitting & Licensing',
      he: 'היתרים ורישוי',
    },
    duration: { en: '3-4 weeks', he: '3-4 שבועות' },
    description: {
      en: 'Obtain all required permits and regulatory approvals: municipal construction permit, utility grid connection application, CAMMESA registration, meter change request, and pre-installation inspection.',
      he: 'קבלת כל ההיתרים והאישורים הרגולטוריים הנדרשים: היתר בנייה עירוני, בקשת חיבור לרשת מחברת החשמל, רישום CAMMESA, בקשת החלפת מונה ובדיקה טרום-התקנה.',
    },
    steps: [
      {
        title: { en: 'Municipal Permit Application', he: 'בקשת היתר עירוני' },
        description: {
          en: 'Apply for a construction/installation permit from the local municipality. Requirements vary by city but generally include structural plans, electrical diagrams, and proof of professional oversight.',
          he: 'הגשת בקשה להיתר בנייה/התקנה מהרשות המקומית. הדרישות משתנות לפי עיר אך כוללות בדרך כלל תוכניות מבניות, תרשימים חשמליים והוכחת פיקוח מקצועי.',
        },
        tips: {
          en: [
            'Start the permit process immediately after contract signing — it is often the bottleneck',
            'Some municipalities exempt solar under a certain size from permits — check local rules',
            'Have a licensed engineer sign off on structural calculations',
            'Keep copies of all submissions — municipal offices sometimes lose paperwork',
          ],
          he: [
            'התחילו תהליך ההיתר מיד אחרי חתימת החוזה — זה לעתים קרובות צוואר הבקבוק',
            'חלק מהעיריות פוטרות סולארי מתחת לגודל מסוים מהיתרים — בדקו כללים מקומיים',
            'בקשו מהנדס מורשה לאשר חישובים מבניים',
            'שמרו עותקים של כל ההגשות — משרדי עירייה לפעמים מאבדים ניירת',
          ],
        },
        documents: {
          en: ['Structural engineering plans', 'Electrical single-line diagram', 'Engineer certification', 'Property deed copy'],
          he: ['תוכניות הנדסה מבנית', 'תרשים חשמלי חד-קווי', 'אישור מהנדס', 'העתק נסח טאבו'],
        },
      },
      {
        title: { en: 'Utility Grid Connection Application', he: 'בקשת חיבור לרשת חשמל' },
        description: {
          en: 'Submit a grid connection application to the local distribution company (EDENOR, EDESUR, or provincial utility) under Ley 27.424 distributed generation framework.',
          he: 'הגשת בקשת חיבור לרשת לחברת חלוקה מקומית (EDENOR, EDESUR, או חברת חשמל פרובינציאלית) במסגרת חוק 27.424 לייצור מבוזר.',
        },
        tips: {
          en: [
            'Each utility has its own application form and process — check their website',
            'Include all technical specifications: panel wattage, inverter model, system capacity',
            'Response times vary: EDENOR 15-30 days, EDESUR 20-40 days, provincial utilities 30-60 days',
            'Follow up weekly — applications sometimes get stuck in review queues',
          ],
          he: [
            'לכל חברת חשמל יש טופס ותהליך בקשה משלה — בדקו באתר שלהם',
            'כללו את כל המפרטים הטכניים: הספק פאנל, דגם אינוורטר, קיבולת מערכת',
            'זמני תגובה משתנים: EDENOR 15-30 יום, EDESUR 20-40 יום, חברות פרובינציאליות 30-60 יום',
            'עקבו שבועית — בקשות לפעמים נתקעות בתורי בדיקה',
          ],
        },
        documents: {
          en: ['Grid connection application form', 'Technical data sheet', 'Inverter certification', 'Insurance certificate'],
          he: ['טופס בקשת חיבור לרשת', 'גיליון נתונים טכניים', 'אישור אינוורטר', 'תעודת ביטוח'],
        },
      },
      {
        title: { en: 'CAMMESA Registration', he: 'רישום CAMMESA' },
        description: {
          en: 'Register the installation with CAMMESA (Compania Administradora del Mercado Mayorista Electrico) as required by Ley 27.424 for distributed generation prosumer status.',
          he: 'רישום ההתקנה ב-CAMMESA (חברת מנהלת שוק החשמל הסיטונאי) כנדרש בחוק 27.424 לסטטוס צרכן-יצרן בייצור מבוזר.',
        },
        tips: {
          en: [
            'CAMMESA registration can be done online at their portal',
            'Keep the prosumer registration number — needed for grid connection completion',
            'Registration is free but requires all installation technical details',
            'Some provinces handle CAMMESA registration through the local utility',
          ],
          he: [
            'רישום CAMMESA ניתן לביצוע באינטרנט בפורטל שלהם',
            'שמרו את מספר רישום הצרכן-יצרן — נדרש להשלמת חיבור לרשת',
            'הרישום חינמי אך דורש את כל הפרטים הטכניים של ההתקנה',
            'חלק מהפרובינציות מטפלות ברישום CAMMESA דרך חברת החשמל המקומית',
          ],
        },
        documents: {
          en: ['CAMMESA registration form', 'Technical specification summary', 'Installer credentials'],
          he: ['טופס רישום CAMMESA', 'סיכום מפרט טכני', 'אישורי מתקין'],
        },
      },
      {
        title: { en: 'Meter Change Request', he: 'בקשת החלפת מונה' },
        description: {
          en: 'Request a bidirectional meter installation from the utility company to enable net billing — measuring both consumption from and injection into the grid.',
          he: 'בקשת התקנת מונה דו-כיווני מחברת החשמל לאפשרות net billing — מדידת צריכה מהרשת והזרקה לרשת כאחד.',
        },
        tips: {
          en: [
            'The utility usually installs the bidirectional meter at their cost',
            'Meter change can take 2-4 weeks after approval — plan timeline accordingly',
            'Some provinces require the meter change before system commissioning',
            'Document the old meter reading before replacement for billing clarity',
          ],
          he: [
            'חברת החשמל בדרך כלל מתקינה את המונה הדו-כיווני על חשבונה',
            'החלפת מונה יכולה לקחת 2-4 שבועות אחרי אישור — תכננו לוח זמנים בהתאם',
            'חלק מהפרובינציות דורשות החלפת מונה לפני הפעלת המערכת',
            'תעדו את קריאת המונה הישן לפני ההחלפה לבהירות חיוב',
          ],
        },
      },
      {
        title: { en: 'Pre-Installation Inspection', he: 'בדיקה טרום-התקנה' },
        description: {
          en: 'Some utilities and municipalities require a pre-installation inspection to verify the site meets requirements before construction begins. Schedule and pass this inspection.',
          he: 'חלק מחברות החשמל והעיריות דורשות בדיקה טרום-התקנה לאימות שהאתר עומד בדרישות לפני תחילת הבנייה. תזמנו ועברו בדיקה זו.',
        },
        tips: {
          en: [
            'Not all jurisdictions require pre-installation inspection — confirm with your utility',
            'Ensure electrical panel is up to code before the inspector arrives',
            'Have all approved plans and permits on site during inspection',
            'Address any deficiencies immediately to avoid installation delays',
          ],
          he: [
            'לא כל הרשויות דורשות בדיקה טרום-התקנה — אשרו עם חברת החשמל שלכם',
            'ודאו שלוח החשמל עומד בתקן לפני הגעת המפקח',
            'הכינו את כל התוכניות המאושרות וההיתרים באתר בזמן הבדיקה',
            'טפלו בכל ליקויים מיד כדי להימנע מעיכובי התקנה',
          ],
        },
        documents: {
          en: ['Approved permits', 'Technical plans', 'Insurance documentation'],
          he: ['היתרים מאושרים', 'תוכניות טכניות', 'תיעוד ביטוח'],
        },
      },
    ],
    deliverables: {
      en: [
        'Approved municipal construction permit',
        'Utility grid connection approval letter',
        'CAMMESA prosumer registration number',
        'Meter change authorization',
      ],
      he: [
        'היתר בנייה עירוני מאושר',
        'מכתב אישור חיבור לרשת מחברת החשמל',
        'מספר רישום צרכן-יצרן CAMMESA',
        'הרשאת החלפת מונה',
      ],
    },
    risks: {
      en: [
        'Permit delays from municipal bureaucracy — apply early and follow up frequently',
        'Utility rejection due to grid capacity limitations — check capacity before system design',
        'Changing regulatory requirements mid-process — stay current with CAMMESA updates',
      ],
      he: [
        'עיכובי היתרים מביורוקרטיה עירונית — הגישו מוקדם ועקבו בתדירות',
        'דחייה מחברת חשמל בגלל מגבלות קיבולת רשת — בדקו קיבולת לפני תכנון מערכת',
        'שינויים בדרישות רגולטוריות באמצע התהליך — הישארו מעודכנים בעדכוני CAMMESA',
      ],
    },
    icon: 'Shield',
  },
  {
    id: 5,
    phase: 'procurement',
    title: {
      en: 'Procurement & Logistics',
      he: 'רכש ולוגיסטיקה',
    },
    duration: { en: '2-4 weeks', he: '2-4 שבועות' },
    description: {
      en: 'Order equipment from suppliers, manage import logistics and customs clearance, arrange warehousing, and coordinate delivery to the installation site.',
      he: 'הזמנת ציוד מספקים, ניהול לוגיסטיקת יבוא ושחרור מכס, ארגון מחסנים ותיאום משלוח לאתר ההתקנה.',
    },
    steps: [
      {
        title: { en: 'Equipment Ordering', he: 'הזמנת ציוד' },
        description: {
          en: 'Place orders for all system components: panels, inverter(s), mounting structure, cables, protection devices, and accessories. Confirm availability, lead times, and pricing.',
          he: 'הזמנת כל רכיבי המערכת: פאנלים, אינוורטר(ים), מבנה הרכבה, כבלים, התקני הגנה ואביזרים. אישור זמינות, זמני אספקה ותמחור.',
        },
        tips: {
          en: [
            'Order all equipment from the same supplier when possible for better pricing and logistics',
            'Confirm pricing in writing — verbal quotes are not binding in Argentina',
            'Request product certificates and warranties with the order',
            'Order 2-3% extra panels as replacement stock for potential damage during installation',
          ],
          he: [
            'הזמינו את כל הציוד מאותו ספק כשאפשר לתמחור ולוגיסטיקה טובים יותר',
            'אשרו תמחור בכתב — הצעות מחיר מילוליות אינן מחייבות בארגנטינה',
            'בקשו תעודות מוצר ואחריות עם ההזמנה',
            'הזמינו 2-3% פאנלים נוספים כמלאי חילופי לנזק אפשרי בהתקנה',
          ],
        },
        documents: {
          en: ['Purchase order', 'Supplier quote confirmation', 'Product certificates'],
          he: ['הזמנת רכש', 'אישור הצעת מחיר ספק', 'תעודות מוצר'],
        },
        tools: ['Supplier Directory'],
      },
      {
        title: { en: 'Import & Customs Clearance', he: 'יבוא ושחרור מכס' },
        description: {
          en: 'For imported equipment, manage customs clearance including tariff classification, duty payment, and obtaining necessary import permits. Solar equipment tariffs range from 0-5%.',
          he: 'לציוד מיובא, ניהול שחרור מכס כולל סיווג מכסי, תשלום מכס וקבלת היתרי יבוא נדרשים. מכסי ציוד סולארי נעים בין 0-5%.',
        },
        tips: {
          en: [
            'Use a customs broker experienced with renewable energy equipment imports',
            'Solar panels and inverters qualify for reduced tariffs under renewable energy incentives',
            'Factor in customs processing time: typically 5-10 business days in Buenos Aires',
            'Ensure all product certifications are translated to Spanish and notarized',
          ],
          he: [
            'השתמשו בעמיל מכס מנוסה ביבוא ציוד אנרגיה מתחדשת',
            'פאנלים סולאריים ואינוורטרים זכאים למכסים מופחתים במסגרת תמריצי אנרגיה מתחדשת',
            'הביאו בחשבון זמן עיבוד מכס: בדרך כלל 5-10 ימי עסקים בבואנוס איירס',
            'ודאו שכל תעודות המוצר מתורגמות לספרדית ומנוטריזות',
          ],
        },
        documents: {
          en: ['Import declaration', 'Customs classification certificate', 'Product origin certificates'],
          he: ['הצהרת יבוא', 'תעודת סיווג מכס', 'תעודות מקור מוצר'],
        },
      },
      {
        title: { en: 'Warehousing & Storage', he: 'מחסנים ואחסון' },
        description: {
          en: 'Arrange secure, dry storage for equipment between delivery and installation. Protect panels from damage and ensure inverters are stored within temperature specifications.',
          he: 'ארגון אחסון מאובטח ויבש לציוד בין אספקה להתקנה. הגנה על פאנלים מפני נזק וודאו שאינוורטרים מאוחסנים בטווח טמפרטורות המפרט.',
        },
        tips: {
          en: [
            'Store panels flat or at a slight angle — never stand them vertically without support',
            'Keep panels in original packaging until installation day to prevent scratches',
            'Warehouse should be dry, ventilated, and secure from theft',
            'Inspect all equipment upon delivery and document any damage for insurance claims',
          ],
          he: [
            'אחסנו פאנלים בשכיבה או בזווית קלה — לעולם אל תעמידו אותם אנכית ללא תמיכה',
            'שמרו פאנלים באריזה מקורית עד יום ההתקנה למניעת שריטות',
            'המחסן צריך להיות יבש, מאוורר ומאובטח מפני גניבה',
            'בדקו את כל הציוד בקבלה ותעדו כל נזק לתביעות ביטוח',
          ],
        },
      },
      {
        title: { en: 'Delivery Coordination', he: 'תיאום משלוח' },
        description: {
          en: 'Coordinate delivery of equipment to the installation site. Ensure proper handling, verify quantities match the order, and stage materials for efficient installation.',
          he: 'תיאום משלוח ציוד לאתר ההתקנה. הבטחת טיפול נכון, אימות כמויות תואמות את ההזמנה וסידור חומרים להתקנה יעילה.',
        },
        tips: {
          en: [
            'Schedule delivery 1-2 days before installation start to verify equipment',
            'Ensure the delivery truck has a hydraulic lift for heavy pallet loads',
            'Have at least 2 people on site to receive and move panels safely',
            'Stage materials in installation order: mounting first, then panels, then electrical',
          ],
          he: [
            'תזמנו משלוח 1-2 ימים לפני תחילת ההתקנה לאימות ציוד',
            'ודאו שלמשאית המשלוח יש מעלית הידראולית לעומסי משטחים כבדים',
            'דאגו ללפחות 2 אנשים באתר לקבלה והזזת פאנלים בבטחה',
            'סדרו חומרים בסדר ההתקנה: הרכבה תחילה, אז פאנלים, אז חשמל',
          ],
        },
      },
    ],
    deliverables: {
      en: [
        'All equipment received and inspected at warehouse',
        'Customs clearance documentation completed',
        'Equipment staged and ready for installation delivery',
      ],
      he: [
        'כל הציוד התקבל ונבדק במחסן',
        'תיעוד שחרור מכס הושלם',
        'ציוד מסודר ומוכן למשלוח התקנה',
      ],
    },
    risks: {
      en: [
        'Equipment shipping delays — order early and have backup supplier contacts',
        'Customs complications extending clearance time — use experienced brokers',
        'Equipment damage during transport — insure shipments and document condition',
      ],
      he: [
        'עיכובי משלוח ציוד — הזמינו מוקדם ושמרו אנשי קשר ספקים חלופיים',
        'סיבוכי מכס המאריכים זמן שחרור — השתמשו בעמילים מנוסים',
        'נזק לציוד במהלך הובלה — בטחו משלוחים ותעדו מצב',
      ],
    },
    costEstimate: {
      en: '$500-2,000 per project (logistics, customs, storage)',
      he: '$500-2,000 לפרויקט (לוגיסטיקה, מכס, אחסון)',
    },
    icon: 'Truck',
  },
  {
    id: 6,
    phase: 'installation',
    title: {
      en: 'Installation & Commissioning',
      he: 'התקנה והפעלה',
    },
    duration: { en: '1-2 weeks', he: '1-2 שבועות' },
    description: {
      en: 'Execute the physical installation: site preparation, mounting structure assembly, panel installation, electrical wiring, inverter setup, system testing, and generate commissioning documentation.',
      he: 'ביצוע ההתקנה הפיזית: הכנת אתר, הרכבת מבנה הרכבה, התקנת פאנלים, חיווט חשמלי, התקנת אינוורטר, בדיקות מערכת ויצירת תיעוד הפעלה.',
    },
    steps: [
      {
        title: { en: 'Site Preparation', he: 'הכנת אתר' },
        description: {
          en: 'Prepare the installation site: clear the roof area, set up safety equipment, stage materials, and brief the installation team on the project plan and safety protocols.',
          he: 'הכנת אתר ההתקנה: פינוי שטח הגג, הקמת ציוד בטיחות, סידור חומרים ותדרוך צוות ההתקנה על תוכנית הפרויקט ופרוטוקולי בטיחות.',
        },
        tips: {
          en: [
            'Install fall protection equipment before any roof work begins',
            'Brief all workers on emergency procedures and nearest hospital location',
            'Protect landscaping and surfaces with drop cloths below work areas',
            'Set up a materials staging area as close to the roof access point as possible',
          ],
          he: [
            'התקינו ציוד הגנה מנפילה לפני תחילת כל עבודה על הגג',
            'תדרכו את כל העובדים על נהלי חירום ומיקום בית החולים הקרוב',
            'הגנו על גינון ומשטחים עם בדי שמירה מתחת לאזורי עבודה',
            'הקימו אזור סידור חומרים קרוב ככל האפשר לנקודת הגישה לגג',
          ],
        },
        tools: ['Safety harnesses', 'Hard hats', 'First aid kit'],
      },
      {
        title: { en: 'Mounting Structure Assembly', he: 'הרכבת מבנה הרכבה' },
        description: {
          en: 'Install the mounting rails, brackets, and clamps on the roof according to the design layout. Ensure proper waterproofing at all roof penetration points.',
          he: 'התקנת פסי ההרכבה, סוגרים ומהדקים על הגג בהתאם לפריסת התכנון. הבטחת איטום תקין בכל נקודות החדירה לגג.',
        },
        tips: {
          en: [
            'Use stainless steel or aluminum hardware to prevent corrosion',
            'Apply flashing and sealant at every roof penetration point',
            'Check rail alignment with a level — misaligned rails cause panel stress',
            'Torque all bolts to manufacturer specifications',
          ],
          he: [
            'השתמשו בחומרת נירוסטה או אלומיניום למניעת קורוזיה',
            'החילו פלאשינג ואיטום בכל נקודת חדירה לגג',
            'בדקו יישור פסים עם פלס — פסים לא מיושרים גורמים ללחץ על פאנלים',
            'הדקו את כל הברגים למפרט היצרן',
          ],
        },
        tools: ['Drill', 'Level', 'Torque wrench', 'Flashing kit'],
      },
      {
        title: { en: 'Panel Installation', he: 'התקנת פאנלים' },
        description: {
          en: 'Mount solar panels onto the racking system, secure with clamps, and connect panels in the designed string configuration. Handle panels carefully to avoid micro-cracks.',
          he: 'הרכבת פאנלים סולאריים על מערכת הפסים, חיזוק עם מהדקים וחיבור פאנלים בתצורת השרשרת המתוכננת. טיפול זהיר בפאנלים למניעת סדקים זעירים.',
        },
        tips: {
          en: [
            'Never stand on panels or place them face-down on hard surfaces',
            'Use mid-clamps between panels and end-clamps at row edges',
            'Connect panels in strings as designed — do not change string configuration in the field',
            'Ground each panel frame to the mounting system per electrical code',
          ],
          he: [
            'לעולם אל תעמדו על פאנלים או תניחו אותם הפוך על משטחים קשים',
            'השתמשו במהדקי אמצע בין פאנלים ומהדקי קצה בשולי שורות',
            'חברו פאנלים בשרשרות כמתוכנן — אל תשנו תצורת שרשרת בשטח',
            'הארקת כל מסגרת פאנל למערכת ההרכבה לפי קוד חשמלי',
          ],
        },
      },
      {
        title: { en: 'Electrical Wiring & Inverter', he: 'חיווט חשמלי ואינוורטר' },
        description: {
          en: 'Run DC cables from panel strings to the inverter, install the inverter, connect AC output to the electrical panel, and install all required protection devices (DC disconnect, AC breaker, surge protector).',
          he: 'הנחת כבלי DC ממיתרי פאנלים לאינוורטר, התקנת אינוורטר, חיבור פלט AC ללוח החשמל והתקנת כל התקני ההגנה הנדרשים (מנתק DC, מפסק AC, מגן נחשולים).',
        },
        tips: {
          en: [
            'All DC wiring must use solar-rated cables (PV1-F or equivalent)',
            'Install the inverter in a shaded, ventilated location — direct sun reduces efficiency',
            'Label all cables, breakers, and disconnects clearly for future maintenance',
            'Ensure proper cable management — UV-resistant ties and conduit on exposed runs',
          ],
          he: [
            'כל חיווט DC חייב להשתמש בכבלים מדורגי סולארי (PV1-F או שווה ערך)',
            'התקינו את האינוורטר במיקום מוצל ומאוורר — שמש ישירה מפחיתה יעילות',
            'סמנו את כל הכבלים, המפסקים והמנתקים בבירור לתחזוקה עתידית',
            'הבטיחו ניהול כבלים תקין — קשרים עמידי UV וצנרת על מסלולים חשופים',
          ],
        },
        tools: ['Crimping tool', 'Multimeter', 'Cable tester', 'Conduit bender'],
      },
      {
        title: { en: 'System Testing', he: 'בדיקות מערכת' },
        description: {
          en: 'Perform comprehensive testing: open circuit voltage per string, insulation resistance, ground fault checks, inverter startup verification, and AC output power quality measurements.',
          he: 'ביצוע בדיקות מקיפות: מתח מעגל פתוח לכל שרשרת, עמידות בידוד, בדיקות תקלת הארקה, אימות הפעלת אינוורטר ומדידות איכות חשמל פלט AC.',
        },
        tips: {
          en: [
            'Test each string individually before connecting to the inverter',
            'Open circuit voltage should match the design calculation within 5%',
            'Verify inverter firmware is updated to the latest version',
            'Run the system for at least 2 hours and monitor for any alarms',
          ],
          he: [
            'בדקו כל שרשרת בנפרד לפני חיבור לאינוורטר',
            'מתח מעגל פתוח צריך להתאים לחישוב התכנון בטווח 5%',
            'ודאו שקושחת האינוורטר מעודכנת לגרסה העדכנית ביותר',
            'הריצו את המערכת לפחות שעתיים ועקבו אחר כל התרעה',
          ],
        },
        documents: {
          en: ['String test results', 'Insulation test report', 'Inverter commissioning log'],
          he: ['תוצאות בדיקת שרשרת', 'דו"ח בדיקת בידוד', 'יומן הפעלת אינוורטר'],
        },
        tools: ['Multimeter', 'Insulation tester', 'Clamp meter', 'Power analyzer'],
      },
      {
        title: { en: 'Commissioning Report', he: 'דו"ח הפעלה' },
        description: {
          en: 'Generate the official commissioning report documenting all test results, as-built specifications, photo documentation, and system performance verification. This is required for utility approval.',
          he: 'יצירת דו"ח ההפעלה הרשמי המתעד את כל תוצאות הבדיקות, מפרטים כ-בנוי, תיעוד צילומי ואימות ביצועי מערכת. זה נדרש לאישור חברת חשמל.',
        },
        tips: {
          en: [
            'Include photos of every major component installation step',
            'Document serial numbers of all major equipment (panels, inverter, meter)',
            'The commissioning report is a legal document — ensure accuracy',
            'Provide the customer with a copy for their records and warranty claims',
          ],
          he: [
            'כללו תמונות של כל שלב התקנה מרכזי',
            'תעדו מספרים סידוריים של כל ציוד מרכזי (פאנלים, אינוורטר, מונה)',
            'דו"ח ההפעלה הוא מסמך משפטי — הבטיחו דיוק',
            'ספקו ללקוח עותק לרשומותיו ותביעות אחריות',
          ],
        },
        documents: {
          en: ['Commissioning report', 'As-built drawings', 'Equipment serial number log', 'Test certificates'],
          he: ['דו"ח הפעלה', 'שרטוטי כ-בנוי', 'יומן מספרים סידוריים ציוד', 'תעודות בדיקה'],
        },
      },
    ],
    deliverables: {
      en: [
        'Completed physical installation on roof',
        'All testing passed with documented results',
        'Official commissioning report',
        'As-built documentation package',
      ],
      he: [
        'התקנה פיזית מושלמת על הגג',
        'כל הבדיקות עברו עם תוצאות מתועדות',
        'דו"ח הפעלה רשמי',
        'חבילת תיעוד כ-בנוי',
      ],
    },
    risks: {
      en: [
        'Weather delays during installation — schedule 2-3 buffer days',
        'Worker safety incidents on roof — enforce strict safety protocols and insurance',
        'Equipment defects discovered during testing — have supplier warranty process ready',
      ],
      he: [
        'עיכובי מזג אוויר בהתקנה — תזמנו 2-3 ימי חיץ',
        'תאונות בטיחות עובדים על הגג — אכפו פרוטוקולי בטיחות קפדניים וביטוח',
        'פגמי ציוד שמתגלים בבדיקות — הכינו תהליך אחריות ספק מוכן',
      ],
    },
    costEstimate: {
      en: '$400-700 per kWp (installation labor)',
      he: '$400-700 לכל kWp (עבודת התקנה)',
    },
    icon: 'Wrench',
  },
  {
    id: 7,
    phase: 'connection',
    title: {
      en: 'Grid Connection & Monitoring',
      he: 'חיבור לרשת וניטור',
    },
    duration: { en: '2-4 weeks', he: '2-4 שבועות' },
    description: {
      en: 'Complete the grid connection process: utility final inspection, bidirectional meter installation, system activation approval, monitoring setup, customer training, and warranty activation.',
      he: 'השלמת תהליך החיבור לרשת: בדיקה סופית של חברת חשמל, התקנת מונה דו-כיווני, אישור הפעלת מערכת, הגדרת ניטור, הדרכת לקוח והפעלת אחריות.',
    },
    steps: [
      {
        title: { en: 'Utility Final Inspection', he: 'בדיקה סופית של חברת חשמל' },
        description: {
          en: 'Schedule and pass the utility company final inspection of the completed installation. The inspector verifies compliance with grid connection standards and safety requirements.',
          he: 'תזמון ומעבר הבדיקה הסופית של חברת החשמל של ההתקנה המושלמת. המפקח מאמת עמידה בתקני חיבור לרשת ודרישות בטיחות.',
        },
        tips: {
          en: [
            'Schedule the inspection as soon as installation is complete — wait times can be 1-3 weeks',
            'Have the commissioning report and all permits ready for the inspector',
            'Ensure all labeling and safety signage is in place before inspection',
            'Be present during the inspection to answer any technical questions',
          ],
          he: [
            'תזמנו את הבדיקה ברגע שההתקנה הושלמה — זמני המתנה יכולים להיות 1-3 שבועות',
            'הכינו את דו"ח ההפעלה וכל ההיתרים עבור המפקח',
            'ודאו שכל השילוט והסימון הם במקום לפני הבדיקה',
            'היו נוכחים בזמן הבדיקה כדי לענות על שאלות טכניות',
          ],
        },
        documents: {
          en: ['Commissioning report', 'All permits and approvals', 'Equipment certifications'],
          he: ['דו"ח הפעלה', 'כל ההיתרים והאישורים', 'אישורי ציוד'],
        },
      },
      {
        title: { en: 'Bidirectional Meter Installation', he: 'התקנת מונה דו-כיווני' },
        description: {
          en: 'The utility installs the bidirectional meter that measures both consumption from the grid and energy injection back into the grid for net billing credits.',
          he: 'חברת החשמל מתקינה את המונה הדו-כיווני שמודד הן צריכה מהרשת והן הזרקת אנרגיה חזרה לרשת לזיכויי net billing.',
        },
        tips: {
          en: [
            'Document the old meter final reading and new meter initial reading',
            'Verify the bidirectional meter is recording both import and export correctly',
            'The meter change is typically done by the utility at no charge to the customer',
            'Keep the meter installation receipt for your records',
          ],
          he: [
            'תעדו את קריאת המונה הישן הסופית וקריאת המונה החדש הראשונית',
            'ודאו שהמונה הדו-כיווני מקליט הן יבוא והן יצוא בצורה נכונה',
            'החלפת המונה נעשית בדרך כלל על ידי חברת החשמל ללא תשלום ללקוח',
            'שמרו את קבלת התקנת המונה לרשומות שלכם',
          ],
        },
      },
      {
        title: { en: 'Grid Connection Approval', he: 'אישור חיבור לרשת' },
        description: {
          en: 'Receive the official grid connection approval from the utility company, activating the net billing arrangement and allowing the system to export excess energy.',
          he: 'קבלת אישור חיבור לרשת רשמי מחברת החשמל, הפעלת הסדר net billing ואפשור המערכת לייצא אנרגיה עודפת.',
        },
        tips: {
          en: [
            'The system can usually operate in self-consumption mode while waiting for grid export approval',
            'Approval timelines vary: 1-2 weeks for EDENOR, 2-3 weeks for provincial utilities',
            'Obtain the approval document in writing — it is needed for warranty activation',
            'Verify the net billing rate and payment mechanism with the utility',
          ],
          he: [
            'המערכת יכולה בדרך כלל לפעול במצב צריכה עצמית בזמן המתנה לאישור ייצוא לרשת',
            'לוחות זמני אישור משתנים: 1-2 שבועות ל-EDENOR, 2-3 שבועות לחברות פרובינציאליות',
            'קבלו את מסמך האישור בכתב — נדרש להפעלת אחריות',
            'אמתו את תעריף net billing ומנגנון התשלום עם חברת החשמל',
          ],
        },
        documents: {
          en: ['Grid connection approval letter', 'Net billing agreement', 'Meter registration confirmation'],
          he: ['מכתב אישור חיבור לרשת', 'הסכם net billing', 'אישור רישום מונה'],
        },
      },
      {
        title: { en: 'Monitoring System Setup', he: 'הגדרת מערכת ניטור' },
        description: {
          en: 'Configure the monitoring platform (Growatt ShineServer, Solis Cloud, Huawei FusionSolar, or Fronius Solar.web) for remote performance tracking, alerts, and production reporting.',
          he: 'הגדרת פלטפורמת הניטור (Growatt ShineServer, Solis Cloud, Huawei FusionSolar, או Fronius Solar.web) למעקב ביצועים מרחוק, התרעות ודיווח ייצור.',
        },
        tips: {
          en: [
            'Connect the inverter to WiFi or cellular data for cloud monitoring',
            'Set up email/push alerts for production drops or system faults',
            'Share monitoring access with the customer through their own account',
            'Configure monthly production reports for automated email delivery',
          ],
          he: [
            'חברו את האינוורטר ל-WiFi או נתונים סלולריים לניטור ענן',
            'הגדירו התרעות אימייל/דחיפה לירידות ייצור או תקלות מערכת',
            'שתפו גישת ניטור עם הלקוח דרך חשבון משלהם',
            'הגדירו דו"חות ייצור חודשיים למשלוח אוטומטי באימייל',
          ],
        },
        tools: ['Inverter monitoring platform', 'WiFi router'],
      },
      {
        title: { en: 'Customer Training', he: 'הדרכת לקוח' },
        description: {
          en: 'Train the customer on system operation: how to read the monitoring app, what the indicator lights mean, basic troubleshooting, when to call for service, and safety precautions.',
          he: 'הדרכת הלקוח על תפעול המערכת: כיצד לקרוא את אפליקציית הניטור, מה מהבהבות האור מציינות, פתרון בעיות בסיסי, מתי להתקשר לשירות ואמצעי בטיחות.',
        },
        tips: {
          en: [
            'Provide a simple one-page quick reference guide in Spanish',
            'Show the customer how to check daily/monthly production on their phone',
            'Explain the net billing credit on their electricity bill',
            'Leave your service contact information prominently displayed near the inverter',
          ],
          he: [
            'ספקו מדריך עזר מהיר של עמוד אחד בספרדית',
            'הראו ללקוח כיצד לבדוק ייצור יומי/חודשי בטלפון שלהם',
            'הסבירו את זיכוי net billing בחשבון החשמל שלהם',
            'השאירו את פרטי הקשר לשירות שלכם מוצגים בולט ליד האינוורטר',
          ],
        },
        documents: {
          en: ['User manual', 'Quick reference guide', 'Warranty cards', 'Emergency contact card'],
          he: ['מדריך משתמש', 'מדריך עזר מהיר', 'כרטיסי אחריות', 'כרטיס אנשי קשר לחירום'],
        },
      },
      {
        title: { en: 'Warranty Activation', he: 'הפעלת אחריות' },
        description: {
          en: 'Register all equipment warranties with manufacturers, provide the customer with warranty documentation, and set up a maintenance schedule for annual check-ups.',
          he: 'רישום כל אחריות הציוד אצל היצרנים, אספקת תיעוד אחריות ללקוח והגדרת לוח זמני תחזוקה לבדיקות שנתיות.',
        },
        tips: {
          en: [
            'Register panel and inverter warranties online within 30 days of installation',
            'Keep copies of all warranty registrations for your records',
            'Set calendar reminders for annual maintenance visits',
            'Offer an annual maintenance contract as a recurring revenue stream',
          ],
          he: [
            'רשמו אחריות פאנלים ואינוורטר באינטרנט תוך 30 יום מההתקנה',
            'שמרו עותקים של כל רישומי האחריות לרשומות שלכם',
            'הגדירו תזכורות יומן לביקורי תחזוקה שנתיים',
            'הציעו חוזה תחזוקה שנתי כזרם הכנסה חוזר',
          ],
        },
        documents: {
          en: ['Warranty registration confirmations', 'Maintenance schedule', 'Service contract'],
          he: ['אישורי רישום אחריות', 'לוח זמני תחזוקה', 'חוזה שירות'],
        },
      },
    ],
    deliverables: {
      en: [
        'Utility grid connection approval and active net billing',
        'Monitoring system configured and operational',
        'Customer trained on system operation and monitoring',
        'All warranties registered and documentation delivered',
      ],
      he: [
        'אישור חיבור לרשת ו-net billing פעיל',
        'מערכת ניטור מוגדרת ופעילה',
        'לקוח מודרך על תפעול מערכת וניטור',
        'כל האחריות רשומה ותיעוד נמסר',
      ],
    },
    risks: {
      en: [
        'Utility inspection failure requiring rework — ensure compliance before scheduling',
        'Monitoring connectivity issues in rural areas — consider cellular data backup',
        'Customer dissatisfaction with initial production (seasonal variation) — set realistic expectations',
      ],
      he: [
        'כישלון בדיקת חברת חשמל הדורש תיקון — הבטיחו עמידה בתקנים לפני תזמון',
        'בעיות קישוריות ניטור באזורים כפריים — שקלו גיבוי נתונים סלולריים',
        'חוסר שביעות רצון לקוח מייצור ראשוני (שונות עונתית) — הציבו ציפיות ריאליסטיות',
      ],
    },
    icon: 'Wifi',
  },
];
