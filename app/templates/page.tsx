'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import UserMenu from '@/components/ui/UserMenu';
import SciFiBackground from '@/components/ui/SciFiBackground';
import Logo from '@/components/ui/Logo';
import TemplateCard from '@/components/templates/TemplateCard';
import TemplateFilters from '@/components/templates/TemplateFilters';
import TemplatePreviewModal from '@/components/templates/TemplatePreviewModal';
import { useAuth } from '@/hooks/useAuth';
import { useTemplateStore } from '@/store/templateStore';
import { TemplateStyle } from '@/types/templates';
import { ArrowLeft, Grid, List } from 'lucide-react';
import Link from 'next/link';

export default function TemplatesPage() {
  const { user, loading } = useAuth();
  const { getFilteredTemplates } = useTemplateStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateStyle | null>(null);
  
  const filteredTemplates = getFilteredTemplates();

  return (
    <div className="min-h-screen relative">
      <SciFiBackground />
      <nav className="relative z-10 bg-gray-900/80 backdrop-blur-md border-b border-cyan-500/30 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Logo size={32} animated={false} />
                <span className="ml-2 text-xl font-bold text-white">ATSFRB</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <DarkModeToggle />
              {!loading && (
                user ? (
                  <UserMenu />
                ) : (
                  <Link href="/auth">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Template
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Select from our collection of 100+ professional, ATS-friendly resume templates
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <span>{filteredTemplates.length} templates available</span>
            <span>•</span>
            <span>{filteredTemplates.filter(t => !t.isPremium).length} free templates</span>
            <span>•</span>
            <span>{filteredTemplates.filter(t => t.isPremium).length} premium templates</span>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <TemplateFilters />
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            Templates ({filteredTemplates.length})
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 lg:grid-cols-2'
          }`}>
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <TemplateCard 
                  template={template} 
                  onPreview={setPreviewTemplate}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Grid className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No templates found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
            <Button onClick={() => useTemplateStore.getState().resetFilters()} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <TemplatePreviewModal 
        template={previewTemplate}
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
      />
    </div>
  );
}