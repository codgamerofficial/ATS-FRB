'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Phone, Mail, MapPin, ArrowLeft, Plus, X, Star, Users, BookOpen, Award } from 'lucide-react';
import Button from '@/components/ui/Button';
import SciFiCard from '@/components/ui/SciFiCard';
import SciFiBackground from '@/components/ui/SciFiBackground';
import Logo from '@/components/ui/Logo';
import { useDarkMode } from '@/hooks/useDarkMode';
import Link from 'next/link';

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
    type: 'Engineering & Technology',
    students: 11000,
    courses: 45,
    rating: 4.8,
    fees: '₹2.5L/year',
    placement: '95%'
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
    type: 'Science & Research',
    students: 4500,
    courses: 38,
    rating: 4.9,
    fees: '₹1.8L/year',
    placement: '98%'
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
    type: 'Engineering & Technology',
    students: 10500,
    courses: 42,
    rating: 4.7,
    fees: '₹2.3L/year',
    placement: '94%'
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
    type: 'Medical Sciences',
    students: 3200,
    courses: 28,
    rating: 4.9,
    fees: '₹1.2L/year',
    placement: '100%'
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
    type: 'Engineering & Technology',
    students: 9800,
    courses: 40,
    rating: 4.6,
    fees: '₹2.2L/year',
    placement: '92%'
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
    type: 'Engineering & Technology',
    students: 8500,
    courses: 38,
    rating: 4.5,
    fees: '₹2.1L/year',
    placement: '90%'
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
    type: 'Central University',
    students: 8200,
    courses: 65,
    rating: 4.4,
    fees: '₹0.3L/year',
    placement: '85%'
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
    type: 'Central University',
    students: 132000,
    courses: 86,
    rating: 4.3,
    fees: '₹0.2L/year',
    placement: '78%'
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
    type: 'Engineering & Technology',
    students: 12000,
    courses: 48,
    rating: 4.5,
    fees: '₹2.0L/year',
    placement: '88%'
  },
  {
    name: 'Banaras Hindu University',
    location: 'Varanasi, Uttar Pradesh',
    ranking: 10,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop',
    website: 'https://www.bhu.ac.in/',
    phone: '+91-542-230-7077',
    email: 'registrar@bhu.ac.in',
    established: 1916,
    type: 'Central University',
    students: 30000,
    courses: 140,
    rating: 4.2,
    fees: '₹0.4L/year',
    placement: '82%'
  },
  {
    name: 'Indian Institute of Technology Roorkee',
    location: 'Roorkee, Uttarakhand',
    ranking: 11,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop&sat=-50',
    website: 'https://www.iitr.ac.in/',
    phone: '+91-1332-285-311',
    email: 'registrar@iitr.ac.in',
    established: 1847,
    type: 'Engineering & Technology',
    students: 7800,
    courses: 35,
    rating: 4.4,
    fees: '₹2.0L/year',
    placement: '87%'
  },
  {
    name: 'Indian Institute of Technology Guwahati',
    location: 'Guwahati, Assam',
    ranking: 12,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&hue=30',
    website: 'https://www.iitg.ac.in/',
    phone: '+91-361-258-2000',
    email: 'registrar@iitg.ac.in',
    established: 1994,
    type: 'Engineering & Technology',
    students: 6500,
    courses: 32,
    rating: 4.3,
    fees: '₹2.1L/year',
    placement: '85%'
  },
  {
    name: 'Jadavpur University',
    location: 'Kolkata, West Bengal',
    ranking: 13,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop&hue=60',
    website: 'http://www.jaduniv.edu.in/',
    phone: '+91-33-2414-6666',
    email: 'registrar@jaduniv.edu.in',
    established: 1955,
    type: 'State University',
    students: 12500,
    courses: 58,
    rating: 4.1,
    fees: '₹0.1L/year',
    placement: '80%'
  },
  {
    name: 'Anna University',
    location: 'Chennai, Tamil Nadu',
    ranking: 14,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop&hue=90',
    website: 'https://www.annauniv.edu/',
    phone: '+91-44-2235-7000',
    email: 'registrar@annauniv.edu',
    established: 1978,
    type: 'State University',
    students: 45000,
    courses: 95,
    rating: 4.0,
    fees: '₹0.3L/year',
    placement: '75%'
  },
  {
    name: 'Indian Institute of Technology Hyderabad',
    location: 'Hyderabad, Telangana',
    ranking: 15,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop&hue=120',
    website: 'https://www.iith.ac.in/',
    phone: '+91-40-2301-6000',
    email: 'registrar@iith.ac.in',
    established: 2008,
    type: 'Engineering & Technology',
    students: 4200,
    courses: 28,
    rating: 4.2,
    fees: '₹2.2L/year',
    placement: '83%'
  },
  {
    name: 'Aligarh Muslim University',
    location: 'Aligarh, Uttar Pradesh',
    ranking: 16,
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop&hue=150',
    website: 'https://www.amu.ac.in/',
    phone: '+91-571-270-0920',
    email: 'registrar@amu.ac.in',
    established: 1875,
    type: 'Central University',
    students: 28000,
    courses: 300,
    rating: 4.1,
    fees: '₹0.2L/year',
    placement: '70%'
  },
  {
    name: 'Indian Institute of Technology Indore',
    location: 'Indore, Madhya Pradesh',
    ranking: 17,
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop&hue=180',
    website: 'https://www.iiti.ac.in/',
    phone: '+91-731-660-3000',
    email: 'registrar@iiti.ac.in',
    established: 2009,
    type: 'Engineering & Technology',
    students: 3800,
    courses: 25,
    rating: 4.0,
    fees: '₹2.3L/year',
    placement: '81%'
  },
  {
    name: 'Vellore Institute of Technology',
    location: 'Vellore, Tamil Nadu',
    ranking: 18,
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop&hue=210',
    website: 'https://vit.ac.in/',
    phone: '+91-416-220-2020',
    email: 'registrar@vit.ac.in',
    established: 1984,
    type: 'Private University',
    students: 50000,
    courses: 65,
    rating: 3.9,
    fees: '₹1.8L/year',
    placement: '85%'
  },
  {
    name: 'Birla Institute of Technology and Science Pilani',
    location: 'Pilani, Rajasthan',
    ranking: 19,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop&hue=240',
    website: 'https://www.bits-pilani.ac.in/',
    phone: '+91-1596-242-210',
    email: 'registrar@pilani.bits-pilani.ac.in',
    established: 1964,
    type: 'Private University',
    students: 18000,
    courses: 45,
    rating: 4.2,
    fees: '₹4.5L/year',
    placement: '90%'
  },
  {
    name: 'Indian Institute of Technology Bhubaneswar',
    location: 'Bhubaneswar, Odisha',
    ranking: 20,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop&hue=270',
    website: 'https://www.iitbbs.ac.in/',
    phone: '+91-674-713-5000',
    email: 'registrar@iitbbs.ac.in',
    established: 2008,
    type: 'Engineering & Technology',
    students: 3500,
    courses: 22,
    rating: 3.8,
    fees: '₹2.1L/year',
    placement: '79%'
  },
  {
    name: 'Manipal Academy of Higher Education',
    location: 'Manipal, Karnataka',
    ranking: 21,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&hue=300',
    website: 'https://manipal.edu/',
    phone: '+91-820-292-3000',
    email: 'registrar@manipal.edu',
    established: 1953,
    type: 'Private University',
    students: 28000,
    courses: 350,
    rating: 3.7,
    fees: '₹3.2L/year',
    placement: '82%'
  },
  {
    name: 'Indian Institute of Technology Gandhinagar',
    location: 'Gandhinagar, Gujarat',
    ranking: 22,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop&hue=330',
    website: 'https://www.iitgn.ac.in/',
    phone: '+91-79-2395-2000',
    email: 'registrar@iitgn.ac.in',
    established: 2008,
    type: 'Engineering & Technology',
    students: 2800,
    courses: 18,
    rating: 3.9,
    fees: '₹2.4L/year',
    placement: '77%'
  },
  {
    name: 'Amity University',
    location: 'Noida, Uttar Pradesh',
    ranking: 23,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop&sat=50',
    website: 'https://www.amity.edu/',
    phone: '+91-120-471-5000',
    email: 'info@amity.edu',
    established: 2005,
    type: 'Private University',
    students: 35000,
    courses: 250,
    rating: 3.6,
    fees: '₹2.8L/year',
    placement: '75%'
  },
  {
    name: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    ranking: 24,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop&sat=75',
    website: 'https://www.lpu.in/',
    phone: '+91-1824-517-000',
    email: 'info@lpu.co.in',
    established: 2005,
    type: 'Private University',
    students: 30000,
    courses: 200,
    rating: 3.5,
    fees: '₹1.6L/year',
    placement: '70%'
  },
  {
    name: 'SRM Institute of Science and Technology',
    location: 'Chennai, Tamil Nadu',
    ranking: 25,
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop&sat=25',
    website: 'https://www.srmist.edu.in/',
    phone: '+91-44-2741-7000',
    email: 'admissions@srmist.edu.in',
    established: 1985,
    type: 'Private University',
    students: 38000,
    courses: 100,
    rating: 3.8,
    fees: '₹2.5L/year',
    placement: '78%'
  },
  {
    name: 'Kalinga Institute of Industrial Technology',
    location: 'Bhubaneswar, Odisha',
    ranking: 26,
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop&sat=-25',
    website: 'https://kiit.ac.in/',
    phone: '+91-674-272-7777',
    email: 'info@kiit.ac.in',
    established: 1992,
    type: 'Private University',
    students: 25000,
    courses: 75,
    rating: 3.7,
    fees: '₹3.0L/year',
    placement: '73%'
  }
];

export default function CollegesPage() {
  const { isDark } = useDarkMode();
  const [compareList, setCompareList] = useState<typeof topColleges>([]);
  const [showComparison, setShowComparison] = useState(false);
  
  const addToCompare = (college: typeof topColleges[0]) => {
    if (compareList.length < 3 && !compareList.find(c => c.ranking === college.ranking)) {
      setCompareList([...compareList, college]);
    }
  };
  
  const removeFromCompare = (ranking: number) => {
    setCompareList(compareList.filter(c => c.ranking !== ranking));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SciFiBackground isDark={isDark} />
      
      <nav className="bg-gray-900/20 backdrop-blur-md border-b border-cyan-500/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-cyan-500/30"></div>
              <Logo size={24} />
              <span className="text-lg font-bold text-cyan-400">India's The Best</span>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4" style={{ textShadow: '0 0 30px rgba(255, 153, 51, 0.5)' }}>
            🇮🇳 India's Top 26 Colleges
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-8">
            Discover India's premier educational institutions with real data, authentic contacts, and comparison tools. Connect directly with top-ranked colleges and universities.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-orange-200">
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-2" />
              Real Rankings
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              Authentic Contacts
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Compare Colleges
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topColleges.map((college, index) => (
              <div key={index}>
                <SciFiCard className="h-full overflow-hidden" isDark={isDark}>
                  <div className="relative">
                    <img 
                      src={college.image} 
                      alt={college.name}
                      className="w-full h-40 object-cover rounded-t-lg"
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
                    
                    <div className="mb-3 grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <div className="text-cyan-400 font-bold">{college.students.toLocaleString()}</div>
                        <div className="text-gray-400">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-green-400 font-bold">{college.courses}</div>
                        <div className="text-gray-400">Courses</div>
                      </div>
                      <div className="text-center">
                        <div className="text-yellow-400 font-bold flex items-center justify-center">
                          <Star className="h-3 w-3 mr-1" />{college.rating}
                        </div>
                        <div className="text-gray-400">Rating</div>
                      </div>
                    </div>
                    
                    <div className="mb-3 flex justify-between text-xs">
                      <span className="text-purple-400 font-medium">{college.fees}</span>
                      <span className="text-green-400 font-medium">{college.placement} Placement</span>
                    </div>
                    
                    <div className="flex gap-1 mb-3">
                      <a 
                        href={college.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button size="sm" className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-xs">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Website
                        </Button>
                      </a>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                        onClick={() => addToCompare(college)}
                        disabled={compareList.length >= 3 || compareList.find(c => c.ranking === college.ranking) !== undefined}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </SciFiCard>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Compare Button */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button 
            onClick={() => setShowComparison(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
          >
            Compare ({compareList.length})
          </Button>
        </div>
      )}
      
      {/* Comparison Modal */}
      {showComparison && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900/95 backdrop-blur-xl border border-cyan-400/30 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">College Comparison</h2>
                <Button 
                  onClick={() => setShowComparison(false)}
                  variant="outline"
                  size="sm"
                  className="border-red-400 text-red-400 hover:bg-red-400/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {compareList.map((college, index) => (
                  <SciFiCard key={index} className="relative">
                    <Button 
                      onClick={() => removeFromCompare(college.ranking)}
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 border-red-400 text-red-400 hover:bg-red-400/10 z-10"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    
                    <div className="p-4">
                      <img 
                        src={college.image} 
                        alt={college.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="text-lg font-bold text-white mb-2">{college.name}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Ranking:</span>
                          <span className="text-orange-400 font-bold">#{college.ranking}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Established:</span>
                          <span className="text-cyan-400">{college.established}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Students:</span>
                          <span className="text-cyan-400">{college.students.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Courses:</span>
                          <span className="text-green-400">{college.courses}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Rating:</span>
                          <span className="text-yellow-400 flex items-center">
                            <Star className="h-3 w-3 mr-1" />{college.rating}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Fees:</span>
                          <span className="text-purple-400 font-medium">{college.fees}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Placement:</span>
                          <span className="text-green-400 font-medium">{college.placement}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Type:</span>
                          <span className="text-blue-400">{college.type}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <a 
                          href={college.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                            <ExternalLink className="h-3 w-3 mr-2" />
                            Visit Website
                          </Button>
                        </a>
                        <div className="flex gap-2">
                          <a href={`tel:${college.phone}`} className="flex-1">
                            <Button size="sm" variant="outline" className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
                              <Phone className="h-3 w-3 mr-1" />
                              Call
                            </Button>
                          </a>
                          <a href={`mailto:${college.email}`} className="flex-1">
                            <Button size="sm" variant="outline" className="w-full border-green-400 text-green-400 hover:bg-green-400/10">
                              <Mail className="h-3 w-3 mr-1" />
                              Email
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </SciFiCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}