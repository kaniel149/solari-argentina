import { useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import {
  BillUpload,
  BillProcessing,
  BillReview,
  LocationMap,
  SmartLoadingScreen,
  PremiumProposal,
} from '../components/smart-proposal';
import { ToastContainer, useToast } from '../components/ui/Toast';
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
  const { toasts, addToast, removeToast } = useToast();

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // AbortController for cancellation
  const abortControllerRef = useRef<AbortController | null>(null);

  // Handle file upload — AI analysis
  const handleFileSelected = useCallback(async (file: File) => {
    setUploadSubStep('processing');
    setErrorMessage(null);
    setIsProcessing(true);

    // Create abort controller for cancellation
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const imageResult = await compressImage(file);

      if (imageResult.error || !imageResult.data) {
        setErrorMessage(imageResult.error || 'Error al procesar el archivo.');
        addToast('error', imageResult.error || 'Error al procesar el archivo.');
        setUploadSubStep('upload');
        setIsProcessing(false);
        return;
      }

      setBillImage(imageResult.data);

      // Try AI analysis — pass mediaType for PDF support
      const result = await analyzeBill(imageResult.data, controller.signal, imageResult.mediaType || undefined);

      if (result.error) {
        setErrorMessage(`IA no disponible: ${result.error} Ingrese los datos manualmente.`);
        addToast('warning', 'IA no disponible — ingrese los datos manualmente.');
        setExtractedData({
          customerName: '',
          address: '',
          utility: '',
          monthlyKwh: 0,
          monthlyBillArs: 0,
          province: '',
          confidence: 0,
        });
      } else if (result.data && result.data.confidence > 0.5) {
        // Auto-detect province from utility if not set
        if (result.data.utility && !result.data.province) {
          const detected = detectProvinceFromUtility(result.data.utility);
          if (detected) result.data.province = detected;
        }
        setExtractedData(result.data);
        addToast('success', 'Factura analizada correctamente.');
      } else {
        // Low confidence — show warning
        if (result.data) {
          setExtractedData(result.data);
          addToast('warning', 'Baja confianza en el análisis. Verifique los datos.');
        } else {
          setExtractedData({
            customerName: '',
            address: '',
            utility: '',
            monthlyKwh: 0,
            monthlyBillArs: 0,
            province: '',
            confidence: 0,
          });
          addToast('warning', 'No se pudo analizar la factura. Ingrese los datos manualmente.');
        }
      }
    } catch {
      setErrorMessage('Error inesperado al procesar la factura.');
      addToast('error', 'Error inesperado. Ingrese los datos manualmente.');
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

    setIsProcessing(false);
    abortControllerRef.current = null;
    setUploadSubStep('review');
  }, [addToast]);

  // Cancel processing
  const handleCancelProcessing = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsProcessing(false);
    setUploadSubStep('upload');
    addToast('info', 'Análisis cancelado.');
  }, [addToast]);

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
    setErrorMessage(null);
    setUploadSubStep('review');
  }, []);

  // Handle bill processing animation complete
  const handleProcessingComplete = useCallback(() => {
    setUploadSubStep('review');
  }, []);

  // Handle bill data confirmed → go to location
  const handleBillConfirmed = useCallback(() => {
    // Validate kWh and ARS before proceeding
    if (extractedData.monthlyKwh <= 0 && extractedData.monthlyBillArs <= 0) {
      setErrorMessage('Ingrese el consumo mensual (kWh) o el monto de la factura (ARS).');
      addToast('error', 'Complete el consumo o monto de factura antes de continuar.');
      return;
    }
    setErrorMessage(null);
    setStep('location');
  }, [extractedData, addToast]);

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
    }).catch(() => {
      // Fallback narrative is already handled inside generateNarrative
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
    setErrorMessage(null);
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

      {/* Inline error alert */}
      <AnimatePresence>
        {errorMessage && step === 'upload' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto max-w-2xl mb-4 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-200">{errorMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

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
                  onCancel={isProcessing ? handleCancelProcessing : undefined}
                />
              )}

              {uploadSubStep === 'review' && (
                <BillReview
                  key="review"
                  data={extractedData}
                  onChange={setExtractedData}
                  onConfirm={handleBillConfirmed}
                  onBack={() => {
                    setUploadSubStep('upload');
                    setErrorMessage(null);
                  }}
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

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
