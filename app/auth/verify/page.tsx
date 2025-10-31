'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import { CheckCircle, Mail, RefreshCw, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function VerifyPage() {
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [resending, setResending] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const { resendConfirmation } = useAuth();

  useEffect(() => {
    const handleEmailVerification = async () => {
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');
      
      if (token_hash && type === 'email') {
        try {
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash,
            type: 'email'
          });
          
          if (error) {
            setError(error.message);
            setVerifying(false);
          } else {
            setVerified(true);
            setVerifying(false);
            toast.success('Email verified successfully!');
            setTimeout(() => {
              router.push('/builder');
            }, 2000);
          }
        } catch (err) {
          setError('Verification failed');
          setVerifying(false);
        }
      } else {
        setVerifying(false);
        const storedEmail = localStorage.getItem('pendingVerificationEmail');
        if (storedEmail) {
          setEmail(storedEmail);
        }
      }
    };

    handleEmailVerification();
  }, [searchParams, router]);

  const handleResendEmail = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setResending(true);
    try {
      const { error } = await resendConfirmation(email);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Verification email sent!');
      }
    } catch (error) {
      toast.error('Failed to resend email');
    } finally {
      setResending(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center max-w-md w-full"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Verifying your email...
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Please wait while we verify your email address.
          </p>
        </motion.div>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center max-w-md w-full"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Email Verified!
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your email has been successfully verified. You'll be redirected to the resume builder shortly.
          </p>

          <Link href="/builder">
            <Button className="w-full">
              Continue to Resume Builder
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center max-w-md w-full"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Verification Failed
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error}
          </p>

          <div className="space-y-4">
            <Link href="/auth">
              <Button variant="outline" className="w-full">
                Back to Sign In
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center max-w-md w-full"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Check Your Email
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We've sent a verification link to your email address. Please click the link to verify your account.
        </p>

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email to resend"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          
          <Button
            onClick={handleResendEmail}
            isLoading={resending}
            variant="outline"
            className="w-full flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Resend Verification Email
          </Button>
          
          <Link href="/auth">
            <Button variant="ghost" className="w-full">
              Back to Sign In
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}