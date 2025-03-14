import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  onCheck: () => void;
  status: "correct" | "wrong" | "completed" | "none";
  disabled?: boolean;
  lessonId?: number;
};

export const Footer = ({
  onCheck,
  status,
  disabled = false,
  lessonId,
}: Props) => {
  // Associa a tecla "Enter" para disparar a função onCheck
  useKey("Enter", onCheck, {}, [onCheck]);

  // Detecta se o dispositivo é mobile
  const isMobile = useMedia("(max-width: 1024px)");
  const buttonSize = isMobile ? "lg" : "lg";

  // Define classes do footer com base no status
  const footerClasses = cn(
    "fixed bottom-0 left-0 right-0 border-t-2 bg-white",
    "lg:h-[140px] h-[100px]",
    {
      "border-transparent bg-green-100": status === "correct",
      "border-transparent bg-rose-100": status === "wrong",
    }
  );

  // Renderiza mensagem de feedback conforme o status
  const renderFeedback = () => {
    if (status === "correct") {
      return (
        <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
          <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
          Muito bem!
        </div>
      );
    }
    if (status === "wrong") {
      return (
        <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
          <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
          Tente novamente!
        </div>
      );
    }
    return null;
  };

  // Renderiza botão extra para "Pratique novamente" quando a lição estiver concluída
  const renderPracticeButton = () => {
    if (status === "completed" && lessonId) {
      return (
        <Button
          variant="default"
          size={buttonSize}
          onClick={() => {
            window.location.href = `/lesson/${lessonId}`;
          }}
        >
          Pratique novamente
        </Button>
      );
    }
    return null;
  };

  // Define o rótulo do botão principal com base no status
  const getButtonLabel = () => {
    switch (status) {
      case "none":
        return "Verificar";
      case "correct":
        return "Próximo";
      case "wrong":
        return "Tentar novamente";
      case "completed":
        return "Continuar";
      default:
        return "";
    }
  };

  // Define a variante do botão principal
  const buttonVariant = status === "wrong" ? "danger" : "secondary";

  return (
    <footer className={footerClasses}>
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {renderFeedback()}
        {renderPracticeButton()}
        <Button
          disabled={disabled}
          className="ml-auto"
          onClick={onCheck}
          size={buttonSize}
          variant={buttonVariant}
        >
          {getButtonLabel()}
        </Button>
      </div>
    </footer>
  );
};
