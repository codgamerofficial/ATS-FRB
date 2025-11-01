'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { ChevronDown, SortAsc, SortDesc } from 'lucide-react';

export type SortOption = 'name' | 'category' | 'premium' | 'newest';
export type SortOrder = 'asc' | 'desc';

interface TemplateSortingProps {
  sortBy: SortOption;
  sortOrder: SortOrder;
  onSortChange: (sortBy: SortOption, sortOrder: SortOrder) => void;
}

const sortOptions = [
  { value: 'name' as const, label: 'Name' },
  { value: 'category' as const, label: 'Category' },
  { value: 'premium' as const, label: 'Type' },
  { value: 'newest' as const, label: 'Newest' }
];

export default function TemplateSorting({ sortBy, sortOrder, onSortChange }: TemplateSortingProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
        <span>Sort by {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10 min-w-[160px]">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSortChange(option.value, sortBy === option.value && sortOrder === 'asc' ? 'desc' : 'asc');
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}