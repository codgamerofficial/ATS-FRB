'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Copy, 
  Mail, 
  UserPlus, 
  Crown, 
  Eye,
  Clock
} from 'lucide-react';
import { useCollaboration } from '@/hooks/useCollaboration';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface CollaborationPanelProps {
  resumeId: string;
  currentUser: any;
  isOwner?: boolean;
  className?: string;
}

export default function CollaborationPanel({ 
  resumeId, 
  currentUser, 
  isOwner = false,
  className = '' 
}: CollaborationPanelProps) {
  const collaboration = useCollaboration(resumeId, currentUser);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [shareUrl] = useState(`${typeof window !== 'undefined' ? window.location.origin : ''}/resume/${resumeId}`);

  const handleInvite = async () => {
    if (!inviteEmail) return;

    try {
      console.log('Inviting user:', inviteEmail);
      await navigator.clipboard.writeText(shareUrl);
      setInviteEmail('');
      setShowInviteModal(false);
    } catch (error) {
      console.error('Failed to invite user:', error);
    }
  };

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRandomColor = (userId: string) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const index = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <div className={`bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg ${className}`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Collaboration</h3>
            <div className={`w-2 h-2 rounded-full ${collaboration.isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          </div>
          
          {isOwner && (
            <Button
              size="sm"
              onClick={() => setShowInviteModal(true)}
            >
              <UserPlus className="w-4 h-4 mr-1" />
              Invite
            </Button>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-300">
            Active Users ({collaboration.users.length})
          </span>
        </div>

        <div className="space-y-2">
          {collaboration.users.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center space-x-3 p-2 rounded-lg bg-gray-800/50"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${getRandomColor(user.id)}`}>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                ) : (
                  getInitials(user.name)
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm font-medium truncate">
                    {user.name}
                  </span>
                  {user.id === currentUser?.id && (
                    <span className="text-xs text-cyan-400">(You)</span>
                  )}
                  {isOwner && user.id !== currentUser?.id && (
                    <Crown className="w-3 h-3 text-yellow-400" />
                  )}
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>Active {Math.round((Date.now() - user.lastSeen.getTime()) / 1000)}s ago</span>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {user.selection && (
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" title="Editing" />
                )}
                <Eye className="w-4 h-4 text-gray-400" />
              </div>
            </motion.div>
          ))}

          {collaboration.users.length === 0 && (
            <div className="text-center py-4 text-gray-400">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No active collaborators</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <Input
            value={shareUrl}
            readOnly
            className="flex-1 text-xs"
            placeholder="Share URL"
          />
          <Button
            size="sm"
            variant="outline"
            onClick={copyShareUrl}
          >
            <Copy className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showInviteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowInviteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Invite Collaborator</h3>
              
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
                
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={handleInvite}
                    disabled={!inviteEmail}
                    className="flex-1"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Invitation
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowInviteModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}