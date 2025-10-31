import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { ResumeData } from '@/types';

export const generateDOCX = async (resumeData: ResumeData) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, hobbies } = resumeData;

  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header
        new Paragraph({
          children: [
            new TextRun({
              text: personalInfo.fullName || 'Your Name',
              bold: true,
              size: 32,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),

        // Contact Info
        new Paragraph({
          children: [
            new TextRun({
              text: [
                personalInfo.email,
                personalInfo.phone,
                personalInfo.location
              ].filter(Boolean).join(' | '),
              size: 20,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
        }),

        // Summary
        ...(summary ? [
          new Paragraph({
            children: [new TextRun({ text: 'PROFESSIONAL SUMMARY', bold: true, size: 24 })],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            children: [new TextRun({ text: summary, size: 20 })],
            spacing: { after: 300 },
          }),
        ] : []),

        // Experience
        ...(experience.length > 0 ? [
          new Paragraph({
            children: [new TextRun({ text: 'EXPERIENCE', bold: true, size: 24 })],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          ...experience.flatMap(exp => [
            new Paragraph({
              children: [
                new TextRun({ text: exp.position, bold: true, size: 22 }),
                new TextRun({ text: ` | ${exp.company}`, size: 20 }),
              ],
              spacing: { before: 100, after: 50 },
            }),
            new Paragraph({
              children: [
                new TextRun({ 
                  text: `${exp.startDate} – ${exp.current ? 'Present' : exp.endDate}`, 
                  size: 18,
                  italics: true 
                }),
              ],
              spacing: { after: 100 },
            }),
            ...exp.description.map(desc => 
              new Paragraph({
                children: [new TextRun({ text: `• ${desc}`, size: 20 })],
                spacing: { after: 50 },
              })
            ),
          ]),
        ] : []),

        // Education
        ...(education.length > 0 ? [
          new Paragraph({
            children: [new TextRun({ text: 'EDUCATION', bold: true, size: 24 })],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          ...education.map(edu => 
            new Paragraph({
              children: [
                new TextRun({ text: `${edu.degree} in ${edu.field}`, bold: true, size: 20 }),
                new TextRun({ text: ` | ${edu.institution}`, size: 20 }),
                new TextRun({ text: ` | ${edu.startDate} – ${edu.endDate}`, size: 18, italics: true }),
              ],
              spacing: { after: 100 },
            })
          ),
        ] : []),

        // Skills
        ...(skills.length > 0 ? [
          new Paragraph({
            children: [new TextRun({ text: 'SKILLS', bold: true, size: 24 })],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          ...skills.map(skill => 
            new Paragraph({
              children: [
                new TextRun({ text: `${skill.category}: `, bold: true, size: 20 }),
                new TextRun({ text: skill.items.join(', '), size: 20 }),
              ],
              spacing: { after: 50 },
            })
          ),
        ] : []),

        // Projects
        ...(projects.length > 0 ? [
          new Paragraph({
            children: [new TextRun({ text: 'PROJECTS', bold: true, size: 24 })],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          ...projects.flatMap(project => [
            new Paragraph({
              children: [new TextRun({ text: project.name, bold: true, size: 22 })],
              spacing: { before: 100, after: 50 },
            }),
            new Paragraph({
              children: [new TextRun({ text: project.description, size: 20 })],
              spacing: { after: 50 },
            }),
            ...(project.technologies.length > 0 ? [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Technologies: ', bold: true, size: 18 }),
                  new TextRun({ text: project.technologies.join(', '), size: 18 }),
                ],
                spacing: { after: 100 },
              }),
            ] : []),
          ]),
        ] : []),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `${personalInfo.fullName || 'Resume'}_Resume.docx`;
  saveAs(blob, fileName);
};