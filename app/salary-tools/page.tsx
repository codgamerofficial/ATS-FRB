'use client';

import { useState } from 'react';
import { DollarSign, TrendingUp, MapPin, Briefcase } from 'lucide-react';
import SciFiCard from '@/components/ui/SciFiCard';
import Button from '@/components/ui/Button';

export default function SalaryToolsPage() {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [salaryData, setSalaryData] = useState<any>(null);

  const calculateSalary = () => {
    // Mock salary calculation
    const baseSalary = Math.floor(Math.random() * 50000) + 50000;
    setSalaryData({
      median: baseSalary,
      range: { min: baseSalary * 0.8, max: baseSalary * 1.3 },
      percentiles: {
        p25: baseSalary * 0.85,
        p75: baseSalary * 1.15,
        p90: baseSalary * 1.25
      }
    });
  };

  const negotiationTips = [
    "Research market rates thoroughly before negotiating",
    "Highlight your unique value and achievements",
    "Consider total compensation, not just base salary",
    "Practice your negotiation conversation beforehand",
    "Be prepared to walk away if terms don't meet your needs"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Salary Negotiation Tools</h1>
          <p className="text-cyan-300 text-lg">Market-based salary insights and negotiation strategies</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Salary Calculator */}
          <SciFiCard variant="glow" className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-cyan-400" />
              Salary Calculator
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-300 mb-2">Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-cyan-500/20 rounded-lg text-white"
                  placeholder="e.g., Software Engineer"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-cyan-500/20 rounded-lg text-white"
                  placeholder="e.g., Bangalore, India"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Experience Level</label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-cyan-500/20 rounded-lg text-white"
                >
                  <option value="">Select Experience</option>
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="mid">Mid Level (3-5 years)</option>
                  <option value="senior">Senior Level (6-10 years)</option>
                  <option value="lead">Lead/Principal (10+ years)</option>
                </select>
              </div>

              <Button onClick={calculateSalary} className="w-full">
                Calculate Salary Range
              </Button>
            </div>

            {salaryData && (
              <div className="bg-slate-800 rounded-lg p-4 border border-cyan-500/20">
                <h3 className="text-white font-semibold mb-3">Salary Insights</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Median Salary</span>
                    <p className="text-cyan-400 font-semibold">₹{salaryData.median.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Range</span>
                    <p className="text-white">₹{Math.floor(salaryData.range.min).toLocaleString()} - ₹{Math.floor(salaryData.range.max).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </SciFiCard>

          {/* Market Trends */}
          <SciFiCard className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
              Market Trends
            </h2>

            <div className="space-y-4">
              <div className="bg-slate-800 rounded-lg p-4 border border-cyan-500/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">Tech Industry</span>
                  <span className="text-green-400 text-sm">+12% YoY</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full w-3/4" />
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-4 border border-cyan-500/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">Remote Work</span>
                  <span className="text-cyan-400 text-sm">+8% Premium</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full w-2/3" />
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-4 border border-cyan-500/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">AI/ML Skills</span>
                  <span className="text-purple-400 text-sm">+25% Demand</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-5/6" />
                </div>
              </div>
            </div>
          </SciFiCard>
        </div>

        {/* Negotiation Tips */}
        <SciFiCard className="p-6 mt-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-cyan-400" />
            Negotiation Strategies
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {negotiationTips.map((tip, index) => (
              <div key={index} className="bg-slate-800 rounded-lg p-4 border border-cyan-500/20">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </SciFiCard>
      </div>
    </div>
  );
}