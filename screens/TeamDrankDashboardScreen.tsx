import React from 'react';

interface TeamDrankDashboardScreenProps {
  onBack: () => void;
}

export const TeamDrankDashboardScreen: React.FC<TeamDrankDashboardScreenProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a] text-white font-sans">
      {/* Header */}
      <header className="px-4 py-6 flex items-center gap-4 sticky top-0 bg-[#0f172a] z-10">
        <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
          <span className="material-icons-round text-2xl">arrow_back_ios_new</span>
        </button>
        <div>
           <h1 className="text-2xl font-bold leading-tight">Totaaloverzicht</h1>
           <p className="text-sm text-gray-400">Team Drank Dashboard</p>
        </div>
      </header>

      <main className="flex-1 px-4 pb-24 overflow-y-auto space-y-4">
        {/* Hero Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 shadow-lg shadow-blue-900/20 relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Live</div>
          <p className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">Totaal gezette strepen</p>
          <div className="flex items-baseline gap-2">
             <span className="text-6xl font-bold text-white">800</span>
             <span className="text-lg text-blue-200">consumpties</span>
          </div>
          <div className="flex items-center gap-1mt-2 text-blue-100 text-sm mt-2">
            <span className="material-icons-round text-base">trending_up</span>
            <span>+124 sinds gisteren</span>
          </div>
        </div>

        {/* Warning Card */}
        <div className="bg-[#2a1c15] border border-orange-900/50 rounded-2xl p-4 flex gap-4 items-start">
           <span className="material-icons-round text-orange-500 mt-0.5">warning</span>
           <div>
             <h3 className="text-orange-500 font-bold text-sm mb-1">Voorraad Waarschuwing</h3>
             <p className="text-orange-100/70 text-xs leading-relaxed">
               De voorraad <span className="text-white font-medium">Speciale Bieren</span> is bijna op. 
               Overweeg bij te bestellen voor de avondactiviteit.
             </p>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Chart Card */}
          <div className="bg-[#1e293b] p-4 rounded-2xl border border-gray-800">
             <h3 className="text-gray-400 text-xs font-bold uppercase mb-4">Verdeling</h3>
             <div className="flex items-center justify-center relative h-32">
                {/* CSS Conic Gradient for Donut Chart */}
                <div className="w-28 h-28 rounded-full" style={{ background: 'conic-gradient(#3b82f6 0% 65%, #1e40af 65% 100%)' }}></div>
                <div className="absolute inset-0 m-auto w-24 h-24 bg-[#1e293b] rounded-full flex flex-col items-center justify-center">
                   <span className="text-xs text-gray-400">Top</span>
                   <span className="text-lg font-bold text-blue-400">Bier</span>
                </div>
             </div>
             <div className="flex justify-center gap-3 mt-4 text-[10px] text-gray-400">
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Alc.</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-800"></span> Non-Alc.</div>
             </div>
          </div>

          <div className="space-y-4">
            {/* Peak Time */}
            <div className="bg-[#1e293b] p-4 rounded-2xl border border-gray-800 h-[calc(50%-0.5rem)] flex flex-col justify-center">
              <h3 className="text-gray-400 text-xs font-bold uppercase mb-1">Hoogste Piek</h3>
              <div className="text-2xl font-bold text-white">22:00u</div>
              <div className="text-xs text-green-400 flex items-center gap-1">
                 <span className="material-icons-round text-[10px]">arrow_upward</span> 145/uur
              </div>
            </div>

            {/* Grootverbruiker */}
             <div className="bg-[#1e293b] p-4 rounded-2xl border border-gray-800 h-[calc(50%-0.5rem)] flex flex-col justify-center">
              <h3 className="text-gray-400 text-xs font-bold uppercase mb-1">Grootverbruiker</h3>
              <div className="text-xl font-bold text-white">Leiding</div>
              <div className="text-xs text-gray-500">45% van totaal</div>
            </div>
          </div>
        </div>

        {/* Categories List */}
        <div className="pt-2">
          <div className="flex justify-between items-center mb-3">
             <h3 className="text-lg font-bold text-white">Per Categorie</h3>
             <button className="text-blue-400 text-xs font-bold">Details bekijken</button>
          </div>
          
          <div className="bg-[#1e293b] rounded-2xl border border-gray-800 divide-y divide-gray-800">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                  <span className="material-icons-round">sports_bar</span>
                </div>
                <div>
                   <h4 className="font-bold text-sm text-white">Bier & Pils</h4>
                   <p className="text-xs text-gray-500">Jupiler, Stella</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white">450</div>
                <div className="text-xs text-gray-500">56%</div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                  <span className="material-icons-round">local_drink</span>
                </div>
                <div>
                   <h4 className="font-bold text-sm text-white">Frisdrank</h4>
                   <p className="text-xs text-gray-500">Cola, Fanta, Ice-Tea</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white">230</div>
                <div className="text-xs text-gray-500">28%</div>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* FAB */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center z-20 pointer-events-none">
        <button className="pointer-events-auto h-14 w-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/40 text-white hover:scale-105 active:scale-95 transition-all">
          <span className="material-icons-round text-3xl">add</span>
        </button>
      </div>
    </div>
  );
};