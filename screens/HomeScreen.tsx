import React from 'react';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Header */}
      <header className="px-6 py-6 flex justify-between items-center bg-surface-light dark:bg-surface-dark shadow-sm sticky top-0 z-40">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Welkom, Leider</span>
          <h1 className="text-2xl font-bold text-primary dark:text-blue-500">KSA Startscherm</h1>
        </div>
        <div className="h-10 w-10 rounded-full border-2 border-primary overflow-hidden">
          <img 
            src="https://i.pravatar.cc/150?u=jan" 
            alt="Profile" 
            className="h-full w-full object-cover"
          />
        </div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-6">
        {/* Balance Card */}
        <section className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <span className="material-icons-round text-primary">receipt_long</span>
              Voorlopige Rekening
            </h2>
            <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs px-2 py-1 rounded-lg font-medium">Actief</span>
          </div>
          <div className="flex items-baseline gap-1 my-3">
            <span className="text-4xl font-bold text-primary dark:text-blue-400">€ 14,50</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden mb-2">
            <div className="bg-primary dark:bg-blue-500 h-full w-3/4 rounded-full"></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Huidige maand limiet: € 20,00</p>
        </section>

        {/* Hoofdleiding Dashboard Section */}
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

        {/* Quick Access Grid */}
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
            className="col-span-2 sm:col-span-1 bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-400">
                <span className="material-icons-round">fastfood</span>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Frieten</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Bestellingen voor vrijdagavond beheren.</p>
            <button className="w-full py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors text-center text-gray-700 dark:text-gray-300">
              Openen
            </button>
          </div>

          {/* Team Drank - Expanded Grid */}
          <div className="col-span-2 bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                  <span className="material-icons-round">local_drink</span>
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Team Drank</h3>
              </div>
              <span className="text-xs font-bold bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 px-2 py-1 rounded-md border border-green-100 dark:border-green-900/50">
                TEST MODE
              </span>
            </div>
            
            {/* Feature Grid */}
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
        </div>

        {/* Agenda Section */}
        <section className="bg-[#1e40af] rounded-2xl p-5 shadow-lg shadow-blue-900/20 text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
               <span className="material-icons-round">event_note</span>
               <h2 className="text-lg font-bold">Agenda</h2>
               <span className="px-2 py-0.5 bg-blue-500/30 rounded text-[10px] font-medium border border-blue-400/30">
                 Sfeerbeheer Admin
               </span>
            </div>
            <button 
              onClick={() => onNavigate('agenda-manage')}
              className="px-3 py-1.5 bg-white text-primary text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-blue-50 transition-colors shadow-sm"
            >
              <span className="material-icons-round text-sm">edit</span>
              Bewerken
            </button>
          </div>

          <div className="space-y-3">
            {/* Event 1 */}
            <div className="flex items-center gap-4 bg-white/10 p-3 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors cursor-pointer" onClick={() => onNavigate('agenda')}>
              <div className="bg-white text-primary rounded-lg h-12 w-12 flex flex-col items-center justify-center shrink-0">
                <span className="text-lg font-bold leading-none">12</span>
                <span className="text-[10px] font-bold uppercase leading-none">Okt</span>
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Leidingskring</h3>
                <div className="flex items-center gap-3 text-blue-100 text-xs mt-0.5">
                  <span className="flex items-center gap-1">
                    <span className="material-icons-round text-[10px]">schedule</span> 20:00
                  </span>
                  <span className="flex items-center gap-1">
                     <span className="material-icons-round text-[10px]">place</span> Lokaal
                  </span>
                </div>
              </div>
            </div>

            {/* Event 2 */}
            <div className="flex items-center gap-4 bg-white/10 p-3 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors cursor-pointer" onClick={() => onNavigate('agenda')}>
              <div className="bg-white text-primary rounded-lg h-12 w-12 flex flex-col items-center justify-center shrink-0">
                <span className="text-lg font-bold leading-none">15</span>
                <span className="text-[10px] font-bold uppercase leading-none">Okt</span>
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Startdag Voorbereiding</h3>
                <div className="flex items-center gap-3 text-blue-100 text-xs mt-0.5">
                  <span className="flex items-center gap-1">
                    <span className="material-icons-round text-[10px]">schedule</span> 14:00
                  </span>
                   <span className="flex items-center gap-1">
                     <span className="material-icons-round text-[10px]">place</span> Terrein
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};