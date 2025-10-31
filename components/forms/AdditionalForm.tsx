'use client';

import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Certification } from '@/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Plus, Trash2, X, Award, Globe, Heart } from 'lucide-react';

export default function AdditionalForm() {
  const { 
    resumeData, 
    addCertification, 
    updateCertification, 
    removeCertification,
    updateLanguages,
    updateHobbies
  } = useResumeStore();
  
  const { certifications, languages = [], hobbies = [] } = resumeData;
  const [newLanguage, setNewLanguage] = useState('');
  const [newHobby, setNewHobby] = useState('');

  const addNewCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      link: ''
    };
    addCertification(newCertification);
  };

  const updateCertificationField = (id: string, field: keyof Certification, value: string) => {
    updateCertification(id, { [field]: value });
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      updateLanguages([...languages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    updateLanguages(updatedLanguages);
  };

  const addHobby = () => {
    if (newHobby.trim() && !hobbies.includes(newHobby.trim())) {
      updateHobbies([...hobbies, newHobby.trim()]);
      setNewHobby('');
    }
  };

  const removeHobby = (index: number) => {
    const updatedHobbies = hobbies.filter((_, i) => i !== index);
    updateHobbies(updatedHobbies);
  };

  return (
    <div className="space-y-8">
      {/* Certifications Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Certifications
          </h3>
          <Button onClick={addNewCertification} className="flex items-center">
            <Plus className="w-4 h-4 mr-1" />
            Add Certification
          </Button>
        </div>

        {certifications.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <Award className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">No certifications added yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={cert.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-900">Certification #{index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCertification(cert.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Certification Name *"
                    value={cert.name}
                    onChange={(e) => updateCertificationField(cert.id, 'name', e.target.value)}
                    placeholder="AWS Certified Solutions Architect"
                    required
                  />
                  <Input
                    label="Issuing Organization *"
                    value={cert.issuer}
                    onChange={(e) => updateCertificationField(cert.id, 'issuer', e.target.value)}
                    placeholder="Amazon Web Services"
                    required
                  />
                  <Input
                    label="Date Obtained *"
                    type="month"
                    value={cert.date}
                    onChange={(e) => updateCertificationField(cert.id, 'date', e.target.value)}
                    required
                  />
                  <Input
                    label="Verification Link (Optional)"
                    type="url"
                    value={cert.link || ''}
                    onChange={(e) => updateCertificationField(cert.id, 'link', e.target.value)}
                    placeholder="https://verify.certification.com"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Languages Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Languages
        </h3>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {languages.map((language, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
              >
                {language}
                <button
                  onClick={() => removeLanguage(index)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="Add language (e.g., English - Native, Spanish - Conversational)..."
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addLanguage();
                }
              }}
            />
            <Button
              onClick={addLanguage}
              disabled={!newLanguage.trim()}
              size="sm"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Hobbies & Interests Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2" />
          Hobbies & Interests
        </h3>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {hobbies.map((hobby, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-800"
              >
                {hobby}
                <button
                  onClick={() => removeHobby(index)}
                  className="ml-2 text-pink-600 hover:text-pink-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              value={newHobby}
              onChange={(e) => setNewHobby(e.target.value)}
              placeholder="Add hobby or interest..."
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addHobby();
                }
              }}
            />
            <Button
              onClick={addHobby}
              disabled={!newHobby.trim()}
              size="sm"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-indigo-800 mb-2">💡 Additional Information Tips</h3>
        <ul className="text-sm text-indigo-700 space-y-1">
          <li>• <strong>Certifications:</strong> Include relevant professional certifications and licenses</li>
          <li>• <strong>Languages:</strong> Specify proficiency level (Native, Fluent, Conversational, Basic)</li>
          <li>• <strong>Hobbies:</strong> Include interests that show personality or relevant skills</li>
          <li>• Only include information that adds value to your application</li>
          <li>• Keep this section concise - it should complement, not overshadow your main qualifications</li>
        </ul>
      </div>
    </div>
  );
}