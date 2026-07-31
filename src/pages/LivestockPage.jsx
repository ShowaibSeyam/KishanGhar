import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Filter, Heart, Syringe, Calendar, Scale,
  ChevronRight, AlertCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { livestock } from '../data/mockData';

const tabs = [
  { key: 'all', emoji: '🐾' },
  { key: 'cow', emoji: '🐄' },
  { key: 'goat', emoji: '🐐' },
  { key: 'chicken', emoji: '🐔' },
  { key: 'duck', emoji: '🦆' },
];

export default function LivestockPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const { language, t } = useLanguage();

  const filtered = livestock.filter(a => {
    const matchesTab = activeTab === 'all' || a.type === activeTab;
    const name = language === 'bn' ? a.nameBn : a.name;
    const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getTabLabel = (key) => {
    if (key === 'all') return t('livestock.all');
    return t(`livestock.${key}`);
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] dark:bg-[#0a120a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e] dark:text-white">
              {t('livestock.title')}
            </h1>
            <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
              {t('livestock.subtitle')}
            </p>
          </div>
          <button className="btn-primary">
            <Plus size={16} />
            {t('livestock.addAnimal')}
          </button>
        </motion.div>

        {/* Tabs + Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d]">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-[#e8f5e9] dark:bg-[#2e7d32]/20 text-[#2e7d32] dark:text-[#81c784]'
                    : 'text-[#64748b] dark:text-[#94a3b8] hover:bg-gray-50 dark:hover:bg-[#162016]'
                }`}
              >
                <span>{tab.emoji}</span>
                <span className="hidden sm:inline">{getTabLabel(tab.key)}</span>
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={language === 'bn' ? 'পশু খুঁজুন...' : 'Search animals...'}
              className="input !pl-9 !py-2 text-sm"
            />
          </div>
        </div>

        {/* Animals Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((animal, i) => (
              <motion.div
                key={animal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group p-4 rounded-2xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d] hover:shadow-md hover:border-[#4caf50]/30 transition-all cursor-pointer"
              >
                {/* Animal emoji & name */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-xl bg-[#f8faf8] dark:bg-[#162016] flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {animal.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-[#1a1a2e] dark:text-white truncate">
                      {language === 'bn' ? animal.nameBn : animal.name}
                    </h3>
                    <p className="text-xs text-[#94a3b8]">
                      {language === 'bn' ? animal.breedBn : animal.breed}
                    </p>
                  </div>
                  {animal.health === 'sick' && (
                    <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                  )}
                </div>

                {/* Details grid */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-[#64748b] dark:text-[#94a3b8]">
                      <Calendar size={13} />
                      {t('livestock.age')}
                    </span>
                    <span className="font-medium text-[#1a1a2e] dark:text-white">{animal.age}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-[#64748b] dark:text-[#94a3b8]">
                      <Scale size={13} />
                      {t('livestock.weight')}
                    </span>
                    <span className="font-medium text-[#1a1a2e] dark:text-white">{animal.weight}</span>
                  </div>

                  {animal.count && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-[#64748b] dark:text-[#94a3b8]">
                        📊 {language === 'bn' ? 'সংখ্যা' : 'Count'}
                      </span>
                      <span className="font-medium text-[#1a1a2e] dark:text-white">{animal.count}</span>
                    </div>
                  )}

                  {animal.milk && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-[#64748b] dark:text-[#94a3b8]">
                        🥛 {language === 'bn' ? 'দুধ' : 'Milk'}
                      </span>
                      <span className="font-medium text-[#1a1a2e] dark:text-white">{animal.milk}</span>
                    </div>
                  )}

                  {animal.eggs && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-[#64748b] dark:text-[#94a3b8]">
                        🥚 {language === 'bn' ? 'ডিম' : 'Eggs'}
                      </span>
                      <span className="font-medium text-[#1a1a2e] dark:text-white">{animal.eggs}</span>
                    </div>
                  )}
                </div>

                {/* Status badges */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-[#2d4a2d]/50">
                  <span className={`badge text-[10px] ${animal.vaccination === 'vaccinated' ? 'badge-success' : 'badge-warning'}`}>
                    <Syringe size={10} />
                    {animal.vaccination === 'vaccinated' ? t('livestock.vaccinated') : t('livestock.pending')}
                  </span>
                  <span className={`badge text-[10px] ${animal.health === 'healthy' ? 'badge-success' : 'badge-danger'}`}>
                    <Heart size={10} />
                    {animal.health === 'healthy' ? t('livestock.healthy') : t('livestock.sick')}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <span className="text-4xl">🔍</span>
            <p className="text-[#64748b] dark:text-[#94a3b8] mt-3">
              {language === 'bn' ? 'কোনো পশু পাওয়া যায়নি' : 'No animals found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
