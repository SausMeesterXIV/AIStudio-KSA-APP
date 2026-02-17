import React from 'react';
import { getCurrentUser } from '../lib/data';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  balance: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, balance }) => {
  const currentUser = getCurrentUser();
  const displayName = currentUser.nickname || currentUser.name.split(' ')[0];

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Header */}
      <header className="px-6 py-6 flex justify-between items-center bg-surface-light dark:bg-surface-dark shadow-sm sticky top-0 z-40">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Welkom, {displayName}</span>
          <h1 className="text-2xl font-bold text-primary dark:text-blue-500">KSA Startscherm</h1>
        </div>
        <div className="h-10 w-10 rounded-full border-2 border-primary overflow-hidden">
          <img 
            src={currentUser.avatar} 
            alt="Profile" 
            className="h-full w-full object-cover"
          />
        </div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-8">
        
        {/* Balance Card - Now Clickable */}
        <section 
          onClick={() => onNavigate('my-invoice')}
          className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 cursor-pointer hover:shadow-md transition-shadow group relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-2 relative z-10">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
              <span className="material-icons-round text-primary">receipt_long</span>
              Voorlopige Rekening
            </h2>
            <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs px-2 py-1 rounded-lg font-medium">Actief</span>
          </div>
          <div className="flex items-baseline gap-1 my-3 relative z-10">
            <span className="text-4xl font-bold text-primary dark:text-blue-400">€ {balance.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden mb-2 relative z-10">
            <div className="bg-primary dark:bg-blue-500 h-full w-3/4 rounded-full"></div>
          </div>
          <div className="flex justify-between items-center relative z-10">
             <p className="text-xs text-gray-500 dark:text-gray-400">Huidige maand limiet: € 20,00</p>
             <span className="text-xs font-bold text-primary dark:text-blue-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
               Details <span className="material-icons-round text-xs">arrow_forward</span>
             </span>
          </div>
        </section>

        {/* PRIMARY USER ACTIONS (Moved to Top) */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Strepen Module */}
          <div 
            onClick={() => onNavigate('strepen')}
            className="col-span-2 sm:col-span-1 bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-primary dark:text-blue-300">
                <span className="material-icons-round">local_bar</span>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Strepen</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-gray-700 transition-colors">
                <span className="text-gray-700 dark:text-gray-300">Strepen zetten</span>
                <span className="material-icons-round text-xs text-gray-400">arrow_forward_ios</span>
              </div>
            </div>
          </div>

          {/* Frieten Module */}
          <div 
            onClick={() => onNavigate('frieten')}
            className="col-span-2 sm:col-span-1 bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-400">
                <span className="material-icons-round">fastfood</span>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Frieten</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:bg-yellow-50 dark:group-hover:bg-gray-700 transition-colors">
                <span className="text-gray-700 dark:text-gray-300">Bestelling plaatsen</span>
                <span className="material-icons-round text-xs text-gray-400">arrow_forward_ios</span>
              </div>
            </div>
          </div>
        </div>

        {/* AGENDA (User View) */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
             <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <span className="material-icons-round text-primary">event</span>
                Mijn Agenda
             </h2>
             <button 
                onClick={() => onNavigate('agenda')}
                className="text-xs font-bold text-primary hover:text-blue-600"
             >
               Alles bekijken
             </button>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-2 shadow-sm border border-gray-100 dark:border-gray-800 space-y-1">
             {/* Event 1 */}
             <div 
                onClick={() => onNavigate('agenda')}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-colors cursor-pointer"
             >
                <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl h-14 w-14 flex flex-col items-center justify-center shrink-0 border border-gray-200 dark:border-gray-700">
                  <span className="text-lg font-bold leading-none">12</span>
                  <span className="text-[10px] font-bold uppercase leading-none text-gray-500">Okt</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">Leidingskring</h3>
                  <div className="flex items-center gap-3 text-gray-500 text-xs mt-0.5">
                    <span className="flex items-center gap-1">
                      <span className="material-icons-round text-[10px]">schedule</span> 20:00
                    </span>
                    <span className="flex items-center gap-1">
                       <span className="material-icons-round text-[10px]">place</span> Lokaal
                    </span>
                  </div>
                </div>
                <span className="material-icons-round text-gray-300">chevron_right</span>
             </div>

             <div className="h-px bg-gray-100 dark:bg-gray-800 mx-3"></div>

             {/* Event 2 */}
             <div 
                onClick={() => onNavigate('agenda')}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-colors cursor-pointer"
             >
                <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl h-14 w-14 flex flex-col items-center justify-center shrink-0 border border-gray-200 dark:border-gray-700">
                  <span className="text-lg font-bold leading-none">15</span>
                  <span className="text-[10px] font-bold uppercase leading-none text-gray-500">Okt</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">Startdag Voorbereiding</h3>
                  <div className="flex items-center gap-3 text-gray-500 text-xs mt-0.5">
                    <span className="flex items-center gap-1">
                      <span className="material-icons-round text-[10px]">schedule</span> 14:00
                    </span>
                     <span className="flex items-center gap-1">
                       <span className="material-icons-round text-[10px]">place</span> Terrein
                    </span>
                  </div>
                </div>
                <span className="material-icons-round text-gray-300">chevron_right</span>
             </div>
          </div>
        </section>

        {/* --- ADMIN SECTIONS BELOW --- */}
        
        {/* Hoofdleiding Section */}
        <section>
          <div className="flex items-center gap-2 mb-3 px-1">
             <span className="material-icons-round text-primary text-sm">admin_panel_settings</span>
             <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hoofdleiding</h2>
          </div>
          <div className="grid gap-3">
            {/* Rollen & Beheer Card */}
            <div 
              onClick={() => onNavigate('roles-manage')}
              className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                  <span className="material-icons-round">manage_accounts</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Rollen & Beheer</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Rechten aanpassen</p>
                </div>
              </div>
              <span className="material-icons-round text-gray-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </div>

            {/* Send Message Card */}
            <div 
              onClick={() => onNavigate('new-message')}
              className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <span className="material-icons-round">send</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Bericht Versturen</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Naar leiding of groepen</p>
                </div>
              </div>
              <span className="material-icons-round text-gray-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </div>
          </div>
        </section>

        {/* Team Drank Section */}
        <section>
          <div className="flex items-center gap-2 mb-3 px-1">
             <span className="material-icons-round text-primary text-sm">local_drink</span>
             <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Team Drank</h2>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="grid grid-cols-2 gap-3">
               <div 
                 onClick={() => onNavigate('team-drank-dashboard')}
                 className="flex flex-col gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
               >
                 <span className="material-icons-round text-blue-500 group-hover:scale-110 transition-transform">dashboard</span>
                 <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Dashboard</span>
               </div>
               
               <div 
                 onClick={() => onNavigate('team-drank-stock')}
                 className="flex flex-col gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
               >
                 <span className="material-icons-round text-orange-500 group-hover:scale-110 transition-transform">inventory_2</span>
                 <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Voorraad</span>
               </div>

               <div 
                 onClick={() => onNavigate('team-drank-billing')}
                 className="flex flex-col gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
               >
                 <span className="material-icons-round text-green-500 group-hover:scale-110 transition-transform">attach_money</span>
                 <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Rekeningen</span>
               </div>
               
               <div 
                 onClick={() => onNavigate('team-drank-invoices')}
                 className="flex flex-col gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
               >
                 <span className="material-icons-round text-purple-500 group-hover:scale-110 transition-transform">receipt_long</span>
                 <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Facturen</span>
               </div>
            </div>
          </div>
        </section>

        {/* Sfeerbeheer Section (Admin Only) */}
        <section>
           <div className="flex items-center gap-2 mb-3 px-1">
             <span className="material-icons-round text-primary text-sm">celebration</span>
             <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sfeerbeheer</h2>
          </div>
          
          <div 
              onClick={() => onNavigate('agenda-manage')}
              className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <span className="material-icons-round">edit_calendar</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Agenda Beheren</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Evenementen toevoegen of wijzigen</p>
                </div>
              </div>
              <span className="material-icons-round text-gray-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </div>
        </section>

      </main>
    </div>
  );
};