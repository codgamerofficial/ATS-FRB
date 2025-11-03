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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto p-4 pb-24">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">Salary Tools</h1>
          <p className="text-cyan-300 text-sm sm:text-lg">Market insights & negotiation</p>
        </div>

        <div className="space-y-6">
          {/* Salary Calculator */}
          <SciFiCard variant="glow" className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
              Calculator
            </h2>

            <div className="space-y-4 mb-4 sm:mb-6">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-cyan-500/20 rounded-lg text-white text-sm"
                  placeholder="Software Engineer"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-cyan-500/20 rounded-lg text-white text-sm"
                  placeholder="Bangalore, India"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">Experience</label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full p-3 bg-slate-800 border border-cyan-500/20 rounded-lg text-white text-sm"
                >
                  <option value="">Select Experience</option>
                  <option value="entry">Entry (0-2 years)</option>
                  <option value="mid">Mid (3-5 years)</option>
                  <option value="senior">Senior (6-10 years)</option>
                  <option value="lead">Lead (10+ years)</option>
                </select>
              </div>

              <Button onClick={calculateSalary} className="w-full py-3 text-lg font-bold">
                Calculate Salary
              </Button>
            </div>

            {salaryData && (
              <div className="bg-slate-800 rounded-lg p-4 border border-cyan-500/20">
                <h3 className="text-white font-semibold mb-3 text-center">💰 Results</h3>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-gray-400 text-xs mb-1">Median Salary</div>
                    <div className="text-cyan-400 font-bold text-xl">₹{salaryData.median.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-xs mb-1">Salary Range</div>
                    <div className="text-white text-sm">₹{Math.floor(salaryData.range.min).toLocaleString()} - ₹{Math.floor(salaryData.range.max).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            )}
          </SciFiCard>

          {/* Market Trends */}
          <SciFiCard className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
              Trends
            </h2>

            <div className="space-y-3">
              {[
                { name: 'Tech Industry', growth: '+12%', icon: '💻', progress: 75 },
                { name: 'Remote Work', growth: '+8%', icon: '🏠', progress: 65 },
                { name: 'AI/ML Skills', growth: '+25%', icon: '🤖', progress: 85 }
              ].map((trend, index) => (
                <div key={index} className="bg-slate-800 rounded-lg p-3 border border-cyan-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{trend.icon}</span>
                      <span className="text-white font-medium text-sm">{trend.name}</span>
                    </div>
                    <span className="text-green-400 text-xs font-bold">{trend.growth}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-cyan-500 h-1.5 rounded-full transition-all duration-500" 
                      style={{ width: `${trend.progress}%` }}
                    />
                  </div>
                </div>
              ))}
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