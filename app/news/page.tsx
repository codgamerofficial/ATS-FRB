'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import SciFiBackground from '@/components/ui/SciFiBackground';
import NewsSystem from '@/components/news/NewsSystem';
export default function NewsPage() {

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SciFiBackground isDark={false} />
      
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
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ textShadow: '0 0 30px rgba(0, 255, 255, 0.5)' }}>
              📰 Live News Center
            </h1>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
              Stay updated with real-time news from India and around the world. 
              Get breaking news, state-wise updates, and global coverage.
            </p>
          </div>

          <NewsSystem />
        </div>
      </div>
    </div>
  );
}