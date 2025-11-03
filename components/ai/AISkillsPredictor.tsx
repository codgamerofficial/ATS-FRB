'use client';

import { useState, useEffect } from 'react';
import { BookOpen, TrendingUp, Award, Zap } from 'lucide-react';
import SciFiCard from '@/components/ui/SciFiCard';

interface SkillPrediction {
  skill: string;
  currentDemand: number;
  futureGrowth: number;
  salaryImpact: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeToLearn: string;
  category: string;
}

export default function AISkillsPredictor() {
  const [predictions, setPredictions] = useState<SkillPrediction[]>([]);
  const [loading, setLoading] = useState(true);

  const generateSkillPredictions = (): SkillPrediction[] => {
    const skillsData = [
      { skill: 'Artificial Intelligence', category: 'Technology', difficulty: 'Hard' as const, baseTime: '8-12 months' },
      { skill: 'Machine Learning', category: 'Technology', difficulty: 'Hard' as const, baseTime: '6-10 months' },
      { skill: 'React.js', category: 'Frontend', difficulty: 'Medium' as const, baseTime: '3-6 months' },
      { skill: 'Python', category: 'Programming', difficulty: 'Easy' as const, baseTime: '2-4 months' },
      { skill: 'Cloud Computing (AWS)', category: 'Infrastructure', difficulty: 'Medium' as const, baseTime: '4-8 months' },
      { skill: 'Data Science', category: 'Analytics', difficulty: 'Hard' as const, baseTime: '6-12 months' },
      { skill: 'Cybersecurity', category: 'Security', difficulty: 'Hard' as const, baseTime: '8-15 months' },
      { skill: 'Blockchain', category: 'Technology', difficulty: 'Hard' as const, baseTime: '6-10 months' },
      { skill: 'DevOps', category: 'Operations', difficulty: 'Medium' as const, baseTime: '4-8 months' },
      { skill: 'UI/UX Design', category: 'Design', difficulty: 'Medium' as const, baseTime: '3-6 months' }
    ];

    return skillsData.map(skill => ({
      ...skill,
      currentDemand: Math.floor(Math.random() * 40 + 60),
      futureGrowth: Math.floor(Math.random() * 80 + 120),
      salaryImpact: `+$${Math.floor(Math.random() * 30 + 15)}K`,
      timeToLearn: skill.baseTime
    }));
  };

  useEffect(() => {
    const fetchPredictions = () => {
      setLoading(true);
      setTimeout(() => {
        setPredictions(generateSkillPredictions());
        setLoading(false);
      }, 800);
    };

    fetchPredictions();
    const interval = setInterval(fetchPredictions, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'Hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getGrowthColor = (growth: number) => {
    if (growth >= 150) return 'text-green-400';
    if (growth >= 130) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <SciFiCard className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <BookOpen className="h-6 w-6 text-green-400" />
        <h2 className="text-xl font-bold text-white">📚 AI Skills Predictor</h2>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse border border-gray-600/30 rounded-lg p-4">
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {predictions.slice(0, 6).map((prediction, index) => (
            <div key={index} className="border border-gray-600/30 rounded-lg p-4 hover:border-green-400/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold">{prediction.skill}</h3>
                  <p className="text-green-400 text-sm">{prediction.category}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(prediction.difficulty)}`}>
                  {prediction.difficulty}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-400">Current Demand</p>
                    <p className="text-blue-400 font-semibold">{prediction.currentDemand}%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className={`h-4 w-4 ${getGrowthColor(prediction.futureGrowth)}`} />
                  <div>
                    <p className="text-xs text-gray-400">Future Growth</p>
                    <p className={`font-semibold ${getGrowthColor(prediction.futureGrowth)}`}>
                      {prediction.futureGrowth}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-purple-400" />
                  <span className="text-gray-300">Salary Impact: </span>
                  <span className="text-purple-400 font-semibold">{prediction.salaryImpact}</span>
                </div>
                <div className="text-gray-400">
                  Learn in: <span className="text-cyan-400">{prediction.timeToLearn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </SciFiCard>
  );
}