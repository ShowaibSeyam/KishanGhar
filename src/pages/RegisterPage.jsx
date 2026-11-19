import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    farmSize: '',
    location: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');
  const [localError, setLocalError] = useState('');

  const { t } = useLanguage();
  const { register, loginWithGoogle, loginWithFacebook, error, clearError } = useAuth();
  const navigate = useNavigate();

  const displayError = localError || error;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setLocalError('');
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Password দুটো মিলছে না।');
      return;
    }
    if (formData.password.length < 6) {
      setLocalError('Password কমপক্ষে ৬ অক্ষর হতে হবে।');
      return;
    }

    setLoading(true);
    const result = await register(formData);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  const handleGoogle = async () => {
    setSocialLoading('google');
    clearError();
    setLocalError('');
    const result = await loginWithGoogle();
    setSocialLoading('');
    if (result.success) navigate('/dashboard');
  };

  const handleFacebook = async () => {
    setSocialLoading('facebook');
    clearError();
    setLocalError('');
    const result = await loginWithFacebook();
    setSocialLoading('');
    if (result.success) navigate('/dashboard');
  };

  const inputField = (name, label, icon, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-[#1a1a2e] dark:text-white mb-1.5">
        {label}
      </label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]">{icon}</span>}
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`input ${icon ? '!pl-10' : ''} ${type === 'password' ? '!pr-10' : ''}`}
          required
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#64748b]"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-[#f8faf8] dark:bg-[#0a120a]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2e7d32] to-[#4caf50] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl">🌿</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-1">
            {t('auth.registerTitle')}
          </h1>
          <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
            {t('auth.registerSubtitle')}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-[#1a2e1a] rounded-2xl border border-gray-100 dark:border-[#2d4a2d] shadow-sm p-8">

          {/* Error Banner */}
          {displayError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-3 mb-5"
            >
              <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-600 dark:text-red-400">{displayError}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {inputField('name', t('auth.fullName'), <User size={18} />, 'text', 'Rahim Uddin')}
            {inputField('email', t('auth.email'), <Mail size={18} />, 'email', 'farmer@kishanghar.com')}
            {inputField('phone', t('auth.phone'), <Phone size={18} />, 'tel', '+880 1712-345678')}

            <div className="grid grid-cols-2 gap-3">
              {inputField('farmSize', t('auth.farmSize'), null, 'text', '5 acres')}
              {inputField('location', t('auth.location'), null, 'text', 'Rangpur')}
            </div>

            {inputField('password', t('auth.password'), <Lock size={18} />, 'password', '••••••••')}

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#1a1a2e] dark:text-white mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input !pl-10"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !!socialLoading}
              className="btn-primary w-full justify-center !py-3 text-base disabled:opacity-50 !mt-6"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {t('auth.signUp')}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-[#2d4a2d]" />
            <span className="text-xs text-[#94a3b8] font-medium">{t('auth.orContinueWith')}</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-[#2d4a2d]" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google */}
            <button
              onClick={handleGoogle}
              disabled={loading || !!socialLoading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#2d4a2d] text-sm font-medium text-[#1a1a2e] dark:text-white hover:bg-gray-50 dark:hover:bg-[#162016] transition-colors disabled:opacity-50"
            >
              {socialLoading === 'google' ? (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-[#4285F4] rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              {t('auth.google')}
            </button>

            {/* Facebook */}
            <button
              onClick={handleFacebook}
              disabled={loading || !!socialLoading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#2d4a2d] text-sm font-medium text-[#1a1a2e] dark:text-white hover:bg-gray-50 dark:hover:bg-[#162016] transition-colors disabled:opacity-50"
            >
              {socialLoading === 'facebook' ? (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-[#1877F2] rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              )}
              {t('auth.facebook')}
            </button>
          </div>
        </div>

        {/* Login link */}
        <p className="text-center mt-6 text-sm text-[#64748b] dark:text-[#94a3b8]">
          {t('auth.hasAccount')}{' '}
          <Link to="/login" className="text-[#2e7d32] dark:text-[#81c784] font-semibold hover:underline">
            {t('auth.signIn')}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
