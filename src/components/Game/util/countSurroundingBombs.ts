import type { Board } from "./createBoard";

export default function countSurroundingBombs(x: number, y: number, board: Board) {
    let bombs = 0;

    // Up
    if (y > 0) {
        if (board[y - 1][x].bomb) {
            bombs++;
        }
    }

    // Up Right
    if (y > 0 && x < board[0].length - 1) {
        if (board[y - 1][x + 1].bomb) {
            bombs++;
        }
    }

    // Right
    if (x < board[0].length - 1) {
        if (board[y][x + 1].bomb) {
            bombs++;
        }
    }

    // Down Right
    if (y < board.length - 1 && x < board[0].length - 1) {
        if (board[y + 1][x + 1].bomb) {
            bombs++;
        }
    }

    // Down
    if (y < board.length - 1) {
        if (board[y + 1][x].bomb) {
            bombs++;
        }
    }

    // Down Left
    if (y < board.length - 1 && x > 0) {
        if (board[y + 1][x - 1].bomb) {
            bombs++;
        }
    }

    // Left
    if (x > 0) {
        if (board[y][x - 1].bomb) {
            bombs++;
        }
    }

    // Up Left
    if (y > 0 && x > 0) {
        if (board[y - 1][x - 1].bomb) {
            bombs++;
        }
    }

    return bombs;
}
