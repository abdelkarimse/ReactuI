import { useState } from 'react';
import type { Document } from '../types/documents';
import { useTheme } from '../Zustand/themeStore';

interface SearchBarDocumentProps {
  onSearch?: (results: Document[]) => void;
}

export default function SearchBarDocument({ onSearch }: SearchBarDocumentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isDark = theme === "dark";

  const searchDocuments = async (prompt: string): Promise<Document[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockDocuments: Document[] = [
      {
        id: 1,
        title: 'Project Proposal 2024',
        description: 'Annual project proposal document with budget allocation',
        date: '2024-01-15',
        size: '2.5 MB',
        fileType: 'PDF'
      },
      {
        id: 2,
        title: 'Technical Specification',
        description: 'Detailed technical specifications for the new system',
        date: '2024-02-20',
        size: '1.8 MB',
        fileType: 'DOCX'
      },
      {
        id: 3,
        title: 'User Manual',
        description: 'Comprehensive user manual and guidelines',
        date: '2024-03-10',
        size: '3.2 MB',
        fileType: 'PDF'
      },
      {
        id: 4,
        title: 'Financial Report Q1',
        description: 'First quarter financial report and analysis',
        date: '2024-04-05',
        size: '1.5 MB',
        fileType: 'XLSX'
      },
      {
        id: 5,
        title: 'Meeting Notes',
        description: 'Monthly team meeting notes and action items',
        date: '2024-05-12',
        size: '0.8 MB',
        fileType: 'DOCX'
      }
    ];

    if (!prompt.trim()) {
      return mockDocuments;
    }

    const lowercaseQuery = prompt.toLowerCase();
    return mockDocuments.filter(doc => 
      doc.title.toLowerCase().includes(lowercaseQuery) ||
      doc.description.toLowerCase().includes(lowercaseQuery) ||
      doc.fileType.toLowerCase().includes(lowercaseQuery)
    );
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const results = await searchDocuments(searchQuery);
      
      if (onSearch) {
        onSearch(results);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents by title, description, or file type..."
              className={`w-full px-4 py-3 pl-12 pr-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                isDark 
                  ? 'bg-neutral-800 border-neutral-700 text-gray-100 placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <svg
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-gray-400' : 'text-gray-400'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-medium shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Searching...
              </span>
            ) : (
              'Search'
            )}
          </button>

          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className={`px-4 py-3 rounded-lg transition-all font-medium ${
                isDark 
                  ? 'bg-neutral-700 text-gray-200 hover:bg-neutral-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
