'use client';

import { useState, useCallback } from 'react';
import { motion, Reorder } from 'framer-motion';
import { GripVertical, Eye, EyeOff } from 'lucide-react';

export interface ResumeSection {
  id: string;
  title: string;
  component: React.ReactNode;
  isVisible: boolean;
  isRequired?: boolean;
}

interface DragDropSectionsProps {
  sections: ResumeSection[];
  onReorder: (newSections: ResumeSection[]) => void;
  onToggleVisibility: (sectionId: string) => void;
}

export default function DragDropSections({
  sections,
  onReorder,
  onToggleVisibility
}: DragDropSectionsProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleReorder = useCallback((newOrder: ResumeSection[]) => {
    onReorder(newOrder);
  }, [onReorder]);

  const handleToggleVisibility = useCallback((sectionId: string) => {
    onToggleVisibility(sectionId);
  }, [onToggleVisibility]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Resume Sections</h3>
        <p className="text-sm text-gray-400">Drag to reorder • Click eye to toggle visibility</p>
      </div>

      <Reorder.Group
        axis="y"
        values={sections}
        onReorder={handleReorder}
        className="space-y-2"
      >
        {sections.map((section) => (
          <Reorder.Item
            key={section.id}
            value={section}
            onDragStart={() => setDraggedItem(section.id)}
            onDragEnd={() => setDraggedItem(null)}
            className="group"
          >
            <motion.div
              layout
              className={`
                bg-gray-800/50 border border-gray-700 rounded-lg p-4 cursor-grab active:cursor-grabbing
                transition-all duration-200 hover:border-cyan-500/50
                ${draggedItem === section.id ? 'shadow-lg shadow-cyan-500/20 border-cyan-500' : ''}
                ${!section.isVisible ? 'opacity-60' : ''}
              `}
              whileHover={{ scale: 1.01 }}
              whileDrag={{ 
                scale: 1.05,
                rotate: 1,
                zIndex: 10,
                boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-gray-400 group-hover:text-cyan-400 transition-colors">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  
                  <div>
                    <h4 className={`font-medium ${section.isVisible ? 'text-white' : 'text-gray-500'}`}>
                      {section.title}
                      {section.isRequired && (
                        <span className="text-red-400 ml-1">*</span>
                      )}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {!section.isRequired && (
                    <button
                      onClick={() => handleToggleVisibility(section.id)}
                      className={`
                        p-2 rounded-md transition-colors
                        ${section.isVisible 
                          ? 'text-cyan-400 hover:bg-cyan-500/10' 
                          : 'text-gray-500 hover:bg-gray-700'
                        }
                      `}
                      title={section.isVisible ? 'Hide section' : 'Show section'}
                    >
                      {section.isVisible ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {section.isVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-700"
                >
                  {section.component}
                </motion.div>
              )}
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}