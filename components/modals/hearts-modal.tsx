"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { useHeartsModal } from "@/store/use-hearts-modal";

export const HeartsModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useHeartsModal();

  useEffect(() => setIsClient(true), []);

  const onClick = () => {
    close();
    router.push("/store");
  };

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-full mb-5">
            <Image src="/mascot-sad.svg" alt="Mascot" height={80} width={80} />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Você ficou sem corações
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Obtenha corações Pro para corações ilimitados ou compre-os na loja
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              className="w-full"
              variant="primary"
              size="lg"
              onClick={onClick}
            >
              Obtenha corações ilimitados
            </Button>
            <Button
              className="w-full"
              variant="dangerOutline"
              size="lg"
              onClick={close}
            >
              Não Obrigado
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
