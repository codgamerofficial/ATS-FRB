import { ResumeData } from '@/types';

export interface ATSScore {
  overall: number;
  breakdown: {
    format: number;
    keywords: number;
    structure: number;
    readability: number;
  };
  suggestions: ATSSuggestion[];
  passedChecks: string[];
  failedChecks: string[];
}

export interface ATSSuggestion {
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  fix?: string;
}

const ATS_KEYWORDS = {
  technical: ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'SQL', 'Git'],
  soft: ['leadership', 'communication', 'teamwork', 'problem-solving', 'analytical', 'creative'],
  action: ['developed', 'implemented', 'managed', 'led', 'created', 'optimized', 'designed', 'built']
};

export function analyzeATSCompatibility(resume: ResumeData): ATSScore {
  const suggestions: ATSSuggestion[] = [];
  const passedChecks: string[] = [];
  const failedChecks: string[] = [];

  // Format Analysis
  const formatScore = analyzeFormat(resume, suggestions, passedChecks, failedChecks);
  
  // Keywords Analysis
  const keywordScore = analyzeKeywords(resume, suggestions, passedChecks, failedChecks);
  
  // Structure Analysis
  const structureScore = analyzeStructure(resume, suggestions, passedChecks, failedChecks);
  
  // Readability Analysis
  const readabilityScore = analyzeReadability(resume, suggestions, passedChecks, failedChecks);

  const overall = Math.round((formatScore + keywordScore + structureScore + readabilityScore) / 4);

  return {
    overall,
    breakdown: {
      format: formatScore,
      keywords: keywordScore,
      structure: structureScore,
      readability: readabilityScore
    },
    suggestions,
    passedChecks,
    failedChecks
  };
}

function analyzeFormat(resume: ResumeData, suggestions: ATSSuggestion[], passed: string[], failed: string[]): number {
  let score = 100;

  // Check for contact information
  if (!resume.personalInfo.email || !resume.personalInfo.phone) {
    score -= 20;
    suggestions.push({
      type: 'critical',
      title: 'Missing Contact Information',
      description: 'Include both email and phone number',
      fix: 'Add your email and phone number in the personal information section'
    });
    failed.push('Contact information complete');
  } else {
    passed.push('Contact information complete');
  }

  // Check for professional summary
  if (!resume.summary || resume.summary.length < 50) {
    score -= 15;
    suggestions.push({
      type: 'warning',
      title: 'Professional Summary Too Short',
      description: 'Add a compelling professional summary (50+ characters)',
      fix: 'Write a 2-3 sentence summary highlighting your key qualifications'
    });
    failed.push('Professional summary present');
  } else {
    passed.push('Professional summary present');
  }

  return Math.max(0, score);
}

function analyzeKeywords(resume: ResumeData, suggestions: ATSSuggestion[], passed: string[], failed: string[]): number {
  let score = 100;
  const resumeText = JSON.stringify(resume).toLowerCase();

  // Check for technical keywords
  const techKeywords = ATS_KEYWORDS.technical.filter(keyword => 
    resumeText.includes(keyword.toLowerCase())
  );
  
  if (techKeywords.length < 3) {
    score -= 25;
    suggestions.push({
      type: 'warning',
      title: 'Few Technical Keywords',
      description: 'Include more relevant technical skills and tools',
      fix: 'Add specific technologies, programming languages, and tools you\'ve used'
    });
    failed.push('Sufficient technical keywords');
  } else {
    passed.push('Sufficient technical keywords');
  }

  // Check for action verbs
  const actionVerbs = ATS_KEYWORDS.action.filter(verb => 
    resumeText.includes(verb.toLowerCase())
  );
  
  if (actionVerbs.length < 5) {
    score -= 20;
    suggestions.push({
      type: 'info',
      title: 'Use More Action Verbs',
      description: 'Start bullet points with strong action verbs',
      fix: 'Begin experience descriptions with words like "developed", "implemented", "managed"'
    });
    failed.push('Strong action verbs used');
  } else {
    passed.push('Strong action verbs used');
  }

  return Math.max(0, score);
}

function analyzeStructure(resume: ResumeData, suggestions: ATSSuggestion[], passed: string[], failed: string[]): number {
  let score = 100;

  // Check for work experience
  if (!resume.experience || resume.experience.length === 0) {
    score -= 30;
    suggestions.push({
      type: 'critical',
      title: 'No Work Experience',
      description: 'Add your work experience section',
      fix: 'Include your relevant work history with job titles, companies, and dates'
    });
    failed.push('Work experience included');
  } else {
    passed.push('Work experience included');
  }

  // Check for education
  if (!resume.education || resume.education.length === 0) {
    score -= 20;
    suggestions.push({
      type: 'warning',
      title: 'No Education Information',
      description: 'Add your educational background',
      fix: 'Include your degree, institution, and graduation year'
    });
    failed.push('Education information included');
  } else {
    passed.push('Education information included');
  }

  // Check for skills
  if (!resume.skills || resume.skills.length === 0) {
    score -= 25;
    suggestions.push({
      type: 'warning',
      title: 'No Skills Listed',
      description: 'Add a skills section with relevant abilities',
      fix: 'List your technical skills, programming languages, and tools'
    });
    failed.push('Skills section included');
  } else {
    passed.push('Skills section included');
  }

  return Math.max(0, score);
}

function analyzeReadability(resume: ResumeData, suggestions: ATSSuggestion[], passed: string[], failed: string[]): number {
  let score = 100;

  // Check experience descriptions
  if (resume.experience) {
    const hasQuantifiableResults = resume.experience.some(exp => 
      exp.description && Array.isArray(exp.description) 
        ? exp.description.some(desc => /\d+/.test(desc))
        : typeof exp.description === 'string' && /\d+/.test(exp.description)
    );
    
    if (!hasQuantifiableResults) {
      score -= 20;
      suggestions.push({
        type: 'info',
        title: 'Add Quantifiable Results',
        description: 'Include numbers and metrics in your achievements',
        fix: 'Add percentages, dollar amounts, or other measurable outcomes'
      });
      failed.push('Quantifiable results included');
    } else {
      passed.push('Quantifiable results included');
    }
  }

  // Check for consistent formatting
  if (resume.experience && resume.experience.length > 1) {
    const hasConsistentDates = resume.experience.every(exp => exp.startDate && exp.endDate);
    
    if (!hasConsistentDates) {
      score -= 15;
      suggestions.push({
        type: 'warning',
        title: 'Inconsistent Date Formatting',
        description: 'Ensure all positions have start and end dates',
        fix: 'Add dates for all work experience entries'
      });
      failed.push('Consistent date formatting');
    } else {
      passed.push('Consistent date formatting');
    }
  }

  return Math.max(0, score);
}

export function getATSScoreColor(score: number): string {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
}

export function getATSScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Needs Improvement';
}