'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Zap, Download, Shield, Star, Users } from 'lucide-react';
import Button from '@/components/ui/Button';
import UserMenu from '@/components/ui/UserMenu';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import SplashScreen from '@/components/3d/SplashScreen';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

const features = [
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'ATS Optimized',
    description: 'Our templates are designed to pass Applicant Tracking Systems with ease.'
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: 'Professional Templates',
    description: 'Choose from a variety of modern, elegant templates designed by professionals.'
  },
  {
    icon: <Download className="h-8 w-8" />,
    title: 'Instant Download',
    description: 'Download your resume as PDF instantly, ready for job applications.'
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Secure & Private',
    description: 'Your data is encrypted and secure. We never share your information.'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    content: 'This resume builder helped me land my dream job at a top tech company!',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Marketing Manager',
    content: 'The ATS optimization feature is incredible. I got more interview calls than ever.',
    rating: 5
  },
  {
    name: 'Emily Davis',
    role: 'Data Analyst',
    content: 'Clean, professional templates that make my experience shine.',
    rating: 5
  }
];

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);
  const { user, loading } = useAuth();

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">ResumeBuilder</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/templates">
                <Button variant="ghost">Templates</Button>
              </Link>
              <DarkModeToggle />
              {!loading && (
                user ? (
                  <UserMenu />
                ) : (
                  <>
                    <Link href="/auth">
                      <Button variant="outline">Sign In</Button>
                    </Link>
                    <Link href="/builder">
                      <Button>Get Started</Button>
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300"
            >
              Build Your Perfect{' '}
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                ATS-Friendly
              </span>{' '}
              Resume
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto transition-colors duration-300"
            >
              Create professional resumes that get noticed by both hiring managers and 
              Applicant Tracking Systems. Stand out from the crowd with our modern templates.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href={user ? "/builder" : "/auth"}>
                <Button size="lg" className="w-full sm:w-auto">
                  {user ? "Continue Building" : "Start Building Now"}
                </Button>
              </Link>
              <Link href="/templates">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Templates
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300"
            >
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                10,000+ users
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-400" />
                4.9/5 rating
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                100% secure
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Why Choose Our Resume Builder?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              We've built the most advanced resume builder with features that help you land your dream job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <div className="text-primary-600 dark:text-primary-400 mb-4 flex justify-center transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              See a Sample Resume
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              Check out this professional resume created with our builder, featuring real data from Saswata Dey.
            </p>
          </div>

          <div className="flex justify-center">
            <Link href="/builder?sample=saswata">
              <Button size="lg">
                View Saswata's Resume Example
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              Join thousands of professionals who have successfully landed their dream jobs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl transition-colors duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic transition-colors duration-300">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Build Your Resume?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have successfully created their perfect resume.
          </p>
          <Link href={user ? "/builder" : "/auth"}>
            <Button size="lg" variant="secondary">
              {user ? "Continue Building" : "Start Building Now - It's Free!"}
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-primary-400" />
                <span className="ml-2 text-lg font-bold">ResumeBuilder</span>
              </div>
              <p className="text-gray-400">
                Create professional, ATS-friendly resumes that get you hired.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/templates" className="hover:text-white">Templates</Link></li>
                <li><Link href="/builder" className="hover:text-white">Resume Builder</Link></li>
                <li><Link href="/examples" className="hover:text-white">Examples</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ResumeBuilder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}