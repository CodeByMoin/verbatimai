import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Zap, Mic, Sparkles, Music, Waves} from 'lucide-react';

export default function FileUpload({ onUploadComplete, darkMode }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('audio/')) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('audio/')) {
      setFile(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    const formData = new FormData();
    formData.append("audio", file);

    try {
      const res = await fetch("https://verbatimai-server.onrender.com/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setUploadProgress(100);
      clearInterval(progressInterval);
      setTimeout(() => {
        onUploadComplete(data);
      }, 500);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
      clearInterval(progressInterval);
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'mp3':
        return <Music size={24} className="text-pink-400" />;
      case 'wav':
        return <Waves size={24} className="text-blue-400" />;
      case 'm4a':
        return <Mic size={24} className="text-purple-400" />;
      default:
        return <FileText size={24} className="text-green-400" />;
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Background glow effects */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-96 h-96 ${
          darkMode 
            ? 'bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-indigo-600/10' 
            : 'bg-gradient-to-r from-purple-300/20 via-blue-300/20 to-indigo-300/20'
        } rounded-full filter blur-3xl animate-pulse-slow`} />
      </div>

      {/* Main upload area */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <div 
          className={`relative group ${
            darkMode 
              ? 'bg-gray-800/90 border-gray-700/50' 
              : 'bg-white/80 border-white/40'
          } backdrop-blur-2xl border-2 border-dashed transition-all duration-500 rounded-3xl p-8 md:p-16 shadow-2xl ${
            darkMode ? 'shadow-purple-900/20' : 'shadow-indigo-500/20'
          } ${
            isDragging 
              ? 'border-purple-400 scale-105 shadow-3xl' 
              : 'hover:border-purple-400/70 hover:scale-102'
          } ${
            darkMode 
              ? 'hover:shadow-purple-900/30' 
              : 'hover:shadow-indigo-500/30'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
        >
          {/* Animated background gradients */}
          <div className={`absolute inset-0 ${
            darkMode 
              ? 'bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20' 
              : 'bg-gradient-to-br from-purple-100/50 via-blue-100/50 to-indigo-100/50'
          } rounded-3xl transition-all duration-500 ${
            isDragging ? 'opacity-100' : 'opacity-0'
          }`} />
          
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent  rounded-3xl" />
          
          <div className="relative text-center">
            {/* Enhanced Upload Icon */}
            <motion.div 
              whileHover={{ 
                scale: 1.1, 
                rotate: [0, -5, 5, 0],
                boxShadow: darkMode 
                  ? "0 25px 50px -12px rgba(147, 51, 234, 0.6)" 
                  : "0 25px 50px -12px rgba(79, 70, 229, 0.5)"
              }}
              transition={{ 
                duration: 0.6, 
                ease: "easeInOut", 
                times: [0, 0.25, 0.75, 1],
                type: "tween" // ✅ changed from spring to tween
              }}
              className="mx-auto w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl relative overflow-hidden border-2 border-white/20"
            >
              {/* Icon glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
              
              <motion.div
                animate={{ 
                  y: isDragging ? -5 : 0,
                  scale: isDragging ? 1.1 : 1
                }}
                transition={{ type: "spring", stiffness: 400 }}
                className="relative z-10"
              >
                <Upload size={40} className="text-white" />
              </motion.div>
              
              {/* Floating particles around icon */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75" />
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
              <div className="absolute top-1/2 -right-3 w-2 h-2 bg-pink-400 rounded-full animate-bounce" />
            </motion.div>
            
            {/* Enhanced Title */}
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 relative"
            >
              Upload Your Meeting Recording
              {/* Text glow effect */}
              <div className="absolute inset-0 text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20 bg-clip-text text-transparent blur-sm -z-10">
                Upload Your Meeting Recording
              </div>
            </motion.h3>
            
            {/* Enhanced Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              } mb-6 text-lg md:text-xl font-medium leading-relaxed`}
            >
              {isDragging ? (
                <span className="text-purple-500 font-bold">Drop your file here! 🎯</span>
              ) : (
                <>
                  Drag & drop your audio file or{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">
                    click to browse
                  </span>
                </>
              )}
            </motion.p>
            
            {/* File format info with icons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center space-x-6 mb-8"
            >
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-xl ${
                  darkMode ? 'bg-pink-600/20' : 'bg-pink-100'
                }`}>
                  <Music size={16} className={darkMode ? 'text-pink-400' : 'text-pink-600'} />
                </div>
                <span className={`text-sm font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>MP3</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-xl ${
                  darkMode ? 'bg-blue-600/20' : 'bg-blue-100'
                }`}>
                  <Waves size={16} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                </div>
                <span className={`text-sm font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>WAV</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-xl ${
                  darkMode ? 'bg-purple-600/20' : 'bg-purple-100'
                }`}>
                  <Mic size={16} className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
                </div>
                <span className={`text-sm font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>M4A</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-xl ${
                  darkMode ? 'bg-green-600/20' : 'bg-green-100'
                }`}>
                  <FileText size={16} className={darkMode ? 'text-green-400' : 'text-green-600'} />
                </div>
                <span className={`text-sm font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>FLAC</span>
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className={`text-sm ${
                darkMode ? 'text-gray-500' : 'text-gray-500'
              } mb-8 font-medium`}
            >
              Maximum file size: 100MB • Secure processing with end-to-end encryption
            </motion.p>
            
            {/* Enhanced Upload Button */}
            <motion.button
              initial={{ 
                opacity: 0, 
                y: 20,
                boxShadow: darkMode 
                  ? "0 0px 0px 0px rgba(147, 51, 234, 0.0)" 
                  : "0 0px 0px 0px rgba(79, 70, 229, 0.0)"
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                boxShadow: darkMode 
                  ? "0 10px 20px -8px rgba(147, 51, 234, 0.2)" 
                  : "0 10px 20px -8px rgba(79, 70, 229, 0.15)"
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: darkMode 
                  ? "0 25px 50px -12px rgba(147, 51, 234, 0.4)" 
                  : "0 25px 50px -12px rgba(79, 70, 229, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 1.0 }}
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white px-10 py-5 md:px-12 md:py-6 rounded-2xl font-bold text-lg md:text-xl transition-all duration-300 shadow-2xl transform relative overflow-hidden group"
            >

              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shine" />
              
              <span className="relative z-10 flex items-center space-x-3">
                <Upload size={24} />
                <span>Choose Audio File</span>
                <Sparkles size={20} className="animate-pulse" />
              </span>
            </motion.button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Enhanced File Preview - Fixed Responsive Version */}
      <AnimatePresence>
        {file && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`mt-6 sm:mt-8 ${
              darkMode 
                ? 'bg-gray-800/90 border-gray-700/50 shadow-2xl shadow-purple-900/20' 
                : 'bg-white/90 border-white/50 shadow-2xl shadow-indigo-500/20'
            } backdrop-blur-2xl border-2 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 relative overflow-hidden group hover:shadow-3xl transition-all duration-500`}
          >
            {/* Background glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${
              darkMode 
                ? 'from-purple-900/20 via-blue-900/20 to-indigo-900/20' 
                : 'from-purple-100/30 via-blue-100/30 to-indigo-100/30'
            } opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl`} />
            
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
              <div className="flex items-center space-x-3 sm:space-x-6 flex-1 min-w-0 w-full sm:w-auto">
                {/* Enhanced File Icon */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden flex-shrink-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
                  {getFileIcon(file.name)}
                </motion.div>
                
                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className={`font-bold text-base sm:text-lg lg:text-xl ${
                    darkMode ? 'text-gray-100' : 'text-gray-800'
                  } truncate mb-1`}>
                    {file.name}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                    <div className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    } font-medium`}>
                      {formatFileSize(file.size)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className={`text-sm font-medium ${
                        darkMode ? 'text-green-400' : 'text-green-600'
                      }`}>
                        Ready to process
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Upload Button */}
              <motion.button
                initial={{
                  scale: 1,
                  y: 0,
                  boxShadow: "0 0px 0px 0px rgba(16, 185, 129, 0.0)"
                }}
                animate={{
                  scale: 1,
                  y: 0,
                  boxShadow: "0 10px 20px -6px rgba(16, 185, 129, 0.2)"
                }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 20px 40px -12px rgba(16, 185, 129, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUpload}
                disabled={uploading}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 shadow-xl flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-center relative overflow-hidden group flex-shrink-0"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shine" />
                
                <div className="relative z-10 flex items-center space-x-2 sm:space-x-3">
                  {uploading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Zap size={16} className="sm:w-5 sm:h-5" />
                      <span>Start</span>
                      <Sparkles size={14} className="sm:w-4 sm:h-4 animate-pulse" />
                    </>
                  )}
                </div>
              </motion.button>
            </div>
            
            {/* Enhanced Progress Bar */}
            <AnimatePresence>
              {uploading && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200/20"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        uploadProgress < 30 ? 'bg-blue-500' :
                        uploadProgress < 70 ? 'bg-yellow-500' :
                        uploadProgress < 100 ? 'bg-orange-500' : 'bg-green-500'
                      } animate-pulse flex-shrink-0`} />
                      <span className={`text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {uploadProgress < 30 ? 'Uploading audio file...' :
                        uploadProgress < 70 ? 'Processing audio data...' :
                        uploadProgress < 100 ? 'Generating transcript...' : 'Complete!'}
                      </span>
                    </div>
                    <span className={`text-sm font-bold ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    } self-end sm:self-auto`}>
                      {Math.round(uploadProgress)}%
                    </span>
                  </div>
                  
                  <div className={`w-full h-2 sm:h-3 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  } rounded-full overflow-hidden relative`}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-full relative overflow-hidden"
                    >
                      {/* Progress bar shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
                    </motion.div>
                  </div>
                  
                  <div className={`mt-3 text-xs sm:text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  } text-center font-medium`}>
                    This may take a few moments depending on file size
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

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
          animation: shine 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}