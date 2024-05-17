import countSurroundingBombs from "@/components/Game/util/countSurroundingBombs";
import Cell from "./Cell";
import type { Board, BombType } from "@/components/Game/util/createBoard";
import { useGameStore, type GameStore } from "./stores/gameStore";
import { useDialogStore } from "./stores/dialogStore";

export type BoardVisualizeOptions = {
    debugMode: boolean;
};

function checkSurrounding(x: number, y: number, board: Board) {
    return countSurroundingBombs(x, y, board) > 0;
}

function openCell(x: number, y: number, board: Board) {



    if (board[y][x].open) return;

    board[y][x].open = true;

    if (board[y][x].bomb) return;

    if (!checkSurrounding(x, y, board)) {
        // Up
        if (y > 0) {
            openCell(x, y - 1, board);
        }

        // Down
        if (y < board.length - 1) {
            openCell(x, y + 1, board);
        }

        // Left
        if (x > 0) {
            openCell(x - 1, y, board);
        }

        // Right
        if (x < board[0].length - 1) {
            openCell(x + 1, y, board);
        }
    }
}

export default function GameBoard() {

    const{
        board,
        setBoard,
        setHasWon,
        setGameOverBombType,
        setLastOpened,
        gameOver,
        setGameOver,
    } = useGameStore() as GameStore & {
        board: Board;
    }

    const {
        setIsLostDialogOpen,
        setIsWinDialogOpen
    } = useDialogStore();

    function winCallback() {
        setHasWon(true);
        setIsWinDialogOpen(true);
    }

    function gameOverCallback(type: BombType) {
        setGameOver(true);
        setGameOverBombType(type);
        setIsLostDialogOpen(true);
    }

    function handleClick(x: number, y: number) {
        if (gameOver) return;

        const cell = board[y][x]!;

        if (cell.open) return;

        const newBoard: Board = board.map(row =>
            row.map(cell => ({ ...cell }))
        );

        setLastOpened([x, y]);
        openCell(x, y, newBoard);

        if (cell.bomb) {
            gameOverCallback(cell.type!);
        } else {
            const hasWon = newBoard.every(row =>
                row.every(cell => cell.open || cell.bomb)
            );

            if (hasWon) {
                winCallback();
            }
        }

        setBoard(newBoard);
    }

    function handleFlag(x: number, y: number) {
        if (gameOver) return;

        const cell = board[y][x]!;

        if (cell.open) return;

        const newBoard: Board = board.map(row =>
            row.map(cell => ({ ...cell }))
        );

        newBoard[y][x].flagged = !newBoard[y][x].flagged;

        setBoard(newBoard);
    }

    return (
        <div className="w-full p-1 bg-green-800 max-w-2xl rounded">
            <div
                style={{
                    gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
                    gridTemplateRows: `repeat(${board.length}, 1fr)`,
                }}
                className="aspect-square rounded-md overflow-hidden grid w-full mx-auto"
            >
                {board.map((row, y) =>
                    row.map((_, x) => (
                        <Cell
                            x={x}
                            y={y}
                            onClick={() => {
                                handleClick(x, y);
                            }}
                            onFlag={() => {
                                handleFlag(x, y);
                            }}
                            key={x}
                        ></Cell>
                    ))
                )}
            </div>
        </div>
    );
}
