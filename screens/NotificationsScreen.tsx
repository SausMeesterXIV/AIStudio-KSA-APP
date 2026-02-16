import React, { useState } from 'react';

export const NotificationsScreen: React.FC = () => {
  const [filter, setFilter] = useState<'Alles' | 'Nudges' | 'Officieel'>('Alles');

  const notifications = [
    {
      id: 1,
      type: 'official',
      sender: 'Hoofdleiding',
      role: 'ADMIN',
      title: 'Openstaande Drankrekening',
      content: 'Betaal a.u.b. je drankrekening van € 25,00 voor de maand oktober.',
      time: '2u geleden',
      isRead: false,
      action: '',
      icon: 'security',
      color: 'bg-blue-600/20 text-blue-500'
    },
    {
      id: 2,
      type: 'nudge',
      sender: 'Anonieme Nudge',
      role: '',
      title: '',
      content: '"Heb je wel genoeg gestreept gisterenavond?" 👀',
      time: '4u geleden',
      isRead: false,
      action: '',
      icon: 'sentiment_dissatisfied',
      color: 'bg-purple-600/20 text-purple-400'
    },
    {
      id: 3,
      type: 'agenda',
      sender: 'Agenda Update',
      role: '',
      title: '',
      content: 'Vergadering leiding start over 15 minuten in lokaal 3.',
      time: '5u geleden',
      isRead: true,
      action: '',
      icon: 'event',
      color: 'bg-green-600/20 text-green-500'
    },
    {
      id: 4,
      type: 'nudge',
      sender: 'Anonieme Nudge',
      role: '',
      title: '',
      content: 'Vergeet het lokaal niet te vegen na de activiteit!',
      time: 'Gisteren, 18:30',
      isRead: true,
      action: '',
      icon: 'cleaning_services',
      color: 'bg-gray-700/50 text-gray-400'
    },
    {
      id: 5,
      type: 'official',
      sender: 'Hoofdleiding',
      role: '',
      title: 'Inschrijvingen Geopend',
      content: 'De inschrijvingen voor het weekend staan open.',
      time: 'Gisteren, 10:00',
      isRead: true,
      action: '',
      icon: 'assignment',
      color: 'bg-gray-700/50 text-gray-400'
    }
  ];

  const filteredData = filter === 'Alles' 
    ? notifications 
    : filter === 'Nudges' 
      ? notifications.filter(n => n.type === 'nudge')
      : notifications.filter(n => n.type === 'official' || n.type === 'agenda');

  return (
    <div className="flex flex-col h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <header className="px-6 py-6 flex items-center justify-between sticky top-0 bg-[#0f172a] z-10">
        <h1 className="text-3xl font-bold tracking-tight">Meldingen</h1>
      </header>

      {/* Tabs */}
      <div className="px-6 pb-4">
        <div className="flex bg-[#1e293b] p-1 rounded-xl">
          {['Alles', 'Nudges', 'Officieel'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                filter === f 
                  ? 'bg-[#334155] text-white shadow-sm' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <main className="flex-1 overflow-y-auto px-4 pb-24 space-y-6">
        
        {/* Today Section */}
        <div>
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Vandaag</h2>
          <div className="space-y-3">
            {filteredData.filter(n => !n.time.includes('Gisteren')).map(notification => (
              <NotificationCard key={notification.id} data={notification} />
            ))}
             {filteredData.filter(n => !n.time.includes('Gisteren')).length === 0 && (
              <p className="text-gray-500 text-sm px-2 italic">Geen meldingen vandaag.</p>
            )}
          </div>
        </div>

        {/* Yesterday/Older Section */}
        <div>
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Gisteren</h2>
          <div className="space-y-3">
             {filteredData.filter(n => n.time.includes('Gisteren')).map(notification => (
              <NotificationCard key={notification.id} data={notification} />
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

const NotificationCard = ({ data }: { data: any }) => (
  <div className={`p-4 rounded-2xl border transition-all ${data.isRead ? 'bg-[#1e293b]/50 border-gray-800' : 'bg-[#1e293b] border-gray-700 shadow-md'}`}>
    <div className="flex items-start gap-4">
      {/* Icon */}
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${data.color}`}>
        <span className="material-icons-round text-2xl">{data.icon}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center gap-2">
            <h3 className={`font-bold text-sm ${data.isRead ? 'text-gray-400' : 'text-white'}`}>
              {data.sender}
            </h3>
            {data.role && (
              <span className="bg-blue-600/20 text-blue-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-600/30">
                {data.role}
              </span>
            )}
          </div>
          {!data.isRead && <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>}
        </div>

        {data.title && <p className="text-white text-sm font-medium mb-1">{data.title}</p>}
        
        <p className={`text-sm leading-relaxed ${data.type === 'nudge' ? 'italic text-gray-400' : 'text-gray-400'}`}>
          {data.content}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-gray-600 font-medium">{data.time}</span>
          {data.action && (
            <button className="text-xs font-bold text-blue-400 hover:text-blue-300 border border-blue-900/50 bg-blue-900/20 px-3 py-1.5 rounded-lg transition-colors">
              {data.action}
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);