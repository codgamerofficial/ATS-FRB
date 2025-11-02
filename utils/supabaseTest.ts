import { supabase } from '@/lib/supabase/client';
import { testResumeData } from './testData';

export async function testSupabaseIntegration() {
  const results = {
    connection: false,
    resumeInsert: false,
    analytics: false,
    collaboration: false,
    errors: [] as string[]
  };

  try {
    // Test 1: Connection
    const { data: connectionTest } = await supabase.from('profiles').select('count').limit(1);
    results.connection = true;

    // Test 2: Resume Insert
    const { data: resumeData, error: resumeError } = await supabase
      .from('resumes')
      .insert({
        title: 'Test Resume',
        content: testResumeData,
        template_id: '00000000-0000-0000-0000-000000000000',
        is_public: false
      })
      .select()
      .single();

    if (resumeError) throw new Error(`Resume insert failed: ${resumeError.message}`);
    results.resumeInsert = true;

    // Test 3: Analytics Function
    if (resumeData) {
      const { error: analyticsError } = await supabase.rpc('track_resume_event', {
        p_resume_id: resumeData.id,
        p_event_type: 'view',
        p_metadata: { source: 'test' }
      });

      if (analyticsError) throw new Error(`Analytics failed: ${analyticsError.message}`);
      results.analytics = true;

      // Test 4: Collaboration Data
      const { error: collabError } = await supabase
        .from('resumes')
        .update({
          collaborators: [{ id: 'test-user', name: 'Test User', role: 'editor' }]
        })
        .eq('id', resumeData.id);

      if (collabError) throw new Error(`Collaboration failed: ${collabError.message}`);
      results.collaboration = true;

      // Cleanup
      await supabase.from('resumes').delete().eq('id', resumeData.id);
    }

  } catch (error) {
    results.errors.push(error instanceof Error ? error.message : 'Unknown error');
  }

  return results;
}

export async function testRealtimeConnection() {
  return new Promise((resolve) => {
    const channel = supabase.channel('test-channel');
    
    const timeout = setTimeout(() => {
      channel.unsubscribe();
      resolve({ connected: false, error: 'Timeout' });
    }, 5000);

    channel.subscribe((status) => {
      clearTimeout(timeout);
      channel.unsubscribe();
      resolve({ connected: status === 'SUBSCRIBED', status });
    });
  });
}