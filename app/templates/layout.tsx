import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume Templates - 100+ Professional ATS-Friendly Designs | ATSFRB',
  description: 'Choose from 100+ professional resume templates. Modern, classic, creative designs optimized for ATS systems. Free and premium options available.',
  keywords: 'resume templates, ATS resume, professional resume, resume builder, CV templates',
  openGraph: {
    title: 'Professional Resume Templates - ATSFRB',
    description: '100+ ATS-optimized resume templates for every industry and career level',
    type: 'website'
  }
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}