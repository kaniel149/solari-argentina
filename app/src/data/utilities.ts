// ============================================
// Argentina Utility Company Grid Connection Guides
// Sources: ENRE, CAMMESA, Provincial regulators, Ley 27.424
// ============================================

export interface UtilityGuide {
  id: string;
  province: string;
  utilityName: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  netMeteringStatus: 'active' | 'limited' | 'pending';
  maxSystemSizeKw: number;
  connectionProcess: Array<{
    step: number;
    title: { en: string; he: string };
    description: { en: string; he: string };
    duration: { en: string; he: string };
    documents?: { en: string[]; he: string[] };
    tips?: { en: string[]; he: string[] };
    fee?: string;
  }>;
  requiredDocuments: { en: string[]; he: string[] };
  fees: Array<{
    concept: { en: string; he: string };
    amount: string;
    notes?: { en: string; he: string };
  }>;
  tips: { en: string[]; he: string[] };
  commonIssues: { en: string[]; he: string[] };
  contactTips: { en: string; he: string };
}

export const utilityGuides: UtilityGuide[] = [
  // 1. EDENOR — Buenos Aires Norte / CABA
  {
    id: 'caba',
    province: 'Ciudad de Buenos Aires',
    utilityName: 'EDENOR',
    website: 'https://www.edenor.com.ar',
    phone: '0800-666-3366',
    email: 'generacion.distribuida@edenor.com',
    address: 'Av. del Libertador 6363, CABA',
    netMeteringStatus: 'active',
    maxSystemSizeKw: 300,
    connectionProcess: [
      {
        step: 1,
        title: {
          en: 'Submit online application',
          he: 'הגשת בקשה מקוונת',
        },
        description: {
          en: 'Register on the EDENOR Virtual Office (Oficina Virtual) and submit the distributed generation connection request form (Formulario GD-01). Include your account number (NIS) and planned system capacity.',
          he: 'הירשמו למשרד הווירטואלי של EDENOR והגישו את טופס בקשת חיבור ייצור מבוזר (GD-01). כללו את מספר החשבון (NIS) ואת ההספק המתוכנן של המערכת.',
        },
        duration: { en: '1-2 days', he: '1-2 ימים' },
        documents: {
          en: ['Completed form GD-01', 'Copy of last electricity bill', 'Copy of DNI (national ID)', 'Property ownership or rental agreement'],
          he: ['טופס GD-01 מלא', 'העתק חשבון חשמל אחרון', 'העתק תעודת זהות (DNI)', 'אישור בעלות או הסכם שכירות'],
        },
        tips: {
          en: ['Have your NIS (account number) ready — it\'s on the top-right of your bill', 'Submit during business hours for faster processing'],
          he: ['הכינו את מספר ה-NIS — הוא בפינה הימנית העליונה של החשבון', 'הגישו בשעות עבודה לעיבוד מהיר יותר'],
        },
      },
      {
        step: 2,
        title: {
          en: 'Technical feasibility study',
          he: 'בדיקת היתכנות טכנית',
        },
        description: {
          en: 'EDENOR evaluates the electrical capacity of your connection point (transformer, feeder line) to determine if the grid can absorb your solar injection. They check the transformer load and existing DG connections in your area.',
          he: 'EDENOR מעריכה את הקיבולת החשמלית של נקודת החיבור שלכם (שנאי, קו מזין) כדי לקבוע אם הרשת יכולה לקלוט את ההזרקה הסולארית. הם בודקים עומס שנאי וחיבורי ייצור מבוזר קיימים באזורכם.',
        },
        duration: { en: '15-30 business days', he: '15-30 ימי עבודה' },
        fee: 'ARS 45,000',
        tips: {
          en: ['This is the longest wait — follow up after 15 days if no response', 'Smaller systems (<10 kW) usually pass without issues'],
          he: ['זו ההמתנה הארוכה ביותר — עקבו אחרי 15 יום אם אין תגובה', 'מערכות קטנות (<10 kW) בדרך כלל עוברות ללא בעיות'],
        },
      },
      {
        step: 3,
        title: {
          en: 'System design approval',
          he: 'אישור תכנון מערכת',
        },
        description: {
          en: 'Submit the complete system design including single-line diagram (esquema unifilar), equipment specifications (panels, inverter, protections), and a sworn statement (declaración jurada) from a licensed electrician (matriculado).',
          he: 'הגישו את תכנון המערכת המלא כולל דיאגרמת קו יחיד (esquema unifilar), מפרטי ציוד (פנלים, ממיר, הגנות), והצהרה בשבועה (declaración jurada) מחשמלאי מוסמך (matriculado).',
        },
        duration: { en: '10-15 business days', he: '10-15 ימי עבודה' },
        documents: {
          en: ['Single-line diagram (esquema unifilar)', 'Equipment datasheets (panels + inverter)', 'Inverter grid compliance certificate (anti-islanding)', 'Licensed electrician declaration (declaración jurada)'],
          he: ['דיאגרמת קו יחיד (esquema unifilar)', 'גליונות נתוני ציוד (פנלים + ממיר)', 'אישור תאימות ממיר לרשת (anti-islanding)', 'הצהרת חשמלאי מוסמך (declaración jurada)'],
        },
        tips: {
          en: ['Use IRAM 2039-2 and IEC 62116 compliant inverters only', 'The single-line diagram must show the bidirectional meter location'],
          he: ['השתמשו רק בממירים תואמי IRAM 2039-2 ו-IEC 62116', 'דיאגרמת הקו היחיד חייבת להראות את מיקום המונה הדו-כיווני'],
        },
      },
      {
        step: 4,
        title: {
          en: 'Municipal construction permit',
          he: 'היתר בנייה מוניציפלי',
        },
        description: {
          en: 'Obtain a construction or installation permit from your local municipality (municipio). Requirements vary by jurisdiction. In CABA, this is handled through the TAD (Trámites a Distancia) platform.',
          he: 'קבלו היתר בנייה או התקנה מהעירייה המקומית (municipio). הדרישות משתנות לפי אזור שיפוט. ב-CABA, זה מטופל דרך פלטפורמת TAD (Trámites a Distancia).',
        },
        duration: { en: '5-15 business days', he: '5-15 ימי עבודה' },
        fee: 'ARS 50,000-100,000',
        documents: {
          en: ['Architectural plans showing panel placement', 'Structural load certification', 'Fire safety compliance note'],
          he: ['תוכניות אדריכליות המראות מיקום פנלים', 'אישור עומס מבני', 'אישור בטיחות אש'],
        },
      },
      {
        step: 5,
        title: {
          en: 'Installation notification',
          he: 'הודעה על התקנה',
        },
        description: {
          en: 'Notify EDENOR of the installation start date. The installation must be performed by a licensed electrician (matriculado) registered with the regulatory body. Take date-stamped photographs throughout the installation.',
          he: 'הודיעו ל-EDENOR על תאריך תחילת ההתקנה. ההתקנה חייבת להתבצע על ידי חשמלאי מוסמך (matriculado) הרשום בגוף המסדיר. צלמו תמונות עם חותמת תאריך לאורך ההתקנה.',
        },
        duration: { en: '1-3 days', he: '1-3 ימים' },
        tips: {
          en: ['Install the isolation switch (seccionador) in a visible and accessible location', 'Label all connections according to IRAM standards'],
          he: ['התקינו את מפסק הבידוד (seccionador) במיקום נראה ונגיש', 'סמנו את כל החיבורים לפי תקני IRAM'],
        },
      },
      {
        step: 6,
        title: {
          en: 'Request utility inspection',
          he: 'בקשת בדיקת חברת חשמל',
        },
        description: {
          en: 'After installation is complete, submit the completion report (Acta de Finalización) and request EDENOR\'s technical inspection. Include photos, as-built drawings, and the electrician\'s signed completion certificate.',
          he: 'לאחר סיום ההתקנה, הגישו דו"ח סיום (Acta de Finalización) ובקשו בדיקה טכנית של EDENOR. כללו תמונות, שרטוטים סופיים ואישור סיום חתום של החשמלאי.',
        },
        duration: { en: '10-20 business days', he: '10-20 ימי עבודה' },
        documents: {
          en: ['Completion report (Acta de Finalización)', 'As-built single-line diagram', 'Installation photographs', 'Inverter commissioning report'],
          he: ['דו"ח סיום (Acta de Finalización)', 'דיאגרמת קו יחיד סופית', 'תמונות התקנה', 'דו"ח הפעלת ממיר'],
        },
      },
      {
        step: 7,
        title: {
          en: 'Bidirectional meter installation',
          he: 'התקנת מונה דו-כיווני',
        },
        description: {
          en: 'EDENOR installs or replaces your meter with a bidirectional (import/export) meter. This allows measurement of both consumed and injected energy. The meter is property of EDENOR.',
          he: 'EDENOR מתקינה או מחליפה את המונה שלכם במונה דו-כיווני (יבוא/יצוא). זה מאפשר מדידה של אנרגיה נצרכת ומוזרקת כאחד. המונה הוא רכוש של EDENOR.',
        },
        duration: { en: '5-15 business days', he: '5-15 ימי עבודה' },
        fee: 'ARS 35,000-60,000',
        tips: {
          en: ['The meter change may require a brief power outage — coordinate with EDENOR', 'Verify the meter reads both import (consumed) and export (injected) correctly'],
          he: ['החלפת המונה עשויה לדרוש הפסקת חשמל קצרה — תאמו עם EDENOR', 'ודאו שהמונה קורא נכון יבוא (נצרך) ויצוא (מוזרק)'],
        },
      },
      {
        step: 8,
        title: {
          en: 'Grid connection activation',
          he: 'הפעלת חיבור לרשת',
        },
        description: {
          en: 'Final step — EDENOR activates your prosumer (usuario-generador) status. You receive a new billing scheme that credits injected energy. Your first bill with solar credits will arrive in the next billing cycle.',
          he: 'שלב אחרון — EDENOR מפעילה את סטטוס הצרכן-יצרן (usuario-generador) שלכם. תקבלו תוכנית חיוב חדשה שמזכה אנרגיה מוזרקת. החשבון הראשון עם זיכויי סולאר יגיע במחזור החיוב הבא.',
        },
        duration: { en: '5-10 business days', he: '5-10 ימי עבודה' },
        tips: {
          en: ['Monitor your first few bills carefully to verify credits are applied correctly', 'Keep all documentation filed — you may need it for disputes or audits'],
          he: ['עקבו בקפידה אחרי החשבונות הראשונים לוודא שהזיכויים מיושמים נכון', 'שמרו את כל התיעוד — ייתכן שתצטרכו אותו לבירורים או ביקורות'],
        },
      },
    ],
    requiredDocuments: {
      en: [
        'National ID (DNI) — front and back copy',
        'Last 3 electricity bills',
        'Property deed or rental agreement',
        'Single-line electrical diagram (esquema unifilar)',
        'Equipment datasheets (panels, inverter)',
        'Inverter grid compliance certificate',
        'Licensed electrician declaration (declaración jurada)',
        'Municipal construction permit',
        'Structural load assessment',
        'CAMMESA prosumer registration',
      ],
      he: [
        'תעודת זהות (DNI) — העתק קדמי ואחורי',
        '3 חשבונות חשמל אחרונים',
        'נסח טאבו או הסכם שכירות',
        'דיאגרמת קו יחיד חשמלית (esquema unifilar)',
        'גליונות נתוני ציוד (פנלים, ממיר)',
        'אישור תאימות ממיר לרשת',
        'הצהרת חשמלאי מוסמך (declaración jurada)',
        'היתר בנייה מוניציפלי',
        'הערכת עומס מבנית',
        'רישום צרכן-יצרן ב-CAMMESA',
      ],
    },
    fees: [
      {
        concept: { en: 'Technical feasibility study', he: 'בדיקת היתכנות טכנית' },
        amount: 'ARS 45,000',
        notes: { en: 'One-time, non-refundable', he: 'חד פעמי, לא ניתן להחזרה' },
      },
      {
        concept: { en: 'Bidirectional meter', he: 'מונה דו-כיווני' },
        amount: 'ARS 35,000-60,000',
        notes: { en: 'Includes installation labor', he: 'כולל עבודת התקנה' },
      },
      {
        concept: { en: 'Municipal permit', he: 'היתר מוניציפלי' },
        amount: 'ARS 50,000-100,000',
        notes: { en: 'Varies by municipality', he: 'משתנה לפי עירייה' },
      },
      {
        concept: { en: 'Connection activation', he: 'הפעלת חיבור' },
        amount: 'ARS 15,000',
        notes: { en: 'Administrative fee', he: 'דמי ניהול' },
      },
    ],
    tips: {
      en: [
        'EDENOR has the most streamlined DG process in Argentina — use their Virtual Office',
        'Systems under 10 kW typically get approved within 30 days total',
        'Have your licensed electrician prepare the single-line diagram from the start',
        'The net billing credit rate is approximately 50-60% of the consumption tariff',
        'Follow up politely but persistently — the GD department is often backlogged',
      ],
      he: [
        'ל-EDENOR יש את תהליך הייצור המבוזר הכי יעיל בארגנטינה — השתמשו במשרד הווירטואלי',
        'מערכות מתחת ל-10 kW בדרך כלל מאושרות תוך 30 יום סה"כ',
        'בקשו מהחשמלאי המוסמך להכין את דיאגרמת הקו היחיד מההתחלה',
        'שיעור זיכוי ה-net billing הוא כ-50-60% מתעריף הצריכה',
        'עקבו בנימוס אך בהתמדה — מחלקת הייצור המבוזר לעתים עמוסה',
      ],
    },
    commonIssues: {
      en: [
        'Transformer capacity exceeded — may need to wait for grid upgrade or reduce system size',
        'Delays in feasibility study response — follow up after 15 business days',
        'Single-line diagram rejected — ensure it includes the isolation switch and meter location',
        'Municipal permit delays in certain partido (districts) — start this early',
        'Inverter not on approved list — verify IRAM/IEC compliance before purchasing',
      ],
      he: [
        'חריגה מקיבולת שנאי — ייתכן שתצטרכו לחכות לשדרוג רשת או להקטין מערכת',
        'עיכובים בתגובת בדיקת היתכנות — עקבו אחרי 15 ימי עבודה',
        'דחיית דיאגרמת קו יחיד — ודאו שהיא כוללת מפסק בידוד ומיקום מונה',
        'עיכובי היתר מוניציפלי בפארטידואים מסוימים — התחילו מוקדם',
        'ממיר לא ברשימה מאושרת — ודאו תאימות IRAM/IEC לפני רכישה',
      ],
    },
    contactTips: {
      en: 'Call the GD line (0800-666-3366 option 4) during mornings (8-11 AM) for shorter wait times. Email generacion.distribuida@edenor.com for non-urgent queries — expect 3-5 day response.',
      he: 'התקשרו לקו ייצור מבוזר (0800-666-3366 אופציה 4) בבקרים (8-11) לזמני המתנה קצרים. שלחו מייל ל-generacion.distribuida@edenor.com לשאלות לא דחופות — צפו לתגובה תוך 3-5 ימים.',
    },
  },

  // 2. EDESUR — Buenos Aires Sur
  {
    id: 'buenosaires',
    province: 'Buenos Aires (Provincia)',
    utilityName: 'EDESUR',
    website: 'https://www.edesur.com.ar',
    phone: '0800-333-3787',
    email: 'gd@edesur.com.ar',
    address: 'San José 140, CABA',
    netMeteringStatus: 'active',
    maxSystemSizeKw: 300,
    connectionProcess: [
      {
        step: 1,
        title: { en: 'Submit connection request', he: 'הגשת בקשת חיבור' },
        description: {
          en: 'File the connection request through EDESUR\'s online portal or in person at a commercial office. You need form FGD-001 and your client number (número de cliente).',
          he: 'הגישו את בקשת החיבור דרך הפורטל המקוון של EDESUR או באופן אישי במשרד מסחרי. תצטרכו טופס FGD-001 ומספר לקוח (número de cliente).',
        },
        duration: { en: '1-3 days', he: '1-3 ימים' },
        documents: {
          en: ['Form FGD-001', 'Copy of DNI', 'Last electricity bill', 'Property documentation'],
          he: ['טופס FGD-001', 'העתק DNI', 'חשבון חשמל אחרון', 'מסמכי בעלות נכס'],
        },
      },
      {
        step: 2,
        title: { en: 'Grid capacity evaluation', he: 'הערכת קיבולת רשת' },
        description: {
          en: 'EDESUR evaluates the local grid capacity — transformer loading, line voltage, and existing DG penetration in your feeder. For commercial systems (>50 kW), additional power quality studies may be required.',
          he: 'EDESUR מעריכה את קיבולת הרשת המקומית — עומס שנאי, מתח קו, וחדירת ייצור מבוזר קיימת במזין שלכם. למערכות מסחריות (>50 kW), ייתכן שיידרשו בדיקות איכות חשמל נוספות.',
        },
        duration: { en: '15-30 business days', he: '15-30 ימי עבודה' },
        fee: 'ARS 50,000',
      },
      {
        step: 3,
        title: { en: 'Design review and approval', he: 'סקירה ואישור תכנון' },
        description: {
          en: 'Submit the technical design package to EDESUR\'s engineering department. Must include single-line diagram, equipment specs, protection scheme, and grounding plan.',
          he: 'הגישו את חבילת התכנון הטכני למחלקת ההנדסה של EDESUR. חייבת לכלול דיאגרמת קו יחיד, מפרטי ציוד, תוכנית הגנות ותוכנית הארקה.',
        },
        duration: { en: '10-20 business days', he: '10-20 ימי עבודה' },
        documents: {
          en: ['Single-line diagram', 'Equipment datasheets', 'Protection coordination study', 'Grounding plan'],
          he: ['דיאגרמת קו יחיד', 'גליונות נתוני ציוד', 'תוכנית תיאום הגנות', 'תוכנית הארקה'],
        },
      },
      {
        step: 4,
        title: { en: 'Obtain municipal permit', he: 'קבלת היתר מוניציפלי' },
        description: {
          en: 'Apply for the construction/installation permit at your local municipality. In Buenos Aires Province, requirements vary significantly between municipios — check with your local office.',
          he: 'הגישו בקשה להיתר בנייה/התקנה בעירייה המקומית שלכם. בפרובינציית בואנוס איירס, הדרישות משתנות משמעותית בין מוניציפיואים — בדקו עם המשרד המקומי.',
        },
        duration: { en: '5-20 business days', he: '5-20 ימי עבודה' },
        fee: 'ARS 40,000-80,000',
      },
      {
        step: 5,
        title: { en: 'Notify installation start', he: 'הודעה על תחילת התקנה' },
        description: {
          en: 'Send written notification to EDESUR at least 5 business days before starting the installation. Include the licensed electrician\'s matrícula number and installation schedule.',
          he: 'שלחו הודעה בכתב ל-EDESUR לפחות 5 ימי עבודה לפני תחילת ההתקנה. כללו את מספר הרישיון של החשמלאי ולוח זמנים להתקנה.',
        },
        duration: { en: '5 days notice', he: '5 ימי הודעה מראש' },
      },
      {
        step: 6,
        title: { en: 'Inspection by EDESUR', he: 'בדיקה על ידי EDESUR' },
        description: {
          en: 'Request EDESUR inspection after installation completion. An engineer will verify compliance with ENRE Resolution 92/2023, check protections, verify anti-islanding, and test the system.',
          he: 'בקשו בדיקת EDESUR לאחר סיום ההתקנה. מהנדס יאמת תאימות לרזולוציית ENRE 92/2023, יבדוק הגנות, יאמת anti-islanding ויבדוק את המערכת.',
        },
        duration: { en: '10-20 business days', he: '10-20 ימי עבודה' },
        documents: {
          en: ['Completion certificate from electrician', 'Installation photos', 'Equipment test results'],
          he: ['אישור סיום מחשמלאי', 'תמונות התקנה', 'תוצאות בדיקת ציוד'],
        },
      },
      {
        step: 7,
        title: { en: 'Meter replacement', he: 'החלפת מונה' },
        description: {
          en: 'EDESUR replaces your existing meter with a bidirectional meter capable of measuring energy imports and exports. Coordinate a time window with EDESUR for the meter swap.',
          he: 'EDESUR מחליפה את המונה הקיים שלכם במונה דו-כיווני המסוגל למדוד יבוא ויצוא אנרגיה. תאמו חלון זמן עם EDESUR להחלפת המונה.',
        },
        duration: { en: '5-15 business days', he: '5-15 ימי עבודה' },
        fee: 'ARS 40,000-65,000',
      },
      {
        step: 8,
        title: { en: 'Prosumer activation', he: 'הפעלת סטטוס צרכן-יצרן' },
        description: {
          en: 'EDESUR activates your usuario-generador status in the billing system. You begin receiving net billing credits for injected energy on your next bill.',
          he: 'EDESUR מפעילה את סטטוס הצרכן-יצרן שלכם במערכת החיוב. תתחילו לקבל זיכויי net billing על אנרגיה מוזרקת בחשבון הבא.',
        },
        duration: { en: '5-10 business days', he: '5-10 ימי עבודה' },
      },
    ],
    requiredDocuments: {
      en: [
        'DNI (national ID) — front and back',
        'Last 3 electricity bills',
        'Property title or lease agreement',
        'Form FGD-001 completed',
        'Single-line electrical diagram',
        'Equipment specifications and datasheets',
        'Inverter compliance certificates',
        'Licensed electrician matrícula proof',
        'Municipal installation permit',
        'CAMMESA user-generator registration',
      ],
      he: [
        'DNI (תעודת זהות) — קדמי ואחורי',
        '3 חשבונות חשמל אחרונים',
        'נסח בעלות או הסכם שכירות',
        'טופס FGD-001 מלא',
        'דיאגרמת קו יחיד חשמלית',
        'מפרטים וגליונות נתוני ציוד',
        'אישורי תאימות ממיר',
        'אישור רישיון חשמלאי (matrícula)',
        'היתר התקנה מוניציפלי',
        'רישום צרכן-יצרן ב-CAMMESA',
      ],
    },
    fees: [
      {
        concept: { en: 'Grid capacity study', he: 'בדיקת קיבולת רשת' },
        amount: 'ARS 50,000',
        notes: { en: 'One-time evaluation fee', he: 'דמי הערכה חד פעמיים' },
      },
      {
        concept: { en: 'Bidirectional meter + installation', he: 'מונה דו-כיווני + התקנה' },
        amount: 'ARS 40,000-65,000',
        notes: { en: 'Depends on meter model', he: 'תלוי בדגם המונה' },
      },
      {
        concept: { en: 'Municipal permit', he: 'היתר מוניציפלי' },
        amount: 'ARS 40,000-80,000',
        notes: { en: 'Varies by municipio', he: 'משתנה לפי מוניציפיו' },
      },
    ],
    tips: {
      en: [
        'EDESUR process is slightly slower than EDENOR — budget 60-90 days total',
        'Commercial offices in La Plata and Quilmes have dedicated DG staff',
        'Request tracking number (número de expediente) for all submissions',
        'For systems >50 kW, engage an engineering firm for the power quality study',
      ],
      he: [
        'תהליך EDESUR מעט איטי מ-EDENOR — תכננו 60-90 ימים סה"כ',
        'למשרדים המסחריים בלה פלאטה וקילמס יש צוות ייעודי לייצור מבוזר',
        'בקשו מספר מעקב (número de expediente) לכל הגשה',
        'למערכות >50 kW, שכרו חברת הנדסה לבדיקת איכות חשמל',
      ],
    },
    commonIssues: {
      en: [
        'Higher rejection rate for systems >50 kW due to grid constraints in southern zones',
        'Longer processing times in summer months (December-February)',
        'Some municipios in Buenos Aires Province are unfamiliar with DG permits',
        'Meter stock shortages can delay step 7 by 2-4 additional weeks',
      ],
      he: [
        'שיעור דחייה גבוה יותר למערכות >50 kW בגלל אילוצי רשת באזורים הדרומיים',
        'זמני עיבוד ארוכים יותר בחודשי קיץ (דצמבר-פברואר)',
        'חלק מהמוניציפיואים בפרובינציית בואנוס איירס לא מכירים היתרי ייצור מבוזר',
        'מחסור במלאי מונים יכול לעכב שלב 7 ב-2-4 שבועות נוספים',
      ],
    },
    contactTips: {
      en: 'Use the GD-specific email gd@edesur.com.ar for fastest response. For urgent issues, visit the Morón or La Plata commercial office with all documentation in person.',
      he: 'השתמשו במייל הייעודי לייצור מבוזר gd@edesur.com.ar לתגובה מהירה. לנושאים דחופים, בקרו במשרד המסחרי במורון או לה פלאטה עם כל התיעוד באופן אישי.',
    },
  },

  // 3. EPEC — Córdoba
  {
    id: 'cordoba',
    province: 'Córdoba',
    utilityName: 'EPEC',
    website: 'https://www.epec.com.ar',
    phone: '0800-444-3732',
    email: 'generaciondistribuida@epec.com.ar',
    address: 'Av. Poeta Lugones 396, Córdoba Capital',
    netMeteringStatus: 'active',
    maxSystemSizeKw: 500,
    connectionProcess: [
      {
        step: 1,
        title: { en: 'Register as prosumer applicant', he: 'הרשמה כמבקש צרכן-יצרן' },
        description: {
          en: 'Submit application through EPEC\'s dedicated DG portal. Córdoba\'s provincial law 10.604 provides a favorable framework with true net metering (kWh-for-kWh credits). Include your NIS and planned capacity.',
          he: 'הגישו בקשה דרך פורטל הייצור המבוזר הייעודי של EPEC. חוק 10.604 של קורדובה מספק מסגרת נוחה עם net metering אמיתי (זיכויים kWh מול kWh). כללו NIS והספק מתוכנן.',
        },
        duration: { en: '1-2 days', he: '1-2 ימים' },
        documents: {
          en: ['Application form (Formulario GD)', 'DNI copy', 'Last 2 electricity bills', 'Property documentation'],
          he: ['טופס בקשה (Formulario GD)', 'העתק DNI', '2 חשבונות חשמל אחרונים', 'מסמכי נכס'],
        },
      },
      {
        step: 2,
        title: { en: 'Technical evaluation', he: 'הערכה טכנית' },
        description: {
          en: 'EPEC evaluates grid conditions at your connection point. Córdoba\'s grid is generally more receptive to DG due to lower urban density and newer infrastructure in many areas.',
          he: 'EPEC מעריכה את תנאי הרשת בנקודת החיבור שלכם. הרשת של קורדובה בדרך כלל קולטנית יותר לייצור מבוזר בזכות צפיפות עירונית נמוכה יותר ותשתית חדשה יותר באזורים רבים.',
        },
        duration: { en: '10-20 business days', he: '10-20 ימי עבודה' },
        fee: 'ARS 35,000',
      },
      {
        step: 3,
        title: { en: 'System design submission', he: 'הגשת תכנון מערכת' },
        description: {
          en: 'Present the complete technical project to EPEC, including all electrical diagrams, equipment certifications, and the licensed electrician\'s credentials. EPEC requires IRAM 2039-2 compliance.',
          he: 'הציגו את הפרויקט הטכני המלא ל-EPEC, כולל כל הדיאגרמות החשמליות, אישורי ציוד ואישורים של החשמלאי המוסמך. EPEC דורשת תאימות IRAM 2039-2.',
        },
        duration: { en: '10-15 business days', he: '10-15 ימי עבודה' },
        documents: {
          en: ['Single-line diagram', 'Equipment datasheets and certifications', 'Electrician matrícula', 'Protection settings calculation'],
          he: ['דיאגרמת קו יחיד', 'גליונות נתונים ואישורי ציוד', 'רישיון חשמלאי', 'חישוב הגדרות הגנה'],
        },
      },
      {
        step: 4,
        title: { en: 'Municipal authorization', he: 'אישור מוניציפלי' },
        description: {
          en: 'Obtain the municipal installation permit. Córdoba Capital has a simplified process through the CPC (Centro de Participación Comunal). Other cities vary.',
          he: 'קבלו היתר התקנה מוניציפלי. בירת קורדובה מציעה תהליך פשוט דרך CPC (Centro de Participación Comunal). ערים אחרות משתנות.',
        },
        duration: { en: '5-10 business days', he: '5-10 ימי עבודה' },
        fee: 'ARS 30,000-60,000',
      },
      {
        step: 5,
        title: { en: 'Installation phase', he: 'שלב התקנה' },
        description: {
          en: 'Perform installation with a licensed electrician. Notify EPEC of start and expected completion. Follow IRAM 3501 for rooftop installations and IRAM 2039-2 for the electrical connection.',
          he: 'בצעו התקנה עם חשמלאי מוסמך. הודיעו ל-EPEC על תחילה וסיום צפוי. עקבו אחר IRAM 3501 להתקנות גג ו-IRAM 2039-2 לחיבור החשמלי.',
        },
        duration: { en: '3-7 days', he: '3-7 ימים' },
      },
      {
        step: 6,
        title: { en: 'EPEC inspection', he: 'בדיקת EPEC' },
        description: {
          en: 'Request the technical inspection. EPEC\'s inspectors verify protections, anti-islanding function, grounding, and overall compliance. They may test injection by disconnecting the grid temporarily.',
          he: 'בקשו בדיקה טכנית. הפקחים של EPEC מאמתים הגנות, פונקציית anti-islanding, הארקה ותאימות כללית. הם עשויים לבדוק הזרקה על ידי ניתוק זמני של הרשת.',
        },
        duration: { en: '10-15 business days', he: '10-15 ימי עבודה' },
      },
      {
        step: 7,
        title: { en: 'Meter change', he: 'החלפת מונה' },
        description: {
          en: 'EPEC installs the bidirectional meter. Córdoba uses net metering (not net billing), so injected kWh are credited 1:1 against consumed kWh within the billing period.',
          he: 'EPEC מתקינה את המונה הדו-כיווני. קורדובה משתמשת ב-net metering (לא net billing), כך ש-kWh מוזרקים מזוכים 1:1 מול kWh נצרכים בתוך תקופת החיוב.',
        },
        duration: { en: '5-10 business days', he: '5-10 ימי עבודה' },
        fee: 'ARS 30,000-50,000',
      },
      {
        step: 8,
        title: { en: 'System activation', he: 'הפעלת מערכת' },
        description: {
          en: 'EPEC activates the net metering scheme. Excess kWh roll over to the next billing period (up to 6 months in Córdoba). Monitor your first bills to verify correct crediting.',
          he: 'EPEC מפעילה את תוכנית ה-net metering. עודפי kWh מועברים לתקופת החיוב הבאה (עד 6 חודשים בקורדובה). עקבו אחרי החשבונות הראשונים לוידוא זיכוי נכון.',
        },
        duration: { en: '3-5 business days', he: '3-5 ימי עבודה' },
      },
    ],
    requiredDocuments: {
      en: [
        'DNI copy',
        'Last 2 electricity bills',
        'Property deed or rental contract',
        'EPEC application form',
        'Single-line diagram',
        'Equipment specifications',
        'Inverter certifications (IRAM/IEC)',
        'Licensed electrician matrícula',
        'Municipal permit',
      ],
      he: [
        'העתק DNI',
        '2 חשבונות חשמל אחרונים',
        'נסח בעלות או חוזה שכירות',
        'טופס בקשת EPEC',
        'דיאגרמת קו יחיד',
        'מפרטי ציוד',
        'אישורי ממיר (IRAM/IEC)',
        'רישיון חשמלאי (matrícula)',
        'היתר מוניציפלי',
      ],
    },
    fees: [
      {
        concept: { en: 'Technical evaluation', he: 'הערכה טכנית' },
        amount: 'ARS 35,000',
      },
      {
        concept: { en: 'Bidirectional meter', he: 'מונה דו-כיווני' },
        amount: 'ARS 30,000-50,000',
      },
      {
        concept: { en: 'Municipal permit', he: 'היתר מוניציפלי' },
        amount: 'ARS 30,000-60,000',
      },
    ],
    tips: {
      en: [
        'Córdoba has true NET METERING (1:1 kWh credits) — the best scheme in Argentina',
        'EPEC process is faster than Buenos Aires utilities — budget 45-60 days',
        'The 500 kW max is the highest limit among Argentine utilities',
        'Credits roll over up to 6 months — design for annual self-consumption',
        'EPEC has a dedicated DG email that responds within 5 business days',
      ],
      he: [
        'לקורדובה יש NET METERING אמיתי (זיכוי 1:1 kWh) — התוכנית הטובה ביותר בארגנטינה',
        'תהליך EPEC מהיר יותר מחברות חשמל בבואנוס איירס — תכננו 45-60 ימים',
        'מגבלת 500 kW היא הגבוהה ביותר בין חברות החשמל בארגנטינה',
        'זיכויים מועברים עד 6 חודשים — תכננו לצריכה עצמית שנתית',
        'ל-EPEC יש מייל ייעודי לייצור מבוזר שמגיב תוך 5 ימי עבודה',
      ],
    },
    commonIssues: {
      en: [
        'Rural areas may have single-phase limitations — verify before specifying a 3-phase inverter',
        'Some CPC offices are unfamiliar with solar permits — bring printed regulation references',
        'High irradiation means oversized systems may face curtailment — size for consumption',
      ],
      he: [
        'אזורים כפריים עשויים לסבול ממגבלות פאזה בודדת — ודאו לפני ציון ממיר תלת-פאזי',
        'חלק ממשרדי CPC לא מכירים היתרים סולאריים — הביאו הפניות רגולציה מודפסות',
        'קרינה גבוהה פירושה שמערכות מוגדלות עלולות להיות מוגבלות — התאימו לצריכה',
      ],
    },
    contactTips: {
      en: 'Email generaciondistribuida@epec.com.ar for all DG inquiries. EPEC\'s Córdoba Capital office on Av. Poeta Lugones has a dedicated DG desk on the 2nd floor — no appointment needed.',
      he: 'שלחו מייל ל-generaciondistribuida@epec.com.ar לכל שאלות ייצור מבוזר. למשרד EPEC בבירת קורדובה ברח\' Poeta Lugones יש דלפק ייעודי לייצור מבוזר בקומה 2 — ללא צורך בתור.',
    },
  },

  // 4. EPE — Santa Fe
  {
    id: 'santafe',
    province: 'Santa Fe',
    utilityName: 'EPE Santa Fe',
    website: 'https://www.epe.santafe.gov.ar',
    phone: '0800-777-3737',
    email: 'gd@epe.santafe.gov.ar',
    netMeteringStatus: 'active',
    maxSystemSizeKw: 300,
    connectionProcess: [
      {
        step: 1,
        title: { en: 'Submit application to EPE', he: 'הגשת בקשה ל-EPE' },
        description: {
          en: 'File the distributed generation application at your local EPE office (Rosario or Santa Fe capital). Provincial Law 13.903 governs the process. Include planned capacity and consumption data.',
          he: 'הגישו בקשת ייצור מבוזר במשרד EPE המקומי (רוסריו או בירת סנטה פה). חוק פרובינציאלי 13.903 מסדיר את התהליך. כללו הספק מתוכנן ונתוני צריכה.',
        },
        duration: { en: '1-3 days', he: '1-3 ימים' },
      },
      {
        step: 2,
        title: { en: 'Technical feasibility assessment', he: 'הערכת היתכנות טכנית' },
        description: {
          en: 'EPE reviews the grid capacity at your connection point. Santa Fe\'s grid is generally well-maintained, and residential systems under 10 kW rarely face capacity issues.',
          he: 'EPE בוחנת את קיבולת הרשת בנקודת החיבור שלכם. רשת סנטה פה מתוחזקת היטב בדרך כלל, ומערכות מגורים מתחת ל-10 kW לעיתים רחוקות נתקלות בבעיות קיבולת.',
        },
        duration: { en: '15-25 business days', he: '15-25 ימי עבודה' },
        fee: 'ARS 30,000',
      },
      {
        step: 3,
        title: { en: 'Technical project submission', he: 'הגשת פרויקט טכני' },
        description: { en: 'Submit full design package with single-line diagram, specs, and electrician certification.', he: 'הגישו חבילת תכנון מלאה עם דיאגרמת קו יחיד, מפרטים ואישור חשמלאי.' },
        duration: { en: '10-15 business days', he: '10-15 ימי עבודה' },
      },
      {
        step: 4,
        title: { en: 'Municipal permit', he: 'היתר מוניציפלי' },
        description: { en: 'Obtain local construction permit from Rosario, Santa Fe capital, or your city municipality.', he: 'קבלו היתר בנייה מקומי מרוסריו, בירת סנטה פה או העירייה שלכם.' },
        duration: { en: '5-15 business days', he: '5-15 ימי עבודה' },
        fee: 'ARS 30,000-50,000',
      },
      {
        step: 5,
        title: { en: 'Installation notification', he: 'הודעה על התקנה' },
        description: { en: 'Notify EPE of the installation schedule and licensed electrician details.', he: 'הודיעו ל-EPE על לוח זמני ההתקנה ופרטי החשמלאי המוסמך.' },
        duration: { en: '3 days notice', he: '3 ימי הודעה מראש' },
      },
      {
        step: 6,
        title: { en: 'Post-installation inspection', he: 'בדיקה לאחר התקנה' },
        description: { en: 'EPE inspects the installation for safety and compliance with provincial regulations.', he: 'EPE בודקת את ההתקנה לבטיחות ותאימות לתקנות הפרובינציאליות.' },
        duration: { en: '10-15 business days', he: '10-15 ימי עבודה' },
      },
      {
        step: 7,
        title: { en: 'Meter installation', he: 'התקנת מונה' },
        description: { en: 'EPE installs the bidirectional meter. Net billing scheme applies — injected energy is credited at a regulated rate.', he: 'EPE מתקינה את המונה הדו-כיווני. חל תוכנית net billing — אנרגיה מוזרקת מזוכה בתעריף מוסדר.' },
        duration: { en: '5-10 business days', he: '5-10 ימי עבודה' },
        fee: 'ARS 30,000-45,000',
      },
      {
        step: 8,
        title: { en: 'Activation and billing', he: 'הפעלה וחיוב' },
        description: { en: 'System goes live with net billing credits reflected in your next billing cycle.', he: 'המערכת עולה לאוויר עם זיכויי net billing המשתקפים במחזור החיוב הבא.' },
        duration: { en: '5 business days', he: '5 ימי עבודה' },
      },
    ],
    requiredDocuments: {
      en: ['DNI copy', 'Electricity bills', 'Property documentation', 'Single-line diagram', 'Equipment specs', 'Electrician matrícula', 'Municipal permit'],
      he: ['העתק DNI', 'חשבונות חשמל', 'מסמכי נכס', 'דיאגרמת קו יחיד', 'מפרטי ציוד', 'רישיון חשמלאי', 'היתר מוניציפלי'],
    },
    fees: [
      { concept: { en: 'Feasibility study', he: 'בדיקת היתכנות' }, amount: 'ARS 30,000' },
      { concept: { en: 'Bidirectional meter', he: 'מונה דו-כיווני' }, amount: 'ARS 30,000-45,000' },
      { concept: { en: 'Municipal permit', he: 'היתר מוניציפלי' }, amount: 'ARS 30,000-50,000' },
    ],
    tips: {
      en: [
        'Rosario has the most DG installations in Santa Fe — installers there are experienced',
        'EPE\'s online portal is well-organized for tracking your application status',
        'Net billing rate in Santa Fe is approximately 55% of consumption tariff',
      ],
      he: [
        'לרוסריו יש את מירב התקנות הייצור המבוזר בסנטה פה — המתקינים שם מנוסים',
        'הפורטל המקוון של EPE מאורגן היטב למעקב אחר סטטוס הבקשה',
        'תעריף net billing בסנטה פה הוא כ-55% מתעריף הצריכה',
      ],
    },
    commonIssues: {
      en: [
        'Rural areas in northern Santa Fe may have grid limitations',
        'Processing slows down significantly in January (vacation season)',
      ],
      he: [
        'אזורים כפריים בצפון סנטה פה עשויים לסבול ממגבלות רשת',
        'העיבוד מאט משמעותית בינואר (עונת חופשות)',
      ],
    },
    contactTips: {
      en: 'The Rosario EPE office on Corrientes 1381 has dedicated DG staff. Email gd@epe.santafe.gov.ar for application status updates.',
      he: 'למשרד EPE ברוסריו ברח\' Corrientes 1381 יש צוות ייעודי לייצור מבוזר. שלחו מייל ל-gd@epe.santafe.gov.ar לעדכוני סטטוס בקשה.',
    },
  },

  // 5. EDEMSA — Mendoza
  {
    id: 'mendoza',
    province: 'Mendoza',
    utilityName: 'EDEMSA',
    website: 'https://www.edemsa.com',
    phone: '0800-222-3327',
    email: 'generaciondistribuida@edemsa.com',
    netMeteringStatus: 'active',
    maxSystemSizeKw: 300,
    connectionProcess: [
      {
        step: 1,
        title: { en: 'Application at EDEMSA', he: 'בקשה ב-EDEMSA' },
        description: {
          en: 'Submit DG application at EDEMSA offices or online. Mendoza\'s Ley 9.084 provides a strong net metering framework. The region\'s excellent solar resource (5.4 kWh/m2/day) makes solar highly attractive.',
          he: 'הגישו בקשת ייצור מבוזר במשרדי EDEMSA או באינטרנט. חוק 9.084 של מנדוזה מספק מסגרת net metering חזקה. משאב הסולאר המעולה של האזור (5.4 kWh/m2/יום) הופך סולאר לאטרקטיבי מאוד.',
        },
        duration: { en: '1-2 days', he: '1-2 ימים' },
      },
      {
        step: 2,
        title: { en: 'Grid capacity study', he: 'בדיקת קיבולת רשת' },
        description: { en: 'EDEMSA evaluates transformer and feeder capacity. Mendoza\'s grid is generally well-suited for residential DG.', he: 'EDEMSA מעריכה קיבולת שנאי ומזין. רשת מנדוזה מתאימה בדרך כלל לייצור מבוזר למגורים.' },
        duration: { en: '10-20 business days', he: '10-20 ימי עבודה' },
        fee: 'ARS 30,000',
      },
      {
        step: 3,
        title: { en: 'Design approval', he: 'אישור תכנון' },
        description: { en: 'Submit technical design with single-line diagram and equipment certifications.', he: 'הגישו תכנון טכני עם דיאגרמת קו יחיד ואישורי ציוד.' },
        duration: { en: '10-15 business days', he: '10-15 ימי עבודה' },
      },
      {
        step: 4,
        title: { en: 'Municipal permit', he: 'היתר מוניציפלי' },
        description: { en: 'Obtain permit from Mendoza municipality. The provincial capital has a streamlined process for solar installations.', he: 'קבלו היתר מעיריית מנדוזה. לבירה הפרובינציאלית יש תהליך יעיל להתקנות סולאריות.' },
        duration: { en: '5-10 business days', he: '5-10 ימי עבודה' },
        fee: 'ARS 25,000-50,000',
      },
      {
        step: 5,
        title: { en: 'Installation', he: 'התקנה' },
        description: { en: 'Install the system with a licensed electrician. Mendoza\'s dry climate simplifies installation logistics.', he: 'התקינו את המערכת עם חשמלאי מוסמך. האקלים היבש של מנדוזה מפשט את לוגיסטיקת ההתקנה.' },
        duration: { en: '2-5 days', he: '2-5 ימים' },
      },
      {
        step: 6,
        title: { en: 'EDEMSA inspection', he: 'בדיקת EDEMSA' },
        description: { en: 'EDEMSA inspects the installation for compliance with provincial and national standards.', he: 'EDEMSA בודקת את ההתקנה לתאימות לתקנים הפרובינציאליים והלאומיים.' },
        duration: { en: '10-15 business days', he: '10-15 ימי עבודה' },
      },
      {
        step: 7,
        title: { en: 'Meter installation', he: 'התקנת מונה' },
        description: { en: 'Bidirectional meter installed by EDEMSA. Net metering scheme — 1:1 kWh credits.', he: 'מונה דו-כיווני מותקן על ידי EDEMSA. תוכנית net metering — זיכוי 1:1 kWh.' },
        duration: { en: '5-10 business days', he: '5-10 ימי עבודה' },
        fee: 'ARS 28,000-45,000',
      },
      {
        step: 8,
        title: { en: 'Activation', he: 'הפעלה' },
        description: { en: 'System connected and prosumer status activated. Mendoza allows credit rollover for up to 6 months.', he: 'מערכת מחוברת וסטטוס צרכן-יצרן מופעל. מנדוזה מאפשרת העברת זיכויים עד 6 חודשים.' },
        duration: { en: '3-5 business days', he: '3-5 ימי עבודה' },
      },
    ],
    requiredDocuments: {
      en: ['DNI copy', 'Electricity bills', 'Property documentation', 'Single-line diagram', 'Equipment specs', 'Electrician matrícula', 'Municipal permit'],
      he: ['העתק DNI', 'חשבונות חשמל', 'מסמכי נכס', 'דיאגרמת קו יחיד', 'מפרטי ציוד', 'רישיון חשמלאי', 'היתר מוניציפלי'],
    },
    fees: [
      { concept: { en: 'Grid study', he: 'בדיקת רשת' }, amount: 'ARS 30,000' },
      { concept: { en: 'Bidirectional meter', he: 'מונה דו-כיווני' }, amount: 'ARS 28,000-45,000' },
      { concept: { en: 'Municipal permit', he: 'היתר מוניציפלי' }, amount: 'ARS 25,000-50,000' },
    ],
    tips: {
      en: [
        'Mendoza has net metering (1:1 credits) — excellent economics',
        'High solar resource (5.4 kWh/m2/day) means smaller systems generate more',
        'Local installers cluster in Mendoza Capital and San Rafael — good availability',
        'Dry climate means less panel cleaning needed compared to humid regions',
      ],
      he: [
        'למנדוזה יש net metering (זיכוי 1:1) — כלכליות מעולה',
        'משאב סולארי גבוה (5.4 kWh/m2/יום) אומר שמערכות קטנות יותר מייצרות יותר',
        'מתקינים מקומיים מרוכזים בבירת מנדוזה וסן רפאל — זמינות טובה',
        'אקלים יבש אומר פחות צורך בניקוי פנלים בהשוואה לאזורים לחים',
      ],
    },
    commonIssues: {
      en: [
        'Hail risk in agricultural zones — consider hail-resistant panels or insurance',
        'Seismic zone — mounting structures must comply with earthquake codes',
      ],
      he: [
        'סיכון ברד באזורים חקלאיים — שקלו פנלים עמידים לברד או ביטוח',
        'אזור סיסמי — מבני הרכבה חייבים לעמוד בתקני רעידות אדמה',
      ],
    },
    contactTips: {
      en: 'EDEMSA\'s DG team in Mendoza Capital is responsive by email. Visit the main office on Calle España for in-person consultations.',
      he: 'צוות הייצור המבוזר של EDEMSA בבירת מנדוזה מגיב היטב במייל. בקרו במשרד הראשי ברח\' España לייעוץ אישי.',
    },
  },

  // 6. EDEA — Buenos Aires Interior (Mar del Plata)
  {
    id: 'buenosaires-interior',
    province: 'Buenos Aires Interior (Mar del Plata)',
    utilityName: 'EDEA',
    website: 'https://www.edea.com.ar',
    phone: '0800-999-3332',
    netMeteringStatus: 'limited',
    maxSystemSizeKw: 100,
    connectionProcess: [
      {
        step: 1,
        title: { en: 'Initial inquiry to EDEA', he: 'פנייה ראשונית ל-EDEA' },
        description: {
          en: 'Contact EDEA to verify DG availability in your area. EDEA\'s program is more limited than EDENOR/EDESUR and covers Mar del Plata, Tandil, and surrounding areas. Not all feeders accept DG connections.',
          he: 'פנו ל-EDEA לאמת זמינות ייצור מבוזר באזורכם. התוכנית של EDEA מוגבלת יותר מ-EDENOR/EDESUR ומכסה את מר דל פלאטה, טנדיל והסביבה. לא כל המזינים מקבלים חיבורי ייצור מבוזר.',
        },
        duration: { en: '3-5 days', he: '3-5 ימים' },
      },
      {
        step: 2,
        title: { en: 'Feasibility evaluation', he: 'הערכת היתכנות' },
        description: { en: 'EDEA evaluates grid capacity. Limited program means stricter capacity checks.', he: 'EDEA מעריכה קיבולת רשת. תוכנית מוגבלת פירושה בדיקות קיבולת מחמירות יותר.' },
        duration: { en: '20-30 business days', he: '20-30 ימי עבודה' },
        fee: 'ARS 40,000',
      },
      {
        step: 3,
        title: { en: 'Design submission', he: 'הגשת תכנון' },
        description: { en: 'Submit technical design package following EDEA\'s specific requirements.', he: 'הגישו חבילת תכנון טכני בהתאם לדרישות הספציפיות של EDEA.' },
        duration: { en: '15-20 business days', he: '15-20 ימי עבודה' },
      },
      {
        step: 4,
        title: { en: 'Municipal permit', he: 'היתר מוניציפלי' },
        description: { en: 'Obtain permit from Mar del Plata or relevant municipality.', he: 'קבלו היתר ממר דל פלאטה או העירייה הרלוונטית.' },
        duration: { en: '10-20 business days', he: '10-20 ימי עבודה' },
        fee: 'ARS 40,000-70,000',
      },
      {
        step: 5,
        title: { en: 'Installation', he: 'התקנה' },
        description: { en: 'Install with licensed electrician. Coastal installations need marine-grade considerations.', he: 'התקינו עם חשמלאי מוסמך. התקנות חופיות דורשות התחשבות באיכות ימית.' },
        duration: { en: '3-5 days', he: '3-5 ימים' },
      },
      {
        step: 6,
        title: { en: 'Inspection', he: 'בדיקה' },
        description: { en: 'EDEA inspects the installation.', he: 'EDEA בודקת את ההתקנה.' },
        duration: { en: '15-25 business days', he: '15-25 ימי עבודה' },
      },
      {
        step: 7,
        title: { en: 'Meter installation', he: 'התקנת מונה' },
        description: { en: 'Bidirectional meter installed. May have longer lead times due to limited program scale.', he: 'מונה דו-כיווני מותקן. ייתכנו זמני אספקה ארוכים יותר בגלל היקף תוכנית מוגבל.' },
        duration: { en: '10-20 business days', he: '10-20 ימי עבודה' },
        fee: 'ARS 40,000-55,000',
      },
      {
        step: 8,
        title: { en: 'Activation', he: 'הפעלה' },
        description: { en: 'System activated under net billing scheme.', he: 'מערכת מופעלת תחת תוכנית net billing.' },
        duration: { en: '5-10 business days', he: '5-10 ימי עבודה' },
      },
    ],
    requiredDocuments: {
      en: ['DNI copy', 'Electricity bills', 'Property documentation', 'Single-line diagram', 'Equipment specs', 'Electrician matrícula', 'Municipal permit'],
      he: ['העתק DNI', 'חשבונות חשמל', 'מסמכי נכס', 'דיאגרמת קו יחיד', 'מפרטי ציוד', 'רישיון חשמלאי', 'היתר מוניציפלי'],
    },
    fees: [
      { concept: { en: 'Feasibility study', he: 'בדיקת היתכנות' }, amount: 'ARS 40,000' },
      { concept: { en: 'Bidirectional meter', he: 'מונה דו-כיווני' }, amount: 'ARS 40,000-55,000' },
      { concept: { en: 'Municipal permit', he: 'היתר מוניציפלי' }, amount: 'ARS 40,000-70,000' },
    ],
    tips: {
      en: [
        'Limited program — verify availability BEFORE purchasing equipment',
        'Mar del Plata\'s coastal environment requires corrosion-resistant mounting',
        'Budget 90-120 days total due to slower processing',
        'Smaller systems (3-5 kW) have higher approval rates',
      ],
      he: [
        'תוכנית מוגבלת — ודאו זמינות לפני רכישת ציוד',
        'הסביבה החופית של מר דל פלאטה דורשת הרכבה עמידה בפני קורוזיה',
        'תכננו 90-120 ימים סה"כ בגלל עיבוד איטי יותר',
        'מערכות קטנות (3-5 kW) זוכות לשיעור אישור גבוה יותר',
      ],
    },
    commonIssues: {
      en: [
        'Many areas not yet eligible for DG — check first',
        'Coastal salt air accelerates corrosion — use aluminum/stainless mounting',
        'Slower response times than Buenos Aires utilities',
      ],
      he: [
        'אזורים רבים עדיין לא זכאים לייצור מבוזר — בדקו קודם',
        'אוויר מלוח חופי מאיץ קורוזיה — השתמשו בהרכבת אלומיניום/נירוסטה',
        'זמני תגובה איטיים יותר מחברות חשמל בבואנוס איירס',
      ],
    },
    contactTips: {
      en: 'EDEA\'s DG program is small — call 0800-999-3332 and ask specifically for the "generación distribuida" department. Be patient with response times.',
      he: 'תוכנית הייצור המבוזר של EDEA קטנה — התקשרו 0800-999-3332 ובקשו במפורש את מחלקת "generación distribuida". התאזרו בסבלנות עם זמני תגובה.',
    },
  },

  // 7. EdERSA — Río Negro
  {
    id: 'rionegro',
    province: 'Río Negro',
    utilityName: 'EdERSA',
    website: 'https://www.edersa.com.ar',
    phone: '0800-444-3372',
    email: 'consultas@edersa.com.ar',
    netMeteringStatus: 'active',
    maxSystemSizeKw: 300,
    connectionProcess: [
      {
        step: 1,
        title: { en: 'Apply to EdERSA', he: 'הגשת בקשה ל-EdERSA' },
        description: {
          en: 'Submit DG application at EdERSA offices in Viedma, Bariloche, or General Roca. Patagonia context: wind+solar hybrid systems are common here due to complementary resources.',
          he: 'הגישו בקשת ייצור מבוזר במשרדי EdERSA בוידמה, ברילוצ\'ה או ג\'נרל רוקה. הקשר פטגוניה: מערכות היברידיות רוח+סולאר נפוצות כאן בזכות משאבים משלימים.',
        },
        duration: { en: '2-3 days', he: '2-3 ימים' },
      },
      {
        step: 2,
        title: { en: 'Grid evaluation', he: 'הערכת רשת' },
        description: { en: 'EdERSA evaluates local grid conditions. Patagonian grid can have voltage stability issues due to long distribution lines.', he: 'EdERSA מעריכה תנאי רשת מקומיים. רשת פטגוניה עלולה לסבול מבעיות יציבות מתח בגלל קווי חלוקה ארוכים.' },
        duration: { en: '15-25 business days', he: '15-25 ימי עבודה' },
        fee: 'ARS 30,000',
      },
      {
        step: 3,
        title: { en: 'Technical design review', he: 'סקירת תכנון טכני' },
        description: { en: 'Submit design package. In Patagonia, wind loading calculations for panel mounting are critical.', he: 'הגישו חבילת תכנון. בפטגוניה, חישובי עומס רוח להרכבת פנלים הם קריטיים.' },
        duration: { en: '10-20 business days', he: '10-20 ימי עבודה' },
      },
      {
        step: 4,
        title: { en: 'Municipal authorization', he: 'אישור מוניציפלי' },
        description: { en: 'Obtain local construction permit. Rural properties may have simplified requirements.', he: 'קבלו היתר בנייה מקומי. לנכסים כפריים עשויות להיות דרישות מפושטות.' },
        duration: { en: '5-15 business days', he: '5-15 ימי עבודה' },
        fee: 'ARS 20,000-40,000',
      },
      {
        step: 5,
        title: { en: 'Installation', he: 'התקנה' },
        description: { en: 'Install with licensed electrician. Patagonian wind loads require reinforced mounting structures — minimum 160 km/h wind rating.', he: 'התקינו עם חשמלאי מוסמך. עומסי רוח פטגוניאנים דורשים מבני הרכבה מחוזקים — דירוג רוח מינימלי 160 קמ"ש.' },
        duration: { en: '3-7 days', he: '3-7 ימים' },
      },
      {
        step: 6,
        title: { en: 'EdERSA inspection', he: 'בדיקת EdERSA' },
        description: { en: 'Technical inspection by EdERSA personnel.', he: 'בדיקה טכנית על ידי צוות EdERSA.' },
        duration: { en: '10-20 business days', he: '10-20 ימי עבודה' },
      },
      {
        step: 7,
        title: { en: 'Meter installation', he: 'התקנת מונה' },
        description: { en: 'Bidirectional meter installed by EdERSA. May take longer in remote areas.', he: 'מונה דו-כיווני מותקן על ידי EdERSA. עשוי לקחת יותר זמן באזורים מרוחקים.' },
        duration: { en: '10-20 business days', he: '10-20 ימי עבודה' },
        fee: 'ARS 30,000-50,000',
      },
      {
        step: 8,
        title: { en: 'Connection activation', he: 'הפעלת חיבור' },
        description: { en: 'System activated under net billing scheme. Patagonia\'s lower electricity rates mean longer payback vs. northern provinces.', he: 'מערכת מופעלת תחת תוכנית net billing. תעריפי חשמל נמוכים יותר בפטגוניה פירושם החזר ארוך יותר לעומת פרובינציות צפוניות.' },
        duration: { en: '5-10 business days', he: '5-10 ימי עבודה' },
      },
    ],
    requiredDocuments: {
      en: ['DNI copy', 'Electricity bills', 'Property documentation', 'Single-line diagram', 'Equipment specs', 'Wind load calculations', 'Electrician matrícula', 'Municipal permit'],
      he: ['העתק DNI', 'חשבונות חשמל', 'מסמכי נכס', 'דיאגרמת קו יחיד', 'מפרטי ציוד', 'חישובי עומס רוח', 'רישיון חשמלאי', 'היתר מוניציפלי'],
    },
    fees: [
      { concept: { en: 'Grid evaluation', he: 'הערכת רשת' }, amount: 'ARS 30,000' },
      { concept: { en: 'Bidirectional meter', he: 'מונה דו-כיווני' }, amount: 'ARS 30,000-50,000' },
      { concept: { en: 'Municipal permit', he: 'היתר מוניציפלי' }, amount: 'ARS 20,000-40,000' },
    ],
    tips: {
      en: [
        'Wind loading is the #1 concern in Patagonia — use reinforced mounting systems',
        'Solar+wind hybrid can be optimal in this region',
        'General Roca and the Upper Valley have the best combination of solar resource and grid access',
        'Lower electricity tariffs mean longer payback — focus on self-consumption optimization',
      ],
      he: [
        'עומס רוח הוא הדאגה #1 בפטגוניה — השתמשו במערכות הרכבה מחוזקות',
        'היברידי סולאר+רוח יכול להיות אופטימלי באזור זה',
        'ג\'נרל רוקה והעמק העליון מציעים את השילוב הטוב ביותר של משאב סולארי וגישה לרשת',
        'תעריפי חשמל נמוכים יותר אומרים החזר ארוך יותר — התמקדו באופטימיזציית צריכה עצמית',
      ],
    },
    commonIssues: {
      en: [
        'Extreme wind loads can damage improperly installed systems',
        'Remote locations may have limited installer availability',
        'Long distribution lines cause voltage fluctuations — inverters must handle wide voltage range',
      ],
      he: [
        'עומסי רוח קיצוניים יכולים לפגוע במערכות שהותקנו שלא כראוי',
        'מיקומים מרוחקים עשויים לסבול מזמינות מתקינים מוגבלת',
        'קווי חלוקה ארוכים גורמים לתנודות מתח — ממירים חייבים להתמודד עם טווח מתח רחב',
      ],
    },
    contactTips: {
      en: 'EdERSA\'s General Roca office is the most responsive for DG queries. Plan for in-person visits when possible, as phone/email can be slow.',
      he: 'משרד EdERSA בג\'נרל רוקה הוא המגיב ביותר לשאלות ייצור מבוזר. תכננו ביקורים אישיים כשאפשר, כי טלפון/מייל יכולים להיות איטיים.',
    },
  },

  // 8. Energía San Juan (EJSED) — San Juan
  {
    id: 'sanjuan',
    province: 'San Juan',
    utilityName: 'Energía San Juan (EJSED)',
    website: 'https://www.energiasanjuan.com.ar',
    phone: '0800-222-3577',
    email: 'gd@energiasanjuan.com.ar',
    netMeteringStatus: 'active',
    maxSystemSizeKw: 500,
    connectionProcess: [
      {
        step: 1,
        title: { en: 'Apply for DG connection', he: 'הגשת בקשה לחיבור ייצור מבוזר' },
        description: {
          en: 'Submit application to Energía San Juan. San Juan has the highest solar resource in Argentina (5.8 kWh/m2/day) and strong political support for solar through Ley 2.435-L. Home to the EPSE panel factory (400 MW/year capacity).',
          he: 'הגישו בקשה ל-Energía San Juan. לסן חואן יש את משאב הסולאר הגבוה ביותר בארגנטינה (5.8 kWh/m2/יום) ותמיכה פוליטית חזקה בסולאר דרך חוק 2.435-L. מארחת את מפעל הפנלים של EPSE (קיבולת 400 MW/שנה).',
        },
        duration: { en: '1-2 days', he: '1-2 ימים' },
      },
      {
        step: 2,
        title: { en: 'Technical capacity study', he: 'בדיקת קיבולת טכנית' },
        description: { en: 'Grid capacity evaluation by Energía San Juan. The utility is generally supportive of DG given the provincial solar strategy.', he: 'הערכת קיבולת רשת על ידי Energía San Juan. החברה בדרך כלל תומכת בייצור מבוזר לאור אסטרטגיית הסולאר הפרובינציאלית.' },
        duration: { en: '10-15 business days', he: '10-15 ימי עבודה' },
        fee: 'ARS 25,000',
      },
      {
        step: 3,
        title: { en: 'Design approval', he: 'אישור תכנון' },
        description: { en: 'Submit technical project. Consider using locally-manufactured EPSE panels for faster approval and lower costs.', he: 'הגישו פרויקט טכני. שקלו שימוש בפנלים מייצור מקומי של EPSE לאישור מהיר יותר ועלויות נמוכות יותר.' },
        duration: { en: '10-15 business days', he: '10-15 ימי עבודה' },
      },
      {
        step: 4,
        title: { en: 'Municipal permit', he: 'היתר מוניציפלי' },
        description: { en: 'San Juan capital and Rawson have solar-friendly permit processes.', he: 'בירת סן חואן ורווסון מציעות תהליכי היתר ידידותיים לסולאר.' },
        duration: { en: '5-10 business days', he: '5-10 ימי עבודה' },
        fee: 'ARS 20,000-40,000',
      },
      {
        step: 5,
        title: { en: 'Installation', he: 'התקנה' },
        description: { en: 'Install with licensed electrician. High UV exposure requires quality UV-resistant cables and components.', he: 'התקינו עם חשמלאי מוסמך. חשיפת UV גבוהה דורשת כבלים ורכיבים עמידי UV איכותיים.' },
        duration: { en: '2-5 days', he: '2-5 ימים' },
      },
      {
        step: 6,
        title: { en: 'Utility inspection', he: 'בדיקת חברת חשמל' },
        description: { en: 'Energía San Juan inspects the system. Generally faster than Buenos Aires utilities.', he: 'Energía San Juan בודקת את המערכת. בדרך כלל מהיר יותר מחברות חשמל בבואנוס איירס.' },
        duration: { en: '7-15 business days', he: '7-15 ימי עבודה' },
      },
      {
        step: 7,
        title: { en: 'Meter installation', he: 'התקנת מונה' },
        description: { en: 'Bidirectional meter installed. Net metering (1:1 kWh credits) under provincial law.', he: 'מונה דו-כיווני מותקן. Net metering (זיכוי 1:1 kWh) לפי חוק פרובינציאלי.' },
        duration: { en: '5-10 business days', he: '5-10 ימי עבודה' },
        fee: 'ARS 25,000-40,000',
      },
      {
        step: 8,
        title: { en: 'Prosumer activation', he: 'הפעלת צרכן-יצרן' },
        description: { en: 'System goes live with net metering credits. San Juan\'s high irradiation means excellent generation — a 5 kW system can produce 8,000+ kWh/year here.', he: 'המערכת עולה לאוויר עם זיכויי net metering. הקרינה הגבוהה של סן חואן פירושה ייצור מעולה — מערכת 5 kW יכולה לייצר 8,000+ kWh/שנה כאן.' },
        duration: { en: '3-5 business days', he: '3-5 ימי עבודה' },
      },
    ],
    requiredDocuments: {
      en: ['DNI copy', 'Electricity bills', 'Property documentation', 'Single-line diagram', 'Equipment specs', 'Electrician matrícula', 'Municipal permit'],
      he: ['העתק DNI', 'חשבונות חשמל', 'מסמכי נכס', 'דיאגרמת קו יחיד', 'מפרטי ציוד', 'רישיון חשמלאי', 'היתר מוניציפלי'],
    },
    fees: [
      { concept: { en: 'Capacity study', he: 'בדיקת קיבולת' }, amount: 'ARS 25,000' },
      { concept: { en: 'Bidirectional meter', he: 'מונה דו-כיווני' }, amount: 'ARS 25,000-40,000' },
      { concept: { en: 'Municipal permit', he: 'היתר מוניציפלי' }, amount: 'ARS 20,000-40,000' },
    ],
    tips: {
      en: [
        'Highest solar resource in Argentina — 5.8 kWh/m2/day average',
        'EPSE factory panels available locally at 10-15% lower cost',
        'Net metering with 1:1 credits and 500 kW max — best conditions in the country',
        'Strong provincial government support — fastest approval times',
        'Use UV-resistant components — extreme UV exposure in the Cuyo region',
      ],
      he: [
        'משאב סולאר גבוה ביותר בארגנטינה — ממוצע 5.8 kWh/m2/יום',
        'פנלים של מפעל EPSE זמינים מקומית בעלות נמוכה ב-10-15%',
        'Net metering עם זיכוי 1:1 ומקסימום 500 kW — התנאים הטובים ביותר במדינה',
        'תמיכה חזקה של ממשל פרובינציאלי — זמני אישור מהירים ביותר',
        'השתמשו ברכיבים עמידי UV — חשיפת UV קיצונית באזור Cuyo',
      ],
    },
    commonIssues: {
      en: [
        'Extreme heat can reduce panel efficiency — consider temperature-derating in design',
        'Seismic zone — reinforced mounting required',
        'Limited installer pool compared to Buenos Aires — book early',
      ],
      he: [
        'חום קיצוני יכול להפחית יעילות פנלים — שקלו הפחתת טמפרטורה בתכנון',
        'אזור סיסמי — נדרשת הרכבה מחוזקת',
        'מאגר מתקינים מוגבל בהשוואה לבואנוס איירס — הזמינו מוקדם',
      ],
    },
    contactTips: {
      en: 'Energía San Juan is the most solar-friendly utility in Argentina. Their DG department responds within 3-5 business days by email. Visit their main office in San Juan Capital for same-day consultations.',
      he: 'Energía San Juan היא חברת החשמל הידידותית ביותר לסולאר בארגנטינה. מחלקת הייצור המבוזר שלהם מגיבה תוך 3-5 ימי עבודה במייל. בקרו במשרד הראשי שלהם בבירת סן חואן לייעוץ באותו יום.',
    },
  },
];

export const getUtilityGuide = (id: string): UtilityGuide | undefined =>
  utilityGuides.find((g) => g.id === id);
