'use client';

import { useState } from 'react';
import { Play, Pause, RotateCcw, Brain, Target } from 'lucide-react';
import SciFiCard from '@/components/ui/SciFiCard';
import Button from '@/components/ui/Button';

export default function InterviewPrepPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);

  const questions = [
    "Tell me about yourself and your background.",
    "Why are you interested in this position?",
    "What are your greatest strengths?",
    "Describe a challenging project you worked on.",
    "Where do you see yourself in 5 years?"
  ];

  const aiInsights = [
    { metric: "Confidence Level", score: 85, color: "text-green-400" },
    { metric: "Speaking Pace", score: 72, color: "text-yellow-400" },
    { metric: "Eye Contact", score: 90, color: "text-green-400" },
    { metric: "Clarity", score: 78, color: "text-cyan-400" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto p-4 pb-24">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">Interview Prep</h1>
          <p className="text-cyan-300 text-sm sm:text-lg">AI-powered mock interviews</p>
        </div>

        <div className="space-y-6">
          {/* Interview Session */}
          <SciFiCard variant="glow" className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Mock Interview</h2>
              <div className="text-cyan-400 font-mono text-lg">
                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 min-h-[180px] sm:min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <Brain className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="text-white text-lg sm:text-xl mb-2">Q{currentQuestion + 1}/{questions.length}</h3>
                <p className="text-gray-300 text-sm sm:text-lg leading-relaxed px-2">{questions[currentQuestion]}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button 
                onClick={() => setIsActive(!isActive)}
                className="flex items-center justify-center gap-2 py-3 text-lg font-bold"
              >
                {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isActive ? 'Pause' : 'Start'}
              </Button>
              
              <Button 
                onClick={() => setCurrentQuestion((prev) => (prev + 1) % questions.length)}
                className="flex items-center justify-center gap-2 py-3"
              >
                Next
              </Button>
              
              <Button 
                onClick={() => { setTimer(0); setCurrentQuestion(0); }}
                className="flex items-center justify-center gap-2 py-3"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </Button>
            </div>
          </SciFiCard>

          {/* AI Analysis */}
          <SciFiCard className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              Performance
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {aiInsights.map((insight, index) => (
                <div key={index} className="bg-slate-800 rounded-lg p-3">
                  <div className="text-center">
                    <div className={`text-xl font-bold ${insight.color} mb-1`}>{insight.score}%</div>
                    <div className="text-gray-300 text-xs">{insight.metric}</div>
                    <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${insight.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SciFiCard>

          <SciFiCard className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Interview Types</h3>
            
            <div className="grid grid-cols-1 gap-2">
              {[
                { type: 'Technical', icon: '⚡' },
                { type: 'Behavioral', icon: '🧠' },
                { type: 'Leadership', icon: '🏆' },
                { type: 'Problem Solving', icon: '🧩' },
                { type: 'Culture Fit', icon: '🤝' }
              ].map((item, index) => (
                <button
                  key={index}
                  className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors text-left"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white text-sm font-medium">{item.type}</span>
                </button>
              ))}
            </div>
          </SciFiCard>
        </div>
      </div>
    </div>
  );
}