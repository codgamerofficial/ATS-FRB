import { supabase } from '@/lib/supabase/client';
import { ResumeData } from '@/types';

export const saveResume = async (
  title: string,
  content: ResumeData,
  templateId: string = 'default',
  isPublic: boolean = false
) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('resumes')
    .insert({
      user_id: user.id,
      title,
      content,
      template_id: templateId,
      is_public: isPublic,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateResume = async (
  id: string,
  title: string,
  content: ResumeData,
  templateId?: string,
  isPublic?: boolean
) => {
  const updateData: any = {
    title,
    content,
    updated_at: new Date().toISOString(),
  };

  if (templateId !== undefined) updateData.template_id = templateId;
  if (isPublic !== undefined) updateData.is_public = isPublic;

  const { data, error } = await supabase
    .from('resumes')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const loadResume = async (id: string) => {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const deleteResume = async (id: string) => {
  const { error } = await supabase
    .from('resumes')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const getUserResumes = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data;
};