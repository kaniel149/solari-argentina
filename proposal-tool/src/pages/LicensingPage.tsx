import { useState } from 'react';
import { Scale, Shield, Globe, ClipboardCheck } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Tabs } from '../components/ui';
import { LicensingOverview, PermitChecklist, ProvinceStatusTable } from '../components/licensing';
import { useTranslation } from '../i18n';

export default function LicensingPage() {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    {
      id: 'overview',
      label: language === 'he' ? 'סקירה' : 'Overview',
      icon: <Scale className="w-4 h-4" />,
    },
    {
      id: 'permits',
      label: language === 'he' ? 'היתרים' : 'Permits',
      icon: <Shield className="w-4 h-4" />,
    },
    {
      id: 'provincial',
      label: language === 'he' ? 'סטטוס פרובינציאלי' : 'Provincial Status',
      icon: <Globe className="w-4 h-4" />,
    },
    {
      id: 'checklist',
      label: language === 'he' ? 'רשימת בדיקה' : 'Checklist',
      icon: <ClipboardCheck className="w-4 h-4" />,
    },
  ];

  return (
    <div>
      <PageHeader
        title={t('licensing.title')}
        subtitle={t('licensing.subtitle')}
      />

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-8"
      />

      {activeTab === 'overview' && <LicensingOverview />}
      {activeTab === 'permits' && <LicensingOverview />}
      {activeTab === 'provincial' && <ProvinceStatusTable />}
      {activeTab === 'checklist' && <PermitChecklist />}
    </div>
  );
}
