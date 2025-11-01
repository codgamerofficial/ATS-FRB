'use client';

import { ResumeData } from '@/types';
import { TemplateStyle } from '@/types/templates';

interface TemplateRendererProps {
  template: TemplateStyle;
  resumeData: ResumeData;
  className?: string;
}

export default function TemplateRenderer({ template, resumeData, className = '' }: TemplateRendererProps) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, hobbies } = resumeData;

  const getLayoutClasses = () => {
    switch (template.layout.type) {
      case 'two-column':
        return 'grid grid-cols-1 md:grid-cols-3 gap-6';
      case 'three-column':
        return 'grid grid-cols-1 lg:grid-cols-4 gap-4';
      case 'sidebar':
        return 'grid grid-cols-1 md:grid-cols-4 gap-6';
      case 'modern-grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
      default:
        return 'space-y-6';
    }
  };

  const getHeaderClasses = () => {
    switch (template.layout.headerStyle) {
      case 'centered':
        return 'text-center';
      case 'split':
        return 'flex justify-between items-start';
      case 'banner':
        return 'bg-gradient-to-r p-6 rounded-lg text-white';
      case 'minimal':
        return 'border-b pb-4';
      default:
        return 'text-left';
    }
  };

  const getSectionClasses = () => {
    const base = 'mb-6';
    switch (template.layout.sectionStyle) {
      case 'bordered':
        return `${base} border-l-4 pl-4`;
      case 'boxed':
        return `${base} bg-gray-50 p-4 rounded-lg`;
      case 'timeline':
        return `${base} relative pl-8`;
      case 'cards':
        return `${base} bg-white shadow-sm border rounded-lg p-4`;
      default:
        return base;
    }
  };

  const getSpacingClasses = () => {
    switch (template.layout.spacing) {
      case 'compact':
        return 'space-y-2';
      case 'spacious':
        return 'space-y-8';
      default:
        return 'space-y-4';
    }
  };

  return (
    <div 
      className={`resume-template ${className} ${getSpacingClasses()}`}
      style={{ 
        backgroundColor: template.colors.background,
        color: template.colors.text,
        fontFamily: template.fonts.body
      }}
    >
      {/* Header */}
      <div 
        className={getHeaderClasses()}
        style={{ 
          borderColor: template.colors.primary,
          backgroundColor: template.layout.headerStyle === 'banner' ? template.colors.primary : 'transparent'
        }}
      >
        <div>
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ 
              fontFamily: template.fonts.heading,
              color: template.layout.headerStyle === 'banner' ? '#ffffff' : template.colors.primary
            }}
          >
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
          {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
            <div className="flex flex-wrap gap-4 text-sm mt-2" style={{ color: template.colors.accent }}>
              {personalInfo.website && <a href={personalInfo.website}>Website</a>}
              {personalInfo.linkedin && <a href={personalInfo.linkedin}>LinkedIn</a>}
              {personalInfo.github && <a href={personalInfo.github}>GitHub</a>}
            </div>
          )}
        </div>
      </div>

      <div className={getLayoutClasses()}>
        {/* Main Content */}
        <div className={template.layout.type === 'sidebar' ? 'md:col-span-3' : template.layout.type === 'two-column' ? 'md:col-span-2' : ''}>
          {/* Summary */}
          {summary && (
            <div className={getSectionClasses()}>
              <h2 
                className="text-lg font-semibold mb-3"
                style={{ 
                  fontFamily: template.fonts.heading,
                  color: template.colors.primary,
                  borderColor: template.colors.primary
                }}
              >
                PROFESSIONAL SUMMARY
              </h2>
              <p className="leading-relaxed">{summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className={getSectionClasses()}>
              <h2 
                className="text-lg font-semibold mb-3"
                style={{ 
                  fontFamily: template.fonts.heading,
                  color: template.colors.primary
                }}
              >
                EXPERIENCE
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold" style={{ color: template.colors.secondary }}>
                          {exp.position}
                        </h3>
                        <p>{exp.company} | {exp.location}</p>
                      </div>
                      <p className="text-sm" style={{ color: template.colors.accent }}>
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </p>
                    </div>
                    {exp.description.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 ml-4">
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

          {/* Projects */}
          {projects.length > 0 && (
            <div className={getSectionClasses()}>
              <h2 
                className="text-lg font-semibold mb-3"
                style={{ 
                  fontFamily: template.fonts.heading,
                  color: template.colors.primary
                }}
              >
                PROJECTS
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-semibold" style={{ color: template.colors.secondary }}>
                      {project.name}
                    </h3>
                    <p className="mb-2">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <p className="text-sm" style={{ color: template.colors.accent }}>
                        <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Content */}
        {(template.layout.type === 'sidebar' || template.layout.type === 'two-column') && (
          <div className="space-y-6">
            {/* Education */}
            {education.length > 0 && (
              <div className={getSectionClasses()}>
                <h2 
                  className="text-lg font-semibold mb-3"
                  style={{ 
                    fontFamily: template.fonts.heading,
                    color: template.colors.primary
                  }}
                >
                  EDUCATION
                </h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-semibold" style={{ color: template.colors.secondary }}>
                        {edu.degree}
                      </h3>
                      <p>{edu.institution}</p>
                      <p className="text-sm" style={{ color: template.colors.accent }}>
                        {edu.startDate} – {edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className={getSectionClasses()}>
                <h2 
                  className="text-lg font-semibold mb-3"
                  style={{ 
                    fontFamily: template.fonts.heading,
                    color: template.colors.primary
                  }}
                >
                  SKILLS
                </h2>
                <div className="space-y-2">
                  {skills.map((skillCategory, index) => (
                    <div key={index}>
                      <span className="font-medium" style={{ color: template.colors.secondary }}>
                        {skillCategory.category}:
                      </span>{' '}
                      <span>{skillCategory.items.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div className={getSectionClasses()}>
                <h2 
                  className="text-lg font-semibold mb-3"
                  style={{ 
                    fontFamily: template.fonts.heading,
                    color: template.colors.primary
                  }}
                >
                  CERTIFICATIONS
                </h2>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <span className="font-medium" style={{ color: template.colors.secondary }}>
                        {cert.name}
                      </span> — {cert.issuer} ({cert.date})
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}