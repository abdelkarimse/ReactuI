import { useState } from 'react';
import type { Document } from '../types/documents';

interface CardDocumentClientProps {
  readonly document: Document;
  readonly onViewMore?: (document: Document) => void;
  readonly onSummarize?: (document: Document) => void;
  readonly previewImage?: string;
}

export function CardDocumentClient({ 
  document, 
  onViewMore, 
  onSummarize,
  previewImage 
}: CardDocumentClientProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Generate file type icon color
  const getFileTypeColor = (fileType: string) => {
    const type = fileType.toLowerCase();
    if (type === 'pdf') return 'bg-red-500';
    return 'bg-purple-500';
  };

  // Generate file type icon
  const getFileTypeIcon = (fileType: string) => {
    const type = fileType.toLowerCase();
    
    if (type === 'pdf') {
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 18h12V6h-4V2H4v16zm-2 1V0h10l4 4v16H2v-1z"/>
          <path d="M7 11h6v1H7v-1zm0 2h6v1H7v-1zm0 2h3v1H7v-1z"/>
        </svg>
      );
    }
    
    return (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
      </svg>
    );
  };

  const defaultImage = previewImage || `https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=300&fit=crop`;

  return (
    <article 
      className="w-full max-w-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="group relative bg-white dark:bg-neutral-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-neutral-800">
        {/* Document Preview Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-800 dark:to-neutral-900">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className={`${getFileTypeColor(document.fileType)} text-white p-4 rounded-full`}>
                {getFileTypeIcon(document.fileType)}
              </div>
            </div>
          ) : (
            <img
              src={defaultImage}
              alt={document.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          )}
          
          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          
          {/* File Type Badge */}
          <div className="absolute top-3 right-3">
            <span className={`${getFileTypeColor(document.fileType)} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
              {document.fileType}
            </span>
          </div>

          {/* Date Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 dark:bg-neutral-800/90 text-gray-800 dark:text-gray-200 text-xs font-medium px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
              {new Date(document.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Document Information */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 min-h-[3.5rem]">
            {document.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem]">
            {document.description}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-4 mb-4 text-xs text-gray-500 dark:text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-medium">{document.size}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">ID: {document.id}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => onViewMore?.(document)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View More
            </button>

            <button
              onClick={() => onSummarize?.(document)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Summarize
            </button>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className={`absolute inset-0 border-2 border-blue-500 rounded-xl transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </article>
  );
}
