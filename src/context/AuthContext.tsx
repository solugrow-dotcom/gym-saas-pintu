"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { insforge } from "@/lib/insforge";
import { useRouter } from "next/navigation";

// Define the shape of the context
type AuthContextType = {
    user: any | null; // Replace 'any' with specific User type if available
    loading: boolean;
    signInWithEmail: (email: string) => Promise<any>;
    verifyOtp: (email: string, token: string) => Promise<any>; // Changed to verifyOtp as requested in original prompt (Email + OTP)
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signInWithEmail: async () => { },
    verifyOtp: async () => { },
    signOut: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check active session
        const checkSession = async () => {
            try {
                const { data: { session } } = await insforge.auth.getSession();
                setUser(session?.user ?? null);
            } catch (error) {
                console.error("Error checking session:", error);
            } finally {
                setLoading(false);
            }
        };

        checkSession();

        // Listen for changes
        const { data: { subscription } } = insforge.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    const signInWithEmail = async (email: string) => {
        return insforge.auth.signInWithOtp({ email });
    };

    const verifyOtp = async (email: string, token: string) => {
        const { data, error } = await insforge.auth.verifyOtp({ email, token, type: 'email' });
        if (error) throw error;
        return data;
    }

    const signOut = async () => {
        await insforge.auth.signOut();
        setUser(null);
        router.push("/login"); // Redirect to login after sign out
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithEmail, verifyOtp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
