import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';

// Lazy load all pages for code splitting
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ProposalPage = lazy(() => import('./pages/ProposalPage'));
const AcademyPage = lazy(() => import('./pages/AcademyPage'));
const AcademyTopicPage = lazy(() => import('./pages/AcademyTopicPage'));
const ValueChainPage = lazy(() => import('./pages/ValueChainPage'));
const SuppliersPage = lazy(() => import('./pages/SuppliersPage'));
const MeetingsPage = lazy(() => import('./pages/MeetingsPage'));
const MeetingDetailPage = lazy(() => import('./pages/MeetingDetailPage'));
const UtilitiesPage = lazy(() => import('./pages/UtilitiesPage'));
const UtilityDetailPage = lazy(() => import('./pages/UtilityDetailPage'));
const LicensingPage = lazy(() => import('./pages/LicensingPage'));
const AcquisitionPage = lazy(() => import('./pages/AcquisitionPage'));
const InstallersPage = lazy(() => import('./pages/InstallersPage'));
const PlannerPage = lazy(() => import('./pages/PlannerPage'));
const SmartProposalPage = lazy(() => import('./pages/SmartProposalPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="smart-proposal" element={<SmartProposalPage />} />
        <Route path="proposal" element={<ProposalPage />} />
        <Route path="academy" element={<AcademyPage />} />
        <Route path="academy/:topicId" element={<AcademyTopicPage />} />
        <Route path="value-chain" element={<ValueChainPage />} />
        <Route path="suppliers" element={<SuppliersPage />} />
        <Route path="meetings" element={<MeetingsPage />} />
        <Route path="meetings/:type" element={<MeetingDetailPage />} />
        <Route path="utilities" element={<UtilitiesPage />} />
        <Route path="utilities/:id" element={<UtilityDetailPage />} />
        <Route path="licensing" element={<LicensingPage />} />
        <Route path="acquisition" element={<AcquisitionPage />} />
        <Route path="installers" element={<InstallersPage />} />
        <Route path="planner" element={<PlannerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
