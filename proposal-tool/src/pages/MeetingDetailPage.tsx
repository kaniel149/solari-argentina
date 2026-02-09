import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ClipboardList, Calendar, HelpCircle, AlertTriangle,
  CheckCircle, MessageSquare, Lightbulb, FileText,
  Search, Briefcase, Copy, Check,
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Tabs } from '../components/ui/Tabs';
import { GlassCard } from '../components/ui/GlassCard';
import { AgendaView } from '../components/meetings/AgendaView';
import { QuestionList } from '../components/meetings/QuestionList';
import { useTranslation } from '../i18n';
import { meetingGuides } from '../data/meetings';

export default function MeetingDetailPage() {
  const { type } = useParams<{ type: string }>();
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState('preparation');
  const [scriptCopied, setScriptCopied] = useState(false);

  const meeting = meetingGuides.find((m) => m.id === type);

  if (!meeting) {
    return (
      <div>
        <PageHeader title={t('meetings.title')} backTo="/meetings" />
        <GlassCard>
          <p className="text-dark-400 text-center py-12">{t('common.none')}</p>
        </GlassCard>
      </div>
    );
  }

  const tabs = [
    { id: 'preparation', label: t('meetings.preparation'), icon: <ClipboardList className="w-4 h-4" /> },
    { id: 'agenda', label: t('meetings.agenda'), icon: <Calendar className="w-4 h-4" /> },
    { id: 'questions', label: t('meetings.questions'), icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'redflags', label: t('meetings.redFlags'), icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'followup', label: t('meetings.followUp'), icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'script', label: t('meetings.script'), icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const handleCopyScript = async () => {
    await navigator.clipboard.writeText(meeting.sampleScript[language]);
    setScriptCopied(true);
    setTimeout(() => setScriptCopied(false), 2000);
  };

  return (
    <div>
      <PageHeader
        title={meeting.title[language]}
        subtitle={meeting.purpose[language]}
        backTo="/meetings"
      />

      {/* Meeting meta info */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="glass rounded-xl px-4 py-2.5 text-sm">
          <span className="text-dark-500 me-2">{t('meetings.duration')}:</span>
          <span className="text-white font-medium">{meeting.duration}</span>
        </div>
        <div className="glass rounded-xl px-4 py-2.5 text-sm flex-1 min-w-48">
          <span className="text-dark-500 me-2">{language === 'he' ? 'עם מי:' : 'With whom:'}</span>
          <span className="text-dark-300">{meeting.who[language]}</span>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'preparation' && (
          <div className="grid gap-4 sm:grid-cols-3">
            <GlassCard>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-solar-400" />
                <h3 className="text-sm font-medium text-white">{t('meetings.documents')}</h3>
              </div>
              <ul className="space-y-2">
                {meeting.preparation.documents[language].map((doc, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-dark-400">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-solar-400 flex-shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-medium text-white">{t('meetings.research')}</h3>
              </div>
              <ul className="space-y-2">
                {meeting.preparation.research[language].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-dark-400">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-medium text-white">{t('meetings.materials')}</h3>
              </div>
              <ul className="space-y-2">
                {meeting.preparation.materials[language].map((mat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-dark-400">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    {mat}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        )}

        {activeTab === 'agenda' && (
          <GlassCard>
            <AgendaView agenda={meeting.agenda} />
          </GlassCard>
        )}

        {activeTab === 'questions' && (
          <QuestionList questions={meeting.keyQuestions} />
        )}

        {activeTab === 'redflags' && (
          <GlassCard>
            <ul className="space-y-3">
              {meeting.redFlags[language].map((flag, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-sm"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span className="text-dark-300">{flag}</span>
                </motion.li>
              ))}
            </ul>
          </GlassCard>
        )}

        {activeTab === 'followup' && (
          <div className="space-y-4">
            <GlassCard>
              <h3 className="text-sm font-medium text-white mb-3">{t('meetings.followUp')}</h3>
              <ul className="space-y-2.5">
                {meeting.followUp[language].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-dark-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </GlassCard>

            {meeting.tips && (
              <GlassCard variant="highlight">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-medium text-white">Tips</h3>
                </div>
                <ul className="space-y-2">
                  {meeting.tips[language].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-dark-400">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}
          </div>
        )}

        {activeTab === 'script' && (
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-white">{t('meetings.script')}</h3>
              <button
                onClick={handleCopyScript}
                className="flex items-center gap-1.5 text-xs text-dark-400 hover:text-white transition-colors cursor-pointer px-3 py-1.5 glass rounded-lg"
              >
                {scriptCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">{language === 'he' ? 'הועתק!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{language === 'he' ? 'העתק' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-sm text-dark-300 leading-relaxed whitespace-pre-wrap italic">
                {meeting.sampleScript[language]}
              </p>
            </div>
          </GlassCard>
        )}
      </motion.div>
    </div>
  );
}
