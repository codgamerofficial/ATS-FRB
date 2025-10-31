'use client';

import { motion } from 'framer-motion';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import Link from 'next/link';

export default function Privacy() {
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
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Information We Collect
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  We collect information you provide directly to us, such as when you create an account, 
                  build a resume, or contact us for support.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Personal information (name, email address, phone number)</li>
                  <li>Resume content (work experience, education, skills)</li>
                  <li>Account preferences and settings</li>
                  <li>Communication history with our support team</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Create and manage your account</li>
                  <li>Generate and store your resumes</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Information Sharing
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties. 
                  We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With service providers who assist in our operations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Data Security
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. This includes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication</li>
                  <li>Secure data storage with reputable providers</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Your Rights
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Cookies and Tracking
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  We use cookies and similar technologies to enhance your experience, analyze usage, 
                  and improve our services. You can control cookie settings through your browser preferences.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Changes to This Policy
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  We may update this privacy policy from time to time. We will notify you of any 
                  significant changes by posting the new policy on this page and updating the 
                  "Last updated" date.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  If you have any questions about this privacy policy or our data practices, 
                  please contact us at:
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