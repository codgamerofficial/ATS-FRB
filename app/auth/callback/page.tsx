'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      const error_description = searchParams.get('error_description');

      if (error) {
        console.error('Auth error:', error, error_description);
        router.push('/auth?error=' + encodeURIComponent(error_description || error));
        return;
      }

      if (code) {
        try {
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          
          if (error) {
            console.error('Session exchange error:', error);
            router.push('/auth?error=' + encodeURIComponent(error.message));
          } else {
            // Clear any pending verification email
            localStorage.removeItem('pendingVerificationEmail');
            router.push('/builder');
          }
        } catch (err) {
          console.error('Unexpected error:', err);
          router.push('/auth?error=unexpected_error');
        }
      } else {
        router.push('/auth');
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}