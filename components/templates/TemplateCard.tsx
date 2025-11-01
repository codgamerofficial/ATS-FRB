'use client';

import { TemplateStyle } from '@/types/templates';
import Button from '@/components/ui/Button';
import SciFiCard from '@/components/ui/SciFiCard';
import TemplateFavorites from './TemplateFavorites';
import { FileText, Crown, Eye, Palette, Plus } from 'lucide-react';
import Link from 'next/link';

interface TemplateCardProps {
  template: TemplateStyle;
  onPreview?: (template: TemplateStyle) => void;
  onCompareToggle?: (template: TemplateStyle) => void;
  isInComparison?: boolean;
}

export default function TemplateCard({ template, onPreview, onCompareToggle, isInComparison }: TemplateCardProps) {
  const categoryColors = {
    modern: 'from-blue-500 to-cyan-500',
    classic: 'from-gray-600 to-gray-800',
    creative: 'from-purple-500 to-pink-500',
    executive: 'from-indigo-600 to-blue-700',
    technical: 'from-green-500 to-teal-500',
    academic: 'from-amber-500 to-orange-500',
    minimalist: 'from-slate-500 to-gray-600',
    colorful: 'from-red-500 to-yellow-500',
    'ats-optimized': 'from-emerald-500 to-green-600',
    'industry-specific': 'from-violet-500 to-purple-600'
  };

  return (
    <SciFiCard className="overflow-hidden hover:shadow-cyan-500/20 transition-all duration-300 group">
      <div className="aspect-[3/4] relative overflow-hidden">
        <div className={`w-full h-full bg-gradient-to-br ${categoryColors[template.category]} opacity-80 flex items-center justify-center`}>
          <div className="text-center p-4">
            <FileText className="w-16 h-16 mx-auto mb-2 text-white" />
            <div className="space-y-1">
              <div className="h-2 rounded bg-white/80" />
              <div className="h-1 rounded bg-white/60" />
              <div className="h-1 rounded w-3/4 bg-white/40" />
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button size="sm" variant="outline" onClick={() => onPreview?.(template)} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
            {template.name}
          </h3>
          <div className="flex items-center space-x-1">
            {template.isPremium && <Crown className="w-4 h-4 text-yellow-400" />}
            <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${categoryColors[template.category]} text-white`}>
              {template.category}
            </span>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{template.description}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {template.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-700/50 text-gray-300 rounded border border-gray-600/30">
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center mb-4">
          <Palette className="w-3 h-3 text-gray-400 mr-2" />
          <div className="flex space-x-1">
            {Object.values(template.colors).slice(0, 4).map((color, index) => (
              <div key={index} className="w-3 h-3 rounded-full border border-gray-600" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <TemplateFavorites templateId={template.id} />
          <Button size="sm" variant="outline" onClick={() => onPreview?.(template)} className="flex-1">
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Link href={`/builder?template=${template.id}`} className="flex-1">
            <Button size="sm" className="w-full">Use Template</Button>
          </Link>
        </div>
      </div>
    </SciFiCard>
  );
}