import React, { useState } from 'react';
import { Transaction } from '../types';

interface StrepenScreenProps {
  onNavigateOverview: () => void;
  onNavigateNudge: () => void;
}

export const StrepenScreen: React.FC<StrepenScreenProps> = ({ onNavigateOverview, onNavigateNudge }) => {
  const [count, setCount] = useState(1);
  const [selectedDrink, setSelectedDrink] = useState('Cola');
  const [totalToday, setTotalToday] = useState(4);
  const [totalCost, setTotalCost] = useState(12.50);

  const drinks = ['Cola', 'Bier', 'Water', 'Chips', 'Ice Tea'];
  const drinkPrices: {[key: string]: number} = { 'Cola': 1.0, 'Bier': 1.2, 'Water': 0.8, 'Chips': 1.5, 'Ice Tea': 1.5 };

  // Mock data for feed
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', userId: 'u1', userName: 'Thomas Peeters', userAvatar: 'https://i.pravatar.cc/150?u=thomas', amount: 12, type: 'drink', timestamp: '2u geleden', details: 'Leiding' },
    { id: '2', userId: 'u2', userName: 'Sarah De Wit', userAvatar: 'https://i.pravatar.cc/150?u=sarah', amount: 8, type: 'drink', timestamp: '5u geleden', details: 'Hoofdleiding' },
    { id: '3', userId: 'u3', userName: 'Lucas V.', userAvatar: 'https://i.pravatar.cc/150?u=lucas', amount: 15, type: 'drink', timestamp: 'Gisteren', details: 'Leiding' },
  ]);

  const handleAddStripe = () => {
    // Optimistic update
    setTotalToday(prev => prev + count);
    setTotalCost(prev => prev + (count * (drinkPrices[selectedDrink] || 1)));
    
    // Add to local feed (mock)
    const newTx: Transaction = {
      id: Date.now().toString(),
      userId: 'me',
      userName: 'Jij',
      userAvatar: 'https://i.pravatar.cc/150?u=jan',
      amount: totalToday + count,
      type: 'drink',
      timestamp: 'Zonet',
      details: selectedDrink
    };
    setTransactions([newTx, ...transactions]);
    setCount(1); // Reset
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="bg-primary pt-12 pb-6 px-6 shadow-lg rounded-b-[2rem] relative z-10 text-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Strepen</h1>
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
             <span className="material-icons-round text-white">settings</span>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 mt-2 p-4 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-blue-200 uppercase tracking-wider">Huidig Saldo</p>
            <p className="text-2xl font-bold">€ {totalCost.toFixed(2).replace('.', ',')}</p>
          </div>
          <button className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-blue-50 transition-colors flex items-center gap-1">
             Detail <span className="material-icons-round text-sm">chevron_right</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-6 pb-24">
        {/* Input Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <span className="material-icons-round text-primary">add_circle</span>
              Strepen zetten
            </h2>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary font-bold">J</div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Jouw Totaal</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Vandaag: {totalToday} streepjes</p>
                </div>
              </div>
              <span className="text-3xl font-bold text-primary">{totalToday}</span>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-between gap-4">
              <button 
                onClick={() => setCount(Math.max(1, count - 1))}
                className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-95 transition-all flex items-center justify-center shadow-sm"
              >
                <span className="material-icons-round text-3xl">remove</span>
              </button>
              
              <div className="flex-1 flex flex-col items-center justify-center h-16 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 relative overflow-hidden">
                <span className="text-xs uppercase font-bold text-primary tracking-wide mb-1 opacity-70">Aantal: {count}</span>
                <span className="text-2xl font-black text-primary">{selectedDrink}</span>
              </div>

              <button 
                onClick={handleAddStripe}
                className="w-16 h-16 rounded-2xl bg-primary text-white hover:bg-blue-800 active:scale-95 transition-all flex items-center justify-center shadow-lg shadow-blue-500/30"
              >
                <span className="material-icons-round text-3xl">add</span>
              </button>
            </div>

            {/* Drink Selector */}
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {drinks.map(drink => (
                <button 
                  key={drink}
                  onClick={() => setSelectedDrink(drink)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap shadow-sm transition-colors ${
                    selectedDrink === drink 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {drink}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Nudge Banner */}
        <div 
          onClick={onNavigateNudge}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-4 shadow-lg shadow-blue-500/20 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all"
        >
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                 <span className="material-icons-round text-2xl text-white">back_hand</span>
              </div>
              <div>
                 <h3 className="font-bold text-white text-base">Stuur een Nudge</h3>
                 <p className="text-xs text-blue-100 leading-tight">Stuur een anonieme herinnering<br/>naar een medeleider</p>
              </div>
           </div>
           <span className="material-icons-round text-white/70">chevron_right</span>
        </div>

        {/* Feed Section */}
        <section>
          <div className="flex items-center justify-between mb-3 mt-2">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <span className="material-icons-round text-primary">groups</span>
              Strepen van iedereen
            </h2>
            <button 
              onClick={onNavigateOverview}
              className="text-primary text-sm font-semibold hover:underline"
            >
              Bekijk alles
            </button>
          </div>
          
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-3">
                  <img src={tx.userAvatar} alt={tx.userName} className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow-sm" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{tx.userName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{tx.details} • {tx.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-600">
                  <span className="material-icons-round text-gray-400 text-xs">local_drink</span>
                  <span className="font-bold text-gray-700 dark:text-gray-200">{tx.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};