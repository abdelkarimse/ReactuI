import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useTheme } from '../Zustand/themeStore';
import { Documents } from './Documents';
import { Users } from './Users';

export const Dashboard = () => {
  const theme = useTheme();
  const isDark = theme === 'dark';
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarItemClick = (route: string) => {
    navigate(route);
  };

  const renderContent = () => {
    switch (location.pathname) {
      case '/admin/dashboard/documents':
        return <Documents />;
      case '/admin/dashboard/users':
        return <Users />;
      default:
        return <Documents />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {isSidebarOpen && <Sidebar onItemClick={handleSidebarItemClick} />}
      <div className={`flex flex-col ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        <Navbar onToggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
