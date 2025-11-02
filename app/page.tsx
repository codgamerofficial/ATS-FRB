'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Zap, Download, Shield, Star, Users, Github } from 'lucide-react';
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
import PartnershipsSection from '@/components/partnerships/PartnershipsSection';
import { ScrollProgress, ScrollReveal, ScrollSlide, ScrollScale, ScrollStagger, ScrollItem, FloatingElements, ScrollMouseTracker, ScrollWaveEffect, ParallaxContainer } from '@/components/animations/ScrollAnimations';
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
      <ScrollProgress />
      <ScrollMouseTracker />
      <FloatingElements />
      <ScrollWaveEffect />
      <SciFiBackground isDark={isDark} />
      {/* Futuristic Navigation Bar */}
      <nav className="relative bg-black/40 backdrop-blur-xl border-b border-cyan-400/50 sticky top-0 z-50 transition-all duration-500 hover:bg-black/60">
        {/* Holographic Grid Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-50"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(6,182,212,0.1)_25%,rgba(6,182,212,0.1)_26%,transparent_27%,transparent_74%,rgba(6,182,212,0.1)_75%,rgba(6,182,212,0.1)_76%,transparent_77%,transparent)] bg-[length:20px_20px]"></div>
        
        {/* Scanning Line Animation */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-16 sm:h-18">
            {/* Logo Section with Glow */}
            <div className="flex items-center group">
              <div className="relative">
                <Logo size={28} className="sm:w-8 sm:h-8 transition-all duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="ml-3 text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                ATSFRB
              </span>
              <div className="ml-2 px-2 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-xs text-cyan-300 hidden sm:block">
                AI
              </div>
            </div>
            
            {/* Desktop Navigation with Holographic Effects */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {[
                { href: '/templates', label: 'Templates', icon: '📋', glow: 'cyan' },
                { href: '/ats-analyzer', label: 'ATS Analyzer', icon: '🎯', glow: 'green' },
                { href: '/cover-letter', label: 'Cover Letter', icon: '✍️', glow: 'purple' },
                { href: '/news', label: 'Live News', icon: '📰', glow: 'blue' },
              ].map((item, index) => (
                <Link key={index} href={item.href}>
                  <div className="relative group px-4 py-2 rounded-xl transition-all duration-500 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-purple-500/10 border border-transparent hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5">
                    <span className="text-cyan-300 group-hover:text-white transition-all duration-300 text-sm font-semibold tracking-wide">
                      {item.icon} {item.label}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-sm"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
                    <div className="absolute inset-0 border border-transparent group-hover:border-gradient-to-r group-hover:from-cyan-400/50 group-hover:to-purple-400/50 rounded-xl transition-all duration-300"></div>
                  </div>
                </Link>
              ))}
              
              {/* Special India's Best Button */}
              <Link href="/colleges">
                <div className="relative group px-4 py-2 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 rounded-xl transition-all duration-500 border border-orange-400/50 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-1 hover:scale-105">
                  <span className="text-white font-bold text-sm flex items-center tracking-wide">
                    🇮🇳 India's Best
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                </div>
              </Link>
              
              {/* GitHub Link with Animation */}
              <a 
                href="https://github.com/codgamerofficial/ATS-FRB" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative group flex items-center space-x-2 px-4 py-2 rounded-xl border border-gray-600/30 hover:border-gray-400/70 transition-all duration-500 hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/50 hover:shadow-lg hover:shadow-gray-500/20 hover:-translate-y-0.5"
              >
                <Github className="h-4 w-4 text-gray-400 group-hover:text-white transition-all duration-300 group-hover:rotate-12" />
                <span className="hidden xl:inline text-sm text-gray-400 group-hover:text-white transition-colors duration-300 font-medium">GitHub</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/0 via-gray-400/10 to-gray-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </a>
              

              
              {/* Auth Buttons */}
              {!loading && (
                user ? (
                  <div className="relative">
                    <UserMenu />
                    <div className="absolute inset-0 bg-purple-400/10 rounded-full blur-md opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link href="/auth">
                      <div className="relative group px-4 py-2 border border-cyan-400/50 hover:border-cyan-300 rounded-xl transition-all duration-500 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5">
                        <span className="text-cyan-400 group-hover:text-white transition-colors duration-300 text-sm font-semibold tracking-wide">
                          ⚡ Sign In
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-sm"></div>
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                      </div>
                    </Link>
                    <Link href="/builder">
                      <div className="relative group px-4 py-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 rounded-xl transition-all duration-500 border border-cyan-400/50 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-1 hover:scale-105">
                        <span className="text-white font-bold text-sm tracking-wide">
                          🚀 Get Started
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                      </div>
                    </Link>
                  </div>
                )
              )}
            </div>
            
            {/* Mobile Navigation */}
            <div className="flex lg:hidden items-center space-x-2">

              <Link href="/builder">
                <div className="relative group px-3 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-lg transition-all duration-300">
                  <span className="text-white font-medium text-xs">
                    {user ? "🔧 Build" : "🚀 Start"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Enhanced Mobile Menu */}
          <div className="lg:hidden border-t border-cyan-500/30 py-3 bg-black/20 backdrop-blur-sm">
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { href: '/templates', label: 'Templates', icon: '📋' },
                { href: '/ats-analyzer', label: 'ATS Analyzer', icon: '🎯' },
                { href: '/cover-letter', label: 'Cover Letter', icon: '✍️' },
                { href: '/news', label: 'News', icon: '📰' },
                { href: '/colleges', label: 'Colleges', icon: '🇮🇳', special: true },
              ].map((item, index) => (
                <Link key={index} href={item.href}>
                  <div className={`relative group px-3 py-1.5 rounded-lg transition-all duration-300 border ${
                    item.special 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 border-orange-400/50 text-white' 
                      : 'border-cyan-400/30 hover:border-cyan-300 hover:bg-cyan-500/10 text-cyan-300 hover:text-cyan-100'
                  }`}>
                    <span className="text-xs font-medium">
                      {item.icon} {item.label}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </div>
                </Link>
              ))}
              
              <a href="https://github.com/codgamerofficial/ATS-FRB" target="_blank" rel="noopener noreferrer">
                <div className="relative group px-3 py-1.5 border border-gray-600/30 hover:border-cyan-400/50 rounded-lg transition-all duration-300 hover:bg-cyan-500/10">
                  <span className="text-xs font-medium text-gray-400 group-hover:text-cyan-300 transition-colors duration-300 flex items-center">
                    <Github className="h-3 w-3 mr-1" />GitHub
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>
              </a>
              
              {!loading && !user && (
                <Link href="/auth">
                  <div className="relative group px-3 py-1.5 border border-cyan-400/50 hover:border-cyan-300 rounded-lg transition-all duration-300 hover:bg-cyan-500/10">
                    <span className="text-xs font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                      Sign In
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom Glow Effect */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>
      </nav>

      <section className="relative overflow-hidden py-8 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="text-left">
              <div className="mb-6">
                <ScrollReveal>
                  <span className="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-400 text-sm font-medium rounded-full border border-cyan-500/30 mb-4">
                    🚀 AI-Powered Resume Builder
                  </span>
                </ScrollReveal>
                <ScrollSlide direction="left" delay={0.2}>
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight" style={{ textShadow: '0 0 30px rgba(0, 255, 255, 0.3)' }}>
                    Craft Your
                    <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                      Dream Career
                    </span>
                    in Minutes
                  </h1>
                </ScrollSlide>
              </div>
              
              <ScrollSlide direction="left" delay={0.4}>
                <div className="text-sm sm:text-base lg:text-lg text-cyan-100 mb-6 sm:mb-8 leading-relaxed">
                  <p>
                    Transform your career with our advanced AI resume builder. Create stunning, 
                    ATS-optimized resumes that land interviews at top companies worldwide.
                  </p>
                </div>
              </ScrollSlide>

              <ScrollScale delay={0.6}>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
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
                </div>
              </ScrollScale>

              <ScrollStagger staggerDelay={0.2}>
                <div className="flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm text-cyan-200">
                  <ScrollItem>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-cyan-400" />
                      50,000+ Happy Users
                    </div>
                  </ScrollItem>
                  <ScrollItem>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-400" />
                      4.9★ Rating
                    </div>
                  </ScrollItem>
                  <ScrollItem>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-green-400" />
                      Bank-Level Security
                    </div>
                  </ScrollItem>
                </div>
              </ScrollStagger>
            </div>
            
            <div className="relative">
              <ScrollSlide direction="right" delay={0.3}>
                <div className="relative z-10">
                  <SciFiCard isDark={isDark} className="p-8">
                    <div className="text-center">
                      <ScrollScale delay={0.5}>
                        <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileText className="h-8 w-8 text-white" />
                        </div>
                      </ScrollScale>
                      <ScrollReveal delay={0.7}>
                        <h3 className="text-xl font-bold text-white mb-2">Ready in 5 Minutes</h3>
                        <p className="text-cyan-100 text-sm mb-4">Professional resume with AI optimization</p>
                      </ScrollReveal>
                      <ScrollScale delay={0.9}>
                        <div className="bg-cyan-500/20 rounded-lg p-4">
                          <div className="text-2xl font-bold text-cyan-400">95%</div>
                          <div className="text-xs text-cyan-200">ATS Pass Rate</div>
                        </div>
                      </ScrollScale>
                    </div>
                  </SciFiCard>
                </div>
                <ParallaxContainer speed={0.3}>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-10 animate-pulse"></div>
                </ParallaxContainer>
              </ScrollSlide>
            </div>
          </div>
        </div>
      </section>

      {/* Realtime Widget Section */}
      <section className="py-8 sm:py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
              🌍 Stay Globally Connected
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-cyan-100 max-w-2xl mx-auto px-4">
              Live world updates, real-time location tracking, and daily news - all while building your career
            </p>
          </div>
          <RealtimeWidget />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8">
            <NewsWidget />
            <LocationMap />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 transition-colors duration-300" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
                🎯 Why Top Professionals Choose Us
              </h2>
              <p className="text-sm sm:text-lg lg:text-xl text-cyan-100 max-w-2xl mx-auto transition-colors duration-300 px-4">
                Advanced AI technology meets professional design. Get hired faster with resumes that actually work.
              </p>
            </div>
          </ScrollReveal>

          <ScrollStagger staggerDelay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <ScrollItem key={index}>
                  <SciFiCard className="text-center h-full interactive-hover shadow-deep" isDark={isDark} variant="glow">
                    <ScrollScale delay={0.2}>
                      <div className="text-cyan-400 mb-4 flex justify-center transition-colors duration-300">
                        {feature.icon}
                      </div>
                    </ScrollScale>
                    <ScrollSlide direction="up" delay={0.3}>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-cyan-100 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </ScrollSlide>
                  </SciFiCard>
                </ScrollItem>
              ))}
            </div>
          </ScrollStagger>
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SciFiCard isDark={isDark} className="shadow-deep neon-glow" variant="glow">
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

      <section className="py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 transition-colors duration-300" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
              💬 Success Stories from Real Users
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-cyan-100 max-w-2xl mx-auto transition-colors duration-300 px-4">
              Join 50,000+ professionals who transformed their careers and landed dream jobs at top companies.
            </p>
          </div>

          <ScrollStagger staggerDelay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {testimonials.map((testimonial, index) => (
                <ScrollItem key={index}>
                  <SciFiCard isDark={isDark} className="interactive-hover shadow-neon" variant="premium">
                    <ScrollScale delay={0.1}>
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </ScrollScale>
                    <ScrollSlide direction="up" delay={0.2}>
                      <p className="text-sm sm:text-base text-cyan-100 mb-4 italic transition-colors duration-300">"{testimonial.content}"</p>
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-white transition-colors duration-300">{testimonial.name}</p>
                        <p className="text-xs sm:text-sm text-cyan-300 transition-colors duration-300">{testimonial.role}</p>
                      </div>
                    </ScrollSlide>
                  </SciFiCard>
                </ScrollItem>
              ))}
            </div>
          </ScrollStagger>
        </div>
      </section>

      {/* Resume Templates Advertisement */}
      <section className="py-12 sm:py-16 lg:py-20 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '0 0 30px rgba(139, 92, 246, 0.5)' }}>
              ✨ Premium Resume Templates
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              Choose from our collection of professionally designed, ATS-optimized templates. Stand out from the crowd with stunning designs.
            </p>
          </div>

          <ScrollStagger staggerDelay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
              {[
                {
                  name: 'Executive Pro',
                  category: 'Professional',
                  image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=500&fit=crop',
                  color: 'from-blue-500 to-purple-600',
                  features: ['ATS Optimized', 'Clean Layout', 'Professional']
                },
              {
                name: 'Creative Edge',
                category: 'Creative',
                image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=500&fit=crop',
                color: 'from-pink-500 to-rose-600',
                features: ['Modern Design', 'Eye-catching', 'Creative Fields']
              },
              {
                name: 'Tech Innovator',
                category: 'Technology',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
                color: 'from-green-500 to-teal-600',
                features: ['Tech-focused', 'Skills Highlight', 'Modern']
              },
              {
                name: 'Minimalist',
                category: 'Simple',
                image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=500&fit=crop',
                color: 'from-gray-500 to-slate-600',
                features: ['Clean & Simple', 'Easy to Read', 'Versatile']
              },
              {
                name: 'Corporate Elite',
                category: 'Business',
                image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=500&fit=crop',
                color: 'from-indigo-500 to-blue-600',
                features: ['Executive Level', 'Sophisticated', 'Premium']
              },
              {
                name: 'Startup Founder',
                category: 'Entrepreneurial',
                image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=500&fit=crop',
                color: 'from-orange-500 to-red-600',
                features: ['Dynamic', 'Leadership Focus', 'Bold']
              }
              ].map((template, index) => (
                <ScrollItem key={index}>
                  <div className="group cursor-pointer hover:-translate-y-4 hover:scale-110 transition-all duration-500 hover:rotate-1">
                    <SciFiCard className="overflow-hidden h-full shadow-neon" isDark={isDark} variant="premium" interactive={true}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={template.image}
                      alt={template.name}
                      className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2 filter group-hover:brightness-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${template.color} opacity-20 group-hover:opacity-40 transition-all duration-500`}></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">
                        {template.category}
                      </span>
                    </div>
                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">{template.name}</h3>
                      <div className="flex flex-wrap gap-1">
                        {template.features.slice(0, 2).map((feature, i) => (
                          <span key={i} className="bg-black/50 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 sm:p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                      <div className="flex-1">
                        <div className="text-cyan-400 text-xs sm:text-sm font-medium mb-1">Premium Template</div>
                        <div className="text-white text-sm sm:text-base font-bold">Free with Pro</div>
                      </div>
                      <Link href={`/builder?template=${template.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Button 
                          size="sm" 
                          className={`bg-gradient-to-r ${template.color} hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-500 neon-glow text-xs sm:text-sm w-full sm:w-auto hover:-translate-y-1 hover:scale-105 font-bold tracking-wide`}
                        >
                          ✨ Use Template
                        </Button>
                      </Link>
                    </div>
                  </div>
                    </SciFiCard>
                  </div>
                </ScrollItem>
              ))}
            </div>
          </ScrollStagger>

          {/* Call to Action */}
          <div className="text-center">
            <SciFiCard className="inline-block" isDark={isDark}>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">🎨 100+ More Templates Available</h3>
                <p className="text-purple-200 mb-6 max-w-md">
                  Unlock our entire collection of professional resume templates. Perfect for every industry and career level.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/templates">
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3">
                      🚀 Browse All Templates
                    </Button>
                  </Link>
                  <Link href={user ? "/builder" : "/auth"}>
                    <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10 px-8 py-3">
                      ⚡ Start Building Now
                    </Button>
                  </Link>
                </div>
              </div>
            </SciFiCard>
          </div>
        </div>
        
        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse particle"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse particle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-500/15 rounded-full blur-lg animate-ping particle" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-blue-500/15 rounded-full blur-lg animate-ping particle" style={{ animationDelay: '6s' }}></div>
        
        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent opacity-50 holographic"></div>
      </section>

      {/* Partnerships Section */}
      <section className="py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
              🤝 Career Growth Partners
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-cyan-100 max-w-2xl mx-auto px-4">
              Accelerate your career with our trusted partners - from job boards to skill development
            </p>
          </div>
          <PartnershipsSection />
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SciFiCard className="text-center shadow-neon morph" isDark={isDark} variant="premium">
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

      {/* Floating Dark Mode Toggle */}
      <div className="fixed top-20 right-6 z-50">
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-xl border border-cyan-400/30 rounded-full p-3 hover:bg-gray-800/90 transition-all duration-300 hover:scale-110 hover:border-cyan-300/50">
            <DarkModeToggle />
          </div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-900/95 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg border border-cyan-400/30 whitespace-nowrap">
              {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900/95"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}