'use client';

import { useState, useEffect } from 'react';
import { Bell, Globe, MapPin, Clock, ExternalLink, Newspaper } from 'lucide-react';
import SciFiCard from '@/components/ui/SciFiCard';
import Button from '@/components/ui/Button';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  category: string;
  location?: string;
  state?: string;
  city?: string;
}

const indianStates = [
  'All India', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Bhopal'
];

const newsCategories = ['All', 'Breaking', 'Politics', 'Business', 'Technology', 'Sports'];

export default function NewsSystem() {
  const [indianNews, setIndianNews] = useState<NewsItem[]>([]);
  const [worldNews, setWorldNews] = useState<NewsItem[]>([]);
  const [selectedState, setSelectedState] = useState('All India');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<'india' | 'world'>('india');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [notifications, setNotifications] = useState<NewsItem[]>([]);

  const generateDynamicNews = () => {
    const indianNewsTemplates = [
      { title: 'Delhi Metro Launches New {tech} Technology', desc: 'Delhi Metro introduces cutting-edge {tech} systems to enhance passenger experience and reduce travel time by {percent}%.', source: 'Delhi Metro Corporation', category: 'Technology', location: 'Delhi' },
      { title: 'Mumbai Stock Exchange Hits Record High of ₹{amount} Crore', desc: 'Bombay Stock Exchange reaches unprecedented trading volume as investors show confidence in {sector} sector growth.', source: 'Economic Times', category: 'Business', location: 'Mumbai' },
      { title: 'Bangalore IT Hub Attracts {number} New Startups', desc: 'Silicon Valley of India welcomes {number} innovative startups in {sector} sector, creating {jobs} new job opportunities.', source: 'Tech Today India', category: 'Technology', location: 'Bangalore' },
      { title: 'Chennai Port Handles {amount} Million Tonnes Cargo', desc: 'Chennai Port Authority reports record cargo handling, boosting South India trade by {percent}% this quarter.', source: 'Port Authority News', category: 'Business', location: 'Chennai' },
      { title: 'Hyderabad Pharma Sector Exports Worth ${amount} Billion', desc: 'Hyderabad pharmaceutical companies achieve milestone exports, contributing {percent}% to India\'s total pharma exports.', source: 'Pharma Business', category: 'Business', location: 'Hyderabad' },
      { title: 'Kolkata Cultural Festival Attracts {number} Visitors', desc: 'Annual Kolkata cultural festival showcases Bengal\'s rich heritage, drawing visitors from {countries} countries worldwide.', source: 'Cultural India', category: 'Breaking', location: 'Kolkata' },
      { title: 'Pune Automotive Sector Launches {number} Electric Vehicles', desc: 'Pune\'s automotive industry unveils new electric vehicle models, targeting {percent}% market share by 2025.', source: 'Auto India', category: 'Technology', location: 'Pune' },
      { title: 'Ahmedabad Smart City Project Completes Phase {phase}', desc: 'Ahmedabad smart city initiative reaches new milestone with {tech} implementation across {number} districts.', source: 'Smart Cities India', category: 'Technology', location: 'Ahmedabad' }
    ];

    const worldNewsTemplates = [
      { title: 'Global AI Summit Announces ${amount} Billion Investment', desc: 'World leaders commit to massive AI research funding, focusing on {sector} applications and ethical development.', source: 'Tech Global', category: 'Technology', location: 'International' },
      { title: 'Climate Action: {number} Countries Pledge Carbon Neutrality', desc: 'Historic climate agreement sees {number} nations committing to net-zero emissions by {year}.', source: 'Climate News', category: 'Breaking', location: 'International' },
      { title: 'Space Exploration: {mission} Mission Discovers {discovery}', desc: 'Latest space mission provides groundbreaking insights into {subject}, revolutionizing our understanding of the universe.', source: 'Space Today', category: 'Technology', location: 'International' },
      { title: 'Global Markets: {index} Index Reaches {amount} Points', desc: 'International markets show strong performance with {sector} sector leading gains of {percent}% this week.', source: 'Financial Global', category: 'Business', location: 'International' },
      { title: 'Medical Breakthrough: New {treatment} Shows {percent}% Success Rate', desc: 'Revolutionary medical treatment demonstrates remarkable results in clinical trials, offering hope for {condition} patients.', source: 'Medical News', category: 'Breaking', location: 'International' }
    ];

    const replacements = {
      tech: ['AI', 'Blockchain', 'IoT', '5G', 'Quantum Computing', 'AR/VR', 'Machine Learning'],
      percent: [15, 20, 25, 30, 35, 40, 45, 50],
      amount: [500, 750, 1000, 1250, 1500, 2000, 2500, 3000],
      number: [50, 100, 150, 200, 250, 300, 500, 1000],
      sector: ['Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Renewable Energy'],
      jobs: [5000, 10000, 15000, 20000, 25000, 30000],
      countries: [25, 30, 35, 40, 45, 50],
      phase: [2, 3, 4, 5],
      year: [2025, 2026, 2027, 2028, 2030],
      mission: ['Mars Explorer', 'Europa Probe', 'Titan Survey', 'Asteroid Hunter'],
      discovery: ['Water Deposits', 'Organic Compounds', 'Mineral Resources', 'Atmospheric Phenomena'],
      subject: ['planetary formation', 'cosmic radiation', 'dark matter', 'exoplanet atmospheres'],
      index: ['NASDAQ', 'S&P 500', 'FTSE', 'Nikkei', 'DAX'],
      treatment: ['Gene Therapy', 'Immunotherapy', 'Stem Cell Treatment', 'Precision Medicine'],
      condition: ['cancer', 'diabetes', 'heart disease', 'neurological disorders']
    };

    const replaceTemplate = (template: string) => {
      return template.replace(/{(\w+)}/g, (match, key) => {
        const options = replacements[key as keyof typeof replacements];
        return options ? options[Math.floor(Math.random() * options.length)].toString() : match;
      });
    };

    const generateNewsFromTemplates = (templates: any[], prefix: string) => {
      return templates.map((template, index) => ({
        id: `${prefix}-${Date.now()}-${index}`,
        title: replaceTemplate(template.title),
        description: replaceTemplate(template.desc),
        url: `https://news.example.com/article/${Date.now()}-${index}`,
        source: template.source,
        publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        category: template.category,
        location: template.location,
        state: template.location,
        city: template.location
      }));
    };

    return {
      indian: generateNewsFromTemplates(indianNewsTemplates, 'in'),
      world: generateNewsFromTemplates(worldNewsTemplates, 'w')
    };
  };

  const fetchNews = async () => {
    setLoading(true);
    
    // Generate dynamic news content
    const dynamicNews = generateDynamicNews();

    setIndianNews(dynamicNews.indian);
    setWorldNews(dynamicNews.world);
    setLastUpdated(new Date());
    setLoading(false);

    // Check for breaking news
    const recentNews = [...dynamicNews.indian, ...dynamicNews.world].filter(item => {
      const publishedTime = new Date(item.publishedAt).getTime();
      const now = Date.now();
      return (now - publishedTime) < 3600000 && item.category === 'Breaking';
    });

    if (recentNews.length > 0) {
      setNotifications(recentNews.slice(0, 3));
    }
  };

  const filterNews = (news: NewsItem[]) => {
    return news.filter(item => {
      const matchesState = selectedState === 'All India' || 
                          item.state === selectedState || 
                          item.location === selectedState;
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesState && matchesCategory;
    });
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 5 * 60 * 1000); // Refresh every 5 minutes for real-time updates
    return () => clearInterval(interval);
  }, []);

  const currentNews = activeTab === 'india' ? filterNews(indianNews) : filterNews(worldNews);

  return (
    <div className="space-y-6">
      {/* Breaking News Notifications */}
      {notifications.length > 0 && (
        <SciFiCard className="border-red-500/50 bg-red-500/10" variant="glow">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Bell className="h-5 w-5 text-red-400 animate-pulse" />
              <span className="text-red-400 font-bold">🚨 Breaking News</span>
            </div>
            <div className="space-y-2">
              {notifications.map(item => (
                <div key={item.id} className="text-sm text-red-200">
                  <span className="font-medium">{item.title}</span>
                  <span className="text-red-300 ml-2">• {item.source}</span>
                </div>
              ))}
            </div>
          </div>
        </SciFiCard>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">📰 Live News Updates</h2>
          <div className="flex items-center space-x-2 text-sm text-cyan-300">
            <Clock className="h-4 w-4" />
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </div>
        
        <Button
          onClick={fetchNews}
          size="sm"
          className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50"
        >
          🔄 Refresh
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('india')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            activeTab === 'india'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
          }`}
        >
          <MapPin className="h-4 w-4" />
          <span>🇮🇳 India News</span>
        </button>
        <button
          onClick={() => setActiveTab('world')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            activeTab === 'world'
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
          }`}
        >
          <Globe className="h-4 w-4" />
          <span>🌍 World News</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeTab === 'india' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">State/City</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
            >
              {indianStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
          >
            {newsCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* News Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SciFiCard key={i} className="animate-pulse">
              <div className="p-4">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded mb-4"></div>
                <div className="h-20 bg-gray-700 rounded"></div>
              </div>
            </SciFiCard>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentNews.map((item) => (
            <SciFiCard key={item.id} className="group hover:scale-105 transition-all duration-300" variant="glow">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Newspaper className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-400">{item.source}</span>
                  </div>
                  
                  {item.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-orange-400" />
                      <span className="text-xs text-orange-300">{item.location}</span>
                    </div>
                  )}
                </div>
                
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 text-sm transition-colors group"
                >
                  <span>Read Full Article</span>
                  <ExternalLink className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </SciFiCard>
          ))}
        </div>
      )}

      {currentNews.length === 0 && !loading && (
        <div className="text-center py-12">
          <Newspaper className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No news found for the selected filters.</p>
        </div>
      )}
    </div>
  );
}