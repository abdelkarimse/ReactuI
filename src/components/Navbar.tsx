import { useState } from 'react';
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiBell, 
  FiUser, 
  FiSettings, 
  FiLogOut, 
  FiSun, 
  FiMoon
} from 'react-icons/fi';
import { useThemeStore } from '../Zustand/themeStore';
import type { NotificationItem } from '../types/notifcations';
import { IoShuffleSharp } from 'react-icons/io5';
import { LiaWindowCloseSolid } from 'react-icons/lia';

interface NavbarProps {
  onToggleSidebar?: () => void;
  isOpen?: boolean; 
  isAdmin?: boolean;    
    notifications?: NotificationItem[];
}

export default function Navbar({ onToggleSidebar, isOpen, isAdmin, notifications }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNotifDropdown = () => {
    setIsNotifOpen(!isNotifOpen);
  };

  const relaall = () => {
    // Reveal all notifications function
    console.log('Reveal all notifications', notifications);
    // Add your logic here to handle revealing all notifications
  };

  const notificationCount = notifications?.length || 0;
  const displayedNotifications = notifications?.slice(0, 3) || [];

  return (
    <nav className={`sticky top-0 z-50 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} transition-all duration-300`}>
      <div className="max-w-full mx-auto  sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            {isAdmin ? (
            <button
              onClick={() => {
                onToggleSidebar?.();
              }}
              className={`p-2.5 rounded-lg transition-all duration-200 ${isDark ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'}`}
              aria-label="Toggle sidebar"
            >
              {isOpen ? <LiaWindowCloseSolid    size={20} /> : <IoShuffleSharp size={20} />}
            </button>
            ) : (
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                inteli
              </div>
            )}
          </div>


              
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {/* Notification Icon */}
            <div className="relative">
              <button 
                onClick={toggleNotifDropdown}
                className={`relative p-2.5 rounded-lg transition-all duration-200 ${isDark ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'}`}
              >
                <FiBell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotifOpen && (
                <div className={`absolute right-0 mt-3 w-96 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-2xl py-3 z-50 border transition-all duration-200 max-h-96 overflow-y-auto`}>
                  <div className={`px-4 py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                    <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
                  </div>

                  {/* Notifications List */}
                  {displayedNotifications && displayedNotifications.length > 0 ? (
                    <div className="max-h-80 overflow-y-auto">
                      {displayedNotifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`px-4 py-3 border-b ${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'} transition-colors duration-150`}
                        >
                          <div className="flex items-start gap-3">
                            {/* Notification Icon based on type */}
                            <div className={`p-2 rounded-lg flex-shrink-0 ${
                              notif.type === 'info' ? (isDark ? 'bg-blue-900' : 'bg-blue-100') :
                              notif.type === 'success' ? (isDark ? 'bg-green-900' : 'bg-green-100') :
                              notif.type === 'warning' ? (isDark ? 'bg-yellow-900' : 'bg-yellow-100') :
                              (isDark ? 'bg-red-900' : 'bg-red-100')
                            }`}>
                              <div className={`text-lg ${
                                notif.type === 'info' ? (isDark ? 'text-blue-400' : 'text-blue-600') :
                                notif.type === 'success' ? (isDark ? 'text-green-400' : 'text-green-600') :
                                notif.type === 'warning' ? (isDark ? 'text-yellow-400' : 'text-yellow-600') :
                                (isDark ? 'text-red-400' : 'text-red-600')
                              }`}>
                                {notif.type === 'info' ? 'ℹ️' :
                                 notif.type === 'success' ? '✓' :
                                 notif.type === 'warning' ? '⚠️' : '✕'}
                              </div>
                            </div>

                            {/* Notification Content */}
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {notif.title}
                              </p>
                              <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {notif.message}
                              </p>
                              <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                {notif.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={`px-4 py-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <p className="text-sm">No notifications</p>
                    </div>
                  )}

                  {/* View All Button */}
                  {notificationCount > 0 && (
                    <button
                      onClick={() => {
                        relaall();
                        setIsNotifOpen(false);
                      }}
                      className={`w-full px-4 py-3 border-t ${isDark ? 'border-gray-700 text-blue-400 hover:bg-gray-700' : 'border-gray-100 text-blue-600 hover:bg-gray-50'} text-sm font-medium transition-colors duration-150`}
                    >
                      View all notifications
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-lg transition-all duration-200 hover:rotate-12 transform ${isDark ? 'text-gray-400 hover:bg-gray-800 hover:text-yellow-400' : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'}`}
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* User Dropdown */}
            <div className="relative ml-2">
              <button
                onClick={toggleDropdown}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold shadow-md transition-all duration-300 ${isDark ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-yellow-400 to-orange-500'}`}>
                  <FiUser size={16} />
                </div>
                <span className={`hidden lg:block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Profile</span>
              </button>
              
              {isDropdownOpen && (
                <div className={`absolute right-0 mt-3 w-64 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-2xl py-3 z-50 border transition-all duration-200`}>
                  <div className={`px-4 py-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                    <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>John Doe</p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>john@example.com</p>
                  </div>
                  <a
                    href="/profile"
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium ${isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'} transition-colors duration-150`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FiUser size={18} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                    My Profile
                  </a>
                  <a
                    href="/settings"
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium ${isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'} transition-colors duration-150`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FiSettings size={18} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                    Settings
                  </a>
                  <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-100'} my-2`}></div>
                  <a
                    href="/logout"
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium ${isDark ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300' : 'text-red-600 hover:bg-red-50 hover:text-red-700'} transition-colors duration-150`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FiLogOut size={18} />
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-lg transition-all duration-200 ${isDark ? 'text-gray-400 hover:bg-gray-800 hover:text-yellow-400' : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'}`}
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className={`p-2.5 rounded-lg focus:outline-none transition-all duration-200 ${isDark ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'}`}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden border-t ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
          <div className="px-3 pt-2 pb-3 space-y-1">
            <a
              href="/"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FiHome size={20} />
              Home
            </a>
            <a
              href="/notifications"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FiBell size={20} />
              Notifications
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-auto font-bold">3</span>
            </a>
            <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} my-3`}></div>
            <a
              href="/profile"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FiUser size={20} />
              Profile
            </a>
            <a
              href="/settings"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FiSettings size={20} />
              Settings
            </a>
            <a
              href="/logout"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isDark ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300' : 'text-red-600 hover:bg-red-50 hover:text-red-700'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FiLogOut size={20} />
              Logout
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
