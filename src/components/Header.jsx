import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Moon, Sun, Clock, Calendar } from 'lucide-react';

export default function Header({ darkMode, toggleDarkMode, currentTime }) {
  return (
    <div className="text-center mb-8 sm:mb-12 lg:mb-16 relative px-4 sm:px-6 lg:px-8">
      {/* Background glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 ${
          darkMode 
            ? 'bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-indigo-600/10' 
            : 'bg-gradient-to-r from-purple-300/20 via-blue-300/20 to-indigo-300/20'
        } rounded-full filter blur-3xl animate-pulse-slow`} />
      </div>

      <div className="relative z-10">
        {/* Logo and Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-row items-center justify-center mb-6 sm:mb-8 space-y-4 gap-6 "
        >
          {/* Enhanced Logo */}
          <motion.div
            whileHover={{ 
                scale: 1.1,
                rotate: [0, -5, 5, 0], // ✅ Multiple keyframes for wiggle effect
                boxShadow: darkMode 
                ? "0 25px 50px -12px rgba(147, 51, 234, 0.5)" 
                : "0 25px 50px -12px rgba(79, 70, 229, 0.4)"
            }}
            transition={{ 
                type: "tween", 
                ease: "easeInOut", 
                duration: 0.6 
            }}
            className={`w-12 h-12 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl sm:mr-4 lg:mr-6 relative overflow-hidden border-2 ${
                darkMode ? 'border-purple-400/30' : 'border-white/40'
            }`}
            >
            {/* Logo shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
            <Sparkles size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white relative z-10" />
            
            {/* Floating sparkles around logo */}
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-ping opacity-75" />
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse" />
          </motion.div>

          {/* Enhanced Title */}
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent relative leading-tight"
          >
            VerbatimAI
            {/* Text glow effect */}
            <div className="absolute inset-0 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20 bg-clip-text text-transparent blur-sm -z-10">
              VerbatimAI
            </div>
          </motion.h1>

          {/* Enhanced Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={toggleDarkMode}
            className={`sm:ml-4 lg:ml-6 p-3 sm:p-4 mb-4 rounded-xl sm:rounded-2xl ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 border-gray-600/50' 
                : 'bg-gradient-to-br from-white to-gray-100 hover:from-gray-50 hover:to-white border-gray-200/50'
            } border-2 transition-all duration-300 shadow-xl hover:shadow-2xl backdrop-blur-sm relative overflow-hidden group`}
          >
            {/* Button glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${
              darkMode ? 'from-yellow-400/20 to-orange-400/20' : 'from-purple-400/20 to-blue-400/20'
            } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <motion.div
              animate={{ rotate: darkMode ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative z-10"
            >
              {darkMode ? (
                <Sun size={20} className="sm:w-6 sm:h-6 text-yellow-400" />
              ) : (
                <Moon size={20} className="sm:w-6 sm:h-6 text-gray-700" />
              )}
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Enhanced Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`text-base sm:text-lg md:text-xl lg:text-2xl ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          } max-w-sm sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-medium mb-6 sm:mb-8`}
        >
          Transform your meetings into{' '}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">
            actionable insights
          </span>{' '}
          with AI-powered transcription and intelligent summarization
        </motion.p>

        {/* Enhanced Time Display */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-8"
        >
          {/* Time Card */}
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className={`flex items-center space-x-2 sm:space-x-3 ${
              darkMode 
                ? 'bg-gray-800/80 border-gray-700/50 text-gray-300' 
                : 'bg-white/80 border-white/50 text-gray-600'
            } px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl backdrop-blur-sm border-2 shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-xs sm:w-auto`}
          >
            <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl ${
              darkMode ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <Clock size={16} className="sm:w-[18px] sm:h-[18px] text-blue-400 sm:text-blue-600" />
            </div>
            <span className="font-bold text-base sm:text-lg tabular-nums">
              {currentTime.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
              })}
            </span>
          </motion.div>

          {/* Date Card */}
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className={`flex items-center space-x-2 sm:space-x-3 ${
              darkMode 
                ? 'bg-gray-800/80 border-gray-700/50 text-gray-300' 
                : 'bg-white/80 border-white/50 text-gray-600'
            } px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl backdrop-blur-sm border-2 shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-xs sm:w-auto`}
          >
            <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl ${
              darkMode ? 'bg-purple-600/20' : 'bg-purple-100'
            }`}>
              <Calendar size={16} className="sm:w-[18px] sm:h-[18px] text-purple-400 sm:text-purple-600" />
            </div>
            <span className="font-bold text-base sm:text-lg">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric',
                year: window.innerWidth < 640 ? '2-digit' : 'numeric'
              })}
            </span>
          </motion.div>
        </motion.div>

        {/* Floating Status Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex items-center justify-center mt-6 sm:mt-8"
        >
          <div className={`flex items-center space-x-2 sm:space-x-3 ${
            darkMode 
              ? 'bg-green-900/30 border-green-400/30 text-green-400' 
              : 'bg-green-50 border-green-200 text-green-600'
          } px-3 sm:px-4 py-2 rounded-full border backdrop-blur-sm`}>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-medium">System Ready</span>
          </div>
        </motion.div>
      </div>

      <style>{`
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
          animation: shine 4s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}