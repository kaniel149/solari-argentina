import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, HelpCircle, Shield } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useTranslation } from '../../i18n';

type CheckState = 'pass' | 'fail' | 'unknown';

interface ChecklistItemData {
  id: string;
  label: { en: string; he: string };
  description: { en: string; he: string };
}

const checklistItems: ChecklistItemData[] = [
  {
    id: 'license',
    label: { en: 'Licensed electrician (matricula habilitante)', he: 'חשמלאי מוסמך (רישיון)' },
    description: { en: 'Valid provincial electrician license', he: 'רישיון חשמלאי מחוזי תקף' },
  },
  {
    id: 'art-insurance',
    label: { en: 'ART insurance (workplace risk)', he: 'ביטוח ART (סיכוני עבודה)' },
    description: { en: 'Aseguradora de Riesgos del Trabajo coverage', he: 'כיסוי ביטוח סיכוני עבודה' },
  },
  {
    id: 'liability',
    label: { en: 'Civil liability insurance', he: 'ביטוח אחריות אזרחית' },
    description: { en: 'Third-party liability coverage', he: 'כיסוי אחריות צד שלישי' },
  },
  {
    id: 'experience',
    label: { en: 'Minimum 5 solar installations', he: 'מינימום 5 התקנות סולאריות' },
    description: { en: 'Documented experience with solar projects', he: 'ניסיון מתועד בפרויקטים סולאריים' },
  },
  {
    id: 'brands',
    label: { en: 'Familiar with target brands', he: 'מכיר מותגים יעד' },
    description: { en: 'Experience with panels/inverters you sell', he: 'ניסיון עם פאנלים/אינוורטרים שאתה מוכר' },
  },
  {
    id: 'safety',
    label: { en: 'Safety certifications (trabajo en altura)', he: 'הסמכות בטיחות (עבודה בגובה)' },
    description: { en: 'Height work and electrical safety training', he: 'הכשרת עבודה בגובה ובטיחות חשמל' },
  },
  {
    id: 'references',
    label: { en: 'At least 3 verifiable references', he: 'לפחות 3 המלצות ניתנות לאימות' },
    description: { en: 'Client references that can be contacted', he: 'המלצות לקוחות שניתן לפנות אליהם' },
  },
  {
    id: 'vehicle',
    label: { en: 'Own vehicle and tools', he: 'רכב וכלים עצמיים' },
    description: { en: 'Transportation and professional toolkit', he: 'תחבורה וערכת כלים מקצועית' },
  },
  {
    id: 'pricing',
    label: { en: 'Clear pricing structure', he: 'מבנה תמחור ברור' },
    description: { en: 'Per kWp or fixed pricing model', he: 'תמחור לפי kWp או מחיר קבוע' },
  },
  {
    id: 'lead-time',
    label: { en: 'Available within 2-week lead time', he: 'זמין תוך שבועיים' },
    description: { en: 'Can start within 2 weeks of approval', he: 'יכול להתחיל תוך שבועיים מאישור' },
  },
  {
    id: 'communication',
    label: { en: 'Responsive communication (within 24h)', he: 'תקשורת מגיבה (תוך 24 שעות)' },
    description: { en: 'Answers calls/messages within 24 hours', he: 'עונה לשיחות/הודעות תוך 24 שעות' },
  },
];

export function InstallerChecklist() {
  const { language } = useTranslation();
  const [checks, setChecks] = useState<Record<string, CheckState>>({});

  const toggleState = (id: string) => {
    setChecks((prev) => {
      const current = prev[id] || 'unknown';
      const next: CheckState = current === 'unknown' ? 'pass' : current === 'pass' ? 'fail' : 'unknown';
      return { ...prev, [id]: next };
    });
  };

  const passCount = Object.values(checks).filter((v) => v === 'pass').length;
  const failCount = Object.values(checks).filter((v) => v === 'fail').length;
  const total = checklistItems.length;
  const isQualified = passCount >= 8;
  const hasChecks = passCount + failCount > 0;

  return (
    <div className="glass rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-5 h-5 text-solar-400" />
        <h3 className="text-base font-semibold text-white">
          {language === 'he' ? 'רשימת הסמכת מתקין' : 'Installer Qualification'}
        </h3>
      </div>

      {/* Score */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-2 bg-dark-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${isQualified ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-solar-500 to-solar-400'}`}
            initial={{ width: 0 }}
            animate={{ width: `${(passCount / total) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <span className="text-sm text-dark-400 whitespace-nowrap">
          {passCount}/{total}
        </span>
        {hasChecks && (
          <Badge variant={isQualified ? 'success' : 'warning'} size="sm">
            {isQualified
              ? (language === 'he' ? 'מוסמך' : 'Qualified')
              : (language === 'he' ? 'לא מוסמך' : 'Not Qualified')}
          </Badge>
        )}
      </div>

      {/* Items */}
      <div className="space-y-1.5">
        {checklistItems.map((item) => {
          const state = checks[item.id] || 'unknown';
          return (
            <motion.button
              key={item.id}
              onClick={() => toggleState(item.id)}
              className={`
                w-full flex items-start gap-3 p-3 rounded-xl text-start transition-all cursor-pointer
                ${state === 'pass' ? 'bg-emerald-500/5 border border-emerald-500/20' :
                  state === 'fail' ? 'bg-rose-500/5 border border-rose-500/20' :
                  'bg-white/3 border border-white/5 hover:border-white/10'}
              `}
              whileTap={{ scale: 0.99 }}
            >
              <div
                className={`
                  mt-0.5 w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all
                  ${state === 'pass' ? 'bg-emerald-500 text-white' :
                    state === 'fail' ? 'bg-rose-500 text-white' :
                    'border border-dark-600 text-dark-600'}
                `}
              >
                {state === 'pass' ? <Check className="w-3.5 h-3.5" /> :
                 state === 'fail' ? <X className="w-3.5 h-3.5" /> :
                 <HelpCircle className="w-3.5 h-3.5" />}
              </div>
              <div>
                <span className={`text-sm font-medium ${
                  state === 'pass' ? 'text-emerald-300' :
                  state === 'fail' ? 'text-rose-300' :
                  'text-dark-200'
                }`}>
                  {item.label[language]}
                </span>
                <p className="text-xs text-dark-500 mt-0.5">{item.description[language]}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5 text-xs text-dark-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-500" /> {language === 'he' ? 'עובר' : 'Pass'}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-rose-500" /> {language === 'he' ? 'נכשל' : 'Fail'}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border border-dark-600" /> {language === 'he' ? 'לא ידוע' : 'Unknown'}
        </span>
      </div>
    </div>
  );
}
