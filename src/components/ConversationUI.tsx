import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, HelpCircle, X } from 'lucide-react';
import type { Persona } from '../data/personas';
import type { Scenario } from '../data/scenarios';
import { streamAIResponse } from '../utils/ai';
import type { ChatMessage } from '../utils/ai';
import { useAppContext } from '../context/AppContext';
import { speak } from '../utils/tts';

interface ConversationUIProps {
  persona: Persona;
  scenario: Scenario;
  onEnd: () => void;
}

export const ConversationUI: React.FC<ConversationUIProps> = ({ persona, scenario, onEnd }) => {
  const { state, dispatch } = useAppContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hints, setHints] = useState<string[]>([]);
  const [cultureTip, setCultureTip] = useState<string | null>(null);
  const [showTranslations, setShowTranslations] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Start the conversation
    document.documentElement.style.setProperty('--accent', persona.accentColor);
    
    // const sysPrompt = \`
    // You are \${persona.name}, a \${persona.description}. You are having a real, natural conversation with a language learner who is practicing \${persona.language} at a \${scenario.difficulty} level. The scenario is: \${scenario.description}.
    // CORE RULES: ...\`;
    
    // Initial greeting
    setMessages([
      { role: 'assistant', content: persona.openingLine }
    ]);
  }, [persona, scenario]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: text }
    ];
    
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);
    setHints([]); // Clear hints
    
    const sysPrompt = `You are ${persona.name}, a ${persona.description} in ${persona.city}, ${persona.country}. You are talking to a learner practicing ${persona.language} at a ${scenario.difficulty} level. Scenario: ${scenario.description}. Follow the core rules: stay in character, correct organically, introduce vocab wrapped in <span class="new-vocab" data-translation="...">...</span>.`;

    let currentResponse = '';
    
    // Create a temporary message for streaming
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    await streamAIResponse(
      { messages: newMessages, systemPrompt: sysPrompt },
      (chunk) => {
        currentResponse = chunk;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].content = currentResponse;
          return updated;
        });
      },
      (finalText, translation) => {
        setIsTyping(false);
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].content = finalText;
          updated[updated.length - 1].translation = translation;
          return updated;
        });
        
        dispatch({ type: 'ADD_XP', payload: 10 });
        
        // Robust Vocab Extraction Check
        // If the AI included a new-vocab span, we should notify the user or auto-add it
        if (finalText.includes('new-vocab')) {
          // Subtle notification or logic to highlight the word
        }

        if (Math.random() > 0.7 && messages.length > 3) {
          const tips = [
            "In many cultures, greeting people warmly is essential before asking for something.",
            "Locals often use different slang than what you find in textbooks.",
            "Paying attention to the tone is just as important as the words!"
          ];
          setCultureTip(tips[Math.floor(Math.random() * tips.length)]);
        }
      },
      () => {
        setIsTyping(false);
      },
      state.useLocalAI
    );
  };

  const requestHint = () => {
    // In a full implementation, this would call the AI for hints.
    setHints([
      "¿Podría ayudarme con esto?",
      "No estoy seguro, ¿qué me recomiendas?",
      "Lo siento, no entiendo bien."
    ]);
  };

  const handleVocabClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('new-vocab')) {
      const word = target.innerText;
      const translation = target.getAttribute('data-translation') || '';
      
      speak(word, persona.language);
      
      dispatch({
        type: 'ADD_VOCAB',
        payload: {
          word,
          language: persona.language,
          translation,
          scenario: scenario.title,
          contextSentence: target.parentElement?.innerText || word,
          dateAdded: new Date().toISOString()
        }
      });
      
      // Simple tooltip or toast could go here
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-borderBase bg-bg">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-display shadow-md mr-4"
          style={{ backgroundColor: persona.accentColor }}
        >
          {persona.name[0]}
        </div>
        <div>
          <h2 className="text-xl font-display font-semibold m-0 leading-tight">{persona.name}</h2>
          <p className="text-sm text-textSecondary m-0">{persona.role} in {persona.city}</p>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <button 
            onClick={() => setShowTranslations(!showTranslations)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              showTranslations 
                ? 'bg-accent text-white' 
                : 'bg-bg border border-borderBase text-textSecondary hover:text-textPrimary'
            }`}
          >
            {showTranslations ? 'Hide Translations' : 'Show Translations'}
          </button>
          <button 
            onClick={onEnd}
            className="px-4 py-2 text-sm text-textSecondary hover:text-textPrimary transition-colors"
          >
            End Session
          </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6"
        onClick={handleVocabClick}
      >
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}>
            <div 
              className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-chatUser text-white rounded-br-sm' 
                  : 'bg-chatAi border border-borderBase shadow-sm rounded-bl-sm text-textPrimary'
              }`}
              style={msg.role === 'user' ? { backgroundColor: 'var(--chat-user)' } : {}}
            >
              {msg.role === 'assistant' ? (
                <>
                  <div 
                    className="leading-relaxed font-body text-[1.05rem]"
                    dangerouslySetInnerHTML={{ __html: msg.content || (isTyping && idx === messages.length - 1 ? '<span class="typewriter-cursor"></span>' : '') }}
                  />
                  {showTranslations && msg.translation && (
                    <div className="mt-2 pt-2 border-t border-borderBase text-sm text-textSecondary italic animate-fadeIn">
                      {msg.translation}
                    </div>
                  )}
                </>
              ) : (
                <div className="leading-relaxed font-body text-[1.05rem]">{msg.content}</div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Culture Tip */}
      {cultureTip && (
        <div className="absolute right-4 bottom-24 w-80 bg-bg border-l-4 p-4 shadow-lg animate-slideInRight z-10" style={{ borderLeftColor: persona.accentColor }}>
          <button className="absolute top-2 right-2 text-textSecondary hover:text-textPrimary" onClick={() => setCultureTip(null)}>
            <X size={16} />
          </button>
          <h4 className="font-display font-semibold text-lg mb-1" style={{ color: persona.accentColor }}>Culture Tip</h4>
          <p className="text-sm text-textSecondary">{cultureTip}</p>
        </div>
      )}

      {/* Hints */}
      {hints.length > 0 && (
        <div className="px-4 flex gap-2 pb-2 overflow-x-auto">
          {hints.map((hint, i) => (
            <button 
              key={i}
              onClick={() => { setInput(hint); setHints([]); }}
              className="whitespace-nowrap px-4 py-2 bg-surface border border-borderBase rounded-full text-sm hover:bg-bg transition-colors"
            >
              {hint}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-surface border-t border-borderBase">
        <div className="flex items-center gap-2 max-w-4xl mx-auto relative">
          <button 
            onClick={requestHint}
            className="p-3 text-textSecondary hover:text-textPrimary transition-colors"
            title="Get a hint"
          >
            <HelpCircle size={24} />
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Type your message..."
            className="flex-1 bg-bg border border-borderBase rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-shadow"
            style={{ '--tw-ring-color': persona.accentColor } as React.CSSProperties}
          />
          
          <button 
            className="p-3 text-textSecondary hover:text-textPrimary transition-colors"
            title="Voice input (Coming soon)"
          >
            <Mic size={24} />
          </button>
          
          <button 
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isTyping}
            className="p-3 rounded-full text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
            style={{ backgroundColor: persona.accentColor }}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
