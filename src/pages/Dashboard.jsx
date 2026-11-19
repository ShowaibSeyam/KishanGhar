import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CloudSun, Droplets, Wind, CheckCircle2, Circle, AlertTriangle,
  TrendingUp, TrendingDown, Leaf, PawPrint, Brain, Bell,
  ArrowRight, Sparkles, BarChart3, Calendar
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { weatherData, tasks as initialTasks, crops, livestock, aiInsights, alerts, incomeData } from '../data/mockData';
import { Link } from 'react-router-dom';
import { fetchLiveWeather } from '../services/weather';

const cardAnim = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [currentWeather, setCurrentWeather] = useState(weatherData);
  const [taskList, setTaskList] = useState(initialTasks);

  useEffect(() => {
    async function loadWeather() {
      const data = await fetchLiveWeather(user?.location || 'Dhaka');
      if (data) setCurrentWeather(data);
    }
    loadWeather();
  }, [user?.location]);

  const toggleTask = (id) => {
    setTaskList(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const totalIncome = 72000;
  const totalExpense = 27000;
  const cowCount = livestock.filter(a => a.type === 'cow').length;
  const goatCount = livestock.filter(a => a.type === 'goat').length;
  const chickenCount = livestock.filter(a => a.type === 'chicken').reduce((sum, a) => sum + (a.count || 1), 0);
  const duckCount = livestock.filter(a => a.type === 'duck').reduce((sum, a) => sum + (a.count || 1), 0);

  return (
    <div className="min-h-screen bg-[#f8faf8] dark:bg-[#0a120a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3"
        >
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e] dark:text-white">
              {t('dashboard.welcome')}, {language === 'bn' ? user?.nameBn || 'কৃষক' : user?.name || 'Farmer'} 👋
            </h1>
            <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
              {language === 'bn' ? 'আপনার খামারের সারাংশ দেখুন' : "Here's an overview of your farm today"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#64748b] dark:text-[#94a3b8] flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date().toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: t('dashboard.totalCrops'), value: crops.length, icon: Leaf, color: '#2e7d32', bg: '#e8f5e9', change: '+2' },
            { label: t('dashboard.totalAnimals'), value: cowCount + goatCount + chickenCount + duckCount, icon: PawPrint, color: '#1565c0', bg: '#e3f2fd', change: '+5' },
            { label: t('dashboard.todayTasks'), value: `${taskList.filter(t => t.done).length}/${taskList.length}`, icon: CheckCircle2, color: '#e65100', bg: '#fff3e0', change: null },
            { label: t('dashboard.aiRecommendations'), value: aiInsights.length, icon: Brain, color: '#6a1b9a', bg: '#f3e5f5', change: 'New' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              {...cardAnim}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d] hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.bg }}>
                  <stat.icon size={20} style={{ color: stat.color }} />
                </div>
                {stat.change && (
                  <span className="text-xs font-semibold text-[#4caf50] bg-[#e8f5e9] dark:bg-[#2e7d32]/20 px-2 py-0.5 rounded-full">
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-[#1a1a2e] dark:text-white">{stat.value}</p>
              <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weather Card */}
            <motion.div {...cardAnim} transition={{ delay: 0.2 }} className="p-5 rounded-xl bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                      <CloudSun size={16} />
                      <span>{t('dashboard.weatherTitle')}</span>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Live</span>
                    </div>
                    <p className="text-sm text-white/70">
                      {language === 'bn' ? currentWeather.locationBn || currentWeather.location : currentWeather.location}
                    </p>
                  </div>
                  <span className="text-5xl">{currentWeather.icon}</span>
                </div>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-5xl font-bold">{currentWeather.temperature}°</span>
                  <span className="text-lg text-white/70 mb-1">{language === 'bn' ? currentWeather.conditionBn : currentWeather.condition}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5 text-sm text-white/80">
                    <Droplets size={14} />
                    <span>{currentWeather.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-white/80">
                    <Wind size={14} />
                    <span>{currentWeather.windSpeed} km/h</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/15">
                  {currentWeather.forecast.map((day, i) => (
                    <div key={i} className="text-center flex-1">
                      <p className="text-xs text-white/60 mb-1">{day.day}</p>
                      <span className="text-lg">{day.icon}</span>
                      <p className="text-xs font-medium mt-1">{day.temp}°</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Farm Analytics Chart */}
            <motion.div {...cardAnim} transition={{ delay: 0.3 }} className="p-5 rounded-xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-[#1a1a2e] dark:text-white flex items-center gap-2">
                  <BarChart3 size={18} className="text-[#4caf50]" />
                  {t('dashboard.analyticsTitle')}
                </h3>
                <span className="text-xs text-[#94a3b8]">Last 8 months</span>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={incomeData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4caf50" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      fontSize: '13px',
                    }}
                    formatter={(value) => [`৳${value.toLocaleString()}`, '']}
                  />
                  <Area type="monotone" dataKey="income" stroke="#4caf50" strokeWidth={2.5} fill="url(#incomeGrad)" name={language === 'bn' ? 'আয়' : 'Income'} />
                  <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} fill="url(#expenseGrad)" name={language === 'bn' ? 'ব্যয়' : 'Expense'} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* My Crops */}
            <motion.div {...cardAnim} transition={{ delay: 0.4 }} className="p-5 rounded-xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-[#1a1a2e] dark:text-white flex items-center gap-2">
                  <Leaf size={18} className="text-[#4caf50]" />
                  {t('dashboard.cropsTitle')}
                </h3>
                <Link to="/crop-detection" className="text-xs text-[#2e7d32] dark:text-[#81c784] font-medium flex items-center gap-1 hover:underline">
                  {t('dashboard.viewAll')} <ArrowRight size={12} />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {crops.slice(0, 6).map((crop, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#f8faf8] dark:bg-[#162016] border border-gray-100 dark:border-[#2d4a2d]/50 hover:border-[#4caf50]/30 transition-colors">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-2xl">{crop.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#1a1a2e] dark:text-white truncate">
                          {language === 'bn' ? crop.nameBn : crop.name}
                        </p>
                        <p className="text-xs text-[#94a3b8]">{crop.area}</p>
                      </div>
                      <span className={`badge text-[10px] ${
                        crop.health === 'excellent' ? 'badge-success' :
                        crop.health === 'good' ? 'badge-info' : 'badge-warning'
                      }`}>
                        {crop.health === 'warning' ? '⚠️' : '✓'}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-gray-200 dark:bg-[#2d4a2d] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#2e7d32] to-[#4caf50] transition-all duration-1000"
                        style={{ width: `${crop.progress}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-[#94a3b8] mt-1">{crop.progress}% {language === 'bn' ? 'সম্পন্ন' : 'complete'}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            {/* Income & Expense Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              <motion.div {...cardAnim} transition={{ delay: 0.3 }} className="p-4 rounded-xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[#64748b] dark:text-[#94a3b8]">{t('dashboard.incomeTitle')}</span>
                  <TrendingUp size={16} className="text-[#4caf50]" />
                </div>
                <p className="text-xl font-bold text-[#1a1a2e] dark:text-white">৳{totalIncome.toLocaleString()}</p>
                <p className="text-xs text-[#4caf50] font-medium mt-1">↑ 12% {language === 'bn' ? 'গত মাস থেকে' : 'from last month'}</p>
              </motion.div>

              <motion.div {...cardAnim} transition={{ delay: 0.35 }} className="p-4 rounded-xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[#64748b] dark:text-[#94a3b8]">{t('dashboard.expenseTitle')}</span>
                  <TrendingDown size={16} className="text-[#ef4444]" />
                </div>
                <p className="text-xl font-bold text-[#1a1a2e] dark:text-white">৳{totalExpense.toLocaleString()}</p>
                <p className="text-xs text-[#ef4444] font-medium mt-1">↓ 8% {language === 'bn' ? 'গত মাস থেকে' : 'from last month'}</p>
              </motion.div>
            </div>

            {/* Today's Tasks */}
            <motion.div {...cardAnim} transition={{ delay: 0.4 }} className="p-5 rounded-xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-[#1a1a2e] dark:text-white flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-[#4caf50]" />
                  {t('dashboard.tasksTitle')}
                </h3>
                <span className="text-xs text-[#94a3b8]">
                  {taskList.filter(t => t.done).length}/{taskList.length}
                </span>
              </div>
              <div className="space-y-2.5">
                {taskList.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="flex items-start gap-2.5 cursor-pointer p-1.5 -mx-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-[#162016] transition-colors"
                  >
                    {task.done ? (
                      <CheckCircle2 size={18} className="text-[#4caf50] mt-0.5 flex-shrink-0" />
                    ) : (
                      <Circle size={18} className="text-[#94a3b8] mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-sm select-none ${task.done ? 'line-through text-[#94a3b8]' : 'text-[#1a1a2e] dark:text-white'}`}>
                      {language === 'bn' ? task.titleBn : task.title}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Insights */}
            <motion.div {...cardAnim} transition={{ delay: 0.5 }} className="p-5 rounded-xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-[#1a1a2e] dark:text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-[#4caf50]" />
                  {t('dashboard.aiInsightsTitle')}
                </h3>
                <span className="badge badge-info text-[10px]">{t('dashboard.demoPreview')}</span>
              </div>
              <div className="space-y-3">
                {aiInsights.map((insight) => (
                  <div key={insight.id} className={`p-3 rounded-xl border ${
                    insight.type === 'warning' ? 'bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20' :
                    insight.type === 'success' ? 'bg-green-50 dark:bg-green-500/10 border-green-100 dark:border-green-500/20' :
                    'bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20'
                  }`}>
                    <div className="flex items-start gap-2">
                      <span className="text-lg mt-0.5">{insight.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-[#1a1a2e] dark:text-white mb-0.5">
                          {language === 'bn' ? insight.titleBn : insight.title}
                        </p>
                        <p className="text-xs text-[#64748b] dark:text-[#94a3b8] leading-relaxed">
                          {language === 'bn' ? insight.descriptionBn : insight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-center text-[#94a3b8] mt-3 italic">
                {language === 'bn' ? '🌱 কিষাণঘর স্মার্ট এআই দ্বারা স্বয়ংক্রিয় সুপারিশকৃত' : '🌱 Powered by KishanGhar Smart Agricultural AI'}
              </p>
            </motion.div>

            {/* My Livestock Summary */}
            <motion.div {...cardAnim} transition={{ delay: 0.55 }} className="p-5 rounded-xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-[#1a1a2e] dark:text-white flex items-center gap-2">
                  <PawPrint size={18} className="text-[#1565c0]" />
                  {t('dashboard.livestockTitle')}
                </h3>
                <Link to="/livestock" className="text-xs text-[#2e7d32] dark:text-[#81c784] font-medium flex items-center gap-1 hover:underline">
                  {t('dashboard.viewAll')} <ArrowRight size={12} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { emoji: '🐄', label: language === 'bn' ? 'গরু' : 'Cows', count: cowCount },
                  { emoji: '🐐', label: language === 'bn' ? 'ছাগল' : 'Goats', count: goatCount },
                  { emoji: '🐔', label: language === 'bn' ? 'মুরগি' : 'Chickens', count: chickenCount },
                  { emoji: '🦆', label: language === 'bn' ? 'হাঁস' : 'Ducks', count: duckCount },
                ].map((animal, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#f8faf8] dark:bg-[#162016] text-center hover:bg-[#e8f5e9] dark:hover:bg-[#2e7d32]/10 transition-colors cursor-pointer">
                    <span className="text-2xl">{animal.emoji}</span>
                    <p className="text-lg font-bold text-[#1a1a2e] dark:text-white mt-1">{animal.count}</p>
                    <p className="text-xs text-[#94a3b8]">{animal.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Alerts */}
            <motion.div {...cardAnim} transition={{ delay: 0.6 }} className="p-5 rounded-xl bg-white dark:bg-[#1a2e1a] border border-gray-100 dark:border-[#2d4a2d]">
              <h3 className="text-base font-semibold text-[#1a1a2e] dark:text-white mb-3 flex items-center gap-2">
                <Bell size={18} className="text-[#e65100]" />
                {t('dashboard.alertsTitle')}
              </h3>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      alert.type === 'warning' ? 'bg-orange-400' :
                      alert.type === 'danger' ? 'bg-red-400' : 'bg-blue-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1a1a2e] dark:text-white">
                        {language === 'bn' ? alert.titleBn : alert.title}
                      </p>
                      <p className="text-xs text-[#94a3b8] mt-0.5 truncate">
                        {language === 'bn' ? alert.messageBn : alert.message}
                      </p>
                      <p className="text-[10px] text-[#94a3b8] mt-1">{language === 'bn' ? alert.timeBn : alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
