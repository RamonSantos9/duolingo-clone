"use client";

import { toast } from "sonner";
import Image from "next/image";
import Confetti from "react-confetti";
import { useAudio, useWindowSize, useMount } from "react-use";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { reduceHearts } from "@/actions/user-progress";
import {
  challengeOptions,
  challenges as challengesSchema,
  userSubscription,
} from "@/db/schema";
import { upsertChallengeProgress } from "@/actions/challenge-progress";

import { Header } from "./header";
import { Footer } from "./footer";
import { Challenge } from "./challenge";
import { ResultCard } from "./result-card";
import { QuestionBubble } from "./question-bubble";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";
import { NextLessons } from "./next-lessons";

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challengesSchema.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubscription:
    | (typeof userSubscription.$inferSelect & {
        isActive: boolean;
      })
    | null;
};

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  userSubscription,
}: Props) => {
  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

  const { width, height } = useWindowSize();
  const router = useRouter();

  const [finishAudio] = useAudio({ src: "/victory.mp3", autoPlay: false });
  const [correctAudio, , correctControls] = useAudio({
    src: "/correct.mp3",
    autoPlay: false,
  });
  const [incorrectAudio, , incorrectControls] = useAudio({
    src: "/incorrect.mp3",
    autoPlay: false,
  });
  const [pending, startTransition] = useTransition();

  const [lessonId] = useState(initialLessonId);
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() =>
    initialPercentage === 100 ? 0 : initialPercentage
  );
  const [lessonChallenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = lessonChallenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    undefined
  );
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const challenge = lessonChallenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };

  const onContinue = () => {
    if (selectedOption === undefined) return;
    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }
    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.correct);
    if (!correctOption) return;

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }
            // Toca o áudio de resposta correta
            correctControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / lessonChallenges.length);
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch((error) => {
            console.error("Erro em upsertChallengeProgress:", error);
            toast.error("Algo deu errado");
          });
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }
            // Toca o áudio de resposta incorreta
            incorrectControls.play();
            setStatus("wrong");
            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch((error) => {
            console.error("Erro em reduceHearts:", error);
            toast.error("Algo deu errado. Por favor, tente novamente");
          });
      });
    }
  };

  // Função para redirecionar para a próxima lição ou voltar para /learn
  const onLessonComplete = () => {
    // Redireciona para a página de aprendizado para mostrar o progresso
    router.push("/learn");
  };

  // Se não houver mais desafios, exibe a tela de conclusão
  if (!challenge) {
    return (
      <>
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
          width={width}
          height={height}
        />
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 flex flex-col items-center px-6 py-8">
            {/* Seção de parabéns */}
            <div className="text-center mb-8">
              <Image
                src="/mascot.svg"
                alt="Parabéns!"
                className="hidden lg:block mx-auto mb-6"
                height={120}
                width={120}
              />
              <Image
                src="/mascot.svg"
                alt="Parabéns!"
                className="block lg:hidden mx-auto mb-4"
                height={80}
                width={80}
              />
              <h1 className="text-2xl lg:text-4xl font-bold text-neutral-700 mb-2">
                Parabéns!
              </h1>
              <p className="text-lg lg:text-xl text-neutral-600">
                Você completou a lição com sucesso!
              </p>
            </div>

            {/* Cards de resultado */}
            <div className="w-full max-w-4xl flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-8 mb-12">
              <ResultCard
                variant="points"
                value={lessonChallenges.length * 10}
              />
              <ResultCard variant="hearts" value={hearts} />
            </div>

            {/* Seção das próximas lições */}
            <div className="w-full max-w-6xl">
              <NextLessons currentLessonId={lessonId} />
            </div>
          </div>

          <Footer
            lessonId={lessonId}
            status="completed"
            onCheck={onLessonComplete}
          />
        </div>

        <div style={{ display: "none" }}>
          {finishAudio}
          {correctAudio}
          {incorrectAudio}
        </div>
      </>
    );
  }

  const title =
    challenge.type === "ASSIST"
      ? "Selecione o significado correto"
      : challenge.question;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <main className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12 mt-10">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer
        disabled={pending || selectedOption === undefined}
        status={status}
        onCheck={onContinue}
      />

      {/* Elementos de áudio renderizados de forma oculta */}
      <div style={{ display: "none" }}>
        {finishAudio}
        {correctAudio}
        {incorrectAudio}
      </div>
    </div>
  );
};
