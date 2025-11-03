'use client';

import { useState, useEffect } from 'react';
import { Target, MapPin, DollarSign, Clock, ExternalLink, Briefcase } from 'lucide-react';
import SciFiCard from '@/components/ui/SciFiCard';
import Button from '@/components/ui/Button';

interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  matchScore: number;
  skills: string[];
  posted: string;
  url: string;
}

export default function AIJobMatcher() {
  const [jobs, setJobs] = useState<JobMatch[]>([]);
  const [loading, setLoading] = useState(true);

  const generateJobMatches = (): JobMatch[] => {
    const companies = ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Tesla', 'Spotify', 'Uber', 'Airbnb'];
    const locations = ['San Francisco, CA', 'Seattle, WA', 'New York, NY', 'Austin, TX', 'Boston, MA', 'Remote'];
    const jobTitles = ['Senior Software Engineer', 'Full Stack Developer', 'Data Scientist', 'Product Manager', 'DevOps Engineer', 'ML Engineer'];
    const skillSets = [
      ['React', 'TypeScript', 'Node.js', 'AWS'],
      ['Python', 'TensorFlow', 'SQL', 'Docker'],
      ['Java', 'Spring', 'Kubernetes', 'MongoDB'],
      ['JavaScript', 'Vue.js', 'GraphQL', 'Redis'],
      ['Go', 'PostgreSQL', 'Microservices', 'CI/CD']
    ];

    return Array.from({ length: 6 }, (_, index) => ({
      id: `job-${Date.now()}-${index}`,
      title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      salary: `$${Math.floor(Math.random() * 100 + 120)}K - $${Math.floor(Math.random() * 100 + 180)}K`,
      type: Math.random() > 0.5 ? 'Full-time' : 'Contract',
      matchScore: Math.floor(Math.random() * 30 + 70),
      skills: skillSets[Math.floor(Math.random() * skillSets.length)],
      posted: `${Math.floor(Math.random() * 7 + 1)} days ago`,
      url: 'https://www.linkedin.com/jobs/'
    }));
  };

  useEffect(() => {
    const fetchJobs = () => {
      setLoading(true);
      setTimeout(() => {
        setJobs(generateJobMatches());
        setLoading(false);
      }, 1000);
    };

    fetchJobs();
    const interval = setInterval(fetchJobs, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-400 bg-green-500/20';
    if (score >= 80) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-orange-400 bg-orange-500/20';
  };

  return (
    <SciFiCard className="p-6" variant="premium">
      <div className="flex items-center space-x-3 mb-6">
        <Target className="h-6 w-6 text-cyan-400" />
        <h2 className="text-xl font-bold text-white">🎯 AI Job Matcher</h2>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse border border-gray-600/30 rounded-lg p-4">
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="border border-gray-600/30 rounded-lg p-4 hover:border-cyan-400/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold text-lg">{job.title}</h3>
                  <p className="text-cyan-400 font-medium">{job.company}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getMatchColor(job.matchScore)}`}>
                  {job.matchScore}% Match
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div className="flex items-center space-x-2 text-gray-300">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <DollarSign className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Briefcase className="h-4 w-4" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="h-4 w-4" />
                  <span>{job.posted}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Required Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <a href={job.url} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Apply Now
                </Button>
              </a>
            </div>
          ))}
        </div>
      )}
    </SciFiCard>
  );
}