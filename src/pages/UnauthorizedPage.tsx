import { useNavigate, useLocation } from 'react-router-dom';
import { FiShield, FiArrowLeft, FiHome } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../Zustand/themeStore';

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isDark = theme === 'dark';

  const attemptedPath = location.state?.attemptedPath || 'unknown';

  const handleGoBack = () => {
    // Go to appropriate dashboard based on role
    const dashboardPath = user?.role === 'admin' 
      ? '/admin/dashboard' 
      : '/client/dashboard';
    navigate(dashboardPath, { replace: true });
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`max-w-md w-full text-center p-8 rounded-2xl shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Icon */}
        <div className="mb-6">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${isDark ? 'bg-red-900/30' : 'bg-red-100'}`}>
            <FiShield className="text-red-500" size={40} />
          </div>
        </div>

        {/* Title */}
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Access Denied
        </h1>

        {/* Error Code */}
        <p className={`text-6xl font-bold mb-4 ${isDark ? 'text-gray-700' : 'text-gray-200'}`}>
          403
        </p>

        {/* Description */}
        <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          You don't have permission to access this page.
        </p>

        {/* Details Box */}
        <div className={`p-4 rounded-lg mb-6 text-left ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className="flex justify-between mb-2">
              <span>Attempted path:</span>
              <span className="font-mono text-red-500">{attemptedPath}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Your role:</span>
              <span className={`font-semibold capitalize ${user?.role === 'admin' ? 'text-purple-500' : 'text-blue-500'}`}>
                {user?.role || 'Unknown'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Logged in as:</span>
              <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {user?.email || 'Unknown'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleGoBack}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <FiHome size={18} />
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate(-1)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-colors ${
              isDark 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FiArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Logout Option */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className={`text-sm mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Need to access with different account?
          </p>
          <button
            onClick={handleLogout}
            className={`text-sm font-medium ${isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'} transition-colors`}
          >
            Sign out and use another account
          </button>
        </div>
      </div>
    </div>
  );
}
