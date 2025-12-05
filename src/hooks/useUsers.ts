import { useState, useCallback } from 'react';
import { mockApiService } from '../services/mockApi';
import { useAuth, useIsAdmin } from '../context/AuthContext';
import type { AuthUser } from '../types/auth';

type UserWithoutPassword = Omit<AuthUser, 'password'>;

/**
 * Custom hook for user management (admin only)
 * Provides methods for CRUD operations on users
 */
export function useUsers() {
  const { user } = useAuth();
  const isAdmin = useIsAdmin();
  const [users, setUsers] = useState<UserWithoutPassword[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    if (!isAdmin) {
      setError('Only admins can view all users');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const allUsers = await mockApiService.getAllUsers();
      setUsers(allUsers);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load users';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isAdmin]);

  const createUser = useCallback(async (userData: Omit<AuthUser, 'id' | 'createdAt' | 'lastLogin'>) => {
    if (!isAdmin) throw new Error('Only admins can create users');

    setIsLoading(true);
    setError(null);

    try {
      const newUser = await mockApiService.createUser(userData);
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isAdmin]);

  const updateUser = useCallback(async (
    userId: string,
    updates: Partial<Omit<AuthUser, 'id' | 'createdAt'>>
  ) => {
    if (!isAdmin) throw new Error('Only admins can update users');

    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await mockApiService.updateUser(userId, updates);
      setUsers(prev => prev.map(u => u.id === userId ? updatedUser : u));
      return updatedUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isAdmin]);

  const deleteUser = useCallback(async (userId: string) => {
    if (!isAdmin) throw new Error('Only admins can delete users');
    if (userId === user?.id) throw new Error('Cannot delete your own account');

    setIsLoading(true);
    setError(null);

    try {
      await mockApiService.deleteUser(userId);
      setUsers(prev => prev.filter(u => u.id !== userId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isAdmin, user?.id]);

  return {
    users,
    isLoading,
    error,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
    clearError: () => setError(null),
  };
}
