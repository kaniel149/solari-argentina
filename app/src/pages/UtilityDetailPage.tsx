import { useParams } from 'react-router-dom';
import { Zap, FileText, DollarSign, Lightbulb, AlertTriangle, Phone, Mail, Globe, MapPin } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { GlassCard, Badge, SectionHeader, InfoRow } from '../components/ui';
import { ConnectionTimeline } from '../components/utilities';
import { useTranslation, type TranslationKey } from '../i18n';
import { getUtilityGuide } from '../data/utilities';

export default function UtilityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useTranslation();
  const guide = id ? getUtilityGuide(id) : undefined;

  if (!guide) {
    return (
      <div>
        <PageHeader title={t('utilities.title')} backTo="/utilities" />
        <GlassCard>
          <div className="text-center py-12">
            <Zap className="w-12 h-12 text-dark-600 mx-auto mb-4" />
            <p className="text-dark-400 text-sm">
              {language === 'he'
                ? 'מדריך לפרובינציה זו יהיה זמין בקרוב'
                : 'Guide for this province coming soon'}
            </p>
          </div>
        </GlassCard>
      </div>
    );
  }

  const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
    active: 'success',
    limited: 'warning',
    pending: 'danger',
  };

  return (
    <div>
      <PageHeader
        title={guide.utilityName}
        subtitle={guide.province}
        backTo="/utilities"
        actions={
          <Badge variant={statusVariant[guide.netMeteringStatus]} size="md">
            {t(`utilities.status.${guide.netMeteringStatus}` as TranslationKey)}
          </Badge>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content — 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact info */}
          <GlassCard>
            <SectionHeader
              icon={<Phone className="w-5 h-5" />}
              title={language === 'he' ? 'פרטי קשר' : 'Contact Information'}
              className="mb-4"
            />
            <div className="space-y-0">
              {guide.website && (
                <InfoRow
                  icon={<Globe className="w-4 h-4" />}
                  label={language === 'he' ? 'אתר' : 'Website'}
                  value={
                    <a
                      href={guide.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-solar-400 hover:text-solar-300 transition-colors"
                    >
                      {guide.website.replace('https://', '')}
                    </a>
                  }
                />
              )}
              {guide.phone && (
                <InfoRow
                  icon={<Phone className="w-4 h-4" />}
                  label={language === 'he' ? 'טלפון' : 'Phone'}
                  value={guide.phone}
                />
              )}
              {guide.email && (
                <InfoRow
                  icon={<Mail className="w-4 h-4" />}
                  label={language === 'he' ? 'מייל' : 'Email'}
                  value={
                    <a
                      href={`mailto:${guide.email}`}
                      className="text-solar-400 hover:text-solar-300 transition-colors"
                    >
                      {guide.email}
                    </a>
                  }
                />
              )}
              {guide.address && (
                <InfoRow
                  icon={<MapPin className="w-4 h-4" />}
                  label={language === 'he' ? 'כתובת' : 'Address'}
                  value={guide.address}
                />
              )}
              <InfoRow
                icon={<Zap className="w-4 h-4" />}
                label={language === 'he' ? 'מקסימום הספק' : 'Max System Size'}
                value={`${guide.maxSystemSizeKw} kW`}
              />
            </div>
            {/* Contact tips */}
            <div className="mt-4 p-3 glass rounded-lg border-solar-500/10">
              <p className="text-xs text-dark-400 leading-relaxed">
                {language === 'he' ? guide.contactTips.he : guide.contactTips.en}
              </p>
            </div>
          </GlassCard>

          {/* Connection Process Timeline */}
          <GlassCard>
            <SectionHeader
              icon={<Zap className="w-5 h-5" />}
              title={t('utilities.connectionProcess')}
              subtitle={
                language === 'he'
                  ? 'לחצו על כל שלב לפרטים נוספים'
                  : 'Click each step for more details'
              }
              className="mb-6"
            />
            <ConnectionTimeline steps={guide.connectionProcess} />
          </GlassCard>

          {/* Required Documents */}
          <GlassCard>
            <SectionHeader
              icon={<FileText className="w-5 h-5" />}
              title={t('utilities.requiredDocs')}
              className="mb-4"
            />
            <ul className="space-y-2">
              {(language === 'he' ? guide.requiredDocuments.he : guide.requiredDocuments.en).map(
                (doc, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-dark-400">
                    <span className="w-5 h-5 rounded-md bg-solar-500/10 text-solar-400 flex items-center justify-center flex-shrink-0 text-xs font-medium mt-0.5">
                      {i + 1}
                    </span>
                    {doc}
                  </li>
                )
              )}
            </ul>
          </GlassCard>
        </div>

        {/* Sidebar — 1 col */}
        <div className="space-y-6">
          {/* Fees */}
          <GlassCard>
            <SectionHeader
              icon={<DollarSign className="w-5 h-5" />}
              title={t('utilities.fees')}
              className="mb-4"
            />
            <div className="space-y-3">
              {guide.fees.map((fee, i) => (
                <div key={i} className="glass rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-dark-300">
                      {language === 'he' ? fee.concept.he : fee.concept.en}
                    </span>
                    <span className="text-sm font-bold text-emerald-400">
                      {fee.amount}
                    </span>
                  </div>
                  {fee.notes && (
                    <p className="text-xs text-dark-500">
                      {language === 'he' ? fee.notes.he : fee.notes.en}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Tips */}
          <GlassCard variant="highlight">
            <SectionHeader
              icon={<Lightbulb className="w-5 h-5" />}
              title={t('utilities.tips')}
              className="mb-4"
            />
            <ul className="space-y-2">
              {(language === 'he' ? guide.tips.he : guide.tips.en).map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-dark-400">
                  <span className="text-amber-400 mt-0.5 flex-shrink-0">&#9733;</span>
                  {tip}
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Common Issues */}
          <GlassCard>
            <SectionHeader
              icon={<AlertTriangle className="w-5 h-5" />}
              title={t('utilities.commonIssues')}
              className="mb-4"
            />
            <ul className="space-y-2">
              {(language === 'he' ? guide.commonIssues.he : guide.commonIssues.en).map(
                (issue, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-dark-400">
                    <span className="text-rose-400 mt-0.5 flex-shrink-0">&#8226;</span>
                    {issue}
                  </li>
                )
              )}
            </ul>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
