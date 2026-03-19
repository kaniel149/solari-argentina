// ============================================
// Argentina Solar Licensing & Regulatory Framework
// Sources: Ley 27.424, CAMMESA, Provincial legislators
// ============================================

export interface LicensingInfo {
  overview: { en: string; he: string };
  nationalLaw: {
    name: string;
    number: string;
    description: { en: string; he: string };
    keyArticles: Array<{
      article: string;
      summary: { en: string; he: string };
    }>;
  };
  permitTypes: Array<{
    id: string;
    name: { en: string; he: string };
    authority: { en: string; he: string };
    description: { en: string; he: string };
    requirements: { en: string[]; he: string[] };
    timeline: { en: string; he: string };
    cost: string;
    tips: { en: string[]; he: string[] };
  }>;
  provincialStatus: Array<{
    province: string;
    provinceId: string;
    hasAdherence: boolean;
    localLaw?: string;
    status: { en: string; he: string };
    notes?: { en: string; he: string };
  }>;
  checklist: Array<{
    id: string;
    task: { en: string; he: string };
    description: { en: string; he: string };
    responsible: { en: string; he: string };
    phase: 'pre-installation' | 'installation' | 'post-installation';
  }>;
}

export const licensingInfo: LicensingInfo = {
  overview: {
    en: 'Argentina\'s distributed generation framework is governed by National Law 27.424 (2017), known as the "Régimen de Fomento a la Generación Distribuida de Energía Renovable Integrada a la Red Eléctrica Pública." This law establishes the right of any user to generate electricity from renewable sources and inject surplus energy into the public grid, receiving compensation through net billing or net metering schemes depending on the province. The regulatory body CAMMESA oversees prosumer registration at the national level, while each province may adhere to the law and establish its own complementary regulations.',
    he: 'מסגרת הייצור המבוזר של ארגנטינה מוסדרת על ידי חוק לאומי 27.424 (2017), הידוע כ-"Régimen de Fomento a la Generación Distribuida de Energía Renovable Integrada a la Red Eléctrica Pública." חוק זה מבסס את הזכות של כל משתמש לייצר חשמל ממקורות מתחדשים ולהזריק עודפי אנרגיה לרשת הציבורית, ולקבל פיצוי באמצעות תוכניות net billing או net metering בהתאם לפרובינציה. הגוף המסדיר CAMMESA מפקח על רישום צרכנים-יצרנים ברמה הלאומית, בעוד שכל פרובינציה יכולה להצטרף לחוק ולקבוע תקנות משלימות משלה.',
  },
  nationalLaw: {
    name: 'Régimen de Fomento a la Generación Distribuida de Energía Renovable',
    number: 'Ley 27.424',
    description: {
      en: 'Enacted in December 2017 and regulated by Decree 986/2018, this law creates the legal framework for distributed generation in Argentina. It establishes the concept of "usuario-generador" (user-generator/prosumer) and mandates that utilities must allow grid connection for renewable generation systems up to 300 kW (or higher limits set by provincial adherence).',
      he: 'חוקק בדצמבר 2017 והוסדר בצו 986/2018, חוק זה יוצר את המסגרת המשפטית לייצור מבוזר בארגנטינה. הוא מבסס את הרעיון של "usuario-generador" (משתמש-יצרן/צרכן-יצרן) ומחייב חברות חשמל לאפשר חיבור לרשת למערכות ייצור מתחדשות עד 300 kW (או מגבלות גבוהות יותר שנקבעו בהצטרפות פרובינציאלית).',
    },
    keyArticles: [
      {
        article: 'Art. 1',
        summary: {
          en: 'Establishes the object of the law: to promote distributed generation of renewable energy integrated into the public grid, enabling prosumer participation.',
          he: 'מבסס את מטרת החוק: לקדם ייצור מבוזר של אנרגיה מתחדשת המשולבת ברשת הציבורית, ומאפשר השתתפות צרכנים-יצרנים.',
        },
      },
      {
        article: 'Art. 5',
        summary: {
          en: 'Defines "usuario-generador" (prosumer): any user of the electrical grid who generates electricity from renewable sources primarily for self-consumption, with the ability to inject surplus into the grid.',
          he: 'מגדיר "usuario-generador" (צרכן-יצרן): כל משתמש ברשת החשמל המייצר חשמל ממקורות מתחדשים בעיקר לצריכה עצמית, עם יכולת להזריק עודפים לרשת.',
        },
      },
      {
        article: 'Art. 6',
        summary: {
          en: 'Sets the maximum injection capacity for prosumers. The base limit is 300 kW, but provinces may establish higher limits through their adherence regulations.',
          he: 'קובע את קיבולת ההזרקה המקסימלית לצרכנים-יצרנים. המגבלה הבסיסית היא 300 kW, אך פרובינציות יכולות לקבוע מגבלות גבוהות יותר דרך תקנות ההצטרפות שלהן.',
        },
      },
      {
        article: 'Art. 12',
        summary: {
          en: 'Establishes the compensation mechanism for injected energy. Prosumers receive credit for surplus energy injected into the grid, calculated according to the applicable tariff scheme (net billing or net metering depending on province).',
          he: 'מבסס את מנגנון הפיצוי על אנרגיה מוזרקת. צרכנים-יצרנים מקבלים זיכוי על עודפי אנרגיה המוזרקים לרשת, מחושבים לפי תוכנית התעריף הרלוונטית (net billing או net metering בהתאם לפרובינציה).',
        },
      },
      {
        article: 'Art. 16',
        summary: {
          en: 'Invites provinces to adhere to the national law through their legislatures. Provincial adherence allows provinces to establish complementary regulations, higher capacity limits, and additional incentives.',
          he: 'מזמין פרובינציות להצטרף לחוק הלאומי דרך המחוקקים שלהן. הצטרפות פרובינציאלית מאפשרת לפרובינציות לקבוע תקנות משלימות, מגבלות קיבולת גבוהות יותר ותמריצים נוספים.',
        },
      },
    ],
  },
  permitTypes: [
    {
      id: 'municipal-permit',
      name: {
        en: 'Municipal Construction Permit',
        he: 'היתר בנייה מוניציפלי',
      },
      authority: {
        en: 'Local Municipality (Municipio/Partido)',
        he: 'עירייה מקומית (Municipio/Partido)',
      },
      description: {
        en: 'Required for the physical installation of solar panels and associated equipment on buildings or structures. Requirements vary significantly between municipalities — some have streamlined solar-specific processes, while others require a full construction permit.',
        he: 'נדרש להתקנה פיזית של פנלים סולאריים וציוד נלווה על מבנים או מבנים. הדרישות משתנות משמעותית בין עיריות — חלקן מציעות תהליכים ייעודיים לסולאר, בעוד אחרות דורשות היתר בנייה מלא.',
      },
      requirements: {
        en: [
          'Architectural plans showing panel layout and placement',
          'Structural load certification from a licensed engineer',
          'Fire safety compliance documentation',
          'Property ownership or landlord authorization',
          'Licensed professional matriculated in the province',
        ],
        he: [
          'תוכניות אדריכליות המראות פריסת ומיקום פנלים',
          'אישור עומס מבני ממהנדס מוסמך',
          'תיעוד תאימות בטיחות אש',
          'בעלות על נכס או אישור בעל הנכס',
          'איש מקצוע מוסמך רשום בפרובינציה',
        ],
      },
      timeline: { en: '5-20 business days (varies by municipality)', he: '5-20 ימי עבודה (משתנה לפי עירייה)' },
      cost: 'ARS 50,000-100,000',
      tips: {
        en: [
          'Start this process in parallel with the utility application to save time',
          'Some municipalities waive fees for residential solar — ask about incentives',
          'In CABA, use the TAD (Trámites a Distancia) platform for faster processing',
          'Bring printed copies of Ley 27.424 in case municipal staff are unfamiliar',
        ],
        he: [
          'התחילו תהליך זה במקביל לבקשת חברת החשמל כדי לחסוך זמן',
          'חלק מהעיריות מוותרות על אגרות לסולאר למגורים — שאלו על תמריצים',
          'ב-CABA, השתמשו בפלטפורמת TAD (Trámites a Distancia) לעיבוד מהיר יותר',
          'הביאו עותקים מודפסים של חוק 27.424 למקרה שצוות העירייה לא מכיר',
        ],
      },
    },
    {
      id: 'prosumer-registration',
      name: {
        en: 'Prosumer Registration (CAMMESA)',
        he: 'רישום צרכן-יצרן (CAMMESA)',
      },
      authority: {
        en: 'CAMMESA (National wholesale market administrator)',
        he: 'CAMMESA (מנהל שוק הסיטונאות הלאומי)',
      },
      description: {
        en: 'National registration as a "usuario-generador" (prosumer) in the CAMMESA system. This is a mandatory step that creates your official prosumer profile in the national distributed generation registry. The registration is free and done online.',
        he: 'רישום לאומי כ-"usuario-generador" (צרכן-יצרן) במערכת CAMMESA. זהו שלב חובה שיוצר את הפרופיל הרשמי שלכם כצרכן-יצרן ברישום הלאומי של ייצור מבוזר. הרישום חינמי ומתבצע באינטרנט.',
      },
      requirements: {
        en: [
          'Valid DNI (national identity document)',
          'Active electricity account with a utility',
          'System specifications (capacity, equipment)',
          'Licensed electrician information',
          'Online registration form completion',
        ],
        he: [
          'DNI (תעודת זהות) בתוקף',
          'חשבון חשמל פעיל עם חברת חשמל',
          'מפרטי מערכת (הספק, ציוד)',
          'פרטי חשמלאי מוסמך',
          'מילוי טופס רישום מקוון',
        ],
      },
      timeline: { en: '5-10 business days (online process)', he: '5-10 ימי עבודה (תהליך מקוון)' },
      cost: 'Free / Gratuito',
      tips: {
        en: [
          'Register early — you need the CAMMESA prosumer number for the utility application',
          'The online form is straightforward — have your DNI and utility account ready',
          'This registration is valid nationally regardless of province',
        ],
        he: [
          'הירשמו מוקדם — תצטרכו את מספר הצרכן-יצרן של CAMMESA לבקשת חברת החשמל',
          'הטופס המקוון פשוט — הכינו DNI וחשבון חברת חשמל',
          'רישום זה תקף לאומית ללא קשר לפרובינציה',
        ],
      },
    },
    {
      id: 'utility-connection',
      name: {
        en: 'Utility Connection Application',
        he: 'בקשת חיבור לחברת חשמל',
      },
      authority: {
        en: 'Local Utility Company (EDENOR, EDESUR, EPEC, etc.)',
        he: 'חברת חשמל מקומית (EDENOR, EDESUR, EPEC, וכו\')',
      },
      description: {
        en: 'The formal application to your electricity distributor for grid connection of your solar system. This triggers the technical feasibility study and design review process. Each utility has its own forms and procedures.',
        he: 'הבקשה הרשמית למפיצת החשמל שלכם לחיבור מערכת הסולאר לרשת. זה מפעיל את תהליך בדיקת ההיתכנות הטכנית וסקירת התכנון. לכל חברת חשמל יש טפסים ונהלים משלה.',
      },
      requirements: {
        en: [
          'Completed utility-specific application form (GD-01, FGD-001, etc.)',
          'CAMMESA prosumer registration number',
          'Complete single-line electrical diagram (esquema unifilar)',
          'Equipment datasheets and compliance certificates',
          'Licensed electrician declaration (declaración jurada)',
          'Structural assessment for rooftop installations',
        ],
        he: [
          'טופס בקשה ייעודי לחברת חשמל (GD-01, FGD-001, וכו\') מלא',
          'מספר רישום צרכן-יצרן של CAMMESA',
          'דיאגרמת קו יחיד חשמלית מלאה (esquema unifilar)',
          'גליונות נתוני ציוד ואישורי תאימות',
          'הצהרת חשמלאי מוסמך (declaración jurada)',
          'הערכה מבנית להתקנות גג',
        ],
      },
      timeline: { en: '30-60 business days (includes feasibility study + design review)', he: '30-60 ימי עבודה (כולל בדיקת היתכנות + סקירת תכנון)' },
      cost: 'ARS 30,000-80,000',
      tips: {
        en: [
          'Call the utility BEFORE submitting to confirm current forms and requirements',
          'Have the single-line diagram professionally prepared by your electrician',
          'Include all equipment certifications upfront to avoid rejection',
          'Request a tracking number (expediente) for follow-up',
        ],
        he: [
          'התקשרו לחברת החשמל לפני הגשה כדי לאשר טפסים ודרישות עדכניים',
          'בקשו מהחשמלאי שלכם להכין את דיאגרמת הקו היחיד בצורה מקצועית',
          'כללו את כל אישורי הציוד מראש למניעת דחייה',
          'בקשו מספר מעקב (expediente) למעקב',
        ],
      },
    },
    {
      id: 'electrical-certificate',
      name: {
        en: 'Electrical Installation Certificate',
        he: 'אישור התקנה חשמלית',
      },
      authority: {
        en: 'Licensed Electrician (Matriculado)',
        he: 'חשמלאי מוסמך (Matriculado)',
      },
      description: {
        en: 'A certified declaration by a licensed electrician (matriculado) that the solar installation complies with all applicable electrical codes (IRAM 2039-2, IEC 62116, AEA 90364) and has been installed according to the approved design.',
        he: 'הצהרה מאושרת על ידי חשמלאי מוסמך (matriculado) שההתקנה הסולארית עומדת בכל התקנים החשמליים הרלוונטיים (IRAM 2039-2, IEC 62116, AEA 90364) והותקנה לפי התכנון המאושר.',
      },
      requirements: {
        en: [
          'Licensed electrician with valid matrícula in the province',
          'Completed installation per approved design',
          'System testing results (insulation, grounding, protection)',
          'Anti-islanding test verification',
          'Photograph documentation',
        ],
        he: [
          'חשמלאי מוסמך עם matrícula בתוקף בפרובינציה',
          'התקנה שהושלמה לפי תכנון מאושר',
          'תוצאות בדיקת מערכת (בידוד, הארקה, הגנה)',
          'אימות בדיקת anti-islanding',
          'תיעוד צילומי',
        ],
      },
      timeline: { en: '1-3 days after installation completion', he: '1-3 ימים לאחר סיום ההתקנה' },
      cost: 'ARS 20,000-40,000',
      tips: {
        en: [
          'Hire an electrician experienced in solar installations — not all are',
          'Verify the electrician\'s matrícula is valid and registered in your province',
          'The declaración jurada is a legally binding document — ensure accuracy',
          'Take photos at every stage of installation for the documentation package',
        ],
        he: [
          'שכרו חשמלאי מנוסה בהתקנות סולאריות — לא כולם מכירים',
          'ודאו שה-matrícula של החשמלאי בתוקף ורשום בפרובינציה שלכם',
          'ה-declaración jurada הוא מסמך מחייב משפטית — ודאו דיוק',
          'צלמו בכל שלב של ההתקנה לחבילת התיעוד',
        ],
      },
    },
    {
      id: 'final-inspection',
      name: {
        en: 'Final Inspection & Connection Approval',
        he: 'בדיקה סופית ואישור חיבור',
      },
      authority: {
        en: 'Local Utility + Municipality',
        he: 'חברת חשמל מקומית + עירייה',
      },
      description: {
        en: 'The final verification step where the utility and/or municipality inspect the completed installation, verify compliance with all regulations, and authorize the grid connection. This leads to meter replacement and prosumer activation.',
        he: 'שלב האימות הסופי בו חברת החשמל ו/או העירייה בודקות את ההתקנה שהושלמה, מאמתות תאימות לכל התקנות, ומאשרות את חיבור הרשת. זה מוביל להחלפת מונה והפעלת צרכן-יצרן.',
      },
      requirements: {
        en: [
          'All prior permits obtained and on file',
          'Installation completion certificate from electrician',
          'As-built single-line diagram',
          'System commissioning test results',
          'Photo documentation of the complete installation',
          'CAMMESA registration confirmation',
        ],
        he: [
          'כל ההיתרים הקודמים התקבלו ומתויקים',
          'אישור סיום התקנה מחשמלאי',
          'דיאגרמת קו יחיד סופית (as-built)',
          'תוצאות בדיקת הפעלת מערכת',
          'תיעוד צילומי של ההתקנה המושלמת',
          'אישור רישום CAMMESA',
        ],
      },
      timeline: { en: '10-25 business days', he: '10-25 ימי עבודה' },
      cost: 'Included in connection fee / כלול בדמי חיבור',
      tips: {
        en: [
          'Ensure the isolation switch (seccionador) is clearly visible and accessible',
          'Have all documentation organized and ready for the inspector',
          'Be present during the inspection to answer questions',
          'After approval, monitor the meter change closely — verify readings',
        ],
        he: [
          'ודאו שמפסק הבידוד (seccionador) נראה ונגיש בבירור',
          'הכינו את כל התיעוד מאורגן ומוכן לפקח',
          'היו נוכחים בזמן הבדיקה לענות על שאלות',
          'לאחר אישור, עקבו מקרוב אחרי החלפת המונה — ודאו קריאות',
        ],
      },
    },
  ],
  provincialStatus: [
    {
      province: 'Buenos Aires (Provincia)',
      provinceId: 'buenosaires',
      hasAdherence: true,
      localLaw: 'Ley 15.319',
      status: { en: 'Adhered — Active net billing program', he: 'מצטרפת — תוכנית net billing פעילה' },
      notes: {
        en: 'Covers EDENOR, EDESUR, EDEN, EDES, EDEA service areas. Largest prosumer market.',
        he: 'מכסה אזורי שירות EDENOR, EDESUR, EDEN, EDES, EDEA. שוק הצרכנים-יצרנים הגדול ביותר.',
      },
    },
    {
      province: 'Ciudad de Buenos Aires',
      provinceId: 'caba',
      hasAdherence: true,
      localLaw: 'Ley 6.280',
      status: { en: 'Adhered — Active net billing via EDENOR/EDESUR', he: 'מצטרפת — net billing פעיל דרך EDENOR/EDESUR' },
      notes: {
        en: 'Highest density of installations. TAD platform streamlines municipal permits.',
        he: 'הצפיפות הגבוהה ביותר של התקנות. פלטפורמת TAD מייעלת היתרים מוניציפליים.',
      },
    },
    {
      province: 'Córdoba',
      provinceId: 'cordoba',
      hasAdherence: true,
      localLaw: 'Ley 10.604',
      status: { en: 'Adhered — TRUE net metering (1:1 kWh credits)', he: 'מצטרפת — net metering אמיתי (זיכוי 1:1 kWh)' },
      notes: {
        en: 'Best compensation scheme in Argentina. Credits roll over 6 months. 500 kW max.',
        he: 'תוכנית הפיצוי הטובה ביותר בארגנטינה. זיכויים מועברים 6 חודשים. מקסימום 500 kW.',
      },
    },
    {
      province: 'Santa Fe',
      provinceId: 'santafe',
      hasAdherence: true,
      localLaw: 'Ley 13.903',
      status: { en: 'Adhered — Active net billing program', he: 'מצטרפת — תוכנית net billing פעילה' },
      notes: {
        en: 'Rosario is the main hub. EPE has a well-organized DG department.',
        he: 'רוסריו היא המרכז העיקרי. ל-EPE יש מחלקת ייצור מבוזר מאורגנת.',
      },
    },
    {
      province: 'Mendoza',
      provinceId: 'mendoza',
      hasAdherence: true,
      localLaw: 'Ley 9.084',
      status: { en: 'Adhered — Net metering (1:1 credits)', he: 'מצטרפת — net metering (זיכוי 1:1)' },
      notes: {
        en: 'Excellent solar resource (5.4 kWh/m2/day). Strong provincial support for solar.',
        he: 'משאב סולארי מעולה (5.4 kWh/m2/יום). תמיכה פרובינציאלית חזקה בסולאר.',
      },
    },
    {
      province: 'San Juan',
      provinceId: 'sanjuan',
      hasAdherence: true,
      localLaw: 'Ley 2.435-L',
      status: { en: 'Adhered — Net metering, 500 kW max', he: 'מצטרפת — net metering, מקסימום 500 kW' },
      notes: {
        en: 'Highest solar resource (5.8 kWh/m2/day). EPSE panel factory. Most solar-friendly province.',
        he: 'משאב סולארי גבוה ביותר (5.8 kWh/m2/יום). מפעל פנלים EPSE. הפרובינציה הידידותית ביותר לסולאר.',
      },
    },
    {
      province: 'Tucumán',
      provinceId: 'tucuman',
      hasAdherence: true,
      status: { en: 'Adhered — Net billing program in development', he: 'מצטרפת — תוכנית net billing בפיתוח' },
      notes: {
        en: 'Growing market. EDET implementing DG procedures.',
        he: 'שוק בצמיחה. EDET מיישמת נהלי ייצור מבוזר.',
      },
    },
    {
      province: 'Salta',
      provinceId: 'salta',
      hasAdherence: true,
      status: { en: 'Adhered — Active with EDESA', he: 'מצטרפת — פעילה עם EDESA' },
      notes: {
        en: 'High solar resource, growing interest. EDESA accepting applications.',
        he: 'משאב סולארי גבוה, עניין גובר. EDESA מקבלת בקשות.',
      },
    },
    {
      province: 'Jujuy',
      provinceId: 'jujuy',
      hasAdherence: true,
      status: { en: 'Adhered — Active DG program', he: 'מצטרפת — תוכנית ייצור מבוזר פעילה' },
      notes: {
        en: 'Second-highest solar resource in Argentina. Caucharí solar park demonstrates provincial commitment.',
        he: 'משאב סולארי שני בגובהו בארגנטינה. פארק סולארי Caucharí מדגים מחויבות פרובינציאלית.',
      },
    },
    {
      province: 'Río Negro',
      provinceId: 'rionegro',
      hasAdherence: true,
      status: { en: 'Adhered — Active with EdERSA', he: 'מצטרפת — פעילה עם EdERSA' },
      notes: {
        en: 'Patagonia context. Wind+solar hybrid potential. EdERSA processing applications.',
        he: 'הקשר פטגוניה. פוטנציאל היברידי רוח+סולאר. EdERSA מעבדת בקשות.',
      },
    },
    {
      province: 'Neuquén',
      provinceId: 'neuquen',
      hasAdherence: true,
      status: { en: 'Adhered — Active with EPEN', he: 'מצטרפת — פעילה עם EPEN' },
      notes: {
        en: 'Good solar resource for Patagonia. Oil/gas industry cross-subsidies keep electricity cheap.',
        he: 'משאב סולארי טוב לפטגוניה. סבסוד צולב של תעשיית נפט/גז שומר חשמל זול.',
      },
    },
    {
      province: 'Misiones',
      provinceId: 'misiones',
      hasAdherence: true,
      status: { en: 'Adhered — Developing program with EMSA', he: 'מצטרפת — תוכנית בפיתוח עם EMSA' },
      notes: {
        en: 'Humid subtropical climate. Panel soiling from rain/vegetation requires regular cleaning.',
        he: 'אקלים סובטרופי לח. לכלוך פנלים מגשם/צמחייה דורש ניקוי סדיר.',
      },
    },
    {
      province: 'Entre Ríos',
      provinceId: 'entrerios',
      hasAdherence: true,
      status: { en: 'Adhered — Active with ENERSA', he: 'מצטרפת — פעילה עם ENERSA' },
      notes: {
        en: 'Moderate solar resource. ENERSA accepting DG applications in main cities.',
        he: 'משאב סולארי מתון. ENERSA מקבלת בקשות ייצור מבוזר בערים עיקריות.',
      },
    },
    {
      province: 'Catamarca',
      provinceId: 'catamarca',
      hasAdherence: false,
      status: { en: 'Pending — Provincial adherence not yet completed', he: 'ממתין — הצטרפות פרובינציאלית טרם הושלמה' },
      notes: {
        en: 'High solar resource but no provincial framework yet. EC SAPEM not processing DG applications.',
        he: 'משאב סולארי גבוה אך אין מסגרת פרובינציאלית עדיין. EC SAPEM לא מעבדת בקשות ייצור מבוזר.',
      },
    },
    {
      province: 'San Luis',
      provinceId: 'sanluis',
      hasAdherence: true,
      status: { en: 'Adhered — Active with EDESAL', he: 'מצטרפת — פעילה עם EDESAL' },
      notes: {
        en: 'Good solar resource in Cuyo region. EDESAL implementing procedures.',
        he: 'משאב סולארי טוב באזור Cuyo. EDESAL מיישמת נהלים.',
      },
    },
    {
      province: 'La Pampa',
      provinceId: 'lapampa',
      hasAdherence: true,
      status: { en: 'Adhered — Limited program', he: 'מצטרפת — תוכנית מוגבלת' },
    },
    {
      province: 'Chubut',
      provinceId: 'chubut',
      hasAdherence: true,
      status: { en: 'Adhered — Early-stage implementation', he: 'מצטרפת — יישום בשלב מוקדם' },
      notes: {
        en: 'Wind dominates renewable focus. Solar DG program in early stages.',
        he: 'רוח דומינית במיקוד מתחדשים. תוכנית סולאר ייצור מבוזר בשלבים מוקדמים.',
      },
    },
  ],
  checklist: [
    // Pre-installation (7 items)
    {
      id: 'check-utility-availability',
      task: {
        en: 'Verify utility net metering/billing availability',
        he: 'אמתו זמינות net metering/billing של חברת החשמל',
      },
      description: {
        en: 'Contact your local utility to confirm they accept DG connections in your area and on your feeder.',
        he: 'פנו לחברת החשמל המקומית לאשר שהם מקבלים חיבורי ייצור מבוזר באזורכם ובמזין שלכם.',
      },
      responsible: { en: 'Installer / Owner', he: 'מתקין / בעלים' },
      phase: 'pre-installation',
    },
    {
      id: 'gather-consumption-data',
      task: {
        en: 'Gather 12 months of electricity consumption data',
        he: 'אספו נתוני צריכת חשמל של 12 חודשים',
      },
      description: {
        en: 'Collect last 12 electricity bills to properly size the system and demonstrate consumption patterns to the utility.',
        he: 'אספו 12 חשבונות חשמל אחרונים כדי לגדל את המערכת כראוי ולהדגים דפוסי צריכה לחברת החשמל.',
      },
      responsible: { en: 'Owner', he: 'בעלים' },
      phase: 'pre-installation',
    },
    {
      id: 'structural-assessment',
      task: {
        en: 'Conduct structural roof/site assessment',
        he: 'בצעו הערכה מבנית של גג/אתר',
      },
      description: {
        en: 'Have a structural engineer verify the roof or ground can support the panel weight and wind loads.',
        he: 'בקשו ממהנדס מבנים לאמת שהגג או הקרקע יכולים לתמוך במשקל הפנלים ועומסי הרוח.',
      },
      responsible: { en: 'Structural Engineer', he: 'מהנדס מבנים' },
      phase: 'pre-installation',
    },
    {
      id: 'system-design',
      task: {
        en: 'Complete system design and single-line diagram',
        he: 'השלימו תכנון מערכת ודיאגרמת קו יחיד',
      },
      description: {
        en: 'Design the complete system including panel layout, inverter selection, protection scheme, and prepare the esquema unifilar.',
        he: 'תכננו את המערכת המלאה כולל פריסת פנלים, בחירת ממיר, תוכנית הגנות והכינו esquema unifilar.',
      },
      responsible: { en: 'Licensed Electrician / Solar Engineer', he: 'חשמלאי מוסמך / מהנדס סולאר' },
      phase: 'pre-installation',
    },
    {
      id: 'submit-utility-application',
      task: {
        en: 'Submit utility connection application',
        he: 'הגישו בקשת חיבור לחברת חשמל',
      },
      description: {
        en: 'File the formal DG connection application with your utility company along with all required documentation.',
        he: 'הגישו את בקשת חיבור ייצור מבוזר רשמית לחברת החשמל שלכם עם כל התיעוד הנדרש.',
      },
      responsible: { en: 'Installer', he: 'מתקין' },
      phase: 'pre-installation',
    },
    {
      id: 'municipal-permit',
      task: {
        en: 'Obtain municipal construction/installation permit',
        he: 'קבלו היתר בנייה/התקנה מוניציפלי',
      },
      description: {
        en: 'Apply for and obtain the local construction permit from your municipality.',
        he: 'הגישו בקשה וקבלו היתר בנייה מקומי מהעירייה שלכם.',
      },
      responsible: { en: 'Owner / Installer', he: 'בעלים / מתקין' },
      phase: 'pre-installation',
    },
    {
      id: 'cammesa-registration',
      task: {
        en: 'Register as prosumer with CAMMESA',
        he: 'הירשמו כצרכן-יצרן ב-CAMMESA',
      },
      description: {
        en: 'Complete the online prosumer registration on the CAMMESA portal to obtain your usuario-generador number.',
        he: 'השלימו את רישום הצרכן-יצרן המקוון בפורטל CAMMESA לקבלת מספר usuario-generador.',
      },
      responsible: { en: 'Owner / Installer', he: 'בעלים / מתקין' },
      phase: 'pre-installation',
    },
    // Installation (4 items)
    {
      id: 'hire-electrician',
      task: {
        en: 'Hire licensed electrician (matriculado)',
        he: 'שכרו חשמלאי מוסמך (matriculado)',
      },
      description: {
        en: 'Engage a licensed electrician with valid matrícula and experience in solar installations. Verify their registration in your province.',
        he: 'שכרו חשמלאי מוסמך עם matrícula בתוקף וניסיון בהתקנות סולאריות. ודאו את הרישום שלו בפרובינציה שלכם.',
      },
      responsible: { en: 'Owner', he: 'בעלים' },
      phase: 'installation',
    },
    {
      id: 'iram-compliance',
      task: {
        en: 'Ensure IRAM standards compliance',
        he: 'ודאו תאימות לתקני IRAM',
      },
      description: {
        en: 'Verify all equipment and installation practices comply with IRAM 2039-2 (grid-connected PV), IEC 62116 (anti-islanding), and AEA 90364.',
        he: 'ודאו שכל הציוד ונהלי ההתקנה עומדים ב-IRAM 2039-2 (PV מחובר רשת), IEC 62116 (anti-islanding) ו-AEA 90364.',
      },
      responsible: { en: 'Licensed Electrician', he: 'חשמלאי מוסמך' },
      phase: 'installation',
    },
    {
      id: 'install-per-design',
      task: {
        en: 'Install system according to approved design',
        he: 'התקינו מערכת לפי תכנון מאושר',
      },
      description: {
        en: 'Complete the physical installation exactly per the approved design. Any deviations require design amendment and re-approval.',
        he: 'השלימו את ההתקנה הפיזית בדיוק לפי התכנון המאושר. כל סטייה דורשת תיקון תכנון ואישור מחדש.',
      },
      responsible: { en: 'Installer / Licensed Electrician', he: 'מתקין / חשמלאי מוסמך' },
      phase: 'installation',
    },
    {
      id: 'document-photos',
      task: {
        en: 'Document installation with date-stamped photos',
        he: 'תעדו את ההתקנה עם תמונות מחותמות תאריך',
      },
      description: {
        en: 'Take comprehensive photographs at every installation stage: roof prep, mounting, panel placement, wiring, inverter, meter area, grounding, labels.',
        he: 'צלמו תמונות מקיפות בכל שלב התקנה: הכנת גג, הרכבה, מיקום פנלים, חיווט, ממיר, אזור מונה, הארקה, תוויות.',
      },
      responsible: { en: 'Installer', he: 'מתקין' },
      phase: 'installation',
    },
    // Post-installation (4 items)
    {
      id: 'request-inspection',
      task: {
        en: 'Request utility inspection',
        he: 'בקשו בדיקת חברת חשמל',
      },
      description: {
        en: 'Submit the completion report (Acta de Finalización) and request the utility\'s technical inspection of the installed system.',
        he: 'הגישו דו"ח סיום (Acta de Finalización) ובקשו בדיקה טכנית של חברת החשמל למערכת המותקנת.',
      },
      responsible: { en: 'Installer', he: 'מתקין' },
      phase: 'post-installation',
    },
    {
      id: 'meter-change',
      task: {
        en: 'Coordinate bidirectional meter installation',
        he: 'תאמו התקנת מונה דו-כיווני',
      },
      description: {
        en: 'After passing inspection, coordinate with the utility for meter change. Verify the new meter reads both import and export correctly.',
        he: 'לאחר מעבר בדיקה, תאמו עם חברת החשמל להחלפת מונה. ודאו שהמונה החדש קורא יבוא ויצוא נכון.',
      },
      responsible: { en: 'Utility / Owner', he: 'חברת חשמל / בעלים' },
      phase: 'post-installation',
    },
    {
      id: 'activate-monitoring',
      task: {
        en: 'Activate monitoring system',
        he: 'הפעילו מערכת ניטור',
      },
      description: {
        en: 'Set up and activate the inverter\'s monitoring platform (SolarEdge, Huawei FusionSolar, Growatt ShineServer, etc.) to track production remotely.',
        he: 'הגדירו והפעילו את פלטפורמת הניטור של הממיר (SolarEdge, Huawei FusionSolar, Growatt ShineServer, וכו\') למעקב ייצור מרחוק.',
      },
      responsible: { en: 'Installer', he: 'מתקין' },
      phase: 'post-installation',
    },
    {
      id: 'completion-report',
      task: {
        en: 'Submit completion report and file documentation',
        he: 'הגישו דו"ח סיום ותייקו תיעוד',
      },
      description: {
        en: 'Submit all final documentation to the utility and municipality. Keep copies of everything for warranty claims and audits.',
        he: 'הגישו את כל התיעוד הסופי לחברת החשמל ולעירייה. שמרו עותקים של הכל לתביעות אחריות וביקורות.',
      },
      responsible: { en: 'Installer / Owner', he: 'מתקין / בעלים' },
      phase: 'post-installation',
    },
  ],
};
