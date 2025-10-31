'use client';

import { motion } from 'framer-motion';
import { Users, Target, Award, Heart } from 'lucide-react';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import SciFiBackground from '@/components/ui/SciFiBackground';
import SciFiCard from '@/components/ui/SciFiCard';
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
    <div className="min-h-screen relative">
      <SciFiBackground />
      <header className="relative z-10 bg-gray-900/80 backdrop-blur-md border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-cyan-400">ATSFRB</Link>
          <DarkModeToggle />
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-12 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-6">
            About ATSFRB
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
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
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300">
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
            <h2 className="text-3xl font-bold text-white mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                ATSFRB was founded with a simple belief: everyone deserves a chance to 
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
          >
            <SciFiCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Why Choose Us?
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">✓</span>
                  ATS-optimized templates designed by experts
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">✓</span>
                  Real-time preview and instant PDF download
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">✓</span>
                  Secure data storage and privacy protection
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">✓</span>
                  24/7 customer support and guidance
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">✓</span>
                  Regular updates and new features
                </li>
              </ul>
            </SciFiCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-cyan-500/20 border border-cyan-500/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-300">
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
        >
          <SciFiCard className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Build Your Perfect Resume?
            </h2>
            <p className="text-gray-300 mb-6">
              Join thousands of successful job seekers who have used our platform to land their dream jobs.
            </p>
            <Link href="/builder">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 font-semibold">
                Start Building Now
              </button>
            </Link>
          </SciFiCard>
        </motion.div>
      </div>
    </div>
  );
}