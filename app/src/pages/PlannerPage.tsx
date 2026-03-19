import { useState, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, FolderKanban, DollarSign, BarChart3 } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { MetricCard } from '../components/ui/MetricCard';
import { ProjectForm, ProjectList } from '../components/planner';
import { useTranslation } from '../i18n';
import type { PlannerProject } from '../types/planner';

const STORAGE_KEY = 'solari-planner-projects';

function loadProjects(): PlannerProject[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveProjects(projects: PlannerProject[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    // localStorage full or unavailable
  }
}

export default function PlannerPage() {
  const { t, language } = useTranslation();
  const [projects, setProjects] = useState<PlannerProject[]>(loadProjects);
  const [showForm, setShowForm] = useState(false);

  const handleSave = useCallback((project: PlannerProject) => {
    setProjects((prev) => {
      const existing = prev.findIndex((p) => p.id === project.id);
      const updated = existing >= 0
        ? prev.map((p) => p.id === project.id ? project : p)
        : [...prev, project];
      saveProjects(updated);
      return updated;
    });
    setShowForm(false);
  }, []);

  const handleUpdate = useCallback((project: PlannerProject) => {
    setProjects((prev) => {
      const updated = prev.map((p) => p.id === project.id ? project : p);
      saveProjects(updated);
      return updated;
    });
  }, []);

  const handleDelete = useCallback((id: string) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveProjects(updated);
      return updated;
    });
  }, []);

  const stats = useMemo(() => {
    const totalPlannedValue = projects.reduce((sum, p) => {
      return sum + Object.values(p.plannedCosts).reduce((a, b) => a + b, 0);
    }, 0);

    const statusCounts = projects.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalKwp = projects.reduce((sum, p) => sum + p.systemSizeKwp, 0);

    return { totalPlannedValue, statusCounts, totalKwp };
  }, [projects]);

  const statusSummary = language === 'he'
    ? Object.entries(stats.statusCounts).map(([s, c]) => {
        const labels: Record<string, string> = { planning: 'תכנון', proposed: 'הוצע', approved: 'אושר', installing: 'בהתקנה', completed: 'הושלם' };
        return `${labels[s] || s}: ${c}`;
      }).join(', ')
    : Object.entries(stats.statusCounts).map(([s, c]) => `${s}: ${c}`).join(', ');

  return (
    <div>
      <PageHeader
        title={t('planner.title')}
        subtitle={t('planner.subtitle')}
        actions={
          <Button
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowForm(true)}
          >
            {language === 'he' ? 'פרויקט חדש' : 'New Project'}
          </Button>
        }
      />

      {/* Stats */}
      {projects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <MetricCard
            icon={<FolderKanban className="w-5 h-5" />}
            value={projects.length.toString()}
            label={language === 'he' ? 'פרויקטים' : 'Projects'}
            sublabel={statusSummary}
          />
          <MetricCard
            icon={<DollarSign className="w-5 h-5" />}
            value={`$${stats.totalPlannedValue.toLocaleString()}`}
            label={language === 'he' ? 'ערך מתוכנן' : 'Planned Value'}
            sublabel="USD"
          />
          <MetricCard
            icon={<BarChart3 className="w-5 h-5" />}
            value={`${stats.totalKwp} kWp`}
            label={language === 'he' ? 'הספק כולל' : 'Total Capacity'}
            sublabel={language === 'he' ? 'קילוואט שיא' : 'kilowatt peak'}
          />
        </div>
      )}

      {/* Project List */}
      <ProjectList
        projects={projects}
        onUpdateProject={handleUpdate}
        onDeleteProject={handleDelete}
      />

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <ProjectForm
            onSave={handleSave}
            onClose={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
