import React from 'react';
import { Flame, Book, Award, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { state } = useAppContext();

  return (
    <div className="w-80 bg-surface border-r border-borderBase h-full flex flex-col hidden md:flex animate-fadeIn">
      <div className="p-6 border-b border-borderBase flex-shrink-0">
        <h1 className="font-display text-2xl font-bold tracking-tight mb-6">LinguaLive</h1>
        
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-bg rounded-xl p-4 flex flex-col items-center justify-center border border-borderBase shadow-sm">
            <Flame className="text-[#d97757] mb-1" size={24} />
            <span className="text-2xl font-bold font-display">{state.streak}</span>
            <span className="text-xs text-textSecondary uppercase tracking-wider font-semibold">Streak</span>
          </div>
          <div className="flex-1 bg-bg rounded-xl p-4 flex flex-col items-center justify-center border border-borderBase shadow-sm">
            <Award className="text-[#d4af37] mb-1" size={24} />
            <span className="text-2xl font-bold font-display">{state.xp}</span>
            <span className="text-xs text-textSecondary uppercase tracking-wider font-semibold">XP</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-8">
          <h3 className="text-sm font-bold text-textSecondary uppercase tracking-widest mb-4 flex items-center">
            <Book size={16} className="mr-2" /> Vocabulary Bank
          </h3>
          {state.vocabBank.length === 0 ? (
            <div className="text-center p-6 bg-bg rounded-xl border border-borderBase border-dashed">
              <p className="text-sm text-textSecondary italic">Words you pick up along the way will live here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {state.vocabBank.slice(-10).reverse().map((vocab, i) => (
                <div key={i} className="bg-bg p-3 rounded-lg border border-borderBase shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-lg text-accent" style={{ color: 'var(--accent, #d97757)' }}>{vocab.word}</span>
                    <span className="text-xs text-textSecondary">{vocab.language}</span>
                  </div>
                  <p className="text-sm">{vocab.translation}</p>
                </div>
              ))}
              {state.vocabBank.length > 10 && (
                <button className="w-full text-center text-sm text-textSecondary hover:text-textPrimary py-2">
                  View all {state.vocabBank.length} words
                </button>
              )}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-bold text-textSecondary uppercase tracking-widest mb-4 flex items-center">
            <Clock size={16} className="mr-2" /> Recent Culture Tips
          </h3>
          {state.cultureJournal.length === 0 ? (
            <div className="text-center p-6 bg-bg rounded-xl border border-borderBase border-dashed">
              <p className="text-sm text-textSecondary italic">Your cultural discoveries will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {state.cultureJournal.slice(-5).reverse().map((tip, i) => (
                <div key={i} className="bg-bg p-3 rounded-lg border border-l-4 border-borderBase shadow-sm" style={{ borderLeftColor: 'var(--accent, #d97757)' }}>
                  <p className="text-sm text-textSecondary">{tip.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
