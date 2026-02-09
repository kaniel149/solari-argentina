import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useTranslation } from '../../i18n';
import { provinces } from '../../data/provinces';
import { detectProvinceFromUtility } from '../../data/utilityMapping';
import type { BillExtractionResult } from '../../types';

interface BillReviewProps {
  data: BillExtractionResult;
  onChange: (data: BillExtractionResult) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export function BillReview({ data, onChange, onConfirm, onBack }: BillReviewProps) {
  const { t } = useTranslation();

  // Auto-detect province from utility if not set
  useEffect(() => {
    if (!data.province && data.utility) {
      const detected = detectProvinceFromUtility(data.utility);
      if (detected) {
        onChange({ ...data, province: detected });
      }
    }
  }, [data.utility]); // eslint-disable-line react-hooks/exhaustive-deps

  const update = (field: keyof BillExtractionResult, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  const confidenceVariant = data.confidence > 0.7
    ? 'success'
    : data.confidence >= 0.4
      ? 'warning'
      : 'danger';

  const confidenceLabel = data.confidence > 0.7
    ? 'High'
    : data.confidence >= 0.4
      ? 'Medium'
      : 'Low';

  return (
    <GlassCard
      variant="accent"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-lg mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">
          {t('smartProposal.extracted')}
        </h2>
        <Badge variant={confidenceVariant} size="md">
          {confidenceLabel} ({Math.round(data.confidence * 100)}%)
        </Badge>
      </div>

      {/* Editable fields */}
      <div className="space-y-4">
        <FieldRow
          label={t('smartProposal.customerName')}
          value={data.customerName}
          onChange={(v) => update('customerName', v)}
        />

        <FieldRow
          label={t('smartProposal.address')}
          value={data.address}
          onChange={(v) => update('address', v)}
        />

        <FieldRow
          label={t('smartProposal.utility')}
          value={data.utility}
          onChange={(v) => update('utility', v)}
        />

        <div className="grid grid-cols-2 gap-3">
          <FieldRow
            label={`${t('smartProposal.monthlyBill')} (ARS)`}
            value={String(data.monthlyBillArs)}
            type="number"
            onChange={(v) => update('monthlyBillArs', Number(v))}
          />
          <FieldRow
            label={`${t('smartProposal.consumption')} (kWh)`}
            value={String(data.monthlyKwh)}
            type="number"
            onChange={(v) => update('monthlyKwh', Number(v))}
          />
        </div>

        {/* Province dropdown */}
        <div>
          <label className="block text-sm text-dark-300 mb-1">
            {t('smartProposal.province')}
          </label>
          <select
            value={data.province}
            onChange={(e) => update('province', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
              text-white focus:outline-none focus:border-solar-500/50
              transition-colors appearance-none cursor-pointer"
          >
            <option value="" className="bg-dark-900">--</option>
            {provinces.map((p) => (
              <option key={p.id} value={p.id} className="bg-dark-900">
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-8">
        <Button
          variant="ghost"
          size="md"
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={onBack}
        >
          {t('common.back')}
        </Button>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          icon={<CheckCircle2 className="w-5 h-5" />}
          onClick={onConfirm}
        >
          {t('smartProposal.confirm')}
        </Button>
      </div>
    </GlassCard>
  );
}

/* Reusable field row */
function FieldRow({
  label,
  value,
  type = 'text',
  onChange,
}: {
  label: string;
  value: string;
  type?: 'text' | 'number';
  onChange: (value: string) => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
      <label className="block text-sm text-dark-300 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
          text-white placeholder-dark-500 focus:outline-none focus:border-solar-500/50
          transition-colors"
      />
    </motion.div>
  );
}
