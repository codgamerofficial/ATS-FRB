'use client';

import { useResumeStore } from '@/store/resumeStore';
import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import AdditionalForm from './AdditionalForm';
import Button from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, Save, CheckCircle, Circle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const formComponents = [
  PersonalInfoForm,
  SummaryForm,
  ExperienceForm,
  EducationForm,
  SkillsForm,
  ProjectsForm,
  AdditionalForm,
];

export default function ResumeForm() {
  const { currentStep, setCurrentStep, saveResume, isSaving } = useResumeStore();
  const CurrentFormComponent = formComponents[currentStep];

  const handleNext = () => {
    if (currentStep < formComponents.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg blur-xl"></div>
        <div className="relative bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {getStepTitle(currentStep)}
                </h2>
              </div>
              <div className="px-2 py-1 bg-cyan-500/20 rounded-full text-xs font-medium text-cyan-300">
                Step {currentStep + 1}/{formComponents.length}
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {Array.from({ length: formComponents.length }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index <= currentStep ? 'bg-cyan-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            {getStepDescription(currentStep)}
          </p>
        </div>
      </div>

      {/* Form Content with Animation */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6">
              <CurrentFormComponent />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-cyan-500/20">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center space-x-2 px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>

        <div className="flex items-center space-x-3">
          {/* Auto-save indicator */}
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Auto-saved</span>
          </div>
          
          <Button
            variant="outline"
            onClick={() => saveResume()}
            isLoading={isSaving}
            className="flex items-center space-x-2 px-4 py-3"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={currentStep === formComponents.length - 1}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{currentStep === formComponents.length - 1 ? 'Complete' : 'Next'}</span>
            {currentStep === formComponents.length - 1 ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Progress</span>
          <span>{Math.round(((currentStep + 1) / formComponents.length) * 100)}% Complete</span>
        </div>
        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / formComponents.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function getStepTitle(step: number): string {
  const titles = [
    'Personal Information',
    'Professional Summary',
    'Work Experience',
    'Education',
    'Skills',
    'Projects',
    'Additional Information',
  ];
  return titles[step] || '';
}

function getStepDescription(step: number): string {
  const descriptions = [
    'Enter your basic contact information and professional details to get started',
    'Write a compelling summary that highlights your professional background and career objectives',
    'Add your work experience, achievements, and key responsibilities in previous roles',
    'Include your educational background, degrees, certifications, and academic achievements',
    'List your technical skills, programming languages, tools, and soft skills',
    'Showcase your notable projects, contributions, and technical accomplishments',
    'Add additional information like certifications, languages, hobbies, and volunteer work',
  ];
  return descriptions[step] || '';
}