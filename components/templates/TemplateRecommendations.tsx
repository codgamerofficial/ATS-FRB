'use client';

import { useMemo } from 'react';
import { TemplateStyle } from '@/types/templates';
import TemplateCard from './TemplateCard';
import { Sparkles } from 'lucide-react';

interface TemplateRecommendationsProps {
  templates: TemplateStyle[];
  userPreferences?: {
    industry?: string;
    experience?: string;
    style?: string;
  };
  onPreview: (template: TemplateStyle) => void;
}

export default function TemplateRecommendations({ 
  templates, 
  userPreferences = {}, 
  onPreview 
}: TemplateRecommendationsProps) {
  const recommendations = useMemo(() => {
    const { industry, experience, style } = userPreferences;
    
    let scored = templates.map(template => {
      let score = 0;
      
      // Industry matching
      if (industry) {
        if (template.category === 'industry-specific') score += 3;
        if (template.category === 'technical' && industry === 'tech') score += 2;
        if (template.category === 'creative' && industry === 'design') score += 2;
        if (template.category === 'executive' && industry === 'business') score += 2;
      }
      
      // Experience level matching
      if (experience) {
        if (experience === 'senior' && template.category === 'executive') score += 2;
        if (experience === 'entry' && template.category === 'modern') score += 2;
        if (experience === 'mid' && template.category === 'classic') score += 1;
      }
      
      // Style preference
      if (style) {
        if (style === template.category) score += 3;
      }
      
      // Boost popular templates
      if (['modern-1', 'classic-1', 'ats-1'].includes(template.id)) score += 1;
      
      return { template, score };
    });
    
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(item => item.template);
  }, [templates, userPreferences]);

  if (recommendations.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-semibold text-white">Recommended for You</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onPreview={onPreview}
          />
        ))}
      </div>
    </div>
  );
}