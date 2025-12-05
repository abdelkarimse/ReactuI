// Authentication Types for Mock System

export type UserRole = 'admin' | 'user';

export interface AuthUser {
  id: string;
  email: string;
  password: string; // Plaintext for mock only - NEVER do this in production!
  role: UserRole;
  firstName: string;
  lastName: string;
  createdAt: string;
  lastLogin: string | null;
  isActive: boolean;
}

export interface AuthDocument {
  id: string;
  userId: string; // Owner
  ownerId?: string; // Alias for userId for display purposes
  ownerName?: string; // Owner's display name
  filename: string;
  fileType: string;
  fileSize: number; // Size in bytes
  fileSizeFormatted?: string; // Human-readable size string
  uploadDate: string;
  accessStart?: string; // Optional temporal access control
  accessEnd?: string;   // Optional temporal access control
  aiSummary: string;
  aiKeywords: string[];
  isPublic: boolean;
  fileUrl: string;
  title: string;
  description: string;
}

export interface Session {
  token: string;
  user: Omit<AuthUser, 'password'>;
  expiresAt: number; // Unix timestamp
}

export interface AuthContextType {
  user: Omit<AuthUser, 'password'> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  session?: Session;
}

// For document filtering
export interface DocumentFilter {
  userId?: string;
  includeExpired?: boolean;
  searchQuery?: string;
}
