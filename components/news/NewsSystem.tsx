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

  const fetchNews = async () => {
    setLoading(true);
    
    // Mock Indian News Data
    const mockIndianNews: NewsItem[] = [
      {
        id: 'in-1',
        title: 'Delhi Metro Expands Green Line with New Stations',
        description: 'Delhi Metro Rail Corporation announces expansion of Green Line with 5 new stations, improving connectivity across NCR region.',
        url: '#',
        source: 'Delhi Metro News',
        publishedAt: new Date().toISOString(),
        category: 'Breaking',
        location: 'Delhi',
        state: 'Delhi',
        city: 'New Delhi'
      },
      {
        id: 'in-2',
        title: 'Mumbai IT Sector Sees 25% Growth in Q4',
        description: 'Mumbai\'s IT sector reports significant growth with major companies expanding operations and hiring.',
        url: '#',
        source: 'Business Today',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        category: 'Business',
        location: 'Mumbai',
        state: 'Mumbai',
        city: 'Mumbai'
      },
      {
        id: 'in-3',
        title: 'Bangalore Becomes India\'s Silicon Valley Hub',
        description: 'Bangalore continues to attract global tech giants with new innovation centers and startup incubators.',
        url: '#',
        source: 'Tech India',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        category: 'Technology',
        location: 'Bangalore',
        state: 'Bangalore',
        city: 'Bangalore'
      },
      {
        id: 'in-4',
        title: 'Chennai Port Handles Record Cargo Volume',
        description: 'Chennai Port Trust reports handling record cargo volume, boosting South India\'s trade connectivity.',
        url: '#',
        source: 'Port Authority',
        publishedAt: new Date(Date.now() - 10800000).toISOString(),
        category: 'Business',
        location: 'Chennai',
        state: 'Chennai',
        city: 'Chennai'
      },
      {
        id: 'in-5',
        title: 'Kolkata Metro Pink Line Opens New Phase',
        description: 'Kolkata Metro\'s Pink Line inaugurates new phase connecting Salt Lake to Airport, reducing travel time significantly.',
        url: '#',
        source: 'Kolkata Metro',
        publishedAt: new Date(Date.now() - 14400000).toISOString(),
        category: 'Breaking',
        location: 'Kolkata',
        state: 'Kolkata',
        city: 'Kolkata'
      },
      {
        id: 'in-6',
        title: 'Hyderabad Emerges as Pharma Capital',
        description: 'Hyderabad strengthens position as India\'s pharmaceutical hub with new research facilities and manufacturing units.',
        url: '#',
        source: 'Pharma News',
        publishedAt: new Date(Date.now() - 18000000).toISOString(),
        category: 'Business',
        location: 'Hyderabad',
        state: 'Hyderabad',
        city: 'Hyderabad'
      }
    ];

    // Mock World News Data
    const mockWorldNews: NewsItem[] = [
      {
        id: 'w-1',
        title: 'Global Climate Summit Reaches Historic Agreement',
        description: 'World leaders agree on ambitious climate targets for 2030, marking a significant step in environmental protection.',
        url: '#',
        source: 'Global News',
        publishedAt: new Date().toISOString(),
        category: 'Breaking',
        location: 'International'
      },
      {
        id: 'w-2',
        title: 'Tech Giants Announce AI Safety Partnership',
        description: 'Major technology companies form alliance to ensure responsible AI development and deployment.',
        url: '#',
        source: 'Tech World',
        publishedAt: new Date(Date.now() - 1800000).toISOString(),
        category: 'Technology',
        location: 'International'
      },
      {
        id: 'w-3',
        title: 'Global Markets Show Strong Recovery',
        description: 'International stock markets demonstrate resilience with positive growth across major economies.',
        url: '#',
        source: 'Financial Times',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        category: 'Business',
        location: 'International'
      },
      {
        id: 'w-4',
        title: 'Space Mission Discovers New Exoplanets',
        description: 'NASA\'s latest space mission identifies potentially habitable exoplanets in distant solar systems.',
        url: '#',
        source: 'Space News',
        publishedAt: new Date(Date.now() - 5400000).toISOString(),
        category: 'Technology',
        location: 'International'
      }
    ];

    setIndianNews(mockIndianNews);
    setWorldNews(mockWorldNews);
    setLastUpdated(new Date());
    setLoading(false);

    // Check for breaking news
    const recentNews = [...mockIndianNews, ...mockWorldNews].filter(item => {
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
    const interval = setInterval(fetchNews, 15 * 60 * 1000); // Refresh every 15 minutes
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
                
                <button className="mt-3 flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                  <span>Read more</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
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