import { motion } from 'framer-motion';
import { useTranslation } from '../../i18n';

interface LanguageToggleProps {
  collapsed?: boolean;
  className?: string;
}

export function LanguageToggle({ collapsed = false, className = '' }: LanguageToggleProps) {
  const { language, toggleLanguage } = useTranslation();

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        flex items-center gap-2 rounded-lg transition-all cursor-pointer
        text-dark-400 hover:text-white hover:bg-white/5
        ${collapsed ? 'p-2 justify-center' : 'px-3 py-2'}
        ${className}
      `}
      title={language === 'en' ? 'Switch to Hebrew' : 'Switch to English'}
    >
      <span className="text-sm">{language === 'en' ? '🇺🇸' : '🇮🇱'}</span>
      {!collapsed && (
        <span className="text-xs font-medium">{language === 'en' ? 'EN' : 'עב'}</span>
      )}
    </motion.button>
  );
}
