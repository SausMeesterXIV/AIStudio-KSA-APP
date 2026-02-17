import React, { useState } from 'react';
import { MOCK_USERS } from '../lib/data';

interface TeamDrankBillingScreenProps {
  onBack: () => void;
}

export const TeamDrankBillingScreen: React.FC<TeamDrankBillingScreenProps> = ({ onBack }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>(['4']); // Pre-select Thomas (id 4 in MOCK_USERS)

  // Use MOCK_USERS directly for consistency
  const users = MOCK_USERS.map(user => ({
    ...user,
    // Add logic to determine paid status based on balance if needed, 
    // for now we'll simulate 'paid' if balance is 0 or positive
    paid: user.balance >= 0,
    amount: user.balance // Use the balance from centralized data
  }));

  const toggleUser = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(u => u !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const selectedTotal = users
    .filter(u => selectedUsers.includes(u.id))
    .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-white font-sans transition-colors duration-200">
      {/* Header */}
      <header className="px-4 py-4 sticky top-0 bg-gray-50 dark:bg-[#0f172a] z-10 transition-colors">
        <div className="flex items-center gap-4 mb-2">
           <button onClick={onBack} className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
             <span className="material-icons-round text-2xl">arrow_back_ios_new</span>
          </button>
          <div className="flex-1">
             <div className="flex justify-between items-start">
               <div>
                 <h1 className="text-2xl font-bold">Drankrekeningen</h1>
                 <p className="text-sm text-gray-500 dark:text-gray-400">Team Drank Administratie</p>
               </div>
               <button className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full text-blue-600 dark:text-blue-500">
                 <span className="material-icons-round">filter_list</span>
               </button>
             </div>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative mt-4">
          <span className="material-icons-round absolute left-3 top-3.5 text-gray-400">search</span>
          <input 
            type="text" 
            placeholder="Zoek leiding (bijv. Lukas)..." 
            className="w-full bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>
      </header>

      <main className="flex-1 px-4 pb-28 overflow-y-auto">
        
        {/* Summary Row */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-blue-50 dark:bg-[#1e293b]/50 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 transition-colors">
             <span className="text-xs text-blue-600 dark:text-blue-200 font-medium">Totaal Openstaand</span>
             <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">€ {Math.abs(users.filter(u => u.amount < 0).reduce((acc, u) => acc + u.amount, 0)).toFixed(2).replace('.', ',')}</div>
          </div>
          <div className="bg-white dark:bg-[#1e293b]/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-4 shadow-sm transition-colors">
             <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Aantal Leden</span>
             <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{users.length}</div>
          </div>
        </div>

        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Openstaand</h2>

        <div className="space-y-3">
          {users.filter(u => !u.paid).map(user => {
            const isSelected = selectedUsers.includes(user.id);
            return (
              <div 
                key={user.id} 
                onClick={() => toggleUser(user.id)}
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all cursor-pointer shadow-sm ${
                  isSelected 
                    ? 'bg-blue-50 dark:bg-[#1e3a8a]/20 border-blue-500 dark:border-blue-600' 
                    : 'bg-white dark:bg-[#1e293b] border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                       <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    {/* Badge for Alert */}
                    {user.amount < -40 && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white dark:border-[#1e293b] flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">!</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base">{user.name}</h3>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`font-bold text-base ${isSelected ? 'text-gray-400 line-through' : 'text-red-500 dark:text-red-400'}`}>
                      -€ {Math.abs(user.amount).toFixed(2).replace('.', ',')}
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-blue-100 dark:bg-blue-600 text-blue-700 dark:text-white' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                      {isSelected ? 'Geselecteerd' : 'Niet betaald'}
                    </span>
                  </div>
                  
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300 dark:border-gray-500'
                  }`}>
                    {isSelected && <span className="material-icons-round text-white text-sm">check</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 mt-6">Recent Betaald</h2>
         
         <div className="space-y-3 opacity-60">
            {users.filter(u => u.paid).map(user => (
              <div key={user.id} className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-lg overflow-hidden">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                   </div>
                   <div>
                    <h3 className="font-bold text-gray-700 dark:text-gray-300 text-base">{user.name}</h3>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
                 <div className="flex items-center gap-4">
                   <div className="text-right">
                    <div className="font-bold text-green-600 dark:text-green-500">€ 0,00</div>
                    <span className="text-[10px] bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-500 px-1.5 py-0.5 rounded">Betaald</span>
                   </div>
                   <div className="w-6 h-6 rounded-full bg-green-50 dark:bg-green-500/20 border border-green-500 flex items-center justify-center">
                     <span className="material-icons-round text-green-600 dark:text-green-500 text-sm">check</span>
                   </div>
                 </div>
              </div>
            ))}
         </div>
      </main>

      {/* Footer Action */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gray-50 dark:bg-[#0f172a] border-t border-gray-200 dark:border-gray-800 z-20 transition-colors">
         <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
           Markeer als Betaald
           {selectedTotal > 0 && <span className="bg-white/20 px-2 py-0.5 rounded text-sm">€ {selectedTotal.toFixed(2).replace('.', ',')}</span>}
         </button>
      </footer>
    </div>
  );
};