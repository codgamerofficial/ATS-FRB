'use client';

import { motion } from 'framer-motion';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary-600">ResumeBuilder</Link>
          <DarkModeToggle />
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Acceptance of Terms
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  By accessing and using ResumeBuilder, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please 
                  do not use this service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Use License
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Permission is granted to temporarily download one copy of ResumeBuilder per device 
                  for personal, non-commercial transitory viewing only. This is the grant of a license, 
                  not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                User Accounts
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  When you create an account with us, you must provide information that is accurate, 
                  complete, and current at all times. You are responsible for safeguarding the password 
                  and for all activities that occur under your account.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You must be at least 13 years old to use this service</li>
                  <li>You are responsible for maintaining the confidentiality of your account</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Content Ownership
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  You retain ownership of all content you create using our service. We do not claim 
                  ownership of your resume content, personal information, or any materials you upload.
                </p>
                <p>
                  By using our service, you grant us a limited license to store, process, and display 
                  your content solely for the purpose of providing our services to you.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Prohibited Uses
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>You may not use our service:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Service Availability
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  We strive to provide continuous service availability, but we do not guarantee that 
                  our service will be uninterrupted or error-free. We reserve the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Modify or discontinue the service at any time</li>
                  <li>Perform maintenance that may temporarily interrupt service</li>
                  <li>Update features and functionality</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Limitation of Liability
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  In no event shall ResumeBuilder or its suppliers be liable for any damages 
                  (including, without limitation, damages for loss of data or profit, or due to 
                  business interruption) arising out of the use or inability to use the materials 
                  on ResumeBuilder's website.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Termination
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  We may terminate or suspend your account and bar access to the service immediately, 
                  without prior notice or liability, under our sole discretion, for any reason 
                  whatsoever including without limitation if you breach the Terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Changes to Terms
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of 
                  any significant changes by posting the new terms on this page and updating the 
                  "Last updated" date.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p>Email: saswatadey700@gmail.com</p>
                  <p>Phone: +91 8145172429</p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}