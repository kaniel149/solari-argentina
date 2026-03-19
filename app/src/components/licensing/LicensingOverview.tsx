import { Scale, BookOpen, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../i18n';
import { licensingInfo } from '../../data/licensing';
import { GlassCard, Accordion, SectionHeader } from '../ui';

export function LicensingOverview() {
  const { language } = useTranslation();
  const { nationalLaw, permitTypes, overview } = licensingInfo;

  const articleItems = nationalLaw.keyArticles.map((article) => ({
    id: article.article,
    title: `${article.article} — ${language === 'he' ? article.summary.he.slice(0, 60) : article.summary.en.slice(0, 60)}...`,
    icon: <Scale className="w-4 h-4" />,
    content: (
      <p className="text-dark-400 text-sm leading-relaxed">
        {language === 'he' ? article.summary.he : article.summary.en}
      </p>
    ),
  }));

  return (
    <div className="space-y-8">
      {/* Overview */}
      <GlassCard>
        <SectionHeader
          icon={<BookOpen className="w-5 h-5" />}
          title={language === 'he' ? 'סקירה כללית' : 'Overview'}
          className="mb-4"
        />
        <p className="text-sm text-dark-400 leading-relaxed">
          {language === 'he' ? overview.he : overview.en}
        </p>
      </GlassCard>

      {/* National Law */}
      <GlassCard>
        <SectionHeader
          icon={<Scale className="w-5 h-5" />}
          title={`${nationalLaw.number} — ${nationalLaw.name}`}
          className="mb-3"
        />
        <p className="text-sm text-dark-400 leading-relaxed mb-6">
          {language === 'he' ? nationalLaw.description.he : nationalLaw.description.en}
        </p>

        <h4 className="text-sm font-medium text-dark-300 mb-3">
          {language === 'he' ? 'סעיפים עיקריים' : 'Key Articles'}
        </h4>
        <Accordion items={articleItems} allowMultiple />
      </GlassCard>

      {/* Permit Types Grid */}
      <div>
        <SectionHeader
          icon={<Shield className="w-5 h-5" />}
          title={language === 'he' ? 'סוגי היתרים' : 'Permit Types'}
          subtitle={language === 'he'
            ? '5 היתרים נדרשים לחיבור מערכת סולארית לרשת'
            : '5 permits required to connect a solar system to the grid'
          }
          className="mb-4"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {permitTypes.map((permit, index) => (
            <motion.div
              key={permit.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <GlassCard hover className="h-full">
                <h4 className="font-medium text-white text-sm mb-1">
                  {language === 'he' ? permit.name.he : permit.name.en}
                </h4>
                <p className="text-xs text-solar-400 mb-3">
                  {language === 'he' ? permit.authority.he : permit.authority.en}
                </p>
                <p className="text-xs text-dark-400 leading-relaxed mb-4">
                  {language === 'he' ? permit.description.he : permit.description.en}
                </p>

                <div className="flex items-center justify-between text-xs pt-3 border-t border-white/5">
                  <span className="text-dark-500">
                    {language === 'he' ? permit.timeline.he : permit.timeline.en}
                  </span>
                  <span className="text-emerald-400 font-medium">{permit.cost}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
