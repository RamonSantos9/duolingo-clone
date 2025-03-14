import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  variant: "points" | "hearts";
};

export const ResultCard = ({ value, variant }: Props) => {
  const imageSrc =
    variant === "hearts" ? "icons/heart.svg" : "icons/points.svg";
  const headerText = variant === "hearts" ? "Corações restantes" : "Total XP";
  const bgColorClass =
    variant === "hearts"
      ? "bg-rose-500 border-rose-500"
      : "bg-orange-400 border-orange-400";
  const textColorClass =
    variant === "hearts" ? "text-rose-500" : "text-orange-400";

  return (
    <div className={cn("rounded-3xl border-8 w-60 h-56", bgColorClass)}>
      <div
        className={cn(
          "p-2 text-white rounded-t-xl font-bold text-center uppercase text-lg",
          bgColorClass
        )}
      >
        {headerText}
      </div>
      <div
        className={cn(
          "bg-white flex items-center justify-center p-8 font-bold text-3xl",
          textColorClass
        )}
      >
        <Image
          alt={`${variant} icon`}
          src={imageSrc}
          width={80}
          height={80}
          className="mr-3"
        />
        {value}
      </div>
    </div>
  );
};
