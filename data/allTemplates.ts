import { TemplateStyle } from '@/types/templates';

export const allResumeTemplates: TemplateStyle[] = [
  // MODERN TEMPLATES (20)
  {
    id: 'modern-1', name: 'Silicon Valley', description: 'Clean tech-focused design with blue accents', category: 'modern', isPremium: false,
    colors: { primary: '#2563eb', secondary: '#64748b', accent: '#06b6d4', text: '#1e293b', background: '#ffffff' },
    fonts: { heading: 'Inter', body: 'Inter' }, layout: { type: 'two-column', headerStyle: 'centered', sectionStyle: 'clean', spacing: 'normal' },
    features: ['ATS-friendly', 'Tech-optimized', 'Clean layout']
  },
  {
    id: 'modern-2', name: 'Minimalist Pro', description: 'Ultra-clean design with subtle typography', category: 'modern', isPremium: false,
    colors: { primary: '#000000', secondary: '#6b7280', accent: '#f59e0b', text: '#111827', background: '#ffffff' },
    fonts: { heading: 'Helvetica', body: 'Helvetica' }, layout: { type: 'single-column', headerStyle: 'left-aligned', sectionStyle: 'clean', spacing: 'spacious' },
    features: ['Minimalist', 'Professional', 'Easy to read']
  },
  {
    id: 'modern-3', name: 'Corporate Edge', description: 'Modern corporate design with geometric elements', category: 'modern', isPremium: true,
    colors: { primary: '#1f2937', secondary: '#9ca3af', accent: '#10b981', text: '#374151', background: '#f9fafb' },
    fonts: { heading: 'Roboto', body: 'Roboto' }, layout: { type: 'two-column', headerStyle: 'split', sectionStyle: 'boxed', spacing: 'normal' },
    features: ['Corporate-ready', 'Modern design', 'Professional']
  },
  {
    id: 'modern-4', name: 'Digital Native', description: 'Tech-savvy design with digital-first approach', category: 'modern', isPremium: false,
    colors: { primary: '#7c3aed', secondary: '#a78bfa', accent: '#06b6d4', text: '#1e1b4b', background: '#ffffff' },
    fonts: { heading: 'Poppins', body: 'Open Sans' }, layout: { type: 'modern-grid', headerStyle: 'banner', sectionStyle: 'cards', spacing: 'normal' },
    features: ['Digital-first', 'Modern grid', 'Tech-friendly']
  },
  {
    id: 'modern-5', name: 'Startup Founder', description: 'Dynamic design for entrepreneurs and innovators', category: 'modern', isPremium: true,
    colors: { primary: '#dc2626', secondary: '#ef4444', accent: '#f97316', text: '#7f1d1d', background: '#fef2f2' },
    fonts: { heading: 'Montserrat', body: 'Source Sans Pro' }, layout: { type: 'two-column', headerStyle: 'centered', sectionStyle: 'timeline', spacing: 'compact' },
    features: ['Entrepreneurial', 'Dynamic', 'Innovation-focused']
  },
  {
    id: 'modern-6', name: 'Cloud Engineer', description: 'Perfect for DevOps and cloud professionals', category: 'modern', isPremium: false,
    colors: { primary: '#0ea5e9', secondary: '#38bdf8', accent: '#22d3ee', text: '#0c4a6e', background: '#f0f9ff' },
    fonts: { heading: 'JetBrains Mono', body: 'Inter' }, layout: { type: 'two-column', headerStyle: 'minimal', sectionStyle: 'bordered', spacing: 'normal' },
    features: ['Tech-focused', 'Cloud-ready', 'Developer-friendly']
  },
  {
    id: 'modern-7', name: 'Product Manager', description: 'Strategic design for product leaders', category: 'modern', isPremium: true,
    colors: { primary: '#8b5cf6', secondary: '#a78bfa', accent: '#c084fc', text: '#581c87', background: '#faf5ff' },
    fonts: { heading: 'Nunito', body: 'Lato' }, layout: { type: 'sidebar', headerStyle: 'split', sectionStyle: 'cards', spacing: 'normal' },
    features: ['Strategic focus', 'Leadership-oriented', 'Results-driven']
  },
  {
    id: 'modern-8', name: 'Data Scientist', description: 'Analytics-focused with clean data presentation', category: 'modern', isPremium: false,
    colors: { primary: '#059669', secondary: '#10b981', accent: '#34d399', text: '#064e3b', background: '#ecfdf5' },
    fonts: { heading: 'Source Code Pro', body: 'Roboto' }, layout: { type: 'three-column', headerStyle: 'centered', sectionStyle: 'timeline', spacing: 'compact' },
    features: ['Data-focused', 'Analytics-ready', 'Research-oriented']
  },
  {
    id: 'modern-9', name: 'UX Designer', description: 'Creative yet professional for design roles', category: 'modern', isPremium: true,
    colors: { primary: '#f59e0b', secondary: '#fbbf24', accent: '#fcd34d', text: '#92400e', background: '#fffbeb' },
    fonts: { heading: 'Playfair Display', body: 'Source Sans Pro' }, layout: { type: 'modern-grid', headerStyle: 'banner', sectionStyle: 'cards', spacing: 'spacious' },
    features: ['Design-focused', 'Creative layout', 'Portfolio-ready']
  },
  {
    id: 'modern-10', name: 'Marketing Pro', description: 'Bold design for marketing professionals', category: 'modern', isPremium: false,
    colors: { primary: '#ec4899', secondary: '#f472b6', accent: '#f9a8d4', text: '#831843', background: '#fdf2f8' },
    fonts: { heading: 'Oswald', body: 'Open Sans' }, layout: { type: 'two-column', headerStyle: 'centered', sectionStyle: 'boxed', spacing: 'normal' },
    features: ['Marketing-focused', 'Brand-oriented', 'Creative edge']
  },

  // CLASSIC TEMPLATES (15)
  {
    id: 'classic-1', name: 'Executive Traditional', description: 'Timeless design for senior executives', category: 'classic', isPremium: false,
    colors: { primary: '#1f2937', secondary: '#4b5563', accent: '#6b7280', text: '#111827', background: '#ffffff' },
    fonts: { heading: 'Times New Roman', body: 'Times New Roman' }, layout: { type: 'single-column', headerStyle: 'centered', sectionStyle: 'clean', spacing: 'spacious' },
    features: ['Executive-level', 'Traditional', 'Conservative']
  },
  {
    id: 'classic-2', name: 'Corporate Standard', description: 'Standard corporate format', category: 'classic', isPremium: false,
    colors: { primary: '#374151', secondary: '#6b7280', accent: '#9ca3af', text: '#1f2937', background: '#ffffff' },
    fonts: { heading: 'Arial', body: 'Arial' }, layout: { type: 'single-column', headerStyle: 'left-aligned', sectionStyle: 'bordered', spacing: 'normal' },
    features: ['Corporate-standard', 'Professional', 'Widely-accepted']
  },
  {
    id: 'classic-3', name: 'Banking Professional', description: 'Conservative design for financial sector', category: 'classic', isPremium: true,
    colors: { primary: '#1e40af', secondary: '#3b82f6', accent: '#60a5fa', text: '#1e3a8a', background: '#f8fafc' },
    fonts: { heading: 'Georgia', body: 'Georgia' }, layout: { type: 'two-column', headerStyle: 'centered', sectionStyle: 'clean', spacing: 'normal' },
    features: ['Finance-focused', 'Conservative', 'Trust-building']
  },
  {
    id: 'classic-4', name: 'Legal Counsel', description: 'Professional design for legal professionals', category: 'classic', isPremium: false,
    colors: { primary: '#7c2d12', secondary: '#dc2626', accent: '#ef4444', text: '#7f1d1d', background: '#ffffff' },
    fonts: { heading: 'Times New Roman', body: 'Times New Roman' }, layout: { type: 'single-column', headerStyle: 'left-aligned', sectionStyle: 'bordered', spacing: 'spacious' },
    features: ['Legal-focused', 'Professional', 'Authoritative']
  },
  {
    id: 'classic-5', name: 'Government Official', description: 'Formal design for public sector roles', category: 'classic', isPremium: false,
    colors: { primary: '#1f2937', secondary: '#374151', accent: '#4b5563', text: '#111827', background: '#ffffff' },
    fonts: { heading: 'Calibri', body: 'Calibri' }, layout: { type: 'single-column', headerStyle: 'centered', sectionStyle: 'clean', spacing: 'normal' },
    features: ['Government-ready', 'Formal', 'Security-cleared']
  },

  // CREATIVE TEMPLATES (15)
  {
    id: 'creative-1', name: 'Graphic Designer', description: 'Vibrant design showcasing creativity', category: 'creative', isPremium: true,
    colors: { primary: '#7c3aed', secondary: '#a855f7', accent: '#c084fc', text: '#581c87', background: '#faf5ff' },
    fonts: { heading: 'Bebas Neue', body: 'Open Sans' }, layout: { type: 'modern-grid', headerStyle: 'banner', sectionStyle: 'cards', spacing: 'compact' },
    features: ['Creative showcase', 'Portfolio-ready', 'Visual impact']
  },
  {
    id: 'creative-2', name: 'Artist Portfolio', description: 'Artistic layout for creative professionals', category: 'creative', isPremium: true,
    colors: { primary: '#dc2626', secondary: '#ef4444', accent: '#f87171', text: '#7f1d1d', background: '#fef2f2' },
    fonts: { heading: 'Playfair Display', body: 'Lora' }, layout: { type: 'sidebar', headerStyle: 'split', sectionStyle: 'timeline', spacing: 'spacious' },
    features: ['Artistic flair', 'Creative layout', 'Portfolio integration']
  },
  {
    id: 'creative-3', name: 'Photographer', description: 'Visual-first design for photographers', category: 'creative', isPremium: false,
    colors: { primary: '#0891b2', secondary: '#06b6d4', accent: '#22d3ee', text: '#164e63', background: '#f0fdff' },
    fonts: { heading: 'Montserrat', body: 'Source Sans Pro' }, layout: { type: 'three-column', headerStyle: 'minimal', sectionStyle: 'cards', spacing: 'normal' },
    features: ['Visual-focused', 'Portfolio-ready', 'Image-friendly']
  },
  {
    id: 'creative-4', name: 'Content Creator', description: 'Modern design for digital creators', category: 'creative', isPremium: true,
    colors: { primary: '#f59e0b', secondary: '#fbbf24', accent: '#fcd34d', text: '#92400e', background: '#fffbeb' },
    fonts: { heading: 'Poppins', body: 'Inter' }, layout: { type: 'modern-grid', headerStyle: 'banner', sectionStyle: 'boxed', spacing: 'compact' },
    features: ['Social media ready', 'Brand-focused', 'Digital-first']
  },
  {
    id: 'creative-5', name: 'Fashion Designer', description: 'Stylish design for fashion industry', category: 'creative', isPremium: true,
    colors: { primary: '#ec4899', secondary: '#f472b6', accent: '#f9a8d4', text: '#831843', background: '#fdf2f8' },
    fonts: { heading: 'Didot', body: 'Helvetica Neue' }, layout: { type: 'sidebar', headerStyle: 'split', sectionStyle: 'timeline', spacing: 'spacious' },
    features: ['Fashion-focused', 'Stylish layout', 'Trend-aware']
  }
];