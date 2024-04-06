export interface Message {
  text: string | null;
  image: string | null;
  audio: string | null;
  createdAt: Date;
  id: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: string;
  messages: Message[];
}

interface FollowUp {
  id: string;
  text: string[];
}

export interface UserMessage {
  id: string;
  content: Message;
}

export interface AiMessage {
  content: Message;
  id: string;
}

export interface ChatMessage {
  id: string;
  user: UserMessage;
  ai: AiMessage;
  followUp: FollowUp | null;
}

export interface ChatRoom {
  id: string;
  model: string;

  messages: ChatMessage[];
}
