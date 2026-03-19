import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sun,
  GraduationCap,
  Calculator,
  Factory,
  Zap,
  Users,
  ClipboardList,
  Check,
  BookOpen,
  FolderKanban,
  Wrench,
  TrendingUp,
  DollarSign,
  Lightbulb,
} from 'lucide-react';
import { useTranslation } from '../i18n';
import { provinces } from '../data/provinces';
import { academyTopics } from '../data/academy';

interface ChecklistItem {
  id: string;
  labelKey: string;
  autoCheck?: () => boolean;
  route: string;
}

const CHECKLIST_KEY = 'solari-dashboard-checklist';

const quickNavItems = [
  { route: '/academy', labelKey: 'nav.academy', icon: GraduationCap, color: 'text-sky-400' },
  { route: '/proposal', labelKey: 'nav.proposal', icon: Calculator, color: 'text-amber-400' },
  { route: '/suppliers', labelKey: 'nav.suppliers', icon: Factory, color: 'text-purple-400' },
  { route: '/utilities', labelKey: 'nav.utilities', icon: Zap, color: 'text-emerald-400' },
  { route: '/meetings', labelKey: 'nav.meetings', icon: Users, color: 'text-sky-400' },
  { route: '/planner', labelKey: 'nav.planner', icon: ClipboardList, color: 'text-amber-400' },
];

export default function DashboardPage() {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const [manualChecks, setManualChecks] = useState<Set<string>>(new Set());

  // Load manual checklist from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CHECKLIST_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setManualChecks(new Set(parsed));
      }
    } catch { /* ignore */ }
  }, []);

  const toggleCheck = (id: string) => {
    setManualChecks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem(CHECKLIST_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  // Auto-detected progress
  const academyCompleted = useMemo(() => {
    try {
      const stored = localStorage.getItem('solari-academy-completed');
      return stored ? JSON.parse(stored) as string[] : [];
    } catch { return []; }
  }, []);

  const plannerProjects = useMemo(() => {
    try {
      const stored = localStorage.getItem('solari-planner-projects');
      return stored ? JSON.parse(stored) as unknown[] : [];
    } catch { return []; }
  }, []);

  const savedInstallers = useMemo(() => {
    try {
      const stored = localStorage.getItem('solari-installers');
      return stored ? JSON.parse(stored) as unknown[] : [];
    } catch { return []; }
  }, []);

  // Market metrics from provinces data
  const metrics = useMemo(() => {
    const avgIrradiation = provinces.reduce((s, p) => s + p.solarIrradiation, 0) / provinces.length;
    const avgTariff = provinces.reduce((s, p) => s + p.residentialTariff.energyCharge, 0) / provinces.length;
    return {
      irradiation: avgIrradiation.toFixed(1),
      tariff: Math.round(avgTariff),
      systemCost: '1,500-1,750',
      payback: '3-5',
    };
  }, []);

  // Checklist items
  const checklistItems: ChecklistItem[] = [
    {
      id: 'academy',
      labelKey: 'dashboard.checklist.academy',
      autoCheck: () => academyCompleted.filter(id =>
        academyTopics.find(t => t.id === id)?.category === 'fundamentals'
      ).length >= 3,
      route: '/academy',
    },
    { id: 'suppliers', labelKey: 'dashboard.checklist.suppliers', route: '/suppliers' },
    {
      id: 'electrician',
      labelKey: 'dashboard.checklist.electrician',
      autoCheck: () => savedInstallers.length > 0,
      route: '/installers',
    },
    { id: 'utility', labelKey: 'dashboard.checklist.utility', route: '/utilities' },
    { id: 'proposal', labelKey: 'dashboard.checklist.proposal', route: '/proposal' },
    {
      id: 'project',
      labelKey: 'dashboard.checklist.project',
      autoCheck: () => plannerProjects.length > 0,
      route: '/planner',
    },
  ];

  const isChecked = (item: ChecklistItem) =>
    manualChecks.has(item.id) || (item.autoCheck ? item.autoCheck() : false);

  const checkedCount = checklistItems.filter(isChecked).length;

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.04 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div>
      {/* Welcome header — clean, no animated sun */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-50 tracking-tight">
          {t('dashboard.welcome')}
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          {t('dashboard.subtitle')}
        </p>
      </div>

      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">

        {/* Getting Started Checklist */}
        <motion.div variants={fadeUp}>
          <div className="bg-zinc-900 border border-white/[0.09] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-zinc-400" />
                {t('dashboard.gettingStarted')}
              </h3>
              <span className="text-xs font-medium text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-md">
                {checkedCount}/{checklistItems.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-zinc-800 rounded-full mb-4 overflow-hidden">
              <motion.div
                className="h-full bg-sky-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(checkedCount / checklistItems.length) * 100}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>

            <div className="space-y-1">
              {checklistItems.map((item) => {
                const checked = isChecked(item);
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (!item.autoCheck) toggleCheck(item.id);
                      else navigate(item.route);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-lg text-start
                      transition-colors cursor-pointer group
                      ${checked ? 'bg-emerald-500/[0.04]' : 'hover:bg-zinc-800/60'}
                    `}
                  >
                    <div className={`
                      w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors
                      ${checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-zinc-700'}
                    `}>
                      {checked && <Check className="w-3 h-3" />}
                    </div>
                    <span className={`text-sm ${checked ? 'text-zinc-500 line-through' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                      {t(item.labelKey as Parameters<typeof t>[0])}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Quick Navigation + Market Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Nav */}
          <motion.div variants={fadeUp}>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              {t('dashboard.quickNav')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {quickNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.route}
                    onClick={() => navigate(item.route)}
                    className="
                      bg-zinc-900 border border-white/[0.09] rounded-xl p-4 text-center cursor-pointer
                      hover:border-white/[0.15] transition-colors group
                    "
                  >
                    <Icon className={`w-5 h-5 mx-auto mb-2 ${item.color}`} />
                    <span className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors">
                      {t(item.labelKey as Parameters<typeof t>[0])}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Market Metrics */}
          <motion.div variants={fadeUp}>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              {t('dashboard.marketMetrics')}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-900 border border-white/[0.09] rounded-xl p-4">
                <Sun className="w-4 h-4 text-amber-400 mb-2" />
                <div className="text-xl font-bold text-zinc-50">{metrics.irradiation}</div>
                <div className="text-xs text-zinc-500 mt-1">{t('dashboard.metrics.irradiation')}</div>
                <div className="text-[10px] text-zinc-600">kWh/m²/day</div>
              </div>
              <div className="bg-zinc-900 border border-white/[0.09] rounded-xl p-4">
                <Zap className="w-4 h-4 text-sky-400 mb-2" />
                <div className="text-xl font-bold text-zinc-50">${metrics.tariff}</div>
                <div className="text-xs text-zinc-500 mt-1">{t('dashboard.metrics.tariff')}</div>
                <div className="text-[10px] text-zinc-600">ARS/kWh</div>
              </div>
              <div className="bg-zinc-900 border border-white/[0.09] rounded-xl p-4">
                <DollarSign className="w-4 h-4 text-emerald-400 mb-2" />
                <div className="text-xl font-bold text-zinc-50">${metrics.systemCost}</div>
                <div className="text-xs text-zinc-500 mt-1">{t('dashboard.metrics.systemCost')}</div>
                <div className="text-[10px] text-zinc-600">USD/kWp</div>
              </div>
              <div className="bg-zinc-900 border border-white/[0.09] rounded-xl p-4">
                <TrendingUp className="w-4 h-4 text-purple-400 mb-2" />
                <div className="text-xl font-bold text-zinc-50">{metrics.payback}</div>
                <div className="text-xs text-zinc-500 mt-1">{t('dashboard.metrics.payback')}</div>
                <div className="text-[10px] text-zinc-600">{language === 'he' ? 'שנים' : 'years'}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Your Progress */}
        <motion.div variants={fadeUp}>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
            {t('dashboard.yourProgress')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Academy Progress */}
            <button
              onClick={() => navigate('/academy')}
              className="bg-zinc-900 border border-white/[0.09] rounded-xl p-4 text-start hover:border-white/[0.15] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span className="text-sm font-medium text-zinc-300">{t('dashboard.progress.academy')}</span>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-2xl font-bold text-zinc-50">{academyCompleted.length}</span>
                <span className="text-sm text-zinc-500 mb-0.5">/ {academyTopics.length}</span>
              </div>
              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 rounded-full transition-all duration-500"
                  style={{ width: `${(academyCompleted.length / academyTopics.length) * 100}%` }}
                />
              </div>
            </button>

            {/* Projects Tracked */}
            <button
              onClick={() => navigate('/planner')}
              className="bg-zinc-900 border border-white/[0.09] rounded-xl p-4 text-start hover:border-white/[0.15] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <FolderKanban className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-zinc-300">{t('dashboard.progress.projects')}</span>
              </div>
              <span className="text-2xl font-bold text-zinc-50">{plannerProjects.length}</span>
            </button>

            {/* Installers Saved */}
            <button
              onClick={() => navigate('/installers')}
              className="bg-zinc-900 border border-white/[0.09] rounded-xl p-4 text-start hover:border-white/[0.15] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-zinc-300">{t('dashboard.progress.installers')}</span>
              </div>
              <span className="text-2xl font-bold text-zinc-50">{savedInstallers.length}</span>
            </button>
          </div>
        </motion.div>

        {/* Tip of the Day */}
        <motion.div variants={fadeUp}>
          <div className="bg-zinc-900 border border-white/[0.09] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-medium text-zinc-200">
                {language === 'he' ? 'טיפ של היום' : 'Tip of the Day'}
              </h4>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {language === 'he'
                ? 'התחל מהאקדמיה הסולארית — למד את 5 הנושאים הבסיסיים לפני שתפגוש לקוחות או ספקים. זה ייתן לך ביטחון בשיחות ויעזור לך לשאול את השאלות הנכונות.'
                : 'Start with the Solar Academy — complete the 5 fundamentals topics before meeting customers or suppliers. This will give you confidence in conversations and help you ask the right questions.'}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
