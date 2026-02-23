import React, { useState } from 'react';

interface TeamDrankStockScreenProps {
  onBack: () => void;
}

export const TeamDrankStockScreen: React.FC<TeamDrankStockScreenProps> = ({ onBack }) => {
  const [activeFilter, setActiveFilter] = useState('Standaard');

  const stockItems = [
    { id: 1, name: 'Stella Vaten (50L)', label: 'Kampvuuravond', category: 'Standaard', count: 3, unit: 'stuks', exp: '12/10/24', urgent: true, icon: 'sports_bar', color: 'bg-yellow-500' },
    { id: 2, name: 'Cola Kratten (24x25cl)', label: 'Startdag', category: 'Standaard', count: 8, unit: 'kratt.', exp: '01/05/25', urgent: false, icon: 'local_drink', color: 'bg-red-900' },
    { id: 3, name: 'Lays Chips Paprika', label: 'Fuif', category: 'Evenementen', count: 12, unit: 'dozen', exp: '15/11/24', urgent: false, icon: 'tapas', color: 'bg-yellow-200 text-yellow-800' },
    { id: 4, name: "Diepvries Pizza's", label: 'Leidersweekend', category: "Extra's", count: 5, unit: 'stuks', exp: '20/06/25', urgent: false, icon: 'local_pizza', color: 'bg-orange-500' },
    { id: 5, name: 'Water Plat (1.5L)', label: 'Sportdag', category: 'Standaard', count: 24, unit: 'flessen', exp: '01/01/26', urgent: false, icon: 'water_drop', color: 'bg-blue-400' },
    { id: 6, name: 'Jenever Bessen', label: 'Kerstmarkt', category: 'Evenementen', count: 2, unit: 'flessen', exp: 'Morgen', urgent: true, icon: 'liquor', color: 'bg-green-500' },
    { id: 7, name: 'Cara Pils (33cl)', label: 'Leiding', category: "Extra's", count: 48, unit: 'blikken', exp: '01/01/26', urgent: false, icon: 'sports_bar', color: 'bg-red-500' },
    { id: 8, name: 'Gin (Bombay)', label: 'Fuif', category: 'Evenementen', count: 3, unit: 'flessen', exp: 'Onbeperkt', urgent: false, icon: 'local_bar', color: 'bg-blue-600' },
  ];

  const filteredItems = stockItems.filter(item => item.category === activeFilter);

  const filters = ['Standaard', 'Evenementen', "Extra's"];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-white font-sans transition-colors duration-200">
      {/* Header */}
      <header className="px-4 py-4 sticky top-0 bg-gray-50/95 dark:bg-[#0f172a]/95 backdrop-blur-sm z-10 transition-colors border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
             <span className="material-icons-round text-2xl">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold flex-1">Voorraadbeheer</h1>
          <button className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
             <span className="material-icons-round">qr_code_scanner</span>
          </button>
        </div>
        
        {/* Search & Filter */}
        <div className="space-y-3">
          <div className="relative">
            <span className="material-icons-round absolute left-3 top-3.5 text-gray-400">search</span>
            <input 
              type="text" 
              placeholder="Zoeken..." 
              className="w-full bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 pb-24 overflow-y-auto pt-2">
        
        {/* List Header */}
        <div className="flex justify-between items-end mb-3 px-1">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {activeFilter} Voorraad
          </h2>
          <span className="text-xs text-gray-400">{filteredItems.length} resultaten</span>
        </div>

        {/* List Items */}
        <div className="space-y-3">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex gap-4 group shadow-sm hover:shadow-md transition-all">
              {/* Icon Box */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${item.id === 3 ? 'bg-yellow-100' : 'bg-gray-50 dark:bg-gray-800'} relative`}>
                <span className={`material-icons-round text-2xl ${item.id === 3 ? 'text-yellow-600' : 'text-gray-400 dark:text-gray-500'}`}>{item.icon}</span>
                {item.urgent && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-[#1e293b]"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate pr-2">{item.name}</h3>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${item.urgent ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                    {item.count} {item.unit}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                   <span className="flex items-center gap-1">
                     <span className="material-icons-round text-[10px]">category</span> {item.category}
                   </span>
                   <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                   <span>Exp: {item.exp}</span>
                </div>
                
                {/* Progress Bar (Visual Flair) */}
                <div className="mt-2 h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${item.urgent ? 'bg-red-500' : 'bg-blue-500'}`} 
                    style={{ width: item.urgent ? '15%' : '60%' }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Footer Button */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gray-50/90 dark:bg-[#0f172a]/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 z-20 flex gap-3 transition-colors">
         <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
            <span className="material-icons-round">add</span>
            Nieuw Item
         </button>
      </footer>
    </div>
  );
};