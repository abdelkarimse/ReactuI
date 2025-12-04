import { useState } from 'react';
import { MdDescription, MdPeople } from 'react-icons/md';
import { useTheme } from '../Zustand/themeStore';

interface SidebarItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  route: string;
}

interface SidebarProps {
  onItemClick?: (route: string) => void;
}

export const Sidebar = ({ onItemClick }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState<string>('documents');
  const theme = useTheme();

  const sidebarItems: SidebarItem[] = [
    {
      id: 'documents',
      title: 'Documents',
      icon: <MdDescription size={24} />,
      route: '/admin/dashboard/documents',
    },
    {
      id: 'users',
      title: 'Users',
      icon: <MdPeople size={24} />,
      route: '/admin/dashboard/users',
    },
  ];

  const handleItemClick = (item: SidebarItem) => {
    setActiveItem(item.id);
    onItemClick?.(item.route);
  };

  return (
    <aside className={`fixed w-64 ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'} h-screen p-6 overflow-y-auto`}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      <nav className="space-y-3">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeItem === item.id
                ? 'bg-blue-600 text-white shadow-lg'
                : theme === 'dark'
                ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span className="text-lg font-medium">{item.title}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
