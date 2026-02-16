import React, { useState } from 'react';

interface FriesOverviewScreenProps {
  onBack: () => void;
}

export const FriesOverviewScreen: React.FC<FriesOverviewScreenProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'Alles' | 'Frieten' | 'Snacks' | 'Sauzen'>('Alles');
  
  // Mock data based on the screenshot
  const aggregatedItems = [
    { id: 1, count: 12, name: 'Groot Pak', detail: 'Met zout', price: 42.00, category: 'Frieten', checked: false },
    { id: 2, count: 8, name: 'Klein Pak', detail: 'Met zout', price: 24.00, category: 'Frieten', checked: false },
    { id: 3, count: 4, name: 'Middel Pak', detail: 'Zonder zout', price: 14.00, category: 'Frieten', checked: false },
    { id: 4, count: 15, name: 'Frikandel', detail: '', price: 30.00, category: 'Snacks', checked: false },
    { id: 5, count: 10, name: 'Viandel', detail: '', price: 22.00, category: 'Snacks', checked: false },
    { id: 6, count: 6, name: 'Bicky Burger', detail: '', price: 24.00, category: 'Snacks', checked: false },
    { id: 7, count: 20, name: 'Mayonaise', detail: '', price: 10.00, category: 'Sauzen', checked: false },
  ];

  const filteredItems = activeTab === 'Alles' 
    ? aggregatedItems 
    : aggregatedItems.filter(i => i.category === activeTab);

  const [items, setItems] = useState(filteredItems);

  // Sync filtered items when tab changes (in a real app this would be more robust)
  React.useEffect(() => {
    setItems(aggregatedItems.filter(i => activeTab === 'Alles' || i.category === activeTab));
  }, [activeTab]);

  const toggleCheck = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a] text-white font-sans">
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between sticky top-0 bg-[#0f172a] z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <span className="material-icons-round text-white text-2xl">arrow_back_ios_new</span>
          </button>
          <div>
            <h1 className="text-lg font-bold leading-tight">Bestelling Overzicht</h1>
            <p className="text-xs text-gray-400">KSA Kamp 2023 • 24 Personen</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <span className="material-icons-round text-white text-xl">share</span>
        </button>
      </header>

      <main className="flex-1 px-4 pb-24 overflow-y-auto space-y-6">
        {/* Hero Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-5 shadow-lg shadow-blue-500/20 mt-2">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Totaal te betalen</p>
              <h2 className="text-4xl font-bold text-white">€ 215,40</h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-100 mb-1">Status: <span className="font-bold text-white">Verzamelen</span></p>
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
                  ? 'bg-[#1e293b] border-blue-500 text-blue-400 shadow-sm'
                  : 'bg-[#1e293b]/50 border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-4">
          <div className="flex justify-between items-end px-1">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{activeTab === 'Alles' ? 'ITEMS' : activeTab.toUpperCase()}</h3>
            <span className="text-xs bg-[#1e293b] text-gray-400 px-2 py-0.5 rounded-md">{items.reduce((acc, i) => acc + i.count, 0)} items</span>
          </div>

          <div className="space-y-1">
            {items.map((item) => (
              <div key={item.id} className="bg-[#1e293b] p-4 rounded-xl border border-gray-800 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  {/* Quantity Badge */}
                  <div className="h-10 w-10 rounded-lg bg-[#0f172a] border border-blue-500/30 flex items-center justify-center shrink-0">
                    <span className="text-blue-400 font-bold">{item.count}</span>
                  </div>
                  
                  {/* Info */}
                  <div>
                    <h4 className="font-bold text-white text-base">{item.name}</h4>
                    {item.detail && <p className="text-gray-500 text-xs mt-0.5">{item.detail}</p>}
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 font-medium text-sm">€ {item.price.toFixed(2).replace('.', ',')}</span>
                  
                  {/* Custom Checkbox */}
                  <button 
                    onClick={() => toggleCheck(item.id)}
                    className={`h-6 w-6 rounded-md border-2 flex items-center justify-center transition-all ${
                      item.checked 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    {item.checked && <span className="material-icons-round text-white text-sm">check</span>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-[#0f172a] border-t border-gray-800 z-20">
        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-between group active:scale-[0.99] transition-all">
          <div className="flex items-center gap-3">
             <div className="bg-white/20 p-1 rounded-md">
               <span className="material-icons-round text-lg">check_circle</span>
             </div>
             <span>Bestelling Afronden</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">€ 215,40</span>
            <span className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </button>
      </footer>
    </div>
  );
};