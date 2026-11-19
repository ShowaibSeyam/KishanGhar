import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Heart, Syringe, Calendar, Scale,
  X, Check, Trash2, Pencil, Shield
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { livestock as mockLivestock } from '../data/mockData';
import { livestockAPI, adminAPI } from '../services/api';

const tabs = [
  { key: 'all', emoji: '🐾' },
  { key: 'cow', emoji: '🐄' },
  { key: 'goat', emoji: '🐐' },
  { key: 'chicken', emoji: '🐔' },
  { key: 'duck', emoji: '🦆' },
];

const animalEmojis = {
  cow: '🐄',
  goat: '🐐',
  chicken: '🐔',
  duck: '🦆',
  sheep: '🐑',
  other: '🐾',
};

const emptyAnimal = {
  name: '',
  nameBn: '',
  type: 'cow',
  breed: '',
  age: '',
  weight: '',
  health: 'healthy',
  vaccination: 'vaccinated',
  milk: '',
  eggs: '',
};

export default function LivestockPage() {
  const { user, isAdmin } = useAuth();
  const { language, t } = useLanguage();

  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [animalList, setAnimalList] = useState([]);
  const [dbLoaded, setDbLoaded] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // null = add mode, animal obj = edit mode
  const [formData, setFormData] = useState(emptyAnimal);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Load livestock from backend
  useEffect(() => {
    async function load() {
      try {
        const res = await livestockAPI.getAll();
        if (res.data && res.data.length > 0) {
          setAnimalList(res.data);
        } else {
          setAnimalList(mockLivestock);
        }
      } catch {
        setAnimalList(mockLivestock);
      } finally {
        setDbLoaded(true);
      }
    }
    load();
  }, []);

  const filtered = animalList.filter(a => {
    const matchesTab = activeTab === 'all' || a.type === activeTab;
    const name = language === 'bn' ? a.nameBn || a.name : a.name;
    const matchesSearch = (name || '').toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getTabLabel = (key) => {
    if (key === 'all') return t('livestock.all');
    return t(`livestock.${key}`);
  };

  // ── Open modal ──────────────────────────────────────────────
  const openAdd = () => {
    setEditTarget(null);
    setFormData(emptyAnimal);
    setIsModalOpen(true);
  };

  const openEdit = (animal) => {
    setEditTarget(animal);
    setFormData({
      name: animal.name || '',
      nameBn: animal.nameBn || '',
      type: animal.type || 'cow',
      breed: animal.breed || '',
      age: animal.age || '',
      weight: animal.weight || '',
      health: animal.health || animal.healthStatus || 'healthy',
      vaccination: animal.vaccination || animal.vaccinationStatus || 'vaccinated',
      milk: animal.milk || '',
      eggs: animal.eggs || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditTarget(null);
    setFormData(emptyAnimal);
  };

  // ── Save (Create / Update) ───────────────────────────────────
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...formData, emoji: animalEmojis[formData.type] || '🐾' };

      if (editTarget) {
        // UPDATE
        let res;
        if (isAdmin && editTarget.userId && editTarget.userId._id !== user?.uid) {
          // Admin editing another user's animal via admin route
          res = await adminAPI.updateLivestock(editTarget._id, payload);
        } else {
          res = await livestockAPI.update(editTarget._id, payload);
        }
        const updated = res.data;
        setAnimalList(prev => prev.map(a => a._id === editTarget._id ? { ...a, ...updated } : a));
      } else {
        // CREATE
        const res = await livestockAPI.create(payload);
        if (res.data) setAnimalList(prev => [res.data, ...prev]);
      }
      closeModal();
    } catch (err) {
      alert(err.message || 'Failed to save animal.');
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ───────────────────────────────────────────────────
  const handleDelete = async (animal) => {
    const name = language === 'bn' ? animal.nameBn || animal.name : animal.name;
    if (!window.confirm(`"${name}" কে মুছে দেবেন? / Delete "${name}"?`)) return;
    setDeletingId(animal._id || animal.id);
    try {
      if (isAdmin) {
        // Admin can delete any animal
        await adminAPI.deleteLivestock(animal._id);
      } else {
        await livestockAPI.delete(animal._id);
      }
      setAnimalList(prev => prev.filter(a => (a._id || a.id) !== (animal._id || animal.id)));
    } catch (err) {
      alert(err.message || 'Failed to delete.');
    } finally {
      setDeletingId(null);
    }
  };

  // Can this user edit/delete this animal?
  const canManage = (animal) => {
    if (isAdmin) return true;
    if (!animal._id) return false; // mock data
    return true; // own animal (backend enforces userId check)
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
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-[#1a1a2e] dark:text-white">
                {t('livestock.title')}
              </h1>
              {isAdmin && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                  <Shield size={10} /> ADMIN
                </span>
              )}
            </div>
            <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
              {isAdmin
                ? 'Admin view — full edit & delete access on all animals'
                : t('livestock.subtitle')}
            </p>
          </div>
          <button onClick={openAdd} className="btn-primary">
            <Plus size={16} />
            {t('livestock.addAnimal')}
          </button>
        </motion.div>

        {/* Tabs + Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d] overflow-x-auto max-w-full">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
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
              placeholder={t('livestock.searchPlaceholder')}
              className="input !pl-10 !py-2 text-sm"
            />
          </div>
        </div>

        {/* Animals Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((animal) => (
              <motion.div
                key={animal._id || animal.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-5 rounded-2xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d] hover:shadow-md transition-shadow relative group"
              >
                {/* Admin / owner action buttons — top right */}
                {canManage(animal) && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={() => openEdit(animal)}
                      className="p-1.5 rounded-lg bg-white dark:bg-[#243824] border border-gray-200 dark:border-[#2d4a2d] text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/40 shadow-sm"
                      title="Edit"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(animal)}
                      disabled={deletingId === (animal._id || animal.id)}
                      className="p-1.5 rounded-lg bg-white dark:bg-[#243824] border border-gray-200 dark:border-[#2d4a2d] text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 shadow-sm disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === (animal._id || animal.id)
                        ? <div className="w-3 h-3 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
                        : <Trash2 size={13} />}
                    </button>
                  </div>
                )}

                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{animal.emoji || animalEmojis[animal.type] || '🐾'}</span>
                    <div>
                      <h3 className="font-bold text-[#1a1a2e] dark:text-white">
                        {language === 'bn' ? animal.nameBn || animal.name : animal.name}
                      </h3>
                      <p className="text-xs text-[#94a3b8]">
                        {language === 'bn' ? animal.breedBn || animal.breed : animal.breed}
                      </p>
                      {isAdmin && animal.userId && (
                        <p className="text-[10px] text-amber-500 dark:text-amber-400 mt-0.5">
                          👤 {animal.userId?.name || animal.userId?.email || 'Unknown farmer'}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="badge badge-info text-xs capitalize">{animal.type}</span>
                </div>

                {/* Info rows */}
                <div className="space-y-2 py-2">
                  {animal.age && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-[#64748b] dark:text-[#94a3b8]">
                        <Calendar size={14} /> {language === 'bn' ? 'বয়স' : 'Age'}
                      </span>
                      <span className="font-medium text-[#1a1a2e] dark:text-white">{animal.age}</span>
                    </div>
                  )}
                  {animal.weight && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-[#64748b] dark:text-[#94a3b8]">
                        <Scale size={14} /> {language === 'bn' ? 'ওজন' : 'Weight'}
                      </span>
                      <span className="font-medium text-[#1a1a2e] dark:text-white">{animal.weight}</span>
                    </div>
                  )}
                  {animal.milk && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-[#64748b] dark:text-[#94a3b8]">
                        🥛 {language === 'bn' ? 'দুধ উৎপাদন' : 'Milk Yield'}
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
                  <span className={`badge text-[10px] ${
                    (animal.vaccination === 'vaccinated' || animal.vaccinationStatus === 'vaccinated')
                      ? 'badge-success' : 'badge-warning'
                  }`}>
                    <Syringe size={10} />
                    {(animal.vaccination === 'vaccinated' || animal.vaccinationStatus === 'vaccinated')
                      ? t('livestock.vaccinated') : t('livestock.pending')}
                  </span>
                  <span className={`badge text-[10px] ${
                    (animal.health === 'healthy' || animal.healthStatus === 'healthy')
                      ? 'badge-success' : 'badge-danger'
                  }`}>
                    <Heart size={10} />
                    {(animal.health === 'healthy' || animal.healthStatus === 'healthy')
                      ? t('livestock.healthy') : t('livestock.sick')}
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

      {/* ── Add / Edit Animal Modal ─────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white dark:bg-[#1a2e1a] rounded-2xl shadow-xl border border-gray-100 dark:border-[#2d4a2d] overflow-hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-[#2d4a2d]">
                <h3 className="font-bold text-lg text-[#1a1a2e] dark:text-white flex items-center gap-2">
                  {editTarget ? <Pencil size={18} className="text-blue-500" /> : <Plus size={18} />}
                  {editTarget
                    ? (language === 'bn' ? 'পশুর তথ্য সম্পাদনা করুন' : 'Edit Animal')
                    : (language === 'bn' ? 'নতুন পশু যোগ করুন' : 'Add New Animal')}
                </h3>
                <button onClick={closeModal} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-5 space-y-3.5 max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'bn' ? 'নাম (English)' : 'Name (English)'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Manik"
                      className="input !py-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'bn' ? 'নাম (বাংলা)' : 'Name (Bangla)'}
                    </label>
                    <input
                      type="text"
                      value={formData.nameBn}
                      onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                      placeholder="যেমনঃ মানিক"
                      className="input !py-1.5 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'bn' ? 'প্রাণীর ধরণ' : 'Animal Type'}
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="input !py-1.5 text-sm"
                    >
                      <option value="cow">Cow / গরু</option>
                      <option value="goat">Goat / ছাগল</option>
                      <option value="chicken">Chicken / মুরগি</option>
                      <option value="duck">Duck / হাঁস</option>
                      <option value="sheep">Sheep / ভেড়া</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'bn' ? 'জাত / Breed' : 'Breed'}
                    </label>
                    <input
                      type="text"
                      value={formData.breed}
                      onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                      placeholder="e.g. Sahiwal"
                      className="input !py-1.5 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'bn' ? 'বয়স' : 'Age'}
                    </label>
                    <input
                      type="text"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="e.g. 2 years"
                      className="input !py-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'bn' ? 'ওজন' : 'Weight'}
                    </label>
                    <input
                      type="text"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      placeholder="e.g. 350 kg"
                      className="input !py-1.5 text-sm"
                    />
                  </div>
                </div>

                {(formData.type === 'cow' || formData.type === 'goat') && (
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'bn' ? 'দৈনিক দুধ উৎপাদন' : 'Daily Milk Production'}
                    </label>
                    <input
                      type="text"
                      value={formData.milk}
                      onChange={(e) => setFormData({ ...formData, milk: e.target.value })}
                      placeholder="e.g. 12L/day"
                      className="input !py-1.5 text-sm"
                    />
                  </div>
                )}

                {(formData.type === 'chicken' || formData.type === 'duck') && (
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'bn' ? 'দৈনিক ডিম উৎপাদন' : 'Daily Egg Production'}
                    </label>
                    <input
                      type="text"
                      value={formData.eggs}
                      onChange={(e) => setFormData({ ...formData, eggs: e.target.value })}
                      placeholder="e.g. 25/day"
                      className="input !py-1.5 text-sm"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'bn' ? 'স্বাস্থ্য' : 'Health'}
                    </label>
                    <select
                      value={formData.health}
                      onChange={(e) => setFormData({ ...formData, health: e.target.value })}
                      className="input !py-1.5 text-sm"
                    >
                      <option value="healthy">Healthy / সুস্থ</option>
                      <option value="sick">Sick / অসুস্থ</option>
                      <option value="recovering">Recovering / সুস্থ হচ্ছে</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'bn' ? 'টিকা' : 'Vaccination'}
                    </label>
                    <select
                      value={formData.vaccination}
                      onChange={(e) => setFormData({ ...formData, vaccination: e.target.value })}
                      className="input !py-1.5 text-sm"
                    >
                      <option value="vaccinated">Vaccinated / দেয়া হয়েছে</option>
                      <option value="pending">Pending / বাকি আছে</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-gray-100 dark:border-[#2d4a2d]">
                  <button type="button" onClick={closeModal} className="btn-secondary !py-2 text-sm">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn-primary !py-2 text-sm">
                    {saving ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Check size={16} />
                        {editTarget
                          ? (language === 'bn' ? 'আপডেট করুন' : 'Update')
                          : (language === 'bn' ? 'সংরক্ষণ করুন' : 'Save Animal')}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
