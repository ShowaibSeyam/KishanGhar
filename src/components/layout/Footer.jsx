import { Link } from 'react-router-dom';
import { Heart, Globe2, Mail, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#f8faf8] dark:bg-[#0a120a] border-t border-gray-100 dark:border-[#2d4a2d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2e7d32] to-[#4caf50] flex items-center justify-center shadow-sm">
                <span className="text-white text-lg">🌿</span>
              </div>
              <div>
                <span className="text-lg font-bold text-[#1a1a2e] dark:text-white">KishanGhar</span>
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8] -mt-0.5">কিষাণঘর</p>
              </div>
            </div>
            <p className="text-sm text-[#64748b] dark:text-[#94a3b8] leading-relaxed mb-4">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg text-[#64748b] hover:text-[#2e7d32] hover:bg-[#e8f5e9] dark:hover:bg-[#2e7d32]/10 transition-all">
                <Globe2 size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg text-[#64748b] hover:text-[#2e7d32] hover:bg-[#e8f5e9] dark:hover:bg-[#2e7d32]/10 transition-all">
                <ExternalLink size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg text-[#64748b] hover:text-[#2e7d32] hover:bg-[#e8f5e9] dark:hover:bg-[#2e7d32]/10 transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-[#1a1a2e] dark:text-white mb-4">{t('footer.product')}</h4>
            <ul className="space-y-2.5">
              <li><Link to="/crop-detection" className="text-sm text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors">{t('nav.crops')}</Link></li>
              <li><Link to="/livestock" className="text-sm text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors">{t('nav.livestock')}</Link></li>
              <li><Link to="/ai-assistant" className="text-sm text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors">{t('nav.aiAssistant')}</Link></li>
              <li><Link to="/marketplace" className="text-sm text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors">{t('nav.marketplace')}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-[#1a1a2e] dark:text-white mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors">{t('footer.about')}</a></li>
              <li><a href="#" className="text-sm text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors">{t('footer.blog')}</a></li>
              <li><a href="#" className="text-sm text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors">{t('footer.careers')}</a></li>
              <li><a href="#" className="text-sm text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors">{t('footer.contact')}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-[#1a1a2e] dark:text-white mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="text-sm text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors">{t('footer.terms')}</a></li>
              <li><a href="#" className="text-sm text-[#64748b] dark:text-[#94a3b8] hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors">{t('footer.responsibleAi')}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-[#2d4a2d] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#94a3b8]">{t('footer.copyright')}</p>
          <p className="text-sm text-[#94a3b8] flex items-center gap-1">
            Made with <Heart size={14} className="text-red-400 fill-red-400" /> in Bangladesh 🇧🇩
          </p>
        </div>
      </div>
    </footer>
  );
}
