"use client";
import { useState, useEffect } from "react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignUpButton,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Exibe o botão quando o scroll ultrapassa 200px
      setIsScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full h-20 transition-all duration-300 ${
        isScrolled
          ? "border-b-2 border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-lg mx-auto h-full px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-x-3">
          <Image src="/mascot.svg" width={179} height={42} alt="mascot" />
        </div>

        {/* Área de botões */}
        <div className="flex items-center gap-x-4">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-gray-400 animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              {/* Botões para usuários não logados */}
              {isScrolled && (
                <>
                  <SignInButton mode="modal">
                    <Button
                      size="sm"
                      variant="default"
                      className="hidden sm:flex"
                    >
                      Entrar
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm" variant="secondary">
                      Comece agora
                    </Button>
                  </SignUpButton>
                </>
              )}
            </SignedOut>
            <SignedIn>
              {/* Botões para usuários logados */}
              {isScrolled && (
                <>
                  <Button
                    size="sm"
                    variant="secondary"
                    asChild
                    className="hidden sm:flex"
                  >
                    <Link href="/learn">Continuar aprendendo</Link>
                  </Button>
                </>
              )}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                  },
                }}
              />
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};
