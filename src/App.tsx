import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Dashboard } from './Admin/Dashboard'
import './App.css'
import DashboardClient from './Client/DashboardClient';
import { AuthProvider } from './context/AuthContext';
import { 
  ProtectedRoute, 
  PublicOnlyRoute, 
  RoleBasedRedirect 
} from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import { CommandPalette } from './components/CommandPalette';
import { TooltipProvider } from '@/components/ui/tooltip';

function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <Router>
          <CommandPalette />
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                <PublicOnlyRoute>
                  <LoginPage />
                </PublicOnlyRoute>
              } 
            />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Role-Based Redirect from Root */}
            <Route path="/" element={<RoleBasedRedirect />} />

            {/* Admin Routes - Protected, Admin Only */}
            <Route 
              path="/admin/dashboard/*" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />

            {/* Client Routes - Protected, Users Only */}
            <Route 
              path="/client/dashboard/*" 
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <DashboardClient />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all redirect to login */}
            <Route path="*" element={<RoleBasedRedirect />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </AuthProvider>
  )
}

export default App
