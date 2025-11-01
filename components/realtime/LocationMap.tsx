'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Navigation, Compass } from 'lucide-react';

interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  countryCode: string;
  region: string;
  timezone: string;
  accuracy?: number;
}

export default function LocationMap() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude, accuracy } = position.coords;
              
              try {
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                );
                const data = await response.json();
                
                setLocation({
                  latitude,
                  longitude,
                  city: data.city || data.locality || 'Unknown City',
                  country: data.countryName || 'Unknown Country',
                  countryCode: data.countryCode || 'XX',
                  region: data.principalSubdivision || data.region || 'Unknown Region',
                  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                  accuracy
                });
              } catch (err) {
                console.error('Geocoding error:', err);
                setLocation({
                  latitude,
                  longitude,
                  city: 'Unknown City',
                  country: 'Unknown Country',
                  countryCode: 'XX',
                  region: 'Unknown Region',
                  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                  accuracy
                });
              }
              setLoading(false);
            },
            async (err) => {
              console.error('Geolocation error:', err);
              // Fallback to IP-based location
              try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                
                setLocation({
                  latitude: data.latitude,
                  longitude: data.longitude,
                  city: data.city || 'Unknown City',
                  country: data.country_name || 'Unknown Country',
                  countryCode: data.country_code || 'XX',
                  region: data.region || 'Unknown Region',
                  timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
                });
              } catch (ipErr) {
                console.error('IP location error:', ipErr);
                setError('Unable to determine location');
              }
              setLoading(false);
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 300000 // 5 minutes
            }
          );
        } else {
          setError('Geolocation not supported');
          setLoading(false);
        }
      } catch (err) {
        console.error('Location error:', err);
        setError('Location access denied');
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  const getCountryFlag = (countryCode: string) => {
    return `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`;
  };

  const getMapUrl = (lat: number, lng: number) => {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.02},${lat-0.02},${lng+0.02},${lat+0.02}&layer=mapnik&marker=${lat},${lng}`;
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="animate-pulse">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded mr-3"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center mb-4">
          <MapPin className="h-6 w-6 text-red-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Location</h2>
        </div>
        <div className="text-center py-8">
          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">{error}</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            Please enable location access to see your current location
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Location</h2>
          </div>
          {location && (
            <div className="flex items-center">
              <img 
                src={getCountryFlag(location.countryCode)} 
                alt={location.country}
                className="w-8 h-6 mr-2 rounded shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {location.countryCode}
              </span>
            </div>
          )}
        </div>
        </div>

        {location && (
          <div className="p-6">
          <div className="mb-6">
            <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden relative">
              <iframe
                src={getMapUrl(location.latitude, location.longitude)}
                className="w-full h-full border-0"
                title="Your Location Map"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Live</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Navigation className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">City</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {location.city}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Globe className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Country</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {location.country}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Compass className="h-4 w-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Coordinates</span>
              </div>
              <p className="text-sm font-mono text-gray-900 dark:text-white">
                {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </p>
              {location.accuracy && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Accuracy: ±{Math.round(location.accuracy)}m
                </p>
              )}
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Timezone: {location.timezone}
              </p>
            </div>
          </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}