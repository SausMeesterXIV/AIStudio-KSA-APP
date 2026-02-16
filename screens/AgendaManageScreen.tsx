import React from 'react';

interface AgendaManageScreenProps {
  onBack: () => void;
}

export const AgendaManageScreen: React.FC<AgendaManageScreenProps> = ({ onBack }) => {
  const events = [
    { id: 1, day: '14', month: 'OKT', title: 'Spaghetti Avond', time: '18:00', location: 'Lokaal 4' },
    { id: 2, day: '21', month: 'OKT', title: 'Kampvoorbereiding', time: '20:00', location: 'De Zolder' },
    { id: 3, day: '01', month: 'NOV', title: 'Leidingsweekend', time: '19:30', location: 'Ardennen' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="px-6 py-6 flex items-center gap-4 bg-gray-900 z-10">
        <button 
          onClick={onBack}
          className="p-1 rounded-full hover:bg-gray-800 text-gray-400 transition-colors"
        >
          <span className="material-icons-round text-2xl">arrow_back_ios_new</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight text-white">Agenda Beheer</h1>
      </header>

      <main className="flex-1 px-4 space-y-6 overflow-y-auto pb-8">
        
        {/* Upcoming List */}
        <section>
          <div className="flex justify-between items-end mb-3 px-1">
            <h2 className="text-sm font-bold text-blue-500 uppercase tracking-wide">Komende Evenementen</h2>
            <span className="text-xs text-gray-500">Team Sfeerbeheer</span>
          </div>
          
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-[#1e293b] rounded-lg h-12 w-12 flex flex-col items-center justify-center shrink-0 border border-blue-900/30">
                    <span className="text-[10px] font-bold uppercase text-blue-400 leading-none mb-0.5">{event.month}</span>
                    <span className="text-lg font-bold text-blue-100 leading-none">{event.day}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base">{event.title}</h3>
                    <div className="flex items-center gap-2 text-gray-400 text-xs mt-0.5">
                      <span className="flex items-center gap-1">
                        <span className="material-icons-round text-[10px]">schedule</span> {event.time}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                   <button className="h-8 w-8 rounded-full bg-gray-700/50 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                     <span className="material-icons-round text-base">edit</span>
                   </button>
                   <button className="h-8 w-8 rounded-full bg-red-900/20 hover:bg-red-900/40 flex items-center justify-center text-red-400 transition-colors">
                     <span className="material-icons-round text-base">delete</span>
                   </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-800" />

        {/* Add New Form */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
            <h2 className="text-lg font-bold text-white">Nieuw Event Toevoegen</h2>
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <input 
                type="text" 
                placeholder="Titel van activiteit" 
                className="w-full bg-[#1f2937] border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="mm/dd/yyyy"
                  className="w-full bg-[#1f2937] border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                />
                 <span className="material-icons-round absolute right-3 top-3 text-gray-400 text-lg">calendar_today</span>
              </div>
              <div className="relative">
                 <input 
                  type="text" 
                  placeholder="--:-- --"
                  className="w-full bg-[#1f2937] border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                />
                <div className="absolute right-3 top-3 flex gap-1">
                   <span className="material-icons-round text-gray-400 text-lg">schedule</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Locatie"
                className="w-full bg-[#1f2937] border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              />
              <span className="material-icons-round absolute right-3 top-3 text-gray-400 text-lg">place</span>
            </div>

            {/* Responsible */}
            <div className="relative">
               <select className="w-full bg-[#1f2937] border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 appearance-none">
                 <option value="" disabled selected>Sfeer-verantwoordelijke</option>
                 <option value="Jonas">Jonas (Sfeermanager)</option>
                 <option value="Laura">Laura</option>
                 <option value="Thomas">Thomas</option>
               </select>
               <span className="material-icons-round absolute right-3 top-3 text-gray-400 text-lg pointer-events-none">expand_more</span>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 mt-2 transition-all active:scale-[0.98]">
              <span className="material-icons-round text-xl">save</span>
              Opslaan
            </button>
          </div>
        </section>

      </main>
    </div>
  );
};