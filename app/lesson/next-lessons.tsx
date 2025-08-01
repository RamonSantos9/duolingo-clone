"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Crown, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Lesson = {
  id: number;
  title: string;
  order: number;
  completed: boolean;
};

type Unit = {
  id: number;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
};

type Props = {
  currentLessonId: number;
};

// Configuração de cores por seção
const sectionColors: Record<
  number,
  {
    primary: string;
    secondary: string;
    hover: string;
    border: string;
    text: string;
    textSecondary: string;
    icon: string;
    separator: string;
  }
> = {
  1: {
    primary: "from-green-400 to-green-600",
    secondary: "from-green-50 to-green-100",
    hover: "from-green-100 to-green-200",
    border: "border-green-200",
    text: "text-green-700",
    textSecondary: "text-green-600",
    icon: "from-green-500 to-green-600",
    separator: "from-green-400 to-green-500",
  },
  2: {
    primary: "from-blue-400 to-blue-600",
    secondary: "from-blue-50 to-blue-100",
    hover: "from-blue-100 to-blue-200",
    border: "border-blue-200",
    text: "text-blue-700",
    textSecondary: "text-blue-600",
    icon: "from-blue-500 to-blue-600",
    separator: "from-blue-400 to-blue-500",
  },
  3: {
    primary: "from-purple-400 to-purple-600",
    secondary: "from-purple-50 to-purple-100",
    hover: "from-purple-100 to-purple-200",
    border: "border-purple-200",
    text: "text-purple-700",
    textSecondary: "text-purple-600",
    icon: "from-purple-500 to-purple-600",
    separator: "from-purple-400 to-purple-500",
  },
  4: {
    primary: "from-orange-400 to-orange-600",
    secondary: "from-orange-50 to-orange-100",
    hover: "from-orange-100 to-orange-200",
    border: "border-orange-200",
    text: "text-orange-700",
    textSecondary: "text-orange-600",
    icon: "from-orange-500 to-orange-600",
    separator: "from-orange-400 to-orange-500",
  },
  5: {
    primary: "from-pink-400 to-pink-600",
    secondary: "from-pink-50 to-pink-100",
    hover: "from-pink-100 to-pink-200",
    border: "border-pink-200",
    text: "text-pink-700",
    textSecondary: "text-pink-600",
    icon: "from-pink-500 to-pink-600",
    separator: "from-pink-400 to-pink-500",
  },
};

export const NextLessons = ({ currentLessonId }: Props) => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch("/api/units");
        if (response.ok) {
          const data = await response.json();
          setUnits(data);
        }
      } catch (error) {
        console.error("Erro ao buscar unidades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
        <p className="text-neutral-600 mt-2">Carregando próximas lições...</p>
      </div>
    );
  }

  // Agrupar unidades por seção
  const sections = units.reduce((acc: Record<number, Unit[]>, unit: Unit) => {
    const sectionNumber = Math.ceil(unit.order / 2); // Cada seção tem 2 unidades
    if (!acc[sectionNumber]) {
      acc[sectionNumber] = [];
    }
    acc[sectionNumber].push(unit);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-neutral-700 mb-2">
          Continue sua jornada
        </h2>
        <p className="text-lg text-neutral-600 mb-8">
          Escolha sua próxima lição para continuar aprendendo
        </p>
      </div>

      {Object.entries(sections).map(([sectionNum, sectionUnits]) => {
        const sectionNumber = parseInt(sectionNum);
        const colors = sectionColors[sectionNumber] || sectionColors[1];

        return (
          <div key={sectionNum} className="space-y-6">
            {/* Cabeçalho da seção */}
            <div className="text-center">
              <h3 className="text-xl lg:text-2xl font-bold text-neutral-700 mb-2">
                Seção {sectionNum}
              </h3>
              <div
                className={cn(
                  "w-24 h-1 bg-gradient-to-r mx-auto rounded-full",
                  colors.separator
                )}
              ></div>
            </div>

            {/* Unidades da seção */}
            {sectionUnits.map((unit) => (
              <div
                key={unit.id}
                className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-200 p-6 lg:p-8"
              >
                {/* Banner da unidade */}
                <div className="text-center mb-8">
                  <div
                    className={cn(
                      "inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br rounded-full mb-4",
                      colors.primary
                    )}
                  >
                    <span className="text-white font-bold text-xl">
                      {unit.order}
                    </span>
                  </div>
                  <h4 className="text-lg lg:text-xl font-bold text-neutral-700 mb-2">
                    {unit.title}
                  </h4>
                  <p className="text-neutral-600 max-w-2xl mx-auto">
                    {unit.description}
                  </p>
                </div>

                {/* Lições da unidade */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {unit.lessons.map((lesson, index) => {
                    const isCompleted = lesson.completed;
                    const isCurrent = lesson.id === currentLessonId;
                    const isNext =
                      !isCompleted &&
                      !isCurrent &&
                      unit.lessons.slice(0, index).every((l) => l.completed);

                    // Seleciona o ícone com base no estado da lição
                    const Icon = isCompleted ? Check : isNext ? Crown : Star;

                    return (
                      <Link
                        key={lesson.id}
                        href={isCompleted ? `/lesson/${lesson.id}` : "/lesson"}
                        className={cn(
                          "group block p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-105",
                          isCompleted &&
                            cn(
                              "bg-gradient-to-br hover:from-green-100 hover:to-green-200",
                              colors.secondary,
                              colors.border
                            ),
                          isNext &&
                            "border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200",
                          !isCompleted &&
                            !isNext &&
                            "border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200"
                        )}
                      >
                        <div className="text-center">
                          <div
                            className={cn(
                              "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110",
                              isCompleted && colors.icon,
                              isNext &&
                                "bg-gradient-to-br from-blue-500 to-blue-600",
                              !isCompleted &&
                                !isNext &&
                                "bg-gradient-to-br from-gray-400 to-gray-500"
                            )}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>

                          <div className="space-y-1">
                            <p
                              className={cn(
                                "font-bold text-sm",
                                isCompleted && colors.text,
                                isNext && "text-blue-700",
                                !isCompleted && !isNext && "text-gray-600"
                              )}
                            >
                              Lição {lesson.order}
                            </p>
                            <p
                              className={cn(
                                "text-xs font-medium",
                                isCompleted && colors.textSecondary,
                                isNext && "text-blue-600",
                                !isCompleted && !isNext && "text-gray-500"
                              )}
                            >
                              {lesson.title}
                            </p>
                          </div>

                          {isNext && (
                            <div className="mt-2">
                              <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                                Próxima
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
