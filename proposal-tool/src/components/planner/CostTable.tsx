import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../i18n';
import type { PlannerProject } from '../../types/planner';

interface CostTableProps {
  project: PlannerProject;
  onUpdateActual: (category: string, value: number | undefined) => void;
}

const costCategories = [
  { key: 'panels', en: 'Panels', he: 'פאנלים' },
  { key: 'inverter', en: 'Inverter', he: 'אינוורטר' },
  { key: 'mounting', en: 'Mounting', he: 'מתקני הרכבה' },
  { key: 'cabling', en: 'Cabling', he: 'כבילה' },
  { key: 'protections', en: 'Protections', he: 'הגנות' },
  { key: 'labor', en: 'Labor', he: 'עבודה' },
  { key: 'design', en: 'Design', he: 'תכנון' },
  { key: 'permits', en: 'Permits', he: 'היתרים' },
] as const;

type CostKey = typeof costCategories[number]['key'];

export function CostTable({ project, onUpdateActual }: CostTableProps) {
  const { language } = useTranslation();
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const plannedTotal = Object.values(project.plannedCosts).reduce((a, b) => a + b, 0);
  const actualTotal = costCategories.reduce((sum, cat) => {
    const val = project.actualCosts[cat.key as CostKey];
    return sum + (val ?? 0);
  }, 0);
  const hasAnyActual = costCategories.some((cat) => project.actualCosts[cat.key as CostKey] !== undefined);

  const startEdit = (key: string, currentValue?: number) => {
    setEditingCell(key);
    setEditValue(currentValue?.toString() || '');
  };

  const commitEdit = (key: string) => {
    const num = editValue.trim() === '' ? undefined : parseFloat(editValue);
    onUpdateActual(key, num);
    setEditingCell(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, key: string) => {
    if (e.key === 'Enter') commitEdit(key);
    if (e.key === 'Escape') setEditingCell(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="overflow-x-auto"
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-start py-2 px-3 text-xs font-medium text-dark-400">
              {language === 'he' ? 'קטגוריה' : 'Category'}
            </th>
            <th className="text-end py-2 px-3 text-xs font-medium text-dark-400">
              {language === 'he' ? 'מתוכנן (USD)' : 'Planned (USD)'}
            </th>
            <th className="text-end py-2 px-3 text-xs font-medium text-dark-400">
              {language === 'he' ? 'בפועל (USD)' : 'Actual (USD)'}
            </th>
            <th className="text-end py-2 px-3 text-xs font-medium text-dark-400">
              {language === 'he' ? 'הפרש' : 'Difference'}
            </th>
          </tr>
        </thead>
        <tbody>
          {costCategories.map((cat) => {
            const planned = project.plannedCosts[cat.key as CostKey];
            const actual = project.actualCosts[cat.key as CostKey];
            const diff = actual !== undefined ? actual - planned : undefined;
            const isEditing = editingCell === cat.key;

            return (
              <tr key={cat.key} className="border-b border-white/5 hover:bg-white/2">
                <td className="py-2 px-3 text-dark-200">{cat[language]}</td>
                <td className="py-2 px-3 text-end text-dark-300">${planned.toLocaleString()}</td>
                <td className="py-2 px-3 text-end">
                  {isEditing ? (
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => commitEdit(cat.key)}
                      onKeyDown={(e) => handleKeyDown(e, cat.key)}
                      autoFocus
                      className="w-24 px-2 py-1 rounded-lg bg-dark-800 text-dark-200 text-sm text-end focus:outline-none focus:ring-1 focus:ring-solar-500/30"
                    />
                  ) : (
                    <button
                      onClick={() => startEdit(cat.key, actual)}
                      className="cursor-pointer text-dark-400 hover:text-white transition-colors min-w-[4rem] text-end"
                      title={language === 'he' ? 'לחץ לעריכה' : 'Click to edit'}
                    >
                      {actual !== undefined ? `$${actual.toLocaleString()}` : '-'}
                    </button>
                  )}
                </td>
                <td className="py-2 px-3 text-end">
                  {diff !== undefined ? (
                    <span className={diff <= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {diff <= 0 ? '-' : '+'}${Math.abs(diff).toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-dark-600">-</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="border-t border-white/10 font-bold">
            <td className="py-2 px-3 text-white">
              {language === 'he' ? 'סה"כ' : 'Total'}
            </td>
            <td className="py-2 px-3 text-end text-white">${plannedTotal.toLocaleString()}</td>
            <td className="py-2 px-3 text-end text-white">
              {hasAnyActual ? `$${actualTotal.toLocaleString()}` : '-'}
            </td>
            <td className="py-2 px-3 text-end">
              {hasAnyActual ? (
                <span className={actualTotal - plannedTotal <= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {actualTotal - plannedTotal <= 0 ? '-' : '+'}${Math.abs(actualTotal - plannedTotal).toLocaleString()}
                </span>
              ) : (
                <span className="text-dark-600">-</span>
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </motion.div>
  );
}
