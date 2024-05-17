import { create } from "zustand";

export type DialogStore = {

    isWinDialogOpen: boolean;
    isLostDialogOpen: boolean;

    setIsWinDialogOpen: (isOpen: boolean) => void;
    setIsLostDialogOpen: (isOpen: boolean) => void;
};

export const useDialogStore = create<DialogStore>()(set => ({
    isWinDialogOpen: false,
    isLostDialogOpen: false,

    setIsWinDialogOpen: isWinDialogOpen => set({ isWinDialogOpen }),
    setIsLostDialogOpen: isLostDialogOpen => set({ isLostDialogOpen }),
}))
