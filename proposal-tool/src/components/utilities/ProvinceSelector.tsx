import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { provinces, regionNames } from '../../data/provinces';
import { utilityGuides } from '../../data/utilities';
import { SearchInput, Badge, GlassCard } from '../ui';
import type { Province } from '../../types';

const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  active: 'success',
  limited: 'warning',
  pending: 'danger',
};

export function ProvinceSelector() {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredProvinces = useMemo(() => {
    if (!search) return provinces;
    const q = search.toLowerCase();
    return provinces.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.utility.toLowerCase().includes(q)
    );
  }, [search]);

  const grouped = useMemo(() => {
    const groups: Record<string, Province[]> = {};
    for (const p of filteredProvinces) {
      if (!groups[p.region]) groups[p.region] = [];
      groups[p.region].push(p);
    }
    return groups;
  }, [filteredProvinces]);

  const getUtilityStatus = (provinceId: string): 'active' | 'limited' | 'pending' => {
    const guide = utilityGuides.find((g) => g.id === provinceId);
    return guide?.netMeteringStatus ?? (provinces.find((p) => p.id === provinceId)?.hasNetMetering ? 'active' : 'pending');
  };

  const getUtilityName = (provinceId: string): string => {
    const guide = utilityGuides.find((g) => g.id === provinceId);
    return guide?.utilityName ?? provinces.find((p) => p.id === provinceId)?.utility ?? '';
  };

  const hasGuide = (provinceId: string): boolean => {
    return utilityGuides.some((g) => g.id === provinceId);
  };

  return (
    <div className="space-y-6">
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder={language === 'he' ? 'חיפוש פרובינציה או חברת חשמל...' : 'Search province or utility...'}
      />

      {Object.entries(grouped).map(([region, regionProvinces]) => (
        <div key={region}>
          <h3 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-3">
            {regionNames[region as Province['region']]}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {regionProvinces.map((province, index) => {
              const status = getUtilityStatus(province.id);
              const utilityName = getUtilityName(province.id);
              const available = hasGuide(province.id);

              return (
                <motion.div
                  key={province.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                >
                  <GlassCard
                    hover
                    className="cursor-pointer group p-4"
                    onClick={() => navigate(`/utilities/${province.id}`)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-solar-400" />
                        <h4 className="font-medium text-white text-sm">{province.name}</h4>
                      </div>
                      <Badge variant={statusVariant[status]} size="sm">
                        {t(`utilities.status.${status}` as any)}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-dark-400 mb-3">
                      <Zap className="w-3 h-3" />
                      <span>{utilityName}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-dark-500">
                        {province.solarIrradiation} kWh/m²/
                        {language === 'he' ? 'יום' : 'day'}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-solar-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {available ? (
                          <>
                            <span>{language === 'he' ? 'מדריך' : 'Guide'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </>
                        ) : (
                          <span className="text-dark-500">{t('common.comingSoon')}</span>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}

      {filteredProvinces.length === 0 && (
        <p className="text-dark-400 text-center py-8 text-sm">
          {language === 'he' ? 'לא נמצאו תוצאות' : 'No results found'}
        </p>
      )}
    </div>
  );
}
