import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PageHeader } from '../components/layout/PageHeader';
import {
  BillUpload,
  BillProcessing,
  BillReview,
  LocationMap,
  SmartLoadingScreen,
  PremiumProposal,
} from '../components/smart-proposal';
import { provinces } from '../data/provinces';
import { detectProvinceFromUtility } from '../data/utilityMapping';
import { analyzeBill } from '../services/billAnalysisService';
import { generateNarrative } from '../services/narrativeService';
import { compressImage } from '../utils/imageUtils';
import { exportProposalToPdf } from '../utils/pdfExporter';
import {
  estimateConsumption,
  designSystem,
  calculateProduction,
  calculateFinancials,
  calculateEnvironmental,
  getExchangeRate,
} from '../utils/calculations';
import { useTranslation } from '../i18n';
import type { SmartStep, SmartProposal, BillExtractionResult, CustomerInput } from '../types';

type SubStep = 'upload' | 'processing' | 'review';

export default function SmartProposalPage() {
  const { t } = useTranslation();

  // Step state
  const [step, setStep] = useState<SmartStep>('upload');
  const [uploadSubStep, setUploadSubStep] = useState<SubStep>('upload');

  // Data state
  const [billImage, setBillImage] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<BillExtractionResult>({
    customerName: '',
    address: '',
    utility: '',
    monthlyKwh: 0,
    monthlyBillArs: 0,
    province: '',
    confidence: 0,
  });
  const [proposal, setProposal] = useState<SmartProposal | null>(null);

  // Handle file upload — AI analysis
  const handleFileSelected = useCallback(async (file: File) => {
    setUploadSubStep('processing');

    try {
      const base64 = await compressImage(file);
      setBillImage(base64);

      // Try AI analysis
      const result = await analyzeBill(base64);

      if (result && result.confidence > 0.2) {
        // Auto-detect province from utility if not set
        if (result.utility && !result.province) {
          const detected = detectProvinceFromUtility(result.utility);
          if (detected) result.province = detected;
        }
        setExtractedData(result);
      } else {
        // AI failed — go straight to manual entry with empty form
        setExtractedData({
          customerName: '',
          address: '',
          utility: '',
          monthlyKwh: 0,
          monthlyBillArs: 0,
          province: '',
          confidence: 0,
        });
      }
    } catch {
      // On any error, just go to review with empty data
      setExtractedData({
        customerName: '',
        address: '',
        utility: '',
        monthlyKwh: 0,
        monthlyBillArs: 0,
        province: '',
        confidence: 0,
      });
    }

    setUploadSubStep('review');
  }, []);

  // Handle manual entry
  const handleManualEntry = useCallback((data: {
    customerName: string;
    utility: string;
    monthlyBillArs: number;
    monthlyKwh: number;
  }) => {
    const detectedProvince = data.utility ? detectProvinceFromUtility(data.utility) : null;

    setExtractedData({
      customerName: data.customerName,
      address: '',
      utility: data.utility,
      monthlyKwh: data.monthlyKwh,
      monthlyBillArs: data.monthlyBillArs,
      province: detectedProvince || '',
      confidence: 1, // manual = full confidence
    });
    setUploadSubStep('review');
  }, []);

  // Handle bill processing animation complete
  const handleProcessingComplete = useCallback(() => {
    setUploadSubStep('review');
  }, []);

  // Handle bill data confirmed → go to location
  const handleBillConfirmed = useCallback(() => {
    setStep('location');
  }, []);

  // Handle location submitted → generate proposal
  const handleLocationSubmit = useCallback((locationData: {
    lat: number;
    lng: number;
    province: string;
    roofType: 'tile' | 'metal' | 'concrete' | 'flat';
    orientation: 'north' | 'northeast' | 'northwest' | 'east' | 'west';
    budgetTier: 'economy' | 'standard' | 'premium';
  }) => {
    // Determine province — prefer location-detected, fallback to bill-detected
    const provinceId = locationData.province || extractedData.province;
    const prov = provinces.find((p) => p.id === provinceId);

    if (!prov) {
      alert('No se pudo detectar la provincia. Por favor, seleccione una ubicación en Argentina.');
      return;
    }

    const exchangeRate = getExchangeRate();
    const monthlyKwh = extractedData.monthlyKwh ||
      estimateConsumption(extractedData.monthlyBillArs, prov, 'residential');

    const input: CustomerInput = {
      province: provinceId,
      city: extractedData.address || '',
      monthlyBillArs: extractedData.monthlyBillArs,
      monthlyConsumptionKwh: monthlyKwh,
      systemType: 'residential',
      roofType: locationData.roofType,
      roofOrientation: locationData.orientation,
      budgetTier: locationData.budgetTier,
      financingPreference: 'undecided',
      customerName: extractedData.customerName,
    };

    const system = designSystem(monthlyKwh, prov, input);
    const production = calculateProduction(system, prov, locationData.orientation, monthlyKwh);
    const financial = calculateFinancials(system, production, prov, input);
    const environmental = calculateEnvironmental(production);

    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 30);

    const smartProposal: SmartProposal = {
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
      // Smart Proposal extras
      billImage: billImage || undefined,
      coordinates: { lat: locationData.lat, lng: locationData.lng },
      extractedBill: extractedData,
    };

    setProposal(smartProposal);
    setStep('loading');

    // Generate AI narrative in background
    generateNarrative(smartProposal).then((narrative) => {
      setProposal((prev) => prev ? { ...prev, aiNarrative: narrative } : prev);
    });
  }, [extractedData, billImage]);

  // Handle loading complete → show proposal
  const handleLoadingComplete = useCallback(() => {
    setStep('proposal');
  }, []);

  // Handle restart
  const handleRestart = useCallback(() => {
    setStep('upload');
    setUploadSubStep('upload');
    setBillImage(null);
    setExtractedData({
      customerName: '',
      address: '',
      utility: '',
      monthlyKwh: 0,
      monthlyBillArs: 0,
      province: '',
      confidence: 0,
    });
    setProposal(null);
  }, []);

  // Handle PDF download
  const handleDownloadPdf = useCallback(() => {
    exportProposalToPdf(
      'premium-proposal',
      extractedData.customerName || 'cliente'
    );
  }, [extractedData.customerName]);

  return (
    <div>
      {step !== 'loading' && step !== 'proposal' && (
        <PageHeader
          title={t('smartProposal.title')}
          subtitle={t('smartProposal.subtitle')}
        />
      )}

      <AnimatePresence mode="wait">
        {/* Step 1: Bill Upload + Processing + Review */}
        {step === 'upload' && (
          <div key="upload-step">
            <AnimatePresence mode="wait">
              {uploadSubStep === 'upload' && (
                <BillUpload
                  key="upload"
                  onFileSelected={handleFileSelected}
                  onManualEntry={handleManualEntry}
                />
              )}

              {uploadSubStep === 'processing' && (
                <BillProcessing
                  key="processing"
                  onComplete={handleProcessingComplete}
                />
              )}

              {uploadSubStep === 'review' && (
                <BillReview
                  key="review"
                  data={extractedData}
                  onChange={setExtractedData}
                  onConfirm={handleBillConfirmed}
                  onBack={() => setUploadSubStep('upload')}
                />
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Step 2: Location + Property */}
        {step === 'location' && (
          <LocationMap
            key="location"
            initialProvince={extractedData.province}
            onSubmit={handleLocationSubmit}
            onBack={() => setStep('upload')}
          />
        )}

        {/* Step 3: Loading */}
        {step === 'loading' && (
          <SmartLoadingScreen
            key="loading"
            onComplete={handleLoadingComplete}
          />
        )}

        {/* Step 4: Premium Proposal */}
        {step === 'proposal' && proposal && (
          <PremiumProposal
            key="proposal"
            proposal={proposal}
            onRestart={handleRestart}
            onDownloadPdf={handleDownloadPdf}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
