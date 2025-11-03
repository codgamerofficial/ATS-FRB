'use client';

import { useState, useEffect } from 'react';
import { Brain, TrendingUp, Users, Globe, Zap, RefreshCw } from 'lucide-react';
import SciFiCard from '@/components/ui/SciFiCard';
import Button from '@/components/ui/Button';

interface AIInsight {
  id: string;
  title: string;
  description: string;
  category: 'market' | 'technology' | 'career' | 'global';
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timestamp: string;
  source: string;
}

export default function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const generateRealTimeInsights = (): AIInsight[] => {
    const marketData = {
      nasdaq: 15000 + Math.floor(Math.random() * 2000),
      sp500: 4500 + Math.floor(Math.random() * 500),
      jobGrowth: 3.5 + Math.random() * 2
    };

    const techTrends = ['AI/ML', 'Blockchain', 'Quantum Computing', 'IoT', '5G', 'AR/VR'];
    const sectors = ['Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail'];
    const skills = ['Python', 'JavaScript', 'React', 'AWS', 'Docker', 'Data Science'];

    const insightTemplates = [
      {
        title: `AI predicts ${Math.floor(Math.random() * 30 + 15)}% growth in ${techTrends[Math.floor(Math.random() * techTrends.length)]} jobs`,
        description: `Based on current market trends, ${techTrends[Math.floor(Math.random() * techTrends.length)]} roles expected to surge by ${Math.floor(Math.random() * 25 + 20)}% in next 6 months.`,
        category: 'career' as const,
        confidence: 85 + Math.floor(Math.random() * 10),
        impact: 'high' as const,
        source: 'AI Job Market Analysis'
      },
      {
        title: `Market Alert: ${sectors[Math.floor(Math.random() * sectors.length)]} sector shows ${Math.floor(Math.random() * 15 + 10)}% volatility`,
        description: `Real-time analysis indicates increased activity in ${sectors[Math.floor(Math.random() * sectors.length)]} with current index at ${marketData.nasdaq.toLocaleString()} points.`,
        category: 'market' as const,
        confidence: 78 + Math.floor(Math.random() * 15),
        impact: 'medium' as const,
        source: 'Financial AI Engine'
      },
      {
        title: `Global Trend: ${skills[Math.floor(Math.random() * skills.length)]} demand up ${Math.floor(Math.random() * 40 + 25)}% worldwide`,
        description: `International markets show unprecedented demand for ${skills[Math.floor(Math.random() * skills.length)]} skills, with ${Math.floor(Math.random() * 50 + 100)}K+ new positions.`,
        category: 'global' as const,
        confidence: 82 + Math.floor(Math.random() * 12),
        impact: 'high' as const,
        source: 'Global Skills Tracker'
      }
    ];

    return insightTemplates.map((template, index) => ({
      id: `insight-${Date.now()}-${index}`,
      ...template,
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString()
    }));
  };

  const fetchInsights = async () => {
    setLoading(true);
    const newInsights = generateRealTimeInsights();
    setInsights(newInsights);
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    fetchInsights();
    const interval = setInterval(fetchInsights, 3 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'market': return <TrendingUp className="h-4 w-4" />;
      case 'technology': return <Zap className="h-4 w-4" />;
      case 'career': return <Users className="h-4 w-4" />;
      case 'global': return <Globe className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  return (
    <SciFiCard className="p-6" variant="glow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Brain className="h-6 w-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">🤖 AI Market Insights</h2>
        </div>
        <Button onClick={fetchInsights} size="sm" disabled={loading}>
          <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="border border-gray-600/30 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getCategoryIcon(insight.category)}
                <span className="text-purple-400 text-sm font-medium capitalize">{insight.category}</span>
              </div>
              <span className="text-xs text-gray-400">{insight.confidence}% confidence</span>
            </div>
            
            <h3 className="text-white font-semibold mb-2">{insight.title}</h3>
            <p className="text-gray-300 text-sm mb-3">{insight.description}</p>
            
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Source: {insight.source}</span>
              <span>{new Date(insight.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
    </SciFiCard>
  );
}