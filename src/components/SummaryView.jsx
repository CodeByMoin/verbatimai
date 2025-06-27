import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, CheckCircle, Star, Calendar, Download, RotateCcw, TrendingUp, Sparkles } from 'lucide-react';

const SummaryCard = ({ icon: Icon, title, children, color = "blue", darkMode, index = 0, className = "" }) => {
  const colorClasses = {
    blue: {
      gradient: "from-blue-600 to-indigo-600",
      bgGradient: darkMode ? "from-blue-600/5 via-transparent to-indigo-600/5" : "from-blue-300/10 via-transparent to-indigo-300/10",
      iconColor: darkMode ? "text-blue-400" : "text-blue-600",
      glow: "shadow-blue-500/25"
    },
    indigo: {
      gradient: "from-indigo-600 to-purple-600",
      bgGradient: darkMode ? "from-indigo-600/5 via-transparent to-purple-600/5" : "from-indigo-300/10 via-transparent to-purple-300/10",
      iconColor: darkMode ? "text-indigo-400" : "text-indigo-600",
      glow: "shadow-indigo-500/25"
    },
    purple: {
      gradient: "from-purple-600 to-pink-600",
      bgGradient: darkMode ? "from-purple-600/5 via-transparent to-pink-600/5" : "from-purple-300/10 via-transparent to-pink-300/10",
      iconColor: darkMode ? "text-purple-400" : "text-purple-600",
      glow: "shadow-purple-500/25"
    },
    green: {
      gradient: "from-green-600 to-emerald-600",
      bgGradient: darkMode ? "from-emerald-600/5 via-transparent to-green-600/5" : "from-emerald-300/10 via-transparent to-green-300/10",
      iconColor: darkMode ? "text-emerald-400" : "text-emerald-600",
      glow: "shadow-emerald-500/25"
    },
    orange: {
      gradient: "from-orange-600 to-red-600",
      bgGradient: darkMode ? "from-orange-600/5 via-transparent to-red-600/5" : "from-orange-300/10 via-transparent to-red-300/10",
      iconColor: darkMode ? "text-orange-400" : "text-orange-600",
      glow: "shadow-orange-500/25"
    },
    cyan: {
      gradient: "from-cyan-600 to-blue-600",
      bgGradient: darkMode ? "from-cyan-600/5 via-transparent to-blue-600/5" : "from-cyan-300/10 via-transparent to-blue-300/10",
      iconColor: darkMode ? "text-cyan-400" : "text-cyan-600",
      glow: "shadow-cyan-500/25"
    }
  };

  const colorConfig = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      whileHover={{ 
        scale: 1.02, 
        y: -4,
        boxShadow: darkMode 
          ? `0 20px 40px -12px rgba(147, 51, 234, 0.3)` 
          : `0 20px 40px -12px rgba(79, 70, 229, 0.2)`
      }}
      className={`${
        darkMode 
          ? 'bg-gray-900/80 border-gray-700/50' 
          : 'bg-white/80 border-white/50'
      } backdrop-blur-xl border-2 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group ${className}`}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorConfig.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'} flex items-center`}>
            <motion.div
              whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className={`w-10 h-10 bg-gradient-to-br ${colorConfig.gradient} rounded-xl flex items-center justify-center mr-3 shadow-lg ${colorConfig.glow} relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent animate-shine" />
              <Icon size={18} className="text-white relative z-10" />
            </motion.div>
            {title}
          </h3>
          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping opacity-75" />
        </div>
        {children}
      </div>
    </motion.div>
  );
};

const ActionButton = ({ onClick, icon: Icon, children, variant = "primary", darkMode, disabled = false }) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25",
    success: "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-emerald-500/25",
    danger: "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-red-500/25"
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-xl relative overflow-hidden group ${
        disabled ? 'opacity-50 cursor-not-allowed' : variants[variant]
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100  transition-opacity duration-500" />
      <Icon size={16} className="relative z-10" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default function SummaryView({ summary = {}, darkMode, handleDownloadSummary, handleDownloadBoth, onReset }) {
  const {
    title = 'Untitled',
    duration = 'N/A',
    sentiment = 'unknown',
    confidence = 0,
    attendees = [],
    action_items = [],
    decisions = [],
    key_points = [],
    topics_discussed = [],
    next_meeting = 'To be scheduled'
  } = summary;

  const sentimentLabel = sentiment.charAt(0).toUpperCase() + sentiment.slice(1);

  return (
    <motion.div
      className="max-w-7xl mx-auto mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-full h-96 ${
          darkMode 
            ? 'bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-indigo-600/5' 
            : 'bg-gradient-to-r from-purple-300/10 via-blue-300/10 to-indigo-300/10'
        } rounded-full filter blur-3xl animate-pulse-slow`} />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 relative z-10"
      >
        <div className="flex items-center justify-center mb-4">
          <div className={`w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl shadow-emerald-500/25 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
            <BookOpen size={24} className="text-white relative z-10" />
            <Sparkles size={12} className="absolute -top-1 -right-1 text-yellow-400 animate-ping" />
          </div>
          <div className="text-left">
            <h2 className={`text-3xl md:text-4xl font-black ${darkMode ? 'text-gray-100' : 'text-gray-900'} mb-1`}>
              Meeting Intelligence
            </h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold text-lg`}>
              AI-powered insights and actionable intelligence
            </p>
          </div>
        </div>
        
        <div className={`inline-flex items-center space-x-2 ${
          darkMode ? 'bg-gray-900/60 border-gray-700/50' : 'bg-white/60 border-white/50'
        } rounded-full px-6 py-3 border backdrop-blur-sm shadow-lg`}>
          <CheckCircle size={16} className="text-green-500" />
          <span className={`${darkMode ? 'text-gray-100' : 'text-gray-800'} font-bold`}>
            {confidence}% AI Confidence
          </span>
          <TrendingUp size={14} className="text-emerald-500 animate-pulse" />
        </div>
      </motion.div>

      {/* Meeting Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <SummaryCard icon={Users} title="Meeting Overview" color="blue" darkMode={darkMode} index={0}>
          <div className="space-y-4">
            <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} space-y-3`}>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Title:</span>
                <span className={`${darkMode ? 'text-gray-100' : 'text-gray-900'} font-bold`}>{title}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Duration:</span>
                <span className={`${darkMode ? 'text-gray-100' : 'text-gray-900'} font-bold`}>{duration}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Sentiment:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  sentiment === 'positive'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : sentiment === 'negative'
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                    : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                } shadow-lg`}>
                  {sentimentLabel}
                </span>
              </div>
            </div>
          </div>
        </SummaryCard>

        <SummaryCard icon={Users} title="Attendees" color="purple" darkMode={darkMode} index={1}>
          <div className="space-y-3">
            {attendees.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {attendees.map((attendee, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`${
                      darkMode 
                        ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 border-purple-500/30' 
                        : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200'
                    } px-3 py-2 rounded-xl text-sm font-semibold border shadow-sm backdrop-blur-sm`}
                  >
                    {attendee}
                  </motion.span>
                ))}
              </div>
            ) : (
              <div className={`${darkMode ? 'text-gray-500' : 'text-gray-400'} italic text-center py-4`}>
                No attendees identified
              </div>
            )}
          </div>
        </SummaryCard>

        <SummaryCard icon={Calendar} title="Next Steps" color="cyan" darkMode={darkMode} index={2}>
          <div className="flex items-center space-x-3">
            <Calendar size={20} className={darkMode ? 'text-cyan-400' : 'text-cyan-600'} />
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-800'} font-semibold`}>
              {next_meeting}
            </span>
          </div>
        </SummaryCard>
      </div>

      {/* Action Items and Decisions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SummaryCard icon={CheckCircle} title="Action Items" color="orange" darkMode={darkMode} index={3}>
          <div className="space-y-3">
            {action_items.length > 0 ? (
              action_items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-start space-x-3 p-4 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-orange-600/10 to-red-600/10 border-orange-500/20' 
                      : 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200'
                  } rounded-xl border backdrop-blur-sm group hover:shadow-md transition-all duration-300`}
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle size={12} className="text-white" />
                  </div>
                  <span className={`${darkMode ? 'text-gray-200' : 'text-gray-800'} flex-1 font-medium leading-relaxed`}>
                    {item}
                  </span>
                </motion.div>
              ))
            ) : (
              <div className={`${darkMode ? 'text-gray-500' : 'text-gray-400'} italic text-center py-8`}>
                No action items identified
              </div>
            )}
          </div>
        </SummaryCard>

        <SummaryCard icon={Star} title="Key Decisions" color="green" darkMode={darkMode} index={4}>
          <div className="space-y-3">
            {decisions.length > 0 ? (
              decisions.map((decision, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start space-x-3 group"
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 shadow-lg animate-pulse" />
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-800'} font-medium leading-relaxed`}>
                    {decision}
                  </span>
                </motion.div>
              ))
            ) : (
              <div className={`${darkMode ? 'text-gray-500' : 'text-gray-400'} italic text-center py-8`}>
                No decisions recorded
              </div>
            )}
          </div>
        </SummaryCard>
      </div>

      {/* Key Discussion Points */}
      <SummaryCard icon={Star} title="Key Discussion Points" color="indigo" darkMode={darkMode} index={5} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {key_points.length > 0 ? (
            key_points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`${
                  darkMode 
                    ? 'bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border-indigo-500/20 hover:bg-indigo-600/20' 
                    : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 hover:shadow-lg'
                } p-4 rounded-xl border transition-all duration-300 group`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 bg-gradient-to-r ${
                    i % 2 === 0 ? 'from-blue-500 to-purple-500' : 'from-emerald-500 to-green-500'
                  } rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                    {i + 1}
                  </div>
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-800'} flex-1 font-medium leading-relaxed`}>
                    {point}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className={`${darkMode ? 'text-gray-500' : 'text-gray-400'} italic text-center py-8 col-span-2`}>
              No key points available
            </div>
          )}
        </div>
      </SummaryCard>

      {/* Topics Discussed */}
      <SummaryCard icon={BookOpen} title="Topics Discussed" color="purple" darkMode={darkMode} index={6} className="mb-8">
        <div className="flex flex-wrap gap-3">
          {topics_discussed.length > 0 ? (
            topics_discussed.map((topic, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`${
                  darkMode 
                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 border-purple-500/30' 
                    : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200'
                } px-4 py-2 rounded-xl text-sm font-semibold border shadow-lg backdrop-blur-sm hover:scale-105 transition-transform duration-200`}
              >
                {topic}
              </motion.span>
            ))
          ) : (
            <div className={`${darkMode ? 'text-gray-500' : 'text-gray-400'} italic text-center py-8 w-full`}>
              No topics discussed
            </div>
          )}
        </div>
      </SummaryCard>

      {/* Action Buttons */}
      <SummaryCard icon={Download} title="Actions" color="blue" darkMode={darkMode} index={7}>
        <div className="flex flex-wrap gap-4">
          <ActionButton
            onClick={handleDownloadSummary}
            icon={Download}
            variant="primary"
            darkMode={darkMode}
          >
            Download Summary
          </ActionButton>
          
          <ActionButton
            onClick={handleDownloadBoth}
            icon={BookOpen}
            variant="success"
            darkMode={darkMode}
          >
            Download Complete Minutes
          </ActionButton>
          
          <ActionButton
            onClick={onReset}
            icon={RotateCcw}
            variant="danger"
            darkMode={darkMode}
          >
            Reset Everything
          </ActionButton>
        </div>
      </SummaryCard>

      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) ; }
          100% { transform: translateX(200%) ; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </motion.div>
  );
}