'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import SciFiBackground from '@/components/ui/SciFiBackground';
import CoverLetterGenerator from '@/components/cover-letter/CoverLetterGenerator';
import { useDarkMode } from '@/hooks/useDarkMode';

export default function CoverLetterPage() {
  const { isDark } = useDarkMode();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SciFiBackground isDark={isDark} />
      
      <div className="relative z-10 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Link href="/">
              <Button variant="ghost" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ textShadow: '0 0 30px rgba(139, 92, 246, 0.5)' }}>
              ✍️ AI Cover Letter Generator
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Create personalized, professional cover letters in minutes. 
              Stand out from the competition with AI-powered writing assistance.
            </p>
          </div>

          <CoverLetterGenerator />
        </div>
      </div>
    </div>
  );
}