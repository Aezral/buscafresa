import { useDialogStore } from "./stores/dialogStore";
import { useGameStore } from "./stores/gameStore";

type Props = {
    restartBoard: () => void;
};

export default function GameOverDialog({ restartBoard }: Props) {
    const { gameOverBombType: bombType } = useGameStore();
    const { isLostDialogOpen, setIsLostDialogOpen } = useDialogStore();

    if (!isLostDialogOpen) {
        return null;
    }

    return (
        <div
            onClick={() => {
                setIsLostDialogOpen(false);
            }}
            className="fixed bg-black/50 z-20 h-screen w-screen flex items-center justify-center"
        >
            <div
                onClick={e => {
                    e.stopPropagation();
                }}
                className="bg-white p-6 text-center rounded-md shadow-lg "
            >
                <h1 className="text-xl font-bold text-red-700">
                    ¡Has perdido!
                </h1>
                <p className="mt-3">
                    <span className="font-bold">Causa:</span> {bombType?.name}
                </p>
                <p className="mt-3">
                    {bombType?.deathPhrase}, pero nunca olvidaremos su
                    sacrificio.
                </p>
                <button
                    onClick={() => {
                        restartBoard();
                    }}
                    className="bg-blue-500 text-white font-medium px-3 py-1 rounded-md mt-4 hover:bg-blue-600 transition-colors"
                >
                    Volver a jugar
                </button>
            </div>
        </div>
    );
}
