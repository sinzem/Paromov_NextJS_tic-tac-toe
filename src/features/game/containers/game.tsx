"use client";

import { GameId } from "@/kernel/ids";
import { GameLayout } from "../ui/layout";
import { GamePlayers } from "../ui/players";
import { GameStatus } from "../ui/status";
import { GameField } from "../ui/field";
import { GameDomain } from "@/entities/game";
import { useEventSource } from "@/shared/lib/sse/client";

export function Game({gameId}: {gameId: GameId}) {

   const {dataStream, error} = useEventSource(`/game/${gameId}/stream`, 1); /* (подключение стрима на клиенте) */

    const game: GameDomain.GameEntity = {
        // id: "1",
        // creator: {
        //     id: "1",
        //     login: "Test",
        //     rating: 1000
        // },
        // status: "idle",
        // field: Array(9).fill(null)
        id: "1",
        players: [
            {
                id: "1",
                login: "Test",
                rating: 1000
            },
            {
                id: "2",
                login: "Test2",
                rating: 1200
            }
        ],
        status: "gameOver",
        field: [null, null, null, "O", "X", null, null, null, null]
    }
    
    return (
        <GameLayout 
            players={<GamePlayers game={game} />} 
            status={<GameStatus game={game} />}
            field={<GameField game={game} />}
        />
    )
    // return (
    //     <div>
    //         {dataStream}
    //         {error ? `Ошибка ${JSON.stringify(error)}` : undefined}
    //     </div>
    // )
}