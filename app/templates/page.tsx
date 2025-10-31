'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import UserMenu from '@/components/ui/UserMenu';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <FileText className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">ResumeBuilder</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors duration-300">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Choose Your Template
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
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
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <FileText className="w-16 h-16 text-gray-400" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                    {template.name}
                  </h3>
                  {template.isPremium && (
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                      Premium
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 transition-colors duration-300">
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}