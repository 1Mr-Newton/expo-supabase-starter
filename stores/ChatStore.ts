import { create } from "zustand";
import { uuidv4 } from "@/helpers";

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

type ConnectionState = "DISCONNECTED" | "CONNECTING" | "CONNECTED";

type ChatRoomStore = {
  chatRoom: ChatRoom;
  connectionState: ConnectionState;
  addMessage: (message: ChatMessage) => ChatMessage;
  newChat: () => void;
  updateMessage: (message: ChatMessage) => void;
  updateMessageById: (messageId: string, updatedMessage: ChatMessage) => void;
  socket: WebSocket | null;
  setSocket: (socket: WebSocket) => void;
  socketUrl: string;
};

export const useChatRoomStore = create<ChatRoomStore>((set) => ({
  chatRoom: {
    id: uuidv4(),
    messages: [],
    model: "default",
  },
  socket: null,
  connectionState: "DISCONNECTED",

  socketUrl: "ws://192.168.100.54:13254",

  setSocket: (socket) => {
    set((state) => ({ socket }));
  },

  addMessage: (message) => {
    set((state) => ({
      chatRoom: {
        ...state.chatRoom,
        messages: [...state.chatRoom.messages, message],
      },
    }));
    return message;
  },

  newChat: () => {
    set((state) => ({
      chatRoom: {
        id: uuidv4(),
        messages: [],
        model: "default",
      },
    }));
  },

  updateMessage: (message: ChatMessage) => {
    set((state) => ({
      chatRoom: {
        ...state.chatRoom,
        messages: state.chatRoom.messages.map((msg) =>
          msg.user.content.id === message.user.content.id ? message : msg
        ),
      },
    }));
  },

  updateMessageById: (messageId: string, updatedMessage: ChatMessage) => {
    set((state) => {
      const updatedMessages = state.chatRoom.messages.map((msg) =>
        msg.user.id === messageId ? updatedMessage : msg
      );

      return {
        chatRoom: {
          ...state.chatRoom,
          messages: updatedMessages,
        },
      };
    });
  },
}));
