export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
    surface: string;
    border: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

export interface TemplateTheme extends Theme {
  templateId: string;
  isDefault: boolean;
  category: 'professional' | 'creative' | 'modern' | 'classic' | 'minimal';
}

export const defaultThemes: TemplateTheme[] = [
  {
    id: 'sci-fi-cyan',
    name: 'Sci-Fi Cyan',
    description: 'Futuristic design with cyan accents matching your brand',
    templateId: 'all',
    isDefault: true,
    category: 'professional',
    colors: {
      primary: '#06b6d4',
      secondary: '#64748b',
      accent: '#0ea5e9',
      text: '#ffffff',
      background: '#0f172a',
      surface: '#1e293b',
      border: '#334155'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
      mono: 'JetBrains Mono'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem'
    },
    shadows: {
      sm: '0 0 10px rgba(6, 182, 212, 0.1)',
      md: '0 0 20px rgba(6, 182, 212, 0.2)',
      lg: '0 0 30px rgba(6, 182, 212, 0.3)'
    }
  },
  {
    id: 'dark-professional',
    name: 'Dark Professional',
    description: 'Professional dark theme with blue accents',
    templateId: 'all',
    isDefault: false,
    category: 'professional',
    colors: {
      primary: '#3b82f6',
      secondary: '#94a3b8',
      accent: '#60a5fa',
      text: '#f1f5f9',
      background: '#1e293b',
      surface: '#334155',
      border: '#475569'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
      mono: 'JetBrains Mono'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem'
    },
    shadows: {
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.2)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.2)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.2)'
    }
  },
  {
    id: 'light-minimal',
    name: 'Light Minimal',
    description: 'Clean light theme for traditional resumes',
    templateId: 'all',
    isDefault: false,
    category: 'minimal',
    colors: {
      primary: '#1e40af',
      secondary: '#64748b',
      accent: '#3b82f6',
      text: '#1e293b',
      background: '#ffffff',
      surface: '#f8fafc',
      border: '#e2e8f0'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
      mono: 'JetBrains Mono'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    },
    borderRadius: {
      sm: '0.125rem',
      md: '0.25rem',
      lg: '0.375rem'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      lg: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
    }
  }
];