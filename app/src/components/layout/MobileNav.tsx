import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  GraduationCap,
  Factory,
  Calculator,
  MoreHorizontal,
  X,
  Sparkles,
  GitBranch,
  Users,
  Zap,
  FileCheck,
  Megaphone,
  ClipboardList,
  Wrench,
} from 'lucide-react';
import { useTranslation, type TranslationKey } from '../../i18n';

const mainTabs = [
  { path: '/', labelKey: 'nav.dashboard', icon: LayoutDashboard },
  { path: '/academy', labelKey: 'nav.academy', icon: GraduationCap },
  { path: '/smart-proposal', labelKey: 'nav.smartProposal', icon: Sparkles },
  { path: '/suppliers', labelKey: 'nav.suppliers', icon: Factory },
];

const moreItems = [
  { path: '/value-chain', labelKey: 'nav.valueChain', icon: GitBranch },
  { path: '/meetings', labelKey: 'nav.meetings', icon: Users },
  { path: '/utilities', labelKey: 'nav.utilities', icon: Zap },
  { path: '/licensing', labelKey: 'nav.licensing', icon: FileCheck },
  { path: '/acquisition', labelKey: 'nav.acquisition', icon: Megaphone },
  { path: '/proposal', labelKey: 'nav.proposal', icon: Calculator },
  { path: '/installers', labelKey: 'nav.installers', icon: Wrench },
  { path: '/planner', labelKey: 'nav.planner', icon: ClipboardList },
];

export function MobileNav() {
  const { t } = useTranslation();
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);

  const isMoreActive = moreItems.some(
    (item) => location.pathname === item.path || location.pathname.startsWith(item.path + '/')
  );

  return (
    <>
      {/* More drawer */}
      <AnimatePresence>
        {showMore && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMore(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="
                fixed bottom-0 inset-x-0 z-50 md:hidden
                bg-zinc-900 rounded-t-2xl pb-safe
                max-h-[70vh] overflow-y-auto
              "
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <span className="text-sm font-semibold text-white">{t('common.more')}</span>
                <button
                  onClick={() => setShowMore(false)}
                  className="p-1 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-3 grid grid-cols-3 gap-2">
                {moreItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    location.pathname === item.path ||
                    location.pathname.startsWith(item.path + '/');
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowMore(false)}
                      className={`
                        flex flex-col items-center gap-1.5 p-3 rounded-md transition-colors duration-150
                        ${isActive ? 'bg-zinc-800/80 text-sky-400' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'}
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[10px] font-medium text-center leading-tight">
                        {t(item.labelKey as TranslationKey)}
                      </span>
                    </NavLink>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom nav bar */}
      <nav className="
        fixed bottom-0 inset-x-0 z-30 md:hidden
        bg-zinc-950 border-t border-white/[0.06]
        pb-[env(safe-area-inset-bottom)]
      ">
        <div className="flex items-center justify-around h-14">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              tab.path === '/'
                ? location.pathname === '/'
                : location.pathname === tab.path || location.pathname.startsWith(tab.path + '/');
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={`
                  flex flex-col items-center gap-0.5 px-3 py-1.5
                  transition-colors
                  ${isActive ? 'text-sky-400' : 'text-zinc-600'}
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] mt-0.5 font-medium">
                  {t(tab.labelKey as TranslationKey)}
                </span>
              </NavLink>
            );
          })}
          <button
            onClick={() => setShowMore(true)}
            className={`
              flex flex-col items-center gap-0.5 px-3 py-1.5
              transition-colors cursor-pointer
              ${isMoreActive ? 'text-sky-400' : 'text-zinc-600'}
            `}
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 font-medium">{t('common.more')}</span>
          </button>
        </div>
      </nav>
    </>
  );
}
