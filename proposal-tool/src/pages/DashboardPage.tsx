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
  Circle,
  BookOpen,
  FolderKanban,
  Wrench,
  TrendingUp,
  DollarSign,
  Clock,
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { MetricCard } from '../components/ui/MetricCard';
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
  { route: '/academy', labelKey: 'nav.academy', icon: GraduationCap, color: 'text-solar-400' },
  { route: '/proposal', labelKey: 'nav.proposal', icon: Calculator, color: 'text-amber-400' },
  { route: '/suppliers', labelKey: 'nav.suppliers', icon: Factory, color: 'text-purple-400' },
  { route: '/utilities', labelKey: 'nav.utilities', icon: Zap, color: 'text-emerald-400' },
  { route: '/meetings', labelKey: 'nav.meetings', icon: Users, color: 'text-solar-400' },
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
    show: { transition: { staggerChildren: 0.06 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <div>
      {/* Welcome header */}
      <PageHeader
        title={t('dashboard.welcome')}
        subtitle={t('dashboard.subtitle')}
        actions={
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-4xl"
          >
            <Sun className="w-10 h-10 text-amber-400" />
          </motion.div>
        }
      />

      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">

        {/* Getting Started Checklist */}
        <motion.div variants={fadeUp}>
          <GlassCard variant="accent">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-solar-400" />
                {t('dashboard.gettingStarted')}
              </h3>
              <span className="text-xs text-dark-400">
                {checkedCount}/{checklistItems.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-dark-800 rounded-full mb-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-solar-500 to-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(checkedCount / checklistItems.length) * 100}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>

            <div className="space-y-1.5">
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
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-start
                      transition-all cursor-pointer group
                      ${checked ? 'bg-emerald-500/5' : 'hover:bg-white/3'}
                    `}
                  >
                    <div className={`
                      w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all
                      ${checked ? 'bg-emerald-500 text-white' : 'border border-dark-600'}
                    `}>
                      {checked ? <Check className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5 text-transparent" />}
                    </div>
                    <span className={`text-sm ${checked ? 'text-dark-500 line-through' : 'text-dark-300 group-hover:text-white'}`}>
                      {t(item.labelKey as Parameters<typeof t>[0])}
                    </span>
                  </button>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Navigation + Market Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Nav */}
          <motion.div variants={fadeUp}>
            <h3 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-3">
              {t('dashboard.quickNav')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {quickNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.route}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(item.route)}
                    className="
                      glass rounded-xl p-4 text-center cursor-pointer
                      hover:border-solar-400/20 hover:shadow-lg hover:shadow-solar-500/5
                      transition-all group
                    "
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${item.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-xs font-medium text-dark-300 group-hover:text-white transition-colors">
                      {t(item.labelKey as Parameters<typeof t>[0])}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Market Metrics */}
          <motion.div variants={fadeUp}>
            <h3 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-3">
              {t('dashboard.marketMetrics')}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <MetricCard
                icon={<Sun className="w-5 h-5" />}
                value={`${metrics.irradiation}`}
                label={t('dashboard.metrics.irradiation')}
                sublabel="kWh/m²/day"
              />
              <MetricCard
                icon={<Zap className="w-5 h-5" />}
                value={`$${metrics.tariff}`}
                label={t('dashboard.metrics.tariff')}
                sublabel="ARS/kWh"
              />
              <MetricCard
                icon={<DollarSign className="w-5 h-5" />}
                value={`$${metrics.systemCost}`}
                label={t('dashboard.metrics.systemCost')}
                sublabel="USD/kWp"
              />
              <MetricCard
                icon={<TrendingUp className="w-5 h-5" />}
                value={metrics.payback}
                label={t('dashboard.metrics.payback')}
                sublabel={language === 'he' ? 'שנים' : 'years'}
              />
            </div>
          </motion.div>
        </div>

        {/* Your Progress */}
        <motion.div variants={fadeUp}>
          <h3 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-3">
            {t('dashboard.yourProgress')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Academy Progress */}
            <GlassCard hover className="cursor-pointer" onClick={() => navigate('/academy')}>
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-solar-400" />
                <span className="text-sm font-medium text-dark-300">{t('dashboard.progress.academy')}</span>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-2xl font-bold text-white">{academyCompleted.length}</span>
                <span className="text-sm text-dark-500 mb-0.5">/ {academyTopics.length}</span>
              </div>
              <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-solar-500 rounded-full transition-all duration-500"
                  style={{ width: `${(academyCompleted.length / academyTopics.length) * 100}%` }}
                />
              </div>
            </GlassCard>

            {/* Projects Tracked */}
            <GlassCard hover className="cursor-pointer" onClick={() => navigate('/planner')}>
              <div className="flex items-center gap-3 mb-3">
                <FolderKanban className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium text-dark-300">{t('dashboard.progress.projects')}</span>
              </div>
              <span className="text-2xl font-bold text-white">{plannerProjects.length}</span>
            </GlassCard>

            {/* Installers Saved */}
            <GlassCard hover className="cursor-pointer" onClick={() => navigate('/installers')}>
              <div className="flex items-center gap-3 mb-3">
                <Wrench className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-medium text-dark-300">{t('dashboard.progress.installers')}</span>
              </div>
              <span className="text-2xl font-bold text-white">{savedInstallers.length}</span>
            </GlassCard>
          </div>
        </motion.div>

        {/* Recent Activity / Tip */}
        <motion.div variants={fadeUp}>
          <GlassCard variant="highlight">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-medium text-white">
                {language === 'he' ? 'טיפ של היום' : 'Tip of the Day'}
              </h4>
            </div>
            <p className="text-sm text-dark-400 leading-relaxed">
              {language === 'he'
                ? 'התחל מהאקדמיה הסולארית — למד את 5 הנושאים הבסיסיים לפני שתפגוש לקוחות או ספקים. זה ייתן לך ביטחון בשיחות ויעזור לך לשאול את השאלות הנכונות.'
                : 'Start with the Solar Academy — complete the 5 fundamentals topics before meeting customers or suppliers. This will give you confidence in conversations and help you ask the right questions.'}
            </p>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
