import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StepIndicator } from '../components/ui/StepIndicator';
import { LocationStep } from '../components/input/LocationStep';
import { ConsumptionStep } from '../components/input/ConsumptionStep';
import { PropertyStep } from '../components/input/PropertyStep';
import { PreferencesStep } from '../components/input/PreferencesStep';
import { LoadingScreen } from '../components/LoadingScreen';
import { ProposalView } from '../components/proposal/ProposalView';
import { provinces } from '../data/provinces';
import {
  estimateConsumption,
  designSystem,
  calculateProduction,
  calculateFinancials,
  calculateEnvironmental,
  getExchangeRate,
} from '../utils/calculations';
import type { Step, Proposal, CustomerInput } from '../types';

const formSteps: { key: Step; label: string; icon: string }[] = [
  { key: 'location', label: 'Ubicaci\u00f3n', icon: '\ud83d\udccd' },
  { key: 'consumption', label: 'Consumo', icon: '\u26a1' },
  { key: 'property', label: 'Propiedad', icon: '\ud83c\udfd7\ufe0f' },
  { key: 'preferences', label: 'Preferencias', icon: '\u2699\ufe0f' },
];

export default function ProposalPage() {
  const [step, setStep] = useState<Step>('location');
  const [proposal, setProposal] = useState<Proposal | null>(null);

  // Form state
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [monthlyBill, setMonthlyBill] = useState(0);
  const [systemType, setSystemType] = useState<'residential' | 'commercial'>('residential');
  const [roofType, setRoofType] = useState<'tile' | 'metal' | 'concrete' | 'flat'>('concrete');
  const [roofOrientation, setRoofOrientation] = useState<'north' | 'northeast' | 'northwest' | 'east' | 'west'>('north');
  const [budgetTier, setBudgetTier] = useState<'economy' | 'standard' | 'premium'>('standard');
  const [financingPreference, setFinancingPreference] = useState<'cash' | 'financing' | 'undecided'>('undecided');
  const [customerName, setCustomerName] = useState('');

  const generateProposal = useCallback(() => {
    const prov = provinces.find((p) => p.id === province);
    if (!prov) return;

    const exchangeRate = getExchangeRate();
    const monthlyKwh = estimateConsumption(monthlyBill, prov, systemType);

    const input: CustomerInput = {
      province,
      city,
      monthlyBillArs: monthlyBill,
      monthlyConsumptionKwh: monthlyKwh,
      systemType,
      roofType,
      roofOrientation,
      budgetTier,
      financingPreference,
      customerName,
    };

    const system = designSystem(monthlyKwh, prov, input);
    const production = calculateProduction(system, prov, roofOrientation, monthlyKwh);
    const financial = calculateFinancials(system, production, prov, input);
    const environmental = calculateEnvironmental(production);

    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 30);

    const newProposal: Proposal = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      customerInput: input,
      province: prov,
      system,
      production,
      financial,
      environmental,
      exchangeRate,
      validUntil: validUntil.toLocaleDateString('es-AR'),
    };

    setProposal(newProposal);
  }, [province, city, monthlyBill, systemType, roofType, roofOrientation, budgetTier, financingPreference, customerName]);

  const handleGenerate = () => {
    generateProposal();
    setStep('loading');
  };

  const handleLoadingComplete = () => {
    setStep('proposal');
  };

  const handleRestart = () => {
    setStep('location');
    setProposal(null);
    setProvince('');
    setCity('');
    setMonthlyBill(0);
    setCustomerName('');
  };

  return (
    <div>
      {step !== 'loading' && step !== 'proposal' && (
        <StepIndicator currentStep={step} steps={formSteps} />
      )}

      <AnimatePresence mode="wait">
        {step === 'location' && (
          <LocationStep
            key="location"
            selectedProvince={province}
            city={city}
            onProvinceChange={setProvince}
            onCityChange={setCity}
            onNext={() => setStep('consumption')}
          />
        )}

        {step === 'consumption' && (
          <ConsumptionStep
            key="consumption"
            provinceId={province}
            monthlyBill={monthlyBill}
            systemType={systemType}
            onBillChange={setMonthlyBill}
            onSystemTypeChange={setSystemType}
            onNext={() => setStep('property')}
            onBack={() => setStep('location')}
          />
        )}

        {step === 'property' && (
          <PropertyStep
            key="property"
            roofType={roofType}
            roofOrientation={roofOrientation}
            onRoofTypeChange={setRoofType}
            onOrientationChange={setRoofOrientation}
            onNext={() => setStep('preferences')}
            onBack={() => setStep('consumption')}
          />
        )}

        {step === 'preferences' && (
          <PreferencesStep
            key="preferences"
            budgetTier={budgetTier}
            financingPreference={financingPreference}
            customerName={customerName}
            onTierChange={setBudgetTier}
            onFinancingChange={setFinancingPreference}
            onNameChange={setCustomerName}
            onGenerate={handleGenerate}
            onBack={() => setStep('property')}
          />
        )}

        {step === 'loading' && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}

        {step === 'proposal' && proposal && (
          <ProposalView
            key="proposal"
            proposal={proposal}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
