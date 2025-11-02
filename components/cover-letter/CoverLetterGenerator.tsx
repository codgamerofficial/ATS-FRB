'use client';

import { useState } from 'react';
import { FileText, Wand2, Download, Copy, RefreshCw } from 'lucide-react';
import SciFiCard from '@/components/ui/SciFiCard';
import Button from '@/components/ui/Button';

interface CoverLetterData {
  jobTitle: string;
  companyName: string;
  hiringManager: string;
  jobDescription: string;
  yourName: string;
  yourExperience: string;
  keySkills: string;
  whyInterested: string;
}

export default function CoverLetterGenerator() {
  const [formData, setFormData] = useState<CoverLetterData>({
    jobTitle: '',
    companyName: '',
    hiringManager: '',
    jobDescription: '',
    yourName: '',
    yourExperience: '',
    keySkills: '',
    whyInterested: ''
  });
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleInputChange = (field: keyof CoverLetterData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateCoverLetter = async () => {
    setLoading(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const letter = `Dear ${formData.hiringManager || 'Hiring Manager'},

I am writing to express my strong interest in the ${formData.jobTitle} position at ${formData.companyName}. With ${formData.yourExperience} years of experience in the field, I am confident that my skills and passion make me an ideal candidate for this role.

In my previous roles, I have developed expertise in ${formData.keySkills}, which directly aligns with the requirements outlined in your job description. I am particularly drawn to ${formData.companyName} because ${formData.whyInterested}.

Key highlights of my qualifications include:
• Proven track record in ${formData.keySkills.split(',')[0]?.trim() || 'relevant technologies'}
• Strong problem-solving abilities and attention to detail
• Experience working in collaborative team environments
• Commitment to continuous learning and professional development

I am excited about the opportunity to contribute to ${formData.companyName}'s continued success and would welcome the chance to discuss how my background and enthusiasm can benefit your team. Thank you for considering my application.

Sincerely,
${formData.yourName}`;

      setGeneratedLetter(letter);
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
  };

  const downloadLetter = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `cover-letter-${formData.companyName.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const resetForm = () => {
    setFormData({
      jobTitle: '',
      companyName: '',
      hiringManager: '',
      jobDescription: '',
      yourName: '',
      yourExperience: '',
      keySkills: '',
      whyInterested: ''
    });
    setGeneratedLetter('');
    setStep(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <SciFiCard className="text-center" variant="glow">
        <div className="p-8">
          <FileText className="h-16 w-16 text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">✍️ Free AI Cover Letter Generator</h2>
          <p className="text-purple-100">
            Create personalized, professional cover letters in minutes using AI technology
          </p>
          
          {/* Progress Steps */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= stepNum 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-12 h-0.5 ${
                      step > stepNum ? 'bg-purple-500' : 'bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-2 space-x-8 text-sm">
            <span className={step >= 1 ? 'text-purple-300' : 'text-gray-500'}>Job Details</span>
            <span className={step >= 2 ? 'text-purple-300' : 'text-gray-500'}>Your Info</span>
            <span className={step >= 3 ? 'text-purple-300' : 'text-gray-500'}>Generated</span>
          </div>
        </div>
      </SciFiCard>

      {/* Step 1: Job Details */}
      {step === 1 && (
        <SciFiCard>
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">📋 Job Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Job Title *</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
                  placeholder="e.g., Software Engineer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
                  placeholder="e.g., Google"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Hiring Manager</label>
                <input
                  type="text"
                  value={formData.hiringManager}
                  onChange={(e) => handleInputChange('hiringManager', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
                  placeholder="e.g., John Smith (optional)"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Job Description</label>
                <textarea
                  value={formData.jobDescription}
                  onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                  rows={4}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
                  placeholder="Paste the job description here (optional but recommended)"
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button 
                onClick={() => setStep(2)}
                disabled={!formData.jobTitle || !formData.companyName}
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                Next: Your Information
              </Button>
            </div>
          </div>
        </SciFiCard>
      )}

      {/* Step 2: Your Information */}
      {step === 2 && (
        <SciFiCard>
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">👤 Your Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Full Name *</label>
                <input
                  type="text"
                  value={formData.yourName}
                  onChange={(e) => handleInputChange('yourName', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
                  placeholder="e.g., Jane Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience *</label>
                <input
                  type="text"
                  value={formData.yourExperience}
                  onChange={(e) => handleInputChange('yourExperience', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
                  placeholder="e.g., 3"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Key Skills *</label>
                <input
                  type="text"
                  value={formData.keySkills}
                  onChange={(e) => handleInputChange('keySkills', e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
                  placeholder="e.g., JavaScript, React, Node.js, Python"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Why are you interested in this company? *</label>
                <textarea
                  value={formData.whyInterested}
                  onChange={(e) => handleInputChange('whyInterested', e.target.value)}
                  rows={3}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
                  placeholder="e.g., I admire the company's innovation in AI technology and commitment to sustainability..."
                />
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button 
                onClick={() => setStep(1)}
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                Back
              </Button>
              <Button 
                onClick={generateCoverLetter}
                disabled={!formData.yourName || !formData.yourExperience || !formData.keySkills || !formData.whyInterested || loading}
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Generating...</span>
                  </div>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Cover Letter
                  </>
                )}
              </Button>
            </div>
          </div>
        </SciFiCard>
      )}

      {/* Step 3: Generated Cover Letter */}
      {step === 3 && generatedLetter && (
        <SciFiCard variant="premium">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">📄 Your Cover Letter</h3>
              <div className="flex space-x-2">
                <Button onClick={copyToClipboard} size="sm" variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={downloadLetter} size="sm" className="bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button onClick={resetForm} size="sm" variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New Letter
                </Button>
              </div>
            </div>
            
            <div className="bg-white text-black p-6 rounded-lg font-serif leading-relaxed">
              <pre className="whitespace-pre-wrap font-sans">{generatedLetter}</pre>
            </div>
            
            <div className="mt-4 p-4 bg-purple-500/10 border border-purple-400/30 rounded-lg">
              <p className="text-purple-200 text-sm">
                💡 <strong>Pro Tip:</strong> Review and customize this letter to match your personal style and add specific examples from your experience.
              </p>
            </div>
          </div>
        </SciFiCard>
      )}
    </div>
  );
}