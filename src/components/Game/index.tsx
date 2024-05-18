import { useEffect } from "react";
import createBoard, { type BoardConfig } from "@/components/Game/util/createBoard";
import GameBoard, { type BoardVisualizeOptions } from "./Board";
import WinDialog from "./WinDialog";
import GameOverDialog from "./GameOverDialog";
import { useGameStore } from "./stores/gameStore";
import { useDialogStore } from "./stores/dialogStore";

const baseDimensions = [5, 5] as const;

const config: BoardConfig = {
    cellsWidth: baseDimensions[0],
    cellsHeight: baseDimensions[1],
    bombRatio: 0.1,
};

export const boardVisualizeOptions: BoardVisualizeOptions = {
    debugMode: false,
};

export default function Game() {
    useEffect(() => {
        setBoard(
            createBoard({
                ...config,
                cellsWidth: config.cellsWidth * multiplier,
                cellsHeight: config.cellsHeight * multiplier,
            })
        );
    }, []);

    function resetBoard() {
        setBoard(
            createBoard({
                ...config,
                cellsWidth: config.cellsWidth * multiplier,
                cellsHeight: config.cellsHeight * multiplier,
            })
        );
        setGameOver(false);
        setIsWinDialogOpen(false);
        setIsLostDialogOpen(false);
        setGameOverBombType(null);
        setLastOpened(null);
    }

    const {
        board,
        multiplier,
        setBoard,
        setGameOver,
        setGameOverBombType,
        setMultiplier,
        setLastOpened
    } = useGameStore();

    const {
        setIsWinDialogOpen,
        setIsLostDialogOpen,
    } = useDialogStore();

    return (
        <>
            <WinDialog
                restartBoard={resetBoard}
            ></WinDialog>
            <GameOverDialog
                restartBoard={resetBoard}
            ></GameOverDialog>

            <div className="w-full min-h-[100dvh] p-10 gap-3 border flex items-center justify-center bg-gradient-to-tr to-yellow-200 from-red-400">
                <div className="w-full flex items-center justify-center flex-col md:flex-row md:items-start gap-3">
                    {board != null ?
                        <GameBoard />
                    :   <div className="w-full p-1 bg-red-800 max-w-2xl rounded">
                            <div
                                style={{
                                    gridTemplateColumns: `repeat(${
                                        config.cellsWidth * multiplier
                                    }, 1fr)`,
                                    gridTemplateRows: `repeat(${
                                        config.cellsHeight * multiplier
                                    }, 1fr)`,
                                }}
                                className="aspect-square rounded-md overflow-hidden grid w-full mx-auto"
                            >
                                {Array.from({
                                    length: config.cellsHeight * multiplier,
                                })
                                    .map(() =>
                                        Array.from({
                                            length:
                                                config.cellsWidth * multiplier,
                                        }).map(() => 0)
                                    )
                                    .map(row =>
                                        row.map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-full overflow-hidden max-h-full max-w-full flex items-center justify-center bg-gray-400 h-full relative border-gray-500 border box-border"
                                            ></div>
                                        ))
                                    )}
                            </div>
                        </div>
                    }

                    <div className="bg-white order-first md:order-last rounded-md px-3 h-full py-6 shadow border w-full max-w-md flex-wrap">
                        <h1 className="font-bold text-center text-2xl">
                            Buscafresa
                        </h1>

                        <p className="text-center">
                            ¡Ayuda a{" "}
                            <span className="text-red-600 font-bold">
                                Fresa
                            </span>{" "}
                            a despejar el humo de cigarro!
                        </p>

                        <img
                            className="w-1/3 mx-auto my-3"
                            src="/fresa.webp"
                            alt=""
                        />
                        <p className="text-center mt-3">
                            Debes presionar de las casillas para despejar el
                            humo, pero ten cuidado, porque algunas casillas
                            tienen{" "}
                            <span className="text-red-700 font-bold">
                                drogas muy peligrosas
                            </span>{" "}
                            que eliminarán a <span>Fresa</span>{" "}
                            <span className="text-red-700 font-bold">
                                instantáneamente.
                            </span>
                        </p>

                        <p className="text-center mt-2">
                            ¡Despeja el humo de todas las casillas, (excepto las
                            que tienen drogas), para ganar!
                        </p>
                        <p className="text-center mt-2">
                            Puedes utilizar los números para saber la cantidad
                            de drogas que hay alrededor de una casilla.
                        </p>
                        <p className="text-center mt-2">
                            Puedes mantener presionado o dar click derecho a una
                            casilla para poner una bandera, para ayudarte a
                            recordar donde crees que haya drogas.
                        </p>
                        <p className="font-black text-red-600 text-xl text-center mt-3">
                            ¡Si te drogas, te dañas!
                        </p>
                        <form
                            className="flex justify-center mt-10 gap-1 items-end"
                            onSubmit={e => {
                                e.preventDefault();

                                resetBoard();
                            }}
                        >
                            <div className="flex flex-col gap-1 items-start">
                                <label htmlFor="dificultad">Dificultad</label>
                                <select
                                    id="dificultad"
                                    defaultValue={multiplier}
                                    className="px-2 py-1 border rounded"
                                    onChange={e => {
                                        const value = parseInt(e.target.value);

                                        setMultiplier(value);
                                    }}
                                >
                                    <option value="1">Fácil</option>
                                    <option value="2">Normal</option>
                                    <option value="4">Difícil</option>
                                </select>
                            </div>
                            <button
                                className="mt-5 border px-2 py-1 bg-blue-500 active:bg-blue-600 transition-colors text-white font-medium rounded-md"
                                type="submit"
                            >
                                Reiniciar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <footer>
                Aezral
            </footer>
        </>
    );
}
