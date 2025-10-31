'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Phone, Mail, Globe, MapPin, Download, Github } from 'lucide-react';
import Button from '@/components/ui/Button';
import DarkModeToggle from '@/components/ui/DarkModeToggle';

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-bounce" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-40 right-10 w-28 h-28 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-xl animate-bounce" />
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about');

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            SASWATA DEY
          </motion.h1>
          
          <nav className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`transition-colors ${
                  activeSection === section.id 
                    ? 'text-cyan-400' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <DarkModeToggle />
        </div>
      </header>

      <div className="pt-20 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="relative h-screen flex items-center justify-center">
          <AnimatedBackground />
          <motion.div 
            className="text-center z-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              SASWATA DEY
            </motion.h1>
            <motion.p 
              className="text-xl text-white/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Developer & Data Analyst
            </motion.p>
            <motion.div 
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg animate-spin" />
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce" />
              <div className="w-20 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse" />
            </motion.div>
          </motion.div>
        </div>

        <div className="p-8 overflow-y-auto h-screen">
          {activeSection === 'about' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Developer & Data Analyst
                </h2>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-cyan-400" />
                    <span>+91 8145172429</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>saswatadey700@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>Contai, West Bengal, India</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button size="sm" className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Portfolio
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    GitHub
                  </Button>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Professional Summary</h3>
                <p className="text-white/80 leading-relaxed">
                  Analytical and performance-driven Computer Science & Engineering undergraduate with hands-on experience in data analytics, GIS drone data processing, administration, and customer engagement. Skilled in Power BI, Excel, SQL, and GIS mapping tools.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Education</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">B.Tech in Computer Science & Engineering</h4>
                    <p className="text-white/70">KIIT University, Bhubaneswar | 2022 – 2025 | CGPA: 6.15</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Diploma in Computer Science & Engineering</h4>
                    <p className="text-white/70">KIIT Polytechnic, Bhubaneswar | 2019 – 2022 | 71%</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'experience' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-cyan-400">Experience</h2>
              
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-purple-400">Drone Data Processor (GIS Intern)</h3>
                  <p className="text-white/70 mb-2">Digital Indian Business Solution Pvt. Ltd. | Aug 2025 – Dec 2025</p>
                  <ul className="list-disc list-inside space-y-1 text-white/80">
                    <li>Processed and analyzed drone and GIS data for mapping and surveying</li>
                    <li>Used ArcGIS, QGIS, and photogrammetry tools for spatial data visualization</li>
                    <li>Enhanced project deliverables through spatial analytics and 3D terrain modeling</li>
                  </ul>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-purple-400">Administration Intern</h3>
                  <p className="text-white/70 mb-2">Indian Oil Corporation Ltd. | May 2025 – Jul 2025</p>
                  <ul className="list-disc list-inside space-y-1 text-white/80">
                    <li>Supported daily administrative operations and data management</li>
                    <li>Coordinated with vendors and departments for document processing</li>
                    <li>Provided customer and employee support with efficient query resolution</li>
                  </ul>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-purple-400">Sales & Marketing Intern</h3>
                  <p className="text-white/70 mb-2">HighRadius Technologies | May 2024 – Jun 2024</p>
                  <ul className="list-disc list-inside space-y-1 text-white/80">
                    <li>Conducted B2B lead generation and CRM-based outreach</li>
                    <li>Delivered product demos and managed client relationships using Salesforce</li>
                    <li>Contributed to marketing campaigns improving conversion rates</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'projects' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-cyan-400">Projects</h2>
              
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-purple-400">Automatic License Plate Recognition</h3>
                  <p className="text-white/70 mb-2">Major Project</p>
                  <p className="text-white/80 mb-3">
                    Developed a license plate recognition system using Python, OpenCV, and Tesseract OCR. 
                    Implemented TensorFlow/Keras models for real-time detection and classification.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Python</span>
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">OpenCV</span>
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">TensorFlow</span>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-purple-400">Pothole Detection using Computer Vision</h3>
                  <p className="text-white/70 mb-2">Minor Project</p>
                  <p className="text-white/80 mb-3">
                    Created a system using YOLOv5, TensorFlow, and Python to detect potholes and alert via GPS mapping. 
                    Enhanced road maintenance efficiency using automated data collection.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">YOLOv5</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Python</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">IoT</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'skills' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-cyan-400">Skills</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Data Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {['MS Excel', 'Power BI', 'SQL', 'ArcGIS', 'QGIS'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Technical</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'HTML', 'CSS', 'JavaScript', 'OpenCV', 'TensorFlow'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">CRM Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {['HubSpot', 'Salesforce'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Communication', 'Teamwork', 'Problem Solving', 'Client Handling'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'contact' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-cyan-400">Get In Touch</h2>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-cyan-400" />
                    <span>+91 8145172429</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span>saswatadey700@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    <span>https://atsfrb.vercel.app/</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-cyan-400" />
                    <span>https://github.com/codgamerofficial</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span>Contai, West Bengal, India | Willing to Relocate</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-lg font-semibold mb-3 text-purple-400">Languages</h3>
                  <p className="text-white/80">English (Intermediate), Hindi, Bengali (Native)</p>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-lg font-semibold mb-3 text-purple-400">Hobbies & Interests</h3>
                  <p className="text-white/80">Cricket, Football, Photography, Gaming, and Running</p>
                </div>

                <div className="mt-6 flex gap-4">
                  <Button className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Resume
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Contact Me
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}