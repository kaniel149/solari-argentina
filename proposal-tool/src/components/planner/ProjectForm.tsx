import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Calculator } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTranslation } from '../../i18n';
import { provinces } from '../../data/provinces';
import { getRecommendedPanel, getRecommendedInverter, installationCosts } from '../../data/equipment';
import type { PlannerProject, BudgetTier } from '../../types/planner';

interface ProjectFormProps {
  project?: PlannerProject | null;
  onSave: (project: PlannerProject) => void;
  onClose: () => void;
}

function calculatePlannedCosts(systemSizeKwp: number, tier: BudgetTier) {
  const panel = getRecommendedPanel(tier);
  const inverter = getRecommendedInverter(tier, systemSizeKwp);
  const costs = installationCosts[tier];

  const panelCount = Math.ceil((systemSizeKwp * 1000) / panel.wattage);
  const panelsCost = panelCount * panel.priceUsd;
  const inverterCost = inverter.priceUsd;

  return {
    panels: Math.round(panelsCost),
    inverter: Math.round(inverterCost),
    mounting: Math.round(costs.mountingPerKwp * systemSizeKwp),
    cabling: Math.round(costs.cablingPerKwp * systemSizeKwp),
    protections: Math.round(costs.protectionsPerKwp * systemSizeKwp),
    labor: Math.round(costs.laborPerKwp * systemSizeKwp),
    design: Math.round(costs.designPerKwp * systemSizeKwp),
    permits: costs.permitsFlat,
  };
}

export function ProjectForm({ project, onSave, onClose }: ProjectFormProps) {
  const { language } = useTranslation();
  const isEdit = !!project;

  const [form, setForm] = useState({
    customerName: project?.customerName || '',
    province: project?.province || '',
    systemSizeKwp: project?.systemSizeKwp?.toString() || '',
    budgetTier: project?.budgetTier || 'standard' as BudgetTier,
    notes: project?.notes || '',
  });

  const sizeKwp = parseFloat(form.systemSizeKwp) || 0;
  const plannedCosts = sizeKwp > 0 ? calculatePlannedCosts(sizeKwp, form.budgetTier) : null;
  const totalPlanned = plannedCosts
    ? Object.values(plannedCosts).reduce((a, b) => a + b, 0)
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName.trim() || !form.province || !sizeKwp) return;

    const costs = calculatePlannedCosts(sizeKwp, form.budgetTier);

    const p: PlannerProject = {
      id: project?.id || crypto.randomUUID(),
      customerName: form.customerName.trim(),
      province: form.province,
      systemSizeKwp: sizeKwp,
      budgetTier: form.budgetTier,
      status: project?.status || 'planning',
      plannedCosts: costs,
      actualCosts: project?.actualCosts || {},
      notes: form.notes.trim(),
      createdAt: project?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(p);
  };

  const inputClass = `
    w-full px-3 py-2.5 rounded-xl glass text-sm text-dark-200
    placeholder-dark-500 focus:outline-none focus:border-solar-500/40
    focus:ring-1 focus:ring-solar-500/20 transition-all
  `;

  const labelClass = 'block text-xs font-medium text-dark-300 mb-1.5';

  const tierLabels: Record<BudgetTier, { en: string; he: string }> = {
    economy: { en: 'Economy', he: 'חסכוני' },
    standard: { en: 'Standard', he: 'סטנדרט' },
    premium: { en: 'Premium', he: 'פרימיום' },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-strong rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-white">
            {isEdit
              ? (language === 'he' ? 'עריכת פרויקט' : 'Edit Project')
              : (language === 'he' ? 'פרויקט חדש' : 'New Project')}
          </h3>
          <button onClick={onClose} className="text-dark-400 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Customer Name */}
          <div>
            <label className={labelClass}>{language === 'he' ? 'שם לקוח' : 'Customer Name'} *</label>
            <input
              type="text"
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              placeholder={language === 'he' ? 'שם הלקוח' : 'Customer name'}
              className={inputClass}
              required
            />
          </div>

          {/* Province */}
          <div>
            <label className={labelClass}>{language === 'he' ? 'מחוז' : 'Province'} *</label>
            <select
              value={form.province}
              onChange={(e) => setForm({ ...form, province: e.target.value })}
              className={`${inputClass} cursor-pointer`}
              required
            >
              <option value="">{language === 'he' ? 'בחר מחוז' : 'Select province'}</option>
              {provinces.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* System Size */}
          <div>
            <label className={labelClass}>{language === 'he' ? 'גודל מערכת (kWp)' : 'System Size (kWp)'} *</label>
            <input
              type="number"
              value={form.systemSizeKwp}
              onChange={(e) => setForm({ ...form, systemSizeKwp: e.target.value })}
              placeholder="5"
              min="1"
              max="500"
              step="0.5"
              className={inputClass}
              required
            />
          </div>

          {/* Budget Tier */}
          <div>
            <label className={labelClass}>{language === 'he' ? 'רמת תקציב' : 'Budget Tier'}</label>
            <div className="grid grid-cols-3 gap-2">
              {(['economy', 'standard', 'premium'] as BudgetTier[]).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setForm({ ...form, budgetTier: tier })}
                  className={`
                    px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer
                    ${form.budgetTier === tier
                      ? 'bg-solar-500/20 border border-solar-500/40 text-solar-300'
                      : 'glass text-dark-400 hover:text-dark-200'}
                  `}
                >
                  {tierLabels[tier][language]}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className={labelClass}>{language === 'he' ? 'הערות' : 'Notes'}</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder={language === 'he' ? 'הערות נוספות...' : 'Additional notes...'}
              rows={2}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Cost Preview */}
          {plannedCosts && (
            <div className="p-3 rounded-xl bg-white/3 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-4 h-4 text-solar-400" />
                <h4 className="text-xs font-semibold text-dark-300">
                  {language === 'he' ? 'עלות מתוכננת' : 'Planned Cost'}
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs text-dark-400 mb-2">
                <span>{language === 'he' ? 'פאנלים' : 'Panels'}: ${plannedCosts.panels.toLocaleString()}</span>
                <span>{language === 'he' ? 'אינוורטר' : 'Inverter'}: ${plannedCosts.inverter.toLocaleString()}</span>
                <span>{language === 'he' ? 'עבודה' : 'Labor'}: ${plannedCosts.labor.toLocaleString()}</span>
                <span>{language === 'he' ? 'אחר' : 'Other'}: ${(plannedCosts.mounting + plannedCosts.cabling + plannedCosts.protections + plannedCosts.design + plannedCosts.permits).toLocaleString()}</span>
              </div>
              <div className="text-sm font-bold text-white border-t border-white/5 pt-2">
                {language === 'he' ? 'סה"כ' : 'Total'}: ${totalPlanned.toLocaleString()} USD
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button type="submit" icon={<Save className="w-4 h-4" />} fullWidth>
              {isEdit
                ? (language === 'he' ? 'עדכון' : 'Update')
                : (language === 'he' ? 'צור פרויקט' : 'Create Project')}
            </Button>
            <Button variant="ghost" onClick={onClose} type="button">
              {language === 'he' ? 'ביטול' : 'Cancel'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
