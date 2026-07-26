import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    name: string;
    id: string;
    email: string;
    role: string;
    token: string;
}

interface AuthStore {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            logout: () => set({ user: null }),
        }),
        {
            name: "user-auth", 
        }
    )
);
