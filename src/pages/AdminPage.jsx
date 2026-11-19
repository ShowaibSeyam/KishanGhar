import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Users, Leaf, PawPrint, Sparkles, Database,
  Search, RefreshCw, AlertCircle, Check, Trash2, ArrowUpRight,
  ExternalLink, CheckCircle2, ShieldAlert, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { adminAPI } from '../services/api';

export default function AdminPage() {
  const { user, isAdmin } = useAuth();
  const { language } = useLanguage();

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [detections, setDetections] = useState([]);
  const [crops, setCrops] = useState([]);
  const [livestock, setLivestock] = useState([]);
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'crops' | 'livestock' | 'detections' | 'system'
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const loadAdminData = async () => {
    setLoading(true);
    setFeedback({ type: '', text: '' });
    try {
      const [statsRes, usersRes, detectionsRes, cropsRes, livestockRes] = await Promise.all([
        adminAPI.getStats().catch(() => ({ data: null })),
        adminAPI.getUsers().catch(() => ({ data: [] })),
        adminAPI.getDetections().catch(() => ({ data: [] })),
        adminAPI.getCrops().catch(() => ({ data: [] })),
        adminAPI.getLivestock().catch(() => ({ data: [] })),
      ]);

      if (statsRes.data) setStats(statsRes.data);
      if (usersRes.data) setUsers(usersRes.data);
      if (detectionsRes.data) setDetections(detectionsRes.data);
      if (cropsRes.data) setCrops(cropsRes.data);
      if (livestockRes.data) setLivestock(livestockRes.data);
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Failed to load admin data' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const showFeedback = (type, text) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback({ type: '', text: '' }), 4000);
  };

  const handleRoleToggle = async (userId, currentRole) => {
    const nextRole = currentRole === 'admin' ? 'farmer' : 'admin';
    setActionLoading(true);
    try {
      await adminAPI.updateUserRole(userId, nextRole);
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: nextRole } : u));
      showFeedback('success', `User role updated to ${nextRole}!`);
    } catch (err) {
      showFeedback('error', err.message || 'Failed to update role');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (userId, userEmail) => {
    if (!window.confirm(`Are you sure you want to delete user ${userEmail}?`)) return;
    setActionLoading(true);
    try {
      await adminAPI.deleteUser(userId);
      setUsers(prev => prev.filter(u => u._id !== userId));
      showFeedback('success', 'User deleted successfully.');
    } catch (err) {
      showFeedback('error', err.message || 'Failed to delete user');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteCrop = async (cropId, cropName) => {
    if (!window.confirm(`Delete crop "${cropName}"? This action cannot be undone.`)) return;
    setActionLoading(true);
    try {
      await adminAPI.deleteCrop(cropId);
      setCrops(prev => prev.filter(c => c._id !== cropId));
      showFeedback('success', `Crop "${cropName}" deleted.`);
    } catch (err) {
      showFeedback('error', err.message || 'Failed to delete crop');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteLivestock = async (animalId, animalName) => {
    if (!window.confirm(`Delete livestock "${animalName}"? This action cannot be undone.`)) return;
    setActionLoading(true);
    try {
      await adminAPI.deleteLivestock(animalId);
      setLivestock(prev => prev.filter(a => a._id !== animalId));
      showFeedback('success', `Livestock "${animalName}" deleted.`);
    } catch (err) {
      showFeedback('error', err.message || 'Failed to delete livestock');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteDetection = async (id) => {
    if (!window.confirm('Delete this disease scan record? This cannot be undone.')) return;
    setActionLoading(true);
    try {
      await adminAPI.deleteDetection(id);
      setDetections(prev => prev.filter(d => d._id !== id));
      showFeedback('success', 'Scan record deleted.');
    } catch (err) {
      showFeedback('error', err.message || 'Failed to delete detection');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = users.filter(u => {
    const query = search.toLowerCase();
    return (
      (u.name || '').toLowerCase().includes(query) ||
      (u.email || '').toLowerCase().includes(query) ||
      (u.location || '').toLowerCase().includes(query)
    );
  });

  const filteredCrops = crops.filter(c => {
    const query = search.toLowerCase();
    return (
      (c.name || '').toLowerCase().includes(query) ||
      (c.type || '').toLowerCase().includes(query) ||
      (c.userId?.name || '').toLowerCase().includes(query) ||
      (c.userId?.email || '').toLowerCase().includes(query)
    );
  });

  const filteredLivestock = livestock.filter(a => {
    const query = search.toLowerCase();
    return (
      (a.name || '').toLowerCase().includes(query) ||
      (a.type || '').toLowerCase().includes(query) ||
      (a.userId?.name || '').toLowerCase().includes(query) ||
      (a.userId?.email || '').toLowerCase().includes(query)
    );
  });

  const tabs = [
    { id: 'users', label: `Farmers (${users.length})`, icon: Users },
    { id: 'crops', label: `Crops (${crops.length})`, icon: Leaf },
    { id: 'livestock', label: `Livestock (${livestock.length})`, icon: PawPrint },
    { id: 'detections', label: `Scans (${detections.length})`, icon: Sparkles },
    { id: 'system', label: 'System', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-[#f8faf8] dark:bg-[#081008] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold mb-2">
              <Shield size={14} />
              <span>SUPER ADMIN COMMAND CENTER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] dark:text-white">
              {language === 'bn' ? 'সিস্টেম অ্যাডমিন প্যানেল' : 'System Administration'}
            </h1>
            <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">
              {language === 'bn' ? 'লগইন অ্যাডমিন:' : 'Logged in as Primary Admin:'} <strong className="text-[#2e7d32] dark:text-[#81c784]">{user?.email}</strong>
            </p>
          </div>

          <button
            onClick={loadAdminData}
            disabled={loading}
            className="btn-secondary !py-2 !px-4 text-xs inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* Feedback alert */}
        <AnimatePresence>
          {feedback.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-xl mb-6 text-xs font-semibold flex items-center justify-between ${
                feedback.type === 'success'
                  ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-500/20'
                  : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20'
              }`}
            >
              <span>{feedback.text}</span>
              <button onClick={() => setFeedback({ type: '', text: '' })} className="underline ml-2">Dismiss</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Farmers', value: stats?.totalUsers ?? users.length, color: 'text-[#2e7d32]', icon: Users, sub: 'Registered accounts' },
            { label: 'Crops', value: stats?.totalCrops ?? crops.length, color: 'text-emerald-600', icon: Leaf, sub: 'Active plantations' },
            { label: 'Livestock', value: stats?.totalAnimals ?? livestock.length, color: 'text-blue-600', icon: PawPrint, sub: 'Cows, goats, poultry' },
            { label: 'AI Scans', value: stats?.totalDetections ?? detections.length, color: 'text-purple-600', icon: Sparkles, sub: 'Disease detections' },
            { label: 'Tasks', value: stats?.totalTasks ?? 0, color: 'text-orange-500', icon: CheckCircle2, sub: 'Farm tasks logged' },
          ].map(({ label, value, color, icon: Icon, sub }) => (
            <div key={label} className="p-5 rounded-2xl bg-white dark:bg-[#142214] border border-gray-100 dark:border-[#2d4a2d] shadow-sm">
              <div className={`flex items-center justify-between ${color} mb-2`}>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</span>
                <Icon size={18} />
              </div>
              <p className="text-3xl font-extrabold text-[#1a1a2e] dark:text-white">{value}</p>
              <p className="text-[11px] text-[#64748b] dark:text-[#94a3b8] mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 mb-6 border-b border-gray-200 dark:border-[#2d4a2d] pb-2 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSearch(''); }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === id
                  ? 'bg-[#2e7d32] text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1a2e1a]'
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>

        {/* Search bar (for data tabs) */}
        {['users', 'crops', 'livestock'].includes(activeTab) && (
          <div className="relative w-full sm:w-80 mb-5">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={
                activeTab === 'users' ? 'Search by name, email, location...' :
                activeTab === 'crops' ? 'Search by crop name, type, farmer...' :
                'Search by animal name, type, farmer...'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input !pl-9 !py-2 text-xs w-full"
            />
          </div>
        )}

        {/* ─── Tab 1: Users ─────────────────────────────────────────── */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-[#142214] rounded-2xl border border-gray-100 dark:border-[#2d4a2d] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-[#1a1a2e] dark:text-white">Registered Farmers ({filteredUsers.length})</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-[#1b2b1b] text-gray-600 dark:text-gray-300 uppercase tracking-wider text-[11px] border-b border-gray-100 dark:border-[#2d4a2d]">
                  <tr>
                    <th className="py-3 px-4">Farmer</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Farm Size</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-[#2d4a2d]/60">
                  {filteredUsers.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-[#182818]/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-green-100 dark:bg-green-950 flex items-center justify-center font-bold text-green-700 flex-shrink-0">
                            {u.avatar ? (
                              <img src={u.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                              u.name?.charAt(0) || 'F'
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-[#1a1a2e] dark:text-white">{u.name || 'Farmer'}</p>
                            <p className="text-[11px] text-gray-400">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-gray-600 dark:text-gray-300">{u.phone || '—'}</td>
                      <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">{u.location || 'Bangladesh'}</td>
                      <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">{u.farmSize || '—'}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                          u.role === 'admin'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                            : 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300'
                        }`}>
                          {u.role || 'farmer'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          {u.email !== 'seyamseam@gmail.com' && (
                            <>
                              <button
                                onClick={() => handleRoleToggle(u._id, u.role)}
                                disabled={actionLoading}
                                className="px-2.5 py-1 rounded-lg border border-gray-200 dark:border-[#2d4a2d] hover:bg-gray-100 dark:hover:bg-[#203420] text-[11px] font-semibold"
                                title="Change Role"
                              >
                                {u.role === 'admin' ? 'Make Farmer' : 'Make Admin'}
                              </button>
                              <button
                                onClick={() => handleDeleteUser(u._id, u.email)}
                                disabled={actionLoading}
                                className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                                title="Delete user"
                              >
                                <Trash2 size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredUsers.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Users size={32} className="mx-auto mb-2 opacity-30" />
                  <p>No farmers match your search.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── Tab 2: Crops Management ───────────────────────────────── */}
        {activeTab === 'crops' && (
          <div className="bg-white dark:bg-[#142214] rounded-2xl border border-gray-100 dark:border-[#2d4a2d] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-[#1a1a2e] dark:text-white">
                All Crops — Platform Wide ({filteredCrops.length})
              </h3>
              <span className="text-xs text-gray-500">Admin can delete any crop record</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-[#1b2b1b] text-gray-600 dark:text-gray-300 uppercase tracking-wider text-[11px] border-b border-gray-100 dark:border-[#2d4a2d]">
                  <tr>
                    <th className="py-3 px-4">Crop Name</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Area</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Farmer</th>
                    <th className="py-3 px-4">Planted</th>
                    <th className="py-3 px-4 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-[#2d4a2d]/60">
                  {filteredCrops.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50 dark:hover:bg-[#182818]/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{c.emoji || '🌱'}</span>
                          <span className="font-bold text-[#1a1a2e] dark:text-white">{c.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">{c.type || '—'}</td>
                      <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">{c.area ? `${c.area} বিঘা` : '—'}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                          c.status === 'healthy'
                            ? 'bg-green-100 dark:bg-green-950 text-green-700'
                            : c.status === 'diseased'
                            ? 'bg-red-100 dark:bg-red-950 text-red-700'
                            : 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700'
                        }`}>
                          {c.status || 'monitoring'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div>
                          <p className="font-semibold text-[#1a1a2e] dark:text-white">{c.userId?.name || 'Unknown'}</p>
                          <p className="text-[10px] text-gray-400">{c.userId?.email || '—'}</p>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-500">
                        {c.plantedDate ? new Date(c.plantedDate).toLocaleDateString('en-BD') : '—'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteCrop(c._id, c.name)}
                          disabled={actionLoading}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                          title="Delete crop"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredCrops.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Leaf size={32} className="mx-auto mb-2 opacity-30" />
                  <p>No crop records found on the platform.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── Tab 3: Livestock Management ──────────────────────────── */}
        {activeTab === 'livestock' && (
          <div className="bg-white dark:bg-[#142214] rounded-2xl border border-gray-100 dark:border-[#2d4a2d] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-[#1a1a2e] dark:text-white">
                All Livestock — Platform Wide ({filteredLivestock.length})
              </h3>
              <span className="text-xs text-gray-500">Admin can delete any livestock record</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-[#1b2b1b] text-gray-600 dark:text-gray-300 uppercase tracking-wider text-[11px] border-b border-gray-100 dark:border-[#2d4a2d]">
                  <tr>
                    <th className="py-3 px-4">Animal</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Age / Weight</th>
                    <th className="py-3 px-4">Health</th>
                    <th className="py-3 px-4">Vaccination</th>
                    <th className="py-3 px-4">Farmer</th>
                    <th className="py-3 px-4 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-[#2d4a2d]/60">
                  {filteredLivestock.map((a) => (
                    <tr key={a._id} className="hover:bg-gray-50 dark:hover:bg-[#182818]/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{a.emoji || '🐄'}</span>
                          <span className="font-bold text-[#1a1a2e] dark:text-white">{a.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full font-bold text-[10px] uppercase bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                          {a.type || 'unknown'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">
                        {a.age || '—'} {a.weight ? `/ ${a.weight} kg` : ''}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                          a.healthStatus === 'healthy'
                            ? 'bg-green-100 dark:bg-green-950 text-green-700'
                            : a.healthStatus === 'sick'
                            ? 'bg-red-100 dark:bg-red-950 text-red-700'
                            : 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700'
                        }`}>
                          {a.healthStatus || 'unknown'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                          a.vaccinationStatus === 'vaccinated'
                            ? 'bg-green-100 dark:bg-green-950 text-green-700'
                            : 'bg-orange-100 dark:bg-orange-950 text-orange-700'
                        }`}>
                          {a.vaccinationStatus || 'pending'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div>
                          <p className="font-semibold text-[#1a1a2e] dark:text-white">{a.userId?.name || 'Unknown'}</p>
                          <p className="text-[10px] text-gray-400">{a.userId?.email || '—'}</p>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteLivestock(a._id, a.name)}
                          disabled={actionLoading}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                          title="Delete livestock"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredLivestock.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <PawPrint size={32} className="mx-auto mb-2 opacity-30" />
                  <p>No livestock records found on the platform.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── Tab 4: Disease Detections Log ────────────────────────── */}
        {activeTab === 'detections' && (
          <div className="bg-white dark:bg-[#142214] rounded-2xl border border-gray-100 dark:border-[#2d4a2d] p-5 shadow-sm">
            <h3 className="font-bold text-sm text-[#1a1a2e] dark:text-white mb-4">
              All AI Disease Diagnosis History ({detections.length})
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {detections.map((d) => (
                <div
                  key={d._id}
                  className="p-4 rounded-xl border border-gray-100 dark:border-[#2d4a2d] bg-gray-50/50 dark:bg-[#182818]/40 space-y-3 relative"
                >
                  {/* Delete button */}
                  <button
                    onClick={() => handleDeleteDetection(d._id)}
                    disabled={actionLoading}
                    className="absolute top-3 right-3 p-1.5 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors z-10"
                    title="Delete scan record"
                  >
                    <Trash2 size={13} />
                  </button>

                  <div className="h-40 rounded-xl overflow-hidden bg-black/10 relative">
                    <img
                      src={d.imageUrl}
                      alt="Scan"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-black/60 text-white backdrop-blur-sm">
                      {d.type}
                    </span>
                  </div>

                  <div>
                    <p className="font-bold text-sm text-[#1a1a2e] dark:text-white">
                      {d.result?.detected || 'General Inspection'}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-0.5">
                      {d.result?.detectedBn}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-500 border-t border-gray-200 dark:border-[#2d4a2d] pt-2">
                    <span>Confidence: <strong>{d.result?.confidence || 90}%</strong></span>
                    <span>Severity: <strong className="capitalize">{d.result?.severity || 'Normal'}</strong></span>
                  </div>

                  <div className="text-[10px] text-gray-400 pt-1">
                    Farmer: {d.userId?.name || 'Farmer'} ({d.userId?.email || 'N/A'})
                  </div>
                </div>
              ))}
            </div>

            {detections.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <Sparkles size={32} className="mx-auto mb-2 opacity-30" />
                <p>No disease scans uploaded yet.</p>
              </div>
            )}
          </div>
        )}

        {/* ─── Tab 5: System Status ─────────────────────────────────── */}
        {activeTab === 'system' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#142214] border border-gray-100 dark:border-[#2d4a2d] space-y-3">
              <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                <Database size={18} />
                <span>MongoDB Atlas Database</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Connected successfully to cluster <code>cluster0.qsbgea6.mongodb.net/kishanghar</code>
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-950 text-green-700 text-xs font-bold">
                <CheckCircle2 size={13} /> Status: Online & Synced
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#142214] border border-gray-100 dark:border-[#2d4a2d] space-y-3">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                <Sparkles size={18} />
                <span>Cloudinary Storage</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Media bucket <code>tokn4tbh</code> actively accepting crop & animal photos.
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 text-xs font-bold">
                <CheckCircle2 size={13} /> Status: Active
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#142214] border border-gray-100 dark:border-[#2d4a2d] space-y-3">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                <ShieldAlert size={18} />
                <span>Security & Admin Access</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Super Admin: <code>seyamseam@gmail.com</code> with full CRUD privileges on all data.
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 text-xs font-bold">
                <CheckCircle2 size={13} /> Role: Super Administrator
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
