import { create } from 'zustand';

export type ShiftStatus = 'open' | 'closed';

export interface Shift {
  id: string;
  status: ShiftStatus; 
}

export interface ShiftState {
  shift: Shift | null;
}

interface ShiftActions {
  updateShift: (id: string, state: ShiftStatus) => void;
  clearShift: () => void;
}

type ShiftStore = ShiftState & ShiftActions;

export const useShiftStore = create<ShiftStore>((set, get) => ({
    shift: null,
    updateShift: (id: string, state: ShiftStatus) => {
      const newShift: Shift = {
        id: id,
        status: state,
      };
      set({ shift: newShift });
    },
    clearShift: () => {
      set({ shift: null });
    },
}))