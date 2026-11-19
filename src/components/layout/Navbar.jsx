import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Sun, Moon, Globe, Bell, Search,
  LayoutDashboard, Leaf, Bug, PawPrint,
  MessageSquare, User, LogOut, ChevronDown, Shield,
  CloudRain, Thermometer, Wind, AlertTriangle, CheckCircle2,
  Sparkles, Info, Clock
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { fetchLiveWeather } from '../../services/weather';

function useNotifications(user) {
  const [notifications, setNotifications] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!user) return;

    async function buildNotifications() {
      const notes = [];

      // ── Weather-based alerts ─────────────────────────────────
      try {
        const w = await fetchLiveWeather(user?.location || 'Dhaka');
        if (w) {
          setWeather(w);
          const temp = w.temperature;
          const code = w.condition;

          if (temp >= 38) {
            notes.push({
              id: 'weather-heat',
              type: 'warning',
              icon: Thermometer,
              title: 'তাপপ্রবাহ সতর্কতা',
              titleEn: 'Heat Alert',
              msg: `তাপমাত্রা ${temp}°C — গবাদিপশুকে ছায়ায় রাখুন ও বেশি পানি দিন।`,
              msgEn: `Temp ${temp}°C — Keep livestock in shade and increase water intake.`,
              time: 'এখনই / Just now',
            });
          }

          if (['Rain', 'Heavy Rain Showers', 'Thunderstorm'].includes(code)) {
            notes.push({
              id: 'weather-rain',
              type: 'info',
              icon: CloudRain,
              title: 'বৃষ্টির পূর্বাভাস',
              titleEn: 'Rain Advisory',
              msg: `${w.location}-এ ${code} চলছে। ফসলের জমিতে নিষ্কাশন নিশ্চিত করুন।`,
              msgEn: `${code} in ${w.location}. Ensure field drainage to prevent waterlogging.`,
              time: 'Live',
            });
          }

          if (w.windSpeed >= 25) {
            notes.push({
              id: 'weather-wind',
              type: 'warning',
              icon: Wind,
              title: 'ঝড়ো হাওয়া সতর্কতা',
              titleEn: 'High Wind Warning',
              msg: `বাতাসের গতি ${w.windSpeed} km/h। ফসল সুরক্ষার ব্যবস্থা নিন।`,
              msgEn: `Wind at ${w.windSpeed} km/h. Secure crops and poultry shelters.`,
              time: 'Live',
            });
          }

          // General weather farming tip
          notes.push({
            id: 'weather-tip',
            type: 'success',
            icon: Sparkles,
            title: `আবহাওয়া: ${w.condition}`,
            titleEn: `Weather: ${w.condition}`,
            msg: `${w.location} — তাপমাত্রা ${w.temperature}°C, আর্দ্রতা ${w.humidity}%।`,
            msgEn: `${w.location} — Temp ${w.temperature}°C, Humidity ${w.humidity}%.`,
            time: 'Live',
          });
        }
      } catch (e) {
        // ignore
      }

      // ── Task reminder ────────────────────────────────────────
      notes.push({
        id: 'task-reminder',
        type: 'info',
        icon: CheckCircle2,
        title: 'আজকের কাজ',
        titleEn: 'Today\'s Tasks',
        msg: 'আজকের খামারের কাজগুলো দেখতে Dashboard-এ যান।',
        msgEn: 'Check your pending farm tasks on the Dashboard.',
        time: 'আজকে / Today',
      });

      // ── AI scan suggestion ────────────────────────────────────
      notes.push({
        id: 'ai-scan',
        type: 'success',
        icon: Sparkles,
        title: 'AI স্ক্যান রিমাইন্ডার',
        titleEn: 'AI Scan Reminder',
        msg: 'এই সপ্তাহে ফসল বা পশুর ছবি আপলোড করে রোগ পরীক্ষা করুন।',
        msgEn: 'Upload a crop or animal photo this week for AI disease check.',
        time: '1 ঘণ্টা আগে / 1h ago',
      });

      setNotifications(notes);
    }

    buildNotifications();
  }, [user]);

  return { notifications, weather };
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const userMenuRef = useRef(null);
  const notifRef = useRef(null);

  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isLanding = location.pathname === '/';
  const { notifications } = useNotifications(isAuthenticated ? user : null);
  const unreadCount = notifications.length;

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = isAuthenticated ? [
    { path: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { path: '/crop-detection', label: t('nav.crops'), icon: Leaf },
    { path: '/livestock', label: t('nav.livestock'), icon: PawPrint },
    { path: '/animal-detection', label: t('nav.animalDetection'), icon: Bug },
    { path: '/ai-assistant', label: t('nav.aiAssistant'), icon: MessageSquare },
  ] : [];

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const displayName = language === 'bn'
    ? (user?.nameBn || user?.name || 'কৃষক')
    : (user?.name || user?.nameBn || 'Farmer');

  const isAvatarUrl = user?.avatar && (user.avatar.startsWith('http://') || user.avatar.startsWith('https://') || user.avatar.startsWith('data:image'));

  const notifColors = {
    warning: 'text-orange-500 bg-orange-50 dark:bg-orange-950/40',
    info: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40',
    success: 'text-green-600 bg-green-50 dark:bg-green-950/40',
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isLanding
        ? 'bg-white/90 dark:bg-[#0a120a]/90 backdrop-blur-md border-b border-gray-100 dark:border-[#2d4a2d]/60 shadow-sm'
        : 'bg-white/95 dark:bg-[#0c160c]/95 backdrop-blur-md border-b border-gray-100 dark:border-[#203920] shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2e7d32] to-[#4caf50] flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-xl">🌿</span>
            </div>
            <span className="text-xl font-bold text-[#1a1a2e] dark:text-white tracking-tight">
              KishanGhar
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#e8f5e9] dark:bg-[#2e7d32]/25 text-[#2e7d32] dark:text-[#81c784] shadow-sm'
                      : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#1a1a2e] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1a2e1a]'
                  }`}
                >
                  <link.icon size={16} className={isActive ? 'text-[#2e7d32] dark:text-[#81c784]' : 'text-[#94a3b8]'} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                  location.pathname === '/admin'
                    ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                    : 'text-amber-700 dark:text-amber-300 bg-amber-50/90 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60 hover:bg-amber-100 dark:hover:bg-amber-950/80'
                }`}
              >
                <Shield size={14} />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Right side utility actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search */}
            {isAuthenticated && (
              <div className="hidden xl:flex items-center relative">
                <Search size={15} className="absolute left-3 text-[#94a3b8]" />
                <input
                  type="text"
                  placeholder={t('nav.search')}
                  className="pl-8 pr-3 py-1.5 w-36 text-xs bg-gray-50 dark:bg-[#162216] border border-gray-200 dark:border-[#2d4a2d] rounded-lg outline-none focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/15 transition-all text-[#1a1a2e] dark:text-white placeholder-[#94a3b8]"
                />
              </div>
            )}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] hover:bg-gray-100 dark:hover:bg-[#1a2e1a] transition-all border border-transparent hover:border-gray-200 dark:hover:border-[#2d4a2d]"
              title={t('common.language')}
            >
              <Globe size={15} />
              <span>{language === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-[#64748b] dark:text-[#94a3b8] hover:bg-gray-100 dark:hover:bg-[#1a2e1a] transition-all border border-transparent hover:border-gray-200 dark:hover:border-[#2d4a2d]"
              title={isDark ? t('common.lightMode') : t('common.darkMode')}
            >
              {isDark ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
            </button>

            {/* ── Notifications Bell ──────────────────────────── */}
            {isAuthenticated && (
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => { setNotifOpen(!notifOpen); setUserMenuOpen(false); }}
                  className="relative p-2 rounded-xl text-[#64748b] dark:text-[#94a3b8] hover:bg-gray-100 dark:hover:bg-[#1a2e1a] transition-all border border-transparent hover:border-gray-200 dark:hover:border-[#2d4a2d]"
                  title="Notifications"
                >
                  <Bell size={17} className={notifOpen ? 'text-[#2e7d32]' : ''} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#0c160c] flex items-center justify-center">
                      <span className="text-[9px] text-white font-bold px-0.5">{unreadCount > 9 ? '9+' : unreadCount}</span>
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#162416] rounded-2xl shadow-xl border border-gray-100 dark:border-[#2d4a2d] overflow-hidden z-50"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-[#2d4a2d] bg-gray-50 dark:bg-[#121c12]">
                        <div className="flex items-center gap-2">
                          <Bell size={15} className="text-[#2e7d32]" />
                          <span className="text-sm font-bold text-[#1a1a2e] dark:text-white">
                            {language === 'bn' ? 'লাইভ নোটিফিকেশন' : 'Live Notifications'}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-white bg-[#2e7d32] px-2 py-0.5 rounded-full">
                          {unreadCount} Live
                        </span>
                      </div>

                      {/* Notification List */}
                      <div className="max-h-[380px] overflow-y-auto divide-y divide-gray-50 dark:divide-[#1e2e1e]">
                        {notifications.length === 0 ? (
                          <div className="text-center py-10 text-gray-400 text-sm">
                            <Bell size={28} className="mx-auto mb-2 opacity-30" />
                            <p>{language === 'bn' ? 'কোনো নোটিফিকেশন নেই' : 'No notifications'}</p>
                          </div>
                        ) : (
                          notifications.map((n) => {
                            const Icon = n.icon;
                            return (
                              <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#182818]/50 transition-colors">
                                <div className={`p-2 rounded-xl flex-shrink-0 ${notifColors[n.type]}`}>
                                  <Icon size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-[#1a1a2e] dark:text-white">
                                    {language === 'bn' ? n.title : n.titleEn}
                                  </p>
                                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                                    {language === 'bn' ? n.msg : n.msgEn}
                                  </p>
                                  <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                                    <Clock size={9} />
                                    {n.time}
                                  </p>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Footer */}
                      <div className="px-4 py-2.5 border-t border-gray-100 dark:border-[#2d4a2d] bg-gray-50 dark:bg-[#121c12]">
                        <Link
                          to="/dashboard"
                          onClick={() => setNotifOpen(false)}
                          className="text-xs text-[#2e7d32] dark:text-[#81c784] font-semibold hover:underline flex items-center gap-1"
                        >
                          {language === 'bn' ? 'ড্যাশবোর্ডে সব দেখুন →' : 'View all on Dashboard →'}
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* User Menu or Login/Register */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => { setUserMenuOpen(!userMenuOpen); setNotifOpen(false); }}
                  className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1a2e1a] transition-all border border-gray-100 dark:border-[#2d4a2d]"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-[#2e7d32] to-[#4caf50] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm ring-2 ring-[#4caf50]/20">
                    {isAvatarUrl ? (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span>{displayName.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <span className="hidden sm:inline-block max-w-[110px] truncate text-xs font-semibold text-[#1a1a2e] dark:text-white text-left">
                    {displayName}
                  </span>
                  <ChevronDown size={14} className={`text-[#94a3b8] transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#162416] rounded-2xl shadow-xl border border-gray-100 dark:border-[#2d4a2d] overflow-hidden z-50 p-1.5"
                    >
                      <div className="p-3 bg-gray-50 dark:bg-[#121c12] rounded-xl mb-1.5">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-[#1a1a2e] dark:text-white truncate">{displayName}</p>
                          {isAdmin && (
                            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-1.5 py-0.5 rounded">
                              Admin
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#64748b] dark:text-[#94a3b8] truncate mt-0.5">{user?.email}</p>
                      </div>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50/90 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-950/80 transition-colors mb-1 border border-amber-200/60 dark:border-amber-800/40"
                        >
                          <Shield size={15} className="text-amber-600 dark:text-amber-400" />
                          <span>Admin Control Center</span>
                        </Link>
                      )}

                      <Link
                        to="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#1a1a2e] dark:text-white hover:bg-[#e8f5e9] dark:hover:bg-[#2e7d32]/20 hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors"
                      >
                        <LayoutDashboard size={15} />
                        {t('nav.dashboard')}
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#1a1a2e] dark:text-white hover:bg-[#e8f5e9] dark:hover:bg-[#2e7d32]/20 hover:text-[#2e7d32] dark:hover:text-[#81c784] transition-colors"
                      >
                        <User size={15} />
                        {t('nav.profile')}
                      </Link>

                      <div className="border-t border-gray-100 dark:border-[#2d4a2d] my-1" />

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors w-full text-left"
                      >
                        <LogOut size={15} />
                        {t('nav.logout')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className="px-3.5 py-1.5 text-xs font-medium text-[#2e7d32] dark:text-[#81c784] hover:bg-[#e8f5e9] dark:hover:bg-[#2e7d32]/10 rounded-xl transition-all">
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="btn-primary text-xs !py-1.5 !px-3.5">
                  {t('nav.register')}
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-[#64748b] dark:text-[#94a3b8] hover:bg-gray-100 dark:hover:bg-[#1a2e1a] transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-gray-100 dark:border-[#2d4a2d] bg-white dark:bg-[#0c160c] overflow-hidden shadow-lg"
          >
            <div className="px-4 py-3 space-y-1">
              {isAuthenticated ? (
                <>
                  {navLinks.map(link => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-[#e8f5e9] dark:bg-[#2e7d32]/20 text-[#2e7d32] dark:text-[#81c784]'
                            : 'text-[#64748b] dark:text-[#94a3b8]'
                        }`}
                      >
                        <link.icon size={18} />
                        {link.label}
                      </Link>
                    );
                  })}
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50"
                    >
                      <Shield size={18} className="text-amber-600" />
                      Admin Control Center
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-[#64748b] dark:text-[#94a3b8]"
                  >
                    <User size={18} />
                    {t('nav.profile')}
                  </Link>
                  <div className="border-t border-gray-100 dark:border-[#2d4a2d] my-2" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 w-full"
                  >
                    <LogOut size={18} />
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary text-center justify-center">
                    {t('nav.login')}
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary text-center justify-center">
                    {t('nav.register')}
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
