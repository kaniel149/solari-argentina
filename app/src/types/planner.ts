// ============================================
// Solari Argentina — Planner & Installer Types
// ============================================

export interface PlannerProject {
  id: string;
  customerName: string;
  province: string;
  systemSizeKwp: number;
  budgetTier: 'economy' | 'standard' | 'premium';
  status: 'planning' | 'proposed' | 'approved' | 'installing' | 'completed';
  plannedCosts: {
    panels: number;
    inverter: number;
    mounting: number;
    cabling: number;
    protections: number;
    labor: number;
    design: number;
    permits: number;
  };
  actualCosts: {
    panels?: number;
    inverter?: number;
    mounting?: number;
    cabling?: number;
    protections?: number;
    labor?: number;
    design?: number;
    permits?: number;
  };
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface InstallerContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  rating: number;
  experience: string;
  pricePerKwp?: number;
  notes: string;
  qualified: boolean;
  createdAt: string;
}

export type ProjectStatus = PlannerProject['status'];
export type BudgetTier = PlannerProject['budgetTier'];
