'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Zap, Download, Shield, Star, Users, Github, ExternalLink, Phone, Mail, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import UserMenu from '@/components/ui/UserMenu';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import SplashScreen from '@/components/3d/SplashScreen';
import SciFiBackground from '@/components/ui/SciFiBackground';
import SciFiCard from '@/components/ui/SciFiCard';
import Logo from '@/components/ui/Logo';
import RealtimeWidget from '@/components/realtime/RealtimeWidget';
import NewsWidget from '@/components/realtime/NewsWidget';
import LocationMap from '@/components/realtime/LocationMap';
import { useAuth } from '@/hooks/useAuth';
import { useDarkMode } from '@/hooks/useDarkMode';
import Link from 'next/link';

const features = [
  {
    icon: <Zap className="h-8 w-8" />,
    title: '⚡ AI-Powered ATS',
    description: 'Smart algorithms ensure 95% ATS pass rate. Beat the bots, reach humans.'
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: '🎨 Designer Templates',
    description: '100+ stunning templates crafted by top designers. Stand out professionally.'
  },
  {
    icon: <Download className="h-8 w-8" />,
    title: '⚡ Instant Export',
    description: 'One-click PDF download. Multiple formats. Ready for any application.'
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: '🔒 Military-Grade Security',
    description: 'Bank-level encryption. Your data stays private. GDPR compliant.'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Senior Software Engineer @ Google',
    content: 'Landed my $180k Google offer in 3 weeks! The ATS optimization is game-changing. 10/10 recommend!',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Marketing Director @ Microsoft',
    content: 'From 0 to 15 interview calls in one month. The AI suggestions were spot-on. Career transformed!',
    rating: 5
  },
  {
    name: 'Emily Davis',
    role: 'Lead Data Scientist @ Amazon',
    content: 'Beautiful templates + smart AI = dream job at Amazon. Worth every penny. Simply amazing!',
    rating: 5
  }
];

const topColleges = [
  {
    name: 'Indian Institute of Technology Delhi',
    location: 'New Delhi',
    ranking: 1,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
    website: 'https://home.iitd.ac.in/',
    phone: '+91-11-2659-1000',
    email: 'registrar@admin.iitd.ac.in',
    established: 1961,
    type: 'Engineering & Technology'
  },
  {
    name: 'Indian Institute of Science Bangalore',
    location: 'Bangalore, Karnataka',
    ranking: 2,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    website: 'https://www.iisc.ac.in/',
    phone: '+91-80-2293-2001',
    email: 'registrar@iisc.ac.in',
    established: 1909,
    type: 'Science & Research'
  },
  {
    name: 'Indian Institute of Technology Bombay',
    location: 'Mumbai, Maharashtra',
    ranking: 3,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    website: 'https://www.iitb.ac.in/',
    phone: '+91-22-2572-2545',
    email: 'registrar@iitb.ac.in',
    established: 1958,
    type: 'Engineering & Technology'
  },
  {
    name: 'All India Institute of Medical Sciences Delhi',
    location: 'New Delhi',
    ranking: 4,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
    website: 'https://www.aiims.edu/',
    phone: '+91-11-2658-8500',
    email: 'director@aiims.ac.in',
    established: 1956,
    type: 'Medical Sciences'
  },
  {
    name: 'Indian Institute of Technology Madras',
    location: 'Chennai, Tamil Nadu',
    ranking: 5,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
    website: 'https://www.iitm.ac.in/',
    phone: '+91-44-2257-4802',
    email: 'registrar@iitm.ac.in',
    established: 1959,
    type: 'Engineering & Technology'
  },
  {
    name: 'Indian Institute of Technology Kanpur',
    location: 'Kanpur, Uttar Pradesh',
    ranking: 6,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
    website: 'https://www.iitk.ac.in/',
    phone: '+91-512-259-7000',
    email: 'registrar@iitk.ac.in',
    established: 1959,
    type: 'Engineering & Technology'
  },
  {
    name: 'Jawaharlal Nehru University',
    location: 'New Delhi',
    ranking: 7,
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop',
    website: 'https://www.jnu.ac.in/',
    phone: '+91-11-2670-4000',
    email: 'registrar@mail.jnu.ac.in',
    established: 1969,
    type: 'Liberal Arts & Sciences'
  },
  {
    name: 'University of Delhi',
    location: 'New Delhi',
    ranking: 8,
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop',
    website: 'http://www.du.ac.in/',
    phone: '+91-11-2766-7049',
    email: 'registrar@du.ac.in',
    established: 1922,
    type: 'Multidisciplinary'
  },
  {
    name: 'Indian Institute of Technology Kharagpur',
    location: 'Kharagpur, West Bengal',
    ranking: 9,
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop',
    website: 'http://www.iitkgp.ac.in/',
    phone: '+91-3222-255-221',
    email: 'registrar@adm.iitkgp.ac.in',
    established: 1951,
    type: 'Engineering & Technology'
  },
  {
    name: 'Banaras Hindu University',
    location: 'Varanasi, Uttar Pradesh',
    ranking: 10,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    website: 'https://www.bhu.ac.in/',
    phone: '+91-542-230-7000',
    email: 'registrar@bhu.ac.in',
    established: 1916,
    type: 'Multidisciplinary'
  },
  {
    name: 'Indian Institute of Technology Roorkee',
    location: 'Roorkee, Uttarakhand',
    ranking: 11,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
    website: 'https://www.iitr.ac.in/',
    phone: '+91-1332-285-311',
    email: 'registrar@iitr.ac.in',
    established: 1847,
    type: 'Engineering & Technology'
  },
  {
    name: 'Jadavpur University',
    location: 'Kolkata, West Bengal',
    ranking: 12,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    website: 'http://www.jaduniv.edu.in/',
    phone: '+91-33-2414-6666',
    email: 'registrar@jaduniv.edu.in',
    established: 1955,
    type: 'Engineering & Arts'
  },
  {
    name: 'Indian Institute of Technology Guwahati',
    location: 'Guwahati, Assam',
    ranking: 13,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
    website: 'https://www.iitg.ac.in/',
    phone: '+91-361-258-2000',
    email: 'registrar@iitg.ac.in',
    established: 1994,
    type: 'Engineering & Technology'
  },
  {
    name: 'Anna University',
    location: 'Chennai, Tamil Nadu',
    ranking: 14,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
    website: 'https://www.annauniv.edu/',
    phone: '+91-44-2235-7000',
    email: 'registrar@annauniv.edu',
    established: 1978,
    type: 'Engineering & Technology'
  },
  {
    name: 'Indian Institute of Technology Hyderabad',
    location: 'Hyderabad, Telangana',
    ranking: 15,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
    website: 'https://www.iith.ac.in/',
    phone: '+91-40-2301-6000',
    email: 'registrar@iith.ac.in',
    established: 2008,
    type: 'Engineering & Technology'
  },
  {
    name: 'Aligarh Muslim University',
    location: 'Aligarh, Uttar Pradesh',
    ranking: 16,
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop',
    website: 'https://www.amu.ac.in/',
    phone: '+91-571-270-0920',
    email: 'registrar@amu.ac.in',
    established: 1875,
    type: 'Multidisciplinary'
  },
  {
    name: 'Calcutta University',
    location: 'Kolkata, West Bengal',
    ranking: 17,
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop',
    website: 'http://www.caluniv.ac.in/',
    phone: '+91-33-2241-3800',
    email: 'registrar@caluniv.ac.in',
    established: 1857,
    type: 'Multidisciplinary'
  },
  {
    name: 'Indian Institute of Technology Indore',
    location: 'Indore, Madhya Pradesh',
    ranking: 18,
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop',
    website: 'https://www.iiti.ac.in/',
    phone: '+91-731-660-3000',
    email: 'registrar@iiti.ac.in',
    established: 2009,
    type: 'Engineering & Technology'
  },
  {
    name: 'Manipal Academy of Higher Education',
    location: 'Manipal, Karnataka',
    ranking: 19,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    website: 'https://manipal.edu/',
    phone: '+91-820-292-3000',
    email: 'registrar@manipal.edu',
    established: 1953,
    type: 'Medical & Engineering'
  },
  {
    name: 'Vellore Institute of Technology',
    location: 'Vellore, Tamil Nadu',
    ranking: 20,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    website: 'https://vit.ac.in/',
    phone: '+91-416-220-2000',
    email: 'registrar@vit.ac.in',
    established: 1984,
    type: 'Engineering & Technology'
  },
  {
    name: 'Birla Institute of Technology and Science',
    location: 'Pilani, Rajasthan',
    ranking: 21,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
    website: 'https://www.bits-pilani.ac.in/',
    phone: '+91-1596-242-204',
    email: 'registrar@pilani.bits-pilani.ac.in',
    established: 1964,
    type: 'Engineering & Sciences'
  },
  {
    name: 'Indian Institute of Technology Bhubaneswar',
    location: 'Bhubaneswar, Odisha',
    ranking: 22,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
    website: 'https://www.iitbbs.ac.in/',
    phone: '+91-674-713-5000',
    email: 'registrar@iitbbs.ac.in',
    established: 2008,
    type: 'Engineering & Technology'
  },
  {
    name: 'Jamia Millia Islamia',
    location: 'New Delhi',
    ranking: 23,
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop',
    website: 'https://www.jmi.ac.in/',
    phone: '+91-11-2698-1717',
    email: 'registrar@jmi.ac.in',
    established: 1920,
    type: 'Multidisciplinary'
  },
  {
    name: 'Indian Institute of Technology Gandhinagar',
    location: 'Gandhinagar, Gujarat',
    ranking: 24,
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop',
    website: 'https://www.iitgn.ac.in/',
    phone: '+91-79-2395-2000',
    email: 'registrar@iitgn.ac.in',
    established: 2008,
    type: 'Engineering & Technology'
  },
  {
    name: 'Amrita Vishwa Vidyapeetham',
    location: 'Coimbatore, Tamil Nadu',
    ranking: 25,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
    website: 'https://www.amrita.edu/',
    phone: '+91-422-268-5000',
    email: 'registrar@amrita.edu',
    established: 2003,
    type: 'Multidisciplinary'
  },
  {
    name: 'Thapar Institute of Engineering and Technology',
    location: 'Patiala, Punjab',
    ranking: 26,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
    website: 'https://www.thapar.edu/',
    phone: '+91-175-239-3021',
    email: 'registrar@thapar.edu',
    established: 1956,
    type: 'Engineering & Technology'
  },
  {
    name: 'Indian Institute of Technology Patna',
    location: 'Patna, Bihar',
    ranking: 27,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
    website: 'https://www.iitp.ac.in/',
    phone: '+91-612-302-8000',
    email: 'registrar@iitp.ac.in',
    established: 2008,
    type: 'Engineering & Technology'
  },
  {
    name: 'Osmania University',
    location: 'Hyderabad, Telangana',
    ranking: 28,
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop',
    website: 'https://www.osmania.ac.in/',
    phone: '+91-40-2709-8000',
    email: 'registrar@osmania.ac.in',
    established: 1918,
    type: 'Multidisciplinary'
  },
  {
    name: 'Indian Institute of Technology Mandi',
    location: 'Mandi, Himachal Pradesh',
    ranking: 29,
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop',
    website: 'https://www.iitmandi.ac.in/',
    phone: '+91-1905-267-000',
    email: 'registrar@iitmandi.ac.in',
    established: 2009,
    type: 'Engineering & Technology'
  },
  {
    name: 'Saveetha Institute of Medical and Technical Sciences',
    location: 'Chennai, Tamil Nadu',
    ranking: 30,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
    website: 'https://www.saveetha.ac.in/',
    phone: '+91-44-6681-1000',
    email: 'registrar@saveetha.ac.in',
    established: 2005,
    type: 'Medical & Technical'
  },
  {
    name: 'Indian Institute of Technology Ropar',
    location: 'Rupnagar, Punjab',
    ranking: 31,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
    website: 'https://www.iitrpr.ac.in/',
    phone: '+91-1881-242-000',
    email: 'registrar@iitrpr.ac.in',
    established: 2008,
    type: 'Engineering & Technology'
  },
  {
    name: 'Panjab University',
    location: 'Chandigarh',
    ranking: 32,
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop',
    website: 'https://puchd.ac.in/',
    phone: '+91-172-253-4000',
    email: 'registrar@pu.ac.in',
    established: 1882,
    type: 'Multidisciplinary'
  },
  {
    name: 'Indian Institute of Technology Varanasi',
    location: 'Varanasi, Uttar Pradesh',
    ranking: 33,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
    website: 'https://www.iitbhu.ac.in/',
    phone: '+91-542-716-5000',
    email: 'registrar@iitbhu.ac.in',
    established: 2012,
    type: 'Engineering & Technology'
  },
  {
    name: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    ranking: 34,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    website: 'https://www.lpu.in/',
    phone: '+91-1824-517-000',
    email: 'registrar@lpu.co.in',
    established: 2005,
    type: 'Multidisciplinary'
  },
  {
    name: 'Indian Institute of Technology Jodhpur',
    location: 'Jodhpur, Rajasthan',
    ranking: 35,
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop',
    website: 'https://www.iitj.ac.in/',
    phone: '+91-291-280-1000',
    email: 'registrar@iitj.ac.in',
    established: 2008,
    type: 'Engineering & Technology'
  },
  {
    name: 'Cochin University of Science and Technology',
    location: 'Kochi, Kerala',
    ranking: 36,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    website: 'https://cusat.ac.in/',
    phone: '+91-484-286-0000',
    email: 'registrar@cusat.ac.in',
    established: 1971,
    type: 'Science & Technology'
  },
  {
    name: 'Indian Institute of Technology Tirupati',
    location: 'Tirupati, Andhra Pradesh',
    ranking: 37,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
    website: 'https://www.iittp.ac.in/',
    phone: '+91-877-250-3000',
    email: 'registrar@iittp.ac.in',
    established: 2015,
    type: 'Engineering & Technology'
  },
  {
    name: 'SRM Institute of Science and Technology',
    location: 'Chennai, Tamil Nadu',
    ranking: 38,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
    website: 'https://www.srmist.edu.in/',
    phone: '+91-44-2741-7000',
    email: 'registrar@srmist.edu.in',
    established: 1985,
    type: 'Science & Technology'
  },
  {
    name: 'Indian Institute of Technology Bhilai',
    location: 'Bhilai, Chhattisgarh',
    ranking: 39,
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop',
    website: 'https://www.iitbhilai.ac.in/',
    phone: '+91-788-244-2000',
    email: 'registrar@iitbhilai.ac.in',
    established: 2016,
    type: 'Engineering & Technology'
  },
  {
    name: 'Kalinga Institute of Industrial Technology',
    location: 'Bhubaneswar, Odisha',
    ranking: 40,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
    website: 'https://kiit.ac.in/',
    phone: '+91-674-272-5000',
    email: 'registrar@kiit.ac.in',
    established: 1992,
    type: 'Multidisciplinary'
  },
  {
    name: 'Indian Institute of Technology Goa',
    location: 'Goa',
    ranking: 41,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
    website: 'https://www.iitgoa.ac.in/',
    phone: '+91-832-240-0000',
    email: 'registrar@iitgoa.ac.in',
    established: 2016,
    type: 'Engineering & Technology'
  },
  {
    name: 'Bharathiar University',
    location: 'Coimbatore, Tamil Nadu',
    ranking: 42,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
    website: 'https://www.b-u.ac.in/',
    phone: '+91-422-242-2222',
    email: 'registrar@b-u.ac.in',
    established: 1982,
    type: 'Multidisciplinary'
  },
  {
    name: 'Indian Institute of Technology Palakkad',
    location: 'Palakkad, Kerala',
    ranking: 43,
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop',
    website: 'https://iitpkd.ac.in/',
    phone: '+91-491-256-2000',
    email: 'registrar@iitpkd.ac.in',
    established: 2015,
    type: 'Engineering & Technology'
  },
  {
    name: 'Shiv Nadar University',
    location: 'Greater Noida, Uttar Pradesh',
    ranking: 44,
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop',
    website: 'https://snu.edu.in/',
    phone: '+91-120-266-7000',
    email: 'registrar@snu.edu.in',
    established: 2011,
    type: 'Multidisciplinary'
  },
  {
    name: 'Indian Institute of Technology Jammu',
    location: 'Jammu, Jammu and Kashmir',
    ranking: 45,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
    website: 'https://www.iitjammu.ac.in/',
    phone: '+91-191-269-4000',
    email: 'registrar@iitjammu.ac.in',
    established: 2016,
    type: 'Engineering & Technology'
  },
  {
    name: 'Chandigarh University',
    location: 'Mohali, Punjab',
    ranking: 46,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    website: 'https://www.cuchd.in/',
    phone: '+91-160-300-5000',
    email: 'registrar@cuchd.in',
    established: 2012,
    type: 'Multidisciplinary'
  },
  {
    name: 'Indian Institute of Technology Dharwad',
    location: 'Dharwad, Karnataka',
    ranking: 47,
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop',
    website: 'https://www.iitdh.ac.in/',
    phone: '+91-836-277-1000',
    email: 'registrar@iitdh.ac.in',
    established: 2016,
    type: 'Engineering & Technology'
  },
  {
    name: 'Guru Gobind Singh Indraprastha University',
    location: 'New Delhi',
    ranking: 48,
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop',
    website: 'http://www.ipu.ac.in/',
    phone: '+91-11-2338-4200',
    email: 'registrar@ipu.ac.in',
    established: 1998,
    type: 'Multidisciplinary'
  },
  {
    name: 'Netaji Subhas University of Technology',
    location: 'New Delhi',
    ranking: 49,
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop',
    website: 'http://www.nsut.ac.in/',
    phone: '+91-11-2500-1000',
    email: 'registrar@nsut.ac.in',
    established: 1983,
    type: 'Engineering & Technology'
  },
  {
    name: 'Symbiosis International University',
    location: 'Pune, Maharashtra',
    ranking: 50,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    website: 'https://www.siu.edu.in/',
    phone: '+91-20-2528-1000',
    email: 'registrar@siu.edu.in',
    established: 2002,
    type: 'Multidisciplinary'
  },
  {
    name: 'Banasthali Vidyapith',
    location: 'Banasthali, Rajasthan',
    ranking: 51,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
    website: 'https://www.banasthali.ac.in/',
    phone: '+91-1438-228-341',
    email: 'registrar@banasthali.ac.in',
    established: 1935,
    type: 'Women University'
  },
  {
    name: 'Siksha O Anusandhan University',
    location: 'Bhubaneswar, Odisha',
    ranking: 52,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
    website: 'https://www.soa.ac.in/',
    phone: '+91-674-235-8999',
    email: 'registrar@soa.ac.in',
    established: 2007,
    type: 'Multidisciplinary'
  },
  {
    name: 'Bharati Vidyapeeth University',
    location: 'Pune, Maharashtra',
    ranking: 53,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    website: 'http://www.bharatividyapeeth.edu/',
    phone: '+91-20-2407-2100',
    email: 'registrar@bharatividyapeeth.edu',
    established: 1964,
    type: 'Multidisciplinary'
  },
  {
    name: 'Hindustan Institute of Technology and Science',
    location: 'Chennai, Tamil Nadu',
    ranking: 54,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
    website: 'https://www.hindustanuniv.ac.in/',
    phone: '+91-44-2247-2555',
    email: 'registrar@hindustanuniv.ac.in',
    established: 1985,
    type: 'Engineering & Technology'
  },
  {
    name: 'Chitkara University',
    location: 'Rajpura, Punjab',
    ranking: 55,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
    website: 'https://www.chitkara.edu.in/',
    phone: '+91-1762-507-000',
    email: 'registrar@chitkara.edu.in',
    established: 2010,
    type: 'Multidisciplinary'
  },
  {
    name: 'Graphic Era University',
    location: 'Dehradun, Uttarakhand',
    ranking: 56,
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop',
    website: 'https://www.geu.ac.in/',
    phone: '+91-135-280-8000',
    email: 'registrar@geu.ac.in',
    established: 2011,
    type: 'Engineering & Technology'
  },
  {
    name: 'Bennett University',
    location: 'Greater Noida, Uttar Pradesh',
    ranking: 57,
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop',
    website: 'https://www.bennett.edu.in/',
    phone: '+91-120-266-9100',
    email: 'registrar@bennett.edu.in',
    established: 2016,
    type: 'Multidisciplinary'
  },
  {
    name: 'Karunya Institute of Technology and Sciences',
    location: 'Coimbatore, Tamil Nadu',
    ranking: 58,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
    website: 'https://www.karunya.edu/',
    phone: '+91-422-261-4000',
    email: 'registrar@karunya.edu',
    established: 1986,
    type: 'Engineering & Sciences'
  },
  {
    name: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute',
    location: 'Chennai, Tamil Nadu',
    ranking: 59,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    website: 'https://www.veltech.edu.in/',
    phone: '+91-44-2262-5000',
    email: 'registrar@veltech.edu.in',
    established: 1997,
    type: 'Engineering & Technology'
  },
  {
    name: 'Centurion University of Technology and Management',
    location: 'Bhubaneswar, Odisha',
    ranking: 60,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
    website: 'https://cutm.ac.in/',
    phone: '+91-674-230-8000',
    email: 'registrar@cutm.ac.in',
    established: 2010,
    type: 'Technology & Management'
  },
  {
    name: 'Dayananda Sagar University',
    location: 'Bangalore, Karnataka',
    ranking: 61,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    website: 'https://www.dsu.edu.in/',
    phone: '+91-80-2843-3700',
    email: 'registrar@dsu.edu.in',
    established: 2014,
    type: 'Multidisciplinary'
  },
  {
    name: 'Jain University',
    location: 'Bangalore, Karnataka',
    ranking: 62,
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop',
    website: 'https://www.jainuniversity.ac.in/',
    phone: '+91-80-4343-0700',
    email: 'registrar@jainuniversity.ac.in',
    established: 2009,
    type: 'Multidisciplinary'
  }
];

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);
  const { user, loading } = useAuth();
  const { isDark } = useDarkMode();

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SciFiBackground isDark={isDark} />
      <nav className="bg-gray-900/20 backdrop-blur-md border-b border-cyan-500/30 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo size={32} />
              <span className="ml-2 text-xl font-bold text-cyan-400">ATSFRB</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/templates">
                <Button variant="ghost">Templates</Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="ghost">Portfolio</Button>
              </Link>
              <a 
                href="https://github.com/codgamerofficial/ATS-FRB" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/10 transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <DarkModeToggle />
              {!loading && (
                user ? (
                  <UserMenu />
                ) : (
                  <>
                    <Link href="/auth">
                      <Button variant="outline">Sign In</Button>
                    </Link>
                    <Link href="/builder">
                      <Button>Get Started</Button>
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                <span className="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-400 text-sm font-medium rounded-full border border-cyan-500/30 mb-4">
                  🚀 AI-Powered Resume Builder
                </span>
                <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight" style={{ textShadow: '0 0 30px rgba(0, 255, 255, 0.3)' }}>
                  Craft Your
                  <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                    Dream Career
                  </span>
                  in Minutes
                </h1>
                </motion.div>
              </div>
              
              <div className="text-lg text-cyan-100 mb-8 leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                Transform your career with our advanced AI resume builder. Create stunning, 
                ATS-optimized resumes that land interviews at top companies worldwide.
                </motion.p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                <Link href={user ? "/builder" : "/auth"}>
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                    {user ? "Continue Building" : "🎯 Start Building Free"}
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
                    📋 Browse Templates
                  </Button>
                </Link>
                </motion.div>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-cyan-200">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-cyan-400" />
                  50,000+ Happy Users
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-400" />
                  4.9★ Rating
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-green-400" />
                  Bank-Level Security
                </div>
                </motion.div>
              </div>
            </div>
            
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
              <div className="relative z-10">
                <SciFiCard isDark={isDark} className="p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Ready in 5 Minutes</h3>
                    <p className="text-cyan-100 text-sm mb-4">Professional resume with AI optimization</p>
                    <div className="bg-cyan-500/20 rounded-lg p-4">
                      <div className="text-2xl font-bold text-cyan-400">95%</div>
                      <div className="text-xs text-cyan-200">ATS Pass Rate</div>
                    </div>
                  </div>
                </SciFiCard>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-10 animate-pulse"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Realtime Widget Section */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
              🌍 Stay Globally Connected
            </h2>
            <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
              Live world updates, real-time location tracking, and daily news - all while building your career
            </p>
          </div>
          <RealtimeWidget />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <NewsWidget />
            <LocationMap />
          </div>
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 transition-colors duration-300" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
              🎯 Why Top Professionals Choose Us
            </h2>
            <p className="text-xl text-cyan-100 max-w-2xl mx-auto transition-colors duration-300">
              Advanced AI technology meets professional design. Get hired faster with resumes that actually work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SciFiCard className="text-center h-full" isDark={isDark}>
                  <div className="text-cyan-400 mb-4 flex justify-center transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-cyan-100 transition-colors duration-300">
                    {feature.description}
                  </p>
                </SciFiCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SciFiCard isDark={isDark}>
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 transition-colors duration-300" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
                🌟 See Real Success Stories
              </h2>
              <p className="text-xl text-cyan-100 max-w-2xl mx-auto mb-8 transition-colors duration-300">
                Explore a professional resume that landed interviews at Google, Microsoft & Amazon. Built with our platform.
              </p>
              <Link href="/builder?sample=saswata">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  🚀 View Success Example
                </Button>
              </Link>
            </div>
          </SciFiCard>
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 transition-colors duration-300" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
              💬 Success Stories from Real Users
            </h2>
            <p className="text-xl text-cyan-100 max-w-2xl mx-auto transition-colors duration-300">
              Join 50,000+ professionals who transformed their careers and landed dream jobs at top companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SciFiCard isDark={isDark}>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-cyan-100 mb-4 italic transition-colors duration-300">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-white transition-colors duration-300">{testimonial.name}</p>
                    <p className="text-sm text-cyan-300 transition-colors duration-300">{testimonial.role}</p>
                  </div>
                </SciFiCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* India's The Best Colleges Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ textShadow: '0 0 20px rgba(255, 153, 51, 0.5)' }}>
              🇮🇳 India's The Best Colleges
            </h2>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Discover India's top-ranked institutions. Connect directly with premier colleges and universities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topColleges.map((college, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SciFiCard className="h-full overflow-hidden" isDark={isDark}>
                  <div className="relative">
                    <img 
                      src={college.image} 
                      alt={college.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      #{college.ranking}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{college.name}</h3>
                    <div className="flex items-center text-cyan-300 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {college.location}
                    </div>
                    <div className="text-orange-300 text-sm mb-3">
                      Est. {college.established} • {college.type}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-cyan-200 text-sm">
                        <Phone className="h-3 w-3 mr-2" />
                        <a href={`tel:${college.phone}`} className="hover:text-cyan-400">
                          {college.phone}
                        </a>
                      </div>
                      <div className="flex items-center text-cyan-200 text-sm">
                        <Mail className="h-3 w-3 mr-2" />
                        <a href={`mailto:${college.email}`} className="hover:text-cyan-400 truncate">
                          {college.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <a 
                        href={college.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button size="sm" className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-xs">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit Website
                        </Button>
                      </a>
                      <a href={`tel:${college.phone}`}>
                        <Button size="sm" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
                          <Phone className="h-3 w-3" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </SciFiCard>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-cyan-200 mb-4">Showing {topColleges.length} of India's top institutions!</p>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              🎓 Explore More Colleges
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SciFiCard className="text-center" isDark={isDark}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}>
              🎯 Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
              Join 50,000+ professionals who landed their dream jobs. Your success story starts here.
            </p>
            <Link href={user ? "/builder" : "/auth"}>
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-8 py-4">
                {user ? "🚀 Continue Your Journey" : "🎯 Start Free - Land Your Dream Job!"}
              </Button>
            </Link>
          </SciFiCard>
        </div>
      </section>

      <footer className="bg-gray-900/50 backdrop-blur-md border-t border-cyan-500/30 text-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Logo size={24} animated={false} />
                <span className="ml-2 text-lg font-bold text-cyan-400">ATSFRB</span>
              </div>
              <p className="text-cyan-100">
                Create professional, ATS-friendly resumes that get you hired.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/templates" className="hover:text-cyan-400 text-cyan-100">Templates</Link></li>
                <li><Link href="/builder" className="hover:text-cyan-400 text-cyan-100">Resume Builder</Link></li>
                <li><Link href="/portfolio" className="hover:text-cyan-400 text-cyan-100">Portfolio</Link></li>
                <li><Link href="/examples" className="hover:text-cyan-400 text-cyan-100">Examples</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-cyan-500/30 mt-8 pt-8 text-center text-cyan-300">
            <p>&copy; 2025 ATSFRB - AI Resume Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}