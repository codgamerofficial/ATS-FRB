'use client';

import { useState, useEffect } from 'react';
import { Route, ArrowRight, Star, Clock } from 'lucide-react';
import SciFiCard from '@/components/ui/SciFiCard';

interface CareerStep {
  position: string;
  level: number;
  salary: string;
  timeframe: string;
  skills: string[];
  companies: string[];
}

interface CareerPath {
  title: string;
  description: string;
  steps: CareerStep[];
  totalTime: string;
  successRate: number;
}

export default function AICareerPath() {
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [selectedPath, setSelectedPath] = useState(0);
  const [loading, setLoading] = useState(true);

  const generateCareerPaths = (): CareerPath[] => {
    return [
      {
        title: 'Full Stack Developer Path',
        description: 'Complete journey from junior to senior full stack developer',
        totalTime: '3-5 years',
        successRate: 87,
        steps: [
          {
            position: 'Junior Developer',
            level: 1,
            salary: '$65K - $85K',
            timeframe: '0-2 years',
            skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
            companies: ['Startups', 'Small Companies']
          },
          {
            position: 'Mid-Level Developer',
            level: 2,
            salary: '$85K - $120K',
            timeframe: '2-4 years',
            skills: ['TypeScript', 'AWS', 'Docker', 'PostgreSQL'],
            companies: ['Mid-size Companies', 'Tech Companies']
          },
          {
            position: 'Senior Developer',
            level: 3,
            salary: '$120K - $180K',
            timeframe: '4+ years',
            skills: ['System Design', 'Microservices', 'Leadership', 'Architecture'],
            companies: ['FAANG', 'Fortune 500', 'Unicorns']
          }
        ]
      },
      {
        title: 'Data Science Path',
        description: 'Analytics to AI/ML engineering career progression',
        totalTime: '4-6 years',
        successRate: 78,
        steps: [
          {
            position: 'Data Analyst',
            level: 1,
            salary: '$60K - $80K',
            timeframe: '0-2 years',
            skills: ['SQL', 'Python', 'Excel', 'Tableau'],
            companies: ['Any Industry', 'Consulting']
          },
          {
            position: 'Data Scientist',
            level: 2,
            salary: '$95K - $140K',
            timeframe: '2-4 years',
            skills: ['Machine Learning', 'Statistics', 'R', 'Spark'],
            companies: ['Tech Companies', 'Finance', 'Healthcare']
          },
          {
            position: 'ML Engineer',
            level: 3,
            salary: '$140K - $220K',
            timeframe: '4+ years',
            skills: ['Deep Learning', 'MLOps', 'TensorFlow', 'Kubernetes'],
            companies: ['FAANG', 'AI Startups', 'Research Labs']
          }
        ]
      },
      {
        title: 'Product Management Path',
        description: 'From analyst to senior product leadership roles',
        totalTime: '5-7 years',
        successRate: 72,
        steps: [
          {
            position: 'Product Analyst',
            level: 1,
            salary: '$70K - $95K',
            timeframe: '0-2 years',
            skills: ['Analytics', 'SQL', 'A/B Testing', 'User Research'],
            companies: ['Startups', 'E-commerce']
          },
          {
            position: 'Product Manager',
            level: 2,
            salary: '$110K - $160K',
            timeframe: '2-5 years',
            skills: ['Strategy', 'Roadmapping', 'Stakeholder Management', 'Agile'],
            companies: ['Tech Companies', 'SaaS']
          },
          {
            position: 'Senior PM / Director',
            level: 3,
            salary: '$180K - $300K',
            timeframe: '5+ years',
            skills: ['Leadership', 'Vision', 'P&L Management', 'Team Building'],
            companies: ['FAANG', 'Unicorns', 'Enterprise']
          }
        ]
      }
    ];
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCareerPaths(generateCareerPaths());
      setLoading(false);
    }, 600);
  }, []);

  const currentPath = careerPaths[selectedPath];

  return (
    <SciFiCard className="p-6" variant="premium">
      <div className="flex items-center space-x-3 mb-6">
        <Route className="h-6 w-6 text-blue-400" />
        <h2 className="text-xl font-bold text-white">🛤️ AI Career Path Planner</h2>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded"></div>
          <div className="h-32 bg-gray-700 rounded"></div>
        </div>
      ) : (
        <>
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {careerPaths.map((path, index) => (
              <button
                key={index}
                onClick={() => setSelectedPath(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedPath === index
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-400/50'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                }`}
              >
                {path.title}
              </button>
            ))}
          </div>

          {currentPath && (
            <div>
              <div className="mb-6 p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg">
                <h3 className="text-blue-400 font-semibold text-lg mb-2">{currentPath.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{currentPath.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-300">Total Time: </span>
                    <span className="text-blue-400 font-medium">{currentPath.totalTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-gray-300">Success Rate: </span>
                    <span className="text-yellow-400 font-medium">{currentPath.successRate}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {currentPath.steps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {step.level}
                      </div>
                      
                      <div className="flex-1 border border-gray-600/30 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-white font-semibold text-lg">{step.position}</h4>
                            <p className="text-blue-400 font-medium">{step.salary}</p>
                          </div>
                          <span className="text-gray-400 text-sm">{step.timeframe}</span>
                        </div>

                        <div className="mb-3">
                          <p className="text-gray-400 text-sm mb-2">Key Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {step.skills.map((skill, skillIndex) => (
                              <span key={skillIndex} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-gray-400 text-sm mb-2">Target Companies:</p>
                          <div className="flex flex-wrap gap-2">
                            {step.companies.map((company, companyIndex) => (
                              <span key={companyIndex} className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                                {company}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {index < currentPath.steps.length - 1 && (
                      <div className="flex justify-center my-2">
                        <ArrowRight className="h-5 w-5 text-gray-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </SciFiCard>
  );
}