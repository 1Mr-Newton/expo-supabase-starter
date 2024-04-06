import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

import { supabase } from "@/config/supabase";

type AuthState = {
  user: User | null;
  session: Session | null;
  initialized?: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setInitialized: (initialized: boolean) => void;
  setLoading: (loading: boolean) => void;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  user: null,
  setUser: (user) => set({ user }),
  initialized: false,
  setInitialized: (initialized) => set({ initialized }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  signUp: async (email: string, password: string) => {
    try {
      if (!email) throw new Error("Email is required");
      if (!password) throw new Error("Password is required");

      set({ loading: true });

      const { error } = await supabase.auth.signUp({ email, password });

      if (error) throw error;
    } finally {
      set({ loading: false });
    }
  },
  signInWithPassword: async (email: string, password: string) => {
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");

    try {
      set({ loading: true });

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } finally {
      set({ loading: false });
    }
  },
  signOut: async () => {
    try {
      set({ loading: true });

      const { error } = await supabase.auth.signOut();

      if (error) throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
