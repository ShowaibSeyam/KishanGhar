import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, Ruler, Camera, Check, AlertCircle,
  Save, ShieldCheck, Calendar, Sparkles, Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { authAPI, uploadAvatar } from '../services/api';

export default function ProfilePage() {
  const { user, updateUser, isAdmin } = useAuth();
  const { language, t } = useLanguage();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    location: user?.location || 'Dhaka',
    farmSize: user?.farmSize || '',
  });

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Sync form data whenever user object updates from MongoDB
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        location: user.location || 'Dhaka',
        farmSize: user.farmSize || '',
      });
      if (user.avatar) setAvatarPreview(user.avatar);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setMessage({ type: '', text: '' });
  };

  const handleAvatarSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    setUploadingAvatar(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await uploadAvatar(file);
      if (res.avatarUrl) {
        setAvatarPreview(res.avatarUrl);
        updateUser({ avatar: res.avatarUrl });
        setMessage({
          type: 'success',
          text: language === 'bn' ? 'প্রোফাইল ছবি সফলভাবে আপডেট হয়েছে!' : 'Profile picture updated successfully!',
        });
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.message || 'Avatar upload failed',
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await authAPI.updateProfile(formData);
      if (res.user) {
        updateUser(res.user);
      }
      setMessage({
        type: 'success',
        text: language === 'bn' ? 'প্রোফাইল সফলভাবে সংরক্ষিত হয়েছে!' : 'Profile updated successfully!',
      });
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.message || 'Failed to update profile',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] dark:bg-[#0a120a] py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] dark:text-white">
            {language === 'bn' ? 'আমার প্রোফাইল' : 'Farmer Profile'}
          </h1>
          <p className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-1">
            {language === 'bn' ? 'আপনার ব্যক্তিগত ও খামারের তথ্য পরিচালনা করুন' : 'Manage your personal and farm information'}
          </p>
        </motion.div>

        {/* Message Banner */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl mb-6 flex items-start gap-2.5 ${
              message.type === 'success'
                ? 'bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-300'
                : 'bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400'
            }`}
          >
            {message.type === 'success' ? <Check size={18} className="mt-0.5 flex-shrink-0" /> : <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />}
            <span className="text-sm font-medium">{message.text}</span>
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left card: Avatar & Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d] flex flex-col items-center text-center"
          >
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#e8f5e9] dark:border-[#2e7d32]/30 bg-gray-100 dark:bg-[#162016] flex items-center justify-center shadow-md">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">👨‍🌾</span>
                )}
              </div>
              <button
                type="button"
                disabled={uploadingAvatar}
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 p-2 rounded-full bg-[#2e7d32] text-white hover:bg-[#1b5e20] shadow-md transition-all disabled:opacity-50"
                title="Change Photo (Cloudinary)"
              >
                {uploadingAvatar ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Camera size={15} />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarSelect}
                className="hidden"
              />
            </div>

            <h3 className="text-lg font-bold text-[#1a1a2e] dark:text-white">
              {formData.name || 'Farmer'}
            </h3>
            <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">{user?.email}</p>

            <div className="w-full border-t border-gray-100 dark:border-[#2d4a2d] my-4 pt-4 space-y-2 text-left text-xs">
              <div className="flex items-center justify-between text-[#64748b] dark:text-[#94a3b8]">
                <span>Status</span>
                <span className="inline-flex items-center gap-1 text-[#2e7d32] font-semibold bg-[#e8f5e9] dark:bg-[#2e7d32]/20 px-2 py-0.5 rounded-full">
                  <ShieldCheck size={12} /> Verified
                </span>
              </div>
              <div className="flex items-center justify-between text-[#64748b] dark:text-[#94a3b8]">
                <span>Provider</span>
                <span className="capitalize font-medium text-[#1a1a2e] dark:text-white">{user?.provider || 'Email'}</span>
              </div>
              <div className="flex items-center justify-between text-[#64748b] dark:text-[#94a3b8]">
                <span>Role</span>
                <span className={`capitalize font-bold px-2 py-0.5 rounded-md text-xs ${isAdmin ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'text-[#1a1a2e] dark:text-white'}`}>
                  {isAdmin ? '👑 System Administrator' : (user?.role || 'Farmer')}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right card: Profile Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 p-6 rounded-2xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d]"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] dark:text-white mb-1.5">
                  {language === 'bn' ? 'পুরো নাম' : 'Full Name'}
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input !pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email (Readonly) */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] dark:text-white mb-1.5">
                  {language === 'bn' ? 'ইমেইল (পরিবর্তনযোগ্য নয়)' : 'Email (Cannot be changed)'}
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="input !pl-10 opacity-70 cursor-not-allowed bg-gray-50 dark:bg-[#162016]"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-[#1a1a2e] dark:text-white mb-1.5">
                  {language === 'bn' ? 'ফোন নম্বর' : 'Phone Number'}
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1712-345678"
                    className="input !pl-10"
                  />
                </div>
              </div>

              {/* Location & Farm Size */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1a1a2e] dark:text-white mb-1.5">
                    {language === 'bn' ? 'বিভাগ / জেলা' : 'Division / District'}
                  </label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Dhaka, Rangpur, etc."
                      className="input !pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1a1a2e] dark:text-white mb-1.5">
                    {language === 'bn' ? 'খামারের পরিমাপ' : 'Farm Size'}
                  </label>
                  <div className="relative">
                    <Ruler size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                    <input
                      type="text"
                      name="farmSize"
                      value={formData.farmSize}
                      onChange={handleChange}
                      placeholder="e.g. 5 acres / ৫ একর"
                      className="input !pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary w-full justify-center !py-2.5 text-sm"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save size={16} />
                      {language === 'bn' ? 'তথ্য সংরক্ষণ করুন' : 'Save Changes'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
