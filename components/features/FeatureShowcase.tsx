'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Users, 
  BarChart3, 
  FileText, 
  QrCode, 
  Shuffle,
  Save,
  Eye,
  Download,
  Share2,
  Zap,
  CheckCircle
} from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  status: 'implemented' | 'in-progress' | 'planned';
  category: 'resume' | 'ux' | 'export' | 'backend';
}

const features: Feature[] = [
  {
    id: 'multiple-templates',
    title: 'Multiple Resume Templates',
    description: 'Choose from 100+ professional templates with different themes and layouts',
    icon: Palette,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    status: 'implemented',
    category: 'resume'
  },
  {
    id: 'real-time-collaboration',
    title: 'Real-time Collaboration',
    description: 'Work together with others in real-time with live cursors and changes',
    icon: Users,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    status: 'implemented',
    category: 'resume'
  },
  {
    id: 'ats-checker',
    title: 'ATS Compatibility Checker',
    description: 'Get instant feedback on how ATS-friendly your resume is with scoring',
    icon: BarChart3,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    status: 'implemented',
    category: 'resume'
  },
  {
    id: 'dark-mode',
    title: 'Dark/Light Mode Toggle',
    description: 'Switch between dark and light themes with smooth animations',
    icon: Eye,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    status: 'implemented',
    category: 'ux'
  },
  {
    id: 'analytics-dashboard',
    title: 'Resume Analytics Dashboard',
    description: 'Track views, downloads, and get insights about your resume performance',
    icon: BarChart3,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    status: 'implemented',
    category: 'ux'
  },
  {
    id: 'drag-drop',
    title: 'Drag-and-Drop Sections',
    description: 'Reorder resume sections by dragging and dropping them',
    icon: Shuffle,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    status: 'implemented',
    category: 'ux'
  },
  {
    id: 'auto-save',
    title: 'Auto-save Functionality',
    description: 'Never lose your work with automatic saving every few seconds',
    icon: Save,
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
    status: 'implemented',
    category: 'ux'
  },
  {
    id: 'multiple-formats',
    title: 'Multiple Export Formats',
    description: 'Export to PDF, Word, HTML, and more formats',
    icon: Download,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    status: 'implemented',
    category: 'export'
  },
  {
    id: 'qr-codes',
    title: 'QR Code Generation',
    description: 'Generate QR codes for contact info, portfolio, and social links',
    icon: QrCode,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    status: 'implemented',
    category: 'export'
  }
];

export default function FeatureShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Features', count: features.length },
    { id: 'resume', label: 'Resume Features', count: features.filter(f => f.category === 'resume').length },
    { id: 'ux', label: 'User Experience', count: features.filter(f => f.category === 'ux').length },
    { id: 'export', label: 'Export/Sharing', count: features.filter(f => f.category === 'export').length }
  ];

  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(f => f.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'text-green-400';
      case 'in-progress': return 'text-yellow-400';
      case 'planned': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Powerful Features for Modern Resumes
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Discover all the advanced features that make our ATS Resume Builder the most comprehensive solution for job seekers
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${selectedCategory === category.id
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }
            `}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeatures.map((feature, index) => (
          <div
            key={feature.id}
            className={`
              ${feature.bgColor} border border-gray-700 rounded-lg p-6
              hover:border-cyan-500/50 transition-all duration-200 hover:scale-105
              group relative overflow-hidden
            `}
          >
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <feature.icon className={`w-8 h-8 ${feature.color} group-hover:scale-110 transition-transform`} />
                <div className="flex items-center space-x-2">
                  <CheckCircle className={`w-4 h-4 ${getStatusColor(feature.status)}`} />
                  <span className={`text-xs font-medium ${getStatusColor(feature.status)} capitalize`}>
                    {feature.status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-4">
                <span className="inline-block px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full capitalize">
                  {feature.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">
            {features.filter(f => f.status === 'implemented').length}
          </div>
          <div className="text-gray-300">Features Implemented</div>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-yellow-400 mb-2">
            {features.filter(f => f.status === 'in-progress').length}
          </div>
          <div className="text-gray-300">In Development</div>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-cyan-400 mb-2">
            {features.length}
          </div>
          <div className="text-gray-300">Total Features</div>
        </div>
      </div>
    </div>
  );
}