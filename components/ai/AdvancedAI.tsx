'use client';

import { useState, useEffect } from 'react';
import { Brain, Zap, Target, TrendingUp, Users, Award } from 'lucide-react';
import SciFiCard from '@/components/ui/SciFiCard';
import Button from '@/components/ui/Button';

export default function AdvancedAI() {
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate advanced AI processing
    setTimeout(() => {
      setAiAnalysis({
        careerScore: Math.floor(Math.random() * 30) + 70,
        marketFit: Math.floor(Math.random() * 25) + 75,
        skillGaps: ['Cloud Computing', 'Machine Learning', 'Leadership'],
        recommendations: [
          'Focus on cloud certifications for 15% salary boost',
          'Develop leadership skills for management roles',
          'Add AI/ML projects to portfolio'
        ],
        salaryPrediction: {
          current: 85000,
          potential: 110000,
          timeline: '12-18 months'
        }
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* AI Control Panel */}
      <SciFiCard variant="glow" className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Advanced AI Career Analysis</h2>
            <p className="text-gray-300 text-sm sm:text-base">Get personalized insights powered by machine learning</p>
          </div>
          <Button 
            onClick={runAIAnalysis}
            disabled={isAnalyzing}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500"
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Run AI Analysis
              </div>
            )}
          </Button>
        </div>
      </SciFiCard>

      {aiAnalysis && (
        <>
          {/* Career Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SciFiCard className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Career Score</h3>
              <div className="text-2xl font-bold text-green-400">{aiAnalysis.careerScore}%</div>
              <p className="text-gray-300 text-sm">Overall readiness</p>
            </SciFiCard>

            <SciFiCard className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Market Fit</h3>
              <div className="text-2xl font-bold text-blue-400">{aiAnalysis.marketFit}%</div>
              <p className="text-gray-300 text-sm">Industry alignment</p>
            </SciFiCard>

            <SciFiCard className="p-4 text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Salary Growth</h3>
              <div className="text-xl font-bold text-yellow-400">+29%</div>
              <p className="text-gray-300 text-sm">Potential increase</p>
            </SciFiCard>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SciFiCard className="p-4 sm:p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                Skill Gap Analysis
              </h3>
              <div className="space-y-3">
                {aiAnalysis.skillGaps.map((skill: string, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                    <span className="text-white font-medium">{skill}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-yellow-500 h-2 rounded-full"
                          style={{ width: `${60 + index * 10}%` }}
                        />
                      </div>
                      <span className="text-yellow-400 text-sm font-semibold">High Priority</span>
                    </div>
                  </div>
                ))}
              </div>
            </SciFiCard>

            <SciFiCard className="p-4 sm:p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                AI Recommendations
              </h3>
              <div className="space-y-3">
                {aiAnalysis.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-800 rounded-lg">
                    <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </SciFiCard>
          </div>

          {/* Salary Prediction */}
          <SciFiCard variant="glow" className="p-4 sm:p-6">
            <h3 className="text-xl font-bold text-white mb-4">AI Salary Prediction</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-1">Current Estimate</div>
                <div className="text-2xl font-bold text-white">₹{aiAnalysis.salaryPrediction.current.toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-1">Potential Salary</div>
                <div className="text-2xl font-bold text-green-400">₹{aiAnalysis.salaryPrediction.potential.toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-1">Timeline</div>
                <div className="text-lg font-bold text-cyan-400">{aiAnalysis.salaryPrediction.timeline}</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg">
              <p className="text-green-300 text-sm text-center">
                💡 Following AI recommendations could increase your salary by ₹{(aiAnalysis.salaryPrediction.potential - aiAnalysis.salaryPrediction.current).toLocaleString()}
              </p>
            </div>
          </SciFiCard>
        </>
      )}
    </div>
  );
}