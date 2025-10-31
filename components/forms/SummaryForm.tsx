'use client';

import { useResumeStore } from '@/store/resumeStore';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { Sparkles } from 'lucide-react';

const sampleSummaries = [
  "Results-driven software engineer with 5+ years of experience developing scalable web applications. Expertise in React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and delivering high-quality solutions that improve user experience and business outcomes.",
  "Creative marketing professional with expertise in digital campaigns, content strategy, and brand management. Successfully increased brand awareness by 150% and generated $2M+ in revenue through innovative marketing initiatives. Passionate about data-driven decision making and customer engagement.",
  "Experienced data analyst with strong background in statistical analysis, machine learning, and business intelligence. Proficient in Python, SQL, and Tableau. Demonstrated ability to transform complex data into actionable insights that drive strategic business decisions."
];

export default function SummaryForm() {
  const { resumeData, updateSummary } = useResumeStore();
  const { summary } = resumeData;

  const handleChange = (value: string) => {
    updateSummary(value);
  };

  const useSampleSummary = (sampleSummary: string) => {
    updateSummary(sampleSummary);
  };

  return (
    <div className="space-y-6">
      <div>
        <Textarea
          label="Professional Summary *"
          value={summary}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Write a compelling 2-3 sentence summary highlighting your key skills, experience, and career objectives..."
          rows={6}
          helperText="Keep it concise but impactful. Focus on your most relevant skills and achievements."
          required
        />
        <div className="mt-2 text-sm text-gray-500">
          Character count: {summary.length}/500 (recommended: 200-400)
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-purple-800 mb-3 flex items-center">
          <Sparkles className="w-4 h-4 mr-1" />
          Sample Summaries for Inspiration
        </h3>
        <div className="space-y-3">
          {sampleSummaries.map((sample, index) => (
            <div key={index} className="bg-white p-3 rounded border">
              <p className="text-sm text-gray-700 mb-2">{sample}</p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => useSampleSummary(sample)}
                className="text-xs"
              >
                Use This Summary
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">✅ Writing Tips</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Start with your job title or professional identity</li>
          <li>• Include years of experience and key skills</li>
          <li>• Mention specific achievements or metrics when possible</li>
          <li>• Tailor the summary to match the job you're applying for</li>
          <li>• Use action words and avoid generic phrases</li>
        </ul>
      </div>
    </div>
  );
}