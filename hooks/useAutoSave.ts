'use client';

import { useEffect, useRef, useCallback } from 'react';
import { ResumeData } from '@/types';

interface UseAutoSaveOptions {
  delay?: number;
  onSave?: (data: ResumeData) => Promise<void>;
  onError?: (error: Error) => void;
  enabled?: boolean;
}

export function useAutoSave(
  data: ResumeData,
  options: UseAutoSaveOptions = {}
) {
  const {
    delay = 2000,
    onSave,
    onError,
    enabled = true
  } = options;

  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastSavedRef = useRef<string>('');
  const isSavingRef = useRef(false);

  const saveData = useCallback(async (resumeData: ResumeData) => {
    if (isSavingRef.current) return;
    
    try {
      isSavingRef.current = true;
      
      // Save to localStorage as backup
      localStorage.setItem('resume-autosave', JSON.stringify({
        data: resumeData,
        timestamp: Date.now()
      }));

      // Call custom save function if provided
      if (onSave) {
        await onSave(resumeData);
      }

      lastSavedRef.current = JSON.stringify(resumeData);
    } catch (error) {
      console.error('Auto-save failed:', error);
      if (onError) {
        onError(error as Error);
      }
    } finally {
      isSavingRef.current = false;
    }
  }, [onSave, onError]);

  useEffect(() => {
    if (!enabled) return;

    const currentDataString = JSON.stringify(data);
    
    // Skip if data hasn't changed
    if (currentDataString === lastSavedRef.current) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      saveData(data);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay, enabled, saveData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const saveNow = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    saveData(data);
  }, [data, saveData]);

  const getLastSaved = useCallback(() => {
    try {
      const saved = localStorage.getItem('resume-autosave');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          data: parsed.data as ResumeData,
          timestamp: new Date(parsed.timestamp)
        };
      }
    } catch (error) {
      console.error('Failed to retrieve auto-saved data:', error);
    }
    return null;
  }, []);

  return {
    saveNow,
    getLastSaved,
    isSaving: isSavingRef.current
  };
}