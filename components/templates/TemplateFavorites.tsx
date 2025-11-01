'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import Button from '@/components/ui/Button';

interface TemplateFavoritesProps {
  templateId: string;
  onToggle?: (templateId: string, isFavorite: boolean) => void;
}

export default function TemplateFavorites({ templateId, onToggle }: TemplateFavoritesProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('templateFavorites') || '[]');
    setIsFavorite(favorites.includes(templateId));
  }, [templateId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('templateFavorites') || '[]');
    const newIsFavorite = !isFavorite;
    
    if (newIsFavorite) {
      favorites.push(templateId);
    } else {
      const index = favorites.indexOf(templateId);
      if (index > -1) favorites.splice(index, 1);
    }
    
    localStorage.setItem('templateFavorites', JSON.stringify(favorites));
    setIsFavorite(newIsFavorite);
    onToggle?.(templateId, newIsFavorite);
  };

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={toggleFavorite}
      className={`${isFavorite ? 'text-red-400 border-red-400 hover:bg-red-400/10' : 'text-gray-400 border-gray-600'}`}
    >
      <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
    </Button>
  );
}