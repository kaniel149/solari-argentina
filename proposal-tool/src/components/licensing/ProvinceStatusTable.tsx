import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../i18n';
import { licensingInfo } from '../../data/licensing';
import { SearchInput, Badge, GlassCard } from '../ui';

export function ProvinceStatusTable() {
  const { language } = useTranslation();
  const [search, setSearch] = useState('');
  const [filterAdherence, setFilterAdherence] = useState<'all' | 'adhered' | 'pending'>('all');

  const filtered = useMemo(() => {
    let items = licensingInfo.provincialStatus;

    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (p) =>
          p.province.toLowerCase().includes(q) ||
          (p.localLaw && p.localLaw.toLowerCase().includes(q))
      );
    }

    if (filterAdherence === 'adhered') {
      items = items.filter((p) => p.hasAdherence);
    } else if (filterAdherence === 'pending') {
      items = items.filter((p) => !p.hasAdherence);
    }

    return items;
  }, [search, filterAdherence]);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={language === 'he' ? 'חיפוש פרובינציה...' : 'Search province...'}
          className="flex-1"
        />
        <div className="flex gap-1 p-1 glass rounded-xl">
          {(['all', 'adhered', 'pending'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterAdherence(filter)}
              className={`
                px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer
                ${filterAdherence === filter
                  ? 'bg-solar-500/20 text-white border border-solar-500/30'
                  : 'text-dark-400 hover:text-dark-200'
                }
              `}
            >
              {filter === 'all'
                ? language === 'he' ? 'הכל' : 'All'
                : filter === 'adhered'
                  ? language === 'he' ? 'מצטרפות' : 'Adhered'
                  : language === 'he' ? 'ממתינות' : 'Pending'
              }
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="flex gap-3 text-xs text-dark-400">
        <span>
          {language === 'he' ? 'מצטרפות:' : 'Adhered:'}{' '}
          <span className="text-emerald-400 font-medium">
            {licensingInfo.provincialStatus.filter((p) => p.hasAdherence).length}
          </span>
        </span>
        <span>
          {language === 'he' ? 'ממתינות:' : 'Pending:'}{' '}
          <span className="text-rose-400 font-medium">
            {licensingInfo.provincialStatus.filter((p) => !p.hasAdherence).length}
          </span>
        </span>
      </div>

      {/* Table */}
      <div className="space-y-2">
        {filtered.map((province, index) => (
          <motion.div
            key={province.provinceId}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02, duration: 0.2 }}
          >
            <GlassCard className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                {/* Province name + badge */}
                <div className="flex items-center gap-3 sm:w-48 flex-shrink-0">
                  <h4 className="font-medium text-white text-sm">{province.province}</h4>
                  <Badge
                    variant={province.hasAdherence ? 'success' : 'danger'}
                    size="sm"
                  >
                    {province.hasAdherence
                      ? language === 'he' ? 'מצטרפת' : 'Adhered'
                      : language === 'he' ? 'ממתינה' : 'Pending'
                    }
                  </Badge>
                </div>

                {/* Local law */}
                <div className="sm:w-32 flex-shrink-0">
                  {province.localLaw ? (
                    <span className="text-xs text-solar-400 font-mono">{province.localLaw}</span>
                  ) : (
                    <span className="text-xs text-dark-600">—</span>
                  )}
                </div>

                {/* Status */}
                <div className="flex-1">
                  <p className="text-xs text-dark-400">
                    {language === 'he' ? province.status.he : province.status.en}
                  </p>
                  {province.notes && (
                    <p className="text-xs text-dark-500 mt-1">
                      {language === 'he' ? province.notes.he : province.notes.en}
                    </p>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-dark-400 text-center py-8 text-sm">
          {language === 'he' ? 'לא נמצאו תוצאות' : 'No results found'}
        </p>
      )}
    </div>
  );
}
