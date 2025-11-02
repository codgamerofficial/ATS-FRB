'use client';

import FeatureTestSuite from '@/components/testing/FeatureTestSuite';
import SciFiBackground from '@/components/ui/SciFiBackground';
import Logo from '@/components/ui/Logo';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TestPage() {
  return (
    <div className="min-h-screen relative">
      <SciFiBackground />
      
      <nav className="relative z-10 bg-gray-900/80 backdrop-blur-md border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Logo size={32} animated={false} />
                <span className="ml-2 text-xl font-bold text-white">ATSFRB</span>
              </Link>
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </nav>

      <div className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <FeatureTestSuite />
        </div>
      </div>
    </div>
  );
}