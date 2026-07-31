import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Sun, Moon, Globe, Bell, Search,
  Home, LayoutDashboard, Leaf, Bug, PawPrint, Stethoscope,
  MessageSquare, ShoppingBag, User, LogOut, ChevronDown
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isLanding = location.pathname === '/';

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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isLanding
        ? 'bg-white/80 dark:bg-[#0f1a0f]/80 backdrop-blur-xl border-b border-gray-100 dark:border-[#2d4a2d]/50'
        : 'bg-white dark:bg-[#0f1a0f] border-b border-gray-100 dark:border-[#2d4a2d]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2e7d32] to-[#4caf50] flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-white text-lg">🌿</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#1a1a2e] dark:text-white leading-tight tracking-tight">
                KishanGhar
              </span>
              <span className="text-[10px] text-[#64748b] dark:text-[#94a3b8] leading-tight -mt-0.5">
                কিষাণঘর
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-[#e8f5e9] dark:bg-[#2e7d32]/20 text-[#2e7d32] dark:text-[#81c784]'
                    : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#1a1a2e] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1a2e1a]'
                }`}
              >
                <link.icon size={16} />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search (desktop only, authenticated) */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center relative">
                <Search size={16} className="absolute left-3 text-[#94a3b8]" />
                <input
                  type="text"
                  placeholder={t('nav.search')}
                  className="pl-9 pr-4 py-1.5 w-40 text-sm bg-gray-50 dark:bg-[#1a2e1a] border border-gray-200 dark:border-[#2d4a2d] rounded-lg outline-none focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/10 transition-all text-[#1a1a2e] dark:text-white placeholder-[#94a3b8]"
                />
              </div>
            )}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium text-[#64748b] dark:text-[#94a3b8] hover:bg-gray-50 dark:hover:bg-[#1a2e1a] transition-all"
              title={t('common.language')}
            >
              <Globe size={16} />
              <span className="hidden sm:inline text-xs font-semibold">{language === 'en' ? 'বাং' : 'EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[#64748b] dark:text-[#94a3b8] hover:bg-gray-50 dark:hover:bg-[#1a2e1a] transition-all"
              title={isDark ? t('common.lightMode') : t('common.darkMode')}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Notifications (authenticated) */}
            {isAuthenticated && (
              <button className="relative p-2 rounded-lg text-[#64748b] dark:text-[#94a3b8] hover:bg-gray-50 dark:hover:bg-[#1a2e1a] transition-all">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            )}

            {/* User Menu or Login */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1a2e1a] transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-[#e8f5e9] dark:bg-[#2e7d32]/30 flex items-center justify-center text-sm">
                    {user?.avatar || '👤'}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-[#1a1a2e] dark:text-white">
                    {language === 'bn' ? user?.nameBn : user?.name}
                  </span>
                  <ChevronDown size={14} className={`text-[#94a3b8] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#1a2e1a] rounded-xl shadow-lg border border-gray-100 dark:border-[#2d4a2d] overflow-hidden"
                    >
                      <Link
                        to="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#1a1a2e] dark:text-white hover:bg-gray-50 dark:hover:bg-[#162016] transition-colors"
                      >
                        <LayoutDashboard size={16} />
                        {t('nav.dashboard')}
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#1a1a2e] dark:text-white hover:bg-gray-50 dark:hover:bg-[#162016] transition-colors"
                      >
                        <User size={16} />
                        {t('nav.profile')}
                      </Link>
                      <div className="border-t border-gray-100 dark:border-[#2d4a2d]" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors w-full"
                      >
                        <LogOut size={16} />
                        {t('nav.logout')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-[#2e7d32] dark:text-[#81c784] hover:bg-[#e8f5e9] dark:hover:bg-[#2e7d32]/10 rounded-lg transition-all"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm !py-2"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-[#64748b] dark:text-[#94a3b8] hover:bg-gray-50 dark:hover:bg-[#1a2e1a] transition-all"
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
            className="lg:hidden border-t border-gray-100 dark:border-[#2d4a2d] bg-white dark:bg-[#0f1a0f] overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {isAuthenticated ? (
                <>
                  {navLinks.map(link => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        location.pathname === link.path
                          ? 'bg-[#e8f5e9] dark:bg-[#2e7d32]/20 text-[#2e7d32] dark:text-[#81c784]'
                          : 'text-[#64748b] dark:text-[#94a3b8]'
                      }`}
                    >
                      <link.icon size={18} />
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 dark:border-[#2d4a2d] my-2" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 w-full"
                  >
                    <LogOut size={18} />
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="btn-secondary text-center justify-center"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary text-center justify-center"
                  >
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
