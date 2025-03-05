"use client";
import { useState, useEffect } from "react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const Header = () => {
  // Altere o threshold conforme a posição desejada
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Exibe o botão quando o scroll ultrapassa 300px (ajuste conforme necessário)
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-10 w-full h-20 border-slate-200 bg-white ${
        isScrolled ? "border-b-2" : ""
      }`}
    >
      <div className="max-w-screen-lg mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-x-3">
          <Image src="/mascot.svg" width={179} height={42} alt="mascot" />
        </div>

        {/* Área de botões */}
        <div className="flex items-center gap-x-4">
          {/* Botão "COMECE AGORA" aparece somente quando o scroll ultrapassa o threshold */}
          {isScrolled && (
            <SignUpButton mode="modal">
              <Button size="lg" variant="secondary" className="w-full">
                Comece agora
              </Button>
            </SignUpButton>
          )}
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};
