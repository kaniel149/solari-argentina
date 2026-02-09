import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trash2, FileText, Sun } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { CostTable } from './CostTable';
import { useTranslation } from '../../i18n';
import { provinces } from '../../data/provinces';
import type { PlannerProject, ProjectStatus } from '../../types/planner';

const statusConfig: Record<ProjectStatus, { en: string; he: string; variant: 'default' | 'info' | 'warning' | 'purple' | 'success' }> = {
  planning: { en: 'Planning', he: 'תכנון', variant: 'default' },
  proposed: { en: 'Proposed', he: 'הוצע', variant: 'info' },
  approved: { en: 'Approved', he: 'אושר', variant: 'warning' },
  installing: { en: 'Installing', he: 'בהתקנה', variant: 'purple' },
  completed: { en: 'Completed', he: 'הושלם', variant: 'success' },
};

const allStatuses: ProjectStatus[] = ['planning', 'proposed', 'approved', 'installing', 'completed'];

interface ProjectListProps {
  projects: PlannerProject[];
  onUpdateProject: (project: PlannerProject) => void;
  onDeleteProject: (id: string) => void;
}

export function ProjectList({ projects, onUpdateProject, onDeleteProject }: ProjectListProps) {
  const { language } = useTranslation();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (projects.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <Sun className="w-10 h-10 text-dark-600 mx-auto mb-3" />
        <p className="text-dark-400 text-sm">
          {language === 'he' ? 'אין פרויקטים עדיין. צרו את הפרויקט הראשון!' : 'No projects yet. Create your first project!'}
        </p>
      </div>
    );
  }

  const handleStatusChange = (project: PlannerProject, newStatus: ProjectStatus) => {
    onUpdateProject({ ...project, status: newStatus, updatedAt: new Date().toISOString() });
  };

  const handleActualCostUpdate = (project: PlannerProject, category: string, value: number | undefined) => {
    onUpdateProject({
      ...project,
      actualCosts: { ...project.actualCosts, [category]: value },
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-3">
      {projects.map((project) => {
        const isExpanded = expandedId === project.id;
        const province = provinces.find((p) => p.id === project.province);
        const plannedTotal = Object.values(project.plannedCosts).reduce((a, b) => a + b, 0);
        const status = statusConfig[project.status];

        const tierLabel = language === 'he'
          ? { economy: 'חסכוני', standard: 'סטנדרט', premium: 'פרימיום' }[project.budgetTier]
          : project.budgetTier;

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl overflow-hidden"
          >
            {/* Project header */}
            <button
              onClick={() => setExpandedId(isExpanded ? null : project.id)}
              className="w-full p-4 text-start cursor-pointer hover:bg-white/2 transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-solar-400 flex-shrink-0" />
                    <h4 className="text-sm font-semibold text-white truncate">{project.customerName}</h4>
                    <Badge variant={status.variant} size="sm">{status[language]}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-dark-400">
                    <span>{province?.name || project.province}</span>
                    <span>{project.systemSizeKwp} kWp</span>
                    <span>{tierLabel}</span>
                    <span>${plannedTotal.toLocaleString()}</span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-dark-500" />
                </motion.div>
              </div>
            </button>

            {/* Expanded content */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-4 border-t border-white/5 pt-3">
                    {/* Status change */}
                    <div>
                      <label className="text-xs font-medium text-dark-400 mb-1.5 block">
                        {language === 'he' ? 'סטטוס' : 'Status'}
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {allStatuses.map((s) => {
                          const cfg = statusConfig[s];
                          return (
                            <button
                              key={s}
                              onClick={() => handleStatusChange(project, s)}
                              className={`
                                px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer
                                ${project.status === s
                                  ? 'bg-solar-500/20 border border-solar-500/40 text-solar-300'
                                  : 'bg-white/3 border border-white/5 text-dark-400 hover:text-dark-200'}
                              `}
                            >
                              {cfg[language]}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Cost table */}
                    <CostTable
                      project={project}
                      onUpdateActual={(cat, val) => handleActualCostUpdate(project, cat, val)}
                    />

                    {/* Notes */}
                    {project.notes && (
                      <div className="text-xs text-dark-400 p-3 rounded-lg bg-white/3">
                        {project.notes}
                      </div>
                    )}

                    {/* Delete */}
                    <div className="flex justify-end pt-2 border-t border-white/5">
                      <button
                        onClick={() => onDeleteProject(project.id)}
                        className="flex items-center gap-1.5 text-xs text-dark-500 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        {language === 'he' ? 'מחק פרויקט' : 'Delete Project'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
