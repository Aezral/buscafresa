import type { Board, BombType } from "@/components/Game/util/createBoard";
import { create } from "zustand";

export type GameStore = {
    board: Board | null;
    gameOver: boolean;
    hasWon: boolean;
    isWonDialogOpen: boolean;
    isLostDialogOpen: boolean;
    gameOverBombType: BombType | null;
    lastOpened: [number, number]|null;
    multiplier: number;

    setBoard: (board: Board) => void;
    setGameOver: (gameOver: boolean) => void;
    setHasWon: (won: boolean) => void;
    setIsWonDialogOpen: (isOpen: boolean) => void;
    setIsLostDialogOpen: (isOpen: boolean) => void;
    setGameOverBombType: (type: BombType|null) => void;
    setLastOpened: (lastOpened: [number, number]|null) => void;
    setMultiplier: (multiplier: number) => void;
};

export const useGameStore = create<GameStore>()(set => ({
    board: null,
    gameOver: false,
    hasWon: false,
    isWonDialogOpen: false,
    isLostDialogOpen: false,
    gameOverBombType: null,
    lastOpened: null,
    multiplier: 2,

    setBoard: board => set({ board }),
    setGameOver: gameOver => set({ gameOver }),
    setHasWon: hasWon => set({ hasWon }),
    setIsWonDialogOpen: isWonDialogOpen => set({ isWonDialogOpen }),
    setIsLostDialogOpen: isLostDialogOpen => set({ isLostDialogOpen }),
    setGameOverBombType: gameOverBombType => set({ gameOverBombType }),
    setLastOpened: lastOpened => set({ lastOpened }),
    setMultiplier: multiplier => set({ multiplier }),
}));
