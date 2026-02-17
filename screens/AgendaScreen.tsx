import React from 'react';
import { ChevronBack } from '../components/ChevronBack';

interface AgendaScreenProps {
  onBack: () => void;
}

export const AgendaScreen: React.FC<AgendaScreenProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-[#0f172a] overflow-hidden transition-colors duration-200">
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between shrink-0 bg-gray-50 dark:bg-[#0f172a] z-10 transition-colors">
        <div className="flex items-center gap-2">
          <ChevronBack onClick={onBack} />
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Agenda</h1>
        </div>
        <button className="p-2 rounded-full bg-white dark:bg-[#1e2330] border border-gray-200 dark:border-gray-700 shadow-sm relative transition-colors">
          <span className="material-icons text-gray-400 dark:text-gray-300">notifications</span>
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
        </button>
      </header>

      {/* Calendar Strip */}
      <div className="px-4 pb-4 shrink-0">
        <div className="bg-white dark:bg-[#1e2330] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
              <span className="material-icons-round text-xl">chevron_left</span>
            </button>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Oktober 2023</span>
            <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
              <span className="material-icons-round text-xl">chevron_right</span>
            </button>
          </div>
          
          <div className="grid grid-cols-7 text-center mb-2">
            {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map(d => (
              <div key={d} className="text-xs font-medium text-gray-400 uppercase">{d}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 text-center gap-y-2">
            {[25, 26, 27, 28, 29, 30].map(d => (
              <div key={d} className="h-9 w-9 mx-auto flex items-center justify-center rounded-lg text-gray-300 dark:text-gray-600 text-sm">{d}</div>
            ))}
            {[1, 2, 3, 4, 5].map(d => (
              <button key={d} className="h-9 w-9 mx-auto flex flex-col items-center justify-center rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors relative text-gray-700 dark:text-gray-300 text-sm">
                {d}
                {d === 3 && <span className="w-1 h-1 bg-blue-600 rounded-full absolute bottom-1"></span>}
              </button>
            ))}
            <button className="h-9 w-9 mx-auto flex flex-col items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-500/30 relative text-sm font-bold">
              6
              <span className="w-1 h-1 bg-white rounded-full absolute bottom-1"></span>
            </button>
             {[7, 8, 9, 10, 11].map(d => (
              <button key={d} className="h-9 w-9 mx-auto flex flex-col items-center justify-center rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors relative text-gray-700 dark:text-gray-300 text-sm">
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 pb-2 shrink-0 overflow-x-auto no-scrollbar">
        <div className="flex gap-3">
          <button className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-medium shadow-sm whitespace-nowrap">Alle events</button>
          <button className="px-4 py-1.5 rounded-full bg-white dark:bg-[#1e2330] border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 text-sm font-medium whitespace-nowrap">Mijn taken</button>
        </div>
      </div>

      {/* Event List */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 pt-2 space-y-4 no-scrollbar">
        <h3 className="px-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vandaag, 6 Okt</h3>
        
        {/* Card 1 */}
        <div className="bg-white dark:bg-[#1e2330] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-3 relative overflow-hidden group transition-colors">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wide">KSA Nationaal</span>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">Leidingsweekend</h4>
            </div>
            <div className="text-right">
              <span className="block text-xl font-semibold text-blue-600 dark:text-blue-400">20:00</span>
              <span className="text-xs text-gray-400">tot Zo 14:00</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
            <span className="material-icons-round text-gray-400 text-base">location_on</span>
            <span>Ardennen, Durbuy</span>
          </div>
        </div>

        <h3 className="px-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider pt-2">Woensdag, 11 Okt</h3>
        
        {/* Card 2 */}
        <div className="bg-white dark:bg-[#1e2330] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-3 relative overflow-hidden transition-colors">
          <div className="absolute top-0 left-0 w-1 h-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="flex justify-between items-start">
             <div>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 mb-1 uppercase tracking-wide">Administratie</span>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">Kernvergadering</h4>
            </div>
            <div className="text-right">
              <span className="block text-xl font-semibold text-gray-900 dark:text-white">20:00</span>
              <span className="text-xs text-gray-400">1u 30min</span>
            </div>
          </div>
           <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
            <span className="material-icons-round text-gray-400 text-base">location_on</span>
            <span>'t Lokaal, Vergaderzaal 1</span>
          </div>
        </div>
      </div>

       {/* FAB */}
      <div className="absolute bottom-24 right-6 z-20">
        <button className="group w-14 h-14 bg-blue-600 rounded-full shadow-lg shadow-blue-500/40 flex items-center justify-center transition-all hover:scale-105 active:scale-95">
          <span className="material-icons-round text-white text-3xl transition-transform group-hover:rotate-90">add</span>
        </button>
      </div>
    </div>
  );
};