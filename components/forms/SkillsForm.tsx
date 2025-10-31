'use client';

import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Skill } from '@/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Plus, Trash2, X, Code } from 'lucide-react';

const defaultSkillCategories = [
  'Technical Skills',
  'Programming Languages',
  'Frameworks & Libraries',
  'Tools & Software',
  'Databases',
  'Soft Skills',
  'Languages',
  'Certifications'
];

export default function SkillsForm() {
  const { resumeData, updateSkills } = useResumeStore();
  const { skills } = resumeData;
  const [newSkillCategory, setNewSkillCategory] = useState('');
  const [newSkillItem, setNewSkillItem] = useState('');

  const addSkillCategory = () => {
    if (newSkillCategory.trim()) {
      const newSkill: Skill = {
        category: newSkillCategory.trim(),
        items: []
      };
      updateSkills([...skills, newSkill]);
      setNewSkillCategory('');
    }
  };

  const removeSkillCategory = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    updateSkills(updatedSkills);
  };

  const addSkillItem = (categoryIndex: number) => {
    if (newSkillItem.trim()) {
      const updatedSkills = [...skills];
      updatedSkills[categoryIndex].items.push(newSkillItem.trim());
      updateSkills(updatedSkills);
      setNewSkillItem('');
    }
  };

  const removeSkillItem = (categoryIndex: number, itemIndex: number) => {
    const updatedSkills = [...skills];
    updatedSkills[categoryIndex].items = updatedSkills[categoryIndex].items.filter((_, i) => i !== itemIndex);
    updateSkills(updatedSkills);
  };

  const updateSkillCategory = (index: number, newCategory: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index].category = newCategory;
    updateSkills(updatedSkills);
  };

  const addPredefinedCategory = (category: string) => {
    if (!skills.find(skill => skill.category === category)) {
      const newSkill: Skill = {
        category,
        items: []
      };
      updateSkills([...skills, newSkill]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Skills</h3>
      </div>

      {/* Quick Add Predefined Categories */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Add Categories:</h4>
        <div className="flex flex-wrap gap-2">
          {defaultSkillCategories.map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              onClick={() => addPredefinedCategory(category)}
              disabled={skills.some(skill => skill.category === category)}
              className="text-xs"
            >
              <Plus className="w-3 h-3 mr-1" />
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Add Custom Category */}
      <div className="flex space-x-2">
        <Input
          value={newSkillCategory}
          onChange={(e) => setNewSkillCategory(e.target.value)}
          placeholder="Add custom skill category..."
          className="flex-1"
          onKeyPress={(e) => e.key === 'Enter' && addSkillCategory()}
        />
        <Button onClick={addSkillCategory} disabled={!newSkillCategory.trim()}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No skills added yet</p>
          <p className="text-sm text-gray-400">Start by adding a skill category above</p>
        </div>
      ) : (
        <div className="space-y-6">
          {skills.map((skillCategory, categoryIndex) => (
            <div key={categoryIndex} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <Input
                  value={skillCategory.category}
                  onChange={(e) => updateSkillCategory(categoryIndex, e.target.value)}
                  className="font-medium text-gray-900 border-none bg-transparent p-0 focus:ring-0"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkillCategory(categoryIndex)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Skill Items */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {skillCategory.items.map((item, itemIndex) => (
                    <span
                      key={itemIndex}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                    >
                      {item}
                      <button
                        onClick={() => removeSkillItem(categoryIndex, itemIndex)}
                        className="ml-2 text-primary-600 hover:text-primary-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Input
                    value={newSkillItem}
                    onChange={(e) => setNewSkillItem(e.target.value)}
                    placeholder={`Add ${skillCategory.category.toLowerCase()}...`}
                    className="flex-1"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addSkillItem(categoryIndex);
                      }
                    }}
                  />
                  <Button
                    onClick={() => addSkillItem(categoryIndex)}
                    disabled={!newSkillItem.trim()}
                    size="sm"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">🚀 Skills Tips</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Group similar skills into categories for better organization</li>
          <li>• List skills in order of proficiency (strongest first)</li>
          <li>• Include both technical and soft skills relevant to your target role</li>
          <li>• Be honest about your skill level - avoid listing skills you can't demonstrate</li>
          <li>• Use industry-standard terminology and tool names</li>
          <li>• Consider adding proficiency levels (Beginner, Intermediate, Advanced)</li>
        </ul>
      </div>
    </div>
  );
}