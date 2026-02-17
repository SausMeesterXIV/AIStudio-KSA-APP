import React, { useState } from 'react';
import { ChevronBack } from '../components/ChevronBack';
import { Notification } from '../types';

interface AgendaManageScreenProps {
  onBack: () => void;
  onAddNotification: (notification: Omit<Notification, 'id'>) => void;
}

export const AgendaManageScreen: React.FC<AgendaManageScreenProps> = ({ onBack, onAddNotification }) => {
  // Make events stateful so we can update them locally
  const [localEvents, setLocalEvents] = useState([
    { id: 1, day: '14', month: 'OKT', title: 'Spaghetti Avond', time: '18:00', location: 'Lokaal 4', description: 'Gezellig eten met iedereen.' },
    { id: 2, day: '21', month: 'OKT', title: 'Kampvoorbereiding', time: '20:00', location: 'De Zolder', description: 'Brainstormen over thema.' },
    { id: 3, day: '01', month: 'NOV', title: 'Leidingsweekend', time: '19:30', location: 'Ardennen', description: 'Weekendje weg!' },
  ]);

  const roles = [
    'Hoofdleiding',
    'Sfeerbeheer',
    'Drank',
    'Financiën',
    'Materiaal',
    'Leiding',
    'Kookploeg'
  ];

  // Form State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  // Handle Edit Click - Populate form
  const handleEditClick = (event: any) => {
    setEditingId(event.id);
    setTitle(event.title);
    setLocation(event.location);
    setTimeStr(event.time);
    setDescription(event.description || '');
    // Mock date conversion for demo simplicity
    setDateStr(`${new Date().getFullYear()}-10-${event.day}`); 
    
    // Scroll to form
    const formElement = document.getElementById('event-form');
    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDateStr('');
    setTimeStr('');
    setLocation('');
    setDescription('');
    setSelectedRole('');
  };

  const handleSave = () => {
    if(!title) return;

    if (editingId) {
      // --- UPDATE EXISTING EVENT ---
      
      // Update local list
      setLocalEvents(prev => prev.map(ev => {
        if (ev.id === editingId) {
          // Extract day/month from date string roughly for demo
          const d = new Date(dateStr || new Date()); 
          const day = d.getDate().toString().padStart(2, '0');
          const month = d.toLocaleString('default', { month: 'short' }).toUpperCase().replace('.', '');

          return {
            ...ev,
            title,
            time: timeStr || ev.time,
            location: location || ev.location,
            description,
            day: dateStr ? day : ev.day,
            month: dateStr ? month : ev.month
          };
        }
        return ev;
      }));

      // Trigger Notification for UPDATE
      onAddNotification({
        type: 'agenda',
        sender: 'Agenda Update',
        role: 'AGENDA',
        title: 'Event Bijgewerkt',
        content: `Het event '${title}' is bijgewerkt met nieuwe informatie.`,
        time: 'Zonet',
        isRead: false,
        action: 'Bekijken',
        icon: 'edit_calendar',
        color: 'bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-500'
      });

      setEditingId(null);
      resetForm();

    } else {
      // --- CREATE NEW EVENT ---
      
      const d = new Date(dateStr || new Date());
      const newEvent = {
        id: Date.now(),
        title,
        time: timeStr || '00:00',
        location: location || 'TBD',
        description,
        day: d.getDate().toString().padStart(2, '0'),
        month: d.toLocaleString('default', { month: 'short' }).toUpperCase().replace('.', '')
      };

      setLocalEvents(prev => [...prev, newEvent]);

      // Trigger Notification for NEW
      onAddNotification({
        type: 'agenda',
        sender: 'Nieuw Event',
        role: 'AGENDA',
        title: title,
        content: description || 'Er is een nieuw evenement toegevoegd aan de agenda.',
        time: 'Zonet',
        isRead: false,
        action: 'Bekijken',
        icon: 'event',
        color: 'bg-green-100 dark:bg-green-600/20 text-green-600 dark:text-green-500'
      });

      resetForm();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      {/* Header */}
      <header className="px-4 py-6 flex items-center gap-4 bg-gray-50 dark:bg-gray-900 z-10 transition-colors">
        <ChevronBack onClick={onBack} />
        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Agenda Beheer</h1>
      </header>

      <main className="flex-1 px-4 space-y-6 overflow-y-auto pb-8">
        
        {/* Upcoming List */}
        <section>
          <div className="flex justify-between items-end mb-3 px-1">
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-500 uppercase tracking-wide">Komende Evenementen</h2>
            <span className="text-xs text-gray-500">Team Sfeerbeheer</span>
          </div>
          
          <div className="space-y-3">
            {localEvents.map((event) => (
              <div key={event.id} className={`bg-white dark:bg-gray-800/50 rounded-xl p-3 border flex items-center justify-between shadow-sm transition-all ${editingId === event.id ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50/50 dark:bg-blue-900/10' : 'border-gray-200 dark:border-gray-700/50'}`}>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 dark:bg-[#1e293b] rounded-lg h-12 w-12 flex flex-col items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/30">
                    <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 leading-none mb-0.5">{event.month}</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-blue-100 leading-none">{event.day}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-base">{event.title}</h3>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                      <span className="flex items-center gap-1">
                        <span className="material-icons-round text-[10px]">schedule</span> {event.time}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600"></span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                   <button 
                    onClick={() => handleEditClick(event)}
                    className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700/50 hover:bg-blue-100 dark:hover:bg-blue-900/40 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                   >
                     <span className="material-icons-round text-base">edit</span>
                   </button>
                   <button className="h-8 w-8 rounded-full bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 flex items-center justify-center text-red-500 dark:text-red-400 transition-colors">
                     <span className="material-icons-round text-base">delete</span>
                   </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-200 dark:border-gray-800" />

        {/* Add / Edit Form */}
        <section id="event-form">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={`w-1 h-5 rounded-full ${editingId ? 'bg-orange-500' : 'bg-blue-600 dark:bg-blue-500'}`}></div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {editingId ? 'Event Bewerken' : 'Nieuw Event Toevoegen'}
              </h2>
            </div>
            {editingId && (
              <button 
                onClick={handleCancelEdit}
                className="text-xs font-bold text-red-500 hover:underline"
              >
                Annuleren
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <input 
                type="text" 
                placeholder="Titel van activiteit" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input 
                  type="date" 
                  value={dateStr}
                  onChange={(e) => setDateStr(e.target.value)}
                  className="w-full bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 shadow-sm"
                />
              </div>
              <div className="relative">
                 <input 
                  type="time" 
                  value={timeStr}
                  onChange={(e) => setTimeStr(e.target.value)}
                  className="w-full bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 shadow-sm"
                />
              </div>
            </div>

            {/* Location */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Locatie"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 shadow-sm"
              />
              <span className="material-icons-round absolute right-3 top-3 text-gray-400 text-lg">place</span>
            </div>

            {/* Description (New) */}
            <div>
              <textarea 
                rows={3}
                placeholder="Omschrijving, link of korte boodschap (Optioneel)" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 shadow-sm resize-none"
              />
            </div>

            {/* Organizer Role Select */}
            <div className="relative">
               <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 appearance-none shadow-sm"
               >
                 <option value="" disabled>Organisator</option>
                 {roles.map(role => (
                   <option key={role} value={role}>
                     {role}
                   </option>
                 ))}
               </select>
               <span className="material-icons-round absolute right-3 top-3 text-gray-400 text-lg pointer-events-none">expand_more</span>
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleSave}
              className={`w-full text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 mt-2 transition-all active:scale-[0.98] ${
                editingId 
                  ? 'bg-orange-600 hover:bg-orange-500 shadow-orange-500/20' 
                  : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20'
              }`}
            >
              <span className="material-icons-round text-xl">{editingId ? 'edit' : 'save'}</span>
              {editingId ? 'Wijzigingen Opslaan' : 'Opslaan'}
            </button>
          </div>
        </section>

      </main>
    </div>
  );
};