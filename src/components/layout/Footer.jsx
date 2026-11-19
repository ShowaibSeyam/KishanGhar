import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Globe2, Mail, Phone, ExternalLink, X, ShieldCheck,
  FileText, Info, Sparkles, Building2, HelpCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();
  const [activeModal, setActiveModal] = useState(null);

  const modalContent = {
    about: {
      title: language === 'bn' ? 'কিষাণঘর সম্পর্কে' : 'About KishanGhar',
      icon: Building2,
      content: language === 'bn' ? (
        <div className="space-y-3 text-sm leading-relaxed text-[#1a1a2e] dark:text-[#e8f5e9]">
          <p>
            <strong>কিষাণঘর (KishanGhar)</strong> বাংলাদেশের কৃষক ও খামারিদের জন্য নির্মিত একটি আধুনিক এআই-চালিত স্মার্ট কৃষি প্ল্যাটফর্ম।
          </p>
          <p>
            আমাদের লক্ষ্য হলো উন্নত কৃত্রিম বুদ্ধিমত্তা (AI), তাৎক্ষণিক রোগ শনাক্তকরণ প্রযুক্তি, রিয়েল-টাইম লাইভ আবহাওয়া বিশ্লেষণ এবং আধুনিক খামার ব্যবস্থাপনার মাধ্যমে বাংলাদেশের কৃষকদের উৎপাদনশীলতা বৃদ্ধি করা।
          </p>
          <div className="p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-xs">
            🌱 <em>"স্মার্ট কৃষি, সমৃদ্ধ বাংলাদেশ — কৃষকের পাশে কিষাণঘর।"</em>
          </div>
        </div>
      ) : (
        <div className="space-y-3 text-sm leading-relaxed text-[#1a1a2e] dark:text-[#e8f5e9]">
          <p>
            <strong>KishanGhar</strong> is a next-generation smart agriculture platform built specifically for farmers in Bangladesh.
          </p>
          <p>
            Our mission is to empower rural agricultural communities with state-of-the-art AI diagnostics, real-time weather analytics, automated livestock records, and expert agronomy advisory.
          </p>
          <div className="p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-xs">
            🌱 <em>"Empowering Bangladeshi farmers with Intelligent Agricultural Technology."</em>
          </div>
        </div>
      ),
    },
    contact: {
      title: language === 'bn' ? 'যোগাযোগ ও জরুরি সহায়তা' : 'Contact & Emergency Support',
      icon: Phone,
      content: (
        <div className="space-y-4 text-sm text-[#1a1a2e] dark:text-[#e8f5e9]">
          <div className="p-3.5 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
            <p className="text-xs font-semibold text-[#2e7d32] dark:text-[#81c784] uppercase tracking-wider mb-1">
              {language === 'bn' ? 'সরকারি কৃষি কল সেন্টার' : 'National Agriculture Hotline'}
            </p>
            <p className="text-xl font-bold text-[#1a1a2e] dark:text-white flex items-center gap-2">
              <Phone size={18} className="text-[#2e7d32]" />
              <a href="tel:16123" className="hover:underline">16123</a>
              <span className="text-xs font-normal text-gray-500">(টোল-ফ্রি / Toll-Free)</span>
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <p className="flex items-center gap-2">
              <Mail size={15} className="text-[#2e7d32]" />
              <span>ইমেইল: <a href="mailto:support@kishanghar.com" className="font-semibold text-[#2e7d32] hover:underline">support@kishanghar.com</a></span>
            </p>
            <p className="flex items-center gap-2">
              <Globe2 size={15} className="text-[#2e7d32]" />
              <span>ওয়েবসাইট: <a href="https://moa.gov.bd/" target="_blank" rel="noreferrer" className="text-[#2e7d32] hover:underline">moa.gov.bd</a> (কৃষি মন্ত্রণালয়)</span>
            </p>
          </div>
        </div>
      ),
    },
    privacy: {
      title: language === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy',
      icon: ShieldCheck,
      content: language === 'bn' ? (
        <div className="space-y-2.5 text-xs leading-relaxed text-[#1a1a2e] dark:text-[#e8f5e9]">
          <p>
            ১. <strong>তথ্য সুরক্ষা:</strong> কিষাণঘর ব্যবহারকারীদের ব্যক্তিগত তথ্য সুরক্ষিত ক্লাউড এনক্রিপশনের মাধ্যমে সংরক্ষণ করে।
          </p>
          <p>
            ২. <strong>ছবি ব্যবহারের উদ্দেশ্য:</strong> ফসল বা পশুর ছবিগুলো শুধুমাত্র রোগ নির্ণয় ও এআই মডেলের সঠিকতা বৃদ্ধির জন্য সংরক্ষিত হয়।
          </p>
          <p>
            ৩. <strong>তৃতীয় পক্ষের কাছে তথ্য প্রদান:</strong> কৃষকদের কোনো ব্যক্তিগত তথ্য তৃতীয় পক্ষের বাণিজ্যিক উদ্দেশ্যে প্রদান বা বিক্রয় করা হয় না।
          </p>
        </div>
      ) : (
        <div className="space-y-2.5 text-xs leading-relaxed text-[#1a1a2e] dark:text-[#e8f5e9]">
          <p>
            1. <strong>Data Encryption:</strong> KishanGhar protects farmer personal data, phone numbers, and location with enterprise-grade cloud encryption.
          </p>
          <p>
            2. <strong>Photo Usage:</strong> Uploaded crop and livestock photos are processed strictly for disease diagnosis and algorithm training.
          </p>
          <p>
            3. <strong>Zero Commercial Sharing:</strong> We never sell or share farmer records with unauthorized third parties.
          </p>
        </div>
      ),
    },
    terms: {
      title: language === 'bn' ? 'ব্যবহারের শর্তাবলী' : 'Terms of Service',
      icon: FileText,
      content: language === 'bn' ? (
        <div className="space-y-2.5 text-xs leading-relaxed text-[#1a1a2e] dark:text-[#e8f5e9]">
          <p>
            ১. কিষাণঘরের এআই পরামর্শ প্রাথমিক দিকনির্দেশনামূলক সহায়তা হিসেবে কাজ করে।
          </p>
          <p>
            ২. ব্যাপক ক্ষয়ক্ষতি বা পশুর গুরুতর জীবনসংশয়ে অবশ্যই উপজেলা প্রাণিসম্পদ বা কৃষি কর্মকর্তার সশরীরে পরামর্শ গ্রহণ করুন।
          </p>
          <p>
            ৩. প্ল্যাটফর্মে সঠিক ও বৈধ তথ্য প্রদান করে স্মার্ট কৃষি সেবার মান উন্নত রাখতে সহায়তা করুন।
          </p>
        </div>
      ) : (
        <div className="space-y-2.5 text-xs leading-relaxed text-[#1a1a2e] dark:text-[#e8f5e9]">
          <p>
            1. KishanGhar AI diagnoses serve as rapid decision support tools.
          </p>
          <p>
            2. For widespread epidemic outbreaks or acute veterinary crises, always consult a registered field officer.
          </p>
          <p>
            3. Users are expected to upload genuine crop/animal photos for authentic advisory.
          </p>
        </div>
      ),
    },
    responsibleAi: {
      title: language === 'bn' ? 'দায়িত্বশীল এআই নীতিমালা' : 'Responsible AI Principles',
      icon: Sparkles,
      content: language === 'bn' ? (
        <div className="space-y-2.5 text-xs leading-relaxed text-[#1a1a2e] dark:text-[#e8f5e9]">
          <p>
            • <strong>স্বচ্ছতা:</strong> প্রতিটি রোগ নির্ণয়ের সাথে কনফিডেন্স স্কোর ও তীব্রতার মাত্রা স্বচ্ছভাবে উল্লেখ করা হয়।
          </p>
          <p>
            • <strong>স্থানীয় উপযোগিতা:</strong> আমাদের এআই জ্ঞানভাণ্ডার বাংলাদেশের মাটি, আবহাওয়া ও আঞ্চলিক রোগের বৈশিষ্ট্যের সাথে সংগতি রেখে তৈরি।
          </p>
          <p>
            • <strong>পরিবেশবান্ধব পরামর্শ:</strong> রাসায়নিক কীটনাশকের চেয়ে সমন্বিত বালাই ব্যবস্থাপনা (IPM) ও জৈব সুরক্ষাকে অগ্রাধিকার দেওয়া হয়।
          </p>
        </div>
      ) : (
        <div className="space-y-2.5 text-xs leading-relaxed text-[#1a1a2e] dark:text-[#e8f5e9]">
          <p>
            • <strong>Transparent Scoring:</strong> Confidence rates and severity levels are explicitly provided with every detection.
          </p>
          <p>
            • <strong>Localized Training:</strong> Customized specifically for agro-ecological zones and common diseases in Bangladesh.
          </p>
          <p>
            • <strong>Eco-Friendly Priority:</strong> Prioritizes Integrated Pest Management (IPM) and organic remedies before chemical pesticides.
          </p>
        </div>
      ),
    },
  };

  return (
    <footer className="bg-[#f8faf8] dark:bg-[#081008] border-t border-gray-100 dark:border-[#1e341e] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-3 group inline-flex">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2e7d32] to-[#4caf50] flex items-center justify-center shadow-sm">
                <span className="text-xl">🌿</span>
              </div>
              <span className="text-xl font-bold text-[#1a1a2e] dark:text-white">
                KishanGhar
              </span>
            </Link>
            <p className="text-xs text-[#64748b] dark:text-[#94a3b8] leading-relaxed mb-4">
              {t('footer.description')}
            </p>

            {/* Social / Action Buttons */}
            <div className="flex items-center gap-2">
              <a
                href="https://moa.gov.bd/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] hover:bg-[#e8f5e9] dark:hover:bg-[#2e7d32]/20 transition-all border border-gray-200 dark:border-[#2d4a2d]"
                title="Ministry of Agriculture Bangladesh"
              >
                <Globe2 size={16} />
              </a>
              <a
                href="tel:16123"
                className="p-2 rounded-xl text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] hover:bg-[#e8f5e9] dark:hover:bg-[#2e7d32]/20 transition-all border border-gray-200 dark:border-[#2d4a2d]"
                title="Call 16123 Krishi Call Center"
              >
                <Phone size={16} />
              </a>
              <a
                href="mailto:support@kishanghar.com"
                className="p-2 rounded-xl text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] hover:bg-[#e8f5e9] dark:hover:bg-[#2e7d32]/20 transition-all border border-gray-200 dark:border-[#2d4a2d]"
                title="Email Support"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a1a2e] dark:text-white mb-3">
              {t('footer.product')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/dashboard" className="text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors flex items-center gap-1.5">
                  {t('nav.dashboard')}
                </Link>
              </li>
              <li>
                <Link to="/crop-detection" className="text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors flex items-center gap-1.5">
                  {t('nav.crops')}
                </Link>
              </li>
              <li>
                <Link to="/animal-detection" className="text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors flex items-center gap-1.5">
                  {t('nav.animalDetection')}
                </Link>
              </li>
              <li>
                <Link to="/livestock" className="text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors flex items-center gap-1.5">
                  {t('nav.livestock')}
                </Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors flex items-center gap-1.5">
                  {t('nav.aiAssistant')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a1a2e] dark:text-white mb-3">
              {t('footer.company')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveModal('about')}
                  className="text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors text-left"
                >
                  {t('footer.about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('contact')}
                  className="text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors text-left flex items-center gap-1"
                >
                  {t('footer.contact')}
                  <span className="text-[10px] bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-1.5 py-0.5 rounded font-semibold">16123</span>
                </button>
              </li>
              <li>
                <a
                  href="https://moa.gov.bd/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors flex items-center gap-1"
                >
                  কৃষি মন্ত্রণালয় (MoA) <ExternalLink size={11} />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a1a2e] dark:text-white mb-3">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors text-left"
                >
                  {t('footer.privacy')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('terms')}
                  className="text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors text-left"
                >
                  {t('footer.terms')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('responsibleAi')}
                  className="text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors text-left"
                >
                  {t('footer.responsibleAi')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-[#1e341e] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94a3b8]">
          <p>© {new Date().getFullYear()} KishanGhar. {t('footer.copyright')}</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart size={13} className="text-red-500 fill-red-500 animate-pulse" /> for the farmers of Bangladesh 🇧🇩
          </p>
        </div>
      </div>

      {/* Interactive Modal */}
      <AnimatePresence>
        {activeModal && modalContent[activeModal] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white dark:bg-[#162416] rounded-2xl shadow-2xl border border-gray-100 dark:border-[#2d4a2d] overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-[#2d4a2d]">
                <h3 className="font-bold text-sm text-[#1a1a2e] dark:text-white flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-green-100 dark:bg-green-950 text-[#2e7d32] dark:text-[#81c784]">
                    {(() => {
                      const Icon = modalContent[activeModal].icon;
                      return <Icon size={16} />;
                    })()}
                  </span>
                  {modalContent[activeModal].title}
                </h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-5 max-h-[75vh] overflow-y-auto">
                {modalContent[activeModal].content}
              </div>
              <div className="p-3 bg-gray-50 dark:bg-[#121c12] border-t border-gray-100 dark:border-[#2d4a2d] flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="btn-primary !py-1.5 !px-4 text-xs"
                >
                  {language === 'bn' ? 'ঠিক আছে' : 'Close'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
