'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, Video, MessageCircle, FileText } from 'lucide-react';
import Button from '@/components/ui/Button';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import Link from 'next/link';

const helpCategories = [
  {
    icon: FileText,
    title: 'Getting Started',
    description: 'Learn the basics of creating your first resume',
    articles: 12
  },
  {
    icon: Book,
    title: 'Resume Writing Tips',
    description: 'Expert advice on writing compelling resumes',
    articles: 25
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Step-by-step video guides',
    articles: 8
  },
  {
    icon: MessageCircle,
    title: 'ATS Optimization',
    description: 'Make your resume ATS-friendly',
    articles: 15
  }
];

const popularArticles = [
  'How to write a professional summary',
  'ATS-friendly resume formatting tips',
  'Common resume mistakes to avoid',
  'How to showcase your skills effectively',
  'Writing compelling job descriptions'
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary-600">ResumeBuilder</Link>
          <DarkModeToggle />
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Find answers to your questions and learn how to create the perfect resume
          </p>
          
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {helpCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg">
                  <category.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {category.description}
                  </p>
                  <span className="text-sm text-primary-600 dark:text-primary-400">
                    {category.articles} articles
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Popular Articles
          </h2>
          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                <Book className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span className="text-gray-700 dark:text-gray-300">{article}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Can't find what you're looking for?
          </p>
          <Link href="/contact">
            <Button>Contact Support</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}