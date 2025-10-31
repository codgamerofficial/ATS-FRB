'use client';

import { useEffect, useState } from 'react';
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

export default function BuilderPage() {
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="flex items-center mr-6">
                  <FileText className="h-6 w-6 text-primary-600" />
                  <span className="ml-2 text-lg font-bold text-gray-900">ResumeBuilder</span>
                </Link>
                <h1 className="text-xl font-semibold text-gray-700">Resume Builder</h1>
              </div>
              <div className="flex items-center space-x-4">
                <StepIndicator steps={steps} currentStep={currentStep} />
                <DarkModeToggle />
                <UserMenu />
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <ResumeForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <ResumePreview />
            </motion.div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}