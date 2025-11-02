import { ResumeData } from '@/types';

export const testResumeData: ResumeData = {
  personalInfo: {
    fullName: 'John Doe',
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
      id: '1',
      position: 'Senior Full Stack Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: 'Present',
      current: true,
      description: ['Led development of microservices architecture serving 1M+ users', 'Implemented CI/CD pipelines reducing deployment time by 60%', 'Mentored 3 junior developers and conducted code reviews']
    },
    {
      id: '2',
      position: 'Frontend Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      startDate: '2020-03',
      endDate: '2021-12',
      current: false,
      description: ['Built responsive React applications with 99.9% uptime', 'Optimized bundle size by 40% using code splitting', 'Collaborated with design team to implement pixel-perfect UI components']
    }
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California, Berkeley',
      field: 'Computer Science',
      startDate: '2015-09',
      endDate: '2019-05',
      gpa: '3.8'
    }
  ],
  skills: [
    { category: 'Programming Languages', items: ['JavaScript', 'TypeScript', 'Python'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL'] },
    { category: 'Cloud', items: ['AWS', 'Vercel', 'Supabase'] },
    { category: 'DevOps', items: ['Docker', 'Git', 'CI/CD'] }
  ],
  projects: [
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Built full-stack e-commerce platform with React, Node.js, and PostgreSQL. Implemented payment processing, inventory management, and admin dashboard.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      link: 'https://github.com/johndoe/ecommerce',
      github: 'https://github.com/johndoe/ecommerce'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2023-03'
    }
  ],
  languages: ['English (Native)', 'Spanish (Conversational)'],
  hobbies: ['Photography', 'Rock Climbing', 'Open Source Contributing']
};