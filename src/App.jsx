import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from './hooks/useDarkMode';
import FileUpload from './components/FileUpload';
import SummaryView from './components/SummaryView';
import StatsDashboard from './components/StatsDashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import { downloadWordDoc } from './utils/docxHelper';
import { FileText, EyeOff, Eye, Download } from 'lucide-react';

export default function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [recordingName, setRecordingName] = useState('');
  const [transcript, setTranscript] = useState(null);
  const [summary, setSummary] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('transcript');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState('all');
  const [showTranscript, setShowTranscript] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUploadComplete = async (data) => {
    const nameWithoutExt = data.filename.replace(/\.[^/.]+$/, '');
    setRecordingName(nameWithoutExt);
    setTranscript(data.transcript); 
    setAudioUrl(data.audioUrl); 
    setSummary({
      title: data.title,
      duration: data.duration,
      sentiment: data.sentiment,
      confidence: data.confidence,
      attendees: data.attendees,
      action_items: data.action_items,
      decisions: data.decisions,
      key_points: data.key_points,
      topics_discussed: data.topics_discussed,
      next_meeting: data.next_meeting
    });
    setActiveTab('transcript');
  };

  const handleDownloadTranscript = () => {
    if (!transcript) return;
    downloadWordDoc({
      transcript,
      summary: null,
      title: recordingName,
      filename: `${recordingName}_transcript.docx`
    });
  };

  const handleReset = () => {
    setRecordingName('');
    setTranscript(null);
    setSummary(null);
    setAudioUrl(null);
    
    setLoadingSummary(false);
    
    setActiveTab('transcript');
    setSearchTerm('');
    setSelectedSpeaker('all');
    setShowTranscript(true);
  };

  const handleDownloadSummary = () => {
    if (!summary) return;
    downloadWordDoc({
      transcript: null,
      summary,
      title: recordingName,
      filename: `${recordingName}_summary.docx`
    });
  };

  const handleDownloadBoth = () => {
    if (!transcript && !summary) return;
    downloadWordDoc({
      transcript,
      summary,
      title: recordingName,
      filename: `${recordingName}_minutes.docx`
    });
  };

  const filteredTranscript = transcript && searchTerm 
    ? transcript.split('\n').filter(line => 
        line.toLowerCase().includes(searchTerm.toLowerCase())
      ).join('\n')
    : transcript;

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      darkMode 
        ? 'dark bg-gradient-to-br from-slate-900 via-gray-900 to-black' 
        : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50'
    }`}>
      <div className="relative overflow-hidden">
        {/* Enhanced animated background elements */}
        {!darkMode && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-48 -right-48 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-float" />
            <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-float-delayed" />
            <div className="absolute top-48 left-1/2 w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse-slow" />
            
            {/* Floating particles */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-float-particle opacity-60" />
            <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-float-particle-delayed opacity-50" />
            <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float-particle-slow opacity-70" />
          </div>
        )}

        {/* Dark mode animated background */}
        {darkMode && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-indigo-600/15 to-cyan-600/15 rounded-full filter blur-3xl animate-float" />
            <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-gradient-to-br from-pink-600/10 to-purple-600/10 rounded-full filter blur-3xl animate-float-delayed" />
            
            {/* Glowing orbs */}
            <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-blue-500/30 rounded-full animate-ping" />
            <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-purple-500/40 rounded-full animate-pulse" />
          </div>
        )}

        <div className="relative z-10 p-4 md:p-8">
          <Header 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            currentTime={currentTime}
          />

          {/* Enhanced Stats Dashboard */}
          {(transcript || summary) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8"
            >
              <StatsDashboard 
                transcript={transcript} 
                summary={summary} 
                darkMode={darkMode}
              />
            </motion.div>
          )}

          {/* Enhanced File Upload */}
          {!transcript && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl mx-auto mb-12"
            >
              <FileUpload 
                onUploadComplete={handleUploadComplete} 
                darkMode={darkMode}
              />
            </motion.div>
          )}

          {/* Enhanced Main Content */}
          {transcript && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="max-w-6xl mx-auto"
            >
              <div className={`${
                darkMode 
                  ? 'bg-gray-800/90 border-gray-700/50 shadow-2xl shadow-purple-900/20' 
                  : 'bg-white/80 border-white/40 shadow-2xl shadow-indigo-500/20'
              } backdrop-blur-2xl border rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-3xl ${
                darkMode ? 'hover:shadow-purple-900/30' : 'hover:shadow-indigo-500/30'
              }`}>
                
                {/* Enhanced Header Section */}
                <div className={`${
                  darkMode 
                    ? 'bg-gradient-to-r from-gray-800 via-purple-900/50 to-gray-800' 
                    : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600'
                } p-8 relative overflow-hidden`}>
                  
                  {/* Header background effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-20" />
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
                  
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`w-16 h-16 ${
                          darkMode 
                            ? 'bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30' 
                            : 'bg-white/30 shadow-lg shadow-white/50'
                        } rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20`}
                      >
                        <FileText size={24} className={darkMode ? 'text-gray-100' : 'text-white'} />
                      </motion.div>
                      <div>
                        <h2 className={`text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-white'} mb-1`}>
                          Transcript
                        </h2>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-indigo-100'} text-lg font-medium opacity-90`}>
                          speech-to-text conversion
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowTranscript(!showTranscript)}
                        className={`p-3 ${
                          darkMode 
                            ? 'bg-gray-700/80 hover:bg-gray-600/80 border-gray-600/50' 
                            : 'bg-white/20 hover:bg-white/30 border-white/30'
                        } rounded-xl transition-all duration-300 backdrop-blur-sm border shadow-lg`}
                      >
                        {showTranscript ? (
                          <EyeOff size={20} className={darkMode ? 'text-gray-300' : 'text-white'} />
                        ) : (
                          <Eye size={20} className={darkMode ? 'text-gray-300' : 'text-white'} />
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {showTranscript && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="p-8"
                    >

                      {/* Enhanced Transcript Content */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`h-80 overflow-y-auto ${
                          darkMode 
                            ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-600/30' 
                            : 'bg-gradient-to-br from-gray-50/90 to-white/90 border-gray-200/30'
                        } rounded-3xl p-8 border-2 mb-8 backdrop-blur-sm shadow-inner hover:shadow-lg transition-all duration-300 custom-scrollbar`}
                      >
                        <div className="prose prose-lg max-w-none">
                          <pre className={`whitespace-pre-wrap ${
                            darkMode ? 'text-gray-300' : 'text-gray-800'
                          } leading-relaxed font-medium text-lg selection:bg-purple-500/30`}>
                            {filteredTranscript || transcript}
                          </pre>
                        </div>
                      </motion.div>

                      {/* Enhanced Action Buttons */}
                      <div className="flex flex-wrap gap-4">
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleDownloadTranscript}
                          className={`flex items-center space-x-3 ${
                            darkMode 
                              ? 'bg-gray-700/80 hover:bg-gray-600/80 text-gray-100 border-gray-600/50' 
                              : 'bg-white/80 hover:bg-gray-50 text-gray-800 border-gray-200/50'
                          } px-6 py-4 rounded-2xl transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl border-2 backdrop-blur-sm`}
                        >
                          <Download size={20} />
                          <span>Download Transcript</span>
                        </motion.button>
                        
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Summary Section */}
          <AnimatePresence>
            {summary && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <SummaryView 
                  summary={summary}
                  onReset={handleReset} 
                  darkMode={darkMode}
                  handleDownloadSummary={handleDownloadSummary}
                  handleDownloadBoth={handleDownloadBoth}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Footer darkMode={darkMode} />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
          25% {
            transform: translate(20px, -30px) scale(1.05) rotate(1deg);
          }
          50% {
            transform: translate(-15px, 15px) scale(0.95) rotate(-1deg);
          }
          75% {
            transform: translate(25px, 10px) scale(1.02) rotate(0.5deg);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
          }
          33% {
            transform: translate(-25px, -20px) scale(1.08) rotate(-1deg);
          }
          66% {
            transform: translate(20px, 25px) scale(0.92) rotate(1deg);
          }
        }
        
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
        }
        
        @keyframes float-particle-delayed {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-15px) translateX(-8px);
            opacity: 0.9;
          }
        }
        
        @keyframes float-particle-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-25px) translateX(5px);
            opacity: 0.3;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-particle {
          animation: float-particle 4s ease-in-out infinite;
        }
        
        .animate-float-particle-delayed {
          animation: float-particle-delayed 5s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-float-particle-slow {
          animation: float-particle-slow 6s ease-in-out infinite;
          animation-delay: 3s;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #8b5cf6, #06b6d4);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #7c3aed, #0891b2);
        }
      `}</style>
    </div>
  );
}