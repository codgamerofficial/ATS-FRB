import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from 'zustand/middleware';
import { ResumeData, PersonalInfo, Education, Experience, Project, Skill, Certification } from '../types';
import { supabase } from '../lib/supabase';

interface ResumeStore {
  resumeData: ResumeData;
  currentStep: number;
  isLoading: boolean;
  isSaving: boolean;
  
  // Actions
  saveResume: (title?: string) => Promise<void>;
  loadResume: () => Promise<void>;
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
    id: '',
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

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
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
            set({ isSaving: false });
            return;
          }

          const { resumeData } = get();
          
          // Check if resume already exists
          const { data: existingResume } = await supabase
            .from('resumes')
            .select('id')
            .eq('user_id', user.id)
            .single();
          
          let result;
          
          if (existingResume) {
            // Update existing resume
            result = await supabase
              .from('resumes')
              .update({
                title,
                content: resumeData,
                updated_at: new Date().toISOString()
              })
              .eq('id', existingResume.id)
              .select();
          } else {
            // Insert new resume
            result = await supabase
              .from('resumes')
              .insert({
                user_id: user.id,
                title,
                content: resumeData,
                template_id: 'modern-professional', // Default template ID
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })
              .select();
          }

          if (result.error) {
            console.error('Database error:', result.error);
          } else {
            console.log('Save successful:', result.data);
          }
        } catch (error) {
          console.error('Unexpected error:', error);
        } finally {
          set({ isSaving: false });
        }
      },

      loadResume: async () => {
        set({ isLoading: true });
        try {
          const { data: { user }, error: authError } = await supabase.auth.getUser();
          
          if (authError || !user) {
            console.error('Auth error:', authError);
            set({ isLoading: false });
            return;
          }

          const { data: resume, error } = await supabase
            .from('resumes')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (error) {
            if (error.code !== 'PGRST116') { // Not found error
              console.error('Database error:', error);
            }
          } else if (resume) {
            set({ resumeData: resume.content });
          }
        } catch (error) {
          console.error('Unexpected error:', error);
        } finally {
          set({ isLoading: false });
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
    }),
    {
      name: 'resume-storage',
      storage: {
        getItem: async (name) => {
          const item = await AsyncStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);