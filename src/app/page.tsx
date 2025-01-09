import { Button } from "../shared/ui/button";
import { prisma } from "../shared/lib/db";
import { Card, CardTitle } from "../shared/ui/card";
// import Image from "next/image";

export default async function Home() {
  const games = await prisma.game.findMany(); /* (пример взаимодействия с БД) */
  // console.log(games);

  return (
    <div>
      <Button size="lg" variant={"destructive"}>
        Hello
      </Button>{" "}
      {/* (пример подключения кнопки и стилей из shadcn) */}
      {games.map((game) => {
        return (
          <Card key={game.id}>
            <CardTitle>{game.name}</CardTitle>
          </Card>
        );
      })}
    </div>
  );
}
