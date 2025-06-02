import { create } from "zustand";

const useAuthStore = create((set) => ({
  email: "",

  setEmail: (value) => set({ email: value }),
}));

export default useAuthStore;
