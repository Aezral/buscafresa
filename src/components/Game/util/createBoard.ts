export type BoardConfig = {
    cellsWidth: number;
    cellsHeight: number;
    bombRatio: number;
};

const bombTypes = [
    {
        name: "Cigarro",
        iconURL: "/icon/cigarro.svg",
        deathPhrase: "Fresa falleció de cancer de pulmón",
    },
    {
        name: "Alcohol",
        iconURL: "/icon/alcohol.svg",
        deathPhrase: "Fresa falleció de una enfermedad del hígado",
    },
    {
        name: "Fentanilo",
        iconURL: "/icon/fentanilo.svg",
        deathPhrase: "Fresa falleció de una sobredosis",
    },
    {
        name: "Cocaína",
        iconURL: "/icon/cocaina.svg",
        deathPhrase: "Fresa falleció de una sobredosis",
    },
    {
        name: "Heroína",
        iconURL: "/icon/heroina.svg",
        deathPhrase: "Fresa falleció de una sobredosis",
    },{
        name: "Marihuana",
        iconURL: "/icon/marihuana.svg",
        deathPhrase: "Fresa falleció de un ataque al corazón",
    }
] as const;

export type BombType = (typeof bombTypes)[number];

export type BoardCell = {
    type?: BombType;
    open: boolean;
    bomb: boolean;
    flagged: boolean;
    fresa: boolean;
};

export type Board = BoardCell[][];

export default function createBoard({
    cellsWidth,
    cellsHeight,
    bombRatio,
}: BoardConfig) {
    const board: Board = Array.from({ length: cellsHeight }, () =>
        Array.from({ length: cellsWidth }, () => ({
            open: false,
            bomb: false,
            flagged: false,
            fresa: false
        }))
    );

    for (let i = 0; i < cellsWidth * cellsHeight * bombRatio; i++) {
        let x = Math.floor(Math.random() * cellsWidth);
        let y = Math.floor(Math.random() * cellsHeight);

        while (board[y][x].bomb) {
            x = Math.floor(Math.random() * cellsWidth);
            y = Math.floor(Math.random() * cellsHeight);
        }

        board[y][x].bomb = true;
        board[y][x].type =
            bombTypes[Math.floor(Math.random() * bombTypes.length)];
    }

    return board;
}
