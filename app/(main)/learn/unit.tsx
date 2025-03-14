import { lessons, units } from "@/db/schema";

import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  // Cada lesson possui os campos inferidos do schema e a propriedade "completed" (boolean)
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  // activeLesson pode ser undefined ou conter os dados da lição ativa, incluindo a unidade à qual pertence
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | undefined;
  // Percentual de progresso na lição ativa (para exibição de barra de progresso, por exemplo)
  activeLessonPercentage: number;
};

export const Unit = ({
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
  return (
    <>
      {/* Exibe o banner da unidade com o título e a descrição */}
      <div className="lg:mt-10 lg:mr-10">
        <UnitBanner title={title} description={description} />
      </div>
      {/* Container para os botões das lições, organizado em coluna com layout flex */}
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          // Verifica se a lição atual é a lição ativa, comparando os IDs
          const isCurrent = lesson.id === activeLesson?.id;
          // Define se a lição está bloqueada: se ela não foi completada e não é a lição ativa
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              // O totalCount representa o índice da última lição (usado para cálculos de layout, se necessário)
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              // Percentual de progresso da lição ativa (para exibir a barra de progresso, por exemplo)
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </>
  );
};
