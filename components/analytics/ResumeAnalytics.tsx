'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Eye, Download, Share2, Clock } from 'lucide-react';
import { analyzeATSCompatibility, ATSScore, getATSScoreColor, getATSScoreLabel } from '@/utils/atsChecker';
import { ResumeData } from '@/types';

interface ResumeAnalyticsProps {
  resume: ResumeData;
  className?: string;
}

interface AnalyticsData {
  views: number;
  downloads: number;
  shares: number;
  lastUpdated: Date;
  atsScore: ATSScore;
}

export default function ResumeAnalytics({ resume, className = '' }: ResumeAnalyticsProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      
      const mockData: AnalyticsData = {
        views: Math.floor(Math.random() * 100) + 20,
        downloads: Math.floor(Math.random() * 50) + 5,
        shares: Math.floor(Math.random() * 20) + 2,
        lastUpdated: new Date(),
        atsScore: analyzeATSCompatibility(resume)
      };
      
      setTimeout(() => {
        setAnalytics(mockData);
        setLoading(false);
      }, 1000);
    };

    loadAnalytics();
  }, [resume]);

  if (loading) {
    return (
      <div className={`bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4 w-1/3"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
          <div className="h-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const statCards = [
    {
      icon: Eye,
      label: 'Views',
      value: analytics.views,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10'
    },
    {
      icon: Download,
      label: 'Downloads',
      value: analytics.downloads,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Share2,
      label: 'Shares',
      value: analytics.shares,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: BarChart3,
      label: 'ATS Score',
      value: `${analytics.atsScore.overall}%`,
      color: getATSScoreColor(analytics.atsScore.overall),
      bgColor: 'bg-gray-500/10'
    }
  ];

  return (
    <div className={`bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-cyan-400" />
          Resume Analytics
        </h3>
        <div className="flex items-center text-sm text-gray-400">
          <Clock className="w-4 h-4 mr-1" />
          Updated {analytics.lastUpdated.toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <div
            key={stat.label}
            className={`${stat.bgColor} border border-gray-700 rounded-lg p-4 text-center`}
          >
            <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800/50 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-4">
          ATS Compatibility: {getATSScoreLabel(analytics.atsScore.overall)}
        </h4>
        
        <div className="space-y-3">
          {Object.entries(analytics.atsScore.breakdown).map(([category, score]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-gray-300 capitalize">{category}</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      score >= 80 ? 'bg-green-500' : 
                      score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
                <span className={`text-sm font-medium ${getATSScoreColor(score)}`}>
                  {score}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {analytics.atsScore.suggestions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <h5 className="text-sm font-medium text-gray-300 mb-2">Top Suggestions:</h5>
            <div className="space-y-2">
              {analytics.atsScore.suggestions.slice(0, 3).map((suggestion, index) => (
                <div key={index} className="text-sm text-gray-400 flex items-start">
                  <div className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 ${
                    suggestion.type === 'critical' ? 'bg-red-500' :
                    suggestion.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <span>{suggestion.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}