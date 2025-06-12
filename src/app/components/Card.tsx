import React from 'react';
import { ArrowRight, Star, Calendar, User } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  date?: string;
  author?: string;
  rating?: number;
  tag?: string;
  href?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  date,
  author,
  rating,
  tag,
  href,
  onClick
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="p-6 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            {tag && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                {tag}
              </span>
            )}
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-current" />
                <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {author && (
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>{author}</span>
              </div>
            )}
            {date && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span className='font-bold'>{date}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="ml-6 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors duration-200">
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all duration-200" />
          </div>
        </div>
      </div>
    </div>
  );
};