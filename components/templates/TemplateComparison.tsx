'use client';

import { useState } from 'react';
import { TemplateStyle } from '@/types/templates';
import Button from '@/components/ui/Button';
import TemplateRenderer from './TemplateRenderer';
import { useResumeStore } from '@/store/resumeStore';
import { X, Compare, Palette, Crown } from 'lucide-react';

interface TemplateComparisonProps {
  templates: TemplateStyle[];
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplateComparison({ templates, isOpen, onClose }: TemplateComparisonProps) {
  const { resumeData } = useResumeStore();

  if (!isOpen || templates.length === 0) return null;

  const sampleData = {
    ...resumeData,
    personalInfo: {
      ...resumeData.personalInfo,
      fullName: resumeData.personalInfo.fullName || 'John Doe',
      email: resumeData.personalInfo.email || 'john.doe@email.com',
      phone: resumeData.personalInfo.phone || '+1 (555) 123-4567',
      location: resumeData.personalInfo.location || 'New York, NY'
    },
    summary: resumeData.summary || 'Experienced professional with a proven track record of success.',
    experience: resumeData.experience.length > 0 ? resumeData.experience.slice(0, 1) : [
      {
        id: '1',
        company: 'Tech Company Inc.',
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2020',
        endDate: '2023',
        current: false,
        description: ['Led development of scalable web applications']
      }
    ]
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="h-full overflow-y-auto">
        <div className="min-h-full bg-gray-900 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Compare className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Compare Templates</h2>
            </div>
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className={`grid gap-6 ${templates.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {templates.map((template) => (
              <div key={template.id} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      {template.name}
                      {template.isPremium && <Crown className="w-4 h-4 text-yellow-400" />}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        template.isPremium ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {template.isPremium ? 'Premium' : 'Free'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">{template.description}</p>
                  <div className="flex items-center space-x-2">
                    <Palette className="w-3 h-3 text-gray-400" />
                    <div className="flex space-x-1">
                      {Object.values(template.colors).slice(0, 4).map((color, index) => (
                        <div
                          key={index}
                          className="w-3 h-3 rounded-full border border-gray-600"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 max-h-96 overflow-y-auto">
                  <TemplateRenderer 
                    template={template} 
                    resumeData={sampleData}
                    className="transform scale-75 origin-top-left"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}