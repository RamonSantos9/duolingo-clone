import { redirect } from "next/navigation";
import Image from "next/image";
import { getUserProgress, getUserSubscription } from "@/db/queries";

import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Items } from "./items";
import { Promo } from "@/app/components/promo";
import { Quests } from "@/app/components/quests";

const shopPage = async () => {
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
            hasActiveSubscription={!!userSubscription?.isActive}
          />
          {!isPro && <Promo />}
          <Quests points={userProgress.points} />
        </StickyWrapper>
      </div>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/icons/loja.svg" alt="loja" height={90} width={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Loja
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Gaste seus pontos em coisas legais.
          </p>
          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
          />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default shopPage;
