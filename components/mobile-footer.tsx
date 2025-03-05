"use client";

import Link from "next/link";
import Image from "next/image";

// Componente MobileFooter: exibido somente em telas mobile para navegação inferior fixa.
export const MobileFooter = () => {
  return (
    // Container fixo na parte inferior com fundo branco, borda superior e espaçamento entre os itens.
    // A classe "lg:hidden" garante que esse footer seja oculto em telas grandes.
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-30 flex justify-around items-center py-2 lg:hidden">
      {/* Link para a página Learn */}
      <Link href="/learn" className="flex flex-col items-center">
        <Image src="/icons/aprender.svg" alt="Learn" width={40} height={40} />
      </Link>

      {/* Link para a página Ligas */}
      <Link href="/leaderboard" className="flex flex-col items-center">
        <Image src="/icons/ligas.svg" alt="Ligas" width={40} height={40} />
      </Link>

      {/* Link para a página Sons */}
      <Link href="/characters" className="flex flex-col items-center">
        <Image src="/icons/sons.svg" alt="Sons" width={40} height={40} />
      </Link>

      {/* Link para a página Shop */}
      <Link href="/shop" className="flex flex-col items-center">
        <Image src="/icons/loja.svg" alt="Shop" width={40} height={40} />
      </Link>
    </div>
  );
};
