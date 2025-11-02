import { ResumeData } from '@/types';

export const testResumeData: ResumeData = {
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    website: 'https://johndoe.dev'
  },
  summary: 'Experienced Full Stack Developer with 5+ years of expertise in React, Node.js, and cloud technologies. Proven track record of delivering scalable web applications and leading development teams. Passionate about clean code, performance optimization, and user experience.',
  experience: [
    {
      position: 'Senior Full Stack Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: 'Present',
      description: 'Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 60%. Mentored 3 junior developers and conducted code reviews.'
    },
    {
      position: 'Frontend Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      startDate: '2020-03',
      endDate: '2021-12',
      description: 'Built responsive React applications with 99.9% uptime. Optimized bundle size by 40% using code splitting. Collaborated with design team to implement pixel-perfect UI components.'
    }
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      graduationDate: '2019-05',
      gpa: '3.8'
    }
  ],
  skills: [
    { name: 'JavaScript', category: 'Programming Languages', level: 'Expert' },
    { name: 'TypeScript', category: 'Programming Languages', level: 'Advanced' },
    { name: 'React', category: 'Frontend', level: 'Expert' },
    { name: 'Node.js', category: 'Backend', level: 'Advanced' },
    { name: 'AWS', category: 'Cloud', level: 'Intermediate' },
    { name: 'Docker', category: 'DevOps', level: 'Intermediate' }
  ],
  projects: [
    {
      name: 'E-commerce Platform',
      description: 'Built full-stack e-commerce platform with React, Node.js, and PostgreSQL. Implemented payment processing, inventory management, and admin dashboard.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      url: 'https://github.com/johndoe/ecommerce',
      startDate: '2023-01',
      endDate: '2023-06'
    }
  ],
  certifications: [
    {
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2023-03'
    }
  ],
  languages: [
    { name: 'English', proficiency: 'Native' },
    { name: 'Spanish', proficiency: 'Conversational' }
  ],
  hobbies: ['Photography', 'Rock Climbing', 'Open Source Contributing']
};