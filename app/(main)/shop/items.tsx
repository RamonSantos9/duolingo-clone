"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { refilHearts } from "@/actions/user-progress";
import { toast } from "sonner";
import { createStripeUrl } from "@/actions/user-subscription";
import { POINTS_TO_REFIL } from "@/constants";

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefilHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFIL) {
      return;
    }

    startTransition(() => {
      refilHearts().catch(() => toast.error("Algo deu errado"));
    });
  };

  const onUpgrade = () => {
    startTransition(() => {
      createStripeUrl()
        .then((response) => {
          if (response.data) {
            window.location.href = response.data;
          }
        })
        .catch(() => toast.error("Algo deu errado"));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/icons/heart.svg" alt="Heart" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refil de Corações
          </p>
        </div>
        <Button
          onClick={onRefilHearts}
          disabled={pending || hearts === 5 || points < POINTS_TO_REFIL}
        >
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image
                src="/icons/points.svg"
                alt="Points"
                height={20}
                width={20}
              />
              <p>{POINTS_TO_REFIL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
        <Image src="/unlimited.svg" alt="Unlimited" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Corações Ilimitado
          </p>
        </div>
        <Button onClick={onUpgrade} disabled={pending}>
          {hasActiveSubscription ? "configurações" : "atualizar"}
        </Button>
      </div>
    </ul>
  );
};
