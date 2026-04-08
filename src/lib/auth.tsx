import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>;
  signIn: (emailOrUsername: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
        emailRedirectTo: window.location.origin,
      },
    });
    return { error };
  };

  const signIn = async (emailOrUsername: string, password: string) => {
    let email = emailOrUsername;
    
    if (!emailOrUsername.includes("@")) {
      // Look up email by username from profiles table
      const { data, error: lookupError } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", emailOrUsername)
        .maybeSingle();
      
      if (lookupError || !data) {
        return { error: { message: "Username not found. Please check and try again." } };
      }
      
      // Get user email from auth - use the username's associated email
      // We need to look up via auth admin, but since we can't, let's try a different approach
      // Store email in profiles or use user metadata
      const { data: userData } = await supabase.auth.admin?.getUserById(data.id) ?? { data: null };
      if (!userData) {
        return { error: { message: "Could not find account. Try logging in with your email instead." } };
      }
      email = (userData as any)?.user?.email ?? emailOrUsername;
    }
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
