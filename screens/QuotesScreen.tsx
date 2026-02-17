import React, { useState } from 'react';
import { ChevronBack } from '../components/ChevronBack';
import { Quote } from '../types';
import { MOCK_USERS } from '../lib/data';

interface QuotesScreenProps {
  onBack: () => void;
  quotes: Quote[];
  onLike: (id: string) => void;
  onAddQuote: (text: string, context: string, authorId: string) => void;
}

export const QuotesScreen: React.FC<QuotesScreenProps> = ({ onBack, quotes, onLike, onAddQuote }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newQuoteText, setNewQuoteText] = useState('');
  const [newQuoteContext, setNewQuoteContext] = useState('');
  const [selectedAuthorId, setSelectedAuthorId] = useState('');

  const handleAdd = () => {
    if (!newQuoteText || !selectedAuthorId) return;
    onAddQuote(newQuoteText, newQuoteContext, selectedAuthorId);
    
    setIsAdding(false);
    setNewQuoteText('');
    setNewQuoteContext('');
    setSelectedAuthorId('');
  };

  const sortedQuotes = [...quotes].sort((a,b) => b.likes - a.likes);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-white font-sans transition-colors duration-200">
      {/* Header */}
      <header className="px-4 py-4 flex items-center gap-4 sticky top-0 bg-gray-50 dark:bg-[#0f172a] z-10 transition-colors border-b border-gray-200 dark:border-gray-800">
        <ChevronBack onClick={onBack} />
        <div>
          <h1 className="text-xl font-bold leading-tight">Citatenboekje</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Stem op de Quote van de Week!</p>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 overflow-y-auto pb-24 space-y-4">
        {sortedQuotes.map((quote, index) => {
          const author = MOCK_USERS.find(u => u.id === quote.authorId);
          const isWinner = index === 0 && quote.likes > 0;

          return (
            <div key={quote.id} className={`bg-white dark:bg-[#1e293b] rounded-2xl p-5 shadow-sm border relative transition-all ${isWinner ? 'border-yellow-400 ring-2 ring-yellow-400/20 shadow-yellow-200/50' : 'border-gray-200 dark:border-gray-800'}`}>
              
              {isWinner && (
                 <div className="absolute -top-3 right-4 bg-yellow-400 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                   <span className="material-icons-round text-sm">emoji_events</span> #1
                 </div>
              )}

              <span className="absolute top-4 left-4 text-6xl font-serif text-gray-100 dark:text-gray-700 leading-none select-none">“</span>
              
              <div className="relative z-10 pt-2">
                <p className="text-lg font-medium text-gray-800 dark:text-white italic mb-4 leading-relaxed">
                  {quote.text}
                </p>
                
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
                   <div className="flex items-center gap-3">
                      <img 
                        src={author?.avatar || 'https://i.pravatar.cc/150'} 
                        alt="Author" 
                        className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                      />
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{quote.authorName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{quote.context || 'Geen context'}</p>
                      </div>
                   </div>
                   
                   <button 
                     onClick={() => onLike(quote.id)}
                     className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-colors"
                   >
                      <span className="material-icons-round text-sm">favorite</span>
                      <span className="text-xs font-bold">{quote.likes}</span>
                   </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 text-right">
                   {quote.date.toLocaleDateString('nl-BE')}
                </p>
              </div>
            </div>
          );
        })}
      </main>

      {/* FAB to Add Quote */}
      <button 
        onClick={() => setIsAdding(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-pink-600 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-20"
      >
        <span className="material-icons-round text-3xl">add</span>
      </button>

      {/* Add Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto" onClick={() => setIsAdding(false)}></div>
          
          {/* Modal Content */}
          <div className="bg-white dark:bg-[#1e293b] w-full sm:w-[90%] max-w-lg rounded-t-3xl sm:rounded-3xl p-6 pointer-events-auto animate-in slide-in-from-bottom-full duration-300 shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Nieuw Citaat Toevoegen</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Wie zei het?</label>
                <div className="relative">
                  <select 
                    value={selectedAuthorId}
                    onChange={(e) => setSelectedAuthorId(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="" disabled>Kies een leiding...</option>
                    {MOCK_USERS.map(u => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                  <span className="material-icons-round absolute right-3 top-3 text-gray-400 pointer-events-none">expand_more</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">De Quote</label>
                <textarea 
                  value={newQuoteText}
                  onChange={(e) => setNewQuoteText(e.target.value)}
                  placeholder='"..."'
                  rows={3}
                  className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Context (Optioneel)</label>
                <input 
                  type="text"
                  value={newQuoteContext}
                  onChange={(e) => setNewQuoteContext(e.target.value)}
                  placeholder="bv. Tijdens de vergadering..."
                  className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <button 
                onClick={handleAdd}
                disabled={!newQuoteText || !selectedAuthorId}
                className="w-full bg-pink-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-pink-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span className="material-icons-round">format_quote</span>
                Toevoegen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};