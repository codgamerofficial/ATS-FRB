import { TemplateStyle } from '@/types/templates';

export const resumeTemplates: TemplateStyle[] = [
  // MODERN TEMPLATES (20)
  {
    id: 'modern-1',
    name: 'Silicon Valley',
    description: 'Clean tech-focused design with blue accents',
    category: 'modern',
    isPremium: false,
    colors: { primary: '#2563eb', secondary: '#64748b', accent: '#06b6d4', text: '#1e293b', background: '#ffffff' },
    fonts: { heading: 'Inter', body: 'Inter' },
    layout: { type: 'two-column', headerStyle: 'centered', sectionStyle: 'clean', spacing: 'normal' },
    features: ['ATS-friendly', 'Tech-optimized', 'Clean layout']
  },
  {
    id: 'modern-2',
    name: 'Minimalist Pro',
    description: 'Ultra-clean design with subtle typography',
    category: 'modern',
    isPremium: false,
    colors: { primary: '#000000', secondary: '#6b7280', accent: '#f59e0b', text: '#111827', background: '#ffffff' },
    fonts: { heading: 'Helvetica', body: 'Helvetica' },
    layout: { type: 'single-column', headerStyle: 'left-aligned', sectionStyle: 'clean', spacing: 'spacious' },
    features: ['Minimalist', 'Professional', 'Easy to read']
  },
  {
    id: 'modern-3',
    name: 'Corporate Edge',
    description: 'Modern corporate design with geometric elements',
    category: 'modern',
    isPremium: true,
    colors: { primary: '#1f2937', secondary: '#9ca3af', accent: '#10b981', text: '#374151', background: '#f9fafb' },
    fonts: { heading: 'Roboto', body: 'Roboto' },
    layout: { type: 'two-column', headerStyle: 'split', sectionStyle: 'boxed', spacing: 'normal' },
    features: ['Corporate-ready', 'Modern design', 'Professional']
  },
  {
    id: 'modern-4',
    name: 'Digital Native',
    description: 'Tech-savvy design with digital-first approach',
    category: 'modern',
    isPremium: false,
    colors: { primary: '#7c3aed', secondary: '#a78bfa', accent: '#06b6d4', text: '#1e1b4b', background: '#ffffff' },
    fonts: { heading: 'Poppins', body: 'Open Sans' },
    layout: { type: 'modern-grid', headerStyle: 'banner', sectionStyle: 'cards', spacing: 'normal' },
    features: ['Digital-first', 'Modern grid', 'Tech-friendly']
  },
  {
    id: 'modern-5',
    name: 'Startup Founder',
    description: 'Dynamic design for entrepreneurs and innovators',
    category: 'modern',
    isPremium: true,
    colors: { primary: '#dc2626', secondary: '#ef4444', accent: '#f97316', text: '#7f1d1d', background: '#fef2f2' },
    fonts: { heading: 'Montserrat', body: 'Source Sans Pro' },
    layout: { type: 'two-column', headerStyle: 'centered', sectionStyle: 'timeline', spacing: 'compact' },
    features: ['Entrepreneurial', 'Dynamic', 'Innovation-focused']
  }
];