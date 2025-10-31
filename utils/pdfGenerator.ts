import jsPDF from 'jspdf';
import { ResumeData } from '@/types';

export const generatePDF = async (resumeData: ResumeData) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;
  const margin = 20;
  const lineHeight = 6;

  // Helper function to add text with word wrapping
  const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
    
    // Check if we need a new page
    if (yPosition + lines.length * lineHeight > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
    
    pdf.text(lines, margin, yPosition);
    yPosition += lines.length * lineHeight + 2;
  };

  const addSection = (title: string) => {
    yPosition += 5;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title.toUpperCase(), margin, yPosition);
    
    // Add underline
    const textWidth = pdf.getTextWidth(title.toUpperCase());
    pdf.line(margin, yPosition + 1, margin + textWidth, yPosition + 1);
    yPosition += 8;
  };

  // Header
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text(resumeData.personalInfo.fullName || 'Your Name', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;

  // Contact Info
  const contactInfo = [
    resumeData.personalInfo.email,
    resumeData.personalInfo.phone,
    resumeData.personalInfo.location
  ].filter(Boolean).join(' | ');
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(contactInfo, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Professional Summary
  if (resumeData.summary) {
    addSection('Professional Summary');
    addText(resumeData.summary);
  }

  // Experience
  if (resumeData.experience.length > 0) {
    addSection('Experience');
    resumeData.experience.forEach((exp) => {
      addText(`${exp.position}`, 11, true);
      addText(`${exp.company} | ${exp.location} | ${exp.startDate} – ${exp.current ? 'Present' : exp.endDate}`);
      
      exp.description.forEach((desc) => {
        addText(`• ${desc}`);
      });
      yPosition += 3;
    });
  }

  // Education
  if (resumeData.education.length > 0) {
    addSection('Education');
    resumeData.education.forEach((edu) => {
      addText(`${edu.degree} in ${edu.field}`, 11, true);
      addText(`${edu.institution} | ${edu.startDate} – ${edu.endDate}${edu.gpa ? ` | ${edu.gpa}` : ''}`);
      yPosition += 3;
    });
  }

  // Projects
  if (resumeData.projects.length > 0) {
    addSection('Projects');
    resumeData.projects.forEach((project) => {
      addText(project.name, 11, true);
      addText(project.description);
      if (project.technologies.length > 0) {
        addText(`Technologies: ${project.technologies.join(', ')}`);
      }
      yPosition += 3;
    });
  }

  // Skills
  if (resumeData.skills.length > 0) {
    addSection('Skills');
    resumeData.skills.forEach((skillCategory) => {
      addText(`${skillCategory.category}: ${skillCategory.items.join(', ')}`);
    });
  }

  // Certifications
  if (resumeData.certifications.length > 0) {
    addSection('Certifications');
    resumeData.certifications.forEach((cert) => {
      addText(`${cert.name} — ${cert.issuer} (${cert.date})`);
    });
  }

  // Additional Information
  if (resumeData.languages?.length || resumeData.hobbies?.length) {
    addSection('Additional Information');
    if (resumeData.languages?.length) {
      addText(`Languages: ${resumeData.languages.join(', ')}`);
    }
    if (resumeData.hobbies?.length) {
      addText(`Hobbies & Interests: ${resumeData.hobbies.join(', ')}`);
    }
  }

  // Save the PDF
  const fileName = `${resumeData.personalInfo.fullName || 'Resume'}_Resume.pdf`;
  pdf.save(fileName);
};