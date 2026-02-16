import React from 'react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home', icon: 'home', label: 'Start' },
    { id: 'strepen', icon: 'local_bar', label: 'Strepen' },
    { id: 'agenda', icon: 'event', label: 'Agenda' },
    { id: 'settings', icon: 'person', label: 'Profiel' },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 pb-safe pt-2 px-6 z-50">
      <div className="flex justify-between items-center pb-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center gap-1 p-2 transition-colors duration-200 ${
              activeTab === item.id
                ? 'text-primary dark:text-blue-400'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            <span className="material-icons-round text-2xl">{item.icon}</span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};