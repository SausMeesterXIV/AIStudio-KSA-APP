import React, { useState } from 'react';

interface RolesManageScreenProps {
  onBack: () => void;
}

interface UserRole {
  id: string;
  name: string;
  avatar: string;
  roles: string[];
}

export const RolesManageScreen: React.FC<RolesManageScreenProps> = ({ onBack }) => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserRole | null>(null);
  
  // Mock data
  const users: UserRole[] = [
    { id: '1', name: 'Lukas Vermeulen', avatar: 'https://i.pravatar.cc/150?u=lukas', roles: ['Financiën'] },
    { id: '2', name: 'Sarah De Smet', avatar: 'https://i.pravatar.cc/150?u=sarah', roles: ['Sfeerbeheer', 'Drank'] },
    { id: '3', name: 'Tom Wouters', avatar: 'https://i.pravatar.cc/150?u=tom', roles: [] },
    { id: '4', name: 'Emma Luyten', avatar: 'https://i.pravatar.cc/150?u=emma', roles: ['Materiaal'] },
  ];

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  // Role toggles state (mocked)
  const [toggles, setToggles] = useState({
    sfeer: false,
    drank: false,
    finance: false,
  });

  const handleOpenUser = (user: UserRole) => {
    setSelectedUser(user);
    setToggles({
      sfeer: user.roles.includes('Sfeerbeheer'),
      drank: user.roles.includes('Drank'),
      finance: user.roles.includes('Financiën'),
    });
  };

  const roleColors: {[key: string]: string} = {
    'Financiën': 'bg-blue-900/40 text-blue-400 border-blue-800',
    'Sfeerbeheer': 'bg-purple-900/40 text-purple-400 border-purple-800',
    'Drank': 'bg-amber-900/40 text-amber-400 border-amber-800',
    'Materiaal': 'bg-indigo-900/40 text-indigo-400 border-indigo-800',
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a] text-white font-sans relative">
      {/* Header */}
      <header className="px-4 py-4 sticky top-0 bg-[#0f172a] z-10">
        <div className="flex justify-between items-start mb-6">
          <button onClick={onBack} className="p-1 -ml-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
            <span className="material-icons-round text-2xl">arrow_back_ios_new</span>
          </button>
          <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-green-500 tracking-wider">ADMIN</span>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-1">Rollen & Beheer</h1>
          <p className="text-sm text-gray-400">Beheer leiding en hoofdleiding status</p>
        </div>
      </header>

      <main className="flex-1 px-4 pb-24 overflow-y-auto">
        {/* Search */}
        <div className="relative mb-6">
          <span className="material-icons-round absolute left-4 top-3.5 text-gray-400">search</span>
          <input 
            type="text" 
            placeholder="Zoek leiding..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1e293b] border border-gray-700 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Leiding ({filteredUsers.length})</h2>
          <button className="text-blue-400 text-sm font-medium hover:text-blue-300">Filter</button>
        </div>

        <div className="space-y-3">
          {filteredUsers.map(user => (
            <div key={user.id} className="bg-[#1e293b] p-4 rounded-xl border border-gray-800 flex items-center justify-between group hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#0f172a] bg-blue-900/20 flex items-center justify-center shrink-0">
                  {user.avatar ? (
                     <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                     <span className="text-blue-400 font-bold">{user.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{user.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {user.roles.length > 0 ? user.roles.map(role => (
                      <span key={role} className={`text-[10px] px-2 py-0.5 rounded border ${roleColors[role] || 'bg-gray-800 text-gray-400 border-gray-700'}`}>
                        {role}
                      </span>
                    )) : (
                      <span className="text-xs text-gray-500">Geen actieve rollen</span>
                    )}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleOpenUser(user)}
                className="w-10 h-10 rounded-xl bg-[#2a3855] hover:bg-blue-600 hover:text-white text-blue-400 flex items-center justify-center transition-all"
              >
                <span className="material-icons-round">tune</span>
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Sheet / Modal */}
      {selectedUser && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={() => setSelectedUser(null)}></div>
          <div className="fixed bottom-0 left-0 right-0 bg-[#0f172a] border-t border-gray-800 rounded-t-[2rem] p-6 z-50 animate-in slide-in-from-bottom-full duration-300 shadow-2xl">
            <div className="w-12 h-1 bg-gray-700 rounded-full mx-auto mb-6"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Rollen beheren</h3>
                <p className="text-sm text-blue-400">Voor {selectedUser.name}</p>
              </div>
              <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-white">
                <span className="material-icons-round">close</span>
              </button>
            </div>

            <div className="space-y-4 mb-8">
              {/* Role Items */}
              <div className="bg-[#1e293b] rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-900/30 text-purple-400">
                    <span className="material-icons-round text-lg">celebration</span>
                  </div>
                  <span className="font-medium text-gray-200">Team Sfeerbeheer</span>
                </div>
                <button 
                  onClick={() => setToggles({...toggles, sfeer: !toggles.sfeer})}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${toggles.sfeer ? 'bg-blue-600' : 'bg-gray-600'}`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${toggles.sfeer ? 'translate-x-6' : 'translate-x-0'}`}>
                    {toggles.sfeer && <span className="absolute inset-0 flex items-center justify-center"><span className="material-icons-round text-[10px] text-blue-600">check</span></span>}
                  </span>
                </button>
              </div>

              <div className="bg-[#1e293b] rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-900/30 text-amber-400">
                    <span className="material-icons-round text-lg">local_bar</span>
                  </div>
                  <span className="font-medium text-gray-200">Team Drank</span>
                </div>
                <button 
                  onClick={() => setToggles({...toggles, drank: !toggles.drank})}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${toggles.drank ? 'bg-blue-600' : 'bg-gray-600'}`}
                >
                   <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${toggles.drank ? 'translate-x-6' : 'translate-x-0'}`}>
                    {toggles.drank && <span className="absolute inset-0 flex items-center justify-center"><span className="material-icons-round text-[10px] text-blue-600">check</span></span>}
                  </span>
                </button>
              </div>

              <div className="bg-[#1e293b] rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-900/30 text-blue-400">
                    <span className="material-icons-round text-lg">euro</span>
                  </div>
                  <span className="font-medium text-gray-200">Financiën</span>
                </div>
                <button 
                  onClick={() => setToggles({...toggles, finance: !toggles.finance})}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${toggles.finance ? 'bg-blue-600' : 'bg-gray-600'}`}
                >
                   <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${toggles.finance ? 'translate-x-6' : 'translate-x-0'}`}>
                    {toggles.finance && <span className="absolute inset-0 flex items-center justify-center"><span className="material-icons-round text-[10px] text-blue-600">check</span></span>}
                  </span>
                </button>
              </div>
            </div>

            <button 
              onClick={() => setSelectedUser(null)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
            >
              Opslaan
            </button>
          </div>
        </>
      )}
    </div>
  );
};