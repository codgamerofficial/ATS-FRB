import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ATSFRB - AI-Powered Resume Builder | Create ATS-Friendly Resumes',
  description: 'Build professional, ATS-optimized resumes with ATSFRB. Our AI-powered resume builder helps you create stunning resumes that get you hired. Free templates, instant PDF download.',
  keywords: 'ATSFRB, ATS resume builder, AI resume builder, professional resume, CV builder, job application, resume templates',
  authors: [{ name: 'Saswata Dey' }],
  creator: 'Saswata Dey',
  publisher: 'ATSFRB',
  robots: 'index, follow',
  openGraph: {
    title: 'ATSFRB - AI-Powered Resume Builder',
    description: 'Create professional, ATS-friendly resumes that get you hired',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATSFRB - AI-Powered Resume Builder',
    description: 'Create professional, ATS-friendly resumes that get you hired',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}