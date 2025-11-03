'use client';

import { ReactNode } from 'react';
import { ArrowLeft, Menu, Home } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface MobileLayoutProps {
  children: ReactNode;
  title: string;
  showBack?: boolean;
  backHref?: string;
}

export default function MobileLayout({ children, title, showBack = true, backHref = '/' }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/30 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBack && (
              <Link href={backHref}>
                <Button size="sm" variant="outline" className="p-2">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
            )}
            <h1 className="text-lg font-bold text-white truncate">{title}</h1>
          </div>
          
          <Link href="/">
            <Button size="sm" className="p-2">
              <Home className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {children}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-cyan-500/30 px-2 py-2 z-50">
        <div className="grid grid-cols-4 gap-1">
          {[
            { href: '/builder', icon: '🔧', label: 'Build' },
            { href: '/templates', icon: '📋', label: 'Templates' },
            { href: '/ats-analyzer', icon: '🎯', label: 'ATS' },
            { href: '/portfolio', icon: '💼', label: 'Portfolio' }
          ].map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="flex flex-col items-center p-2 rounded-lg hover:bg-cyan-500/10 transition-colors">
                <span className="text-lg mb-1">{item.icon}</span>
                <span className="text-xs text-cyan-300 font-medium">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom padding for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}