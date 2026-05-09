import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';

// Types
export interface VocabItem {
  word: string;
  language: string;
  translation: string;
  scenario: string;
  contextSentence: string;
  dateAdded: string;
}

export interface CultureTip {
  text: string;
  scenario: string;
  dateAdded: string;
}

export interface AppState {
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  vocabBank: VocabItem[];
  cultureJournal: CultureTip[];
  history: any[];
}

const defaultState: AppState = {
  xp: 0,
  streak: 0,
  lastActiveDate: null,
  vocabBank: [],
  cultureJournal: [],
  history: [],
};

type Action =
  | { type: 'ADD_XP'; payload: number }
  | { type: 'UPDATE_STREAK'; payload: string }
  | { type: 'ADD_VOCAB'; payload: VocabItem }
  | { type: 'ADD_CULTURE_TIP'; payload: CultureTip };

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_XP':
      return { ...state, xp: state.xp + action.payload };
    case 'UPDATE_STREAK':
      // Basic streak logic
      const today = action.payload;
      if (state.lastActiveDate === today) {
        return state; // Already active today
      }
      
      const lastActive = state.lastActiveDate ? new Date(state.lastActiveDate) : null;
      const currentDate = new Date(today);
      
      if (lastActive) {
        const diffTime = Math.abs(currentDate.getTime() - lastActive.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        if (diffDays === 1) {
          return { ...state, streak: state.streak + 1, lastActiveDate: today };
        } else if (diffDays > 1) {
          return { ...state, streak: 1, lastActiveDate: today }; // Reset streak
        }
      }
      return { ...state, streak: 1, lastActiveDate: today };
      
    case 'ADD_VOCAB':
      // Avoid duplicates
      if (state.vocabBank.find(v => v.word === action.payload.word)) return state;
      return { ...state, vocabBank: [...state.vocabBank, action.payload] };
      
    case 'ADD_CULTURE_TIP':
      if (state.cultureJournal.find(c => c.text === action.payload.text)) return state;
      return { ...state, cultureJournal: [...state.cultureJournal, action.payload] };
      
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Load from local storage
  const [state, dispatch] = useReducer(appReducer, defaultState, (initial) => {
    try {
      const item = window.localStorage.getItem('linguaLiveState');
      return item ? JSON.parse(item) : initial;
    } catch (error) {
      console.warn("Failed to load state from localStorage", error);
      return initial;
    }
  });

  // Save to local storage on change
  useEffect(() => {
    window.localStorage.setItem('linguaLiveState', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
