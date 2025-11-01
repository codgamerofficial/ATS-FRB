import { create } from 'zustand';
import { TemplateStyle, TemplateCategory, TemplateFilter } from '@/types/templates';
import { completeTemplateCollection } from '@/data/completeTemplates';

interface TemplateStore {
  templates: TemplateStyle[];
  selectedTemplate: TemplateStyle | null;
  filter: TemplateFilter;
  searchTerm: string;
  
  // Actions
  setSelectedTemplate: (template: TemplateStyle) => void;
  setFilter: (filter: Partial<TemplateFilter>) => void;
  setSearchTerm: (term: string) => void;
  getFilteredTemplates: () => TemplateStyle[];
  getTemplateById: (id: string) => TemplateStyle | undefined;
  getTemplatesByCategory: (category: TemplateCategory) => TemplateStyle[];
  resetFilters: () => void;
}

export const useTemplateStore = create<TemplateStore>((set, get) => ({
  templates: completeTemplateCollection,
  selectedTemplate: null,
  filter: {},
  searchTerm: '',

  setSelectedTemplate: (template) => set({ selectedTemplate: template }),

  setFilter: (newFilter) => 
    set((state) => ({ 
      filter: { ...state.filter, ...newFilter } 
    })),

  setSearchTerm: (term) => set({ searchTerm: term }),

  getFilteredTemplates: () => {
    const { templates, filter, searchTerm } = get();
    
    return templates.filter((template) => {
      // Category filter
      if (filter.category && template.category !== filter.category) {
        return false;
      }
      
      // Premium filter
      if (filter.isPremium !== undefined && template.isPremium !== filter.isPremium) {
        return false;
      }
      
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          template.name.toLowerCase().includes(searchLower) ||
          template.description.toLowerCase().includes(searchLower) ||
          template.features.some(feature => feature.toLowerCase().includes(searchLower))
        );
      }
      
      return true;
    });
  },

  getTemplateById: (id) => {
    const { templates } = get();
    return templates.find(template => template.id === id);
  },

  getTemplatesByCategory: (category) => {
    const { templates } = get();
    return templates.filter(template => template.category === category);
  },

  resetFilters: () => set({ filter: {}, searchTerm: '' })
}));