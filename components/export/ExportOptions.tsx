'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  FileText, 
  Globe, 
  QrCode, 
  Share2, 
  Copy, 
  Mail,
  Linkedin,
  Twitter
} from 'lucide-react';
import { ResumeData } from '@/types';
import { TemplateStyle } from '@/types/templates';
import { generatePDF } from '@/utils/pdfGenerator';
import { downloadHTML } from '@/utils/htmlGenerator';
import { generateMultipleQRCodes, downloadQRCode, QRCodeData } from '@/utils/qrGenerator';
import Button from '@/components/ui/Button';

interface ExportOptionsProps {
  resume: ResumeData;
  template?: TemplateStyle;
  className?: string;
}

export default function ExportOptions({ resume, template, className = '' }: ExportOptionsProps) {
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([]);
  const [showQRCodes, setShowQRCodes] = useState(false);

  const handleExport = async (format: string) => {
    setIsExporting(format);
    
    try {
      const fileName = `${resume.personalInfo.fullName.replace(' ', '_')}_Resume`;
      
      switch (format) {
        case 'pdf':
          await generatePDF(resume);
          break;
        case 'docx':
          console.log('Word export not yet implemented');
          break;
        case 'html':
          downloadHTML(resume, template, `${fileName}.html`);
          break;
      }
    } catch (error) {
      console.error(`Export failed for ${format}:`, error);
    } finally {
      setIsExporting(null);
    }
  };

  const handleGenerateQRCodes = async () => {
    try {
      setIsExporting('qr');
      const codes = await generateMultipleQRCodes(resume);
      setQrCodes(codes);
      setShowQRCodes(true);
    } catch (error) {
      console.error('Failed to generate QR codes:', error);
    } finally {
      setIsExporting(null);
    }
  };

  const exportOptions = [
    {
      id: 'pdf',
      label: 'PDF',
      description: 'Professional PDF format',
      icon: FileText,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10'
    },
    {
      id: 'docx',
      label: 'Word',
      description: 'Microsoft Word document',
      icon: FileText,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'html',
      label: 'HTML',
      description: 'Web page format',
      icon: Globe,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Download className="w-5 h-5 mr-2 text-cyan-400" />
          Export Resume
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exportOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleExport(option.id)}
              disabled={isExporting === option.id}
              className={`
                ${option.bgColor} border border-gray-700 rounded-lg p-4 text-left
                hover:border-cyan-500/50 transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <option.icon className={`w-6 h-6 ${option.color}`} />
                {isExporting === option.id && (
                  <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                )}
              </div>
              <div className="text-white font-medium">{option.label}</div>
              <div className="text-sm text-gray-400">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <QrCode className="w-5 h-5 mr-2 text-cyan-400" />
          QR Codes
        </h3>
        
        <Button
          onClick={handleGenerateQRCodes}
          disabled={isExporting === 'qr'}
          className="w-full md:w-auto"
        >
          {isExporting === 'qr' ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <QrCode className="w-4 h-4 mr-2" />
              Generate QR Codes
            </>
          )}
        </Button>

        {showQRCodes && qrCodes.length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {qrCodes.map((qr, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
                <img 
                  src={qr.dataUrl} 
                  alt={qr.description}
                  className="w-32 h-32 mx-auto mb-2 rounded-lg"
                />
                <div className="text-white font-medium mb-2">{qr.description}</div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadQRCode(qr.dataUrl, `${qr.type}-qr-code.png`)}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}