import React from 'react';

interface TeamDrankStockScreenProps {
  onBack: () => void;
}

export const TeamDrankStockScreen: React.FC<TeamDrankStockScreenProps> = ({ onBack }) => {
  const stockItems = [
    { id: 1, name: 'Stella Vaten (50L)', label: 'Kampvuuravond', location: 'Kelder', count: 3, unit: 'stuks', exp: '12/10/24', urgent: true, icon: 'sports_bar', color: 'bg-yellow-500' },
    { id: 2, name: 'Cola Kratten (24x25cl)', label: 'Startdag', location: '', count: 8, unit: 'kratt.', exp: '01/05/25', urgent: false, icon: 'local_drink', color: 'bg-red-900' },
    { id: 3, name: 'Lays Chips Paprika', label: 'Fuif', location: '', count: 12, unit: 'dozen', exp: '15/11/24', urgent: false, icon: 'tapas', color: 'bg-yellow-200 text-yellow-800' },
    { id: 4, name: "Diepvries Pizza's", label: 'Leidersweekend', location: '', count: 5, unit: 'stuks', exp: '20/06/25', urgent: false, icon: 'local_pizza', color: 'bg-orange-500' },
    { id: 5, name: 'Water Plat (1.5L)', label: 'Sportdag', location: '', count: 24, unit: 'flessen', exp: '01/01/26', urgent: false, icon: 'water_drop', color: 'bg-blue-400' },
    { id: 6, name: 'Jenever Bessen', label: 'Kerstmarkt', location: '', count: 2, unit: 'flessen', exp: 'Morgen', urgent: true, icon: 'liquor', color: 'bg-green-500' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-white font-sans transition-colors duration-200">
      {/* Header */}
      <header className="px-4 py-4 sticky top-0 bg-gray-50 dark:bg-[#0f172a] z-10 transition-colors">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
             <span className="material-icons-round text-2xl">arrow_back_ios_new</span>
          </button>
          <h1 className="text-2xl font-bold flex-1">Voorraad Overzicht</h1>
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg">
             <span className="material-icons-round text-gray-400">tune</span>
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <span className="material-icons-round absolute left-3 top-3.5 text-gray-400">search</span>
          <input 
            type="text" 
            placeholder="Zoek vaten, kratten, snacks..." 
            className="w-full bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>
      </header>

      <main className="flex-1 px-4 pb-24 overflow-y-auto">
        
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 dark:bg-[#1e3a8a]/40 border border-blue-100 dark:border-blue-900 rounded-xl p-3 flex flex-col justify-between h-24">
             <span className="text-[10px] text-blue-600 dark:text-blue-200 font-bold uppercase tracking-wider">Totaal Vaten</span>
             <div className="flex justify-between items-end">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">12</span>
                <span className="material-icons-round text-blue-500 text-lg opacity-50">propane_tank</span>
             </div>
          </div>
          <div className="bg-orange-50 dark:bg-[#2a1c15] border border-orange-100 dark:border-orange-900/50 rounded-xl p-3 flex flex-col justify-between h-24">
             <span className="text-[10px] text-orange-600 dark:text-orange-200 font-bold uppercase tracking-wider">Vervalt Snel</span>
             <div className="flex justify-between items-end">
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-500">3</span>
                <span className="material-icons-round text-orange-500 text-lg opacity-50">warning</span>
             </div>
          </div>
          <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex flex-col justify-between h-24 shadow-sm">
             <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Snacks</span>
             <div className="flex justify-between items-end">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">45</span>
             </div>
          </div>
        </div>

        {/* List Header */}
        <div className="flex justify-between items-end mb-3">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Recente Restanten</h2>
          <button className="text-blue-600 dark:text-blue-400 text-xs font-bold hover:underline">Alles tonen</button>
        </div>

        {/* List Items */}
        <div className="space-y-3">
          {stockItems.map(item => (
            <div key={item.id} className="bg-white dark:bg-[#1e293b] p-3 rounded-xl border border-gray-200 dark:border-gray-800 flex gap-3 group shadow-sm transition-colors">
              {/* Icon Box */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${item.id === 3 ? 'bg-yellow-100' : 'bg-gray-100 dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-800'} overflow-hidden relative shadow-inner`}>
                <span className={`material-icons-round text-2xl ${item.id === 3 ? 'text-yellow-600' : 'text-gray-500 dark:text-white/80'}`}>{item.icon}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate pr-2">{item.name}</h3>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${item.urgent ? 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-500' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                    Exp: {item.exp}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mt-1 mb-1">
                   <span className="text-[10px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-900/50">{item.label}</span>
                   {item.location && <span className="text-[10px] text-gray-500 dark:text-gray-400">Locatie: {item.location}</span>}
                </div>
              </div>

              <div className="text-right flex flex-col justify-center min-w-[3rem]">
                 <span className="text-lg font-bold text-gray-900 dark:text-white leading-none">{item.count}</span>
                 <span className="text-[10px] text-gray-500">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Footer Button */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gray-50 dark:bg-[#0f172a] border-t border-gray-200 dark:border-gray-800 z-20 flex gap-3 transition-colors">
         <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
            <span className="material-icons-round">add_circle_outline</span>
            Nieuwe Restant
         </button>
         <button className="w-14 bg-white dark:bg-[#1e293b] rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300 shadow-sm">
            <span className="material-icons-round">qr_code_scanner</span>
         </button>
      </footer>
    </div>
  );
};