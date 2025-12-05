import { useState, useCallback } from 'react';
import { mockApiService } from '../services/mockApi';
import { useAuth } from '../context/AuthContext';
import type { AuthDocument } from '../types/auth';

/**
 * Custom hook for document operations
 * Provides methods for CRUD operations on documents with proper permissions
 */
export function useDocuments() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<AuthDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = user?.role === 'admin';

  const loadDocuments = useCallback(async (includeExpired: boolean = false) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      let docs: AuthDocument[];
      
      if (isAdmin) {
        docs = await mockApiService.getAllDocuments(includeExpired);
      } else {
        docs = await mockApiService.getUserDocuments(user.id, includeExpired);
      }
      
      setDocuments(docs);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load documents';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [user, isAdmin]);

  const uploadDocument = useCallback(async (
    file: File,
    metadata?: Partial<Pick<AuthDocument, 'accessStart' | 'accessEnd' | 'isPublic'>>
  ) => {
    if (!user) throw new Error('Not authenticated');

    setIsLoading(true);
    setError(null);

    try {
      const newDoc = await mockApiService.uploadDocument(file, user.id, metadata);
      setDocuments(prev => [...prev, newDoc]);
      return newDoc;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload document';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const deleteDocument = useCallback(async (docId: string) => {
    if (!user) throw new Error('Not authenticated');

    setIsLoading(true);
    setError(null);

    try {
      await mockApiService.deleteDocument(docId, user.id, isAdmin);
      setDocuments(prev => prev.filter(d => d.id !== docId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete document';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user, isAdmin]);

  const searchDocuments = useCallback(async (query: string) => {
    if (!user) throw new Error('Not authenticated');

    setIsLoading(true);
    setError(null);

    try {
      const results = await mockApiService.searchDocuments(query, user.id, isAdmin);
      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user, isAdmin]);

  const getDocument = useCallback(async (docId: string) => {
    if (!user) throw new Error('Not authenticated');

    try {
      const doc = await mockApiService.getDocumentById(docId, user.id, isAdmin);
      return doc;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get document';
      setError(errorMessage);
      throw err;
    }
  }, [user, isAdmin]);

  const updateDocument = useCallback(async (docId: string, updates: Partial<AuthDocument>) => {
    if (!user) throw new Error('Not authenticated');

    setIsLoading(true);
    setError(null);

    try {
      const updatedDoc = await mockApiService.updateDocument(docId, updates, user.id, isAdmin);
      setDocuments(prev => prev.map(d => d.id === docId ? updatedDoc : d));
      return updatedDoc;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update document';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user, isAdmin]);

  return {
    documents,
    isLoading,
    error,
    loadDocuments,
    uploadDocument,
    deleteDocument,
    searchDocuments,
    getDocument,
    updateDocument,
    clearError: () => setError(null),
  };
}
