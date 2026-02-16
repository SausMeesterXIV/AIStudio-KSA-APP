import React, { useEffect, useState } from 'react';

export const SettingsScreen: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-4 flex items-center justify-between">
        <button className="flex items-center justify-center p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <span className="material-icons-round text-2xl text-gray-600 dark:text-gray-300">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Instellingen</h1>
        <div className="w-8"></div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {/* Profile */}
        <section className="p-6 flex flex-col items-center border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark/30">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full border-4 border-primary/20 p-1">
              <img src="https://i.pravatar.cc/150?u=jan" alt="Profile" className="w-full h-full rounded-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-lg border-2 border-background-light dark:border-background-dark">
              <span className="material-icons-round text-sm block">edit</span>
            </button>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Jan Janssens</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">KSA Sint-Jan</p>
        </section>

        {/* Roles */}
        <section className="p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 px-1">Jouw Rollen</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Hoofdleiding', color: 'text-primary bg-primary/10 border-primary/20', icon: 'star' },
              { label: 'Team Drank', color: 'text-green-600 bg-green-500/10 border-green-500/20', icon: 'local_bar' },
              { label: 'Kampcomité', color: 'text-amber-600 bg-amber-500/10 border-amber-500/20', icon: 'camping' }
            ].map(role => (
              <span key={role.label} className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold border ${role.color}`}>
                <span className="material-icons-round text-lg mr-1.5">{role.icon}</span>
                {role.label}
              </span>
            ))}
          </div>
        </section>

        {/* Toggles */}
        <section className="px-4 py-2 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 px-1">Voorkeuren</h3>
            <div className="bg-white dark:bg-surface-dark rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
              {/* Dark Mode */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800/50">
                <div className="flex items-center gap-3">
                  <span className="material-icons-round text-primary">dark_mode</span>
                  <span className="font-medium text-gray-900 dark:text-white">Donkere Weergave</span>
                </div>
                <button 
                  onClick={toggleDarkMode}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-200 ease-in-out focus:outline-none ${isDark ? 'bg-primary' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${isDark ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

               {/* Notifications */}
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="material-icons-round text-primary">notifications</span>
                  <span className="font-medium text-gray-900 dark:text-white">Meldingen</span>
                </div>
                <span className="material-icons-round text-gray-400">chevron_right</span>
              </button>
            </div>
          </div>
          
           {/* Logout */}
           <button className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 dark:bg-red-900/10 dark:text-red-400 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
             <span className="material-icons-round">logout</span>
             Uitloggen
           </button>
        </section>
      </main>
    </div>
  );
};