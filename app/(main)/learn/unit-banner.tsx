import { Button } from "@/components/ui/button";
import { ArrowLeft, NotebookText } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
};

export const UnitBanner = ({ title, description }: Props) => {
  return (
    // Container principal com fundo verde, padding e layout flex para distribuir os elementos
    <div className="w-full rounded-xl border-b-4 border-b-green-600 bg-[#58CC02] p-4 text-white flex items-center justify-between">
      {/* Seção da esquerda: título e descrição */}
      <div>
        <h3 className="flex items-center gap-x-2 text-base font-black uppercase text-white/80">
          {/* Ícone de seta à esquerda, clicável para voltar para /courses */}
          <Link href="/courses">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          {/* Título também é link para /courses */}
          <Link href="/courses">{title}</Link>
        </h3>
        <p className="text-xl font-black">{description}</p>
      </div>

      {/* Seção da direita: exibe o NotebookText de forma responsiva */}
      <div>
        {/* Em telas menores (mobile): exibe somente o ícone NotebookText */}
        <Link href="/guia/ebook/eua" className="flex lg:hidden">
          <Button
            size="g"
            variant="tercerary"
            className="border-2 border-b-4 active:border-b-2"
          >
            <NotebookText className="h-6 w-6" />
          </Button>
        </Link>
        {/* Em telas maiores (desktop): exibe o botão completo com o ícone e o texto "Guia" */}
        <Link href="/" className="hidden lg:flex">
          <Button
            size="g"
            variant="secondary"
            className="border-2 border-b-4 active:border-b-2"
          >
            <NotebookText className="mr-2" />
            Guia
          </Button>
        </Link>
      </div>
    </div>
  );
};
