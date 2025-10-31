'use client';

import { useResumeStore } from '@/store/resumeStore';
import Button from '@/components/ui/Button';
import { Download, Eye, Share2, Save } from 'lucide-react';
import { generatePDF } from '@/utils/pdfGenerator';
import { saveResume, updateResume } from '@/utils/resumeService';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ResumePreview() {
  const { resumeData } = useResumeStore();
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, hobbies } = resumeData;

  const handleDownloadPDF = async () => {
    try {
      await generatePDF(resumeData);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleSaveResume = async () => {
    if (!user) {
      toast.error('Please sign in to save your resume');
      return;
    }

    if (!personalInfo.fullName) {
      toast.error('Please add your name before saving');
      return;
    }

    setIsSaving(true);
    try {
      const title = `${personalInfo.fullName} - Resume`;
      await saveResume(title, resumeData);
      toast.success('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.error('Failed to save resume');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Preview</h2>
        <div className="flex space-x-2">
          {user && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleSaveResume}
              isLoading={isSaving}
              className="flex items-center"
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
          )}
          <Button size="sm" variant="outline" className="flex items-center">
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
          <Button size="sm" onClick={handleDownloadPDF} className="flex items-center">
            <Download className="w-4 h-4 mr-1" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm max-h-[800px] overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {personalInfo.email && (
                <span>{personalInfo.email}</span>
              )}
              {personalInfo.phone && (
                <span>{personalInfo.phone}</span>
              )}
              {personalInfo.location && (
                <span>{personalInfo.location}</span>
              )}
            </div>
            {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
              <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-600 mt-2">
                {personalInfo.website && (
                  <a href={personalInfo.website} className="hover:underline">Website</a>
                )}
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin} className="hover:underline">LinkedIn</a>
                )}
                {personalInfo.github && (
                  <a href={personalInfo.github} className="hover:underline">GitHub</a>
                )}
              </div>
            )}
          </div>

          {/* Professional Summary */}
          {summary && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                EXPERIENCE
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-gray-700">{exp.company} | {exp.location}</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </p>
                    </div>
                    {exp.description.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        {exp.description.map((desc, index) => (
                          <li key={index}>{desc}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                EDUCATION
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {edu.degree} in {edu.field}
                        </h3>
                        <p className="text-gray-700">{edu.institution}</p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {edu.startDate} – {edu.endDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                PROJECTS
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-gray-700 mb-2">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                SKILLS
              </h2>
              <div className="space-y-2">
                {skills.map((skillCategory, index) => (
                  <div key={index}>
                    <span className="font-medium text-gray-900">{skillCategory.category}:</span>{' '}
                    <span className="text-gray-700">{skillCategory.items.join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                CERTIFICATIONS
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <span className="font-medium text-gray-900">{cert.name}</span> — {cert.issuer} ({cert.date})
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Information */}
          {(languages?.length || hobbies?.length) && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                ADDITIONAL INFORMATION
              </h2>
              <div className="space-y-2">
                {languages && languages.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-900">Languages:</span>{' '}
                    <span className="text-gray-700">{languages.join(', ')}</span>
                  </div>
                )}
                {hobbies && hobbies.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-900">Hobbies & Interests:</span>{' '}
                    <span className="text-gray-700">{hobbies.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}