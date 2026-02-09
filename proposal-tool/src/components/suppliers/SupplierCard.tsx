import { motion } from 'framer-motion';
import { Star, MapPin, Truck, ChevronDown } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useTranslation } from '../../i18n';
import type { Supplier } from '../../data/suppliers';

interface SupplierCardProps {
  supplier: Supplier;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

const typeVariant: Record<Supplier['type'], { variant: 'info' | 'purple' | 'warning'; label: { en: string; he: string } }> = {
  distributor: { variant: 'info', label: { en: 'Distributor', he: 'מפיץ' } },
  manufacturer: { variant: 'purple', label: { en: 'Manufacturer', he: 'יצרן' } },
  both: { variant: 'warning', label: { en: 'Manufacturer & Distributor', he: 'יצרן ומפיץ' } },
};

const priceRangeDisplay: Record<Supplier['priceRange'], { label: string; color: string }> = {
  economy: { label: '$', color: 'text-emerald-400' },
  standard: { label: '$$', color: 'text-amber-400' },
  premium: { label: '$$$', color: 'text-rose-400' },
};

export function SupplierCard({ supplier, isExpanded, onToggle, index }: SupplierCardProps) {
  const { language } = useTranslation();
  const typeInfo = typeVariant[supplier.type];
  const priceInfo = priceRangeDisplay[supplier.priceRange];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-solar-400/30 hover:shadow-lg hover:shadow-solar-500/5"
    >
      <button
        onClick={onToggle}
        className="w-full p-5 text-start cursor-pointer"
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white truncate">{supplier.name}</h3>
            <div className="flex items-center gap-1.5 mt-1 text-sm text-dark-400">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{supplier.location.city}, {supplier.location.province}</span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-dark-500" />
          </motion.div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant={typeInfo.variant}>{typeInfo.label[language]}</Badge>
          <span className={`text-sm font-bold ${priceInfo.color}`}>{priceInfo.label}</span>
          <div className="flex items-center gap-0.5 ms-auto">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(supplier.rating) ? 'text-amber-400 fill-amber-400' : i < supplier.rating ? 'text-amber-400 fill-amber-400/50' : 'text-dark-700'}`}
              />
            ))}
            <span className="text-xs text-dark-400 ms-1">{supplier.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {supplier.brands.slice(0, 4).map((brand) => (
            <span
              key={brand}
              className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-dark-300 border border-white/5"
            >
              {brand}
            </span>
          ))}
          {supplier.brands.length > 4 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-dark-500">
              +{supplier.brands.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-dark-500">
          <div className="flex items-center gap-1">
            <Truck className="w-3 h-3" />
            <span>{supplier.deliveryDays} days</span>
          </div>
          {supplier.minOrderUsd && (
            <span>Min: ${supplier.minOrderUsd.toLocaleString()}</span>
          )}
        </div>
      </button>

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="border-t border-white/5"
        >
          <SupplierExpandedContent supplier={supplier} />
        </motion.div>
      )}
    </motion.div>
  );
}

function SupplierExpandedContent({ supplier }: { supplier: Supplier }) {
  const { language, t } = useTranslation();

  return (
    <div className="p-5 pt-4 space-y-4">
      {/* Contact */}
      <div>
        <h4 className="text-sm font-medium text-dark-300 mb-2">{t('suppliers.contact')}</h4>
        <div className="space-y-1.5 text-sm">
          {supplier.website && (
            <a
              href={supplier.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-solar-400 hover:text-solar-300 transition-colors truncate"
            >
              {supplier.website}
            </a>
          )}
          {supplier.phone && <p className="text-dark-400">{supplier.phone}</p>}
          {supplier.email && <p className="text-dark-400">{supplier.email}</p>}
        </div>
      </div>

      {/* Products */}
      <div>
        <h4 className="text-sm font-medium text-dark-300 mb-2">{t('suppliers.products')}</h4>
        <div className="flex flex-wrap gap-1.5">
          {supplier.products.map((product) => (
            <Badge key={product} variant="default" size="sm">{product}</Badge>
          ))}
        </div>
      </div>

      {/* Payment Terms */}
      <div>
        <h4 className="text-sm font-medium text-dark-300 mb-1">{t('suppliers.payment')}</h4>
        <p className="text-sm text-dark-400">{supplier.paymentTerms[language]}</p>
      </div>

      {/* Strengths */}
      <div>
        <h4 className="text-sm font-medium text-emerald-400 mb-2">{t('suppliers.strengths')}</h4>
        <ul className="space-y-1.5">
          {supplier.strengths[language].map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-dark-400">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div>
        <h4 className="text-sm font-medium text-rose-400 mb-2">{t('suppliers.weaknesses')}</h4>
        <ul className="space-y-1.5">
          {supplier.weaknesses[language].map((w, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-dark-400">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
              {w}
            </li>
          ))}
        </ul>
      </div>

      {/* Tips */}
      <div>
        <h4 className="text-sm font-medium text-amber-400 mb-2">Tips</h4>
        <ul className="space-y-1.5">
          {supplier.tips[language].map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-dark-400">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Notes */}
      <div className="glass rounded-xl p-3">
        <p className="text-sm text-dark-300 italic">{supplier.notes[language]}</p>
      </div>
    </div>
  );
}
