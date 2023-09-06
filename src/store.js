import { create } from "zustand";

export const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem("ACCESS_TOKEN") || null,
  user: null,
  login: (userData) => {
    set({ user: userData });
  },
  logout: () => {
    set({ user: null });
  },
}));
