'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Phone, Mail, MapPin, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import SciFiCard from '@/components/ui/SciFiCard';
import SciFiBackground from '@/components/ui/SciFiBackground';
import Logo from '@/components/ui/Logo';
import { useDarkMode } from '@/hooks/useDarkMode';
import Link from 'next/link';

const topColleges = [
  {
    name: 'Indian Institute of Technology Delhi',
    location: 'New Delhi',
    ranking: 1,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
    website: 'https://home.iitd.ac.in/',
    phone: '+91-11-2659-1000',
    email: 'registrar@admin.iitd.ac.in',
    established: 1961,
    type: 'Engineering & Technology'
  },
  {
    name: 'Indian Institute of Science Bangalore',
    location: 'Bangalore, Karnataka',
    ranking: 2,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    website: 'https://www.iisc.ac.in/',
    phone: '+91-80-2293-2001',
    email: 'registrar@iisc.ac.in',
    established: 1909,
    type: 'Science & Research'
  },
  {
    name: 'Indian Institute of Technology Bombay',
    location: 'Mumbai, Maharashtra',
    ranking: 3,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    website: 'https://www.iitb.ac.in/',
    phone: '+91-22-2572-2545',
    email: 'registrar@iitb.ac.in',
    established: 1958,
    type: 'Engineering & Technology'
  },
  {
    name: 'All India Institute of Medical Sciences Delhi',
    location: 'New Delhi',
    ranking: 4,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
    website: 'https://www.aiims.edu/',
    phone: '+91-11-2658-8500',
    email: 'director@aiims.ac.in',
    established: 1956,
    type: 'Medical Sciences'
  },
  {
    name: 'Indian Institute of Technology Madras',
    location: 'Chennai, Tamil Nadu',
    ranking: 5,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
    website: 'https://www.iitm.ac.in/',
    phone: '+91-44-2257-4802',
    email: 'registrar@iitm.ac.in',
    established: 1959,
    type: 'Engineering & Technology'
  },
  {
    name: 'Indian Institute of Technology Kanpur',
    location: 'Kanpur, Uttar Pradesh',
    ranking: 6,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
    website: 'https://www.iitk.ac.in/',
    phone: '+91-512-259-7000',
    email: 'registrar@iitk.ac.in',
    established: 1959,
    type: 'Engineering & Technology'
  }
];

export default function CollegesPage() {
  const { isDark } = useDarkMode();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SciFiBackground isDark={isDark} />
      
      <nav className="bg-gray-900/20 backdrop-blur-md border-b border-cyan-500/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-cyan-500/30"></div>
              <Logo size={24} />
              <span className="text-lg font-bold text-cyan-400">India's The Best</span>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4" style={{ textShadow: '0 0 30px rgba(255, 153, 51, 0.5)' }}>
            🇮🇳 India's The Best Colleges
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-8">
            Discover India's premier educational institutions. Connect directly with top-ranked colleges and universities.
          </p>
        </div>
      </section>

      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topColleges.map((college, index) => (
              <div key={index}>
                <SciFiCard className="h-full overflow-hidden" isDark={isDark}>
                  <div className="relative">
                    <img 
                      src={college.image} 
                      alt={college.name}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      #{college.ranking}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{college.name}</h3>
                    <div className="flex items-center text-cyan-300 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {college.location}
                    </div>
                    <div className="text-orange-300 text-sm mb-3">
                      Est. {college.established} • {college.type}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-cyan-200 text-sm">
                        <Phone className="h-3 w-3 mr-2" />
                        <a href={`tel:${college.phone}`} className="hover:text-cyan-400">
                          {college.phone}
                        </a>
                      </div>
                      <div className="flex items-center text-cyan-200 text-sm">
                        <Mail className="h-3 w-3 mr-2" />
                        <a href={`mailto:${college.email}`} className="hover:text-cyan-400 truncate">
                          {college.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <a 
                        href={college.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button size="sm" className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-xs">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit Website
                        </Button>
                      </a>
                      <a href={`tel:${college.phone}`}>
                        <Button size="sm" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
                          <Phone className="h-3 w-3" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </SciFiCard>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}