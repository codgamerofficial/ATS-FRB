'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ExternalLink, RefreshCw } from 'lucide-react';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
}

export default function NewsWidget() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Mock news data for demo
      const mockNews: NewsArticle[] = [
        {
          title: "AI Revolution: ChatGPT and Beyond Transform Industries",
          description: "Artificial intelligence continues to reshape how we work, with new applications emerging daily across healthcare, finance, and education sectors.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
          publishedAt: new Date().toISOString(),
          source: { name: "Tech Today" }
        },
        {
          title: "Global Climate Summit Reaches Historic Agreement",
          description: "World leaders unite on ambitious carbon reduction targets, promising a 60% decrease in emissions by 2030.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400",
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          source: { name: "Global News" }
        },
        {
          title: "Stock Markets Hit Record Highs Amid Economic Recovery",
          description: "Major indices surge as investors show confidence in post-pandemic economic growth and technological innovation.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
          publishedAt: new Date(Date.now() - 7200000).toISOString(),
          source: { name: "Financial Express" }
        },
        {
          title: "Space Exploration Milestone: Mars Mission Success",
          description: "Latest rover mission provides unprecedented insights into Martian geology and potential for past life.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400",
          publishedAt: new Date(Date.now() - 10800000).toISOString(),
          source: { name: "Space News" }
        },
        {
          title: "Breakthrough in Renewable Energy Storage Technology",
          description: "New battery technology promises to store solar and wind energy for weeks, revolutionizing clean energy adoption.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
          publishedAt: new Date(Date.now() - 14400000).toISOString(),
          source: { name: "Energy Today" }
        }
      ];
      
      setNews(mockNews);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // Refresh news every 30 minutes
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Newspaper className="h-6 w-6 text-red-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Daily World News</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
            <button
              onClick={fetchNews}
              disabled={loading}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex space-x-4">
                  <div className="w-20 h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {news.map((article, index) => (
              <article
                key={index}
                className="flex space-x-4 group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-3 rounded-lg transition-colors"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                <div className="flex-shrink-0">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-20 h-16 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                      {article.source.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimeAgo(article.publishedAt)}
                      </span>
                      <ExternalLink className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
                </motion.div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}