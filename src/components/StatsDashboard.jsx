import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, CheckCircle, Star, Clock, TrendingUp, Activity } from 'lucide-react';

const StatsCard = ({ icon: Icon, title, value, subtitle, color = "blue", darkMode, index = 0 }) => {
  const colorClasses = {
    blue: {
      gradient: "from-blue-600 to-indigo-600",
      iconBg: darkMode ? "bg-blue-600/20" : "bg-blue-100",
      iconColor: darkMode ? "text-blue-400" : "text-blue-600",
      glow: "shadow-blue-500/25"
    },
    indigo: {
      gradient: "from-indigo-600 to-purple-600",
      iconBg: darkMode ? "bg-indigo-600/20" : "bg-indigo-100",
      iconColor: darkMode ? "text-indigo-400" : "text-indigo-600",
      glow: "shadow-indigo-500/25"
    },
    purple: {
      gradient: "from-purple-600 to-pink-600",
      iconBg: darkMode ? "bg-purple-600/20" : "bg-purple-100",
      iconColor: darkMode ? "text-purple-400" : "text-purple-600",
      glow: "shadow-purple-500/25"
    },
    green: {
      gradient: "from-green-600 to-emerald-600",
      iconBg: darkMode ? "bg-emerald-600/20" : "bg-emerald-100",
      iconColor: darkMode ? "text-emerald-400" : "text-emerald-600",
      glow: "shadow-emerald-500/25"
    },
    orange: {
      gradient: "from-orange-600 to-red-600",
      iconBg: darkMode ? "bg-orange-600/20" : "bg-orange-100",
      iconColor: darkMode ? "text-orange-400" : "text-orange-600",
      glow: "shadow-orange-500/25"
    }
  };

  const colorConfig = colorClasses[color];

  return (
    <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
            duration: 0.6,
            delay: index * 0.1,
            type: "spring",
            stiffness: 200,
            damping: 20
        }}
        whileHover={{
            scale: 1.05,
            y: -8,
            boxShadow: darkMode
            ? "0 25px 50px -12px rgba(147, 51, 234, 0.4)"
            : "0 25px 50px -12px rgba(79, 70, 229, 0.3)"
        }}
        style={{
            boxShadow: darkMode
            ? "0 0px 0px 0px rgba(147, 51, 234, 0)" // starting shadow value
            : "0 0px 0px 0px rgba(79, 70, 229, 0)"
        }}
        className={`${
            darkMode
            ? 'bg-gray-900/80 border-gray-700/50'
            : 'bg-white/80 border-white/50'
        } backdrop-blur-xl border-2 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group cursor-pointer`}
        >

      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${
        darkMode 
          ? 'from-purple-600/5 via-transparent to-blue-600/5' 
          : 'from-purple-300/10 via-transparent to-blue-300/10'
      } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className={`text-sm font-semibold ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              } mb-2 uppercase tracking-wide`}
            >
              {title}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
              className={`text-3xl font-black ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              } mb-1 tabular-nums`}
            >
              {value}
            </motion.div>
            
            {subtitle && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className={`text-sm font-medium ${
                  darkMode ? 'text-gray-500' : 'text-gray-500'
                }`}
              >
                {subtitle}
              </motion.div>
            )}
          </div>

          {/* Enhanced icon container */}
          <motion.div
            whileHover={{ 
              rotate: [0, -5, 5, 0],
              scale: 1.1
            }}
            transition={{ duration: 0.5 }}
            className={`w-14 h-14 bg-gradient-to-br ${colorConfig.gradient} rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden border-2 ${
              darkMode ? 'border-gray-600/30' : 'border-white/40'
            } ${colorConfig.glow}`}
          >
            {/* Icon shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
            <Icon size={22} className="text-white relative z-10" />
            
            {/* Floating particle */}
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping opacity-75" />
          </motion.div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center space-x-2">
          <div className={`flex-1 h-1 ${
            darkMode ? 'bg-gray-800' : 'bg-gray-200'
          } rounded-full overflow-hidden`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${colorConfig.gradient} rounded-full`}
            />
          </div>
          <TrendingUp size={12} className={colorConfig.iconColor} />
        </div>
      </div>
    </motion.div>
  );
};

export default function StatsDashboard({ transcript, summary, darkMode }) {
  // Fix word count calculation - filter out empty strings
  const wordCount = transcript ? transcript.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
  
  // Fix duration parsing - look for both "m" and "s" patterns
  const durationText = summary?.duration || '';
  const minutesMatch = durationText.match(/(\d+)m/);
  const secondsMatch = durationText.match(/(\d+)s/);
  const totalMinutes = (minutesMatch ? parseInt(minutesMatch[1], 10) : 0) + 
                      (secondsMatch ? Math.round(parseInt(secondsMatch[1], 10) / 60 * 10) / 10 : 0);

  const speakerCount = summary?.attendees?.length ?? 0;
  const actionItemCount = summary?.action_items?.length ?? 0;
  const confidenceValue = summary?.confidence != null ? `${summary.confidence}%` : '—';

  const statsData = [
    {
      icon: FileText,
      title: "Words Transcribed",
      value: wordCount.toLocaleString(),
      subtitle: "Total processed",
      color: "blue"
    },
    {
      icon: Clock,
      title: "Duration",
      value: totalMinutes > 0 ? `${totalMinutes}m` : durationText || '—',
      subtitle: "Audio length",
      color: "indigo"
    },
    {
      icon: Users,
      title: "Speakers",
      value: speakerCount.toString() || '—',
      subtitle: "Auto-identified",
      color: "purple"
    },
    {
      icon: CheckCircle,
      title: "Action Items",
      value: actionItemCount.toString() || '—',
      subtitle: "Extracted tasks",
      color: "green"
    },
    {
      icon: Star,
      title: "AI Confidence",
      value: confidenceValue,
      subtitle: "Accuracy score",
      color: "orange"
    }
  ];

  return (
    <div className="relative mb-12">
      {/* Background glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-full h-32 ${
          darkMode 
            ? 'bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5' 
            : 'bg-gradient-to-r from-blue-300/10 via-purple-300/10 to-indigo-300/10'
        } rounded-full filter blur-3xl animate-pulse-slow`} />
      </div>

      {/* Stats header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 relative z-10"
      >
        <h2 className={`text-2xl md:text-3xl font-bold ${
          darkMode ? 'text-gray-100' : 'text-gray-900'
        } mb-2`}>
          Meeting Analytics
        </h2>
        <p className={`${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        } font-medium`}>
          Real-time insights from your transcription
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto relative z-10">
        {statsData.map((stat, index) => (
          <StatsCard 
            key={stat.title}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            color={stat.color}
            darkMode={darkMode}
            index={index}
          />
        ))}
      </div>

      {/* Activity indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex items-center justify-center mt-8"
      >
        <div className={`flex items-center space-x-3 ${
          darkMode 
            ? 'bg-gray-900/60 border-gray-700/50 text-gray-300' 
            : 'bg-white/60 border-white/50 text-gray-600'
        } px-5 py-3 rounded-full border backdrop-blur-sm shadow-lg`}>
          <Activity size={16} className="text-green-500 animate-pulse" />
          <span className="text-sm font-medium">Live Processing</span>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}