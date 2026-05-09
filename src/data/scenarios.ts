export interface Scenario {
  id: string;
  category: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedExchanges: number;
}

export const scenarios: Scenario[] = [
  {
    id: "everyday_1",
    category: "Everyday Life",
    title: "Ordering food at a local spot",
    description: "You've just walked into a popular local eatery. It's busy, the menu is only partially understandable, and the staff is waiting for your order.",
    difficulty: "Beginner",
    estimatedExchanges: 6
  },
  {
    id: "travel_1",
    category: "Practical & Travel",
    title: "Checking into a guesthouse",
    description: "You've arrived at your accommodation after a long journey. You need to check in, but they can't seem to find your reservation.",
    difficulty: "Intermediate",
    estimatedExchanges: 8
  },
  {
    id: "social_1",
    category: "Social & Cultural",
    title: "Making small talk with a stranger",
    description: "You're sitting at a café, and the person at the next table strikes up a conversation about the weather and what you're doing in town.",
    difficulty: "Beginner",
    estimatedExchanges: 5
  },
  {
    id: "slice_1",
    category: "Slice of Life (Immersive)",
    title: "A street vendor insisting you try their food",
    description: "A charismatic street vendor is absolutely convinced that you need to try their specialty today. You'll need to politely navigate the interaction.",
    difficulty: "Intermediate",
    estimatedExchanges: 7
  },
  {
    id: "work_1",
    category: "Work & Professional",
    title: "Networking event introduction",
    description: "You are at a casual professional meetup. You need to introduce yourself, explain what you do, and ask polite questions.",
    difficulty: "Advanced",
    estimatedExchanges: 10
  },
  {
    id: "medical_1",
    category: "Emergency & Health",
    title: "Explaining symptoms at a pharmacy",
    description: "You've caught a nasty bug and need specific medicine. You have to explain your symptoms clearly to the pharmacist to get the right help.",
    difficulty: "Intermediate",
    estimatedExchanges: 6
  },
  {
    id: "culture_debate_1",
    category: "Social & Cultural",
    title: "Debating the merits of local traditions",
    description: "You're at a dinner party and the conversation turns to a controversial local tradition. You need to express your opinion respectfully while asking about theirs.",
    difficulty: "Advanced",
    estimatedExchanges: 12
  },
  {
    id: "tech_1",
    category: "Work & Professional",
    title: "Technical project briefing",
    description: "You are explaining a complex technical problem to a colleague. You need to use precise terminology and handle their follow-up questions.",
    difficulty: "Advanced",
    estimatedExchanges: 15
  }
];
