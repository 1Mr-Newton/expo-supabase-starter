let messages = [
  {
    role: "user",
    content: "Say this is a test",
  },
  {
    role: "assistant",
    content: "Say this is a test",
  },
  {
    role: "user",
    content: "Wow so smart!",
  },
];

export interface GPT3ChatMessage {
  id: string;
  content: string;
  role: string;
}

export interface GPT3ChatRoom {
  id: string;
  model: string;

  messages: GPT3ChatMessage[];
}
