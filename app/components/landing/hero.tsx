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
import { Footer } from "./footer";

export default function Home() {
  return (
    // Container geral sem padding
    <div className="flex flex-col min-h-screen justify-between w-full">
      {/* Main com padding apenas dentro */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
        <div className="relative w-[424px] h-[424px] mb-8 lg:mb-0">
          <Image src="hero.svg" fill alt="Hero" />
        </div>

        <div className="flex flex-col items-center gap-y-8">
          <h1 className="text-3xl font-extrabold text-neutral-600 max-w-lg text-center">
            O jeito grátis, divertido e eficaz de aprender um idioma!
          </h1>
          <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
            <ClerkLoading>
              <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button size="lg" variant="secondary" className="w-full">
                    Comece agora
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button size="lg" className="w-full">
                    Eu já tenho uma conta
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Button size="lg" variant="default" className="w-full" asChild>
                  <Link href="/learn">Continuar aprendendo</Link>
                </Button>
              </SignedIn>
            </ClerkLoaded>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
