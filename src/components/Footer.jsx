import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Star, CheckCircle, Shield, Globe, Sparkles } from 'lucide-react';

export default function Footer({ darkMode }) {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process hours of audio in minutes with our advanced AI engine",
      gradient: "from-blue-600 to-indigo-600",
      iconColor: "text-blue-400",
      bgColor: darkMode ? "bg-blue-600/20" : "bg-blue-100"
    },
    {
      icon: Star,
      title: "99% Accuracy",
      description: "Industry-leading speech recognition with speaker identification",
      gradient: "from-purple-600 to-pink-600",
      iconColor: "text-purple-400",
      bgColor: darkMode ? "bg-purple-600/20" : "bg-purple-100"
    },
    {
      icon: CheckCircle,
      title: "Smart Insights",
      description: "Automatic action items, sentiment analysis, and key point extraction",
      gradient: "from-emerald-600 to-green-600",
      iconColor: "text-emerald-400",
      bgColor: darkMode ? "bg-emerald-600/20" : "bg-emerald-100"
    }
  ];

  const trustBadges = [
    { icon: Shield, text: "Enterprise Security" },
    { icon: Globe, text: "Global Scale" },
    { icon: Sparkles, text: "AI Powered" }
  ];

  return (
    <div className="mt-12 sm:mt-16 lg:mt-24 text-center relative px-4 sm:px-6 lg:px-8">
      {/* Background glow effect matching header */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 ${
          darkMode 
            ? 'bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-blue-600/10' 
            : 'bg-gradient-to-r from-indigo-300/20 via-purple-300/20 to-blue-300/20'
        } rounded-full filter blur-3xl animate-pulse-slow`} />
      </div>

      <div className="max-w-sm sm:max-w-4xl lg:max-w-6xl mx-auto relative z-10">
        {/* Enhanced main footer card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`${
            darkMode 
              ? 'bg-gray-900/80 border-gray-700/50' 
              : 'bg-white/80 border-white/50'
          } backdrop-blur-xl border-2 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden`}
        >
          {/* Subtle gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${
            darkMode 
              ? 'from-purple-600/5 via-transparent to-blue-600/5' 
              : 'from-purple-300/10 via-transparent to-blue-300/10'
          } rounded-2xl sm:rounded-3xl`} />

          <div className="relative z-10">
            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10 lg:mb-12">
              {features.map((feature, index) => (
                <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{
                        scale: 1.05,
                        y: -5,
                        boxShadow: darkMode
                        ? "0 25px 50px -12px rgba(147, 51, 234, 0.3)"
                        : "0 25px 50px -12px rgba(79, 70, 229, 0.2)"
                    }}
                    transition={{
                        duration: 0.8,
                        delay: index * 0.2 || 0, // Ensure index is valid number
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                    }}
                    viewport={{ once: true, amount: 0.4 }} // Optional: more control over when to animate
                    className="text-center group p-3 sm:p-4"
                    >
                  {/* Enhanced icon container */}
                  <div className="relative mb-4 sm:mb-6">
                    <motion.div
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                      className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto shadow-xl relative overflow-hidden border-2 ${
                        darkMode ? 'border-gray-600/30' : 'border-white/40'
                      }`}
                    >
                      {/* Icon shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
                      <feature.icon size={20} className="sm:w-6 sm:h-6 lg:w-6 lg:h-6 text-white relative z-10" />
                      
                      {/* Floating particles */}
                      <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-ping opacity-75" />
                    </motion.div>
                  </div>

                  {/* Enhanced text content */}
                  <h3 className={`font-bold text-lg sm:text-xl ${
                    darkMode ? 'text-gray-100' : 'text-gray-900'
                  } mb-2 sm:mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-300`}>
                    {feature.title}
                  </h3>
                  <p className={`${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  } leading-relaxed font-medium text-sm sm:text-base`}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Divider line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className={`h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-6 sm:mb-8`}
            />

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8"
            >
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={badge.text}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`flex items-center space-x-2 ${
                    darkMode 
                      ? 'bg-gray-800/60 border-gray-700/50 text-gray-300' 
                      : 'bg-white/60 border-white/50 text-gray-600'
                  } px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-xs sm:w-auto`}
                >
                  <div className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg ${
                    darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
                  }`}>
                    <badge.icon size={12} className="sm:w-[14px] sm:h-[14px] text-gray-400 sm:text-gray-500" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              viewport={{ once: true }}
              className={`text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'} font-medium flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2`}
            >
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Powered by advanced AI
              </span>
              <span className="hidden sm:inline">•</span>
              <span>Secure & Private</span>
              <span className="hidden sm:inline">•</span>
              <span>Enterprise Ready</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating status indicator matching header */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
          className="flex items-center justify-center mt-6 sm:mt-8"
        >
          <div className={`flex items-center space-x-2 sm:space-x-3 ${
            darkMode 
              ? 'bg-emerald-900/30 border-emerald-400/30 text-emerald-400' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-600'
          } px-4 sm:px-5 py-2 sm:py-3 rounded-full border backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 max-w-xs sm:max-w-none`}>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-center">
              <span className="sm:hidden">Ready to Transform</span>
              <span className="hidden sm:inline">Ready to Transform Your Meetings</span>
            </span>
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