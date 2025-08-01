import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { Progress } from "@/components/ui/progress";
import { Promo } from "@/app/components/promo";

const quests = [
  {
    title: "Ganhe 20 XP",
    value: 20,
  },
  {
    title: "Ganhe 50 XP",
    value: 50,
  },
  {
    title: "Ganhe 100 XP",
    value: 100,
  },
  {
    title: "Ganhe 500 XP",
    value: 500,
  },
  {
    title: "Ganhe 1000 XP",
    value: 1000,
  },
];

const QuestsPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-col lg:flex-row-reverse px-4">
      <div className="block lg:hidden sticky top-0 z-20 bg-white py-2">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          gems={userProgress.gems}
          hasActiveSubscription={!!userSubscription?.isActive}
        />
      </div>
      <div className="hidden lg:block">
        <StickyWrapper>
          <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            gems={userProgress.gems}
            hasActiveSubscription={isPro}
          />
          {!isPro && <Promo />}
        </StickyWrapper>
      </div>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src="/icons/missoes.svg"
            alt="Missões"
            height={90}
            width={90}
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Missões
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Complete missões ganhando pontos
          </p>
        </div>
        <ul className="w-full">
          {quests.map((quest) => {
            const progress = (userProgress.points / quest.value) * 100;

            return (
              <div
                className="flex items-center w-full p-4 gap-x-4 border-t-2"
                key={quest.title}
              >
                <Image
                  src="/icons/points.svg"
                  alt="points"
                  width={60}
                  height={60}
                />
                <div className="flex flex-col gap-y-2 w-full">
                  <p className="text-neutral-700 text-xl font-bold">
                    {quest.title}
                  </p>
                  <Progress value={progress} className="h-3" />
                </div>
              </div>
            );
          })}
        </ul>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
