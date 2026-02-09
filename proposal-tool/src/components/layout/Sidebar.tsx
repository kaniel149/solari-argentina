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
import { useTranslation } from '../../i18n';
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
      { path: '/academy', labelKey: 'nav.academy', icon: <GraduationCap className="w-5 h-5" /> },
      { path: '/value-chain', labelKey: 'nav.valueChain', icon: <GitBranch className="w-5 h-5" /> },
    ],
  },
  {
    titleKey: 'nav.operate',
    items: [
      { path: '/suppliers', labelKey: 'nav.suppliers', icon: <Factory className="w-5 h-5" /> },
      { path: '/meetings', labelKey: 'nav.meetings', icon: <Users className="w-5 h-5" /> },
      { path: '/utilities', labelKey: 'nav.utilities', icon: <Zap className="w-5 h-5" /> },
      { path: '/licensing', labelKey: 'nav.licensing', icon: <FileCheck className="w-5 h-5" /> },
      { path: '/installers', labelKey: 'nav.installers', icon: <Wrench className="w-5 h-5" /> },
    ],
  },
  {
    titleKey: 'nav.sell',
    items: [
      { path: '/acquisition', labelKey: 'nav.acquisition', icon: <Megaphone className="w-5 h-5" /> },
      { path: '/smart-proposal', labelKey: 'nav.smartProposal', icon: <Sparkles className="w-5 h-5" /> },
      { path: '/proposal', labelKey: 'nav.proposal', icon: <Calculator className="w-5 h-5" /> },
      { path: '/planner', labelKey: 'nav.planner', icon: <ClipboardList className="w-5 h-5" /> },
    ],
  },
];

export function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem('solari-sidebar-collapsed') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('solari-sidebar-collapsed', String(collapsed));
  }, [collapsed]);

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="
        hidden md:flex flex-col h-screen sticky top-0
        glass-strong border-e border-white/5
        overflow-hidden z-30
      "
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-solar-500 to-amber-500 flex items-center justify-center flex-shrink-0">
          <Sun className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="text-lg font-bold gradient-text whitespace-nowrap overflow-hidden"
            >
              Solari
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Language Toggle */}
      <div className="px-3 py-2 border-b border-white/5">
        <LanguageToggle collapsed={collapsed} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {/* Dashboard */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              isActive
                ? 'bg-solar-500/20 text-solar-400'
                : 'text-dark-400 hover:text-white hover:bg-white/5'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium whitespace-nowrap"
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
                  className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-dark-600"
                >
                  {t(section.titleKey as keyof typeof t)}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={collapsed ? t(item.labelKey as keyof typeof t) : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                      isActive || location.pathname.startsWith(item.path + '/')
                        ? 'bg-solar-500/20 text-solar-400'
                        : 'text-dark-400 hover:text-white hover:bg-white/5'
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
                        className="text-sm font-medium whitespace-nowrap"
                      >
                        {t(item.labelKey as keyof typeof t)}
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
          flex items-center justify-center gap-2 px-4 py-3
          border-t border-white/5 text-dark-500 hover:text-white
          transition-colors cursor-pointer
        "
      >
        {collapsed ? (
          <PanelLeft className="w-5 h-5" />
        ) : (
          <>
            <PanelLeftClose className="w-5 h-5" />
            <span className="text-xs">Collapse</span>
          </>
        )}
      </button>
    </motion.aside>
  );
}
