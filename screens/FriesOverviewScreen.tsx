import React, { useState, useEffect } from 'react';
import { Order } from '../types';

interface FriesOverviewScreenProps {
  onBack: () => void;
  orders: Order[];
}

export const FriesOverviewScreen: React.FC<FriesOverviewScreenProps> = ({ onBack, orders }) => {
  const [activeTab, setActiveTab] = useState<'Alles' | 'Frieten' | 'Snacks' | 'Sauzen'>('Alles');
  const [aggregatedItems, setAggregatedItems] = useState<any[]>([]);

  // Aggregate items from all orders
  useEffect(() => {
    const itemMap = new Map<string, { id: string, name: string, count: number, price: number, category: string, checked: boolean }>();

    orders.forEach(order => {
      order.items.forEach(item => {
        const key = item.id; // Group by Item ID
        if (itemMap.has(key)) {
          const existing = itemMap.get(key)!;
          existing.count += item.quantity;
          existing.price += (item.price * item.quantity); // Total accumulated price
        } else {
          itemMap.set(key, {
            id: item.id,
            name: item.name,
            count: item.quantity,
            price: item.price * item.quantity,
            category: capitalize(item.category),
            checked: false
          });
        }
      });
    });

    setAggregatedItems(Array.from(itemMap.values()));
  }, [orders]);

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const filteredItems = activeTab === 'Alles' 
    ? aggregatedItems 
    : aggregatedItems.filter(i => i.category === activeTab);

  const totalAmount = aggregatedItems.reduce((acc, item) => acc + item.price, 0);

  const toggleCheck = (id: string) => {
    setAggregatedItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-white font-sans transition-colors duration-200">
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between sticky top-0 bg-gray-50 dark:bg-[#0f172a] z-10 transition-colors">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
            <span className="material-icons-round text-gray-900 dark:text-white text-2xl">arrow_back_ios_new</span>
          </button>
          <div>
            <h1 className="text-lg font-bold leading-tight">Bestelling Overzicht</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Totaal voor {orders.length} bestellingen</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
          <span className="material-icons-round text-gray-900 dark:text-white text-xl">share</span>
        </button>
      </header>

      <main className="flex-1 px-4 pb-24 overflow-y-auto space-y-6">
        {/* Hero Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 rounded-2xl p-5 shadow-lg shadow-blue-500/20 mt-2 text-white">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Totaal te betalen</p>
              <h2 className="text-4xl font-bold text-white">€ {totalAmount.toFixed(2).replace('.', ',')}</h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-100 mb-1">Status: <span className="font-bold text-white">{orders.length > 0 ? 'Verzamelen' : 'Wachten'}</span></p>
              <button className="bg-white text-blue-600 text-xs font-bold py-1.5 px-3 rounded-lg flex items-center gap-1 shadow-sm active:scale-95 transition-transform">
                Afronden <span className="material-icons-round text-sm">check_circle</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {['Alles', 'Frieten', 'Snacks', 'Sauzen'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${
                activeTab === tab
                  ? 'bg-white dark:bg-[#1e293b] border-blue-500 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'bg-gray-100 dark:bg-[#1e293b]/50 border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-4">
          <div className="flex justify-between items-end px-1">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{activeTab === 'Alles' ? 'ITEMS' : activeTab.toUpperCase()}</h3>
            <span className="text-xs bg-gray-200 dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-md">{filteredItems.reduce((acc, i) => acc + i.count, 0)} items</span>
          </div>

          {filteredItems.length === 0 ? (
             <div className="text-center py-10 text-gray-400">
                <p>Nog geen items in deze categorie.</p>
             </div>
          ) : (
            <div className="space-y-1">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white dark:bg-[#1e293b] p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-between group shadow-sm transition-colors">
                  <div className="flex items-center gap-4">
                    {/* Quantity Badge */}
                    <div className="h-10 w-10 rounded-lg bg-gray-50 dark:bg-[#0f172a] border border-blue-100 dark:border-blue-500/30 flex items-center justify-center shrink-0">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{item.count}</span>
                    </div>
                    
                    {/* Info */}
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-base">{item.name}</h4>
                      {/* Optional detail placeholder if we add comments later */}
                      {/* <p className="text-gray-500 text-xs mt-0.5">{item.detail}</p> */}
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 dark:text-gray-400 font-medium text-sm">€ {item.price.toFixed(2).replace('.', ',')}</span>
                    
                    {/* Custom Checkbox */}
                    <button 
                      onClick={() => toggleCheck(item.id)}
                      className={`h-6 w-6 rounded-md border-2 flex items-center justify-center transition-all ${
                        item.checked 
                          ? 'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      {item.checked && <span className="material-icons-round text-white text-sm">check</span>}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gray-50 dark:bg-[#0f172a] border-t border-gray-200 dark:border-gray-800 z-20 transition-colors">
        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-between group active:scale-[0.99] transition-all">
          <div className="flex items-center gap-3">
             <div className="bg-white/20 p-1 rounded-md">
               <span className="material-icons-round text-lg">check_circle</span>
             </div>
             <span>Bestelling Afronden</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">€ {totalAmount.toFixed(2).replace('.', ',')}</span>
            <span className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </button>
      </footer>
    </div>
  );
};