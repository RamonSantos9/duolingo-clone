import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Duolingo Da Cracolandia",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="pt-br">
        <body className={font.className}>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
