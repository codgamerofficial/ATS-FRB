'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import Link from 'next/link';

const faqs = [
  {
    question: 'How do I create my first resume?',
    answer: 'Simply click "Get Started" and follow our step-by-step resume builder. You\'ll be guided through each section including personal information, experience, education, and skills.'
  },
  {
    question: 'Are the resumes ATS-friendly?',
    answer: 'Yes! All our templates are specifically designed to pass Applicant Tracking Systems (ATS). We use proper formatting, standard fonts, and optimized layouts.'
  },
  {
    question: 'Can I download my resume as PDF?',
    answer: 'Absolutely! You can download your resume as a high-quality PDF that\'s ready for job applications. We also support DOCX format.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, your data is completely secure. We use industry-standard encryption and never share your personal information with third parties.'
  },
  {
    question: 'Can I edit my resume after creating it?',
    answer: 'Yes, you can edit your resume anytime. Just sign in to your account and access your saved resumes from the dashboard.'
  },
  {
    question: 'How many resumes can I create?',
    answer: 'You can create unlimited resumes with your account. Each resume is automatically saved to your profile.'
  },
  {
    question: 'Do you offer customer support?',
    answer: 'Yes! We provide customer support through our contact form and help center. We typically respond within 24 hours.'
  },
  {
    question: 'Can I use different templates?',
    answer: 'Yes, we offer multiple professional templates. You can switch between templates and see how your resume looks in different formats.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary-600">ResumeBuilder</Link>
          <DarkModeToggle />
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Find quick answers to common questions about our resume builder
          </p>
          
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <span className="font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No FAQs found matching your search.
            </p>
          </div>
        )}

        <div className="text-center mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Can't find the answer you're looking for? Please contact our support team.
          </p>
          <Link href="/contact">
            <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}