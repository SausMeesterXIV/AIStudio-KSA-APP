import React, { useState } from 'react';
import { FryItem, CartItem, Order } from '../types';
import { ChevronBack } from '../components/ChevronBack';
import { getCurrentUser } from '../lib/data';

interface FriesScreenProps {
  onNavigateOverview: () => void;
  onBack: () => void;
  onPlaceOrder: (items: CartItem[], total: number) => void;
  myOrders: Order[];
}

export const FriesScreen: React.FC<FriesScreenProps> = ({ 
  onNavigateOverview, 
  onBack, 
  onPlaceOrder,
  myOrders
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<'frieten' | 'snacks' | 'sauzen'>('frieten');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Admin / Price Editing State
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');

  const currentUser = getCurrentUser();

  // Initial Data moved to state so it can be modified
  const [items, setItems] = useState<FryItem[]>([
    { id: '1', name: 'Klein Pak', price: 2.50, category: 'frieten' },
    { id: '2', name: 'Middel Pak', price: 3.00, category: 'frieten' },
    { id: '3', name: 'Groot Pak', price: 3.50, category: 'frieten' },
    { id: '4', name: 'Frikandel', price: 1.80, category: 'snacks' },
    { id: '5', name: 'Viandel', price: 2.00, category: 'snacks' },
    { id: '6', name: 'Kaaskroket', price: 2.20, category: 'snacks' },
    { id: '7', name: 'Mayonaise', price: 0.50, category: 'sauzen' },
    { id: '8', name: 'Ketchup', price: 0.50, category: 'sauzen' },
    { id: '9', name: 'Stoofvleessaus', price: 1.50, category: 'sauzen' },
    { id: '10', name: 'Bicky Burger', price: 4.00, category: 'snacks' },
  ]);

  const updateQuantity = (item: FryItem, delta: number) => {
    if (isAdmin) return; // Disable ordering while editing prices

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

  const getItemQty = (id: string) => cart.find(i => i.id === id)?.quantity || 0;
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    // Simulate processing
    setTimeout(() => {
        onPlaceOrder(cart, total); // Call parent to update balance and global order list
        setCart([]); // Clear local cart
        setOrderPlaced(false);
        // We do not show an alert, the change in balance and history is feedback enough
        // but we could scroll to bottom to show history
    }, 500);
  };

  // --- Admin Price Editing Logic ---
  const startEditing = (item: FryItem) => {
    setEditingId(item.id);
    setEditPrice(item.price.toFixed(2));
  };

  const savePrice = (id: string) => {
    const newPrice = parseFloat(editPrice.replace(',', '.'));
    if (!isNaN(newPrice)) {
      setItems(prev => prev.map(item => item.id === id ? { ...item, price: newPrice } : item));
    }
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditPrice('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0f172a] transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 pt-4 pb-3 px-4 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChevronBack onClick={onBack} />
            <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">Frituur Selectie</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Admin Toggle Button */}
            <div 
               onClick={() => setIsAdmin(!isAdmin)}
               className={`p-2 rounded-full cursor-pointer transition-colors ${isAdmin ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}
             >
               <span className="material-icons-round text-sm">{isAdmin ? 'admin_panel_settings' : 'settings'}</span>
             </div>

            <button 
              onClick={onNavigateOverview}
              className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
            >
              <span className="material-icons-round text-sm">list_alt</span>
              <span className="text-xs font-bold">Overzicht</span>
            </button>
          </div>
        </div>
        <div className="mt-2 flex justify-between items-center">
           <div className="text-xs text-gray-500 dark:text-gray-400 pl-8">
              Bestelling voor <span className="font-bold text-gray-900 dark:text-white">{currentUser.name}</span>
           </div>
           {isAdmin && (
             <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded border border-blue-200 animate-pulse">
               BEWERK MODUS
             </span>
           )}
        </div>
      </header>

      {/* Tabs */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-[#0f172a] sticky top-[85px] z-40 overflow-x-auto no-scrollbar transition-colors">
        <div className="flex gap-2">
          {['frieten', 'snacks', 'sauzen'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap border capitalize transition-all ${
                activeCategory === cat 
                  ? 'bg-blue-600/10 text-blue-600 border-blue-600/20 dark:text-blue-400 dark:border-blue-400/30' 
                  : 'bg-white dark:bg-[#1e2330] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-4 pb-36 pt-2">
        <div className="space-y-4 mb-8">
          {items.filter(i => i.category === activeCategory).map((item) => {
            const qty = getItemQty(item.id);
            const isEditing = editingId === item.id;

            return (
              <div key={item.id} className={`bg-white dark:bg-[#1e2330] rounded-xl p-4 shadow-sm border transition-all ${qty > 0 ? 'border-blue-600 ring-1 ring-blue-600 dark:border-blue-500 dark:ring-blue-500' : 'border-gray-100 dark:border-gray-800'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className={`font-semibold text-lg ${qty > 0 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>{item.name}</h3>
                    
                    {/* Price Display / Editing */}
                    <div className="flex items-center mt-0.5">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-sm">€</span>
                          <input 
                            type="number"
                            step="0.01"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="w-20 px-2 py-1 text-sm bg-gray-50 dark:bg-gray-700 border border-blue-500 rounded focus:outline-none"
                            autoFocus
                          />
                          <button onClick={() => savePrice(item.id)} className="p-1 bg-green-100 text-green-700 rounded hover:bg-green-200">
                            <span className="material-icons-round text-sm">check</span>
                          </button>
                          <button onClick={cancelEdit} className="p-1 bg-red-100 text-red-700 rounded hover:bg-red-200">
                            <span className="material-icons-round text-sm">close</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <p className="text-gray-500 dark:text-gray-400 text-sm">€ {item.price.toFixed(2)}</p>
                          {isAdmin && (
                            <button 
                              onClick={() => startEditing(item)}
                              className="text-gray-300 hover:text-blue-600 transition-colors"
                            >
                              <span className="material-icons-round text-xs">edit</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Quantity Controls - Disabled in Admin Mode */}
                  <div className={`flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-3 transition-colors ${isAdmin ? 'opacity-30 pointer-events-none' : ''}`}>
                    <button 
                      onClick={() => updateQuantity(item, -1)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md shadow-sm active:scale-95 transition-all ${qty > 0 ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400' : 'bg-white dark:bg-gray-700 text-gray-400'}`}
                    >
                      <span className="material-icons-round text-sm">remove</span>
                    </button>
                    <span className={`font-bold w-4 text-center ${qty > 0 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>{qty}</span>
                    <button 
                      onClick={() => updateQuantity(item, 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-600 text-white shadow-md active:scale-95 transition-all hover:bg-blue-700"
                    >
                      <span className="material-icons-round text-sm">add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ORDER HISTORY SECTION */}
        <section className="mb-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
             <span className="material-icons-round text-lg">history</span>
             Mijn Bestelgeschiedenis
          </h2>
          
          {myOrders.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 dark:bg-[#1e2330]/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
               <span className="material-icons-round text-gray-300 text-4xl mb-2">fastfood</span>
               <p className="text-gray-500 text-sm">Nog geen bestellingen geplaatst.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myOrders.map((order) => (
                <div key={order.id} className="bg-white dark:bg-[#1e2330] p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                   <div className="flex justify-between items-start mb-2">
                      <div>
                         <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                            {order.date.toLocaleDateString('nl-BE')} • {order.date.toLocaleTimeString('nl-BE', {hour: '2-digit', minute:'2-digit'})}
                         </span>
                         <div className="font-bold text-gray-900 dark:text-white mt-0.5">
                            € {order.totalPrice.toFixed(2).replace('.', ',')}
                         </div>
                      </div>
                      <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-md font-bold">
                        Geboekt
                      </span>
                   </div>
                   
                   <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                           <span>{item.quantity}x {item.name}</span>
                           <span className="text-gray-400">€ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                   </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Helper text */}
        <p className="text-center text-xs text-gray-400 pb-4">
          Alle bestellingen worden automatisch samengevoegd in het overzicht.
        </p>
      </main>

      {/* Floating Bottom Bar - Only visible if items in cart AND not admin */}
      {cart.length > 0 && !isAdmin && (
        <footer className="fixed bottom-20 left-4 right-4 z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-white dark:bg-[#1e2330] border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-2xl transition-colors">
            <div className="flex justify-between items-end mb-3">
               <div>
                 <span className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase">Totaal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                 <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">€ {total.toFixed(2)}</div>
               </div>
            </div>
            <button 
                onClick={handlePlaceOrder}
                disabled={orderPlaced}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
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
            <p className="text-[10px] text-center text-gray-400 mt-2">
               Wordt direct toegevoegd aan je voorlopige rekening.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};