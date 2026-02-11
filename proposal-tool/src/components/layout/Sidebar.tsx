import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  GraduationCap,
  GitBranch,
  Factory,
  Users,
  Zap,
  FileCheck,
  Megaphone,
  Calculator,
  ClipboardList,
  Wrench,
  PanelLeftClose,
  PanelLeft,
  Sun,
  Sparkles,
} from 'lucide-react';
import { useTranslation, type TranslationKey } from '../../i18n';
import { LanguageToggle } from './LanguageToggle';

interface NavItem {
  path: string;
  labelKey: string;
  icon: React.ReactNode;
}

interface NavSection {
  titleKey: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    titleKey: 'nav.learn',
    items: [
      { path: '/academy', labelKey: 'nav.academy', icon: <GraduationCap className="w-4 h-4" /> },
      { path: '/value-chain', labelKey: 'nav.valueChain', icon: <GitBranch className="w-4 h-4" /> },
    ],
  },
  {
    titleKey: 'nav.operate',
    items: [
      { path: '/suppliers', labelKey: 'nav.suppliers', icon: <Factory className="w-4 h-4" /> },
      { path: '/meetings', labelKey: 'nav.meetings', icon: <Users className="w-4 h-4" /> },
      { path: '/utilities', labelKey: 'nav.utilities', icon: <Zap className="w-4 h-4" /> },
      { path: '/licensing', labelKey: 'nav.licensing', icon: <FileCheck className="w-4 h-4" /> },
      { path: '/installers', labelKey: 'nav.installers', icon: <Wrench className="w-4 h-4" /> },
    ],
  },
  {
    titleKey: 'nav.sell',
    items: [
      { path: '/acquisition', labelKey: 'nav.acquisition', icon: <Megaphone className="w-4 h-4" /> },
      { path: '/smart-proposal', labelKey: 'nav.smartProposal', icon: <Sparkles className="w-4 h-4" /> },
      { path: '/proposal', labelKey: 'nav.proposal', icon: <Calculator className="w-4 h-4" /> },
      { path: '/planner', labelKey: 'nav.planner', icon: <ClipboardList className="w-4 h-4" /> },
    ],
  },
];

export function Sidebar() {
  const { t, isRTL } = useTranslation();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem('solari-sidebar-collapsed') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('solari-sidebar-collapsed', String(collapsed));
  }, [collapsed]);

  return (
    <motion.aside
      animate={{ width: collapsed ? 52 : 240 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="
        hidden md:flex flex-col h-screen sticky top-0
        bg-zinc-950 border-e border-white/[0.06]
        overflow-hidden z-30
      "
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 py-4 border-b border-white/[0.06]">
        <div className="w-7 h-7 rounded-md bg-zinc-800 flex items-center justify-center flex-shrink-0">
          <Sun className="w-4 h-4 text-zinc-300" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="text-base font-semibold text-zinc-100 whitespace-nowrap overflow-hidden"
            >
              Solari
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Language Toggle */}
      <div className="px-2 py-2 border-b border-white/[0.06]">
        <LanguageToggle collapsed={collapsed} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {/* Dashboard */}
        <NavLink
          to="/"
          title={collapsed ? t('nav.dashboard') : undefined}
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-colors duration-150 ${
              isActive
                ? `text-zinc-50 bg-zinc-800/80 ${isRTL ? 'border-e-2' : 'border-s-2'} border-sky-500`
                : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`
          }
        >
          <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm whitespace-nowrap"
              >
                {t('nav.dashboard')}
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>

        {/* Sections */}
        {navSections.map((section) => (
          <div key={section.titleKey}>
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-3 mb-1 text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-600"
                >
                  {t(section.titleKey as TranslationKey)}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={collapsed ? t(item.labelKey as TranslationKey) : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-colors duration-150 ${
                      isActive || location.pathname.startsWith(item.path + '/')
                        ? `text-zinc-50 bg-zinc-800/80 ${isRTL ? 'border-e-2' : 'border-s-2'} border-sky-500`
                        : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'
                    }`
                  }
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm whitespace-nowrap"
                      >
                        {t(item.labelKey as TranslationKey)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="
          flex items-center justify-center gap-2 px-3 py-3
          border-t border-white/[0.06] text-zinc-600 hover:text-zinc-400
          transition-colors cursor-pointer
        "
      >
        {collapsed ? (
          <PanelLeft className="w-4 h-4" />
        ) : (
          <>
            <PanelLeftClose className="w-4 h-4" />
            <span className="text-xs">{t('common.collapse')}</span>
          </>
        )}
      </button>
    </motion.aside>
  );
}
