// серверная составляющая для методов игры

import { Game, User } from "@prisma/client";
import { prisma } from "../../../shared/lib/db";
import { GameEntity, GameIdleEntity, GameOverEntity } from "../domain";
import {z} from "zod";

async function gameList(): Promise<GameEntity[]> {
    const games = await prisma.game.findMany({
        include: { /* (уточняем, чтобы отображал связи) */
            winner: true,
            players: true
        }
    });


    return games.map(dbGameToGameEntity);
}

const fieldSchema = z.array(z.union([z.string(), z.null()])); /* (получаем field из json(парсим с помощью библиотеки zod)) */  

function dbGameToGameEntity(
    game: Game & {
        players: User[];
        winner?: User | null;
    },
): GameEntity {
    switch (game.status) {
        case "idle": {
            return {
                id: game.id,
                players: game.players,
                status: game.status
            } satisfies GameIdleEntity;
        }
        case "inProgress": 
        case "gameOverDraw": {
            return {
                id: game.id,
                players: game.players,
                status: game.status,
                field: fieldSchema.parse(game.field),
            };
        }
        case "gameOver": {
            if (!game.winner) {
                throw new Error("winner should be in game over");
            }
            return {
                id: game.id,
                players: game.players,
                status: game.status,
                field: fieldSchema.parse(game.field),
                winner: game.winner
            } satisfies GameOverEntity;
        }
    }
}

export const gameRepository = {
    gameList
}