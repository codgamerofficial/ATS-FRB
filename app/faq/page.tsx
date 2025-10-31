'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import SciFiBackground from '@/components/ui/SciFiBackground';
import SciFiCard from '@/components/ui/SciFiCard';
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
    <div className="min-h-screen relative">
      <SciFiBackground />
      <header className="relative z-10 bg-gray-900/80 backdrop-blur-md border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-cyan-400">ATSFRB</Link>
          <DarkModeToggle />
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-12 px-6 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Find quick answers to common questions about our resume builder
          </p>
          
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-cyan-500/30 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
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
            >
              <SciFiCard>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-800/30 rounded-lg transition-colors"
                >
                  <span className="font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 transition-transform ${
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
                        <p className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SciFiCard>
            </motion.div>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">
              No FAQs found matching your search.
            </p>
          </div>
        )}

        <div className="mt-12">
          <SciFiCard className="text-center p-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              Still have questions?
            </h2>
            <p className="text-gray-300 mb-4">
              Can't find the answer you're looking for? Please contact our support team.
            </p>
            <Link href="/contact">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">
                Contact Support
              </button>
            </Link>
          </SciFiCard>
        </div>
      </div>
    </div>
  );
}