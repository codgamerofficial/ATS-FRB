import { ResumeData } from '@/types';

export const saswataResumeData: ResumeData = {
  personalInfo: {
    fullName: 'SASWATA DEY',
    email: 'saswatadey700@gmail.com',
    phone: '+91 8145172429 / +91 7319280024',
    location: 'Contai, West Bengal, India | Current: Kolkata, West Bengal, India',
    linkedin: '',
    github: '',
    website: ''
  },
  summary: 'Analytical and performance-driven Computer Science & Engineering undergraduate with hands-on experience in data analytics, GIS drone data processing, administration, and customer engagement. Skilled in Power BI, Excel, SQL, and GIS mapping tools, with strong communication, analytical, and teamwork skills. Adept at integrating technical knowledge and business acumen to deliver impactful, data-driven insights and solutions.',
  education: [
    {
      id: '1',
      institution: 'KIIT University',
      degree: 'B.Tech',
      field: 'Computer Science & Engineering',
      startDate: '2022',
      endDate: '2025',
      gpa: '6.15 CGPA',
      description: 'Bhubaneswar, Odisha'
    },
    {
      id: '2',
      institution: 'KIIT Polytechnic',
      degree: 'Diploma',
      field: 'Computer Science & Engineering',
      startDate: '2019',
      endDate: '2022',
      gpa: '71%',
      description: 'Bhubaneswar, Odisha'
    },
    {
      id: '3',
      institution: 'Contai High School',
      degree: '10th Matric',
      field: 'General',
      startDate: '2018',
      endDate: '2019',
      gpa: '68%',
      description: 'West Bengal'
    }
  ],
  experience: [
    {
      id: '1',
      company: 'Digital Indian Business Solution Pvt. Ltd.',
      position: 'Drone Data Processor (GIS Intern)',
      location: 'Remote',
      startDate: 'Aug 2025',
      endDate: 'Dec 2025',
      current: false,
      description: [
        'Processed and analyzed drone and GIS data for mapping, surveying, and infrastructure development',
        'Used ArcGIS, QGIS, and photogrammetry tools to visualize and interpret spatial data',
        'Collaborated with technical teams to maintain accuracy in geospatial datasets',
        'Enhanced project deliverables through spatial analytics and 3D terrain modeling'
      ]
    },
    {
      id: '2',
      company: 'Indian Oil Corporation Ltd.',
      position: 'Administration Intern',
      location: 'India',
      startDate: 'May 2025',
      endDate: 'Jul 2025',
      current: false,
      description: [
        'Supported daily administrative operations and data management for internal departments',
        'Coordinated with vendors and departments for document processing and communication',
        'Provided customer and employee support, ensuring efficient query resolution and documentation accuracy'
      ]
    },
    {
      id: '3',
      company: 'HighRadius Technologies',
      position: 'Sales & Marketing Intern',
      location: 'Remote',
      startDate: 'May 2024',
      endDate: 'Jun 2024',
      current: false,
      description: [
        'Conducted B2B lead generation and CRM-based outreach using LinkedIn and internal systems',
        'Delivered product demos, presentations, and managed client relationships using Salesforce',
        'Contributed to marketing campaigns that improved conversion rates and engagement metrics'
      ]
    },
    {
      id: '4',
      company: 'Deyan Infratech Pvt. Ltd.',
      position: 'Administration Intern',
      location: 'India',
      startDate: 'Jan 2022',
      endDate: 'Dec 2022',
      current: false,
      description: [
        'Managed backend operations, ensuring data consistency and workflow optimization',
        'Handled sensitive documentation with confidentiality and diligence'
      ]
    }
  ],
  projects: [
    {
      id: '1',
      name: 'Automatic License Plate Recognition (Major Project)',
      description: 'Developed a license plate recognition system using Python, OpenCV, and Tesseract OCR. Implemented TensorFlow/Keras models for real-time detection and classification.',
      technologies: ['Python', 'OpenCV', 'Tesseract OCR', 'TensorFlow', 'Keras'],
      link: '',
      github: ''
    },
    {
      id: '2',
      name: 'Pothole Detection using Computer Vision and IoT (Minor Project)',
      description: 'Created a system using YOLOv5, TensorFlow, and Python to detect potholes and alert via GPS mapping. Enhanced road maintenance efficiency using automated data collection and reporting.',
      technologies: ['YOLOv5', 'TensorFlow', 'Python', 'IoT', 'GPS'],
      link: '',
      github: ''
    }
  ],
  skills: [
    {
      category: 'Data Tools',
      items: ['MS Excel', 'Power BI', 'SQL (Basic)', 'GIS (ArcGIS, QGIS)']
    },
    {
      category: 'CRM Tools',
      items: ['HubSpot', 'Salesforce']
    },
    {
      category: 'Technical',
      items: ['Python (Intermediate)', 'HTML', 'CSS', 'JavaScript (Basic)']
    },
    {
      category: 'Soft Skills',
      items: ['Communication', 'Teamwork', 'Problem Solving', 'Client Handling']
    },
    {
      category: 'Non-Technical',
      items: ['Chat Support', 'Customer Support', 'Email Marketing']
    },
    {
      category: 'Other',
      items: ['Typing Speed 30+ WPM', 'MS Office Suite']
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'Sales & Marketing',
      issuer: 'HighRadius Technologies',
      date: '2024',
      link: ''
    },
    {
      id: '2',
      name: 'Web Development',
      issuer: 'Cognifyz Technology',
      date: '2024',
      link: ''
    },
    {
      id: '3',
      name: 'Supply Chain Operations Academy (SCOA)',
      issuer: 'Flipkart',
      date: '2024',
      link: ''
    }
  ],
  languages: ['English (Intermediate)', 'Hindi', 'Bengali (Native)'],
  hobbies: ['Cricket', 'Football', 'Photography', 'Gaming', 'Running']
};