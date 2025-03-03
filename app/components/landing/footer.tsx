import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="hidden md:block w-full border-t-2 border-b-2 border-slate-200 py-2">
      {/* 
        Substitua max-w-screen-md por max-w-screen-lg
        Adicione px-4 para espaçamento lateral
      */}
      <div className="max-w-screen-lg mx-auto px-4 flex items-center justify-between h-full">
        {/* Botão de navegação à esquerda */}
        <Button variant="ghost" className="flex items-center">
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* Bandeiras no centro */}
        <div className="flex items-center space-x-8 gap-2">
          <Button
            size="pr"
            variant="ghost"
            className="flex items-center gap-x-1"
          >
            <Image
              src="/icons/eua.svg"
              alt="INGLÊS"
              height={32}
              width={35}
              className="rounded-md"
            />
            INGLÊS
          </Button>
          <Button
            size="pr"
            variant="ghost"
            className="flex items-center gap-x-1"
          >
            <Image
              src="/icons/es.svg"
              alt="ESPANHOL"
              height={32}
              width={35}
              className="rounded-md"
            />
            ESPANHOL
          </Button>
          <Button
            size="pr"
            variant="ghost"
            className="flex items-center gap-x-1"
          >
            <Image
              src="/icons/fr.svg"
              alt="FRANCÊS"
              height={32}
              width={35}
              className="rounded-md"
            />
            FRANCÊS
          </Button>
          <Button
            size="pr"
            variant="ghost"
            className="flex items-center gap-x-1"
          >
            <Image
              src="/icons/de.svg"
              alt="ALEMÃO"
              height={32}
              width={35}
              className="rounded-md"
            />
            ALEMÃO
          </Button>
          <Button
            size="pr"
            variant="ghost"
            className="flex items-center gap-x-1"
          >
            <Image
              src="/icons/it.svg"
              alt="ITALIANO"
              height={32}
              width={35}
              className="rounded-md"
            />
            ITALIANO
          </Button>
        </div>

        {/* Botão de navegação à direita */}
        <Button variant="ghost" className="flex items-center">
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </footer>
  );
};
