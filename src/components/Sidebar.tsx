import React from 'react';
import { Flame, Book, Award, Clock, Cpu, Info } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import logo from '../assets/logo.png';

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useAppContext();

  return (
    <div className="w-80 bg-surface border-r border-borderBase h-full flex flex-col hidden md:flex animate-fadeIn">
      <div className="p-6 border-b border-borderBase flex-shrink-0">
        <div className="flex items-center gap-3 mb-6 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-borderBase transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md">
            <img src={logo} alt="LinguaLive Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight bg-gradient-to-r from-textPrimary to-textSecondary bg-clip-text text-transparent">
            LinguaLive
          </h1>
        </div>
        
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

        {/* Local AI Toggle */}
        <div className="bg-bg rounded-xl p-4 border border-borderBase shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Cpu className={state.useLocalAI ? "text-accent" : "text-textSecondary"} size={20} />
              <span className="text-sm font-semibold">Local AI Mode</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={state.useLocalAI}
                onChange={(e) => dispatch({ type: 'TOGGLE_LOCAL_AI', payload: e.target.checked })}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-borderBase peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
            </label>
          </div>
          <p className="text-[10px] text-textSecondary leading-tight">
            Connect to your local Ollama instance for unlimited free practice.
          </p>
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
