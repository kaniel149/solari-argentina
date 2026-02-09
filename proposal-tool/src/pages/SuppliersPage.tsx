import { useState, useMemo } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { SupplierCard } from '../components/suppliers/SupplierCard';
import { SupplierFilters } from '../components/suppliers/SupplierFilters';
import { useTranslation } from '../i18n';
import { suppliers, type Supplier } from '../data/suppliers';

export default function SuppliersPage() {
  const { t } = useTranslation();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<Supplier['type'] | 'all'>('all');
  const [priceFilter, setPriceFilter] = useState<Supplier['priceRange'] | 'all'>('all');
  const [productFilter, setProductFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return suppliers.filter((s) => {
      if (typeFilter !== 'all' && s.type !== typeFilter) return false;
      if (priceFilter !== 'all' && s.priceRange !== priceFilter) return false;
      if (productFilter !== 'all' && !s.products.includes(productFilter as Supplier['products'][number])) return false;
      if (search) {
        const q = search.toLowerCase();
        const nameMatch = s.name.toLowerCase().includes(q);
        const brandMatch = s.brands.some((b) => b.toLowerCase().includes(q));
        const locationMatch = s.location.city.toLowerCase().includes(q) || s.location.province.toLowerCase().includes(q);
        if (!nameMatch && !brandMatch && !locationMatch) return false;
      }
      return true;
    });
  }, [search, typeFilter, priceFilter, productFilter]);

  return (
    <div>
      <PageHeader title={t('suppliers.title')} subtitle={t('suppliers.subtitle')} />

      <SupplierFilters
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        priceFilter={priceFilter}
        onPriceChange={setPriceFilter}
        productFilter={productFilter}
        onProductChange={setProductFilter}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((supplier, i) => (
          <SupplierCard
            key={supplier.id}
            supplier={supplier}
            isExpanded={expandedId === supplier.id}
            onToggle={() => setExpandedId(expandedId === supplier.id ? null : supplier.id)}
            index={i}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center mt-6">
          <p className="text-dark-400">{t('common.none')}</p>
        </div>
      )}
    </div>
  );
}
