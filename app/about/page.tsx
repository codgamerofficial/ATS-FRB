'use client';

import { motion } from 'framer-motion';
import { Users, Target, Award, Heart } from 'lucide-react';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import Link from 'next/link';

const stats = [
  { number: '10,000+', label: 'Resumes Created' },
  { number: '95%', label: 'Success Rate' },
  { number: '50+', label: 'Templates' },
  { number: '24/7', label: 'Support' }
];

const values = [
  {
    icon: Users,
    title: 'User-Centric',
    description: 'We put our users first, designing every feature with their success in mind.'
  },
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'Our goal is simple: help you land your dream job with a standout resume.'
  },
  {
    icon: Award,
    title: 'Quality First',
    description: 'We maintain the highest standards in design, functionality, and user experience.'
  },
  {
    icon: Heart,
    title: 'Passionate',
    description: 'We\'re passionate about helping people advance their careers and achieve their goals.'
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary-600">ResumeBuilder</Link>
          <DarkModeToggle />
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            About ResumeBuilder
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to help job seekers create professional, ATS-friendly resumes 
            that get noticed by hiring managers and land interviews. Our platform combines 
            cutting-edge technology with proven resume writing principles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                ResumeBuilder was founded with a simple belief: everyone deserves a chance to 
                showcase their talents and land their dream job. We noticed that many qualified 
                candidates were being overlooked simply because their resumes weren't optimized 
                for modern hiring processes.
              </p>
              <p>
                Our team of career experts, designers, and developers came together to create 
                a platform that democratizes access to professional resume writing. We've helped 
                thousands of job seekers across various industries and experience levels.
              </p>
              <p>
                Today, we continue to innovate and improve our platform, always keeping our 
                users' success at the heart of everything we do.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us?
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                ATS-optimized templates designed by experts
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                Real-time preview and instant PDF download
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                Secure data storage and privacy protection
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                24/7 customer support and guidance
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                Regular updates and new features
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join thousands of successful job seekers who have used our platform to land their dream jobs.
          </p>
          <Link href="/builder">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
              Start Building Now
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}