"use client";
/* (директорию с этим документом выделили в круглые скобки - (auth) - это создает группу, на которую делаем отдельный layout - выносим обертку карточек из sign-in и sign-out) */
import React from "react";

export default function Layout({children}: {children: React.ReactNode}) {

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            {children}
        </div>
    )
}