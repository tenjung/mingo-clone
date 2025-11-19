import { create } from "zustand";

const useAuthStore = create((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  logout: () => set({ session: null }),
}));

export default useAuthStore;
