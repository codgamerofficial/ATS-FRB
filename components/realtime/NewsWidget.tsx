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

  const generateDynamicNews = (): NewsArticle[] => {
    const newsTemplates = [
      { title: 'AI Revolution: {tech} Transforms {sector} Industry', desc: 'Latest {tech} technology revolutionizes {sector} sector with {percent}% efficiency improvement and breakthrough innovations.', source: 'Tech Today', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400' },
      { title: 'Global Markets: {index} Reaches Record {amount} Points', desc: 'International markets show unprecedented growth as {sector} sector leads with {percent}% gains this quarter.', source: 'Financial Express', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400' },
      { title: 'Climate Action: {number} Countries Commit to {target}', desc: 'Historic environmental agreement sees nations pledging {percent}% reduction in carbon emissions by {year}.', source: 'Global News', image: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400' },
      { title: 'Space Discovery: {mission} Finds {discovery} on {planet}', desc: 'Groundbreaking space mission reveals {discovery}, advancing our understanding of {subject} by {percent}%.', source: 'Space News', image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400' },
      { title: 'Medical Breakthrough: {treatment} Shows {percent}% Success', desc: 'Revolutionary {treatment} demonstrates remarkable results in treating {condition}, offering new hope to millions.', source: 'Health Today', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400' },
      { title: 'Energy Innovation: {tech} Increases Efficiency by {percent}%', desc: 'New {tech} technology promises to revolutionize renewable energy storage and distribution worldwide.', source: 'Energy Today', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400' }
    ];

    const replacements = {
      tech: ['AI', 'Blockchain', 'Quantum Computing', '5G', 'IoT', 'Machine Learning', 'Robotics'],
      sector: ['Healthcare', 'Finance', 'Education', 'Manufacturing', 'Transportation', 'Agriculture'],
      percent: [15, 20, 25, 30, 35, 40, 45, 50, 60, 75],
      index: ['NASDAQ', 'S&P 500', 'FTSE 100', 'Nikkei 225', 'DAX'],
      amount: ['25,000', '30,000', '35,000', '40,000', '45,000'],
      number: [50, 75, 100, 125, 150, 200],
      target: ['Carbon Neutrality', 'Zero Emissions', 'Green Energy', 'Sustainable Development'],
      year: [2025, 2026, 2027, 2028, 2030],
      mission: ['Mars Rover', 'Europa Explorer', 'Titan Probe', 'Asteroid Hunter'],
      discovery: ['Water Ice', 'Organic Compounds', 'Mineral Deposits', 'Atmospheric Gases'],
      planet: ['Mars', 'Europa', 'Titan', 'Enceladus'],
      subject: ['planetary geology', 'astrobiology', 'atmospheric science', 'space physics'],
      treatment: ['Gene Therapy', 'Immunotherapy', 'Stem Cell Treatment', 'Precision Medicine'],
      condition: ['cancer', 'diabetes', 'heart disease', 'neurological disorders']
    };

    const replaceTemplate = (template: string) => {
      return template.replace(/{(\w+)}/g, (match, key) => {
        const options = replacements[key as keyof typeof replacements];
        return options ? options[Math.floor(Math.random() * options.length)].toString() : match;
      });
    };

    return newsTemplates.map((template, index) => ({
      title: replaceTemplate(template.title),
      description: replaceTemplate(template.desc),
      url: `https://news.example.com/article/${Date.now()}-${index}`,
      urlToImage: template.image,
      publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      source: { name: template.source }
    }));
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const dynamicNews = generateDynamicNews();
      setNews(dynamicNews);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // Refresh news every 10 minutes for real-time updates
    const interval = setInterval(fetchNews, 10 * 60 * 1000);
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
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}