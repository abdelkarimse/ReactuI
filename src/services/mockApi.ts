// Mock Data Service - Simulates Backend API
// This file contains all mock data and API simulation functions
// Replace these functions with real API calls when backend is ready

import type { AuthUser, AuthDocument, Session, AuthResponse } from '../types/auth';

// ============================================
// STORAGE KEYS
// ============================================
const STORAGE_KEYS = {
  USERS: 'mock_users',
  DOCUMENTS: 'mock_documents',
  SESSION: 'mock_session',
} as const;

// ============================================
// INITIAL SEED DATA
// ============================================

const SEED_USERS: AuthUser[] = [
  {
    id: 'user-001',
    email: 'admin@docmanager.com',
    password: 'admin123', // Plaintext for demo only!
    role: 'admin',
    firstName: 'John',
    lastName: 'Administrator',
    createdAt: '2024-01-15T10:00:00Z',
    lastLogin: null,
    isActive: true,
  },
  {
    id: 'user-002',
    email: 'alice@example.com',
    password: 'alice123', // Plaintext for demo only!
    role: 'user',
    firstName: 'Alice',
    lastName: 'Johnson',
    createdAt: '2024-02-20T14:30:00Z',
    lastLogin: null,
    isActive: true,
  },
  {
    id: 'user-003',
    email: 'bob@example.com',
    password: 'bob123', // Plaintext for demo only!
    role: 'user',
    firstName: 'Bob',
    lastName: 'Smith',
    createdAt: '2024-03-10T09:15:00Z',
    lastLogin: null,
    isActive: true,
  },
];

const SEED_DOCUMENTS: AuthDocument[] = [
  // Alice's documents
  {
    id: 'doc-001',
    userId: 'user-002',
    ownerId: 'user-002',
    ownerName: 'Alice Johnson',
    filename: 'Q4_Financial_Report_2024.pdf',
    fileType: 'pdf',
    fileSize: 2516582, // ~2.4 MB
    uploadDate: '2024-11-15T10:30:00Z',
    aiSummary: 'This document contains the Q4 2024 financial report with quarterly earnings, revenue breakdown by department, and year-over-year comparison. Key highlights include a 15% increase in revenue, improved profit margins of 23%, and successful expansion into three new markets.',
    aiKeywords: ['financial', 'quarterly report', 'revenue', 'earnings', 'Q4 2024', 'profit margins', 'growth'],
    isPublic: false,
    fileUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf',
    title: 'Q4 Financial Report 2024',
    description: 'Quarterly financial analysis and projections',
  },
  {
    id: 'doc-002',
    userId: 'user-002',
    ownerId: 'user-002',
    ownerName: 'Alice Johnson',
    filename: 'Project_Proposal_AI_Integration.docx',
    fileType: 'docx',
    fileSize: 876544, // ~856 KB
    uploadDate: '2024-10-28T14:45:00Z',
    accessStart: '2024-10-01T00:00:00Z',
    accessEnd: '2025-12-31T23:59:59Z',
    aiSummary: 'A comprehensive proposal for integrating AI capabilities into the existing document management system. The proposal outlines a 6-month implementation timeline, a budget of $150,000, and projects a 40% improvement in document processing efficiency.',
    aiKeywords: ['AI', 'proposal', 'integration', 'machine learning', 'automation', 'ROI', 'efficiency'],
    isPublic: false,
    fileUrl: '/mock-files/ai-proposal.docx',
    title: 'AI Integration Proposal',
    description: 'Proposal for AI-powered document analysis features',
  },
  {
    id: 'doc-006',
    userId: 'user-002',
    ownerId: 'user-002',
    ownerName: 'Alice Johnson',
    filename: 'Marketing_Campaign_Results.xlsx',
    fileType: 'xlsx',
    fileSize: 1258291, // ~1.2 MB
    uploadDate: '2024-12-01T09:15:00Z',
    aiSummary: 'Comprehensive analysis of Q3 marketing campaign performance across digital channels. Key metrics include 250% ROI on social media spend, 45% increase in organic traffic, and 12,000 new leads generated from paid campaigns.',
    aiKeywords: ['marketing', 'campaign', 'analytics', 'ROI', 'leads', 'social media', 'digital'],
    isPublic: false,
    fileUrl: '/mock-files/marketing-results.xlsx',
    title: 'Marketing Campaign Results',
    description: 'Q3 marketing performance analytics',
  },
  {
    id: 'doc-007',
    userId: 'user-002',
    ownerId: 'user-002',
    ownerName: 'Alice Johnson',
    filename: 'Team_Photo_Retreat_2024.jpg',
    fileType: 'jpg',
    fileSize: 5033164, // ~4.8 MB
    uploadDate: '2024-11-28T16:30:00Z',
    aiSummary: 'Group photograph from the 2024 annual company retreat held at Mountain View Resort. The image shows 47 team members participating in team-building activities outdoors.',
    aiKeywords: ['team', 'photo', 'retreat', 'company event', '2024', 'employees'],
    isPublic: true,
    fileUrl: 'https://picsum.photos/seed/retreat2024/1200/800',
    title: 'Team Photo - Retreat 2024',
    description: 'Annual company retreat group photo',
  },
  
  // Bob's documents
  {
    id: 'doc-003',
    userId: 'user-003',
    ownerId: 'user-003',
    ownerName: 'Bob Smith',
    filename: 'Employee_Handbook_2024.pdf',
    fileType: 'pdf',
    fileSize: 1887436, // ~1.8 MB
    uploadDate: '2024-09-05T09:00:00Z',
    aiSummary: 'The official 2024 employee handbook covering company policies, benefits, code of conduct, and workplace guidelines. This edition includes updated remote work policies, mental health resources, and the new parental leave program.',
    aiKeywords: ['handbook', 'policies', 'HR', 'employee', 'benefits', 'remote work', 'guidelines'],
    isPublic: true,
    fileUrl: 'https://www.africau.edu/images/default/sample.pdf',
    title: 'Employee Handbook 2024',
    description: 'Company policies and guidelines for all employees',
  },
  {
    id: 'doc-004',
    userId: 'user-003',
    ownerId: 'user-003',
    ownerName: 'Bob Smith',
    filename: 'Meeting_Notes_Nov2024.txt',
    fileType: 'txt',
    fileSize: 24576, // ~24 KB
    uploadDate: '2024-11-20T16:20:00Z',
    accessStart: '2024-11-01T00:00:00Z',
    accessEnd: '2024-11-30T23:59:59Z',
    aiSummary: 'Notes from the November 2024 team meeting discussing project milestones, upcoming deadlines, and resource allocation for Q1 2025. Action items assigned to 8 team members with target completion by end of month.',
    aiKeywords: ['meeting', 'notes', 'milestones', 'planning', 'team', 'deadlines', 'Q1 2025'],
    isPublic: false,
    fileUrl: '/mock-files/meeting-notes.txt',
    title: 'November Meeting Notes',
    description: 'Team meeting notes and action items',
  },
  {
    id: 'doc-008',
    userId: 'user-003',
    ownerId: 'user-003',
    ownerName: 'Bob Smith',
    filename: 'Product_Roadmap_2025.pptx',
    fileType: 'pptx',
    fileSize: 5872025, // ~5.6 MB
    uploadDate: '2024-11-25T11:00:00Z',
    aiSummary: 'Strategic product roadmap presentation for 2025, outlining 4 major product releases, 12 feature enhancements, and integration with 3 new third-party platforms. Includes competitor analysis and market positioning strategy.',
    aiKeywords: ['roadmap', 'product', 'strategy', '2025', 'features', 'planning', 'releases'],
    isPublic: false,
    fileUrl: '/mock-files/roadmap-2025.pptx',
    title: 'Product Roadmap 2025',
    description: 'Strategic product planning for next year',
  },
  {
    id: 'doc-009',
    userId: 'user-003',
    ownerId: 'user-003',
    ownerName: 'Bob Smith',
    filename: 'Office_Floor_Plan.png',
    fileType: 'png',
    fileSize: 2202009, // ~2.1 MB
    uploadDate: '2024-10-15T14:30:00Z',
    aiSummary: 'Updated floor plan for the new headquarters office space showing desk assignments, meeting room locations, and common areas. The layout accommodates 120 workstations with 8 conference rooms and 4 collaboration zones.',
    aiKeywords: ['floor plan', 'office', 'layout', 'workspace', 'headquarters', 'design'],
    isPublic: true,
    fileUrl: 'https://picsum.photos/seed/floorplan/1600/900',
    title: 'Office Floor Plan',
    description: 'New headquarters layout diagram',
  },
  
  // Admin's documents
  {
    id: 'doc-005',
    userId: 'user-001',
    ownerId: 'user-001',
    ownerName: 'John Administrator',
    filename: 'System_Architecture_Diagram.png',
    fileType: 'png',
    fileSize: 3355443, // ~3.2 MB
    uploadDate: '2024-08-12T11:00:00Z',
    aiSummary: 'High-level system architecture diagram showing the document management platform infrastructure, including 5 microservices, PostgreSQL and Redis databases, AWS deployment, and API gateway configuration.',
    aiKeywords: ['architecture', 'diagram', 'infrastructure', 'system design', 'technical', 'microservices', 'AWS'],
    isPublic: false,
    fileUrl: 'https://picsum.photos/seed/architecture/1400/1000',
    title: 'System Architecture',
    description: 'Technical architecture overview of the platform',
  },
  {
    id: 'doc-010',
    userId: 'user-001',
    ownerId: 'user-001',
    ownerName: 'John Administrator',
    filename: 'Security_Audit_Report.pdf',
    fileType: 'pdf',
    fileSize: 911360, // ~890 KB
    uploadDate: '2024-12-02T10:00:00Z',
    aiSummary: 'Annual security audit report conducted by external firm CyberSecure Inc. The audit found 2 critical vulnerabilities (now patched), 5 medium-severity issues, and overall compliance with SOC 2 Type II standards.',
    aiKeywords: ['security', 'audit', 'compliance', 'vulnerabilities', 'SOC 2', 'cybersecurity', 'report'],
    isPublic: false,
    fileUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf',
    title: 'Security Audit Report',
    description: 'Annual security assessment and findings',
  },
  {
    id: 'doc-011',
    userId: 'user-001',
    ownerId: 'user-001',
    ownerName: 'John Administrator',
    filename: 'API_Documentation.json',
    fileType: 'json',
    fileSize: 159744, // ~156 KB
    uploadDate: '2024-11-10T15:45:00Z',
    aiSummary: 'OpenAPI 3.0 specification for the document management REST API. Includes 45 endpoints across 8 resource categories: documents, users, authentication, uploads, search, analytics, webhooks, and administration.',
    aiKeywords: ['API', 'documentation', 'REST', 'OpenAPI', 'endpoints', 'developers', 'integration'],
    isPublic: true,
    fileUrl: '/mock-files/api-docs.json',
    title: 'API Documentation',
    description: 'REST API specification and reference',
  },
  {
    id: 'doc-012',
    userId: 'user-001',
    ownerId: 'user-001',
    ownerName: 'John Administrator',
    filename: 'Database_Schema_v2.svg',
    fileType: 'svg',
    fileSize: 79872, // ~78 KB
    uploadDate: '2024-10-20T09:30:00Z',
    accessStart: '2024-10-01T00:00:00Z',
    accessEnd: '2025-06-30T23:59:59Z',
    aiSummary: 'Entity-relationship diagram for the document management database schema version 2. Shows 24 tables including documents, users, permissions, audit_logs, and the new analytics tables added in this version.',
    aiKeywords: ['database', 'schema', 'ERD', 'tables', 'design', 'PostgreSQL', 'data model'],
    isPublic: false,
    fileUrl: '/mock-files/db-schema.svg',
    title: 'Database Schema v2',
    description: 'Database design documentation',
  },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Simulate network delay for realistic UX
 */
const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate random delay between min and max milliseconds
 */
const randomDelay = (min: number = 300, max: number = 800): Promise<void> => 
  delay(Math.floor(Math.random() * (max - min + 1)) + min);

/**
 * Generate a mock JWT-like token
 */
const generateMockToken = (): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ 
    iat: Date.now(), 
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    jti: Math.random().toString(36).substring(2)
  }));
  const signature = btoa(Math.random().toString(36).substring(2, 15));
  return `${header}.${payload}.${signature}`;
};

/**
 * Check if a document is within its access window
 */
const isDocumentAccessible = (doc: AuthDocument): boolean => {
  const now = new Date();
  
  if (doc.accessStart) {
    const startDate = new Date(doc.accessStart);
    if (now < startDate) return false;
  }
  
  if (doc.accessEnd) {
    const endDate = new Date(doc.accessEnd);
    if (now > endDate) return false;
  }
  
  return true;
};

// ============================================
// DATA INITIALIZATION
// ============================================

/**
 * Initialize mock database in localStorage if not exists
 */
export const initializeMockDatabase = (): void => {
  // Only seed if data doesn't exist
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.DOCUMENTS)) {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(SEED_DOCUMENTS));
  }
};

/**
 * Reset mock database to initial seed data
 */
export const resetMockDatabase = (): void => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
  localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(SEED_DOCUMENTS));
  localStorage.removeItem(STORAGE_KEYS.SESSION);
};

// ============================================
// USER DATA ACCESS
// ============================================

const getUsers = (): AuthUser[] => {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : [];
};

const saveUsers = (users: AuthUser[]): void => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

// ============================================
// DOCUMENT DATA ACCESS
// ============================================

const getDocuments = (): AuthDocument[] => {
  const data = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
  return data ? JSON.parse(data) : [];
};

const saveDocuments = (documents: AuthDocument[]): void => {
  localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
};

// ============================================
// SESSION MANAGEMENT
// ============================================

const getStoredSession = (): Session | null => {
  const data = localStorage.getItem(STORAGE_KEYS.SESSION);
  if (!data) return null;
  
  const session: Session = JSON.parse(data);
  
  // Check if session is expired
  if (Date.now() > session.expiresAt) {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    return null;
  }
  
  return session;
};

const saveSession = (session: Session): void => {
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
};

const clearSession = (): void => {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
};

// ============================================
// MOCK API SERVICE
// ============================================

export const mockApiService = {
  /**
   * Authenticate user with email and password
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    await randomDelay(400, 700);
    
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    if (user.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    if (!user.isActive) {
      throw new Error('Your account has been deactivated. Please contact support.');
    }
    
    // Update last login
    const updatedUsers = users.map(u => 
      u.id === user.id 
        ? { ...u, lastLogin: new Date().toISOString() }
        : u
    );
    saveUsers(updatedUsers);
    
    // Create session
    const { password: _, ...userWithoutPassword } = user;
    const session: Session = {
      token: generateMockToken(),
      user: { ...userWithoutPassword, lastLogin: new Date().toISOString() },
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };
    
    saveSession(session);
    
    return {
      success: true,
      message: 'Login successful',
      session,
    };
  },

  /**
   * Log out current user
   */
  logout: async (): Promise<void> => {
    await randomDelay(200, 400);
    clearSession();
  },

  /**
   * Get current authenticated user from session
   */
  getCurrentUser: async (): Promise<Session | null> => {
    await randomDelay(200, 400);
    return getStoredSession();
  },

  /**
   * Validate if current session is still valid
   */
  validateSession: async (): Promise<boolean> => {
    await randomDelay(100, 200);
    const session = getStoredSession();
    return session !== null;
  },

  /**
   * Get documents for a specific user (filtered by access windows)
   */
  getUserDocuments: async (userId: string, includeExpired: boolean = false): Promise<AuthDocument[]> => {
    await randomDelay(300, 600);
    
    const documents = getDocuments();
    return documents.filter(doc => {
      // Must belong to user
      if (doc.userId !== userId) return false;
      
      // Check temporal access unless includeExpired is true
      if (!includeExpired && !isDocumentAccessible(doc)) return false;
      
      return true;
    });
  },

  /**
   * Get all documents (admin only)
   */
  getAllDocuments: async (includeExpired: boolean = true): Promise<AuthDocument[]> => {
    await randomDelay(300, 600);
    
    const documents = getDocuments();
    
    if (includeExpired) {
      return documents;
    }
    
    return documents.filter(isDocumentAccessible);
  },

  /**
   * Get all users (admin only)
   */
  getAllUsers: async (): Promise<Omit<AuthUser, 'password'>[]> => {
    await randomDelay(300, 600);
    
    const users = getUsers();
    return users.map(({ password: _, ...user }) => user);
  },

  /**
   * Upload a new document
   */
  uploadDocument: async (
    file: File, 
    userId: string,
    metadata?: Partial<Pick<AuthDocument, 'accessStart' | 'accessEnd' | 'isPublic'>>
  ): Promise<AuthDocument> => {
    // Simulate longer delay for upload + AI processing
    await delay(2000 + Math.random() * 1000); // 2-3 seconds
    
    const documents = getDocuments();
    const users = getUsers();
    const owner = users.find(u => u.id === userId);
    
    // Generate mock AI summary and keywords
    const aiSummary = `This is an automatically generated summary for "${file.name}". The document has been analyzed and contains relevant content related to your organization's needs.`;
    const aiKeywords = ['document', 'uploaded', file.name.split('.')[0].toLowerCase()];
    
    const newDocument: AuthDocument = {
      id: `doc-${Date.now()}`,
      userId,
      ownerId: userId,
      ownerName: owner ? `${owner.firstName} ${owner.lastName}` : 'Unknown User',
      filename: file.name,
      fileType: file.name.split('.').pop() || 'unknown',
      fileSize: file.size, // Size in bytes
      uploadDate: new Date().toISOString(),
      aiSummary,
      aiKeywords,
      isPublic: metadata?.isPublic ?? false,
      fileUrl: URL.createObjectURL(file), // Create temporary URL
      title: file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
      description: 'Uploaded document',
      ...metadata,
    };
    
    documents.push(newDocument);
    saveDocuments(documents);
    
    return newDocument;
  },

  /**
   * Delete a document
   */
  deleteDocument: async (
    docId: string, 
    userId: string, 
    isAdmin: boolean
  ): Promise<void> => {
    await randomDelay(300, 500);
    
    const documents = getDocuments();
    const docIndex = documents.findIndex(d => d.id === docId);
    
    if (docIndex === -1) {
      throw new Error('Document not found');
    }
    
    const doc = documents[docIndex];
    
    // Check permission
    if (!isAdmin && doc.userId !== userId) {
      throw new Error('You do not have permission to delete this document');
    }
    
    documents.splice(docIndex, 1);
    saveDocuments(documents);
  },

  /**
   * Update a document
   */
  updateDocument: async (
    docId: string,
    updates: Partial<AuthDocument>,
    userId: string,
    isAdmin: boolean
  ): Promise<AuthDocument> => {
    await randomDelay(300, 500);
    
    const documents = getDocuments();
    const docIndex = documents.findIndex(d => d.id === docId);
    
    if (docIndex === -1) {
      throw new Error('Document not found');
    }
    
    const doc = documents[docIndex];
    
    // Check permission
    if (!isAdmin && doc.userId !== userId) {
      throw new Error('You do not have permission to update this document');
    }
    
    const updatedDoc = { ...doc, ...updates };
    documents[docIndex] = updatedDoc;
    saveDocuments(documents);
    
    return updatedDoc;
  },

  /**
   * Get a single document by ID
   */
  getDocumentById: async (
    docId: string,
    userId: string,
    isAdmin: boolean
  ): Promise<AuthDocument | null> => {
    await randomDelay(200, 400);
    
    const documents = getDocuments();
    const doc = documents.find(d => d.id === docId);
    
    if (!doc) return null;
    
    // Check permission
    if (!isAdmin && doc.userId !== userId && !doc.isPublic) {
      throw new Error('You do not have permission to view this document');
    }
    
    return doc;
  },

  /**
   * Search documents
   */
  searchDocuments: async (
    query: string,
    userId: string,
    isAdmin: boolean
  ): Promise<AuthDocument[]> => {
    await randomDelay(300, 600);
    
    const documents = getDocuments();
    const lowerQuery = query.toLowerCase();
    
    return documents.filter(doc => {
      // Permission check
      if (!isAdmin && doc.userId !== userId && !doc.isPublic) {
        return false;
      }
      
      // Search in various fields
      return (
        doc.title.toLowerCase().includes(lowerQuery) ||
        doc.filename.toLowerCase().includes(lowerQuery) ||
        doc.description.toLowerCase().includes(lowerQuery) ||
        doc.aiSummary.toLowerCase().includes(lowerQuery) ||
        doc.aiKeywords.some(k => k.toLowerCase().includes(lowerQuery))
      );
    });
  },

  /**
   * Create a new user (admin only)
   */
  createUser: async (userData: Omit<AuthUser, 'id' | 'createdAt' | 'lastLogin'>): Promise<Omit<AuthUser, 'password'>> => {
    await randomDelay(300, 500);
    
    const users = getUsers();
    
    // Check if email already exists
    if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('A user with this email already exists');
    }
    
    const newUser: AuthUser = {
      ...userData,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastLogin: null,
    };
    
    users.push(newUser);
    saveUsers(users);
    
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  /**
   * Update user (admin only)
   */
  updateUser: async (
    userId: string,
    updates: Partial<Omit<AuthUser, 'id' | 'createdAt'>>
  ): Promise<Omit<AuthUser, 'password'>> => {
    await randomDelay(300, 500);
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    const updatedUser = { ...users[userIndex], ...updates };
    users[userIndex] = updatedUser;
    saveUsers(users);
    
    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  },

  /**
   * Delete user (admin only)
   */
  deleteUser: async (userId: string): Promise<void> => {
    await randomDelay(300, 500);
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    users.splice(userIndex, 1);
    saveUsers(users);
    
    // Also delete user's documents
    const documents = getDocuments();
    const filteredDocs = documents.filter(d => d.userId !== userId);
    saveDocuments(filteredDocs);
  },
};

// ============================================
// TEST CREDENTIALS (for display on login page)
// ============================================

export const TEST_CREDENTIALS = [
  {
    role: 'Admin',
    email: 'admin@docmanager.com',
    password: 'admin123',
    description: 'Full access to all documents and user management',
  },
  {
    role: 'User',
    email: 'alice@example.com',
    password: 'alice123',
    description: 'Access to own documents only',
  },
  {
    role: 'User',
    email: 'bob@example.com',
    password: 'bob123',
    description: 'Access to own documents only',
  },
];
