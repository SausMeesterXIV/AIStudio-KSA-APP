import React, { useState } from 'react';
import { MOCK_USERS } from '../lib/data';

interface ConsumptionOverviewScreenProps {
  onBack: () => void;
}

export const ConsumptionOverviewScreen: React.FC<ConsumptionOverviewScreenProps> = ({ onBack }) => {
  // Sort state
  const [sortOption, setSortOption] = useState<'alphabetical' | 'BIER' | 'COLA' | 'WATER' | 'CHIPS'>('alphabetical');
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Use MOCK_USERS to generate table data
  const columns = ['NAAM', 'BIER', 'COLA', 'WATER', 'CHIPS'];
  
  // Transform MOCK_USERS into table data
  const initialData = MOCK_USERS.map(user => ({
    name: user.nickname || user.name, // Use nickname if available
    values: [
      Math.floor(Math.random() * 15), // Bier
      Math.floor(Math.random() * 8),  // Cola
      Math.floor(Math.random() * 5),  // Water
      Math.floor(Math.random() * 4)   // Chips
    ]
  }));

  // Calculate totals from the generated data
  const totals = initialData.reduce((acc, row) => {
    return acc.map((total, idx) => total + row.values[idx]);
  }, [0, 0, 0, 0]);

  // Logic to sort data
  const getSortedData = () => {
    const data = [...initialData];
    if (sortOption === 'alphabetical') {
      return data.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Find index of column in columns array (index 0 is NAAM, so -1 to match values array)
      const colIndex = columns.indexOf(sortOption) - 1;
      if (colIndex >= 0) {
        return data.sort((a, b) => b.values[colIndex] - a.values[colIndex]);
      }
      return data;
    }
  };

  const sortedData = getSortedData();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark relative">
      {/* Header */}
      <header className="bg-primary text-white pt-8 pb-10 px-6 rounded-b-[2.5rem] shadow-lg relative z-10">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={onBack}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <span className="material-icons-round text-2xl">arrow_back_ios_new</span>
          </button>
          <button 
            onClick={() => setShowSortMenu(true)}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <span className="material-icons-round text-2xl">sort</span>
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-1">Consumptieoverzicht</h1>
          <p className="text-blue-100 text-sm font-medium">Leidingsgroep Totaal</p>
        </div>
      </header>

      <main className="flex-1 px-4 -mt-6 pb-6 overflow-hidden flex flex-col">
        {/* Date Selector Card */}
        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-md p-4 flex items-center justify-between mb-4 mx-2">
          <button className="p-2 text-primary dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <span className="material-icons-round">chevron_left</span>
          </button>
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-0.5">Week 42</p>
            <p className="text-gray-900 dark:text-white font-bold">16 okt - 22 okt</p>
          </div>
          <button className="p-2 text-primary dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <span className="material-icons-round">chevron_right</span>
          </button>
        </div>

        {/* Active Sort Indicator */}
        <div className="mx-2 mb-2 px-2 flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Gesorteerd op:</span>
          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md font-semibold">
            {sortOption === 'alphabetical' ? 'Naam (A-Z)' : sortOption}
          </span>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex-1 overflow-hidden flex flex-col mx-2">
          <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
                <tr>
                  {columns.map((col, idx) => (
                    <th 
                      key={col} 
                      onClick={() => {
                         if(idx === 0) setSortOption('alphabetical');
                         else setSortOption(col as any);
                      }}
                      className={`py-4 px-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${idx === 0 ? 'sticky left-0 bg-gray-50 dark:bg-gray-800 border-r dark:border-gray-700' : 'text-center'}`}
                    >
                      <div className={`flex items-center gap-1 ${idx !== 0 ? 'justify-center' : ''}`}>
                         {col}
                         {sortOption === (idx === 0 ? 'alphabetical' : col) && (
                           <span className="material-icons-round text-[14px]">{idx === 0 ? 'arrow_downward' : 'arrow_downward'}</span>
                         )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {sortedData.map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white text-sm sticky left-0 bg-white dark:bg-surface-dark border-r border-gray-100 dark:border-gray-800 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.05)]">
                      {row.name}
                    </td>
                    {row.values.map((val, vIdx) => (
                      <td key={vIdx} className={`py-4 px-4 text-center text-sm ${sortOption === columns[vIdx+1] ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-900/10' : 'text-gray-600 dark:text-gray-300'}`}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 dark:bg-gray-800 font-bold sticky bottom-0 z-10 border-t-2 border-gray-100 dark:border-gray-700">
                <tr>
                   <td className="py-4 px-4 text-gray-900 dark:text-white text-sm sticky left-0 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 uppercase">
                      Totaal
                    </td>
                    {totals.map((total, tIdx) => (
                      <td key={tIdx} className="py-4 px-4 text-center text-gray-900 dark:text-white text-sm">
                        {total}
                      </td>
                    ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </main>

      {/* Sort Menu Modal */}
      {showSortMenu && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={() => setShowSortMenu(false)}></div>
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1e2330] rounded-t-[2rem] p-6 z-50 animate-in slide-in-from-bottom-full duration-300 border-t border-gray-200 dark:border-gray-700 shadow-2xl">
             <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-6"></div>
             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Sorteer lijst op</h3>
             <div className="space-y-2">
                <button 
                  onClick={() => { setSortOption('alphabetical'); setShowSortMenu(false); }}
                  className={`w-full p-4 rounded-xl flex items-center justify-between ${sortOption === 'alphabetical' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                >
                  <span className="font-bold">Alfabetisch (A-Z)</span>
                  {sortOption === 'alphabetical' && <span className="material-icons-round">check</span>}
                </button>
                
                <p className="text-xs text-gray-400 uppercase font-bold mt-4 mb-2 pl-1">Meeste strepen per soort</p>
                
                {columns.slice(1).map(col => (
                   <button 
                    key={col}
                    onClick={() => { setSortOption(col as any); setShowSortMenu(false); }}
                    className={`w-full p-4 rounded-xl flex items-center justify-between ${sortOption === col ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                  >
                    <span className="font-bold">{col}</span>
                    {sortOption === col && <span className="material-icons-round">check</span>}
                  </button>
                ))}
             </div>
             <button onClick={() => setShowSortMenu(false)} className="w-full mt-6 py-4 font-bold text-gray-500">Annuleren</button>
          </div>
        </>
      )}
    </div>
  );
};