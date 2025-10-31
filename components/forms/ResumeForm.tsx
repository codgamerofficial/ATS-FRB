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
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

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
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Step {currentStep + 1}: {getStepTitle(currentStep)}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {getStepDescription(currentStep)}
        </p>
      </div>

      <div className="min-h-[400px]">
        <CurrentFormComponent />
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-200">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => saveResume()}
            isLoading={isSaving}
            className="flex items-center"
          >
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={currentStep === formComponents.length - 1}
            className="flex items-center"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
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
    'Enter your basic contact information and details',
    'Write a compelling summary of your professional background',
    'Add your work experience and achievements',
    'Include your educational background',
    'List your technical and soft skills',
    'Showcase your notable projects',
    'Add certifications, languages, and hobbies',
  ];
  return descriptions[step] || '';
}