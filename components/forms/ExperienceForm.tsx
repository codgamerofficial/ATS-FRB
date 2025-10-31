'use client';

import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Experience } from '@/types';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { Plus, Trash2, Briefcase } from 'lucide-react';

export default function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResumeStore();
  const { experience } = resumeData;
  const [editingId, setEditingId] = useState<string | null>(null);

  const addNewExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ['']
    };
    addExperience(newExperience);
    setEditingId(newExperience.id);
  };

  const updateExperienceField = (id: string, field: keyof Experience, value: any) => {
    updateExperience(id, { [field]: value });
  };

  const updateDescription = (id: string, index: number, value: string) => {
    const exp = experience.find(e => e.id === id);
    if (exp) {
      const newDescription = [...exp.description];
      newDescription[index] = value;
      updateExperience(id, { description: newDescription });
    }
  };

  const addDescriptionPoint = (id: string) => {
    const exp = experience.find(e => e.id === id);
    if (exp) {
      updateExperience(id, { description: [...exp.description, ''] });
    }
  };

  const removeDescriptionPoint = (id: string, index: number) => {
    const exp = experience.find(e => e.id === id);
    if (exp && exp.description.length > 1) {
      const newDescription = exp.description.filter((_, i) => i !== index);
      updateExperience(id, { description: newDescription });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
        <Button onClick={addNewExperience} className="flex items-center">
          <Plus className="w-4 h-4 mr-1" />
          Add Experience
        </Button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No work experience added yet</p>
          <Button onClick={addNewExperience} variant="outline">
            Add Your First Job
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900">Experience #{index + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Job Title *"
                  value={exp.position}
                  onChange={(e) => updateExperienceField(exp.id, 'position', e.target.value)}
                  placeholder="Software Engineer"
                  required
                />
                <Input
                  label="Company *"
                  value={exp.company}
                  onChange={(e) => updateExperienceField(exp.id, 'company', e.target.value)}
                  placeholder="Tech Company Inc."
                  required
                />
                <Input
                  label="Location"
                  value={exp.location}
                  onChange={(e) => updateExperienceField(exp.id, 'location', e.target.value)}
                  placeholder="San Francisco, CA"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) => updateExperienceField(exp.id, 'current', e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-700">
                    I currently work here
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Start Date *"
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperienceField(exp.id, 'startDate', e.target.value)}
                  required
                />
                {!exp.current && (
                  <Input
                    label="End Date *"
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperienceField(exp.id, 'endDate', e.target.value)}
                    required
                  />
                )}
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Job Description & Achievements
                </label>
                {exp.description.map((desc, descIndex) => (
                  <div key={descIndex} className="flex items-start space-x-2">
                    <Textarea
                      value={desc}
                      onChange={(e) => updateDescription(exp.id, descIndex, e.target.value)}
                      placeholder="• Describe your responsibilities and achievements..."
                      rows={2}
                      className="flex-1"
                    />
                    {exp.description.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDescriptionPoint(exp.id, descIndex)}
                        className="text-red-600 hover:text-red-700 mt-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addDescriptionPoint(exp.id)}
                  className="flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Achievement
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">💼 Experience Tips</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Start each bullet point with an action verb (Led, Developed, Managed)</li>
          <li>• Include specific metrics and achievements when possible</li>
          <li>• Focus on results and impact, not just responsibilities</li>
          <li>• List experiences in reverse chronological order (most recent first)</li>
          <li>• Keep descriptions concise but impactful</li>
        </ul>
      </div>
    </div>
  );
}