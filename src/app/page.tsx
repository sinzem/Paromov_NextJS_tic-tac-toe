// import { Button } from "../shared/ui/button";
// import { prisma } from "../shared/lib/db";
// import { Card, CardTitle } from "../shared/ui/card";
// import Image from "next/image";

import { GamesList } from "../features/games-list/server";

export default async function Home() {
  // const games = await prisma.game.findMany(); /* (пример взаимодействия с БД) */
  // console.log(games);

  return (
    <div className="flex flex-col gap-8 container mx-auto pt-[100px]">
      {/* ------------------------ */}
        {/* (пример подключения компонентов из shadcn) */}
      {/* <Button size="lg" variant={"destructive"}>
        Hello
      </Button>{" "}
      {games.map((game) => {
        return (
          <Card key={game.id}>
            <CardTitle>{game.name}</CardTitle>
          </Card>
        );
      })} */}
      {/* ------------------------ */}
      <h1 className="text-4xl font-bold">Игры</h1>  
      <GamesList />
    </div>
  );
}
