'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase/client';
import AuthGuard from '@/components/ui/AuthGuard';
import UserMenu from '@/components/ui/UserMenu';
import Button from '@/components/ui/Button';
import SciFiBackground from '@/components/ui/SciFiBackground';
import SciFiCard from '@/components/ui/SciFiCard';
import { FileText, Plus, Edit, Trash2, Download, Eye } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Resume {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchResumes();
    }
  }, [user]);

  const fetchResumes = async () => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('id, title, created_at, updated_at, is_public')
        .eq('user_id', user?.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setResumes(data || []);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;

    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setResumes(resumes.filter(resume => resume.id !== id));
      toast.success('Resume deleted successfully');
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error('Failed to delete resume');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AuthGuard>
      <div className="min-h-screen relative">
        <SciFiBackground />
        <header className="relative z-10 bg-gray-900/80 backdrop-blur-md border-b border-cyan-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="flex items-center mr-6">
                  <FileText className="h-6 w-6 text-cyan-400" />
                  <span className="ml-2 text-lg font-bold text-white">ATSFRB</span>
                </Link>
                <h1 className="text-xl font-semibold text-cyan-400">My Resumes</h1>
              </div>
              <UserMenu />
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Your Resumes</h2>
              <p className="text-gray-300 mt-1">Manage and edit your professional resumes</p>
            </div>
            <Link href="/builder">
              <Button className="flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Create New Resume
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : resumes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <SciFiCard className="text-center py-12">
                <FileText className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No resumes yet</h3>
                <p className="text-gray-300 mb-6">Create your first professional resume to get started</p>
                <Link href="/builder">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Resume
                  </Button>
                </Link>
              </SciFiCard>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <SciFiCard className="p-6 hover:shadow-cyan-500/20 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {resume.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Updated {formatDate(resume.updated_at)}
                        </p>
                      </div>
                      {resume.is_public && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                          Public
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Link href={`/builder?resume=${resume.id}`}>
                          <Button size="sm" variant="outline" className="flex items-center">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline" className="flex items-center">
                          <Download className="w-3 h-3 mr-1" />
                          PDF
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteResume(resume.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </SciFiCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}