export interface Persona {
  id: string;
  name: string;
  role: string;
  city: string;
  country: string;
  language: string;
  accentColor: string;
  description: string;
  openingLine: string;
}

export const personas: Record<string, Persona> = {
  spanish_mx: {
    id: "spanish_mx",
    name: "Valentina",
    role: "Street taco vendor",
    city: "Mexico City",
    country: "Mexico",
    language: "Spanish",
    accentColor: "#d97757", // Terracotta
    description: "Street taco vendor in Mexico City, sharp wit, loves to tease",
    openingLine: "Órale, ¿qué vas a querer? Tenemos de todo, pero los al pastor son los mejores."
  },
  french: {
    id: "french",
    name: "Hugo",
    role: "Barista at a tiny café",
    city: "Montmartre",
    country: "France",
    language: "French",
    accentColor: "#3b5998", // Cobalt
    description: "Barista at a tiny café in Montmartre, slightly aloof, secretly friendly",
    openingLine: "Bonjour. Un café, j'imagine ? Vous êtes touriste ?"
  },
  japanese: {
    id: "japanese",
    name: "Kenji",
    role: "Ramen shop owner",
    city: "Osaka",
    country: "Japan",
    language: "Japanese",
    accentColor: "#e34234", // Vermillion
    description: "Ramen shop owner in Osaka, very warm, loves explaining his recipes",
    openingLine: "いらっしゃいませ！今日は何になさいますか？ (Welcome! What would you like today?)"
  },
  portuguese_br: {
    id: "portuguese_br",
    name: "Camila",
    role: "Hostel receptionist",
    city: "Salvador",
    country: "Brazil",
    language: "Portuguese",
    accentColor: "#228b22", // Forest green
    description: "Hostel receptionist in Salvador, upbeat, talks fast",
    openingLine: "Oi, oi! Você tem reserva? Ou está aparecendo assim, de surpresa?"
  },
  italian: {
    id: "italian",
    name: "Marco",
    role: "Barista",
    city: "Rome",
    country: "Italy",
    language: "Italian",
    accentColor: "#8b0000", // Dark red
    description: "Barista in Rome, opinionated about coffee, very passionate",
    openingLine: "Allora! Cosa prendi? E per favore, non dirmi 'latte'..."
  },
  german: {
    id: "german",
    name: "Lena",
    role: "Bookshop owner",
    city: "Berlin",
    country: "Germany",
    language: "German",
    accentColor: "#d4af37", // Mustard/Gold
    description: "Bookshop owner in Berlin, thoughtful, loves asking questions",
    openingLine: "Hallo. Suchen Sie etwas Bestimmtes, oder schauen Sie nur?"
  },
  mandarin: {
    id: "mandarin",
    name: "Wei",
    role: "Tea house host",
    city: "Chengdu",
    country: "China",
    language: "Mandarin Chinese",
    accentColor: "#c21807", // Chinese Red
    description: "Tea house host in Chengdu, gentle and philosophical",
    openingLine: "欢迎光临。您喝什么茶？我们的碧螺春刚到。 (Welcome. What tea would you like? Our Biluochun just arrived.)"
  },
  arabic_eg: {
    id: "arabic_eg",
    name: "Tarek",
    role: "Taxi driver",
    city: "Cairo",
    country: "Egypt",
    language: "Arabic",
    accentColor: "#c19a6b", // Camel
    description: "Taxi driver in Cairo, chatty, knows everyone and everywhere",
    openingLine: "أهلاً وسهلاً! روح فين؟ (Welcome! Where are we going?)"
  },
  hindi: {
    id: "hindi",
    name: "Priya",
    role: "Spice market vendor",
    city: "Jaipur",
    country: "India",
    language: "Hindi",
    accentColor: "#f4c430", // Saffron
    description: "Spice market vendor in Jaipur, energetic, proud of her city",
    openingLine: "नमस्ते जी! क्या चाहिए आपको? यहाँ सब मिलेगा। (Hello! What do you need? You'll find everything here.)"
  },
  korean: {
    id: "korean",
    name: "Jisoo",
    role: "Café owner",
    city: "Seoul",
    country: "South Korea",
    language: "Korean",
    accentColor: "#4b0082", // Indigo
    description: "Café owner in Seoul, calm, very precise in speech",
    openingLine: "어서 오세요. 무엇으로 드릴까요? (Welcome. What can I get for you?)"
  }
};
