import { SearchInput } from '../ui/SearchInput';
import { useTranslation } from '../../i18n';
import type { Supplier } from '../../data/suppliers';

interface SupplierFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: Supplier['type'] | 'all';
  onTypeChange: (type: Supplier['type'] | 'all') => void;
  priceFilter: Supplier['priceRange'] | 'all';
  onPriceChange: (price: Supplier['priceRange'] | 'all') => void;
  productFilter: string;
  onProductChange: (product: string) => void;
}

const typeOptions: Array<{ value: Supplier['type'] | 'all'; label: { en: string; he: string } }> = [
  { value: 'all', label: { en: 'All', he: 'הכל' } },
  { value: 'distributor', label: { en: 'Distributor', he: 'מפיץ' } },
  { value: 'manufacturer', label: { en: 'Manufacturer', he: 'יצרן' } },
  { value: 'both', label: { en: 'Both', he: 'שניהם' } },
];

const priceOptions: Array<{ value: Supplier['priceRange'] | 'all'; label: { en: string; he: string } }> = [
  { value: 'all', label: { en: 'All Prices', he: 'כל המחירים' } },
  { value: 'economy', label: { en: '$ Economy', he: '$ אקונומי' } },
  { value: 'standard', label: { en: '$$ Standard', he: '$$ סטנדרט' } },
  { value: 'premium', label: { en: '$$$ Premium', he: '$$$ פרימיום' } },
];

const productOptions: Array<{ value: string; label: { en: string; he: string } }> = [
  { value: 'all', label: { en: 'All Products', he: 'כל המוצרים' } },
  { value: 'panels', label: { en: 'Panels', he: 'פאנלים' } },
  { value: 'inverters', label: { en: 'Inverters', he: 'אינוורטרים' } },
  { value: 'mounting', label: { en: 'Mounting', he: 'מערכות הרכבה' } },
  { value: 'batteries', label: { en: 'Batteries', he: 'סוללות' } },
  { value: 'monitoring', label: { en: 'Monitoring', he: 'ניטור' } },
];

export function SupplierFilters({
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  priceFilter,
  onPriceChange,
  productFilter,
  onProductChange,
}: SupplierFiltersProps) {
  const { language, t } = useTranslation();

  return (
    <div className="space-y-4">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder={t('common.search')}
        className="max-w-md"
      />
      <div className="flex flex-wrap gap-3">
        {/* Type filter */}
        <div className="flex gap-1 p-1 glass rounded-xl">
          {typeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onTypeChange(opt.value)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap
                ${typeFilter === opt.value
                  ? 'bg-solar-500/20 text-white border border-solar-500/30'
                  : 'text-dark-400 hover:text-dark-200'
                }
              `}
            >
              {opt.label[language]}
            </button>
          ))}
        </div>

        {/* Price filter */}
        <div className="flex gap-1 p-1 glass rounded-xl">
          {priceOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onPriceChange(opt.value)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap
                ${priceFilter === opt.value
                  ? 'bg-solar-500/20 text-white border border-solar-500/30'
                  : 'text-dark-400 hover:text-dark-200'
                }
              `}
            >
              {opt.label[language]}
            </button>
          ))}
        </div>

        {/* Product filter */}
        <div className="flex gap-1 p-1 glass rounded-xl">
          {productOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onProductChange(opt.value)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap
                ${productFilter === opt.value
                  ? 'bg-solar-500/20 text-white border border-solar-500/30'
                  : 'text-dark-400 hover:text-dark-200'
                }
              `}
            >
              {opt.label[language]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
