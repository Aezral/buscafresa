import { useMemo } from "react";
import countSurroundingBombs from "@/components/Game/util/countSurroundingBombs";
import { useGameStore, type GameStore } from "../stores/gameStore";
import type { Board } from "@/components/Game/util/createBoard";
import { boardVisualizeOptions } from "..";

type Props = {
    onClick: () => void;
    onFlag: () => void;
    x: number;
    y: number;
};

const numberColors = [
    "text-blue-600",
    "text-green-600",
    "text-red-600",
    "text-purple-600",
    "text-orange-600",
    "text-pink-600",
    "text-yellow-600",
    "text-indigo-600",
    "text-cyan-600",
    "text-gray-600",
];

export default function Cell({ onClick, onFlag, x, y }: Props) {
    const { board, lastOpened, gameOver, gameOverBombType } = useGameStore() as GameStore & {
        board: Board;
    };

    const cell = board[y][x]!;

    const surroundingBombs = useMemo(() => {
        return countSurroundingBombs(x, y, board);
    }, [board, x, y]);

    const shouldShowBomb = (cell.open || gameOver) && cell.bomb;
    const shouldShowNumber = surroundingBombs > 0 && cell.open && !cell.bomb;
    const shouldShowFresa =
        lastOpened != null &&
        lastOpened[0] === x &&
        lastOpened[1] === y &&
        !gameOver;
    const shouldShowFlag = !cell.open && cell.flagged && !shouldShowBomb;
    return (
        <button
            onContextMenu={e => {
                e.preventDefault();

                onFlag();
            }}
            onClick={onClick}
            style={{
                containerType: "inline-size",
            }}
            className={
                "w-full overflow-hidden max-h-full max-w-full flex items-center justify-center h-full relative border-gray-500 border box-border " +
                // Si la celda es la bomba que causó el game over, es roja
                (cell.open && cell.bomb ? "bg-red-400"
                : cell.open ? "bg-zinc-100 border-zinc-300"
                : "bg-gray-400 ")
            }
        >
            {shouldShowFlag && <span className="text-[70cqw]">🚩</span>}

            {shouldShowBomb && (
                    <img className="w-[80%]" src={cell.type!.iconURL} alt={cell.type!.name}/>
            )}

            {shouldShowNumber && (
                <span
                    className={
                        numberColors[surroundingBombs - 1] +
                        " opacity-50 " +
                        (shouldShowFresa ? "text-[40cqw] absolute top-1 left-1 font-bold" : "text-[70cqw]")
                    }
                >
                    {surroundingBombs}
                </span>
            )}
            {boardVisualizeOptions.debugMode && cell.bomb ?
                <span className="text-sm opacity-50 absolute bottom-1 left-1">
                    💣
                </span>
            :   undefined}
            {shouldShowFresa && (
                <img className="max-w-[60%]" src="/fresa.webp" alt="" />
            )}
            
        </button>
    );
}
