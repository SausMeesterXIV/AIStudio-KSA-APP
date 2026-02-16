import React, { useState } from 'react';
import { FryItem, CartItem } from '../types';

interface FriesScreenProps {
  onNavigateOverview: () => void;
}

export const FriesScreen: React.FC<FriesScreenProps> = ({ onNavigateOverview }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<'frieten' | 'snacks' | 'sauzen'>('frieten');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const items: FryItem[] = [
    { id: '1', name: 'Klein', price: 2.50, category: 'frieten' },
    { id: '2', name: 'Middel', price: 3.00, category: 'frieten' },
    { id: '3', name: 'Groot', price: 3.50, category: 'frieten' },
    { id: '4', name: 'Frikandel', price: 1.80, category: 'snacks' },
    { id: '5', name: 'Viandel', price: 2.00, category: 'snacks' },
    { id: '6', name: 'Kaaskroket', price: 2.20, category: 'snacks' },
    { id: '7', name: 'Mayonaise', price: 0.50, category: 'sauzen' },
    { id: '8', name: 'Ketchup', price: 0.50, category: 'sauzen' },
    { id: '9', name: 'Stoofvleessaus', price: 1.50, category: 'sauzen' },
  ];

  const updateQuantity = (item: FryItem, delta: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) return prev.filter(i => i.id !== item.id);
        return prev.map(i => i.id === item.id ? { ...i, quantity: newQty } : i);
      } else if (delta > 0) {
        return [...prev, { ...item, quantity: 1 }];
      }
      return prev;
    });
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    // Simulate API call
    setTimeout(() => {
        setCart([]); // Clear local cart
        setOrderPlaced(false);
        alert("Bestelling geplaatst! Je kan het totaal zien in het overzicht.");
    }, 500);
  };

  const getItemQty = (id: string) => cart.find(i => i.id === id)?.quantity || 0;
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 pt-4 pb-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-primary active:opacity-70">
            <h1 className="text-xl font-bold leading-tight">Frituur Selectie</h1>
          </div>
          
          <button 
            onClick={onNavigateOverview}
            className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
          >
            <span className="material-icons-round text-sm">list_alt</span>
            <span className="text-xs font-bold">Overzicht</span>
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
           Bestelling voor <span className="font-bold text-gray-900 dark:text-white">Jan Janssens</span>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-4 py-3 bg-background-light dark:bg-background-dark sticky top-[85px] z-40 overflow-x-auto no-scrollbar">
        <div className="flex gap-2">
          {['frieten', 'snacks', 'sauzen'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap border capitalize transition-all ${
                activeCategory === cat 
                  ? 'bg-primary/10 text-primary border-primary/20 dark:text-blue-400' 
                  : 'bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-4 pb-36 space-y-4 pt-2">
        {items.filter(i => i.category === activeCategory).map((item) => {
          const qty = getItemQty(item.id);
          return (
            <div key={item.id} className={`bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm border transition-all ${qty > 0 ? 'border-primary ring-1 ring-primary' : 'border-gray-100 dark:border-gray-800'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-semibold text-lg ${qty > 0 ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>{item.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">€ {item.price.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-3">
                  <button 
                    onClick={() => updateQuantity(item, -1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md shadow-sm active:scale-95 transition-all ${qty > 0 ? 'bg-white dark:bg-gray-700 text-primary' : 'bg-white dark:bg-gray-700 text-gray-400'}`}
                  >
                    <span className="material-icons-round text-sm">remove</span>
                  </button>
                  <span className={`font-bold w-4 text-center ${qty > 0 ? 'text-primary' : 'text-gray-400'}`}>{qty}</span>
                  <button 
                    onClick={() => updateQuantity(item, 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white shadow-md active:scale-95 transition-all"
                  >
                    <span className="material-icons-round text-sm">add</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Helper text */}
        <p className="text-center text-xs text-gray-400 mt-6 pb-4">
          Alle bestellingen worden automatisch samengevoegd in het overzicht.
        </p>
      </main>

      {/* Floating Bottom Bar - Only visible if items in cart */}
      {cart.length > 0 && (
        <footer className="fixed bottom-20 left-4 right-4 z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-2xl">
            <div className="flex justify-between items-end mb-3">
               <div>
                 <span className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase">Totaal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                 <div className="text-2xl font-bold text-primary dark:text-blue-400">€ {total.toFixed(2)}</div>
               </div>
            </div>
            <button 
                onClick={handlePlaceOrder}
                disabled={orderPlaced}
                className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
            >
              {orderPlaced ? (
                  <span className="material-icons-round animate-spin">refresh</span>
              ) : (
                  <>
                    <span className="material-icons-round">check_circle</span>
                    <span>Bestelling Bevestigen</span>
                  </>
              )}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};