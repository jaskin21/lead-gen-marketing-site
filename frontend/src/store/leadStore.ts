import { create } from "zustand";

interface LeadState {
  hasSubmitted: boolean;
  setSubmitted: () => void;
}

export const useLeadStore = create<LeadState>((set) => ({
  hasSubmitted: false,
  setSubmitted: () => set({ hasSubmitted: true }),
}));
