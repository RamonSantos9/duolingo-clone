import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";

type Props = {
  activeCourse?: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  gems: number;
  hasActiveSubscription: boolean;
};

export const UserProgress = ({
  activeCourse,
  points,
  gems,
  hearts,
  hasActiveSubscription,
}: Props) => {
  return (
    // Container para alinhar os itens. Em todas as telas, os itens ocupam toda a largura.
    <div className="flex items-center justify-between w-full">
      {/* Bandeira: link para a página de cursos */}
      <Link href="/courses">
        <Button variant="ghost">
          {activeCourse && (
            // Na mobile, a imagem terá 40x40 e em desktop ficará 40x40
            <Image
              src={activeCourse.imageSrc}
              alt={activeCourse.title}
              width={40}
              height={40}
              className="lg:w-[30px] lg:h-[30px]"
            />
          )}
        </Button>
      </Link>

      {/* Pontos */}
      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500">
          <Image
            src="icons/points.svg"
            alt="Points"
            width={40}
            height={40}
            className="lg:w-[30px] lg:h-[30px]"
          />
          {points}
        </Button>
      </Link>

      {/* Gemas */}
      <Link href="/shop">
        <Button variant="ghost" className="text-sky-500">
          <Image
            src="icons/gems.svg"
            alt="gems"
            width={30}
            height={30}
            className="lg:w-[30px] lg:h-[30px]"
          />
          {gems}
        </Button>
      </Link>

      {/* Hearts ou ícone de infinito se houver assinatura ativa */}
      <Link href="/shop">
        <Button variant="ghost" className="text-rose-500">
          <Image
            src="icons/heart.svg"
            alt="Hearts"
            width={40}
            height={40}
            className="lg:w-[30px] lg:h-[30px]"
          />
          {hasActiveSubscription ? (
            // Ajuste o tamanho do ícone infinito também para desktop, se necessário
            <InfinityIcon className="h-4 w-4 lg:h-3 lg:w-3 stroke-[3]" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};
