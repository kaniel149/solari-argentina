import { Zap, Globe, TrendingUp } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { GlassCard, MetricCard, SectionHeader } from '../components/ui';
import { ProvinceSelector } from '../components/utilities';
import { useTranslation } from '../i18n';
import { utilityGuides } from '../data/utilities';
import { provinces } from '../data/provinces';

export default function UtilitiesPage() {
  const { t, language } = useTranslation();

  const activeCount = utilityGuides.filter((g) => g.netMeteringStatus === 'active').length;
  const totalProvinces = provinces.length;
  const avgMaxKw = Math.round(
    utilityGuides.reduce((sum, g) => sum + g.maxSystemSizeKw, 0) / utilityGuides.length
  );

  return (
    <div>
      <PageHeader
        title={t('utilities.title')}
        subtitle={t('utilities.subtitle')}
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <MetricCard
          icon={<Zap className="w-5 h-5" />}
          value={`${activeCount}`}
          label={language === 'he' ? 'מדריכי חיבור' : 'Connection Guides'}
          sublabel={language === 'he' ? 'חברות חשמל מכוסות' : 'utilities covered'}
        />
        <MetricCard
          icon={<Globe className="w-5 h-5" />}
          value={`${totalProvinces}`}
          label={language === 'he' ? 'פרובינציות' : 'Provinces'}
          sublabel={language === 'he' ? 'בכל רחבי ארגנטינה' : 'across Argentina'}
        />
        <MetricCard
          icon={<TrendingUp className="w-5 h-5" />}
          value={`${avgMaxKw} kW`}
          label={language === 'he' ? 'מקסימום ממוצע' : 'Avg. Max System'}
          sublabel={language === 'he' ? 'מגבלת הספק' : 'capacity limit'}
        />
      </div>

      {/* Info card */}
      <GlassCard variant="accent" className="mb-8">
        <SectionHeader
          icon={<Zap className="w-5 h-5" />}
          title={language === 'he' ? 'מדריכי חיבור לרשת' : 'Grid Connection Guides'}
          subtitle={
            language === 'he'
              ? 'בחרו פרובינציה לצפייה במדריך חיבור מפורט כולל תהליך, מסמכים, עלויות וטיפים'
              : 'Select a province to view the detailed connection guide including process, documents, costs, and tips'
          }
        />
      </GlassCard>

      {/* Province selector */}
      <ProvinceSelector />
    </div>
  );
}
