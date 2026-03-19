import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Star, Save } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTranslation } from '../../i18n';
import type { InstallerContact } from '../../types/planner';

interface InstallerFormProps {
  installer?: InstallerContact | null;
  onSave: (installer: InstallerContact) => void;
  onClose: () => void;
}

export function InstallerForm({ installer, onSave, onClose }: InstallerFormProps) {
  const { language } = useTranslation();
  const isEdit = !!installer;

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    experience: '',
    pricePerKwp: '',
    notes: '',
    rating: 3,
  });

  useEffect(() => {
    if (installer) {
      setForm({
        name: installer.name,
        phone: installer.phone,
        email: installer.email || '',
        location: installer.location,
        experience: installer.experience,
        pricePerKwp: installer.pricePerKwp?.toString() || '',
        notes: installer.notes,
        rating: installer.rating,
      });
    }
  }, [installer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.location.trim()) return;

    const contact: InstallerContact = {
      id: installer?.id || crypto.randomUUID(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      location: form.location.trim(),
      rating: form.rating,
      experience: form.experience.trim(),
      pricePerKwp: form.pricePerKwp ? parseFloat(form.pricePerKwp) : undefined,
      notes: form.notes.trim(),
      qualified: false,
      createdAt: installer?.createdAt || new Date().toISOString(),
    };

    onSave(contact);
  };

  const inputClass = `
    w-full px-3 py-2.5 rounded-xl glass text-sm text-dark-200
    placeholder-dark-500 focus:outline-none focus:border-solar-500/40
    focus:ring-1 focus:ring-solar-500/20 transition-all
  `;

  const labelClass = 'block text-xs font-medium text-dark-300 mb-1.5';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-strong rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-white">
            {isEdit
              ? (language === 'he' ? 'עריכת מתקין' : 'Edit Installer')
              : (language === 'he' ? 'הוספת מתקין' : 'Add Installer')}
          </h3>
          <button onClick={onClose} className="text-dark-400 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className={labelClass}>{language === 'he' ? 'שם' : 'Name'} *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={language === 'he' ? 'שם המתקין' : 'Installer name'}
              className={inputClass}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className={labelClass}>{language === 'he' ? 'טלפון' : 'Phone'} *</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+54 11 1234-5678"
              className={inputClass}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>{language === 'he' ? 'אימייל' : 'Email'}</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="email@example.com"
              className={inputClass}
            />
          </div>

          {/* Location */}
          <div>
            <label className={labelClass}>{language === 'he' ? 'מיקום' : 'Location'} *</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder={language === 'he' ? 'עיר / מחוז' : 'City / Province'}
              className={inputClass}
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className={labelClass}>{language === 'he' ? 'ניסיון' : 'Experience'}</label>
            <input
              type="text"
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
              placeholder={language === 'he' ? 'למשל: 10 שנים, 50 התקנות' : 'e.g. 10 years, 50 installations'}
              className={inputClass}
            />
          </div>

          {/* Price per kWp */}
          <div>
            <label className={labelClass}>{language === 'he' ? 'מחיר ל-kWp (USD)' : 'Price per kWp (USD)'}</label>
            <input
              type="number"
              value={form.pricePerKwp}
              onChange={(e) => setForm({ ...form, pricePerKwp: e.target.value })}
              placeholder="250"
              min="0"
              step="10"
              className={inputClass}
            />
          </div>

          {/* Rating */}
          <div>
            <label className={labelClass}>{language === 'he' ? 'דירוג' : 'Rating'}</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm({ ...form, rating: star })}
                  className="cursor-pointer p-1"
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      star <= form.rating ? 'text-amber-400 fill-amber-400' : 'text-dark-700 hover:text-dark-500'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className={labelClass}>{language === 'he' ? 'הערות' : 'Notes'}</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder={language === 'he' ? 'הערות נוספות...' : 'Additional notes...'}
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button type="submit" icon={<Save className="w-4 h-4" />} fullWidth>
              {isEdit
                ? (language === 'he' ? 'עדכון' : 'Update')
                : (language === 'he' ? 'שמירה' : 'Save')}
            </Button>
            <Button variant="ghost" onClick={onClose} type="button">
              {language === 'he' ? 'ביטול' : 'Cancel'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
