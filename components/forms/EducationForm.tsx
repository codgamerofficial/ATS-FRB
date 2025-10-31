'use client';

import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Education } from '@/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore();
  const { education } = resumeData;

  const addNewEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: ''
    };
    addEducation(newEducation);
  };

  const updateEducationField = (id: string, field: keyof Education, value: string) => {
    updateEducation(id, { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Education</h3>
        <Button onClick={addNewEducation} className="flex items-center">
          <Plus className="w-4 h-4 mr-1" />
          Add Education
        </Button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No education added yet</p>
          <Button onClick={addNewEducation} variant="outline">
            Add Your Education
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={edu.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900">Education #{index + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Institution *"
                  value={edu.institution}
                  onChange={(e) => updateEducationField(edu.id, 'institution', e.target.value)}
                  placeholder="University of California"
                  required
                />
                <Input
                  label="Degree *"
                  value={edu.degree}
                  onChange={(e) => updateEducationField(edu.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science"
                  required
                />
                <Input
                  label="Field of Study *"
                  value={edu.field}
                  onChange={(e) => updateEducationField(edu.id, 'field', e.target.value)}
                  placeholder="Computer Science"
                  required
                />
                <Input
                  label="GPA (Optional)"
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducationField(edu.id, 'gpa', e.target.value)}
                  placeholder="3.8/4.0"
                />
                <Input
                  label="Start Date *"
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => updateEducationField(edu.id, 'startDate', e.target.value)}
                  required
                />
                <Input
                  label="End Date *"
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => updateEducationField(edu.id, 'endDate', e.target.value)}
                  required
                />
              </div>

              <div className="mt-4">
                <Input
                  label="Additional Details (Optional)"
                  value={edu.description || ''}
                  onChange={(e) => updateEducationField(edu.id, 'description', e.target.value)}
                  placeholder="Relevant coursework, honors, activities..."
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">🎓 Education Tips</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• List education in reverse chronological order (most recent first)</li>
          <li>• Include GPA only if it's 3.5 or higher</li>
          <li>• Mention relevant coursework, honors, or academic achievements</li>
          <li>• For recent graduates, education can be placed before experience</li>
          <li>• Include certifications and professional development courses</li>
        </ul>
      </div>
    </div>
  );
}