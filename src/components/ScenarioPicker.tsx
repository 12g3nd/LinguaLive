import React, { useState } from 'react';
import { personas } from '../data/personas';
import type { Persona } from '../data/personas';
import { scenarios } from '../data/scenarios';
import type { Scenario } from '../data/scenarios';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface ScenarioPickerProps {
  onSelect: (persona: Persona, scenario: Scenario) => void;
}

export const ScenarioPicker: React.FC<ScenarioPickerProps> = ({ onSelect }) => {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  if (!selectedPersona) {
    return (
      <div className="p-8 md:p-12 max-w-6xl mx-auto animate-fadeIn">
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-textPrimary mb-4">Stop studying. Start talking.</h1>
          <p className="text-xl text-textSecondary font-body max-w-2xl mx-auto">Language isn't a subject. It's a place. Choose your destination and drop right in.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(personas).map((persona) => (
            <button
              key={persona.id}
              onClick={() => setSelectedPersona(persona)}
              className="relative overflow-hidden group text-left rounded-2xl p-6 bg-surface border border-borderBase hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ backgroundColor: persona.accentColor }}
              />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{persona.language}</h3>
                    <span className="text-sm text-textSecondary uppercase tracking-wider">{persona.country}</span>
                  </div>
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-display shadow-sm"
                    style={{ backgroundColor: persona.accentColor }}
                  >
                    {persona.name[0]}
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-textSecondary italic mb-4">"{persona.openingLine.split('.')[0]}..."</p>
                  <div className="flex items-center text-sm font-semibold" style={{ color: persona.accentColor }}>
                    Meet {persona.name} <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Scenarios view
  const groupedScenarios = scenarios.reduce((acc, scenario) => {
    if (!acc[scenario.category]) acc[scenario.category] = [];
    acc[scenario.category].push(scenario);
    return acc;
  }, {} as Record<string, Scenario[]>);

  return (
    <div className="p-8 md:p-12 max-w-5xl mx-auto animate-slideUp">
      <button 
        onClick={() => setSelectedPersona(null)}
        className="flex items-center text-textSecondary hover:text-textPrimary mb-8 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to languages
      </button>

      <div className="flex items-center gap-6 mb-12 pb-8 border-b border-borderBase">
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-display shadow-lg"
          style={{ backgroundColor: selectedPersona.accentColor }}
        >
          {selectedPersona.name[0]}
        </div>
        <div>
          <h2 className="text-4xl font-display font-bold mb-2">Talk to {selectedPersona.name}</h2>
          <p className="text-lg text-textSecondary">{selectedPersona.description}</p>
        </div>
      </div>

      <div className="space-y-12">
        {Object.entries(groupedScenarios).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-2xl font-display font-semibold mb-6">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => onSelect(selectedPersona, scenario)}
                  className="text-left p-6 bg-surface border border-borderBase rounded-xl hover:shadow-md transition-shadow group flex flex-col h-full"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span 
                      className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: `${selectedPersona.accentColor}20`,
                        color: selectedPersona.accentColor
                      }}
                    >
                      {scenario.difficulty}
                    </span>
                    <span className="text-sm text-textSecondary">{scenario.estimatedExchanges} exchanges</span>
                  </div>
                  <h4 className="font-display text-xl font-medium mb-2 group-hover:text-[var(--accent-hover)]" style={{ '--accent-hover': selectedPersona.accentColor } as React.CSSProperties}>
                    {scenario.title}
                  </h4>
                  <p className="text-textSecondary text-sm flex-1">{scenario.description}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
