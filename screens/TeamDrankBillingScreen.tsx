import React, { useState } from 'react';

interface TeamDrankBillingScreenProps {
  onBack: () => void;
}

export const TeamDrankBillingScreen: React.FC<TeamDrankBillingScreenProps> = ({ onBack }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>(['4']); // Pre-select Kobe

  const users = [
    { id: '1', name: 'Lukas Peeters', role: 'Hoofdleiding', amount: -42.50, paid: false },
    { id: '2', name: "Marie D'hondt", role: 'Leiding Jonghernieuwers', amount: -12.00, paid: false },
    { id: '3', name: 'Thomas De Wit', role: 'Leiding Knapen', amount: -4.50, paid: false },
    { id: '4', name: 'Kobe Mertens', role: 'Leiding Sloebers', amount: -8.00, paid: false },
    { id: '5', name: 'Sam Vermeulen', role: 'Leiding Piepers', amount: 0.00, paid: true },
  ];

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
    <div className="flex flex-col min-h-screen bg-[#0f172a] text-white font-sans">
      {/* Header */}
      <header className="px-4 py-4 sticky top-0 bg-[#0f172a] z-10">
        <div className="flex items-center gap-4 mb-2">
           <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
             <span className="material-icons-round text-2xl">arrow_back_ios_new</span>
          </button>
          <div className="flex-1">
             <div className="flex justify-between items-start">
               <div>
                 <h1 className="text-2xl font-bold">Drankrekeningen</h1>
                 <p className="text-sm text-gray-400">Team Drank Administratie</p>
               </div>
               <button className="p-2 hover:bg-white/10 rounded-full">
                 <span className="material-icons-round text-blue-500">filter_list</span>
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
            className="w-full bg-[#1e293b] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          />
        </div>
      </header>

      <main className="flex-1 px-4 pb-28 overflow-y-auto">
        
        {/* Summary Row */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#1e293b]/50 border border-blue-900/30 rounded-xl p-4">
             <span className="text-xs text-blue-200 font-medium">Totaal Openstaand</span>
             <div className="text-2xl font-bold text-blue-400 mt-1">€ 482,50</div>
          </div>
          <div className="bg-[#1e293b]/50 border border-gray-700/50 rounded-xl p-4">
             <span className="text-xs text-gray-400 font-medium">Aantal Leden</span>
             <div className="text-2xl font-bold text-white mt-1">24</div>
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
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-[#1e3a8a]/20 border-blue-600' 
                    : 'bg-[#1e293b] border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
                       <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    {/* Badge for Alert */}
                    {user.amount < -40 && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-[#1e293b] flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">!</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{user.name}</h3>
                    <p className="text-xs text-gray-400">{user.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`font-bold text-base ${isSelected ? 'text-gray-400 line-through' : 'text-red-400'}`}>
                      -€ {Math.abs(user.amount).toFixed(2).replace('.', ',')}
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-blue-500 text-white' : 'bg-red-900/30 text-red-400'}`}>
                      {isSelected ? 'Geselecteerd' : 'Niet betaald'}
                    </span>
                  </div>
                  
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-500'
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
              <div key={user.id} className="bg-[#1e293b] p-4 rounded-2xl border border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 font-bold text-lg">
                      {user.name.substring(0,2).toUpperCase()}
                   </div>
                   <div>
                    <h3 className="font-bold text-gray-300 text-base">{user.name}</h3>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
                 <div className="flex items-center gap-4">
                   <div className="text-right">
                    <div className="font-bold text-green-500">€ 0,00</div>
                    <span className="text-[10px] bg-green-900/20 text-green-500 px-1.5 py-0.5 rounded">Betaald</span>
                   </div>
                   <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                     <span className="material-icons-round text-green-500 text-sm">check</span>
                   </div>
                 </div>
              </div>
            ))}
         </div>
      </main>

      {/* Footer Action */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-[#0f172a] border-t border-gray-800 z-20">
         <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
           Markeer als Betaald
           {selectedTotal > 0 && <span className="bg-white/20 px-2 py-0.5 rounded text-sm">€ {selectedTotal.toFixed(2).replace('.', ',')}</span>}
         </button>
      </footer>
    </div>
  );
};