import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { ScenarioPicker } from './components/ScenarioPicker';
import { ConversationUI } from './components/ConversationUI';
import type { Persona } from './data/personas';
import type { Scenario } from './data/scenarios';

const MainApp: React.FC = () => {
  const [activeSession, setActiveSession] = useState<{ persona: Persona; scenario: Scenario } | null>(null);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg text-textPrimary selection:bg-accent selection:text-white">
      <Sidebar />
      <main className="flex-1 relative flex flex-col min-w-0">
        {activeSession ? (
          <ConversationUI 
            persona={activeSession.persona} 
            scenario={activeSession.scenario} 
            onEnd={() => setActiveSession(null)} 
          />
        ) : (
          <div className="flex-1 overflow-y-auto">
            <ScenarioPicker 
              onSelect={(persona, scenario) => setActiveSession({ persona, scenario })} 
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
