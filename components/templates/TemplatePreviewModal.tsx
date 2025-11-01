'use client';

import { useState } from 'react';
import { TemplateStyle } from '@/types/templates';
import { useResumeStore } from '@/store/resumeStore';
import Button from '@/components/ui/Button';
import TemplateRenderer from './TemplateRenderer';
import { X, Download, Eye, Palette, Crown } from 'lucide-react';
import Link from 'next/link';

interface TemplatePreviewModalProps {
  template: TemplateStyle | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplatePreviewModal({ template, isOpen, onClose }: TemplatePreviewModalProps) {
  const { resumeData } = useResumeStore();
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen || !template) return null;

  const sampleData = {
    ...resumeData,
    personalInfo: {
      ...resumeData.personalInfo,
      fullName: resumeData.personalInfo.fullName || 'John Doe',
      email: resumeData.personalInfo.email || 'john.doe@email.com',
      phone: resumeData.personalInfo.phone || '+1 (555) 123-4567',
      location: resumeData.personalInfo.location || 'New York, NY'
    },
    summary: resumeData.summary || 'Experienced professional with a proven track record of success in driving business growth and leading high-performing teams.',
    experience: resumeData.experience.length > 0 ? resumeData.experience : [
      {
        id: '1',
        company: 'Tech Company Inc.',
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2020',
        endDate: '2023',
        current: false,
        description: ['Led development of scalable web applications', 'Mentored junior developers', 'Improved system performance by 40%']
      }
    ]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className={`bg-gray-900 rounded-lg shadow-2xl border border-gray-700 ${
        isFullscreen ? 'w-full h-full' : 'w-11/12 h-5/6 max-w-6xl'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Palette className="w-6 h-6 text-cyan-400" />
            <div>
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                {template.name}
                {template.isPremium && <Crown className="w-5 h-5 text-yellow-400" />}
              </h2>
              <p className="text-sm text-gray-300">{template.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Eye className="w-4 h-4 mr-1" />
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </Button>
            <Button size="sm" variant="outline" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Template Info */}
        <div className="px-4 py-2 bg-gray-800/50 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <span className={`px-2 py-1 rounded-full ${
                template.isPremium ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
              }`}>
                {template.isPremium ? 'Premium' : 'Free'}
              </span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                {template.category}
              </span>
              <span className="text-gray-400">
                Layout: {template.layout.type}
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-400 mr-2">Colors:</span>
              {Object.values(template.colors).slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-600"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-sm max-w-4xl mx-auto">
              <TemplateRenderer 
                template={template} 
                resumeData={sampleData}
                className="p-8"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-gray-700 bg-gray-800/30">
          <div className="flex flex-wrap gap-2">
            {template.features.map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-700/50 text-gray-300 rounded border border-gray-600/30"
              >
                {feature}
              </span>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Link href={`/builder?template=${template.id}`}>
              <Button>
                Use This Template
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}