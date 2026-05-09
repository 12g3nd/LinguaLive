export const speak = (text: string, lang: string) => {
  if (!('speechSynthesis' in window)) {
    console.warn("Text-to-speech not supported in this browser.");
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Basic language mapping for TTS
  const langMap: Record<string, string> = {
    "Spanish": "es-MX",
    "French": "fr-FR",
    "Japanese": "ja-JP",
    "Portuguese": "pt-BR",
    "Italian": "it-IT",
    "German": "de-DE",
    "Mandarin Chinese": "zh-CN",
    "Arabic": "ar-SA",
    "Hindi": "hi-IN",
    "Korean": "ko-KR",
  };

  utterance.lang = langMap[lang] || "en-US";
  
  // Find a voice that matches the language
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find((v) => v.lang.startsWith(utterance.lang.split('-')[0]));
  
  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
};
