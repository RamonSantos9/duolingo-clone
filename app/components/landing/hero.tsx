import Image from "next/image";
import { Loader } from "lucide-react";
import Link from "next/link";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignUpButton,
  SignInButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-between w-full bg-white">
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center p-8 gap-12 lg:gap-20">
        {/* Imagem */}
        <div className="relative w-[400px] h-[400px] mb-8 lg:mb-0">
          <Image src="hero.svg" fill alt="Hero" className="object-contain" />
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col items-center lg:items-start gap-8 max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center lg:text-left leading-tight">
            O jeito <span className="text-green-600">grátis</span>,{" "}
            <span className="text-green-600">divertido</span> e{" "}
            <span className="text-green-600">eficaz</span> de aprender um idioma
          </h1>

          <p className="text-lg text-gray-600 text-center lg:text-left">
            Junte-se a milhões de pessoas que já estão aprendendo idiomas de
            forma divertida e eficaz.
          </p>

          <div className="flex flex-col items-center lg:items-start gap-4 w-full max-w-sm">
            <ClerkLoading>
              <Loader className="h-5 w-5 text-gray-400 animate-spin" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button size="lg" variant="secondary" className="w-full">
                    Comece agora
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button size="lg" variant="default" className="w-full">
                    Eu já tenho uma conta
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full"
                  asChild
                >
                  <Link href="/learn">Continuar aprendendo</Link>
                </Button>
              </SignedIn>
            </ClerkLoaded>
          </div>
        </div>
      </main>
    </div>
  );
}
