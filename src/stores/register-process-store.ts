import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
    email: string;
    setEmail: (email: string) => void;
};

export const useUserStore = create(
    persist<UserState>(
        (set) => ({
            email: '',
            setEmail: (email) => set({ email }),
        }),
        {
            name: 'user-mail-store',
        }
    )
);
