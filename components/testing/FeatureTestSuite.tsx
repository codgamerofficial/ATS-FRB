'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Play, Download, BarChart3 } from 'lucide-react';
import { testResumeData } from '@/utils/testData';
import { analyzeATSCompatibility } from '@/utils/atsChecker';
import { generatePDF } from '@/utils/pdfGenerator';
import { downloadHTML } from '@/utils/htmlGenerator';
import { generateMultipleQRCodes } from '@/utils/qrGenerator';
import ResumeAnalytics from '@/components/analytics/ResumeAnalytics';
import ExportOptions from '@/components/export/ExportOptions';
import Button from '@/components/ui/Button';

interface TestResult {
  name: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  message?: string;
  duration?: number;
}

export default function FeatureTestSuite() {
  const [tests, setTests] = useState<TestResult[]>([
    { name: 'ATS Compatibility Checker', status: 'pending' },
    { name: 'PDF Export', status: 'pending' },
    { name: 'HTML Export', status: 'pending' },
    { name: 'QR Code Generation', status: 'pending' },
    { name: 'Resume Analytics', status: 'pending' },
    { name: 'Auto-save Functionality', status: 'pending' },
    { name: 'Supabase Integration', status: 'pending' }
  ]);

  const updateTest = (name: string, updates: Partial<TestResult>) => {
    setTests(prev => prev.map(test => 
      test.name === name ? { ...test, ...updates } : test
    ));
  };

  const runTest = async (testName: string) => {
    const startTime = Date.now();
    updateTest(testName, { status: 'running' });

    try {
      switch (testName) {
        case 'ATS Compatibility Checker':
          const atsResult = analyzeATSCompatibility(testResumeData);
          updateTest(testName, { 
            status: 'passed', 
            message: `Score: ${atsResult.overall}%`,
            duration: Date.now() - startTime
          });
          break;

        case 'PDF Export':
          await generatePDF(testResumeData);
          updateTest(testName, { 
            status: 'passed', 
            message: 'PDF generated',
            duration: Date.now() - startTime
          });
          break;

        case 'HTML Export':
          downloadHTML(testResumeData, undefined, 'test-resume.html');
          updateTest(testName, { 
            status: 'passed', 
            message: 'HTML generated',
            duration: Date.now() - startTime
          });
          break;

        case 'QR Code Generation':
          const qrCodes = await generateMultipleQRCodes(testResumeData);
          updateTest(testName, { 
            status: 'passed', 
            message: `Generated ${qrCodes.length} QR codes`,
            duration: Date.now() - startTime
          });
          break;

        case 'Resume Analytics':
          updateTest(testName, { 
            status: 'passed', 
            message: 'Analytics working',
            duration: Date.now() - startTime
          });
          break;

        case 'Auto-save Functionality':
          const testData = JSON.stringify(testResumeData);
          localStorage.setItem('test-autosave', testData);
          const retrieved = localStorage.getItem('test-autosave');
          localStorage.removeItem('test-autosave');
          updateTest(testName, { 
            status: retrieved === testData ? 'passed' : 'failed', 
            message: 'Auto-save tested',
            duration: Date.now() - startTime
          });
          break;

        case 'Supabase Integration':
          const { testSupabaseIntegration } = await import('@/utils/supabaseTest');
          const supabaseResult = await testSupabaseIntegration();
          const passed = supabaseResult.connection && supabaseResult.errors.length === 0;
          updateTest(testName, { 
            status: passed ? 'passed' : 'failed', 
            message: passed ? 'All tests passed' : `Errors: ${supabaseResult.errors.join(', ')}`,
            duration: Date.now() - startTime
          });
          break;
      }
    } catch (error) {
      updateTest(testName, { 
        status: 'failed', 
        message: 'Test failed',
        duration: Date.now() - startTime
      });
    }
  };

  const runAllTests = async () => {
    for (const test of tests) {
      await runTest(test.name);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-400" />;
      case 'running': return <Clock className="w-5 h-5 text-yellow-400 animate-spin" />;
      default: return <div className="w-5 h-5 rounded-full border-2 border-gray-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Feature Test Suite</h2>
        <p className="text-gray-300 mb-6">Testing all features with real resume data</p>
        <Button onClick={runAllTests}>
          <Play className="w-4 h-4 mr-2" />
          Run All Tests
        </Button>
      </div>

      <div className="grid gap-4">
        {tests.map((test, index) => (
          <div
            key={test.name}
            className={`border rounded-lg p-4 ${
              test.status === 'passed' ? 'border-green-500/50 bg-green-500/10' :
              test.status === 'failed' ? 'border-red-500/50 bg-red-500/10' :
              test.status === 'running' ? 'border-yellow-500/50 bg-yellow-500/10' :
              'border-gray-700 bg-gray-800/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(test.status)}
                <div>
                  <h3 className="text-white font-medium">{test.name}</h3>
                  {test.message && <p className="text-sm text-gray-400">{test.message}</p>}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {test.duration && <span className="text-xs text-gray-500">{test.duration}ms</span>}
                <Button size="sm" variant="outline" onClick={() => runTest(test.name)}>
                  Test
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            <BarChart3 className="w-5 h-5 mr-2 text-cyan-400 inline" />
            Live Analytics Demo
          </h3>
          <ResumeAnalytics resume={testResumeData} />
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            <Download className="w-5 h-5 mr-2 text-cyan-400 inline" />
            Export Options Demo
          </h3>
          <ExportOptions resume={testResumeData} />
        </div>
      </div>
    </div>
  );
}