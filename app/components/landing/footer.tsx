import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-4">
      <div className="max-w-screen-lg mx-auto px-8 flex items-center justify-between h-full">
        {/* Botão de navegação à esquerda */}
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* Bandeiras no centro */}
        <div className="flex items-center space-x-6">
          <Button
            size="sm"
            variant="ghost"
            className="flex items-center gap-x-2 text-gray-600 hover:text-gray-900"
          >
            <Image
              src="/icons/eua.svg"
              alt="INGLÊS"
              height={24}
              width={26}
              className="rounded"
            />
            <span className="text-sm font-medium">INGLÊS</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="flex items-center gap-x-2 text-gray-600 hover:text-gray-900"
          >
            <Image
              src="/icons/es.svg"
              alt="ESPANHOL"
              height={24}
              width={26}
              className="rounded"
            />
            <span className="text-sm font-medium">ESPANHOL</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="flex items-center gap-x-2 text-gray-600 hover:text-gray-900"
          >
            <Image
              src="/icons/fr.svg"
              alt="FRANCÊS"
              height={24}
              width={26}
              className="rounded"
            />
            <span className="text-sm font-medium">FRANCÊS</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="flex items-center gap-x-2 text-gray-600 hover:text-gray-900"
          >
            <Image
              src="/icons/de.svg"
              alt="ALEMÃO"
              height={24}
              width={26}
              className="rounded"
            />
            <span className="text-sm font-medium">ALEMÃO</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="flex items-center gap-x-2 text-gray-600 hover:text-gray-900"
          >
            <Image
              src="/icons/it.svg"
              alt="ITALIANO"
              height={24}
              width={26}
              className="rounded"
            />
            <span className="text-sm font-medium">ITALIANO</span>
          </Button>
        </div>

        {/* Botão de navegação à direita */}
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-900"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </footer>
  );
};
