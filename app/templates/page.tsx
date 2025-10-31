'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import UserMenu from '@/components/ui/UserMenu';
import SciFiBackground from '@/components/ui/SciFiBackground';
import SciFiCard from '@/components/ui/SciFiCard';
import { useAuth } from '@/hooks/useAuth';
import { FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and modern design perfect for tech professionals',
    preview: '/api/placeholder/300/400',
    isPremium: false
  },
  {
    id: 'classic',
    name: 'Classic Executive',
    description: 'Traditional format ideal for corporate positions',
    preview: '/api/placeholder/300/400',
    isPremium: false
  },
  {
    id: 'creative',
    name: 'Creative Designer',
    description: 'Stylish template for creative professionals',
    preview: '/api/placeholder/300/400',
    isPremium: true
  },
  {
    id: 'ats',
    name: 'ATS Optimized',
    description: 'Specifically designed to pass Applicant Tracking Systems',
    preview: '/api/placeholder/300/400',
    isPremium: false
  }
];

export default function TemplatesPage() {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen relative">
      <SciFiBackground />
      <nav className="relative z-10 bg-gray-900/80 backdrop-blur-md border-b border-cyan-500/30 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <FileText className="h-8 w-8 text-cyan-400" />
                <span className="ml-2 text-xl font-bold text-white">ATSFRB</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <DarkModeToggle />
              {!loading && (
                user ? (
                  <UserMenu />
                ) : (
                  <Link href="/auth">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Template
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select from our collection of professional, ATS-friendly resume templates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SciFiCard className="overflow-hidden hover:shadow-cyan-500/20 transition-all duration-300">
                <div className="aspect-[3/4] bg-gray-800/50 flex items-center justify-center border-b border-cyan-500/20">
                  <FileText className="w-16 h-16 text-cyan-400" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {template.name}
                    </h3>
                    {template.isPremium && (
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                        Premium
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">
                    {template.description}
                  </p>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Preview
                    </Button>
                    <Link href={`/builder?template=${template.id}`} className="flex-1">
                      <Button size="sm" className="w-full">
                        Use Template
                      </Button>
                    </Link>
                  </div>
                </div>
              </SciFiCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}