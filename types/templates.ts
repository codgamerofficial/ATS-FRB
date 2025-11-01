export interface TemplateStyle {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  isPremium: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  layout: TemplateLayout;
  features: string[];
  preview?: string;
}

export interface TemplateLayout {
  type: 'single-column' | 'two-column' | 'three-column' | 'sidebar' | 'modern-grid';
  headerStyle: 'centered' | 'left-aligned' | 'split' | 'minimal' | 'banner';
  sectionStyle: 'bordered' | 'clean' | 'boxed' | 'timeline' | 'cards';
  spacing: 'compact' | 'normal' | 'spacious';
}

export type TemplateCategory = 
  | 'modern'
  | 'classic' 
  | 'creative'
  | 'executive'
  | 'technical'
  | 'academic'
  | 'minimalist'
  | 'colorful'
  | 'ats-optimized'
  | 'industry-specific';

export interface TemplateFilter {
  category?: TemplateCategory;
  isPremium?: boolean;
  searchTerm?: string;
}