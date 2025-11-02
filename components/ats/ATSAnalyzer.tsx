'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, AlertTriangle, Target, Zap } from 'lucide-react';
import SciFiCard from '@/components/ui/SciFiCard';
import Button from '@/components/ui/Button';

interface ATSScore {
  overall: number;
  keywords: number;
  formatting: number;
  sections: number;
  readability: number;
}

interface ATSAnalysis {
  score: ATSScore;
  suggestions: string[];
  keywords: {
    found: string[];
    missing: string[];
  };
  sections: {
    present: string[];
    missing: string[];
  };
}

export default function ATSAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const analyzeResume = async () => {
    if (!file) return;
    
    setLoading(true);
    
    // Simulate ATS analysis
    setTimeout(() => {
      const mockAnalysis: ATSAnalysis = {
        score: {
          overall: 78,
          keywords: 72,
          formatting: 85,
          sections: 80,
          readability: 75
        },
        suggestions: [
          "Add more industry-specific keywords",
          "Include quantifiable achievements with numbers",
          "Optimize section headers for ATS parsing",
          "Use standard date formats (MM/YYYY)",
          "Add skills section with relevant technologies",
          "Include contact information in header",
          "Use bullet points for better readability"
        ],
        keywords: {
          found: ["JavaScript", "React", "Node.js", "Python", "AWS", "Git"],
          missing: ["TypeScript", "Docker", "Kubernetes", "CI/CD", "Agile", "Scrum"]
        },
        sections: {
          present: ["Contact Info", "Experience", "Education", "Skills"],
          missing: ["Summary", "Projects", "Certifications"]
        }
      };
      
      setAnalysis(mockAnalysis);
      setLoading(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-400" />;
    if (score >= 60) return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
    return <XCircle className="h-5 w-5 text-red-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <SciFiCard className="text-center" variant="glow">
        <div className="p-8">
          <div className="mb-6">
            <Target className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">🎯 Free ATS Resume Analyzer</h2>
            <p className="text-cyan-100">
              Upload your resume and get instant ATS compatibility analysis with actionable insights
            </p>
          </div>

          <div
            className={`border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
              dragActive 
                ? 'border-cyan-400 bg-cyan-500/10' 
                : 'border-gray-600 hover:border-cyan-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-white mb-2">Drag & drop your resume here</p>
            <p className="text-gray-400 text-sm mb-4">Supports PDF, DOC, DOCX files</p>
            
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="resume-upload"
            />
            <label htmlFor="resume-upload">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500">
                Choose File
              </Button>
            </label>
          </div>

          {file && (
            <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-cyan-400" />
                  <span className="text-white">{file.name}</span>
                </div>
                <Button onClick={analyzeResume} disabled={loading}>
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Analyze Resume
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </SciFiCard>

      {/* Analysis Results */}
      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score Overview */}
          <SciFiCard variant="premium">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">📊 ATS Compatibility Score</h3>
              
              <div className="text-center mb-6">
                <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysis.score.overall)}`}>
                  {analysis.score.overall}%
                </div>
                <div className="flex items-center justify-center space-x-2">
                  {getScoreIcon(analysis.score.overall)}
                  <span className="text-gray-300">
                    {analysis.score.overall >= 80 ? 'Excellent' : 
                     analysis.score.overall >= 60 ? 'Good' : 'Needs Improvement'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(analysis.score).filter(([key]) => key !== 'overall').map(([key, score]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            score >= 80 ? 'bg-green-400' : 
                            score >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                          }`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${getScoreColor(score)}`}>
                        {score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SciFiCard>

          {/* Suggestions */}
          <SciFiCard>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">💡 Improvement Suggestions</h3>
              <div className="space-y-3">
                {analysis.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-400 text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </SciFiCard>

          {/* Keywords Analysis */}
          <SciFiCard>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">🔍 Keywords Analysis</h3>
              
              <div className="mb-4">
                <h4 className="text-green-400 font-medium mb-2">✅ Found Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.found.map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-red-400 font-medium mb-2">❌ Missing Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.missing.map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SciFiCard>

          {/* Sections Analysis */}
          <SciFiCard>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">📋 Resume Sections</h3>
              
              <div className="mb-4">
                <h4 className="text-green-400 font-medium mb-2">✅ Present Sections</h4>
                <div className="space-y-2">
                  {analysis.sections.present.map((section, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">{section}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-red-400 font-medium mb-2">❌ Missing Sections</h4>
                <div className="space-y-2">
                  {analysis.sections.missing.map((section, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <XCircle className="h-4 w-4 text-red-400" />
                      <span className="text-gray-300 text-sm">{section}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SciFiCard>
        </div>
      )}
    </div>
  );
}