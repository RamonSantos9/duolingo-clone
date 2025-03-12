import { redirect } from "next/navigation";

import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";

import { Unit } from "./unit";
import { lessons, units as unitsSchema } from "@/db/schema";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const unitsData = getUnits();
  const userSubscriptionData = getUserSubscription();

  // Aguarda todas as promises serem resolvidas
  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
    userSubscription,
  ] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  if (!courseProgress) {
    redirect("/courses");
  }

  return (
    // Em desktop, a ordem é invertida (feed à esquerda e UserProgress à direita)
    <div className="flex flex-col lg:flex-row-reverse px-4">
      {/*
        Mobile: UserProgress fixado no topo.
        Em telas maiores (lg), esse componente é oculto.
      */}
      <div className="block lg:hidden sticky top-0 z-20 bg-white py-2">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          gems={userProgress.gems}
          hasActiveSubscription={!!userSubscription?.isActive}
        />
      </div>

      {/*
        Desktop: Sidebar com UserProgress à direita,
        usando StickyWrapper para fixação.
      */}
      <div className="hidden lg:block">
        <StickyWrapper>
          <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            gems={userProgress.gems}
            hasActiveSubscription={false}
          />
        </StickyWrapper>
      </div>

      {/*
        Área principal de conteúdo (FeedWrapper).
        Em desktop, o Header é exibido no feed.
      */}
      <FeedWrapper>
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={
                courseProgress.activeLesson as
                  | (typeof lessons.$inferSelect & {
                      unit: typeof unitsSchema.$inferSelect;
                    })
                  | undefined
              }
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
