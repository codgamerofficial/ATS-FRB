import { create } from 'zustand';
import { ResumeData, PersonalInfo, Education, Experience, Project, Skill, Certification } from '@/types';
import { supabase } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

interface ResumeStore {
  resumeData: ResumeData;
  currentStep: number;
  isLoading: boolean;
  isSaving: boolean;
  
  // Actions
  saveResume: (title?: string) => Promise<void>;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  addEducation: (education: Education) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  updateSkills: (skills: Skill[]) => void;
  addCertification: (certification: Certification) => void;
  updateCertification: (id: string, certification: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  updateLanguages: (languages: string[]) => void;
  updateHobbies: (hobbies: string[]) => void;
  setCurrentStep: (step: number) => void;
  setLoading: (loading: boolean) => void;
  resetResume: () => void;
  loadResumeData: (data: ResumeData) => void;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
  },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: [],
  certifications: [],
  languages: [],
  hobbies: [],
};

export const useResumeStore = create<ResumeStore>((set, get) => ({
  resumeData: initialResumeData,
  currentStep: 0,
  isLoading: false,
  isSaving: false,

  saveResume: async (title = 'My Resume') => {
    set({ isSaving: true });
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.error('Auth error:', authError);
        toast.error('Please sign in to save your resume');
        set({ isSaving: false });
        return;
      }

      const { resumeData } = get();
      console.log('Saving resume for user:', user.id);
      console.log('Resume data:', resumeData);
      
      const { data, error } = await supabase
        .from('resumes')
        .upsert({
          user_id: user.id,
          title,
          content: resumeData,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        })
        .select();

      if (error) {
        console.error('Database error:', error);
        toast.error('Database error: ' + error.message + '. Please check if tables exist.');
      } else {
        console.log('Save successful:', data);
        toast.success('Resume saved successfully!');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Unexpected error: ' + error.message);
    } finally {
      set({ isSaving: false });
    }
  },

  updatePersonalInfo: (info) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        personalInfo: { ...state.resumeData.personalInfo, ...info },
      },
    })),

  updateSummary: (summary) =>
    set((state) => ({
      resumeData: { ...state.resumeData, summary },
    })),

  addEducation: (education) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: [...state.resumeData.education, education],
      },
    })),

  updateEducation: (id, education) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.map((edu) =>
          edu.id === id ? { ...edu, ...education } : edu
        ),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.filter((edu) => edu.id !== id),
      },
    })),

  addExperience: (experience) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: [...state.resumeData.experience, experience],
      },
    })),

  updateExperience: (id, experience) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.map((exp) =>
          exp.id === id ? { ...exp, ...experience } : exp
        ),
      },
    })),

  removeExperience: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.filter((exp) => exp.id !== id),
      },
    })),

  addProject: (project) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: [...state.resumeData.projects, project],
      },
    })),

  updateProject: (id, project) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.map((proj) =>
          proj.id === id ? { ...proj, ...project } : proj
        ),
      },
    })),

  removeProject: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.filter((proj) => proj.id !== id),
      },
    })),

  updateSkills: (skills) =>
    set((state) => ({
      resumeData: { ...state.resumeData, skills },
    })),

  addCertification: (certification) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        certifications: [...state.resumeData.certifications, certification],
      },
    })),

  updateCertification: (id, certification) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        certifications: state.resumeData.certifications.map((cert) =>
          cert.id === id ? { ...cert, ...certification } : cert
        ),
      },
    })),

  removeCertification: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        certifications: state.resumeData.certifications.filter((cert) => cert.id !== id),
      },
    })),

  updateLanguages: (languages) =>
    set((state) => ({
      resumeData: { ...state.resumeData, languages },
    })),

  updateHobbies: (hobbies) =>
    set((state) => ({
      resumeData: { ...state.resumeData, hobbies },
    })),

  setCurrentStep: (step) => set({ currentStep: step }),

  setLoading: (loading) => set({ isLoading: loading }),

  resetResume: () => set({ resumeData: initialResumeData, currentStep: 0 }),

  loadResumeData: (data) => set({ resumeData: data }),
}));