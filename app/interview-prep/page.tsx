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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">AI Interview Preparation</h1>
          <p className="text-cyan-300 text-lg">Practice with AI-powered mock interviews</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interview Session */}
          <div className="lg:col-span-2">
            <SciFiCard variant="glow" className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Mock Interview</h2>
                <div className="text-cyan-400 font-mono text-lg">
                  {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 mb-6 min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-white text-xl mb-2">Question {currentQuestion + 1} of {questions.length}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{questions[currentQuestion]}</p>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => setIsActive(!isActive)}
                  className="flex items-center gap-2"
                >
                  {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isActive ? 'Pause' : 'Start'}
                </Button>
                
                <Button 
                  onClick={() => setCurrentQuestion((prev) => (prev + 1) % questions.length)}
                  className="flex items-center gap-2"
                >
                  Next Question
                </Button>
                
                <Button 
                  onClick={() => { setTimer(0); setCurrentQuestion(0); }}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </Button>
              </div>
            </SciFiCard>
          </div>

          {/* AI Analysis */}
          <div className="space-y-6">
            <SciFiCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                AI Analysis
              </h3>
              
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-300 text-sm">{insight.metric}</span>
                      <span className={`font-semibold ${insight.color}`}>{insight.score}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${insight.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SciFiCard>

            <SciFiCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Interview Types</h3>
              
              <div className="space-y-3">
                {[
                  'Technical Interview',
                  'Behavioral Questions',
                  'Leadership Scenarios',
                  'Problem Solving',
                  'Culture Fit'
                ].map((type, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 bg-slate-800 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
                  >
                    <span className="text-white">{type}</span>
                  </button>
                ))}
              </div>
            </SciFiCard>
          </div>
        </div>
      </div>
    </div>
  );
}