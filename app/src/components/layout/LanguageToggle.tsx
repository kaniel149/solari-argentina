import { useTranslation } from '../../i18n';

interface LanguageToggleProps {
  collapsed?: boolean;
  className?: string;
}

export function LanguageToggle({ collapsed = false, className = '' }: LanguageToggleProps) {
  const { language, toggleLanguage } = useTranslation();

  return (
    <button
      onClick={toggleLanguage}
      className={`
        flex items-center gap-2 rounded-md transition-colors duration-150 cursor-pointer
        text-zinc-500 hover:text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800
        ${collapsed ? 'p-1.5 justify-center' : 'px-2.5 py-1.5'}
        ${className}
      `}
      title={language === 'en' ? 'Switch to Hebrew' : 'Switch to English'}
    >
      <span className="text-xs">{language === 'en' ? '🇺🇸' : '🇮🇱'}</span>
      {!collapsed && (
        <span className="text-xs font-medium">{language === 'en' ? 'EN' : 'עב'}</span>
      )}
    </button>
  );
}
