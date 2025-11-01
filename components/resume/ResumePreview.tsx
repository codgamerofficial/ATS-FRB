'use client';

import { useResumeStore } from '@/store/resumeStore';
import { useTemplateStore } from '@/store/templateStore';
import Button from '@/components/ui/Button';
import TemplateRenderer from '@/components/templates/TemplateRenderer';
import { Download, Eye, Share2, Save, FileText, Palette } from 'lucide-react';
import { generatePDF } from '@/utils/pdfGenerator';
import { generateDOCX } from '@/utils/docxGenerator';
import { saveResume, updateResume } from '@/utils/resumeService';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

export default function ResumePreview() {
  const { resumeData } = useResumeStore();
  const { selectedTemplate, getTemplateById } = useTemplateStore();
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(selectedTemplate);
  const searchParams = useSearchParams();
  const { personalInfo } = resumeData;

  useEffect(() => {
    const templateId = searchParams?.get('template');
    if (templateId) {
      const template = getTemplateById(templateId);
      if (template) {
        setCurrentTemplate(template);
      }
    }
  }, [searchParams, getTemplateById]);

  const activeTemplate = currentTemplate || selectedTemplate || getTemplateById('modern-1');

  const handleDownloadPDF = async () => {
    try {
      await generatePDF(resumeData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF');
    }
  };

  const handleDownloadDOCX = async () => {
    try {
      await generateDOCX(resumeData);
      toast.success('DOCX downloaded successfully!');
    } catch (error) {
      console.error('Error generating DOCX:', error);
      toast.error('Failed to generate DOCX');
    }
  };

  const handleSaveResume = async () => {
    if (!user) {
      toast.error('Please sign in to save your resume');
      return;
    }

    if (!personalInfo.fullName) {
      toast.error('Please add your name before saving');
      return;
    }

    setIsSaving(true);
    try {
      const title = `${personalInfo.fullName} - Resume`;
      await saveResume(title, resumeData);
      toast.success('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.error('Failed to save resume');
    } finally {
      setIsSaving(false);
    }
  };

  const handleShareResume = async () => {
    const shareData = {
      title: `${personalInfo.fullName || 'My'} Resume`,
      text: `Check out ${personalInfo.fullName || 'my'} professional resume created with ATS Resume Builder`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Resume link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share resume');
    }
  };

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Preview</h2>
        <div className="flex space-x-2">
          {user && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleSaveResume}
              isLoading={isSaving}
              className="flex items-center"
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={handleShareResume} className="flex items-center">
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
          <Button size="sm" onClick={handleDownloadPDF} className="flex items-center">
            <Download className="w-4 h-4 mr-1" />
            PDF
          </Button>
          <Button size="sm" variant="outline" onClick={handleDownloadDOCX} className="flex items-center">
            <FileText className="w-4 h-4 mr-1" />
            DOCX
          </Button>
          <Button size="sm" variant="outline" onClick={() => window.open('/templates', '_blank')} className="flex items-center">
            <Palette className="w-4 h-4 mr-1" />
            Change Template
          </Button>
        </div>
      </div>

      {/* Template Info */}
      {activeTemplate && (
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600/30 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Palette className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="font-medium text-white">{activeTemplate.name}</h3>
                <p className="text-sm text-gray-300">{activeTemplate.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                activeTemplate.isPremium ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
              }`}>
                {activeTemplate.isPremium ? 'Premium' : 'Free'}
              </span>
              <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
                {activeTemplate.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Resume Preview */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm max-h-[800px] overflow-y-auto">
        {activeTemplate ? (
          <TemplateRenderer 
            template={activeTemplate} 
            resumeData={resumeData} 
            className="p-8"
          />
        ) : (
          <div className="p-8 text-center text-gray-500">
            <p>No template selected. Please choose a template to preview your resume.</p>
          </div>
        )}
      </div>
    </div>
  );
}