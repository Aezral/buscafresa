import { useDialogStore } from "./stores/dialogStore";

type Props = {
    restartBoard: ()=>void;
};

export default function WinDialog({ restartBoard }: Props) {

    const {isWinDialogOpen, setIsWinDialogOpen} = useDialogStore();

    if (!isWinDialogOpen) {
        return null;
    }

    return (
        <div
            onClick={() => {
                setIsWinDialogOpen(false)
            }}
            className="fixed bg-black/50 z-20 h-screen w-screen flex items-center justify-center"
        >
            <div
                onClick={e => {
                    e.stopPropagation();
                }}
                className="bg-white p-6 text-center rounded-md shadow-lg "
            >
                <h1 className="text-xl font-bold">¡Ganaste!</h1>
                <p className="mt-3">
                    ¡Felicidades, ayudaste a Fresa a despejar todo el humo!
                </p>
                
                <button onClick={()=>{
                    close();

                    restartBoard();

                    }} className="bg-blue-500 text-white font-medium px-3 py-1 rounded-md mt-4 hover:bg-blue-600 transition-colors">
                    Volver a jugar
                </button>
            </div>
        </div>
    );
}
