'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { ResumeData } from '@/types';
import { supabase } from '@/lib/supabase/client';

interface CollaborationUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  cursor?: { x: number; y: number };
  selection?: { start: number; end: number; field: string };
  lastSeen: Date;
}

interface CollaborationState {
  users: CollaborationUser[];
  changes: ResumeChange[];
  isConnected: boolean;
}

interface ResumeChange {
  id: string;
  userId: string;
  field: string;
  oldValue: any;
  newValue: any;
  timestamp: Date;
  type: 'insert' | 'update' | 'delete';
}

export function useCollaboration(resumeId: string, currentUser: any) {
  const [state, setState] = useState<CollaborationState>({
    users: [],
    changes: [],
    isConnected: false
  });
  
  const channelRef = useRef<any>(null);
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null);
  const cursorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const broadcastChange = useCallback((change: Omit<ResumeChange, 'id' | 'timestamp'>) => {
    if (!channelRef.current || !currentUser) return;

    const fullChange: ResumeChange = {
      ...change,
      id: crypto.randomUUID(),
      timestamp: new Date()
    };

    channelRef.current.send({
      type: 'broadcast',
      event: 'resume_change',
      payload: fullChange
    });

    setState(prev => ({
      ...prev,
      changes: [...prev.changes.slice(-50), fullChange] // Keep last 50 changes
    }));
  }, [currentUser]);

  const broadcastCursor = useCallback((x: number, y: number) => {
    if (!channelRef.current || !currentUser) return;

    // Debounce cursor updates
    if (cursorTimeoutRef.current) {
      clearTimeout(cursorTimeoutRef.current);
    }

    cursorTimeoutRef.current = setTimeout(() => {
      channelRef.current.send({
        type: 'broadcast',
        event: 'cursor_move',
        payload: {
          userId: currentUser.id,
          x,
          y
        }
      });
    }, 50);
  }, [currentUser]);

  const broadcastSelection = useCallback((field: string, start: number, end: number) => {
    if (!channelRef.current || !currentUser) return;

    channelRef.current.send({
      type: 'broadcast',
      event: 'selection_change',
      payload: {
        userId: currentUser.id,
        field,
        start,
        end
      }
    });
  }, [currentUser]);

  const joinCollaboration = useCallback(async () => {
    if (!currentUser) return;

    try {
      // Create or join collaboration room
      const channel = supabase.channel(`resume_${resumeId}`, {
        config: {
          broadcast: { self: true },
          presence: { key: currentUser.id }
        }
      });

      channelRef.current = channel;

      // Handle user presence
      channel
        .on('presence', { event: 'sync' }, () => {
          const presenceState = channel.presenceState();
          const users = Object.values(presenceState).flat().map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            lastSeen: new Date(user.lastSeen)
          }));

          setState(prev => ({ ...prev, users }));
        })
        .on('presence', { event: 'join' }, ({ newPresences }) => {
          console.log('User joined:', newPresences);
        })
        .on('presence', { event: 'leave' }, ({ leftPresences }) => {
          console.log('User left:', leftPresences);
        })
        // Handle resume changes
        .on('broadcast', { event: 'resume_change' }, ({ payload }) => {
          setState(prev => ({
            ...prev,
            changes: [...prev.changes.slice(-50), payload]
          }));
        })
        // Handle cursor movements
        .on('broadcast', { event: 'cursor_move' }, ({ payload }) => {
          setState(prev => ({
            ...prev,
            users: prev.users.map(user => 
              user.id === payload.userId 
                ? { ...user, cursor: { x: payload.x, y: payload.y } }
                : user
            )
          }));
        })
        // Handle text selections
        .on('broadcast', { event: 'selection_change' }, ({ payload }) => {
          setState(prev => ({
            ...prev,
            users: prev.users.map(user => 
              user.id === payload.userId 
                ? { 
                    ...user, 
                    selection: { 
                      field: payload.field, 
                      start: payload.start, 
                      end: payload.end 
                    } 
                  }
                : user
            )
          }));
        });

      // Subscribe and track presence
      await channel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            id: currentUser.id,
            name: currentUser.user_metadata?.full_name || currentUser.email,
            email: currentUser.email,
            avatar: currentUser.user_metadata?.avatar_url,
            lastSeen: new Date().toISOString()
          });

          setState(prev => ({ ...prev, isConnected: true }));

          // Send heartbeat every 30 seconds
          heartbeatRef.current = setInterval(async () => {
            await channel.track({
              id: currentUser.id,
              name: currentUser.user_metadata?.full_name || currentUser.email,
              email: currentUser.email,
              avatar: currentUser.user_metadata?.avatar_url,
              lastSeen: new Date().toISOString()
            });
          }, 30000);
        }
      });

    } catch (error) {
      console.error('Failed to join collaboration:', error);
    }
  }, [resumeId, currentUser]);

  const leaveCollaboration = useCallback(async () => {
    if (channelRef.current) {
      await channelRef.current.unsubscribe();
      channelRef.current = null;
    }

    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
    }

    if (cursorTimeoutRef.current) {
      clearTimeout(cursorTimeoutRef.current);
    }

    setState({
      users: [],
      changes: [],
      isConnected: false
    });
  }, []);

  // Auto-join on mount, leave on unmount
  useEffect(() => {
    if (resumeId && currentUser) {
      joinCollaboration();
    }

    return () => {
      leaveCollaboration();
    };
  }, [resumeId, currentUser, joinCollaboration, leaveCollaboration]);

  // Track mouse movements for cursor sharing
  useEffect(() => {
    if (!state.isConnected) return;

    const handleMouseMove = (e: MouseEvent) => {
      broadcastCursor(e.clientX, e.clientY);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [state.isConnected, broadcastCursor]);

  return {
    ...state,
    broadcastChange,
    broadcastCursor,
    broadcastSelection,
    joinCollaboration,
    leaveCollaboration
  };
}