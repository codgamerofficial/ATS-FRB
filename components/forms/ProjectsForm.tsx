'use client';

import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Project } from '@/types';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { Plus, Trash2, X, FolderOpen } from 'lucide-react';

export default function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResumeStore();
  const { projects } = resumeData;
  const [newTechnology, setNewTechnology] = useState('');

  const addNewProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      github: ''
    };
    addProject(newProject);
  };

  const updateProjectField = (id: string, field: keyof Project, value: any) => {
    updateProject(id, { [field]: value });
  };

  const addTechnology = (projectId: string) => {
    if (newTechnology.trim()) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        const updatedTechnologies = [...project.technologies, newTechnology.trim()];
        updateProject(projectId, { technologies: updatedTechnologies });
        setNewTechnology('');
      }
    }
  };

  const removeTechnology = (projectId: string, techIndex: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const updatedTechnologies = project.technologies.filter((_, i) => i !== techIndex);
      updateProject(projectId, { technologies: updatedTechnologies });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Projects</h3>
        <Button onClick={addNewProject} className="flex items-center">
          <Plus className="w-4 h-4 mr-1" />
          Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No projects added yet</p>
          <Button onClick={addNewProject} variant="outline">
            Add Your First Project
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium text-gray-900">Project #{index + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <Input
                  label="Project Name *"
                  value={project.name}
                  onChange={(e) => updateProjectField(project.id, 'name', e.target.value)}
                  placeholder="My Awesome Project"
                  required
                />

                <Textarea
                  label="Project Description *"
                  value={project.description}
                  onChange={(e) => updateProjectField(project.id, 'description', e.target.value)}
                  placeholder="Describe what the project does, your role, and key achievements..."
                  rows={4}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Project Link (Optional)"
                    type="url"
                    value={project.link || ''}
                    onChange={(e) => updateProjectField(project.id, 'link', e.target.value)}
                    placeholder="https://myproject.com"
                  />
                  <Input
                    label="GitHub Repository (Optional)"
                    type="url"
                    value={project.github || ''}
                    onChange={(e) => updateProjectField(project.id, 'github', e.target.value)}
                    placeholder="https://github.com/username/project"
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technologies Used
                  </label>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {tech}
                        <button
                          onClick={() => removeTechnology(project.id, techIndex)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Input
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      placeholder="Add technology (e.g., React, Python, AWS)..."
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addTechnology(project.id);
                        }
                      }}
                    />
                    <Button
                      onClick={() => addTechnology(project.id)}
                      disabled={!newTechnology.trim()}
                      size="sm"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-purple-800 mb-2">🚀 Project Tips</h3>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>• Focus on projects that demonstrate skills relevant to your target role</li>
          <li>• Include both personal and professional projects</li>
          <li>• Highlight your specific contributions and role in team projects</li>
          <li>• Mention the problem solved and impact achieved</li>
          <li>• Include links to live demos or GitHub repositories when possible</li>
          <li>• Use metrics to quantify results (users, performance improvements, etc.)</li>
        </ul>
      </div>
    </div>
  );
}