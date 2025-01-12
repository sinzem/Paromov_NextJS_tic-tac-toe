"use server";

/* (action, позволяющий клиенту обратиться к функции сервера для создания игры) */
import { prisma } from "../../../shared/lib/db";
import { createGame } from "../../../entities/game/server";
import { left } from "../../../shared/lib/either";
import { redirect } from "next/navigation";

export const createGameAction = async () => {
    const user = await prisma.user.findFirst();

    if (!user) {
        // return {
        //     type: "error",
        //     value: "user-not-found"
        // } as const 
        return left("user-not-found" as const);
    }

    const gameResult = await createGame(user);

    if (gameResult.type === "right") {
        redirect(`/game/${gameResult.value.id}`);
    }

    return gameResult;
}