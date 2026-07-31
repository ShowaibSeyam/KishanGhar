import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Leaf, Bug, PawPrint, CloudSun, TrendingUp, Stethoscope,
  ChevronDown, ChevronUp, ArrowRight, Sparkles, Shield, Zap,
  BarChart3, Brain, Camera, Star, Check, Play
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { testimonials, faqData, stats } from '../data/mockData';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function LandingPage() {
  const { language, t } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    { icon: Leaf, color: '#2e7d32', bg: '#e8f5e9', title: t('features.cropManagement'), desc: t('features.cropManagementDesc') },
    { icon: Bug, color: '#e65100', bg: '#fff3e0', title: t('features.diseaseDetection'), desc: t('features.diseaseDetectionDesc') },
    { icon: PawPrint, color: '#1565c0', bg: '#e3f2fd', title: t('features.livestockCare'), desc: t('features.livestockCareDesc') },
    { icon: CloudSun, color: '#00838f', bg: '#e0f7fa', title: t('features.weatherIntel'), desc: t('features.weatherIntelDesc') },
    { icon: TrendingUp, color: '#6a1b9a', bg: '#f3e5f5', title: t('features.marketInsights'), desc: t('features.marketInsightsDesc') },
    { icon: Stethoscope, color: '#c62828', bg: '#fce4ec', title: t('features.vetConnect'), desc: t('features.vetConnectDesc') },
  ];

  const aiCapabilities = [
    { icon: Camera, title: language === 'bn' ? 'ছবি থেকে রোগ নির্ণয়' : 'Image-Based Diagnosis', desc: language === 'bn' ? 'ফসল বা পশুর ছবি তুলুন, AI তাৎক্ষণিক রোগ নির্ণয় করবে' : 'Snap a photo of your crop or animal, get instant AI diagnosis' },
    { icon: Brain, title: language === 'bn' ? 'স্মার্ট পরামর্শ' : 'Smart Recommendations', desc: language === 'bn' ? 'আবহাওয়া, মাটি ও বাজারের ডেটা বিশ্লেষণ করে সেরা পরামর্শ' : 'Weather, soil & market data analyzed for optimal farming advice' },
    { icon: BarChart3, title: language === 'bn' ? 'পূর্বাভাস বিশ্লেষণ' : 'Predictive Analytics', desc: language === 'bn' ? 'ফসলের ফলন, বাজার মূল্য ও রোগের ঝুঁকি পূর্বাভাস' : 'Forecast crop yields, market prices, and disease risk beforehand' },
  ];

  return (
    <div className="overflow-hidden">
      {/* ======= HERO SECTION ======= */}
      <section className="relative min-h-[90vh] flex items-center gradient-bg">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#4caf50]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#2e7d32]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-[#4caf50] rounded-full opacity-40 animate-pulse" />
          <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-[#81c784] rounded-full opacity-30 animate-pulse delay-1000" />
          <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-[#2e7d32] rounded-full opacity-40 animate-pulse delay-500" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f5e9] dark:bg-[#2e7d32]/20 text-[#2e7d32] dark:text-[#81c784] text-sm font-medium mb-6"
              >
                <Sparkles size={14} />
                <span>{language === 'bn' ? 'AI-চালিত কৃষি প্ল্যাটফর্ম' : 'AI-Powered Agriculture Platform'}</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] dark:text-white leading-[1.1] mb-6">
                {t('landing.heroTitle')}{' '}
                <span className="gradient-text">{t('landing.heroTitleHighlight')}</span>
              </h1>

              <p className="text-lg text-[#64748b] dark:text-[#94a3b8] leading-relaxed mb-8 max-w-xl">
                {t('landing.heroSubtitle')}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link to="/register" className="btn-primary !px-7 !py-3 text-base">
                  {t('landing.getStarted')}
                  <ArrowRight size={18} />
                </Link>
                <button className="btn-secondary !px-6 !py-3 text-base">
                  <Play size={16} className="fill-current" />
                  {t('landing.watchDemo')}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['👨‍🌾', '👩‍🌾', '👨‍🌾', '👩‍🌾'].map((emoji, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-[#e8f5e9] dark:bg-[#2e7d32]/30 border-2 border-white dark:border-[#0f1a0f] flex items-center justify-center text-sm">
                      {emoji}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
                  {t('landing.trustedBy')}
                </p>
              </div>
            </motion.div>

            {/* Right - Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main dashboard preview card */}
                <div className="rounded-2xl bg-white dark:bg-[#1a2e1a] border border-gray-200 dark:border-[#2d4a2d] shadow-xl overflow-hidden">
                  <div className="p-1 bg-gray-50 dark:bg-[#162016] border-b border-gray-100 dark:border-[#2d4a2d] flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <span className="ml-2 text-[10px] text-[#94a3b8]">kishanghar.ai/dashboard</span>
                  </div>
                  <div className="p-5 space-y-4">
                    {/* Mini weather card */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#e8f5e9] to-[#c8e6c9] dark:from-[#2e7d32]/20 dark:to-[#1b5e20]/20">
                      <div>
                        <p className="text-xs text-[#2e7d32] font-medium">Dhaka, Bangladesh</p>
                        <p className="text-2xl font-bold text-[#1a1a2e] dark:text-white">32°C</p>
                      </div>
                      <span className="text-4xl">⛅</span>
                    </div>
                    {/* Mini crop cards */}
                    <div className="grid grid-cols-3 gap-2">
                      {[{ name: 'Rice', emoji: '🌾', status: 'Growing' }, { name: 'Wheat', emoji: '🌾', status: 'Harvest' }, { name: 'Potato', emoji: '🥔', status: 'Alert' }].map((crop, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#162016] text-center">
                          <span className="text-2xl">{crop.emoji}</span>
                          <p className="text-xs font-medium text-[#1a1a2e] dark:text-white mt-1">{crop.name}</p>
                          <p className={`text-[10px] font-medium mt-0.5 ${crop.status === 'Alert' ? 'text-orange-500' : 'text-[#4caf50]'}`}>{crop.status}</p>
                        </div>
                      ))}
                    </div>
                    {/* Mini AI insight */}
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles size={12} className="text-blue-500" />
                        <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">AI INSIGHT</span>
                      </div>
                      <p className="text-xs text-[#1a1a2e] dark:text-white">Optimal harvest window for wheat: March 12-14</p>
                    </div>
                  </div>
                </div>

                {/* Floating cards */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -left-8 top-1/4 p-3 rounded-xl bg-white dark:bg-[#1a2e1a] shadow-lg border border-gray-100 dark:border-[#2d4a2d]"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                      <Check size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1a1a2e] dark:text-white">Disease Detected</p>
                      <p className="text-[10px] text-[#64748b]">96% confidence</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -right-4 bottom-1/4 p-3 rounded-xl bg-white dark:bg-[#1a2e1a] shadow-lg border border-gray-100 dark:border-[#2d4a2d]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🐄</span>
                    <div>
                      <p className="text-xs font-semibold text-[#1a1a2e] dark:text-white">Livestock Health</p>
                      <p className="text-[10px] text-green-500 font-medium">All Healthy ✓</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======= FEATURES SECTION ======= */}
      <section className="py-20 bg-white dark:bg-[#0f1a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] dark:text-white mb-4">
              {t('landing.featuresTitle')}
            </h2>
            <p className="text-lg text-[#64748b] dark:text-[#94a3b8] max-w-2xl mx-auto">
              {t('landing.featuresSubtitle')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d] hover:border-[#4caf50]/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: feature.bg }}
                >
                  <feature.icon size={24} style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a2e] dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-[#64748b] dark:text-[#94a3b8] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= AI SECTION ======= */}
      <section className="py-20 bg-[#f8faf8] dark:bg-[#0a120a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f5e9] dark:bg-[#2e7d32]/20 text-[#2e7d32] dark:text-[#81c784] text-sm font-medium mb-4">
              <Brain size={14} />
              <span>Artificial Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] dark:text-white mb-4">
              {t('landing.aiTitle')}
            </h2>
            <p className="text-lg text-[#64748b] dark:text-[#94a3b8] max-w-2xl mx-auto">
              {t('landing.aiSubtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {aiCapabilities.map((cap, i) => (
              <motion.div
                key={i}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative p-6 rounded-2xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d] overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#4caf50]/5 to-transparent rounded-bl-full" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2e7d32] to-[#4caf50] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <cap.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a1a2e] dark:text-white mb-2">{cap.title}</h3>
                  <p className="text-sm text-[#64748b] dark:text-[#94a3b8] leading-relaxed">{cap.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= WHY SECTION (Stats) ======= */}
      <section className="py-20 bg-white dark:bg-[#0f1a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] dark:text-white mb-4">
              {t('landing.whyTitle')}
            </h2>
            <p className="text-lg text-[#64748b] dark:text-[#94a3b8] max-w-2xl mx-auto">
              {t('landing.whySubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-[#f8faf8] dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d]"
              >
                <p className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                  {language === 'bn' ? stat.valueBn : stat.value}
                </p>
                <p className="text-sm text-[#64748b] dark:text-[#94a3b8] font-medium">
                  {language === 'bn' ? stat.labelBn : stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Benefits grid */}
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: language === 'bn' ? '১০x দ্রুত রোগ নির্ণয়' : '10x Faster Diagnosis', desc: language === 'bn' ? 'ঘন্টা নয়, সেকেন্ডে রোগ শনাক্ত করুন' : 'Detect diseases in seconds, not hours' },
              { icon: Shield, title: language === 'bn' ? 'বিশ্বস্ত ও নিরাপদ' : 'Trusted & Secure', desc: language === 'bn' ? 'আপনার ডেটা এনক্রিপ্টেড ও সুরক্ষিত' : 'Your farm data is encrypted and protected' },
              { icon: TrendingUp, title: language === 'bn' ? '৩০% বেশি আয়' : '30% More Income', desc: language === 'bn' ? 'স্মার্ট সিদ্ধান্তে আয় বৃদ্ধি করুন' : 'Boost income with smarter decisions' },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl"
              >
                <div className="w-10 h-10 rounded-lg bg-[#e8f5e9] dark:bg-[#2e7d32]/20 flex items-center justify-center flex-shrink-0">
                  <benefit.icon size={20} className="text-[#2e7d32] dark:text-[#81c784]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a1a2e] dark:text-white mb-1">{benefit.title}</h4>
                  <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= TESTIMONIALS ======= */}
      <section className="py-20 bg-[#f8faf8] dark:bg-[#0a120a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] dark:text-white mb-4">
              {t('landing.testimonialsTitle')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="p-6 rounded-2xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d] hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, j) => (
                    <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-[#64748b] dark:text-[#94a3b8] leading-relaxed mb-5 italic">
                  "{language === 'bn' ? item.textBn : item.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e8f5e9] dark:bg-[#2e7d32]/30 flex items-center justify-center text-lg">
                    {item.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a2e] dark:text-white">
                      {language === 'bn' ? item.nameBn : item.name}
                    </p>
                    <p className="text-xs text-[#94a3b8]">
                      {language === 'bn' ? item.roleBn : item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= FAQ ======= */}
      <section className="py-20 bg-white dark:bg-[#0f1a0f]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] dark:text-white mb-4">
              {t('landing.faqTitle')}
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqData.map((faq, i) => (
              <motion.div
                key={i}
                {...stagger}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="border border-gray-100 dark:border-[#2d4a2d] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-[#1a2e1a] transition-colors"
                >
                  <span className="text-sm font-semibold text-[#1a1a2e] dark:text-white pr-4">
                    {language === 'bn' ? faq.questionBn : faq.question}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp size={18} className="text-[#4caf50] flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-[#94a3b8] flex-shrink-0" />
                  )}
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm text-[#64748b] dark:text-[#94a3b8] leading-relaxed">
                    {language === 'bn' ? faq.answerBn : faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= CTA SECTION ======= */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2e7d32] via-[#388e3c] to-[#1b5e20]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white/20 rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 border border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t('landing.ctaTitle')}
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              {t('landing.ctaSubtitle')}
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#2e7d32] font-semibold rounded-full hover:bg-gray-100 hover:shadow-xl transition-all duration-300 text-base"
            >
              {t('landing.ctaButton')}
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
