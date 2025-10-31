'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useResumeStore } from '@/store/resumeStore';
import { saswataResumeData } from '@/utils/sampleData';
import ResumeForm from '@/components/forms/ResumeForm';
import ResumePreview from '@/components/resume/ResumePreview';
import StepIndicator from '@/components/ui/StepIndicator';
import AuthGuard from '@/components/ui/AuthGuard';
import UserMenu from '@/components/ui/UserMenu';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import SciFiBackground from '@/components/ui/SciFiBackground';
import SciFiCard from '@/components/ui/SciFiCard';
import { FileText } from 'lucide-react';
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
  const { currentStep, loadResumeData } = useResumeStore();
  const [isLoading, setIsLoading] = useState(true);

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
      <div className="min-h-screen relative">
        <SciFiBackground />
        <header className="relative z-10 bg-gray-900/80 backdrop-blur-md border-b border-cyan-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="flex items-center mr-6">
                  <FileText className="h-6 w-6 text-cyan-400" />
                  <span className="ml-2 text-lg font-bold text-white">ATSFRB</span>
                </Link>
                <h1 className="text-xl font-semibold text-cyan-400">Resume Builder</h1>
              </div>
              <div className="flex items-center space-x-4">
                <StepIndicator steps={steps} currentStep={currentStep} />
                <DarkModeToggle />
                <UserMenu />
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SciFiCard className="p-6">
                <ResumeForm />
              </SciFiCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SciFiCard className="p-6">
                <ResumePreview />
              </SciFiCard>
            </motion.div>
          </div>
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