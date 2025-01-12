"use client";
import { Button } from "@/shared/ui/button"
import { createGameAction } from "../actions/create-game";
import { /* matchEither, */ mapLeft, right } from "../../../shared/lib/either";
import { useActionState } from "../../../shared/lib/react";
import { startTransition } from "react";

export function CreateButton() {
   
    const[state, dispatch, isPending] = useActionState(
        createGameAction,
        right(undefined)
    );

    return (
        // <div className="flex flex-col gap-1">
        //     <Button onClick={createGameAction} disabled={isPending}>
        //         Создать игру
        //     </Button>
        //     {matchEither(data, { /* (пример выведения ошибки с помощью метода matchEither вместо конструкций if...else) */
        //         right: () => null,
        //         left: (e) => ({
        //             ["can-create-only-one-game"]: "Выможете создать только одну игру",
        //             ["user-not-found"]: "Пользователя нету",
        //         })[e],
        //     })}
        // </div>
        <Button
            disabled={isPending}
            onClick={() => startTransition(dispatch)}
            error={mapLeft(
                state,
                (e) => ({
                    ["can-create-only-one-game"]: "Выможете создать только одну игру",
                    ["user-not-found"]: "Пользователя нету",
                })[e],
            )}>
                создать игру
            </Button>
    )
}