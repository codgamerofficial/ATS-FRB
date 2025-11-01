'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import UserMenu from '@/components/ui/UserMenu';
import SciFiBackground from '@/components/ui/SciFiBackground';
import Logo from '@/components/ui/Logo';
import TemplateCard from '@/components/templates/TemplateCard';
import TemplateFilters from '@/components/templates/TemplateFilters';
import TemplatePreviewModal from '@/components/templates/TemplatePreviewModal';
import TemplateSorting, { SortOption, SortOrder } from '@/components/templates/TemplateSorting';
import TemplateComparison from '@/components/templates/TemplateComparison';
import TemplateRecommendations from '@/components/templates/TemplateRecommendations';
import { useAuth } from '@/hooks/useAuth';
import { useTemplateStore } from '@/store/templateStore';
import { TemplateStyle } from '@/types/templates';
import { ArrowLeft, Grid, List, GitCompare, Bookmark, Shuffle } from 'lucide-react';
import Link from 'next/link';

export default function TemplatesPage() {
  const { user, loading } = useAuth();
  const { getFilteredTemplates, resetFilters, templates } = useTemplateStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateStyle | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [compareTemplates, setCompareTemplates] = useState<TemplateStyle[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  
  const filteredTemplates = useMemo(() => {
    let templates = getFilteredTemplates();
    
    // Apply favorites filter
    if (showFavorites) {
      const favorites = JSON.parse(localStorage.getItem('templateFavorites') || '[]');
      templates = templates.filter(t => favorites.includes(t.id));
    }
    
    // Apply sorting
    templates.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'premium':
          comparison = Number(a.isPremium) - Number(b.isPremium);
          break;
        case 'newest':
          comparison = a.id.localeCompare(b.id);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return templates;
  }, [getFilteredTemplates, sortBy, sortOrder, showFavorites]);
  const templateStats = useMemo(() => ({
    total: filteredTemplates.length,
    free: filteredTemplates.filter(t => !t.isPremium).length,
    premium: filteredTemplates.filter(t => t.isPremium).length
  }), [filteredTemplates]);

  const handlePreviewTemplate = useCallback((template: TemplateStyle) => {
    setPreviewTemplate(template);
  }, []);

  const handleClosePreview = useCallback(() => {
    setPreviewTemplate(null);
  }, []);

  const handleClearFilters = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  const handleSortChange = useCallback((newSortBy: SortOption, newSortOrder: SortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  }, []);

  const handleCompareToggle = useCallback((template: TemplateStyle) => {
    setCompareTemplates(prev => {
      const exists = prev.find(t => t.id === template.id);
      if (exists) {
        return prev.filter(t => t.id !== template.id);
      } else if (prev.length < 3) {
        return [...prev, template];
      }
      return prev;
    });
  }, []);

  const getRandomTemplates = useCallback(() => {
    const shuffled = [...templates].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  }, [templates]);

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

        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Template
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Select from our collection of 100+ professional, ATS-friendly resume templates
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <span>{templateStats.total} templates available</span>
            <span>•</span>
            <span>{templateStats.free} free templates</span>
            <span>•</span>
            <span>{templateStats.premium} premium templates</span>
          </div>
        </header>

        {/* Filters */}
        <div className="mb-8">
          <TemplateFilters />
        </div>

        {/* Recommendations */}
        {!showFavorites && (
          <TemplateRecommendations
            templates={templates}
            userPreferences={{
              industry: 'tech',
              experience: 'mid',
              style: 'modern'
            }}
            onPreview={handlePreviewTemplate}
          />
        )}

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-white">
              {showFavorites ? 'Favorite Templates' : 'Templates'} ({templateStats.total})
            </h2>
            {compareTemplates.length > 0 && (
              <Button
                size="sm"
                onClick={() => setShowComparison(true)}
                className="flex items-center space-x-2"
              >
                <GitCompare className="w-4 h-4" />
                <span>Compare ({compareTemplates.length})</span>
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={showFavorites ? 'default' : 'outline'}
              onClick={() => setShowFavorites(!showFavorites)}
            >
              <Bookmark className="w-4 h-4 mr-1" />
              Favorites
            </Button>
            
            <TemplateSorting
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
            />
            
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <main 
            className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 lg:grid-cols-2'
            }`}
            role="main"
            aria-label="Resume templates"
          >
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <TemplateCard 
                  template={template} 
                  onPreview={handlePreviewTemplate}
                  onCompareToggle={handleCompareToggle}
                  isInComparison={compareTemplates.some(t => t.id === template.id)}
                />
              </motion.div>
            ))}
          </main>
        ) : (
          <main className="text-center py-12" role="main">
            <div className="text-gray-400 mb-4">
              <Grid className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No templates found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
            <Button onClick={handleClearFilters} variant="outline">
              Clear Filters
            </Button>
          </main>
        )}
      </div>

      {/* Preview Modal */}
      <TemplatePreviewModal 
        template={previewTemplate}
        isOpen={!!previewTemplate}
        onClose={handleClosePreview}
      />
      
      {/* Comparison Modal */}
      <TemplateComparison
        templates={compareTemplates}
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />
    </div>
  );
}