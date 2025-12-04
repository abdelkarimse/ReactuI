import { CardDocumentClient } from './CardDocumentClient';
import type { Document } from '../types/documents';
import { useTheme } from '../Zustand/themeStore';

interface ListOfDocumentClientProps {
  readonly documents: Document[];
  readonly onViewMore?: (document: Document) => void;
  readonly onSummarize?: (document: Document) => void;
}

export function ListOfDocumentClient({ 
  documents, 
  onViewMore, 
  onSummarize 
}: Readonly<ListOfDocumentClientProps>) {
    const theme = useTheme();
    const isDark = theme === "dark";
  if (!documents || documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <svg 
          className={`w-24 h-24 mb-4 ${
            isDark ? 'text-gray-600' : 'text-gray-300'
          }`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
        <h3 className={`text-xl font-semibold mb-2 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          No Documents Found
        </h3>
        <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
          There are no documents available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Document Library
        </h1>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
          Browse and manage your documents ({documents.length} {documents.length === 1 ? 'document' : 'documents'})
        </p>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {documents.map((document) => (
          <CardDocumentClient
            key={document.id}
            document={document}
            onViewMore={onViewMore}
            onSummarize={onSummarize}
          />
        ))}
      </div>
    </div>
  );
}
