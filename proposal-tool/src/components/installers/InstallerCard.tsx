import { motion } from 'framer-motion';
import { Star, Phone, Mail, MapPin, Pencil, Trash2, Award } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useTranslation } from '../../i18n';
import type { InstallerContact } from '../../types/planner';

interface InstallerCardProps {
  installer: InstallerContact;
  onEdit: (installer: InstallerContact) => void;
  onDelete: (id: string) => void;
}

export function InstallerCard({ installer, onEdit, onDelete }: InstallerCardProps) {
  const { language } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="glass rounded-xl p-4 transition-all duration-200 hover:border-solar-400/20"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-white">{installer.name}</h4>
            {installer.qualified && (
              <Badge variant="success" size="sm">
                <Award className="w-3 h-3" />
                {language === 'he' ? 'מוסמך' : 'Qualified'}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-dark-400">
            <MapPin className="w-3 h-3" />
            {installer.location}
          </div>
        </div>

        {/* Rating */}
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3.5 h-3.5 ${
                star <= installer.rating ? 'text-amber-400 fill-amber-400' : 'text-dark-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Contact info */}
      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-2 text-xs text-dark-400">
          <Phone className="w-3 h-3 text-dark-500" />
          {installer.phone}
        </div>
        {installer.email && (
          <div className="flex items-center gap-2 text-xs text-dark-400">
            <Mail className="w-3 h-3 text-dark-500" />
            {installer.email}
          </div>
        )}
      </div>

      {/* Price & Experience */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        {installer.pricePerKwp && (
          <Badge variant="info" size="sm">
            ${installer.pricePerKwp}/kWp
          </Badge>
        )}
        <Badge variant="default" size="sm">
          {installer.experience}
        </Badge>
      </div>

      {/* Notes */}
      {installer.notes && (
        <p className="text-xs text-dark-500 mb-3 line-clamp-2">{installer.notes}</p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/5">
        <button
          onClick={() => onEdit(installer)}
          className="flex items-center gap-1.5 text-xs text-dark-400 hover:text-solar-400 transition-colors cursor-pointer"
        >
          <Pencil className="w-3 h-3" />
          {language === 'he' ? 'ערוך' : 'Edit'}
        </button>
        <button
          onClick={() => onDelete(installer.id)}
          className="flex items-center gap-1.5 text-xs text-dark-400 hover:text-rose-400 transition-colors cursor-pointer"
        >
          <Trash2 className="w-3 h-3" />
          {language === 'he' ? 'מחק' : 'Delete'}
        </button>
      </div>
    </motion.div>
  );
}
