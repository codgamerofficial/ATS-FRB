'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Zap, Download, Shield, Star, Users } from 'lucide-react';
import Button from '@/components/ui/Button';
import UserMenu from '@/components/ui/UserMenu';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import SplashScreen from '@/components/3d/SplashScreen';
import SciFiBackground from '@/components/ui/SciFiBackground';
import SciFiCard from '@/components/ui/SciFiCard';
import Logo from '@/components/ui/Logo';
import RealtimeWidget from '@/components/realtime/RealtimeWidget';
import NewsWidget from '@/components/realtime/NewsWidget';
import LocationMap from '@/components/realtime/LocationMap';
import { useAuth } from '@/hooks/useAuth';
import { useDarkMode } from '@/hooks/useDarkMode';
import Link from 'next/link';

const features = [
  {
    icon: <Zap className="h-8 w-8" />,
    title: '⚡ AI-Powered ATS',
    description: 'Smart algorithms ensure 95% ATS pass rate. Beat the bots, reach humans.'
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: '🎨 Designer Templates',
    description: '100+ stunning templates crafted by top designers. Stand out professionally.'
  },
  {
    icon: <Download className="h-8 w-8" />,
    title: '⚡ Instant Export',
    description: 'One-click PDF download. Multiple formats. Ready for any application.'
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: '🔒 Military-Grade Security',
    description: 'Bank-level encryption. Your data stays private. GDPR compliant.'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Senior Software Engineer @ Google',
    content: 'Landed my $180k Google offer in 3 weeks! The ATS optimization is game-changing. 10/10 recommend!',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Marketing Director @ Microsoft',
    content: 'From 0 to 15 interview calls in one month. The AI suggestions were spot-on. Career transformed!',
    rating: 5
  },
  {
    name: 'Emily Davis',
    role: 'Lead Data Scientist @ Amazon',
    content: 'Beautiful templates + smart AI = dream job at Amazon. Worth every penny. Simply amazing!',
    rating: 5
  }
];

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);
  const { user, loading } = useAuth();
  const { isDark } = useDarkMode();

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SciFiBackground isDark={isDark} />
      <nav className="bg-gray-900/20 backdrop-blur-md border-b border-cyan-500/30 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo size={32} />
              <span className="ml-2 text-xl font-bold text-cyan-400">ATSFRB</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/templates">
                <Button variant="ghost">Templates</Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="ghost">Portfolio</Button>
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

      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                <span className="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-400 text-sm font-medium rounded-full border border-cyan-500/30 mb-4">
                  🚀 AI-Powered Resume Builder
                </span>
                <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight" style={{ textShadow: '0 0 30px rgba(0, 255, 255, 0.3)' }}>
                  Craft Your
                  <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                    Dream Career
                  </span>
                  in Minutes
                </h1>
                </motion.div>
              </div>
              
              <div className="text-lg text-cyan-100 mb-8 leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                Transform your career with our advanced AI resume builder. Create stunning, 
                ATS-optimized resumes that land interviews at top companies worldwide.
                </motion.p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                <Link href={user ? "/builder" : "/auth"}>
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                    {user ? "Continue Building" : "🎯 Start Building Free"}
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
                    📋 Browse Templates
                  </Button>
                </Link>
                </motion.div>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-cyan-200">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-cyan-400" />
                  50,000+ Happy Users
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-400" />
                  4.9★ Rating
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-green-400" />
                  Bank-Level Security
                </div>
                </motion.div>
              </div>
            </div>
            
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
              <div className="relative z-10">
                <SciFiCard isDark={isDark} className="p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Ready in 5 Minutes</h3>
                    <p className="text-cyan-100 text-sm mb-4">Professional resume with AI optimization</p>
                    <div className="bg-cyan-500/20 rounded-lg p-4">
                      <div className="text-2xl font-bold text-cyan-400">95%</div>
                      <div className="text-xs text-cyan-200">ATS Pass Rate</div>
                    </div>
                  </div>
                </SciFiCard>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-10 animate-pulse"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Realtime Widget Section */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
              🌍 Stay Globally Connected
            </h2>
            <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
              Live world updates, real-time location tracking, and daily news - all while building your career
            </p>
          </div>
          <RealtimeWidget />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <NewsWidget />
            <LocationMap />
          </div>
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 transition-colors duration-300" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
              🎯 Why Top Professionals Choose Us
            </h2>
            <p className="text-xl text-cyan-100 max-w-2xl mx-auto transition-colors duration-300">
              Advanced AI technology meets professional design. Get hired faster with resumes that actually work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SciFiCard className="text-center h-full" isDark={isDark}>
                  <div className="text-cyan-400 mb-4 flex justify-center transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-cyan-100 transition-colors duration-300">
                    {feature.description}
                  </p>
                </SciFiCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SciFiCard isDark={isDark}>
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 transition-colors duration-300" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
                🌟 See Real Success Stories
              </h2>
              <p className="text-xl text-cyan-100 max-w-2xl mx-auto mb-8 transition-colors duration-300">
                Explore a professional resume that landed interviews at Google, Microsoft & Amazon. Built with our platform.
              </p>
              <Link href="/builder?sample=saswata">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  🚀 View Success Example
                </Button>
              </Link>
            </div>
          </SciFiCard>
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 transition-colors duration-300" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
              💬 Success Stories from Real Users
            </h2>
            <p className="text-xl text-cyan-100 max-w-2xl mx-auto transition-colors duration-300">
              Join 50,000+ professionals who transformed their careers and landed dream jobs at top companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SciFiCard isDark={isDark}>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-cyan-100 mb-4 italic transition-colors duration-300">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-white transition-colors duration-300">{testimonial.name}</p>
                    <p className="text-sm text-cyan-300 transition-colors duration-300">{testimonial.role}</p>
                  </div>
                </SciFiCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SciFiCard className="text-center" isDark={isDark}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
              🎯 Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
              Join 50,000+ professionals who landed their dream jobs. Your success story starts here.
            </p>
            <Link href={user ? "/builder" : "/auth"}>
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-8 py-4">
                {user ? "🚀 Continue Your Journey" : "🎯 Start Free - Land Your Dream Job!"}
              </Button>
            </Link>
          </SciFiCard>
        </div>
      </section>

      <footer className="bg-gray-900/50 backdrop-blur-md border-t border-cyan-500/30 text-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Logo size={24} animated={false} />
                <span className="ml-2 text-lg font-bold text-cyan-400">ATSFRB</span>
              </div>
              <p className="text-cyan-100">
                Create professional, ATS-friendly resumes that get you hired.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/templates" className="hover:text-cyan-400 text-cyan-100">Templates</Link></li>
                <li><Link href="/builder" className="hover:text-cyan-400 text-cyan-100">Resume Builder</Link></li>
                <li><Link href="/portfolio" className="hover:text-cyan-400 text-cyan-100">Portfolio</Link></li>
                <li><Link href="/examples" className="hover:text-cyan-400 text-cyan-100">Examples</Link></li>
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
          <div className="border-t border-cyan-500/30 mt-8 pt-8 text-center text-cyan-300">
            <p>&copy; 2025 ATSFRB - AI Resume Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}