'use client';

import { Suspense, lazy } from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Zap, Download, Shield, Star, Users, Github } from 'lucide-react';
import Button from '@/components/ui/Button';
import UserMenu from '@/components/ui/UserMenu';

import SplashScreen from '@/components/3d/SplashScreen';
import SciFiBackground from '@/components/ui/SciFiBackground';
import SciFiCard from '@/components/ui/SciFiCard';
import Logo from '@/components/ui/Logo';
import MobileOptimization from '@/components/mobile/MobileOptimization';
import { useAuth } from '@/hooks/useAuth';
import { useDarkMode } from '@/hooks/useDarkMode';
import Link from 'next/link';

// Lazy load heavy components
const RealtimeWidget = lazy(() => import('@/components/realtime/RealtimeWidget'));
const NewsWidget = lazy(() => import('@/components/realtime/NewsWidget'));
const LocationMap = lazy(() => import('@/components/realtime/LocationMap'));
const PartnershipsSection = lazy(() => import('@/components/partnerships/PartnershipsSection'));
const AIInsights = lazy(() => import('@/components/ai/AIInsights'));
const AIJobMatcher = lazy(() => import('@/components/ai/AIJobMatcher'));
const AISkillsPredictor = lazy(() => import('@/components/ai/AISkillsPredictor'));
const AICareerPath = lazy(() => import('@/components/ai/AICareerPath'));
const AdvancedAI = lazy(() => import('@/components/ai/AdvancedAI'));

// Loading components
const SectionLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="loading-dots">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

// Scroll animations temporarily disabled for deployment
const ScrollProgress = () => null;
const ScrollReveal = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const ScrollSlide = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const ScrollScale = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const ScrollStagger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const ScrollItem = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const FloatingElements = () => null;
const ScrollMouseTracker = () => null;
const ScrollWaveEffect = () => null;
const ParallaxContainer = ({ children }: { children: React.ReactNode }) => <>{children}</>;

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
  const [showSplash, setShowSplash] = useState(false);
  const { user, loading } = useAuth();
  const { isDark } = useDarkMode();

  useEffect(() => {
    // Check if splash screen has been shown before
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    if (!hasSeenSplash) {
      setShowSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    // Mark splash as seen
    localStorage.setItem('hasSeenSplash', 'true');
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SciFiBackground isDark={isDark} />
      {/* Navigation remains the same... */}
      <nav className="relative bg-black/40 backdrop-blur-xl border-b border-cyan-400/50 sticky top-0 z-50 transition-all duration-500 hover:bg-black/60">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-50"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(6,182,212,0.1)_25%,rgba(6,182,212,0.1)_26%,transparent_27%,transparent_74%,rgba(6,182,212,0.1)_75%,rgba(6,182,212,0.1)_76%,transparent_77%,transparent)] bg-[length:20px_20px]"></div>
        
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-16 sm:h-18">
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
            
            {/* Navigation items remain the same... */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {[
                { href: '/templates', label: 'Templates', icon: '📋', glow: 'cyan' },
                { href: '/ats-analyzer', label: 'ATS Analyzer', icon: '🎯', glow: 'green' },
                { href: '/video-resume', label: 'Video Resume', icon: '🎥', glow: 'purple' },
                { href: '/interview-prep', label: 'Interview Prep', icon: '🧠', glow: 'blue' },
                { href: '/salary-tools', label: 'Salary Tools', icon: '💰', glow: 'yellow' },
                { href: '/portfolio', label: 'Portfolio', icon: '💼', glow: 'orange' },
              ].map((item, index) => (
                <Link key={index} href={item.href}>
                  <div className="relative group px-4 py-2 rounded-xl transition-all duration-500 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-purple-500/10 border border-transparent hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5">
                    <span className="text-cyan-300 group-hover:text-white transition-all duration-300 text-sm font-semibold tracking-wide">
                      {item.icon} {item.label}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-sm"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
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
                </div>
              </Link>
              
              <a 
                href="https://github.com/codgamerofficial/ATS-FRB" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative group flex items-center space-x-2 px-4 py-2 rounded-xl border border-gray-600/30 hover:border-gray-400/70 transition-all duration-500 hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/50 hover:shadow-lg hover:shadow-gray-500/20 hover:-translate-y-0.5"
              >
                <Github className="h-4 w-4 text-gray-400 group-hover:text-white transition-all duration-300 group-hover:rotate-12" />
                <span className="hidden xl:inline text-sm text-gray-400 group-hover:text-white transition-colors duration-300 font-medium">GitHub</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/0 via-gray-400/10 to-gray-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              </a>

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
                      </div>
                    </Link>
                    <Link href="/builder">
                      <div className="relative group px-4 py-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 rounded-xl transition-all duration-500 border border-cyan-400/50 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-1 hover:scale-105">
                        <span className="text-white font-bold text-sm tracking-wide">
                          🚀 Get Started
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                      </div>
                    </Link>
                  </div>
                )
              )}
            </div>
            
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
        </div>
      </nav>

      {/* Main content with lazy loaded sections */}
      <section className="relative overflow-hidden py-6 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="mb-4 sm:mb-6">
                <ScrollReveal>
                  <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-medium rounded-full border border-cyan-500/30 mb-3 sm:mb-4">
                    🚀 AI Resume Builder
                  </span>
                </ScrollReveal>
                <ScrollSlide direction="left" delay={0.2}>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight" style={{ textShadow: '0 0 30px rgba(0, 255, 255, 0.3)' }}>
                    Craft Your
                    <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                      Dream Career
                    </span>
                    <span className="text-lg sm:text-xl lg:text-2xl block mt-2 text-cyan-300">in Minutes</span>
                  </h1>
                </ScrollSlide>
              </div>
              
              <ScrollSlide direction="left" delay={0.4}>
                <div className="text-sm sm:text-base lg:text-lg text-cyan-100 mb-4 sm:mb-8 leading-relaxed px-2 sm:px-0">
                  <p>
                    AI-powered resume builder for landing dream jobs at top companies.
                  </p>
                </div>
              </ScrollSlide>

              <ScrollScale delay={0.6}>
                <div className="flex flex-col gap-3 mb-4 sm:mb-8 px-4 sm:px-0">
                  <Link href={user ? "/builder" : "/auth"}>
                    <Button size="lg" className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 py-4 text-lg font-bold">
                      {user ? "🚀 Continue Building" : "🎯 Start Free"}
                    </Button>
                  </Link>
                  <Link href="/templates">
                    <Button variant="outline" size="lg" className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 py-3">
                      📋 Templates
                    </Button>
                  </Link>
                </div>
              </ScrollScale>
            </div>
          </div>
        </div>
      </section>

      {/* Lazy loaded sections */}
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
          <Suspense fallback={<SectionLoader />}>
            <RealtimeWidget />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8">
              <Suspense fallback={<SectionLoader />}>
                <NewsWidget />
              </Suspense>
              <Suspense fallback={<SectionLoader />}>
                <LocationMap />
              </Suspense>
            </div>
          </Suspense>
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

      {/* Lazy loaded AI Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '0 0 20px rgba(138, 43, 226, 0.5)' }}>
              🤖 AI-Powered Career Intelligence
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-purple-100 max-w-3xl mx-auto px-4">
              Harness the power of artificial intelligence for real-time market insights, job matching, and career planning
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Suspense fallback={<SectionLoader />}>
              <AIInsights />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <AIJobMatcher />
            </Suspense>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Suspense fallback={<SectionLoader />}>
              <AISkillsPredictor />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <AICareerPath />
            </Suspense>
          </div>
          
          <div className="col-span-full">
            <Suspense fallback={<SectionLoader />}>
              <AdvancedAI />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Lazy loaded Partnerships Section */}
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
          <Suspense fallback={<SectionLoader />}>
            <PartnershipsSection />
          </Suspense>
        </div>
      </section>

      <MobileOptimization />
    </div>
  );
}