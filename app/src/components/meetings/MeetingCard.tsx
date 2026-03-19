import { motion } from 'framer-motion';
import { Clock, Package, Zap, Wrench, Users, Shield, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { useTranslation } from '../../i18n';
import type { MeetingGuide } from '../../data/meetings';

interface MeetingCardProps {
  meeting: MeetingGuide;
  index: number;
}

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
  Wrench: <Wrench className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  Building2: <Building2 className="w-8 h-8" />,
};

export function MeetingCard({ meeting, index }: MeetingCardProps) {
  const { language } = useTranslation();
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/meetings/${meeting.id}`)}
      className="glass rounded-2xl p-6 text-start w-full cursor-pointer transition-all duration-300 hover:border-solar-400/30 hover:shadow-lg hover:shadow-solar-500/5"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-solar-500/10 border border-solar-500/20 flex items-center justify-center text-solar-400 flex-shrink-0">
          {iconMap[meeting.icon] || <Package className="w-8 h-8" />}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-white mb-1">
            {meeting.title[language]}
          </h3>
          <p className="text-sm text-dark-400 line-clamp-2 mb-3">
            {meeting.purpose[language]}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="info" size="sm">
              <Clock className="w-3 h-3" />
              {meeting.duration}
            </Badge>
            <span className="text-xs text-dark-500">
              {meeting.agenda.length} {language === 'he' ? 'נושאים' : 'topics'}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
