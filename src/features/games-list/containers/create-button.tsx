"use client";
import { Button } from "@/shared/ui/button"
import { createGameAction } from "../actions/create-game";
import { useActionState } from "react";

export function CreateButton() {
    useActionState(createGameAction, {} as const)

    return <Button onClick={createGameAction}>Создать игру</Button>
}