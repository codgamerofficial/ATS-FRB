'use client';

import { useResumeStore } from '@/store/resumeStore';
import Input from '@/components/ui/Input';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const { personalInfo } = resumeData;

  const handleChange = (field: string, value: string) => {
    updatePersonalInfo({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <User className="absolute left-3 top-9 h-4 w-4 text-cyan-400" />
          <Input
            label="Full Name *"
            value={personalInfo.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
            className="pl-10"
            required
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-9 h-4 w-4 text-cyan-400" />
          <Input
            label="Email Address *"
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john.doe@example.com"
            className="pl-10"
            required
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-9 h-4 w-4 text-cyan-400" />
          <Input
            label="Phone Number *"
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="pl-10"
            required
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-9 h-4 w-4 text-cyan-400" />
          <Input
            label="Location *"
            value={personalInfo.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="City, State, Country"
            className="pl-10"
            required
          />
        </div>

        <div className="relative">
          <Globe className="absolute left-3 top-9 h-4 w-4 text-cyan-400" />
          <Input
            label="Website"
            type="url"
            value={personalInfo.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://yourwebsite.com"
            className="pl-10"
          />
        </div>

        <div className="relative">
          <Linkedin className="absolute left-3 top-9 h-4 w-4 text-cyan-400" />
          <Input
            label="LinkedIn"
            type="url"
            value={personalInfo.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
            className="pl-10"
          />
        </div>

        <div className="relative md:col-span-2">
          <Github className="absolute left-3 top-9 h-4 w-4 text-cyan-400" />
          <Input
            label="GitHub"
            type="url"
            value={personalInfo.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="https://github.com/yourusername"
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
        <h3 className="text-sm font-medium text-cyan-400 mb-2">💡 Pro Tips</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Use a professional email address</li>
          <li>• Include your full phone number with country code</li>
          <li>• Add your LinkedIn profile to increase credibility</li>
          <li>• Keep your location general (City, State) for privacy</li>
        </ul>
      </div>
    </div>
  );
}