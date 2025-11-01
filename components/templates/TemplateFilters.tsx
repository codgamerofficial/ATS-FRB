'use client';

import { useState } from 'react';
import { TemplateCategory } from '@/types/templates';
import { useTemplateStore } from '@/store/templateStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Search, Filter, X, Crown } from 'lucide-react';

const categories: { value: TemplateCategory; label: string }[] = [
  { value: 'modern', label: 'Modern' },
  { value: 'classic', label: 'Classic' },
  { value: 'creative', label: 'Creative' },
  { value: 'executive', label: 'Executive' },
  { value: 'technical', label: 'Technical' },
  { value: 'academic', label: 'Academic' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'colorful', label: 'Colorful' },
  { value: 'ats-optimized', label: 'ATS Optimized' },
  { value: 'industry-specific', label: 'Industry Specific' }
];

export default function TemplateFilters() {
  const { filter, searchTerm, setFilter, setSearchTerm, resetFilters } = useTemplateStore();
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryFilter = (category: TemplateCategory) => {
    setFilter({ 
      category: filter.category === category ? undefined : category 
    });
  };

  const handlePremiumFilter = (isPremium: boolean) => {
    setFilter({ 
      isPremium: filter.isPremium === isPremium ? undefined : isPremium 
    });
  };

  const hasActiveFilters = filter.category || filter.isPremium !== undefined || searchTerm;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-1 text-xs bg-cyan-500 text-white rounded-full">
              {[filter.category, filter.isPremium !== undefined ? 'premium' : null, searchTerm ? 'search' : null]
                .filter(Boolean).length}
            </span>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="flex items-center text-red-400 border-red-400 hover:bg-red-400/10"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600/30 rounded-lg p-4 space-y-4">
          {/* Category Filters */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  size="sm"
                  variant={filter.category === category.value ? 'default' : 'outline'}
                  onClick={() => handleCategoryFilter(category.value)}
                  className="text-xs"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Premium Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Type</h3>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={filter.isPremium === false ? 'default' : 'outline'}
                onClick={() => handlePremiumFilter(false)}
                className="text-xs"
              >
                Free Templates
              </Button>
              <Button
                size="sm"
                variant={filter.isPremium === true ? 'default' : 'outline'}
                onClick={() => handlePremiumFilter(true)}
                className="text-xs flex items-center"
              >
                <Crown className="w-3 h-3 mr-1" />
                Premium Templates
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}