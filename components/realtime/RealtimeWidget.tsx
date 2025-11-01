'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, MapPin, Globe, Newspaper } from 'lucide-react';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: { name: string };
}

interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  countryCode: string;
  timezone: string;
}

export default function RealtimeWidget() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState<LocationData | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const getLocationAndData = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              const locationResponse = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              const locationData = await locationResponse.json();
              
              setLocation({
                latitude,
                longitude,
                city: locationData.city || locationData.locality || 'Unknown',
                country: locationData.countryName || 'Unknown',
                countryCode: locationData.countryCode || 'XX',
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
              });

              await fetchNews();
              setLoading(false);
            },
            async () => {
              try {
                const ipResponse = await fetch('https://ipapi.co/json/');
                const ipData = await ipResponse.json();
                
                setLocation({
                  latitude: ipData.latitude,
                  longitude: ipData.longitude,
                  city: ipData.city,
                  country: ipData.country_name,
                  countryCode: ipData.country_code,
                  timezone: ipData.timezone
                });
              } catch (error) {
                console.error('Error getting location:', error);
              }
              
              await fetchNews();
              setLoading(false);
            }
          );
        } else {
          await fetchNews();
          setLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    getLocationAndData();
  }, []);

  const fetchNews = async () => {
    try {
      setNews([
        {
          title: "Global Technology Trends 2024",
          description: "Latest developments in AI and machine learning continue to shape industries worldwide.",
          url: "#",
          publishedAt: new Date().toISOString(),
          source: { name: "Tech News" }
        },
        {
          title: "Economic Markets Update",
          description: "Stock markets show positive trends as investors remain optimistic about future growth.",
          url: "#",
          publishedAt: new Date().toISOString(),
          source: { name: "Financial Times" }
        },
        {
          title: "Climate Change Initiative",
          description: "New international agreements aim to reduce carbon emissions by 50% in the next decade.",
          url: "#",
          publishedAt: new Date().toISOString(),
          source: { name: "Environmental News" }
        }
      ]);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCountryFlag = (countryCode: string) => {
    return `https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`;
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <Clock className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Time</h3>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-mono font-bold text-blue-600 dark:text-blue-400 mb-2">
            {formatTime(currentTime)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {formatDate(currentTime)}
          </div>
          
          {location && (
            <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="h-4 w-4 mr-1" />
              <img 
                src={getCountryFlag(location.countryCode)} 
                alt={location.country}
                className="w-4 h-3 mr-2"
              />
              {location.city}, {location.country}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <Globe className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Location</h3>
        </div>
        
        {location ? (
          <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude-0.01},${location.latitude-0.01},${location.longitude+0.01},${location.latitude+0.01}&layer=mapnik&marker=${location.latitude},${location.longitude}`}
              className="w-full h-full border-0"
              title="Location Map"
            />
            <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs">
              <img 
                src={getCountryFlag(location.countryCode)} 
                alt={location.country}
                className="w-4 h-3 inline mr-1"
              />
              {location.countryCode}
            </div>
          </div>
        ) : (
          <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Location not available</p>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <Newspaper className="h-5 w-5 text-red-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Daily News</h3>
        </div>
        
        <div className="space-y-3 max-h-32 overflow-y-auto">
          {news.slice(0, 3).map((article, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 mb-1">
                {article.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {article.source.name} • {new Date(article.publishedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
        
        <button className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline">
          View more news →
        </button>
      </div>
    </div>
  );
}