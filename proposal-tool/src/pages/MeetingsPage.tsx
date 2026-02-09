import { PageHeader } from '../components/layout/PageHeader';
import { MeetingCard } from '../components/meetings/MeetingCard';
import { useTranslation } from '../i18n';
import { meetingGuides } from '../data/meetings';

export default function MeetingsPage() {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader title={t('meetings.title')} subtitle={t('meetings.subtitle')} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {meetingGuides.map((meeting, i) => (
          <MeetingCard key={meeting.id} meeting={meeting} index={i} />
        ))}
      </div>
    </div>
  );
}
