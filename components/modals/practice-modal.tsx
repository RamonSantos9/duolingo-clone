"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePracticeModal } from "@/store/use-practice-modal";

export const PracticeModal = () => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = usePracticeModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-full mb-5">
            <Image src="/heart.svg" alt="Heart" height={80} width={80} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            lições práticas
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Use lições práticas para recuperar corações e pontos. Você não pode
            perder pontos em aulas práticas.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              className="w-full"
              variant="primary"
              size="lg"
              onClick={close}
            >
              Eu entendo
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
