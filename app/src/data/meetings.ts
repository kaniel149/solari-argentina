export interface MeetingGuide {
  id: string;
  type: string;
  title: { en: string; he: string };
  icon: string;
  who: { en: string; he: string };
  purpose: { en: string; he: string };
  duration: string;
  preparation: {
    documents: { en: string[]; he: string[] };
    research: { en: string[]; he: string[] };
    materials: { en: string[]; he: string[] };
  };
  agenda: Array<{
    time: string;
    topic: { en: string; he: string };
    details: { en: string; he: string };
  }>;
  keyQuestions: { en: string[]; he: string[] };
  redFlags: { en: string[]; he: string[] };
  followUp: { en: string[]; he: string[] };
  sampleScript: { en: string; he: string };
  tips: { en: string[]; he: string[] };
}

export const meetingGuides: MeetingGuide[] = [
  {
    id: 'equipment-supplier',
    type: 'equipment-supplier',
    title: {
      en: 'Equipment Supplier Negotiation',
      he: 'משא ומתן עם ספק ציוד',
    },
    icon: 'Package',
    who: {
      en: 'Sales manager or commercial director at solar equipment distributor',
      he: 'מנהל מכירות או מנהל מסחרי אצל מפיץ ציוד סולארי',
    },
    purpose: {
      en: 'Negotiate pricing, payment terms, minimum orders, warranty conditions, and establish a reliable supply partnership',
      he: 'לנהל משא ומתן על תמחור, תנאי תשלום, הזמנות מינימום, תנאי אחריות, ולהקים שותפות אספקה אמינה',
    },
    duration: '60-90 min',
    preparation: {
      documents: {
        en: [
          'Your company registration (CUIT) and tax documentation',
          'Projected annual purchase volume estimate',
          'List of specific products/brands you need',
          'Competitor quotes for price comparison',
        ],
        he: [
          'רישום החברה שלכם (CUIT) ותיעוד מס',
          'הערכת היקף רכישות שנתי צפוי',
          'רשימת מוצרים/מותגים ספציפיים שאתם צריכים',
          'הצעות מחיר ממתחרים להשוואת מחירים',
        ],
      },
      research: {
        en: [
          'Current market prices for panels and inverters (USD/Wp)',
          'Supplier\'s brand portfolio and specializations',
          'Their delivery track record and stock availability',
          'Payment terms offered to other installers',
        ],
        he: [
          'מחירי שוק נוכחיים לפאנלים ואינוורטרים (USD/Wp)',
          'תיק המותגים והתמחויות הספק',
          'רקורד האספקה שלהם וזמינות מלאי',
          'תנאי תשלום המוצעים למתקינים אחרים',
        ],
      },
      materials: {
        en: [
          'Business cards',
          'Laptop with project pipeline showing expected volumes',
          'Calculator for on-the-spot pricing analysis',
          'Printed competitor quotes (without revealing names)',
        ],
        he: [
          'כרטיסי ביקור',
          'מחשב נייד עם צינור פרויקטים המציג היקפים צפויים',
          'מחשבון לניתוח תמחור במקום',
          'הצעות מחיר מודפסות ממתחרים (ללא חשיפת שמות)',
        ],
      },
    },
    agenda: [
      {
        time: '0-5 min',
        topic: { en: 'Introduction & rapport', he: 'הצגה ויצירת קשר' },
        details: {
          en: 'Introduce yourself, your company, and your solar installation focus. Mention your growth plans and expected volume.',
          he: 'הציגו את עצמכם, את החברה, ואת המיקוד שלכם בהתקנות סולאריות. הזכירו את תוכניות הצמיחה וההיקף הצפוי.',
        },
      },
      {
        time: '5-15 min',
        topic: { en: 'Product catalog review', he: 'סקירת קטלוג מוצרים' },
        details: {
          en: 'Review available brands, models, and product lines. Ask about new arrivals and discontinued items. Understand their inventory depth.',
          he: 'סקרו מותגים זמינים, דגמים וקווי מוצרים. שאלו על מוצרים חדשים ופריטים שהופסקו. הבינו את עומק המלאי שלהם.',
        },
      },
      {
        time: '15-30 min',
        topic: { en: 'Pricing discussion', he: 'דיון תמחור' },
        details: {
          en: 'Request price lists for target products. Ask about volume tiers, seasonal promotions, and project-based pricing. Compare with your research.',
          he: 'בקשו מחירונים למוצרי יעד. שאלו על מדרגות כמות, מבצעים עונתיים ותמחור מבוסס פרויקט. השוו עם המחקר שלכם.',
        },
      },
      {
        time: '30-40 min',
        topic: { en: 'Payment terms & MOQ', he: 'תנאי תשלום ו-MOQ' },
        details: {
          en: 'Negotiate payment splits, credit terms, and minimum order quantities. Discuss currency (USD vs ARS) and exchange rate handling.',
          he: 'נהלו משא ומתן על חלוקות תשלום, תנאי אשראי וכמויות הזמנה מינימליות. דונו במטבע (USD מול ARS) וטיפול בשער חליפין.',
        },
      },
      {
        time: '40-50 min',
        topic: { en: 'Warranty & support', he: 'אחריות ותמיכה' },
        details: {
          en: 'Clarify warranty terms, claim process, replacement timelines, and technical support availability. Who handles warranty — supplier or manufacturer?',
          he: 'הבהירו תנאי אחריות, תהליך תביעות, לוחות זמנים להחלפה וזמינות תמיכה טכנית. מי מטפל באחריות — הספק או היצרן?',
        },
      },
      {
        time: '50-60 min',
        topic: { en: 'Logistics & delivery', he: 'לוגיסטיקה ואספקה' },
        details: {
          en: 'Discuss delivery timelines, shipping costs, insurance, and handling of damaged goods. Ask about expedited shipping options.',
          he: 'דונו בלוחות זמנים לאספקה, עלויות משלוח, ביטוח וטיפול בסחורה פגומה. שאלו על אפשרויות משלוח מזורז.',
        },
      },
      {
        time: '60-75 min',
        topic: { en: 'Partnership terms', he: 'תנאי שותפות' },
        details: {
          en: 'Explore installer partnership programs, training access, marketing co-op, and exclusive territory arrangements.',
          he: 'חקרו תוכניות שותפות למתקינים, גישה להכשרות, שיתוף פעולה שיווקי והסדרי טריטוריה בלעדית.',
        },
      },
      {
        time: '75-90 min',
        topic: { en: 'Summary & next steps', he: 'סיכום וצעדים הבאים' },
        details: {
          en: 'Summarize agreed terms, set timeline for formal quote, and schedule follow-up. Request sample products if available.',
          he: 'סכמו תנאים שהוסכמו, קבעו לוח זמנים להצעת מחיר רשמית ותזמנו מעקב. בקשו מוצרי דוגמה אם זמינים.',
        },
      },
    ],
    keyQuestions: {
      en: [
        'What is your current price per Wp for JinkoSolar/LONGi 550W+ panels?',
        'What volume discount tiers do you offer (10kWp, 50kWp, 100kWp)?',
        'What is your typical stock level? How often do you experience stockouts?',
        'Do you price in USD or ARS? How do you handle exchange rate fluctuations?',
        'What is the standard warranty process — who handles claims, you or the manufacturer?',
        'What is the average lead time from order to delivery in Buenos Aires? Interior provinces?',
        'Do you offer technical training or certification for your products?',
        'Can we start with a small trial order before committing to volume agreements?',
        'What payment terms can you offer a new but growing installation company?',
        'Do you have exclusive distribution rights for any brands in Argentina?',
        'What happens if equipment arrives damaged or defective?',
        'Are there any upcoming price changes or promotions I should be aware of?',
      ],
      he: [
        'מה המחיר הנוכחי שלכם ל-Wp לפאנלים JinkoSolar/LONGi 550W+?',
        'אילו מדרגות הנחות כמות אתם מציעים (10kWp, 50kWp, 100kWp)?',
        'מה רמת המלאי הטיפוסית שלכם? באיזו תדירות חווים חוסר מלאי?',
        'אתם מתמחרים ב-USD או ARS? איך אתם מתמודדים עם תנודות שער חליפין?',
        'מה תהליך האחריות הסטנדרטי — מי מטפל בתביעות, אתם או היצרן?',
        'מה זמן האספקה הממוצע מהזמנה לאספקה בבואנוס איירס? פרובינציות פנימיות?',
        'אתם מציעים הכשרה טכנית או הסמכה למוצרים שלכם?',
        'אפשר להתחיל בהזמנת ניסיון קטנה לפני התחייבות להסכמי כמות?',
        'אילו תנאי תשלום אתם יכולים להציע לחברת התקנות חדשה אך צומחת?',
        'יש לכם זכויות הפצה בלעדיות למותגים כלשהם בארגנטינה?',
        'מה קורה אם ציוד מגיע פגום או פגום?',
        'האם ישנם שינויי מחיר או מבצעים צפויים שכדאי שאדע עליהם?',
      ],
    },
    redFlags: {
      en: [
        'Refuses to provide written quotes or price lists — everything verbal only',
        'No clear warranty claim process or pushes all responsibility to manufacturer',
        'Requires 100% upfront payment with no flexibility for established relationships',
        'Cannot show proof of authorized distribution agreements with brands',
        'Delivery timelines are vague with no commitment to specific dates',
        'Unwilling to let you visit their warehouse or inspect stock',
      ],
      he: [
        'מסרב לספק הצעות מחיר כתובות או מחירונים — הכל בעל פה בלבד',
        'אין תהליך תביעת אחריות ברור או מעביר את כל האחריות ליצרן',
        'דורש 100% תשלום מראש ללא גמישות ליחסים מבוססים',
        'לא יכול להראות הוכחה להסכמי הפצה מורשים עם מותגים',
        'לוחות זמנים לאספקה מעורפלים ללא התחייבות לתאריכים ספציפיים',
        'לא מוכן לתת לכם לבקר במחסן שלהם או לבדוק מלאי',
      ],
    },
    followUp: {
      en: [
        'Send a summary email within 24 hours listing all discussed terms',
        'Request formal written quote with validity period',
        'Place a small trial order to test delivery quality and timing',
        'Schedule a warehouse visit to verify stock and quality',
        'Ask for references from 2-3 other installers they supply',
        'Set a 30-day follow-up for price review and volume commitment',
      ],
      he: [
        'שלחו מייל סיכום תוך 24 שעות עם רשימת כל התנאים שנדונו',
        'בקשו הצעת מחיר רשמית כתובה עם תקופת תוקף',
        'בצעו הזמנת ניסיון קטנה לבדיקת איכות ותזמון אספקה',
        'תזמנו ביקור במחסן לאימות מלאי ואיכות',
        'בקשו המלצות מ-2-3 מתקינים אחרים שהם מספקים',
        'קבעו מעקב ב-30 יום לסקירת מחירים והתחייבות כמות',
      ],
    },
    sampleScript: {
      en: `"Good morning, thank you for taking the time to meet. My name is [Name], and I run [Company], a solar installation company focused on residential and small commercial projects in [region]. We're currently installing about [X] kWp per month and expect to grow to [Y] kWp within the next year. I'm looking for a reliable equipment partner who can provide competitive pricing, consistent stock availability, and good technical support. I'd like to discuss your product range, pricing structure, and how we can build a long-term partnership."`,
      he: `"בוקר טוב, תודה שהקדשתם זמן לפגישה. שמי [שם], ואני מנהל את [חברה], חברת התקנות סולאריות המתמקדת בפרויקטים למגורים ומסחריים קטנים ב[אזור]. אנחנו כרגע מתקינים כ-[X] קילוואט לחודש ומצפים לצמוח ל-[Y] קילוואט בשנה הקרובה. אני מחפש שותף ציוד אמין שיכול לספק תמחור תחרותי, זמינות מלאי עקבית ותמיכה טכנית טובה. הייתי רוצה לדון במגוון המוצרים שלכם, מבנה התמחור ואיך נוכל לבנות שותפות לטווח ארוך."`,
    },
    tips: {
      en: [
        'Never reveal your best competitor quote — keep leverage for negotiation',
        'Start with a trial order to verify delivery reliability before committing',
        'Always get pricing in writing with a validity date',
        'Build personal relationships with the sales team — crucial in Argentine business culture',
      ],
      he: [
        'לעולם אל תחשפו את הצעת המחיר הטובה ביותר מהמתחרה — שמרו על מנוף למשא ומתן',
        'התחילו בהזמנת ניסיון לאימות אמינות אספקה לפני התחייבות',
        'תמיד קבלו תמחור בכתב עם תאריך תוקף',
        'בנו יחסים אישיים עם צוות המכירות — קריטי בתרבות העסקית הארגנטינאית',
      ],
    },
  },
  {
    id: 'utility-company',
    type: 'utility-company',
    title: {
      en: 'Utility Company Meeting',
      he: 'פגישה עם חברת חשמל',
    },
    icon: 'Zap',
    who: {
      en: 'Technical or commercial department of the local electricity distributor (EDENOR, EDESUR, EPEC, etc.)',
      he: 'מחלקה טכנית או מסחרית של מפיץ החשמל המקומי (EDENOR, EDESUR, EPEC, וכו\')',
    },
    purpose: {
      en: 'Understand grid connection requirements, net metering procedures, meter installation, fees, and approval timeline',
      he: 'להבין דרישות חיבור רשת, נהלי מונה נטו, התקנת מונה, עמלות ולוח זמנים לאישור',
    },
    duration: '45-60 min',
    preparation: {
      documents: {
        en: [
          'Customer\'s latest electricity bill (factura de luz)',
          'Preliminary system design with single-line diagram',
          'Customer\'s property deed or authorization letter',
          'Your installer credentials and insurance documentation',
        ],
        he: [
          'חשבון חשמל אחרון של הלקוח (factura de luz)',
          'עיצוב מערכת ראשוני עם תרשים קו יחיד',
          'שטר נכס של הלקוח או מכתב הרשאה',
          'אישורי המתקין שלכם ותיעוד ביטוח',
        ],
      },
      research: {
        en: [
          'Provincial adherence status to Ley 27.424 (Generacion Distribuida)',
          'Local utility\'s specific interconnection requirements',
          'Recent approved DG projects in the area',
          'Current net metering/net billing credit rates',
        ],
        he: [
          'סטטוס הצטרפות הפרובינציה לחוק 27.424 (Generacion Distribuida)',
          'דרישות חיבור ספציפיות של חברת החשמל המקומית',
          'פרויקטי DG שאושרו לאחרונה באזור',
          'שיעורי זיכוי מונה נטו/חיוב נטו נוכחיים',
        ],
      },
      materials: {
        en: [
          'Printed single-line diagram of proposed system',
          'Technical spec sheets for inverter (must be grid-compatible)',
          'Calculator for sizing discussions',
          'Notebook for recording specific requirements',
        ],
        he: [
          'תרשים קו יחיד מודפס של המערכת המוצעת',
          'גיליונות מפרט טכני לאינוורטר (חייב להיות תואם רשת)',
          'מחשבון לדיוני גודל',
          'מחברת לרישום דרישות ספציפיות',
        ],
      },
    },
    agenda: [
      {
        time: '0-5 min',
        topic: { en: 'Introduction & project overview', he: 'הצגה וסקירת פרויקט' },
        details: {
          en: 'Present yourself as an installer seeking to connect a solar system for a customer. Provide basic project details: location, estimated kWp, customer CUIT.',
          he: 'הציגו את עצמכם כמתקינים המבקשים לחבר מערכת סולארית ללקוח. ספקו פרטי פרויקט בסיסיים: מיקום, kWp משוער, CUIT הלקוח.',
        },
      },
      {
        time: '5-15 min',
        topic: { en: 'DG registration process', he: 'תהליך רישום DG' },
        details: {
          en: 'Ask about the complete prosumer registration process under Ley 27.424. Understand required forms, online portals, and submission procedures.',
          he: 'שאלו על תהליך רישום הפרוסומר המלא תחת חוק 27.424. הבינו טפסים נדרשים, פורטלים מקוונים ונהלי הגשה.',
        },
      },
      {
        time: '15-25 min',
        topic: { en: 'Technical requirements', he: 'דרישות טכניות' },
        details: {
          en: 'Discuss approved inverter models, anti-islanding requirements, protection settings, meter specifications, and maximum capacity allowed.',
          he: 'דונו בדגמי אינוורטר מאושרים, דרישות אנטי-איילנדינג, הגדרות הגנה, מפרטי מונה וקיבולת מקסימלית מותרת.',
        },
      },
      {
        time: '25-35 min',
        topic: { en: 'Meter installation & costs', he: 'התקנת מונה ועלויות' },
        details: {
          en: 'Clarify who provides and installs the bidirectional meter, associated costs, timeline, and whether existing meter can be replaced or supplemented.',
          he: 'הבהירו מי מספק ומתקין את המונה הדו-כיווני, עלויות נלוות, לוח זמנים והאם ניתן להחליף או להשלים את המונה הקיים.',
        },
      },
      {
        time: '35-45 min',
        topic: { en: 'Inspection & approval timeline', he: 'בדיקה ולוח זמנים לאישור' },
        details: {
          en: 'Understand the inspection process, who conducts it, what they check, typical approval timeline, and what happens if the system fails inspection.',
          he: 'הבינו את תהליך הבדיקה, מי מבצע אותה, מה בודקים, לוח זמנים טיפוסי לאישור ומה קורה אם המערכת נכשלת בבדיקה.',
        },
      },
      {
        time: '45-55 min',
        topic: { en: 'Billing & credits', he: 'חיוב וזיכויים' },
        details: {
          en: 'Ask how energy credits appear on bills, rollover policies, credit expiration, and whether credits are applied at the same rate as consumption.',
          he: 'שאלו איך זיכויי אנרגיה מופיעים בחשבונות, מדיניות גלגול, פקיעת זיכויים והאם זיכויים מיושמים באותו תעריף כמו צריכה.',
        },
      },
    ],
    keyQuestions: {
      en: [
        'What is the maximum DG capacity allowed for residential/commercial connections?',
        'Which inverter brands and models are currently approved for grid connection?',
        'What is the complete list of documents required for prosumer registration?',
        'How long does the approval process typically take from application to energization?',
        'Who provides the bidirectional meter and what is the cost?',
        'What are the anti-islanding and protection relay requirements?',
        'How are energy credits calculated and applied to the customer\'s bill?',
        'Is there a capacity limit per transformer or feeder in our area?',
        'What inspection process is required before the system can be connected?',
        'Are there any upcoming regulatory changes that could affect DG installations?',
        'What is the process if the customer wants to increase system size later?',
        'Do you have a standard interconnection agreement template?',
      ],
      he: [
        'מה הקיבולת המקסימלית של DG המותרת לחיבורים למגורים/מסחריים?',
        'אילו מותגים ודגמי אינוורטר מאושרים כרגע לחיבור רשת?',
        'מהי רשימת המסמכים המלאה הנדרשת לרישום פרוסומר?',
        'כמה זמן לוקח תהליך האישור בדרך כלל מבקשה ועד הפעלה?',
        'מי מספק את המונה הדו-כיווני ומה העלות?',
        'מהן דרישות אנטי-איילנדינג וממסרי הגנה?',
        'איך מחושבים ומיושמים זיכויי אנרגיה בחשבון הלקוח?',
        'האם יש הגבלת קיבולת לכל שנאי או מוליך באזור שלנו?',
        'איזה תהליך בדיקה נדרש לפני שהמערכת יכולה להתחבר?',
        'האם ישנם שינויים רגולטוריים צפויים שעלולים להשפיע על התקנות DG?',
        'מה התהליך אם הלקוח רוצה להגדיל את גודל המערכת מאוחר יותר?',
        'האם יש לכם תבנית הסכם חיבור סטנדרטית?',
      ],
    },
    redFlags: {
      en: [
        'Utility claims DG is "not available" or "not implemented" — check provincial adherence status',
        'Excessive fees that seem designed to discourage DG installations',
        'Unreasonably long approval timelines (more than 90 days) with no explanation',
        'Demands for non-standard or unnecessary technical requirements',
        'Refusal to provide written guidelines or requirements',
        'Claims that the transformer or grid cannot support any DG capacity',
      ],
      he: [
        'חברת החשמל טוענת ש-DG "לא זמין" או "לא מיושם" — בדקו סטטוס הצטרפות הפרובינציה',
        'עמלות מופרזות שנראות מתוכננות להרתיע התקנות DG',
        'לוחות זמנים לאישור ארוכים באופן בלתי סביר (יותר מ-90 יום) ללא הסבר',
        'דרישות לדרישות טכניות לא סטנדרטיות או מיותרות',
        'סירוב לספק הנחיות או דרישות בכתב',
        'טענות שהשנאי או הרשת לא יכולים לתמוך בשום קיבולת DG',
      ],
    },
    followUp: {
      en: [
        'Submit formal interconnection application within 1 week',
        'Send all required documentation via registered mail or their online portal',
        'Request written confirmation of submission with a reference number',
        'Set calendar reminders for expected milestone dates',
        'If no response within 15 business days, escalate through ENRE or provincial regulator',
        'Keep customer informed of progress at each stage',
      ],
      he: [
        'הגישו בקשת חיבור רשמית תוך שבוע',
        'שלחו את כל התיעוד הנדרש בדואר רשום או בפורטל המקוון שלהם',
        'בקשו אישור כתוב של הגשה עם מספר סימוכין',
        'הגדירו תזכורות ביומן לתאריכי אבני דרך צפויים',
        'אם אין תגובה תוך 15 ימי עסקים, הסלימו דרך ENRE או רגולטור פרובינציאלי',
        'שמרו את הלקוח מעודכן לגבי התקדמות בכל שלב',
      ],
    },
    sampleScript: {
      en: `"Good morning, my name is [Name] from [Company]. I'm a solar installer and I have a client at [address] who wants to install a [X] kWp photovoltaic system under the distributed generation framework (Ley 27.424). I'd like to understand the complete interconnection process — from application through meter installation to final approval. Could you walk me through the steps and requirements specific to your service area?"`,
      he: `"בוקר טוב, שמי [שם] מ[חברה]. אני מתקין סולארי ויש לי לקוח ב[כתובת] שרוצה להתקין מערכת פוטוולטאית של [X] קילוואט במסגרת ייצור מבוזר (חוק 27.424). הייתי רוצה להבין את תהליך החיבור המלא — מבקשה דרך התקנת מונה ועד אישור סופי. תוכלו להדריך אותי בשלבים ובדרישות הספציפיות לאזור השירות שלכם?"`,
    },
    tips: {
      en: [
        'Bring printed copies of Ley 27.424 and relevant provincial regulations',
        'Be patient and professional — utility employees may be unfamiliar with DG procedures',
        'Document everything in writing — verbal promises are unreliable',
        'Build a relationship with the technical team for smoother future projects',
      ],
      he: [
        'הביאו עותקים מודפסים של חוק 27.424 ותקנות פרובינציאליות רלוונטיות',
        'היו סבלניים ומקצועיים — עובדי חברת החשמל עשויים להיות לא מכירים נהלי DG',
        'תעדו הכל בכתב — הבטחות בעל פה אינן אמינות',
        'בנו קשר עם הצוות הטכני לפרויקטים עתידיים חלקים יותר',
      ],
    },
  },
  {
    id: 'electrician',
    type: 'electrician',
    title: {
      en: 'Electrician Qualification Meeting',
      he: 'פגישת הסמכת חשמלאי',
    },
    icon: 'Wrench',
    who: {
      en: 'Licensed electrician (Matriculado) or electrical contractor you\'re considering for installations',
      he: 'חשמלאי מורשה (Matriculado) או קבלן חשמל שאתם שוקלים להתקנות',
    },
    purpose: {
      en: 'Verify qualifications, experience, insurance, pricing, and reliability for solar installation partnerships',
      he: 'לאמת כישורים, ניסיון, ביטוח, תמחור ואמינות לשותפויות התקנת סולאר',
    },
    duration: '45-60 min',
    preparation: {
      documents: {
        en: [
          'Standard installation scope of work document',
          'Sample single-line diagram of a typical residential system',
          'Your safety and quality standards checklist',
          'Sample contract template for subcontractors',
        ],
        he: [
          'מסמך היקף עבודות התקנה סטנדרטי',
          'תרשים קו יחיד לדוגמה של מערכת מגורים טיפוסית',
          'רשימת תיוג סטנדרטי בטיחות ואיכות',
          'תבנית חוזה לדוגמה לקבלני משנה',
        ],
      },
      research: {
        en: [
          'Verify their matricula (license) number with the local registry',
          'Check if they have solar installation experience or certifications',
          'Ask other installers about their reputation in the area',
          'Review NEC/IRAM standards for solar installations',
        ],
        he: [
          'אמתו את מספר הרישיון (matricula) שלהם ברישום המקומי',
          'בדקו אם יש להם ניסיון בהתקנות סולאריות או הסמכות',
          'שאלו מתקינים אחרים על המוניטין שלהם באזור',
          'סקרו תקני NEC/IRAM להתקנות סולאריות',
        ],
      },
      materials: {
        en: [
          'Printed installation standards and safety requirements',
          'Photos of correctly completed installations (reference examples)',
          'Payment schedule template',
          'Tool and equipment checklist for solar installations',
        ],
        he: [
          'תקני התקנה ודרישות בטיחות מודפסים',
          'תמונות של התקנות שהושלמו כהלכה (דוגמאות ייחוס)',
          'תבנית לוח זמני תשלום',
          'רשימת כלים וציוד להתקנות סולאריות',
        ],
      },
    },
    agenda: [
      {
        time: '0-5 min',
        topic: { en: 'Introduction & expectations', he: 'הצגה וציפיות' },
        details: {
          en: 'Explain your solar installation business, project volumes, and what you\'re looking for in an electrician partner.',
          he: 'הסבירו את עסק ההתקנות הסולאריות שלכם, היקפי פרויקטים ומה אתם מחפשים בשותף חשמלאי.',
        },
      },
      {
        time: '5-15 min',
        topic: { en: 'Credentials & experience', he: 'כישורים וניסיון' },
        details: {
          en: 'Review their matricula, insurance certificates, safety training records, and specifically solar installation experience.',
          he: 'סקרו את הרישיון שלהם, תעודות ביטוח, רישומי הכשרת בטיחות ובמיוחד ניסיון בהתקנות סולאריות.',
        },
      },
      {
        time: '15-25 min',
        topic: { en: 'Technical assessment', he: 'הערכה טכנית' },
        details: {
          en: 'Show a sample single-line diagram. Ask them to explain the installation process, grounding requirements, string sizing, and inverter connection.',
          he: 'הראו תרשים קו יחיד לדוגמה. בקשו מהם להסביר את תהליך ההתקנה, דרישות הארקה, גודל מחרוזות וחיבור אינוורטר.',
        },
      },
      {
        time: '25-35 min',
        topic: { en: 'Pricing & availability', he: 'תמחור וזמינות' },
        details: {
          en: 'Discuss per-kWp installation rates, what\'s included (labor, minor materials, tools), typical timeline per project, and availability.',
          he: 'דונו בתעריפי התקנה ל-kWp, מה כלול (עבודה, חומרים קטנים, כלים), לוח זמנים טיפוסי לפרויקט וזמינות.',
        },
      },
      {
        time: '35-45 min',
        topic: { en: 'Safety & insurance', he: 'בטיחות וביטוח' },
        details: {
          en: 'Verify ART (workplace insurance) coverage, PPE standards, height work protocols, and their safety track record.',
          he: 'אמתו כיסוי ART (ביטוח מקום עבודה), תקני ציוד מגן אישי, פרוטוקולי עבודה בגובה ורקורד הבטיחות שלהם.',
        },
      },
      {
        time: '45-55 min',
        topic: { en: 'References & next steps', he: 'המלצות וצעדים הבאים' },
        details: {
          en: 'Request references from recent projects. Discuss terms for a trial project. Set clear expectations for communication and reporting.',
          he: 'בקשו המלצות מפרויקטים אחרונים. דונו בתנאים לפרויקט ניסיון. קבעו ציפיות ברורות לתקשורת ודיווח.',
        },
      },
    ],
    keyQuestions: {
      en: [
        'What is your matricula number and which jurisdiction issued it?',
        'How many solar installations have you completed? Residential vs commercial?',
        'Are you familiar with Ley 27.424 and utility interconnection requirements?',
        'What is your per-kWp installation rate? What does that include?',
        'Do you have current ART (workplace insurance) coverage? Can I see the certificate?',
        'What tools and equipment do you own for rooftop solar installations?',
        'How do you handle waterproofing for roof penetrations?',
        'Can you work with different mounting systems (rail, direct, ballasted)?',
        'What is your typical availability window? How far in advance do I need to book?',
        'Have you ever had a safety incident on a job site? How was it handled?',
        'Can you provide 3 references from recent installation projects?',
        'Are you willing to start with a trial project before a long-term agreement?',
      ],
      he: [
        'מה מספר הרישיון שלך ואיזו רשות הנפיקה אותו?',
        'כמה התקנות סולאריות השלמת? מגורים מול מסחרי?',
        'אתה מכיר את חוק 27.424 ודרישות חיבור לרשת?',
        'מה תעריף ההתקנה שלך ל-kWp? מה זה כולל?',
        'יש לך כיסוי ART (ביטוח מקום עבודה) עדכני? אפשר לראות את התעודה?',
        'אילו כלים וציוד יש ברשותך להתקנות סולאריות על גגות?',
        'איך אתה מטפל באיטום לחדירות גג?',
        'אתה יכול לעבוד עם מערכות הרכבה שונות (מסילה, ישיר, משקולות)?',
        'מה חלון הזמינות הטיפוסי שלך? כמה מראש צריך להזמין?',
        'האם היה לך פעם אירוע בטיחות באתר עבודה? איך הוא טופל?',
        'אתה יכול לספק 3 המלצות מפרויקטי התקנה אחרונים?',
        'אתה מוכן להתחיל עם פרויקט ניסיון לפני הסכם לטווח ארוך?',
      ],
    },
    redFlags: {
      en: [
        'Cannot produce a valid matricula or license documentation',
        'No ART (workplace insurance) or claims it\'s "not necessary"',
        'Zero solar installation experience and unwilling to train',
        'Cannot explain basic solar concepts (string sizing, MPPT, anti-islanding)',
        'No proper tools for rooftop work (harnesses, fall protection, crimpers)',
        'Significantly lower pricing than market rate — suggests cutting corners',
      ],
      he: [
        'לא יכול להציג רישיון או תיעוד רישוי תקף',
        'אין ART (ביטוח מקום עבודה) או טוען שזה "לא נחוץ"',
        'אפס ניסיון בהתקנות סולאריות ולא מוכן להתאמן',
        'לא יכול להסביר מושגי סולאר בסיסיים (גודל מחרוזת, MPPT, אנטי-איילנדינג)',
        'אין כלים מתאימים לעבודה על גגות (רתמות, הגנה מנפילה, מלחציים)',
        'תמחור נמוך משמעותית מתעריף שוק — מרמז על קיצורי דרך',
      ],
    },
    followUp: {
      en: [
        'Verify matricula with the relevant colegio de electricistas',
        'Call 2-3 references and ask about quality, timeliness, and professionalism',
        'Visit a completed installation to inspect workmanship',
        'Send a formal trial project proposal with clear scope and payment terms',
        'Set up a WhatsApp group for project communication',
        'Provide training materials on your standards and procedures',
      ],
      he: [
        'אמתו את הרישיון עם מכללת החשמלאים הרלוונטית',
        'התקשרו ל-2-3 ממליצים ושאלו על איכות, דייקנות ומקצועיות',
        'בקרו בהתקנה שהושלמה לבדיקת אומנות',
        'שלחו הצעת פרויקט ניסיון רשמית עם היקף ותנאי תשלום ברורים',
        'הקימו קבוצת WhatsApp לתקשורת פרויקט',
        'ספקו חומרי הכשרה על הסטנדרטים והנהלים שלכם',
      ],
    },
    sampleScript: {
      en: `"Hi [Name], thanks for coming. I run a solar installation company and I'm looking for qualified electricians to partner with on residential and commercial projects. We handle the sales, design, and procurement, and we need reliable installation partners who can deliver quality work safely and on schedule. I'd like to learn about your experience, credentials, and how we might work together. Can we start with your background and the types of electrical work you specialize in?"`,
      he: `"שלום [שם], תודה שבאת. אני מנהל חברת התקנות סולאריות ומחפש חשמלאים מוסמכים לשתף פעולה בפרויקטים למגורים ומסחריים. אנחנו מטפלים במכירות, עיצוב ורכש, ואנחנו צריכים שותפי התקנה אמינים שיכולים לספק עבודה איכותית בבטחה ובלוח זמנים. הייתי רוצה ללמוד על הניסיון שלך, הכישורים ואיך נוכל לעבוד יחד. נוכל להתחיל עם הרקע שלך וסוגי העבודות החשמליות שאתה מתמחה בהן?"`,
    },
    tips: {
      en: [
        'Always verify credentials independently — never rely on self-reporting alone',
        'A good electrician with no solar experience can be trained; a bad one cannot be fixed',
        'Start with a simple residential project as a trial before larger commercial work',
        'Clear written agreements prevent disputes — never work on handshake deals',
      ],
      he: [
        'תמיד אמתו כישורים באופן עצמאי — אל תסתמכו על דיווח עצמי בלבד',
        'חשמלאי טוב ללא ניסיון סולארי ניתן להכשרה; גרוע אי אפשר לתקן',
        'התחילו בפרויקט מגורים פשוט כניסיון לפני עבודה מסחרית גדולה יותר',
        'הסכמים כתובים ברורים מונעים מחלוקות — לעולם אל תעבדו על לחיצת יד',
      ],
    },
  },
  {
    id: 'customer-first',
    type: 'customer-first',
    title: {
      en: 'First Customer Meeting',
      he: 'פגישה ראשונה עם לקוח',
    },
    icon: 'Users',
    who: {
      en: 'Residential homeowner or commercial property manager interested in solar installation',
      he: 'בעל בית או מנהל נכס מסחרי המתעניין בהתקנת סולאר',
    },
    purpose: {
      en: 'Assess energy needs, evaluate site suitability, understand budget and timeline, and build trust for the sale',
      he: 'להעריך צרכי אנרגיה, להעריך התאמת אתר, להבין תקציב ולוח זמנים ולבנות אמון למכירה',
    },
    duration: '60-90 min',
    preparation: {
      documents: {
        en: [
          'Company brochure or digital portfolio of completed projects',
          'Sample proposal from a similar project (anonymized)',
          'ROI calculation spreadsheet',
          'Financing options summary',
        ],
        he: [
          'חוברת חברה או תיק עבודות דיגיטלי של פרויקטים שהושלמו',
          'הצעה לדוגמה מפרויקט דומה (אנונימית)',
          'גיליון חישוב ROI',
          'סיכום אפשרויות מימון',
        ],
      },
      research: {
        en: [
          'Local electricity tariff rates and recent increases',
          'Solar irradiation data for the customer\'s location',
          'Google Maps/Earth view of the property for initial roof assessment',
          'Incentives and financing programs available in their province',
        ],
        he: [
          'תעריפי חשמל מקומיים ועליות אחרונות',
          'נתוני הקרנת שמש למיקום הלקוח',
          'תצוגת Google Maps/Earth של הנכס להערכת גג ראשונית',
          'תמריצים ותוכניות מימון זמינים בפרובינציה שלהם',
        ],
      },
      materials: {
        en: [
          'Tape measure and compass for roof assessment',
          'Tablet or laptop for showing simulations',
          'Business cards',
          'Shade analysis tool or app',
        ],
        he: [
          'סרט מדידה ומצפן להערכת גג',
          'טאבלט או מחשב נייד להצגת סימולציות',
          'כרטיסי ביקור',
          'כלי או אפליקציית ניתוח הצללה',
        ],
      },
    },
    agenda: [
      {
        time: '0-10 min',
        topic: { en: 'Welcome & rapport building', he: 'קבלת פנים ובניית קשר' },
        details: {
          en: 'Greet the customer, introduce yourself and your company. Ask about their motivation for considering solar. Listen actively.',
          he: 'קבלו את פני הלקוח, הציגו את עצמכם ואת החברה. שאלו על המוטיבציה שלהם לשקול סולאר. הקשיבו באופן פעיל.',
        },
      },
      {
        time: '10-20 min',
        topic: { en: 'Consumption analysis', he: 'ניתוח צריכה' },
        details: {
          en: 'Review their electricity bills (last 12 months ideally). Calculate average monthly and annual consumption. Identify peak usage patterns.',
          he: 'סקרו את חשבונות החשמל שלהם (12 חודשים אחרונים אידיאלית). חשבו ממוצע צריכה חודשי ושנתי. זהו דפוסי צריכת שיא.',
        },
      },
      {
        time: '20-35 min',
        topic: { en: 'Site assessment', he: 'הערכת אתר' },
        details: {
          en: 'Walk the property. Assess roof condition, orientation, tilt, shading. Check electrical panel capacity and condition. Note any structural concerns.',
          he: 'סיירו בנכס. הערכו מצב גג, כיוון, שיפוע, הצללה. בדקו קיבולת ומצב לוח חשמלי. ציינו חששות מבניים.',
        },
      },
      {
        time: '35-50 min',
        topic: { en: 'System overview & financial benefits', he: 'סקירת מערכת ויתרונות כלכליים' },
        details: {
          en: 'Present a preliminary system size recommendation. Show estimated production, savings, and payback period. Explain net metering benefits.',
          he: 'הציגו המלצה ראשונית לגודל מערכת. הראו ייצור משוער, חיסכון ותקופת החזר. הסבירו יתרונות מונה נטו.',
        },
      },
      {
        time: '50-60 min',
        topic: { en: 'Budget & financing discussion', he: 'דיון תקציב ומימון' },
        details: {
          en: 'Discuss investment range. Present financing options if available. Address cost concerns and compare to electricity cost trajectory.',
          he: 'דונו בטווח ההשקעה. הציגו אפשרויות מימון אם זמינות. התמודדו עם חששות עלויות והשוו למסלול עלויות חשמל.',
        },
      },
      {
        time: '60-75 min',
        topic: { en: 'Process explanation & timeline', he: 'הסבר תהליך ולוח זמנים' },
        details: {
          en: 'Walk through the complete installation process. Explain permitting, utility registration, installation duration, and grid connection timeline.',
          he: 'עברו על תהליך ההתקנה המלא. הסבירו רישוי, רישום לחברת חשמל, משך התקנה ולוח זמנים לחיבור רשת.',
        },
      },
      {
        time: '75-85 min',
        topic: { en: 'Q&A and objection handling', he: 'שאלות ותשובות וטיפול בהתנגדויות' },
        details: {
          en: 'Answer all customer questions. Address common objections (cost, aesthetics, reliability, moving). Use testimonials and references.',
          he: 'ענו על כל שאלות הלקוח. התמודדו עם התנגדויות נפוצות (עלות, אסתטיקה, אמינות, מעבר דירה). השתמשו בהמלצות וממליצים.',
        },
      },
      {
        time: '85-90 min',
        topic: { en: 'Next steps & commitment', he: 'צעדים הבאים והתחייבות' },
        details: {
          en: 'Summarize the meeting. Agree on next steps — usually sending a formal proposal within 3-5 days. Set a follow-up date.',
          he: 'סכמו את הפגישה. הסכימו על צעדים הבאים — בדרך כלל שליחת הצעה רשמית תוך 3-5 ימים. קבעו תאריך מעקב.',
        },
      },
    ],
    keyQuestions: {
      en: [
        'What motivated you to consider solar energy for your property?',
        'Can I see your last 6-12 months of electricity bills?',
        'How old is your roof and when was it last inspected or repaired?',
        'Do you plan to stay in this property for at least 5-10 years?',
        'What is your budget range for a solar investment?',
        'Have you received quotes from other solar companies?',
        'Are there any trees or structures nearby that shade your roof?',
        'What is your electricity consumption pattern — day-heavy or evening-heavy?',
        'Would you be interested in financing options or prefer to pay upfront?',
        'Do you have any concerns about aesthetics or HOA/municipal restrictions?',
        'Is your electrical panel relatively modern, or has it been there for decades?',
        'What timeline would you prefer for the installation?',
      ],
      he: [
        'מה הניע אתכם לשקול אנרגיה סולארית לנכס שלכם?',
        'אפשר לראות את חשבונות החשמל של 6-12 החודשים האחרונים?',
        'בן כמה הגג שלכם ומתי הוא נבדק או תוקן לאחרונה?',
        'אתם מתכננים להישאר בנכס הזה לפחות 5-10 שנים?',
        'מה טווח התקציב שלכם להשקעה סולארית?',
        'קיבלתם הצעות מחיר מחברות סולאריות אחרות?',
        'יש עצים או מבנים בסביבה שמצלילים על הגג שלכם?',
        'מה דפוס צריכת החשמל שלכם — כבד ביום או כבד בערב?',
        'הייתם מתעניינים באפשרויות מימון או מעדיפים לשלם מראש?',
        'יש לכם חששות לגבי אסתטיקה או הגבלות עירוניות?',
        'הלוח החשמלי שלכם מודרני יחסית, או שהוא שם כבר עשרות שנים?',
        'איזה לוח זמנים תעדיפו להתקנה?',
      ],
    },
    redFlags: {
      en: [
        'Customer expects unrealistic payback (under 2 years) and is unwilling to hear reality',
        'Significant roof damage or structural issues that need fixing before installation',
        'Heavy shading from trees or buildings that cannot be resolved',
        'Customer plans to sell the property within 1-2 years',
        'Extremely low budget that cannot cover even economy-tier systems',
        'Customer seems to be only collecting quotes with no intention to proceed',
      ],
      he: [
        'הלקוח מצפה להחזר לא ריאלי (מתחת ל-2 שנים) ולא מוכן לשמוע מציאות',
        'נזק משמעותי לגג או בעיות מבניות שצריך לתקן לפני התקנה',
        'הצללה כבדה מעצים או בניינים שלא ניתן לפתור',
        'הלקוח מתכנן למכור את הנכס תוך 1-2 שנים',
        'תקציב נמוך מאוד שלא יכול לכסות אפילו מערכות ברמת אקונומי',
        'הלקוח נראה שרק אוסף הצעות מחיר ללא כוונה להתקדם',
      ],
    },
    followUp: {
      en: [
        'Send thank-you message within 2 hours of the meeting',
        'Prepare and send formal proposal within 3-5 business days',
        'Include 3D render or simulation if possible',
        'Schedule follow-up call 2-3 days after sending the proposal',
        'If no response after 7 days, send a gentle follow-up',
        'Add customer to your CRM with detailed meeting notes',
      ],
      he: [
        'שלחו הודעת תודה תוך שעתיים מהפגישה',
        'הכינו ושלחו הצעה רשמית תוך 3-5 ימי עסקים',
        'כללו הדמיה תלת-ממדית או סימולציה אם אפשר',
        'תזמנו שיחת מעקב 2-3 ימים לאחר שליחת ההצעה',
        'אם אין תגובה אחרי 7 ימים, שלחו מעקב עדין',
        'הוסיפו את הלקוח ל-CRM עם הערות פגישה מפורטות',
      ],
    },
    sampleScript: {
      en: `"Good morning/afternoon, thank you for inviting me to your home. My name is [Name] and I'm from [Company]. We specialize in residential solar installations here in [province/city]. Before we discuss anything technical, I'd love to hear what made you interested in going solar — is it the rising electricity costs, environmental concerns, or something else? Understanding your priorities will help me recommend the best solution for your situation."`,
      he: `"בוקר טוב/אחר הצהריים טובים, תודה שהזמנתם אותי לביתכם. שמי [שם] ואני מ[חברה]. אנחנו מתמחים בהתקנות סולאריות למגורים כאן ב[פרובינציה/עיר]. לפני שנדון בכל דבר טכני, הייתי שמח לשמוע מה עניין אתכם במעבר לסולארי — האם אלו עלויות חשמל עולות, דאגות סביבתיות, או משהו אחר? הבנת העדיפויות שלכם תעזור לי להמליץ על הפתרון הטוב ביותר למצב שלכם."`,
    },
    tips: {
      en: [
        'Listen more than you talk — the customer needs to feel heard, not sold to',
        'Never badmouth competitors — focus on your own value proposition',
        'Always take photos of the roof and electrical panel (with permission)',
        'Leave something physical — brochure, business card, or printed info sheet',
      ],
      he: [
        'הקשיבו יותר ממה שאתם מדברים — הלקוח צריך להרגיש שמקשיבים לו, לא מוכרים לו',
        'לעולם אל תדברו רע על מתחרים — התמקדו בהצעת הערך שלכם',
        'תמיד צלמו את הגג והלוח החשמלי (באישור)',
        'השאירו משהו פיזי — חוברת, כרטיס ביקור או דף מידע מודפס',
      ],
    },
  },
  {
    id: 'regulator',
    type: 'regulator',
    title: {
      en: 'Regulatory Authority Meeting',
      he: 'פגישה עם רשות רגולטורית',
    },
    icon: 'Shield',
    who: {
      en: 'Provincial energy authority or ENRE (national regulator) representative handling DG compliance',
      he: 'רשות אנרגיה פרובינציאלית או נציג ENRE (רגולטור לאומי) המטפל בתאימות DG',
    },
    purpose: {
      en: 'Clarify compliance requirements, register as an authorized installer, understand inspection procedures, and stay updated on regulatory changes',
      he: 'להבהיר דרישות תאימות, להירשם כמתקין מורשה, להבין נהלי בדיקה ולהישאר מעודכנים בשינויים רגולטוריים',
    },
    duration: '30-45 min',
    preparation: {
      documents: {
        en: [
          'Company registration (CUIT) and business license',
          'Your professional certifications and installer credentials',
          'Insurance documentation (liability + workers comp)',
          'List of completed installations (if any)',
        ],
        he: [
          'רישום חברה (CUIT) ורישיון עסק',
          'הסמכות מקצועיות וכישורי מתקין',
          'תיעוד ביטוח (אחריות + פיצויי עובדים)',
          'רשימת התקנות שהושלמו (אם יש)',
        ],
      },
      research: {
        en: [
          'Current provincial adherence status to Ley 27.424',
          'Local regulations and resolution numbers for DG',
          'Recent changes or proposed amendments to DG regulations',
          'Registry of authorized installers in your province',
        ],
        he: [
          'סטטוס הצטרפות פרובינציאלי נוכחי לחוק 27.424',
          'תקנות מקומיות ומספרי החלטה ל-DG',
          'שינויים אחרונים או תיקונים מוצעים לתקנות DG',
          'רישום מתקינים מורשים בפרובינציה שלכם',
        ],
      },
      materials: {
        en: [
          'Printed copies of relevant regulations and resolutions',
          'Portfolio of installation work (photos, documentation)',
          'Prepared list of specific questions',
          'Recording device (ask permission first)',
        ],
        he: [
          'עותקים מודפסים של תקנות והחלטות רלוונטיות',
          'תיק עבודות התקנה (תמונות, תיעוד)',
          'רשימת שאלות ספציפיות מוכנה',
          'מכשיר הקלטה (בקשו אישור קודם)',
        ],
      },
    },
    agenda: [
      {
        time: '0-5 min',
        topic: { en: 'Introduction & purpose', he: 'הצגה ומטרה' },
        details: {
          en: 'Introduce yourself as a solar installer seeking to comply with all regulations. Show respect for the regulatory framework.',
          he: 'הציגו את עצמכם כמתקין סולארי המבקש לעמוד בכל התקנות. הפגינו כבוד למסגרת הרגולטורית.',
        },
      },
      {
        time: '5-15 min',
        topic: { en: 'Installer registration process', he: 'תהליך רישום מתקין' },
        details: {
          en: 'Ask about the complete process to become a registered/authorized DG installer. Understand required certifications, fees, and renewal procedures.',
          he: 'שאלו על התהליך המלא להפוך למתקין DG רשום/מורשה. הבינו הסמכות נדרשות, עמלות ונהלי חידוש.',
        },
      },
      {
        time: '15-25 min',
        topic: { en: 'Compliance requirements', he: 'דרישות תאימות' },
        details: {
          en: 'Review technical standards, documentation requirements, safety protocols, and any province-specific regulations beyond the national framework.',
          he: 'סקרו תקנים טכניים, דרישות תיעוד, פרוטוקולי בטיחות וכל תקנות ספציפיות לפרובינציה מעבר למסגרת הלאומית.',
        },
      },
      {
        time: '25-35 min',
        topic: { en: 'Inspection procedures', he: 'נהלי בדיקה' },
        details: {
          en: 'Understand what inspectors look for, common failure points, scheduling process, and how to prepare a site for inspection.',
          he: 'הבינו מה בודקים מפקחים, נקודות כישלון נפוצות, תהליך תזמון ואיך להכין אתר לבדיקה.',
        },
      },
      {
        time: '35-45 min',
        topic: { en: 'Updates & future changes', he: 'עדכונים ושינויים עתידיים' },
        details: {
          en: 'Ask about upcoming regulatory changes, capacity limits, new requirements, and how to stay informed about updates.',
          he: 'שאלו על שינויים רגולטוריים צפויים, מגבלות קיבולת, דרישות חדשות ואיך להישאר מעודכנים.',
        },
      },
    ],
    keyQuestions: {
      en: [
        'What is the complete process to register as an authorized DG installer?',
        'What certifications or training does your authority recognize?',
        'What technical standards must installations comply with (IRAM, IEC)?',
        'What documents must be submitted for each installation project?',
        'What does the inspection process involve and what are common failure points?',
        'How long does the inspection-to-approval process typically take?',
        'Are there capacity limits (per installation or per transformer/feeder)?',
        'Are there any proposed changes to DG regulations we should prepare for?',
        'What happens if an installation fails inspection? Re-inspection fee?',
        'Is there a public registry of approved installations we can reference?',
      ],
      he: [
        'מה התהליך המלא להירשם כמתקין DG מורשה?',
        'אילו הסמכות או הכשרות הרשות שלכם מכירה בהן?',
        'באילו תקנים טכניים חייבות עמוד ההתקנות (IRAM, IEC)?',
        'אילו מסמכים חייבים להיות מוגשים לכל פרויקט התקנה?',
        'מה כולל תהליך הבדיקה ומהן נקודות כישלון נפוצות?',
        'כמה זמן לוקח בדרך כלל תהליך הבדיקה עד האישור?',
        'האם ישנן מגבלות קיבולת (להתקנה או לשנאי/מוליך)?',
        'האם ישנם שינויים מוצעים לתקנות DG שכדאי שנתכונן אליהם?',
        'מה קורה אם התקנה נכשלת בבדיקה? עמלת בדיקה חוזרת?',
        'האם יש רישום ציבורי של התקנות מאושרות שנוכל להתייחס אליו?',
      ],
    },
    redFlags: {
      en: [
        'Regulator is unaware of Ley 27.424 or provincial adherence — escalate',
        'Excessive or unusual fees that appear designed to block DG adoption',
        'No clear inspection process or timeline — indicates disorganization',
        'Demands for certifications that don\'t exist or aren\'t available in Argentina',
      ],
      he: [
        'הרגולטור לא מודע לחוק 27.424 או להצטרפות הפרובינציה — הסלימו',
        'עמלות מופרזות או חריגות שנראות מתוכננות לחסום אימוץ DG',
        'אין תהליך בדיקה ברור או לוח זמנים — מעיד על חוסר ארגון',
        'דרישות להסמכות שלא קיימות או לא זמינות בארגנטינה',
      ],
    },
    followUp: {
      en: [
        'Submit installer registration application within 1 week',
        'Compile all required documentation in a professional dossier',
        'Subscribe to regulatory newsletters or updates from the authority',
        'Join industry associations (CADER, CAERSI) for regulatory advocacy',
        'Schedule periodic check-ins with the regulator (quarterly)',
        'Share regulatory updates with your team and electrician partners',
      ],
      he: [
        'הגישו בקשת רישום מתקין תוך שבוע',
        'אספו את כל התיעוד הנדרש בתיק מקצועי',
        'הירשמו לניוזלטרים או עדכונים רגולטוריים מהרשות',
        'הצטרפו לאיגודי תעשייה (CADER, CAERSI) לסנגור רגולטורי',
        'תזמנו ביקורות תקופתיות עם הרגולטור (רבעוניות)',
        'שתפו עדכונים רגולטוריים עם הצוות ושותפי החשמלאים שלכם',
      ],
    },
    sampleScript: {
      en: `"Good morning, my name is [Name] from [Company]. We're a new solar installation company and I want to make sure we fully comply with all provincial and national regulations for distributed generation. I've studied Ley 27.424 and the provincial adherence resolution, but I'd like your guidance on the specific requirements for installer registration, project approval, and inspections in [province]. I want to do everything by the book from day one."`,
      he: `"בוקר טוב, שמי [שם] מ[חברה]. אנחנו חברת התקנות סולאריות חדשה ואני רוצה לוודא שאנחנו עומדים במלואם בכל התקנות הפרובינציאליות והלאומיות לייצור מבוזר. למדתי את חוק 27.424 ואת החלטת ההצטרפות הפרובינציאלית, אבל הייתי רוצה את ההנחיה שלכם לגבי הדרישות הספציפיות לרישום מתקין, אישור פרויקט ובדיקות ב[פרובינציה]. אני רוצה לעשות הכל לפי הספר מיום ראשון."`,
    },
    tips: {
      en: [
        'Be respectful and patient — regulators respond well to professional, compliant installers',
        'Come prepared with specific questions — shows you\'ve done your homework',
        'Ask for everything in writing — verbal guidance can change',
        'Build a long-term relationship — you\'ll need them for every project',
      ],
      he: [
        'היו מכבדים וסבלניים — רגולטורים מגיבים היטב למתקינים מקצועיים ותואמים',
        'בואו מוכנים עם שאלות ספציפיות — מראה שעשיתם שיעורי בית',
        'בקשו הכל בכתב — הנחיות בעל פה יכולות להשתנות',
        'בנו קשר לטווח ארוך — תצטרכו אותם לכל פרויקט',
      ],
    },
  },
  {
    id: 'bank-financing',
    type: 'bank-financing',
    title: {
      en: 'Bank Financing Meeting',
      he: 'פגישת מימון בנקאי',
    },
    icon: 'Building2',
    who: {
      en: 'Commercial lending officer or SME banking representative at a local bank (Banco Nacion, Galicia, BBVA, etc.)',
      he: 'פקיד הלוואות מסחריות או נציג בנקאות SME בבנק מקומי (Banco Nacion, Galicia, BBVA, וכו\')',
    },
    purpose: {
      en: 'Explore loan products for solar installations, understand interest rates, collateral requirements, and establish financing options you can offer customers',
      he: 'לחקור מוצרי הלוואות להתקנות סולאריות, להבין שיעורי ריבית, דרישות בטוחות ולהקים אפשרויות מימון שתוכלו להציע ללקוחות',
    },
    duration: '45-60 min',
    preparation: {
      documents: {
        en: [
          'Your company financial statements (last 2 years)',
          'Business plan with projected installation volumes',
          'Sample solar project economics (ROI, payback, NPV)',
          'Customer pipeline or signed contracts',
        ],
        he: [
          'דוחות כספיים של החברה (2 שנים אחרונות)',
          'תוכנית עסקית עם היקפי התקנה צפויים',
          'כלכלת פרויקט סולארי לדוגמה (ROI, החזר, NPV)',
          'צינור לקוחות או חוזים חתומים',
        ],
      },
      research: {
        en: [
          'Current SME loan rates and green financing programs',
          'Banco Nacion\'s "Creditos para Energia Renovable" program details',
          'Provincial development bank solar financing programs',
          'International green finance programs available in Argentina (IDB, World Bank)',
        ],
        he: [
          'שיעורי הלוואות SME נוכחיים ותוכניות מימון ירוק',
          'פרטי תוכנית "Creditos para Energia Renovable" של Banco Nacion',
          'תוכניות מימון סולארי של בנקי פיתוח פרובינציאליים',
          'תוכניות מימון ירוק בינלאומיות זמינות בארגנטינה (IDB, בנק עולמי)',
        ],
      },
      materials: {
        en: [
          'Printed ROI analysis showing how solar savings cover loan payments',
          'Market research on Argentina solar growth projections',
          'Comparison of solar system costs vs monthly electricity costs',
          'Letter of intent from potential customers (if available)',
        ],
        he: [
          'ניתוח ROI מודפס המראה איך חיסכון סולארי מכסה תשלומי הלוואה',
          'מחקר שוק על תחזיות צמיחת סולאר בארגנטינה',
          'השוואת עלויות מערכת סולארית מול עלויות חשמל חודשיות',
          'מכתב כוונות מלקוחות פוטנציאליים (אם זמין)',
        ],
      },
    },
    agenda: [
      {
        time: '0-5 min',
        topic: { en: 'Introduction & business overview', he: 'הצגה וסקירת עסק' },
        details: {
          en: 'Present your company, solar business model, and why you\'re seeking financing partnerships. Frame solar as a growing, low-risk sector.',
          he: 'הציגו את החברה, מודל העסקים הסולארי ולמה אתם מחפשים שותפויות מימון. מסגרו סולאר כמגזר צומח ובסיכון נמוך.',
        },
      },
      {
        time: '5-15 min',
        topic: { en: 'Available loan products', he: 'מוצרי הלוואה זמינים' },
        details: {
          en: 'Ask about all relevant loan products: SME credit lines, green financing, energy efficiency loans, and consumer financing for end customers.',
          he: 'שאלו על כל מוצרי ההלוואה הרלוונטיים: קווי אשראי SME, מימון ירוק, הלוואות יעילות אנרגטית ומימון צרכני ללקוחות קצה.',
        },
      },
      {
        time: '15-25 min',
        topic: { en: 'Interest rates & terms', he: 'שיעורי ריבית ותנאים' },
        details: {
          en: 'Compare fixed vs variable rates, loan tenors, grace periods, and total cost of financing. Calculate monthly payments for typical system sizes.',
          he: 'השוו ריבית קבועה מול משתנה, תקופות הלוואה, תקופות חסד ועלות מימון כוללת. חשבו תשלומים חודשיים לגדלי מערכת טיפוסיים.',
        },
      },
      {
        time: '25-35 min',
        topic: { en: 'Collateral & documentation', he: 'בטוחות ותיעוד' },
        details: {
          en: 'Understand collateral requirements, personal guarantees, required financial documentation, and credit score thresholds.',
          he: 'הבינו דרישות בטוחות, ערבויות אישיות, תיעוד פיננסי נדרש וסיפי ציון אשראי.',
        },
      },
      {
        time: '35-45 min',
        topic: { en: 'Customer financing partnership', he: 'שותפות מימון ללקוחות' },
        details: {
          en: 'Explore whether the bank can offer end-customer solar loans that you can facilitate. Discuss commission structures, referral programs, and co-branding.',
          he: 'חקרו האם הבנק יכול להציע הלוואות סולאריות ללקוח קצה שאתם יכולים לאפשר. דונו במבני עמלות, תוכניות הפניה ומיתוג משותף.',
        },
      },
      {
        time: '45-55 min',
        topic: { en: 'Application process & timeline', he: 'תהליך בקשה ולוח זמנים' },
        details: {
          en: 'Understand the complete application-to-disbursement timeline. Ask about fast-track options and what can delay approval.',
          he: 'הבינו את לוח הזמנים המלא מבקשה עד קבלת כספים. שאלו על אפשרויות מסלול מהיר ומה יכול לעכב אישור.',
        },
      },
    ],
    keyQuestions: {
      en: [
        'Do you have specific loan products for solar or renewable energy installations?',
        'What interest rates are currently available for SME energy loans?',
        'What is the maximum loan amount and tenor for solar financing?',
        'What collateral is required? Can the solar system itself serve as collateral?',
        'Is there a grace period before repayments begin?',
        'How long does the approval process typically take?',
        'Can you offer direct consumer financing for our customers\' solar purchases?',
        'Are there government-subsidized green credit lines we should apply for?',
        'What happens if a borrower defaults — do you repossess the solar system?',
        'Can we establish a framework agreement for multiple customer loans?',
        'What documentation do you need from the end customer?',
        'Is there a referral commission or partnership program for installers?',
      ],
      he: [
        'יש לכם מוצרי הלוואה ספציפיים להתקנות סולאריות או אנרגיה מתחדשת?',
        'אילו שיעורי ריבית זמינים כרגע להלוואות אנרגיה SME?',
        'מה סכום ההלוואה המקסימלי והתקופה למימון סולארי?',
        'אילו בטוחות נדרשות? האם המערכת הסולארית עצמה יכולה לשמש כבטוחה?',
        'האם יש תקופת חסד לפני שמתחילים תשלומים?',
        'כמה זמן לוקח תהליך האישור בדרך כלל?',
        'תוכלו להציע מימון צרכני ישיר לרכישות הסולאריות של הלקוחות שלנו?',
        'האם ישנם קווי אשראי ירוק מסובסדים שכדאי שנגיש בקשה אליהם?',
        'מה קורה אם לווה מפר — האם אתם תופסים את המערכת הסולארית?',
        'האם נוכל להקים הסכם מסגרת להלוואות מרובות ללקוחות?',
        'איזה תיעוד אתם צריכים מהלקוח הסופי?',
        'האם יש עמלת הפניה או תוכנית שותפות למתקינים?',
      ],
    },
    redFlags: {
      en: [
        'Interest rates significantly above market for "green" loans — they may not have a real product',
        'No understanding of solar economics or unwillingness to learn',
        'Requires collateral exceeding the system value',
        'Approval timeline longer than 60 days with no fast-track option',
        'Bank has no track record of financing renewable energy projects',
        'Hidden fees or prepayment penalties in the loan terms',
      ],
      he: [
        'שיעורי ריבית גבוהים משמעותית מהשוק להלוואות "ירוקות" — ייתכן שאין להם מוצר אמיתי',
        'אין הבנה של כלכלת סולאר או חוסר נכונות ללמוד',
        'דורש בטוחות העולות על ערך המערכת',
        'לוח זמנים לאישור ארוך מ-60 יום ללא אפשרות מסלול מהיר',
        'לבנק אין רקורד במימון פרויקטי אנרגיה מתחדשת',
        'עמלות נסתרות או קנסות פירעון מוקדם בתנאי ההלוואה',
      ],
    },
    followUp: {
      en: [
        'Send a formal financing partnership proposal within 1 week',
        'Provide 2-3 sample project financial models showing loan coverage from savings',
        'Request the bank\'s standard loan documentation package',
        'Introduce a ready customer for a pilot financing arrangement',
        'Schedule a follow-up meeting to finalize partnership terms',
        'Research and compare with at least 2 other banks before committing',
      ],
      he: [
        'שלחו הצעת שותפות מימון רשמית תוך שבוע',
        'ספקו 2-3 מודלים פיננסיים לפרויקט לדוגמה המראים כיסוי הלוואה מחיסכון',
        'בקשו את חבילת תיעוד ההלוואה הסטנדרטית של הבנק',
        'הציגו לקוח מוכן לסידור מימון פיילוט',
        'תזמנו פגישת מעקב לגיבוש תנאי שותפות',
        'חקרו והשוו עם לפחות 2 בנקים אחרים לפני התחייבות',
      ],
    },
    sampleScript: {
      en: `"Good morning, my name is [Name] and I represent [Company], a growing solar installation company. I'm here because I see a major opportunity in solar financing for Argentine consumers and businesses. Electricity prices have risen over 350% in the past two years, and solar installations pay for themselves in 3-5 years. I'm looking for a banking partner who can offer competitive financing to our customers, making solar accessible to those who can't pay upfront. I'd like to explore your loan products and discuss how we might create a win-win partnership."`,
      he: `"בוקר טוב, שמי [שם] ואני מייצג את [חברה], חברת התקנות סולאריות צומחת. אני כאן כי אני רואה הזדמנות גדולה במימון סולארי לצרכנים ועסקים ארגנטינאים. מחירי החשמל עלו למעלה מ-350% בשנתיים האחרונות, והתקנות סולאריות מחזירות את עצמן ב-3-5 שנים. אני מחפש שותף בנקאי שיכול להציע מימון תחרותי ללקוחות שלנו, ולהנגיש סולאר לאלו שלא יכולים לשלם מראש. הייתי רוצה לחקור את מוצרי ההלוואה שלכם ולדון באיך ניצור שותפות win-win."`,
    },
    tips: {
      en: [
        'Frame solar as a financial product, not a technology — banks understand ROI and payback',
        'Show how electricity cost savings exceed loan payments from month one',
        'Bring printed financial projections — bankers want numbers, not environmental stories',
        'Explore multiple banks simultaneously — competition improves your terms',
      ],
      he: [
        'מסגרו סולאר כמוצר פיננסי, לא כטכנולוגיה — בנקאים מבינים ROI והחזר',
        'הראו איך חיסכון בעלויות חשמל עולה על תשלומי הלוואה מהחודש הראשון',
        'הביאו תחזיות פיננסיות מודפסות — בנקאים רוצים מספרים, לא סיפורי סביבה',
        'חקרו מספר בנקים במקביל — תחרות משפרת את התנאים שלכם',
      ],
    },
  },
];
