import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  variant: "points" | "hearts";
};

export const ResultCard = ({ value, variant }: Props) => {
  const imageSrc =
    variant === "hearts" ? "/icons/heart.svg" : "/icons/points.svg";
  const headerText = variant === "hearts" ? "Corações restantes" : "Total XP";
  const bgColorClass =
    variant === "hearts"
      ? "bg-gradient-to-br from-rose-500 to-rose-600"
      : "bg-gradient-to-br from-orange-400 to-orange-500";
  const textColorClass =
    variant === "hearts" ? "text-rose-600" : "text-orange-500";
  const borderColorClass =
    variant === "hearts" ? "border-rose-200" : "border-orange-200";

  return (
    <div
      className={cn(
        "relative w-full max-w-sm lg:max-w-md bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105",
        borderColorClass
      )}
    >
      {/* Header com gradiente */}
      <div
        className={cn(
          "px-6 py-4 text-white font-bold text-center text-lg lg:text-xl",
          bgColorClass
        )}
      >
        {headerText}
      </div>

      {/* Conteúdo principal */}
      <div className="px-6 py-8 lg:py-10">
        <div
          className={cn(
            "flex items-center justify-center gap-4 font-bold text-2xl lg:text-3xl",
            textColorClass
          )}
        >
          <div className="relative">
            <Image
              alt={`${variant} icon`}
              src={imageSrc}
              width={60}
              height={60}
              className="lg:w-16 lg:h-16"
            />
          </div>
          <span className="text-3xl lg:text-4xl">{value}</span>
        </div>
      </div>

      {/* Efeito de brilho sutil */}
      <div
        className={cn(
          "absolute top-0 left-0 w-full h-1 opacity-30",
          variant === "hearts" ? "bg-rose-300" : "bg-orange-300"
        )}
      ></div>
    </div>
  );
};
