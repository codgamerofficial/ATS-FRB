'use client';

import { useState } from 'react';
import { Brain, Target, Users, TrendingUp } from 'lucide-react';
import SciFiCard from '@/components/ui/SciFiCard';
import AdvancedAI from '@/components/ai/AdvancedAI';

export default function AIFeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Advanced AI Features</h1>
          <p className="text-cyan-300 text-lg">Next-generation artificial intelligence for career development</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SciFiCard variant="glow" className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Machine Learning</h3>
            <p className="text-gray-300 text-sm">Advanced algorithms analyze market trends</p>
          </SciFiCard>

          <SciFiCard variant="glow" className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Predictive Analytics</h3>
            <p className="text-gray-300 text-sm">Forecast career opportunities</p>
          </SciFiCard>

          <SciFiCard variant="glow" className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Personalization</h3>
            <p className="text-gray-300 text-sm">Tailored recommendations</p>
          </SciFiCard>

          <SciFiCard variant="glow" className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Real-time Updates</h3>
            <p className="text-gray-300 text-sm">Live market analysis</p>
          </SciFiCard>
        </div>

        <AdvancedAI />

        <SciFiCard className="p-6 mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">AI Performance Metrics</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">98.7%</div>
              <div className="text-gray-300">Accuracy Rate</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full w-[98%]" />
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">2.3s</div>
              <div className="text-gray-300">Response Time</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-4/5" />
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">1M+</div>
              <div className="text-gray-300">Data Points</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-full" />
              </div>
            </div>
          </div>
        </SciFiCard>
      </div>
    </div>
  );
}