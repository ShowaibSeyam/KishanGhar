import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Upload, AlertTriangle, CheckCircle2, Shield, PawPrint,
  ArrowRight, RefreshCw, Sparkles, FileWarning, Stethoscope, Phone, XCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { animalDetectionResult } from '../data/mockData';
import { detectionsAPI } from '../services/api';

export default function AnimalDetection() {
  const [step, setStep] = useState('upload'); // upload | analyzing | result | error
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [detectionId, setDetectionId] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [aiResult, setAiResult] = useState(null);
  const fileRef = useRef(null);
  const { language, t } = useLanguage();

  const handleFile = async (file) => {
    if (!file) return;
    setUploadError('');

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
    setStep('analyzing');

    try {
      const res = await detectionsAPI.uploadAnimal(file);
      setUploadedImageUrl(res.data.imageUrl);
      setDetectionId(res.data.id);

      if (res.data?.result) {
        const raw = res.data.result;
        setAiResult({
          disease: raw.detected,
          diseaseBn: raw.detectedBn || raw.detected,
          confidence: raw.confidence || 93,
          severity: raw.severity || 'high',
          severityBn: raw.severity === 'high' ? 'উচ্চ' : raw.severity === 'medium' ? 'মাঝারি' : 'স্বাভাবিক',
          urgency: 'Immediate Veterinary Attention',
          urgencyBn: 'জরুরি পশু চিকিৎসকের পরামর্শ প্রয়োজন',
          symptoms: [raw.description || 'Fever, blisters, reduced appetite'],
          symptomsBn: [raw.descriptionBn || 'জ্বর, মুখে ঘা, খাবারে অনীহা'],
          treatment: raw.recommendations || animalDetectionResult.treatment,
          treatmentBn: raw.recommendationsBn || animalDetectionResult.treatmentBn,
          prevention: raw.recommendations ? raw.recommendations.slice(2) : animalDetectionResult.prevention,
          preventionBn: raw.recommendationsBn ? raw.recommendationsBn.slice(2) : animalDetectionResult.preventionBn,
        });
      }

      setTimeout(() => setStep('result'), 1200);
    } catch (err) {
      setUploadError(err.message || 'Image upload failed. Please try again.');
      setStep('error');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleReset = () => {
    setStep('upload');
    setPreview(null);
    setUploadedImageUrl(null);
    setDetectionId(null);
    setUploadError('');
    setAiResult(null);
  };

  const result = aiResult || animalDetectionResult;

  return (
    <div className="min-h-screen bg-[#f8faf8] dark:bg-[#0a120a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e3f2fd] dark:bg-[#1565c0]/20 text-[#1565c0] dark:text-[#90caf9] text-sm font-medium mb-4">
            <PawPrint size={14} />
            <span>AI-Powered</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1a1a2e] dark:text-white mb-2">
            {t('animalDetection.title')}
          </h1>
          <p className="text-[#64748b] dark:text-[#94a3b8] max-w-xl mx-auto">
            {t('animalDetection.subtitle')}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Upload */}
          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-xl mx-auto"
            >
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={`relative p-12 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
                  dragActive
                    ? 'border-[#1565c0] bg-[#e3f2fd]/50 dark:bg-[#1565c0]/10'
                    : 'border-gray-200 dark:border-[#2d4a2d] bg-white dark:bg-[#1a2e1a] hover:border-[#1565c0]/50'
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
                  <div className="w-16 h-16 rounded-2xl bg-[#e3f2fd] dark:bg-[#1565c0]/20 flex items-center justify-center mx-auto mb-4">
                    <Upload size={28} className="text-[#1565c0]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a1a2e] dark:text-white mb-1">
                    {t('animalDetection.uploadTitle')}
                  </h3>
                  <p className="text-sm text-[#64748b] dark:text-[#94a3b8] mb-3">
                    {t('cropDetection.uploadDesc')}
                  </p>
                  <p className="text-xs text-[#94a3b8]">{t('cropDetection.supportedFormats')}</p>
                </div>
              </div>
              <p className="text-center text-xs text-[#94a3b8] mt-4 italic">
                💡 {language === 'bn' ? 'পশুর আক্রান্ত অঙ্গ বা লক্ষণের স্পষ্ট ছবি আপলোড করুন — AI সাথে সাথে রোগ বিশ্লেষণ করবে' : 'Upload a clear photo of the animal symptom for instant AI diagnosis'}
              </p>
            </motion.div>
          )}

          {/* Analyzing */}
          {step === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-xl mx-auto"
            >
              <div className="p-8 rounded-2xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d] text-center">
                {preview && (
                  <div className="w-48 h-48 mx-auto mb-6 rounded-xl overflow-hidden border-2 border-[#1565c0]/30">
                    <img src={preview} alt="Uploaded animal" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="w-16 h-16 border-4 border-[#e3f2fd] dark:border-[#2d4a2d] rounded-full" />
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#1565c0] rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PawPrint size={20} className="text-[#1565c0]" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a2e] dark:text-white mb-1">
                  {language === 'bn' ? 'আপনার পশু বিশ্লেষণ করা হচ্ছে...' : 'Analyzing your animal...'}
                </h3>
                <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
                  {language === 'bn' ? 'আমাদের AI পশুর স্বাস্থ্য পরীক্ষা করছে' : 'Our AI is examining the animal for health issues'}
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 rounded-full bg-[#1565c0]"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Error */}
          {step === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-xl mx-auto"
            >
              <div className="p-8 rounded-2xl bg-white dark:bg-[#1a2e1a] border border-red-100 dark:border-red-500/20 text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                  <XCircle size={32} className="text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a2e] dark:text-white mb-2">
                  Upload Failed
                </h3>
                <p className="text-sm text-red-500 mb-6">{uploadError}</p>
                <button onClick={handleReset} className="btn-primary">
                  <RefreshCw size={16} />
                  Try Again
                </button>
              </div>
            </motion.div>
          )}

          {/* Result */}
          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Disclaimer */}
              <div className="mb-6 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-start gap-3">
                <FileWarning size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-700 dark:text-amber-300">{t('animalDetection.disclaimer')}</p>
              </div>

              <div className="grid md:grid-cols-5 gap-6">
                {/* Left */}
                <div className="md:col-span-2">
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d]">
                    {preview && (
                      <div className="rounded-xl overflow-hidden mb-4 border border-gray-100 dark:border-[#2d4a2d]">
                        <img src={preview} alt="Analyzed animal" className="w-full h-48 object-cover" />
                      </div>
                    )}
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-medium text-[#64748b] dark:text-[#94a3b8]">{t('cropDetection.disease')}</span>
                        <p className="text-lg font-bold text-[#1a1a2e] dark:text-white mt-0.5">
                          {language === 'bn' ? result.diseaseBn : result.disease}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#64748b] dark:text-[#94a3b8]">{t('cropDetection.confidence')}</span>
                        <span className="text-lg font-bold text-[#1565c0]">{result.confidence}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-[#2d4a2d] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full rounded-full bg-gradient-to-r from-[#1565c0] to-[#42a5f5]"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#64748b] dark:text-[#94a3b8]">{t('cropDetection.severity')}</span>
                        <span className="badge badge-danger">{language === 'bn' ? result.severityBn : result.severity}</span>
                      </div>

                      {/* Urgency */}
                      <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
                        <div className="flex items-start gap-2">
                          <AlertTriangle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                          <p className="text-xs font-medium text-red-700 dark:text-red-300">
                            {language === 'bn' ? result.urgencyBn : result.urgency}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="md:col-span-3 space-y-4">
                  {/* Symptoms */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d]">
                    <h3 className="text-base font-semibold text-[#1a1a2e] dark:text-white mb-3">
                      🔍 {language === 'bn' ? 'সনাক্ত লক্ষণ' : 'Detected Symptoms'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(language === 'bn' ? result.symptomsBn : result.symptoms).map((s, i) => (
                        <span key={i} className="badge badge-danger">{s}</span>
                      ))}
                    </div>
                  </div>

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
                          <span className="w-5 h-5 rounded-full bg-[#4caf50] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                          <p className="text-sm text-[#1a1a2e] dark:text-[#e8f5e9]">{item}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Book Vet Button */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className="btn-primary justify-center !py-3 !bg-gradient-to-r !from-[#1565c0] !to-[#42a5f5]">
                      <Stethoscope size={16} />
                      {t('animalDetection.bookVet')}
                    </button>
                    <button onClick={handleReset} className="btn-secondary justify-center !py-3">
                      <RefreshCw size={16} />
                      {t('cropDetection.tryAnother')}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
