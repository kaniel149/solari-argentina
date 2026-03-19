import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { InstallerChecklist, InstallerCard, InstallerForm } from '../components/installers';
import { useTranslation } from '../i18n';
import type { InstallerContact } from '../types/planner';

const STORAGE_KEY = 'solari-installers';

function loadInstallers(): InstallerContact[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveInstallers(installers: InstallerContact[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(installers));
  } catch {
    // localStorage full or unavailable
  }
}

export default function InstallersPage() {
  const { t, language } = useTranslation();
  const [installers, setInstallers] = useState<InstallerContact[]>(loadInstallers);
  const [showForm, setShowForm] = useState(false);
  const [editingInstaller, setEditingInstaller] = useState<InstallerContact | null>(null);

  const handleSave = useCallback((installer: InstallerContact) => {
    setInstallers((prev) => {
      const existing = prev.findIndex((i) => i.id === installer.id);
      const updated = existing >= 0
        ? prev.map((i) => i.id === installer.id ? installer : i)
        : [...prev, installer];
      saveInstallers(updated);
      return updated;
    });
    setShowForm(false);
    setEditingInstaller(null);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setInstallers((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      saveInstallers(updated);
      return updated;
    });
  }, []);

  const handleEdit = useCallback((installer: InstallerContact) => {
    setEditingInstaller(installer);
    setShowForm(true);
  }, []);

  const handleClose = useCallback(() => {
    setShowForm(false);
    setEditingInstaller(null);
  }, []);

  return (
    <div>
      <PageHeader
        title={t('installers.title')}
        subtitle={t('installers.subtitle')}
        actions={
          <Button
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => { setEditingInstaller(null); setShowForm(true); }}
          >
            {language === 'he' ? 'הוסף מתקין' : 'Add Installer'}
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Qualification Checklist */}
        <div>
          <InstallerChecklist />
        </div>

        {/* Right: Saved Installers */}
        <div>
          <h3 className="text-base font-semibold text-white mb-4">
            {language === 'he' ? `מתקינים שמורים (${installers.length})` : `Saved Installers (${installers.length})`}
          </h3>

          {installers.length > 0 ? (
            <div className="space-y-3">
              <AnimatePresence>
                {installers.map((installer) => (
                  <InstallerCard
                    key={installer.id}
                    installer={installer}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="glass rounded-2xl p-8 text-center">
              <p className="text-dark-400 text-sm mb-3">
                {language === 'he'
                  ? 'אין מתקינים שמורים. הוסיפו את המתקין הראשון!'
                  : 'No saved installers. Add your first installer!'}
              </p>
              <Button
                size="sm"
                variant="secondary"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => { setEditingInstaller(null); setShowForm(true); }}
              >
                {language === 'he' ? 'הוסף מתקין' : 'Add Installer'}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <InstallerForm
            installer={editingInstaller}
            onSave={handleSave}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
