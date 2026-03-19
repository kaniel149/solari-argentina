import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '../../i18n';
import { licensingInfo } from '../../data/licensing';
import { Checklist, SectionHeader } from '../ui';
import { ClipboardCheck, Wrench, CheckCircle } from 'lucide-react';

const STORAGE_KEY = 'solari-licensing-checklist';

const phaseConfig = {
  'pre-installation': {
    icon: <ClipboardCheck className="w-5 h-5" />,
    label: { en: 'Pre-Installation', he: 'לפני התקנה' },
  },
  installation: {
    icon: <Wrench className="w-5 h-5" />,
    label: { en: 'Installation', he: 'התקנה' },
  },
  'post-installation': {
    icon: <CheckCircle className="w-5 h-5" />,
    label: { en: 'Post-Installation', he: 'לאחר התקנה' },
  },
} as const;

export function PermitChecklist() {
  const { language } = useTranslation();
  const [checked, setChecked] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...checked]));
  }, [checked]);

  const handleToggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const phases: Array<'pre-installation' | 'installation' | 'post-installation'> = [
    'pre-installation',
    'installation',
    'post-installation',
  ];

  return (
    <div className="space-y-8">
      {phases.map((phase) => {
        const config = phaseConfig[phase];
        const items = licensingInfo.checklist
          .filter((item) => item.phase === phase)
          .map((item) => ({
            id: item.id,
            label: language === 'he' ? item.task.he : item.task.en,
            description: language === 'he' ? item.description.he : item.description.en,
          }));

        return (
          <div key={phase}>
            <SectionHeader
              icon={config.icon}
              title={language === 'he' ? config.label.he : config.label.en}
              subtitle={
                language === 'he'
                  ? `${items.filter((i) => checked.has(i.id)).length}/${items.length} הושלמו`
                  : `${items.filter((i) => checked.has(i.id)).length}/${items.length} completed`
              }
              className="mb-4"
            />
            <Checklist items={items} checked={checked} onToggle={handleToggle} />
          </div>
        );
      })}
    </div>
  );
}
