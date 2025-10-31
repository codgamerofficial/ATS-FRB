'use client';

import { motion } from 'framer-motion';
import { Download, Eye, Star } from 'lucide-react';
import Button from '@/components/ui/Button';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import Link from 'next/link';

const examples = [
  {
    id: 1,
    name: 'Saswata Dey',
    role: 'Computer Science Student & Data Analyst',
    image: '/api/placeholder/300/400',
    rating: 5,
    downloads: 1200,
    description: 'Perfect for CS students and data analysts with internship experience'
  },
  {
    id: 2,
    name: 'Software Engineer',
    role: 'Full Stack Developer',
    image: '/api/placeholder/300/400',
    rating: 5,
    downloads: 2100,
    description: 'Ideal for software engineers with 2-5 years experience'
  },
  {
    id: 3,
    name: 'Marketing Manager',
    role: 'Digital Marketing Specialist',
    image: '/api/placeholder/300/400',
    rating: 4,
    downloads: 890,
    description: 'Great for marketing professionals and campaign managers'
  },
  {
    id: 4,
    name: 'Data Scientist',
    role: 'Machine Learning Engineer',
    image: '/api/placeholder/300/400',
    rating: 5,
    downloads: 1500,
    description: 'Perfect for data scientists and ML engineers'
  }
];

export default function Examples() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary-600">ResumeBuilder</Link>
          <DarkModeToggle />
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Resume Examples
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get inspired by these professional resume examples created with our builder. 
            Each example is optimized for ATS systems and designed to get you hired.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {examples.map((example, index) => (
            <motion.div
              key={example.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-64 bg-gradient-to-br from-primary-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                    {example.name.charAt(0)}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{example.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{example.role}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    {[...Array(example.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{example.downloads} downloads</span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {example.description}
                </p>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Link href="/builder?sample=saswata" className="flex-1">
                    <Button size="sm" className="w-full">
                      <Download className="w-4 h-4 mr-1" />
                      Use Template
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/builder">
            <Button size="lg">
              Create Your Own Resume
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}