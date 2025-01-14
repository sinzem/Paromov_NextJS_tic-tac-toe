"use server";

/* (action, позволяющий клиенту обратиться к функции сервера для создания игры) */
// import { prisma } from "../../../shared/lib/db";
import { createGame } from "../../../entities/game/server";
import { left } from "../../../shared/lib/either";
import { redirect } from "next/navigation";
import { getCurrentUser, /* sessionService  */} from "@/entities/user/server";

export const createGameAction = async () => {
    // const { session } = await sessionService.verifySession();
    // const user = await prisma.user.findFirst();
    const user = await getCurrentUser();

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