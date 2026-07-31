import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Image, AlertTriangle, CheckCircle2, Shield, Leaf,
  ArrowRight, RefreshCw, Sparkles, FileWarning, XCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cropDetectionResult } from '../data/mockData';

export default function CropDetection() {
  const [step, setStep] = useState('upload'); // upload | analyzing | result
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileRef = useRef(null);
  const { language, t } = useLanguage();

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      setStep('analyzing');
      // Simulate AI analysis
      setTimeout(() => setStep('result'), 2500);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleReset = () => {
    setStep('upload');
    setPreview(null);
  };

  const result = cropDetectionResult;

  return (
    <div className="min-h-screen bg-[#f8faf8] dark:bg-[#0a120a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f5e9] dark:bg-[#2e7d32]/20 text-[#2e7d32] dark:text-[#81c784] text-sm font-medium mb-4">
            <Sparkles size={14} />
            <span>AI-Powered</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1a1a2e] dark:text-white mb-2">
            {t('cropDetection.title')}
          </h1>
          <p className="text-[#64748b] dark:text-[#94a3b8] max-w-xl mx-auto">
            {t('cropDetection.subtitle')}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ======= UPLOAD STEP ======= */}
          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-xl mx-auto"
            >
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={`relative p-12 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
                  dragActive
                    ? 'border-[#4caf50] bg-[#e8f5e9]/50 dark:bg-[#2e7d32]/10'
                    : 'border-gray-200 dark:border-[#2d4a2d] bg-white dark:bg-[#1a2e1a] hover:border-[#4caf50]/50'
                }`}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                  className="hidden"
                />
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#e8f5e9] dark:bg-[#2e7d32]/20 flex items-center justify-center mx-auto mb-4">
                    <Upload size={28} className="text-[#2e7d32] dark:text-[#81c784]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a1a2e] dark:text-white mb-1">
                    {t('cropDetection.uploadTitle')}
                  </h3>
                  <p className="text-sm text-[#64748b] dark:text-[#94a3b8] mb-3">
                    {t('cropDetection.uploadDesc')}
                  </p>
                  <p className="text-xs text-[#94a3b8]">
                    {t('cropDetection.supportedFormats')}
                  </p>
                </div>
              </div>

              {/* Sample images hint */}
              <p className="text-center text-xs text-[#94a3b8] mt-4 italic">
                💡 {language === 'bn' ? 'যেকোনো ছবি আপলোড করুন — ডেমো ফলাফল দেখানো হবে' : 'Upload any image — demo results will be shown'}
              </p>
            </motion.div>
          )}

          {/* ======= ANALYZING STEP ======= */}
          {step === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-xl mx-auto"
            >
              <div className="p-8 rounded-2xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d] text-center">
                {/* Preview */}
                {preview && (
                  <div className="w-48 h-48 mx-auto mb-6 rounded-xl overflow-hidden border-2 border-[#4caf50]/30">
                    <img src={preview} alt="Uploaded crop" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Loading animation */}
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="w-16 h-16 border-4 border-[#e8f5e9] dark:border-[#2d4a2d] rounded-full" />
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#4caf50] rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Leaf size={20} className="text-[#4caf50]" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-[#1a1a2e] dark:text-white mb-1">
                  {t('cropDetection.analyzing')}
                </h3>
                <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
                  {t('cropDetection.analyzingDesc')}
                </p>

                {/* Progress dots */}
                <div className="flex items-center justify-center gap-1.5 mt-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 rounded-full bg-[#4caf50]"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ======= RESULT STEP ======= */}
          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Disclaimer Banner */}
              <div className="mb-6 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-start gap-3">
                <FileWarning size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  {t('cropDetection.disclaimer')}
                </p>
              </div>

              <div className="grid md:grid-cols-5 gap-6">
                {/* Left - Image & Detection */}
                <div className="md:col-span-2">
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d]">
                    {preview && (
                      <div className="rounded-xl overflow-hidden mb-4 border border-gray-100 dark:border-[#2d4a2d]">
                        <img src={preview} alt="Analyzed crop" className="w-full h-48 object-cover" />
                      </div>
                    )}

                    {/* Detection badge */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#64748b] dark:text-[#94a3b8]">{t('cropDetection.disease')}</span>
                        <span className="badge badge-danger">{language === 'bn' ? 'রোগ সনাক্ত' : 'Detected'}</span>
                      </div>
                      <p className="text-lg font-bold text-[#1a1a2e] dark:text-white">
                        {language === 'bn' ? result.diseaseBn : result.disease}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#64748b] dark:text-[#94a3b8]">{t('cropDetection.confidence')}</span>
                        <span className="text-lg font-bold text-[#2e7d32] dark:text-[#81c784]">{result.confidence}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-[#2d4a2d] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full rounded-full bg-gradient-to-r from-[#2e7d32] to-[#4caf50]"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#64748b] dark:text-[#94a3b8]">{t('cropDetection.severity')}</span>
                        <span className="badge badge-warning">{language === 'bn' ? result.severityBn : result.severity}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - Treatment & Prevention */}
                <div className="md:col-span-3 space-y-4">
                  {/* Treatment */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d]">
                    <h3 className="text-base font-semibold text-[#1a1a2e] dark:text-white mb-3 flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-[#4caf50]" />
                      {t('cropDetection.treatment')}
                    </h3>
                    <div className="space-y-2.5">
                      {(language === 'bn' ? result.treatmentBn : result.treatment).map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-500/5 border border-green-100 dark:border-green-500/10"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#4caf50] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-sm text-[#1a1a2e] dark:text-[#e8f5e9]">{item}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Prevention */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d]">
                    <h3 className="text-base font-semibold text-[#1a1a2e] dark:text-white mb-3 flex items-center gap-2">
                      <Shield size={18} className="text-[#1565c0]" />
                      {t('cropDetection.prevention')}
                    </h3>
                    <div className="space-y-2">
                      {(language === 'bn' ? result.preventionBn : result.prevention).map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          className="flex items-start gap-2.5"
                        >
                          <CheckCircle2 size={16} className="text-[#1565c0] mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">{item}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Try Another */}
                  <button
                    onClick={handleReset}
                    className="btn-primary w-full justify-center !py-3"
                  >
                    <RefreshCw size={16} />
                    {t('cropDetection.tryAnother')}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
