'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, Download, Eye } from 'lucide-react';
import Button from '@/components/ui/Button';
import SciFiCard from '@/components/ui/SciFiCard';
import SciFiBackground from '@/components/ui/SciFiBackground';
import { useDarkMode } from '@/hooks/useDarkMode';

const templates = [
  {
    id: 'executive-pro',
    name: 'Executive Pro',
    category: 'Professional',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=500&fit=crop',
    color: 'from-blue-500 to-purple-600',
    features: ['ATS Optimized', 'Clean Layout', 'Professional', 'Executive Level'],
    description: 'Perfect for senior executives and C-level positions. Clean, professional design that highlights leadership experience.',
    rating: 4.9,
    downloads: '12.5k'
  },
  {
    id: 'creative-edge',
    name: 'Creative Edge',
    category: 'Creative',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=500&fit=crop',
    color: 'from-pink-500 to-rose-600',
    features: ['Modern Design', 'Eye-catching', 'Creative Fields', 'Portfolio Ready'],
    description: 'Designed for creative professionals. Showcases your artistic skills while maintaining professionalism.',
    rating: 4.8,
    downloads: '8.3k'
  },
  {
    id: 'tech-innovator',
    name: 'Tech Innovator',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    color: 'from-green-500 to-teal-600',
    features: ['Tech-focused', 'Skills Highlight', 'Modern', 'GitHub Integration'],
    description: 'Built for software engineers and tech professionals. Emphasizes technical skills and projects.',
    rating: 4.9,
    downloads: '15.2k'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    category: 'Simple',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=500&fit=crop',
    color: 'from-gray-500 to-slate-600',
    features: ['Clean & Simple', 'Easy to Read', 'Versatile', 'ATS Friendly'],
    description: 'Clean and simple design that works for any industry. Focuses on content over decoration.',
    rating: 4.7,
    downloads: '20.1k'
  },
  {
    id: 'corporate-elite',
    name: 'Corporate Elite',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=500&fit=crop',
    color: 'from-indigo-500 to-blue-600',
    features: ['Executive Level', 'Sophisticated', 'Premium', 'Corporate Ready'],
    description: 'Sophisticated design for corporate environments. Perfect for finance, consulting, and business roles.',
    rating: 4.8,
    downloads: '9.7k'
  },
  {
    id: 'startup-founder',
    name: 'Startup Founder',
    category: 'Entrepreneurial',
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=500&fit=crop',
    color: 'from-orange-500 to-red-600',
    features: ['Dynamic', 'Leadership Focus', 'Bold', 'Innovation Ready'],
    description: 'Bold design for entrepreneurs and startup founders. Highlights innovation and leadership qualities.',
    rating: 4.6,
    downloads: '6.8k'
  }
];

const categories = ['All', 'Professional', 'Creative', 'Technology', 'Simple', 'Business', 'Entrepreneurial'];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isDark } = useDarkMode();

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SciFiBackground isDark={isDark} />
      
      {/* Header */}
      <div className="relative z-10 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Link href="/">
              <Button variant="ghost" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ textShadow: '0 0 30px rgba(0, 255, 255, 0.5)' }}>
              ✨ Premium Resume Templates
            </h1>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
              Choose from our collection of professionally designed, ATS-optimized templates. 
              Perfect for every industry and career level.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-gray-800/50 text-cyan-300 hover:bg-cyan-500/10 border border-cyan-500/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="group">
                <SciFiCard className="overflow-hidden h-full" isDark={isDark} variant="premium">
                  <div className="relative overflow-hidden">
                    <img 
                      src={template.image}
                      alt={template.name}
                      className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${template.color} opacity-20 group-hover:opacity-40 transition-all duration-500`}></div>
                    
                    {/* Stats Overlay */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between">
                      <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {template.category}
                      </span>
                      <div className="flex items-center bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                        <Star className="h-3 w-3 text-yellow-400 mr-1 fill-current" />
                        {template.rating}
                      </div>
                    </div>

                    {/* Download Count */}
                    <div className="absolute bottom-4 left-4 flex items-center bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      {template.downloads}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                    <p className="text-cyan-100 text-sm mb-4 line-clamp-2">{template.description}</p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {template.features.slice(0, 3).map((feature, i) => (
                        <span key={i} className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link href={`/builder?template=${template.id}`} className="flex-1">
                        <Button 
                          className={`w-full bg-gradient-to-r ${template.color} hover:shadow-xl transition-all duration-500 font-bold`}
                        >
                          ✨ Use Template
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/10"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </SciFiCard>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <SciFiCard className="inline-block" isDark={isDark}>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">🚀 Ready to Build Your Resume?</h3>
                <p className="text-cyan-200 mb-6 max-w-md">
                  Start with any template and customize it to match your unique style and experience.
                </p>
                <Link href="/builder">
                  <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 px-8 py-3">
                    🎯 Start Building Now
                  </Button>
                </Link>
              </div>
            </SciFiCard>
          </div>
        </div>
      </div>
    </div>
  );
}