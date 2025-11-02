'use client';

import { ExternalLink, Star, Users, BookOpen, Briefcase, PenTool } from 'lucide-react';
import SciFiCard from '@/components/ui/SciFiCard';
import Button from '@/components/ui/Button';

const jobBoards = [
  {
    name: 'Indeed',
    logo: '🔍',
    description: 'World\'s #1 job site with millions of opportunities',
    url: 'https://indeed.com',
    category: 'Job Search',
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'LinkedIn Jobs',
    logo: '💼',
    description: 'Professional network with premium job matching',
    url: 'https://linkedin.com/jobs',
    category: 'Professional Network',
    color: 'from-blue-600 to-blue-700'
  },
  {
    name: 'Naukri.com',
    logo: '🇮🇳',
    description: 'India\'s leading job portal with 6 crore+ registered users',
    url: 'https://naukri.com',
    category: 'India Jobs',
    color: 'from-orange-500 to-red-500'
  },
  {
    name: 'Monster.com',
    logo: '👹',
    description: 'Global career network connecting talent with opportunities',
    url: 'https://monster.com',
    category: 'Global Jobs',
    color: 'from-purple-500 to-purple-600'
  }
];

const careerCourses = [
  {
    name: 'Udemy',
    logo: '🎓',
    description: '213,000+ courses in technology, business, and creative skills',
    url: 'https://udemy.com',
    category: 'Online Learning',
    color: 'from-purple-600 to-pink-500',
    rating: 4.5,
    students: '57M+'
  },
  {
    name: 'Coursera',
    logo: '📚',
    description: 'University-level courses from top institutions worldwide',
    url: 'https://coursera.org',
    category: 'Academic Courses',
    color: 'from-blue-500 to-cyan-500',
    rating: 4.7,
    students: '100M+'
  },
  {
    name: 'Coding Bootcamps',
    logo: '💻',
    description: 'Intensive coding programs for career transformation',
    url: '#',
    category: 'Programming',
    color: 'from-green-500 to-teal-500',
    rating: 4.6,
    students: '500K+'
  },
  {
    name: 'University Programs',
    logo: '🏛️',
    description: 'Degree programs and certifications from top universities',
    url: '#',
    category: 'Higher Education',
    color: 'from-indigo-500 to-purple-500',
    rating: 4.8,
    students: '10M+'
  }
];

const professionalServices = [
  {
    name: 'Resume Writing Pro',
    logo: '✍️',
    description: 'Professional resume writers with 95% success rate',
    price: '$99-299',
    features: ['ATS Optimization', 'Industry Experts', '60-day Guarantee'],
    url: '#',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    name: 'Career Coaching',
    logo: '🎯',
    description: 'One-on-one career guidance from industry professionals',
    price: '$150-500',
    features: ['Interview Prep', 'Salary Negotiation', 'Career Strategy'],
    url: '#',
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'LinkedIn Optimization',
    logo: '💼',
    description: 'Professional LinkedIn profile makeover service',
    price: '$79-199',
    features: ['Profile Optimization', 'Keyword Research', 'Network Growth'],
    url: '#',
    color: 'from-blue-600 to-indigo-500'
  }
];

const careerTools = [
  {
    name: 'Grammarly',
    logo: '📝',
    description: 'AI-powered writing assistant for error-free documents',
    url: 'https://grammarly.com',
    category: 'Writing Tools',
    color: 'from-green-500 to-green-600',
    offer: '20% OFF Premium'
  },
  {
    name: 'Canva Pro',
    logo: '🎨',
    description: 'Design platform for creating stunning visual resumes',
    url: 'https://canva.com',
    category: 'Design Tools',
    color: 'from-purple-500 to-pink-500',
    offer: 'Free 30-day Trial'
  },
  {
    name: 'Notion',
    logo: '📋',
    description: 'All-in-one workspace for job search organization',
    url: 'https://notion.so',
    category: 'Productivity',
    color: 'from-gray-600 to-gray-700',
    offer: 'Free for Personal Use'
  }
];

export default function PartnershipsSection() {
  return (
    <div className="space-y-12">
      {/* Job Boards Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">🔍 Find Your Dream Job</h2>
          <p className="text-cyan-100 max-w-2xl mx-auto">
            Explore millions of job opportunities on top job boards and professional networks
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobBoards.map((board, index) => (
            <SciFiCard key={index} className="group hover:scale-105 transition-all duration-300" variant="glow">
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">{board.logo}</div>
                <h3 className="text-lg font-bold text-white mb-2">{board.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{board.description}</p>
                <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs mb-4">
                  {board.category}
                </span>
                <a href={board.url} target="_blank" rel="noopener noreferrer">
                  <Button className={`w-full bg-gradient-to-r ${board.color} hover:shadow-lg`}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Explore Jobs
                  </Button>
                </a>
              </div>
            </SciFiCard>
          ))}
        </div>
      </section>

      {/* Career Courses Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">📚 Advance Your Skills</h2>
          <p className="text-cyan-100 max-w-2xl mx-auto">
            Learn new skills and advance your career with courses from top platforms and institutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {careerCourses.map((course, index) => (
            <SciFiCard key={index} className="group hover:scale-105 transition-all duration-300" variant="premium">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{course.logo}</div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 text-sm">{course.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{course.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{course.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                    {course.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-400 text-xs">{course.students}</span>
                  </div>
                </div>
                
                <a href={course.url} target="_blank" rel="noopener noreferrer">
                  <Button className={`w-full bg-gradient-to-r ${course.color} hover:shadow-lg`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Learning
                  </Button>
                </a>
              </div>
            </SciFiCard>
          ))}
        </div>
      </section>

      {/* Professional Services Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">🎯 Professional Services</h2>
          <p className="text-cyan-100 max-w-2xl mx-auto">
            Get expert help from professional resume writers, career coaches, and industry specialists
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {professionalServices.map((service, index) => (
            <SciFiCard key={index} className="group hover:scale-105 transition-all duration-300">
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{service.logo}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{service.description}</p>
                  <div className="text-2xl font-bold text-cyan-400 mb-4">{service.price}</div>
                </div>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg`}>
                  <Briefcase className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              </div>
            </SciFiCard>
          ))}
        </div>
      </section>

      {/* Career Tools Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">🛠️ Essential Career Tools</h2>
          <p className="text-cyan-100 max-w-2xl mx-auto">
            Boost your productivity and create professional documents with these essential tools
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {careerTools.map((tool, index) => (
            <SciFiCard key={index} className="group hover:scale-105 transition-all duration-300" variant="glow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{tool.logo}</div>
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">
                    {tool.offer}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{tool.description}</p>
                
                <span className="inline-block px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs mb-4">
                  {tool.category}
                </span>
                
                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                  <Button className={`w-full bg-gradient-to-r ${tool.color} hover:shadow-lg`}>
                    <PenTool className="h-4 w-4 mr-2" />
                    Try Now
                  </Button>
                </a>
              </div>
            </SciFiCard>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <SciFiCard className="inline-block" variant="premium">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-white mb-4">🚀 Ready to Accelerate Your Career?</h3>
            <p className="text-cyan-200 mb-6 max-w-md">
              Combine our resume builder with these powerful tools and services to land your dream job faster.
            </p>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 px-8 py-3">
              Start Building Your Future
            </Button>
          </div>
        </SciFiCard>
      </section>
    </div>
  );
}