import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, FileText, X, ChevronRight } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { useTranslation } from '../../i18n';
import { getImagePreviewUrl, isPdfFile } from '../../utils/imageUtils';
import { fadeIn, fadeUp, scaleIn, transition } from '../../utils/animations';

interface BillUploadProps {
  onFileSelected: (file: File) => void;
  onManualEntry: (data: { customerName: string; utility: string; monthlyBillArs: number; monthlyKwh: number }) => void;
}

export function BillUpload({ onFileSelected, onManualEntry }: BillUploadProps) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showManual, setShowManual] = useState(false);
  const [manual, setManual] = useState({
    customerName: '',
    utility: '',
    monthlyBillArs: 0,
    monthlyKwh: 0,
  });

  const [isPdf, setIsPdf] = useState(false);

  const handleFile = useCallback((file: File) => {
    setSelectedFile(file);
    const pdf = isPdfFile(file);
    setIsPdf(pdf);
    setPreview(pdf ? 'pdf' : getImagePreviewUrl(file));
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const clearFile = useCallback(() => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleManualSubmit = useCallback(() => {
    if (manual.customerName && manual.monthlyBillArs > 0) {
      onManualEntry(manual);
    }
  }, [manual, onManualEntry]);

  return (
    <GlassCard
      variant="accent"
      {...fadeUp}
      transition={transition.slow}
      className="max-w-lg mx-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white mb-1">
          {t('smartProposal.uploadBill')}
        </h2>
        <p className="text-dark-400 text-sm">
          {t('smartProposal.dragDrop')}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!showManual ? (
          <motion.div
            key="upload"
            {...fadeIn}
          >
            {/* Drop zone */}
            {!preview ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative border-2 border-dashed rounded-2xl p-10
                  flex flex-col items-center justify-center gap-4
                  cursor-pointer transition-all duration-300
                  ${dragActive
                    ? 'border-solar-400 bg-solar-500/10'
                    : 'border-solar-500/30 hover:border-solar-400/50 hover:bg-white/[0.02]'
                  }
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf,application/pdf"
                  capture="environment"
                  onChange={handleInputChange}
                  className="hidden"
                />

                <motion.div
                  animate={dragActive ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-solar-500/15 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-solar-400" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-emerald-400" />
                  </div>
                </motion.div>

                <div className="text-center">
                  <p className="text-white/70 text-sm">
                    {t('smartProposal.dragDrop')}
                  </p>
                  <p className="text-dark-500 text-xs mt-1">JPG, PNG, HEIC, PDF</p>
                </div>
              </div>
            ) : (
              /* Preview */
              <motion.div
                {...scaleIn}
                className="relative rounded-2xl overflow-hidden border border-white/10"
              >
                {isPdf ? (
                  <div className="w-full h-48 bg-black/30 flex flex-col items-center justify-center gap-3">
                    <FileText className="w-12 h-12 text-rose-400" />
                    <p className="text-white/70 text-sm font-medium">{selectedFile?.name}</p>
                    <p className="text-dark-500 text-xs">PDF • {selectedFile ? Math.round(selectedFile.size / 1024) + ' KB' : ''}</p>
                  </div>
                ) : (
                  <img
                    src={preview!}
                    alt="Bill preview"
                    className="w-full max-h-64 object-contain bg-black/30"
                  />
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); clearFile(); }}
                  className="absolute top-2 end-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm
                    flex items-center justify-center text-white/70 hover:text-white
                    transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3">
              {selectedFile && (
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<ChevronRight className="w-5 h-5" />}
                  onClick={() => onFileSelected(selectedFile)}
                >
                  {t('smartProposal.analyzing')}
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                fullWidth
                onClick={() => setShowManual(true)}
              >
                {t('smartProposal.manualEntry')}
              </Button>
            </div>
          </motion.div>
        ) : (
          /* Manual entry form */
          <motion.div
            key="manual"
            {...fadeIn}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm text-dark-300 mb-1">
                {t('smartProposal.customerName')}
              </label>
              <input
                type="text"
                value={manual.customerName}
                onChange={(e) => setManual((p) => ({ ...p, customerName: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                  text-white placeholder-dark-500 focus:outline-none focus:border-solar-500/50
                  transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-dark-300 mb-1">
                {t('smartProposal.utility')}
              </label>
              <input
                type="text"
                value={manual.utility}
                onChange={(e) => setManual((p) => ({ ...p, utility: e.target.value }))}
                placeholder="EDENOR, EDESUR, EPEC..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                  text-white placeholder-dark-500 focus:outline-none focus:border-solar-500/50
                  transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-dark-300 mb-1">
                  {t('smartProposal.monthlyBill')} (ARS)
                </label>
                <input
                  type="number"
                  value={manual.monthlyBillArs || ''}
                  onChange={(e) => setManual((p) => ({ ...p, monthlyBillArs: Number(e.target.value) }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                    text-white placeholder-dark-500 focus:outline-none focus:border-solar-500/50
                    transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-dark-300 mb-1">
                  {t('smartProposal.consumption')} (kWh)
                </label>
                <input
                  type="number"
                  value={manual.monthlyKwh || ''}
                  onChange={(e) => setManual((p) => ({ ...p, monthlyKwh: Number(e.target.value) }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                    text-white placeholder-dark-500 focus:outline-none focus:border-solar-500/50
                    transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="ghost"
                size="md"
                onClick={() => setShowManual(false)}
              >
                {t('common.back')}
              </Button>
              <Button
                variant="primary"
                size="md"
                fullWidth
                disabled={!manual.customerName || manual.monthlyBillArs <= 0}
                onClick={handleManualSubmit}
              >
                {t('smartProposal.confirm')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
