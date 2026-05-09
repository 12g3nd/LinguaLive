import Anthropic from "@anthropic-ai/sdk";

// Define message types
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  translation?: string; // Added for the translation toggle feature
}

export interface ChatSession {
  messages: ChatMessage[];
  systemPrompt: string;
}

export const streamAIResponse = async (
  session: ChatSession,
  onChunk: (text: string) => void,
  onComplete: (fullText: string, translation?: string) => void,
  onError: (error: any) => void,
  useLocalAI: boolean = false // Added flag from App State
) => {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  const localAIUrl = import.meta.env.VITE_LOCAL_AI_URL || "http://localhost:11434/api/chat";

  // Priority: If the user explicitly enabled Local AI in settings, OR if there's no API key
  if (useLocalAI || (!apiKey && import.meta.env.VITE_USE_LOCAL_AI !== 'false')) {
    try {
      console.log("Using Local AI (Ollama)...");
      const response = await fetch(localAIUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: "llama3", // or any local model the user has
          messages: [
            { role: 'system', content: session.systemPrompt + "\nIMPORTANT: Your response MUST be in the target language. After your response, provide an English translation on a new line starting with 'TRANSLATION: '." },
            ...session.messages.map(m => ({ role: m.role, content: m.content }))
          ],
          stream: true,
        }),
      });

      if (!response.ok) throw new Error("Local AI not responding. Make sure Ollama is running.");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      
      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const json = JSON.parse(line);
            if (json.message?.content) {
              fullText += json.message.content;
              // Only stream the target language part to the UI
              const [textPart] = fullText.split('TRANSLATION:');
              onChunk(textPart.trim());
            }
          } catch (e) {
            // Partial JSON chunk
          }
        }
      }

      const [finalText, translation] = fullText.split('TRANSLATION:');
      onComplete(finalText.trim(), translation?.trim());
      return;
    } catch (err) {
      console.warn("Local AI failed, falling back to mock or Anthropic if key exists.", err);
      if (!apiKey) {
        // Mock fallback as before
        const mockReply = "This is a mock response because local AI failed. *Es un simulacro*. Vocab: <span class='new-vocab' data-translation='Simulated'>simulacro</span>.";
        onChunk(mockReply);
        onComplete(mockReply, "This is a simulated reply.");
        return;
      }
    }
  }

  // Anthropic implementation
  try {
    const anthropic = new Anthropic({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });

    const stream = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: session.systemPrompt + "\nIMPORTANT: Provide an English translation of your response at the very end, prefixed with 'TRANSLATION: '.",
      messages: session.messages.map(m => ({ role: m.role, content: m.content })),
      stream: true,
    });

    let fullResponse = "";
    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        fullResponse += chunk.delta.text;
        const [textPart] = fullResponse.split('TRANSLATION:');
        onChunk(textPart.trim());
      }
    }
    const [finalText, translation] = fullResponse.split('TRANSLATION:');
    onComplete(finalText.trim(), translation?.trim());
  } catch (err) {
    console.error("AI Stream Error:", err);
    onError(err);
  }
};
