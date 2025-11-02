'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useResumeStore } from '@/store/resumeStore';
import { useAuth } from '@/hooks/useAuth';
import { useAutoSave } from '@/hooks/useAutoSave';
import { saswataResumeData } from '@/utils/sampleData';
import ResumeForm from '@/components/forms/ResumeForm';
import ResumePreview from '@/components/resume/ResumePreview';
import StepIndicator from '@/components/ui/StepIndicator';
import AuthGuard from '@/components/ui/AuthGuard';
import UserMenu from '@/components/ui/UserMenu';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import SciFiBackground from '@/components/ui/SciFiBackground';
import SciFiCard from '@/components/ui/SciFiCard';
import Logo from '@/components/ui/Logo';
import CollaborationPanel from '@/components/collaboration/CollaborationPanel';
import ResumeAnalytics from '@/components/analytics/ResumeAnalytics';
import ExportOptions from '@/components/export/ExportOptions';
import { FileText, Sparkles, Zap, Target, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { id: 0, name: 'Personal Info', description: 'Basic information' },
  { id: 1, name: 'Summary', description: 'Professional summary' },
  { id: 2, name: 'Experience', description: 'Work experience' },
  { id: 3, name: 'Education', description: 'Educational background' },
  { id: 4, name: 'Skills', description: 'Technical & soft skills' },
  { id: 5, name: 'Projects', description: 'Notable projects' },
  { id: 6, name: 'Additional', description: 'Certifications & more' },
];

function BuilderPageContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { currentStep, loadResumeData, resumeData } = useResumeStore();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  useAutoSave(resumeData, {
    onSave: async (data) => {
      // Auto-save to Supabase
      console.log('Auto-saving resume data:', data);
    },
    enabled: !!user
  });

  useEffect(() => {
    const sample = searchParams.get('sample');
    if (sample === 'saswata') {
      loadResumeData(saswataResumeData);
    }
    setIsLoading(false);
  }, [searchParams, loadResumeData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <SciFiBackground />
        
        {/* Enhanced Header */}
        <header className="relative z-20 bg-gray-900/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-6">
                <Link href="/" className="flex items-center group">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <Logo size={20} animated={false} />
                  </div>
                  <span className="ml-3 text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    ATSFRB
                  </span>
                </Link>
                <div className="h-6 w-px bg-cyan-500/30"></div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <h1 className="text-xl font-semibold text-white">Resume Builder</h1>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 transition-all duration-300"
                >
                  {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span className="text-sm font-medium">{previewMode ? 'Edit' : 'Preview'}</span>
                </button>
                <StepIndicator steps={steps} currentStep={currentStep} />
                <DarkModeToggle />
                <UserMenu />
              </div>
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="relative z-10 bg-gray-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-gray-300">Progress:</span>
                  <span className="text-sm font-medium text-cyan-400">
                    {Math.round(((currentStep + 1) / steps.length) * 100)}%
                  </span>
                </div>
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="lg:hidden flex items-center space-x-2 px-3 py-1 rounded-md bg-gray-700/50 text-gray-300 hover:text-white transition-colors"
              >
                <Zap className="w-4 h-4" />
                <span className="text-sm">Tools</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
          <AnimatePresence mode="wait">
            {previewMode ? (
              <div key="preview" className="w-full">
                <SciFiCard className="p-8 max-w-4xl mx-auto">
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Resume Preview</h2>
                    <p className="text-gray-400">Full-screen preview of your resume</p>
                  </div>
                  <ResumePreview />
                </SciFiCard>
              </div>
            ) : (
              <div
                key="builder"
                className={`grid gap-6 transition-all duration-300 ${
                  sidebarCollapsed ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 xl:grid-cols-12'
                }`}
              >
                {/* Main Content */}
                <div className={sidebarCollapsed ? 'lg:col-span-2' : 'xl:col-span-8'}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <SciFiCard className="p-6 h-full">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                            <h3 className="text-lg font-semibold text-white">Form Editor</h3>
                          </div>
                          <div className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                            Step {currentStep + 1}/{steps.length}
                          </div>
                        </div>
                        <ResumeForm />
                      </SciFiCard>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <SciFiCard className="p-6 h-full">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <h3 className="text-lg font-semibold text-white">Live Preview</h3>
                          </div>
                          <div className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                            Real-time
                          </div>
                        </div>
                        <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                          <ResumePreview />
                        </div>
                      </SciFiCard>
                    </motion.div>
                  </div>
                </div>

                {/* Enhanced Sidebar */}
                {!sidebarCollapsed && (
                  <div className="xl:col-span-4 space-y-4">
                    <div>
                      <CollaborationPanel 
                        resumeId={searchParams.get('resume') || 'new'}
                        currentUser={user}
                        isOwner={true}
                      />
                    </div>

                    <div>
                      <ResumeAnalytics 
                        resume={resumeData}
                      />
                    </div>

                    <div>
                      <ExportOptions 
                        resume={resumeData}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Action Button for Mobile */}
        <div className="fixed bottom-6 right-6 z-30 lg:hidden">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-110"
          >
            <Zap className="w-6 h-6" />
          </button>
        </div>
      </div>
    </AuthGuard>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    }>
      <BuilderPageContent />
    </Suspense>
  );
}