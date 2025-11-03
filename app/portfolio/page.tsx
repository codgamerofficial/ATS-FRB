'use client';

import { useState } from 'react';
import { Plus, ExternalLink, Github, Eye, Edit } from 'lucide-react';
import { SciFiCard } from '@/components/ui/SciFiCard';
import { Button } from '@/components/ui/Button';

export default function PortfolioPage() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with React and Node.js',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
      tech: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com',
      live: 'https://demo.com',
      featured: true
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
      tech: ['React Native', 'Firebase', 'TypeScript'],
      github: 'https://github.com',
      live: 'https://demo.com',
      featured: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">Portfolio Showcase</h1>
            <p className="text-cyan-300 text-lg">Showcase your projects and work</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </Button>
        </div>

        {/* Featured Projects */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.filter(p => p.featured).map((project) => (
              <SciFiCard key={project.id} variant="glow" className="overflow-hidden">
                <div className="aspect-video bg-slate-800 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button size="sm" className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Live Demo
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      Code
                    </Button>
                  </div>
                </div>
              </SciFiCard>
            ))}
          </div>
        </div>

        {/* All Projects */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">All Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <SciFiCard key={project.id} className="overflow-hidden">
                <div className="aspect-video bg-slate-800 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </SciFiCard>
            ))}
          </div>
        </div>

        {/* Add Project Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <SciFiCard className="w-full max-w-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Add New Project</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Project Title</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-slate-800 border border-cyan-500/20 rounded-lg text-white"
                    placeholder="Enter project title"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Description</label>
                  <textarea
                    className="w-full p-3 bg-slate-800 border border-cyan-500/20 rounded-lg text-white h-24"
                    placeholder="Describe your project"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Technologies</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-slate-800 border border-cyan-500/20 rounded-lg text-white"
                    placeholder="React, Node.js, MongoDB (comma separated)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">GitHub URL</label>
                    <input
                      type="url"
                      className="w-full p-3 bg-slate-800 border border-cyan-500/20 rounded-lg text-white"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Live Demo URL</label>
                    <input
                      type="url"
                      className="w-full p-3 bg-slate-800 border border-cyan-500/20 rounded-lg text-white"
                      placeholder="https://demo.com"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button className="flex-1">Add Project</Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </SciFiCard>
          </div>
        )}
      </div>
    </div>
  );
}