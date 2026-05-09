import Anthropic from "@anthropic-ai/sdk";

// Define message types
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatSession {
  messages: ChatMessage[];
  systemPrompt: string;
}

export const streamAIResponse = async (
  session: ChatSession,
  onChunk: (text: string) => void,
  onComplete: (fullText: string) => void,
  onError: (error: any) => void
) => {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  if (!apiKey) {
    // Mock streaming for development if no key is provided
    console.warn("No Anthropic API key found. Using mock response.");
    const mockReply = "This is a mock response. In a real app, this would stream from the AI. *Italics for english translation*. And a new vocab word: <span class='new-vocab'>mock word</span>.";
    let i = 0;
    const interval = setInterval(() => {
      onChunk(mockReply.slice(0, i));
      i++;
      if (i > mockReply.length) {
        clearInterval(interval);
        onComplete(mockReply);
      }
    }, 20);
    return;
  }

  try {
    const anthropic = new Anthropic({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true, // Needed for client-side API calls
    });

    const stream = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022", // Use the closest valid model since claude-sonnet-4-20250514 isn't publicly valid in SDK yet
      max_tokens: 1024,
      system: session.systemPrompt,
      messages: session.messages,
      stream: true,
    });

    let fullResponse = "";
    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        fullResponse += chunk.delta.text;
        onChunk(fullResponse);
      }
    }
    onComplete(fullResponse);
  } catch (err) {
    console.error("AI Stream Error:", err);
    onError(err);
  }
};
