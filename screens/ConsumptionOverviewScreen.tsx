import React from 'react';

interface ConsumptionOverviewScreenProps {
  onBack: () => void;
}

export const ConsumptionOverviewScreen: React.FC<ConsumptionOverviewScreenProps> = ({ onBack }) => {
  // Mock data matching the screenshot
  const columns = ['NAAM', 'BIER', 'COLA', 'WATER', 'CHIPS'];
  const data = [
    { name: 'Thomas P.', values: [12, 4, 0, 2] },
    { name: 'Sarah D.W.', values: [2, 8, 3, 1] },
    { name: 'Lucas V.', values: [15, 0, 0, 3] },
    { name: 'Emma T.', values: [0, 5, 2, 1] },
    { name: 'Jonas K.', values: [8, 2, 0, 0] },
    { name: 'Lise B.', values: [0, 3, 8, 0] },
    { name: 'Michiel R.', values: [6, 2, 1, 4] },
    { name: 'Ruben D.', values: [10, 1, 0, 1] },
    { name: 'Kobe V.H.', values: [5, 5, 0, 2] },
    { name: 'Floor M.', values: [2, 2, 4, 1] },
  ];

  const totals = [60, 32, 18, 15];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="bg-primary text-white pt-8 pb-10 px-6 rounded-b-[2.5rem] shadow-lg relative z-10">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={onBack}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <span className="material-icons-round text-2xl">arrow_back_ios_new</span>
          </button>
          <button className="p-1 rounded-full hover:bg-white/20 transition-colors">
            <span className="material-icons-round text-2xl">filter_list</span>
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

        {/* Table Container */}
        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex-1 overflow-hidden flex flex-col mx-2">
          <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
                <tr>
                  {columns.map((col, idx) => (
                    <th 
                      key={col} 
                      className={`py-4 px-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ${idx === 0 ? 'sticky left-0 bg-gray-50 dark:bg-gray-800 border-r dark:border-gray-700' : 'text-center'}`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {data.map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white text-sm sticky left-0 bg-white dark:bg-surface-dark border-r border-gray-100 dark:border-gray-800 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.05)]">
                      {row.name}
                    </td>
                    {row.values.map((val, vIdx) => (
                      <td key={vIdx} className="py-4 px-4 text-center text-gray-600 dark:text-gray-300 text-sm">
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
    </div>
  );
};