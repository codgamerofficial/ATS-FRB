import { ResumeData } from '@/types';
import { TemplateStyle } from '@/types/templates';

export function generateHTML(resume: ResumeData, template?: TemplateStyle): string {
  const colors = template?.colors || {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#0ea5e9',
    text: '#1e293b',
    background: '#ffffff'
  };

  const fonts = template?.fonts || {
    heading: 'Inter',
    body: 'Inter'
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resume.personalInfo.fullName} - Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: '${fonts.body}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: ${colors.text};
            background-color: ${colors.background};
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
        }
        
        .header {
            text-align: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid ${colors.primary};
        }
        
        .name {
            font-family: '${fonts.heading}', sans-serif;
            font-size: 2.5rem;
            font-weight: 700;
            color: ${colors.primary};
            margin-bottom: 0.5rem;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
            font-size: 0.9rem;
            color: ${colors.secondary};
        }
        
        .contact-info span {
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }
        
        .section {
            margin-bottom: 2rem;
        }
        
        .section-title {
            font-family: '${fonts.heading}', sans-serif;
            font-size: 1.25rem;
            font-weight: 600;
            color: ${colors.primary};
            margin-bottom: 1rem;
            padding-bottom: 0.25rem;
            border-bottom: 1px solid ${colors.accent};
        }
        
        .summary {
            font-size: 1rem;
            line-height: 1.7;
            text-align: justify;
        }
        
        .experience-item, .education-item, .project-item {
            margin-bottom: 1.5rem;
            padding-left: 1rem;
            border-left: 3px solid ${colors.accent};
        }
        
        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 0.5rem;
        }
        
        .item-title {
            font-weight: 600;
            color: ${colors.primary};
            font-size: 1.1rem;
        }
        
        .item-company {
            font-weight: 500;
            color: ${colors.secondary};
            margin-bottom: 0.25rem;
        }
        
        .item-date {
            font-size: 0.9rem;
            color: ${colors.secondary};
            font-style: italic;
        }
        
        .item-description {
            margin-top: 0.5rem;
            line-height: 1.6;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        
        .skill-category {
            background-color: ${colors.background};
            border: 1px solid ${colors.accent};
            border-radius: 0.5rem;
            padding: 1rem;
        }
        
        .skill-category-title {
            font-weight: 600;
            color: ${colors.primary};
            margin-bottom: 0.5rem;
        }
        
        .skill-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .skill-tag {
            background-color: ${colors.accent};
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.8rem;
        }
        
        .additional-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
        }
        
        .additional-section {
            background-color: ${colors.background};
            border: 1px solid ${colors.accent};
            border-radius: 0.5rem;
            padding: 1rem;
        }
        
        .additional-title {
            font-weight: 600;
            color: ${colors.primary};
            margin-bottom: 0.75rem;
        }
        
        .additional-list {
            list-style: none;
        }
        
        .additional-list li {
            margin-bottom: 0.5rem;
            padding-left: 1rem;
            position: relative;
        }
        
        .additional-list li::before {
            content: "•";
            color: ${colors.accent};
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        
        @media print {
            body {
                padding: 0;
                max-width: none;
            }
            
            .section {
                break-inside: avoid;
            }
        }
        
        @media (max-width: 768px) {
            .contact-info {
                flex-direction: column;
                align-items: center;
            }
            
            .item-header {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .skills-grid,
            .additional-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <h1 class="name">${resume.personalInfo.fullName}</h1>
        <div class="contact-info">
            ${resume.personalInfo.email ? `<span>📧 ${resume.personalInfo.email}</span>` : ''}
            ${resume.personalInfo.phone ? `<span>📞 ${resume.personalInfo.phone}</span>` : ''}
            ${resume.personalInfo.location ? `<span>📍 ${resume.personalInfo.location}</span>` : ''}
            ${resume.personalInfo.linkedin ? `<span>💼 ${resume.personalInfo.linkedin}</span>` : ''}
            ${resume.personalInfo.github ? `<span>🔗 ${resume.personalInfo.github}</span>` : ''}
            ${resume.personalInfo.website ? `<span>🌐 ${resume.personalInfo.website}</span>` : ''}
        </div>
    </header>

    ${resume.summary ? `
    <section class="section">
        <h2 class="section-title">Professional Summary</h2>
        <p class="summary">${resume.summary}</p>
    </section>
    ` : ''}

    ${resume.experience && resume.experience.length > 0 ? `
    <section class="section">
        <h2 class="section-title">Work Experience</h2>
        ${resume.experience.map(exp => `
        <div class="experience-item">
            <div class="item-header">
                <div>
                    <div class="item-title">${exp.position}</div>
                    <div class="item-company">${exp.company}</div>
                </div>
                <div class="item-date">${exp.startDate} - ${exp.endDate || 'Present'}</div>
            </div>
            ${exp.description ? `<div class="item-description">${exp.description}</div>` : ''}
        </div>
        `).join('')}
    </section>
    ` : ''}

    ${resume.education && resume.education.length > 0 ? `
    <section class="section">
        <h2 class="section-title">Education</h2>
        ${resume.education.map(edu => `
        <div class="education-item">
            <div class="item-header">
                <div>
                    <div class="item-title">${edu.degree}</div>
                    <div class="item-company">${edu.institution}</div>
                </div>
                <div class="item-date">${edu.endDate}</div>
            </div>
            ${edu.gpa ? `<div class="item-description">GPA: ${edu.gpa}</div>` : ''}
        </div>
        `).join('')}
    </section>
    ` : ''}

    ${resume.skills && resume.skills.length > 0 ? `
    <section class="section">
        <h2 class="section-title">Skills</h2>
        <div class="skills-grid">
            ${resume.skills.map(skillGroup => `
            <div class="skill-category">
                <div class="skill-category-title">${skillGroup.category}</div>
                <div class="skill-list">
                    ${skillGroup.items.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            `).join('')}
        </div>
    </section>
    ` : ''}

    ${resume.projects && resume.projects.length > 0 ? `
    <section class="section">
        <h2 class="section-title">Projects</h2>
        ${resume.projects.map(project => `
        <div class="project-item">
            <div class="item-header">
                <div>
                    <div class="item-title">${project.name}</div>
                    ${project.link ? `<div class="item-company"><a href="${project.link}" target="_blank">${project.link}</a></div>` : ''}
                </div>
                <div class="item-date">Project</div>
            </div>
            ${project.description ? `<div class="item-description">${project.description}</div>` : ''}
            ${project.technologies && project.technologies.length > 0 ? `
            <div class="skill-list" style="margin-top: 0.5rem;">
                ${project.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
            </div>
            ` : ''}
        </div>
        `).join('')}
    </section>
    ` : ''}

    ${(resume.certifications && resume.certifications.length > 0) || 
      (resume.languages && resume.languages.length > 0) || 
      (resume.hobbies && resume.hobbies.length > 0) ? `
    <section class="section">
        <h2 class="section-title">Additional Information</h2>
        <div class="additional-grid">
            ${resume.certifications && resume.certifications.length > 0 ? `
            <div class="additional-section">
                <div class="additional-title">Certifications</div>
                <ul class="additional-list">
                    ${resume.certifications.map(cert => `<li>${cert.name} - ${cert.issuer} (${cert.date})</li>`).join('')}
                </ul>
            </div>
            ` : ''}
            
            ${resume.languages && resume.languages.length > 0 ? `
            <div class="additional-section">
                <div class="additional-title">Languages</div>
                <ul class="additional-list">
                    ${resume.languages.map(lang => `<li>${lang}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
            
            ${resume.hobbies && resume.hobbies.length > 0 ? `
            <div class="additional-section">
                <div class="additional-title">Interests & Hobbies</div>
                <ul class="additional-list">
                    ${resume.hobbies.map(hobby => `<li>${hobby}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
        </div>
    </section>
    ` : ''}
</body>
</html>`;
}

export function downloadHTML(resume: ResumeData, template?: TemplateStyle, filename?: string) {
  const html = generateHTML(resume, template);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `${resume.personalInfo.fullName.replace(' ', '_')}_Resume.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}