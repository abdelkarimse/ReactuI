import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import type { NotificationItem } from "../types/notifcations";
import { DocumentList, UploadZone, DocumentViewer, ConfirmDialog } from "../components/documents";
import { useAuth } from "../context/AuthContext";
import { mockApiService } from "../services/mockApi";
import type { AuthDocument } from "../types/auth";
import { FileText, Upload, FolderOpen } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type TabType = 'documents' | 'upload';

export default function DashboardClient() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [documents, setDocuments] = useState<AuthDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('documents');
  const [selectedDocument, setSelectedDocument] = useState<AuthDocument | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AuthDocument | null>(null);
  const { user } = useAuth();

  // Load user's documents
  const loadDocuments = useCallback(async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const docs = await mockApiService.getUserDocuments(user.id);
      setDocuments(docs);
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  // Sample notifications
  const notifications: NotificationItem[] = [
    {
      id: 1,
      title: "Welcome",
      message: `Welcome to your dashboard, ${user?.firstName || 'User'}!`,
      time: "Just now",
      type: "info",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleViewDocument = (doc: AuthDocument) => {
    setSelectedDocument(doc);
    setIsViewerOpen(true);
  };

  const handleDownloadDocument = (doc: AuthDocument) => {
    console.log('Downloading:', doc.title);
    alert(`Downloading "${doc.title}"...\n\nIn a real app, this would download from: ${doc.fileUrl}`);
  };

  const handleDeleteDocument = (doc: AuthDocument) => {
    setDeleteTarget(doc);
  };

  const confirmDelete = async () => {
    if (!deleteTarget || !user) return;
    
    try {
      await mockApiService.deleteDocument(deleteTarget.id, user.id, user.role === 'admin');
      setDocuments(prev => prev.filter(d => d.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (error) {
      console.error('Failed to delete document:', error);
      alert('Failed to delete document');
    }
  };

  const handleUploadComplete = async (_uploadedDocs: AuthDocument[]) => {
    await loadDocuments();
    setActiveTab('documents'); // Switch to documents tab after upload
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onToggleSidebar={toggleSidebar}
        isOpen={isSidebarOpen}
        notifications={notifications}
      />

      <main className="pt-16 px-4 sm:px-6 lg:px-8">
        {/* Welcome message */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold">
              Welcome, {user?.firstName || 'User'}!
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              You have {documents.length} document{documents.length !== 1 ? 's' : ''} in your library.
            </p>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabType)} className="space-y-6">
          <TabsList>
            <TabsTrigger value="documents" className="gap-2">
              <FileText className="w-4 h-4" />
              My Documents
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-2">
              <Upload className="w-4 h-4" />
              Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-6">
            {documents.length === 0 && !isLoading ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="p-4 bg-muted rounded-full mb-4">
                    <FolderOpen className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    No documents yet
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload your first document to get started
                  </p>
                  <Button onClick={() => setActiveTab('upload')}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <DocumentList
                documents={documents}
                onView={handleViewDocument}
                onDownload={handleDownloadDocument}
                onDelete={handleDeleteDocument}
                isLoading={isLoading}
                isAdmin={false}
              />
            )}
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Upload New Documents
              </h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop files or click to browse. Your documents will be analyzed with AI for better searchability.
              </p>
            </div>
            <UploadZone
              onUploadComplete={handleUploadComplete}
              userId={user?.id || ''}
              maxFiles={5}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          isOpen={isViewerOpen}
          onClose={() => {
            setIsViewerOpen(false);
            setSelectedDocument(null);
          }}
          onDownload={() => handleDownloadDocument(selectedDocument)}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Document"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        variant="danger"
      />
    </div>
  );
}
