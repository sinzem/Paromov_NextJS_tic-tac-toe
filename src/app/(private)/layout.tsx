import { sessionService } from "@/entities/user/server";
import { Button } from "@/shared/ui/button";
import { redirect } from "next/navigation";
import React from "react";

export default async function PrivateLayout({
    children
}: {
    children: React.ReactNode
}) {

    const { session } = await sessionService.verifySession();

    return (
        <div className="flex flex-col grow">
            <header className="px-10 py-4 flex flex-row gap-4 justify-between border-b border-b-primary/50 items-center">
                <div className="text-xl">Tic-tac-toe online</div>
                <div className="flex gap-4 items-center">
                    <div className="text-lg">{session.login}</div>
                    {/* (чтобы не создавать отдельный компонент для кнопки выхода или не делать страницу клиентской, можем обернуть кнопку в форму и навесить на нее асинхронный экшн) */}
                    <form action={async () => {
                        "use server";
                        // console.log("logout") /* (в консоль на сервер) */
                        sessionService.deleteSession();
                        redirect("/sign-in");
                    }}>
                        <Button>Sign Out</Button>
                    </form>
                </div>
            </header>
            {children}
        </div>
    )
}