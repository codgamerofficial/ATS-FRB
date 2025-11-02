import { ResumeData } from '@/types';

// Simple QR code generation using a public API
export async function generateQRCode(data: string, size: number = 200): Promise<string> {
  try {
    const encodedData = encodeURIComponent(data);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedData}&format=png&margin=10`;
    
    // Convert to base64 for embedding
    const response = await fetch(qrUrl);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Failed to generate QR code:', error);
    throw error;
  }
}

export interface QRCodeOptions {
  includeContact?: boolean;
  includePortfolio?: boolean;
  includeLinkedIn?: boolean;
  includeGitHub?: boolean;
  customMessage?: string;
  size?: number;
}

export async function generateResumeQR(
  resume: ResumeData, 
  options: QRCodeOptions = {}
): Promise<string> {
  const {
    includeContact = true,
    includePortfolio = true,
    includeLinkedIn = true,
    includeGitHub = true,
    customMessage,
    size = 200
  } = options;

  let qrData = '';

  if (customMessage) {
    qrData = customMessage;
  } else {
    // Build vCard format for contact info
    const vCard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${resume.personalInfo.fullName}`,
      includeContact && resume.personalInfo.email ? `EMAIL:${resume.personalInfo.email}` : '',
      includeContact && resume.personalInfo.phone ? `TEL:${resume.personalInfo.phone}` : '',
      resume.personalInfo.location ? `ADR:;;${resume.personalInfo.location};;;` : '',
      includePortfolio && resume.personalInfo.website ? `URL:${resume.personalInfo.website}` : '',
      includeLinkedIn && resume.personalInfo.linkedin ? `URL:${resume.personalInfo.linkedin}` : '',
      includeGitHub && resume.personalInfo.github ? `URL:${resume.personalInfo.github}` : '',
      resume.summary ? `NOTE:${resume.summary.substring(0, 100)}...` : '',
      'END:VCARD'
    ].filter(line => line && line !== '').join('\n');

    qrData = vCard;
  }

  return generateQRCode(qrData, size);
}

export async function generatePortfolioQR(url: string, size: number = 200): Promise<string> {
  return generateQRCode(url, size);
}

export async function generateContactQR(resume: ResumeData, size: number = 200): Promise<string> {
  const contactInfo = [
    `Name: ${resume.personalInfo.fullName}`,
    resume.personalInfo.email ? `Email: ${resume.personalInfo.email}` : '',
    resume.personalInfo.phone ? `Phone: ${resume.personalInfo.phone}` : '',
    resume.personalInfo.location ? `Location: ${resume.personalInfo.location}` : ''
  ].filter(info => info).join('\n');

  return generateQRCode(contactInfo, size);
}

export function downloadQRCode(qrDataUrl: string, filename: string = 'resume-qr-code.png') {
  const link = document.createElement('a');
  link.href = qrDataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// QR Code component data for easy integration
export interface QRCodeData {
  dataUrl: string;
  type: 'contact' | 'portfolio' | 'custom';
  description: string;
}

export async function generateMultipleQRCodes(resume: ResumeData): Promise<QRCodeData[]> {
  const qrCodes: QRCodeData[] = [];

  try {
    // Contact QR
    const contactQR = await generateContactQR(resume);
    qrCodes.push({
      dataUrl: contactQR,
      type: 'contact',
      description: 'Contact Information'
    });

    // Portfolio QR (if website exists)
    if (resume.personalInfo.website) {
      const portfolioQR = await generatePortfolioQR(resume.personalInfo.website);
      qrCodes.push({
        dataUrl: portfolioQR,
        type: 'portfolio',
        description: 'Portfolio Website'
      });
    }

    // LinkedIn QR (if LinkedIn exists)
    if (resume.personalInfo.linkedin) {
      const linkedinQR = await generatePortfolioQR(resume.personalInfo.linkedin);
      qrCodes.push({
        dataUrl: linkedinQR,
        type: 'custom',
        description: 'LinkedIn Profile'
      });
    }

  } catch (error) {
    console.error('Failed to generate QR codes:', error);
  }

  return qrCodes;
}