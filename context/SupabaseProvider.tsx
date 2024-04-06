import { Session, User } from "@supabase/supabase-js";
import { useRouter, useSegments } from "expo-router";
import { createContext, useEffect } from "react";

import { supabase } from "@/config/supabase";
import useAuthStore from "@/stores/AuthStore";
import { useChatRoomStore } from "@/stores/ChatStore";

type SupabaseContextProps = {
  user: User | null;
  session: Session | null;
  initialized?: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type SupabaseProviderProps = { children: React.ReactNode };

export const SupabaseContext = createContext<SupabaseContextProps>({
  user: null,
  session: null,
  initialized: false,
  signUp: async () => {},
  signInWithPassword: async () => {},
  signOut: async () => {},
});

export const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
  const signUp = useAuthStore((state) => state.signUp);
  const signInWithPassword = useAuthStore((state) => state.signInWithPassword);
  const signOut = useAuthStore((state) => state.signOut);
  const user = useAuthStore((state) => state.user);
  const session = useAuthStore((state) => state.session);
  const initialized = useAuthStore((state) => state.initialized);
  const setUser = useAuthStore((state) => state.setUser);
  const setSession = useAuthStore((state) => state.setSession);
  const setInitialized = useAuthStore((state) => state.setInitialized);

  const setSocket = useChatRoomStore((state) => state.setSocket);
  const socketUrl = useChatRoomStore((state) => state.socketUrl);

  const segments = useSegments()[0];
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session ? session.user : null);
      setInitialized(true);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!initialized) return;

    if (!session && segments !== "(auth)") {
      router.replace("/(auth)");
    } else if (session && segments !== "(app)") {
      router.replace("/");
    }
  }, [initialized, session, segments]);

  return (
    <SupabaseContext.Provider
      value={{
        user,
        session,
        initialized,
        signUp,
        signInWithPassword,
        signOut,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};
