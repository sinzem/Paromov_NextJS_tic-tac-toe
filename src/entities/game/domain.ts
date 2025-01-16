// серверная часть, работа с сущностями(игроки и состояние доски), модель игры

import { GameId, UserId } from "../../kernel/ids";

export type PlayerEntity = {
    id: UserId;
    login: string;
    rating: number;
}

export type GameIdleEntity = {
    id: GameId;
    creator: PlayerEntity;
    field: Field;
    status: "idle";
}

export type GameInProgressEntity = {
    id: GameId;
    players: PlayerEntity[];
    field: Field;
    status: "inProgress";
}

export type GameOverEntity = {
    id: GameId;
    players: PlayerEntity[];
    field: Field;
    status: "gameOver";
    winner: PlayerEntity; 
}

export type GameOverDrawEntity = {
    id: GameId;
    players: PlayerEntity[];
    field: Field;
    status: "gameOverDraw"; 
}

export type GameEntity =
    GameIdleEntity 
    | GameInProgressEntity 
    | GameOverEntity 
    | GameOverDrawEntity;


export type Field = (GameSymbol | null)[];

export type GameSymbol = string;

export const GameSymbol = {
    x: "X",
    o: "O"
};

export const getGameCurrentStep = (game: GameInProgressEntity | GameOverEntity | GameOverDrawEntity) => {
    const symbols = game.field.filter((s) => s !== null).length;

    return symbols % 2 === 0 ? GameSymbol.x : GameSymbol.o;
};

export const getNextSymbol = (gameSymbol: GameSymbol) => {
    if (gameSymbol === GameSymbol.x) {
        return GameSymbol.o;
    }
    return GameSymbol.x;
}
