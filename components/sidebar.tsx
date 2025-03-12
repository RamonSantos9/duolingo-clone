import Link from "next/link";
import Image from "next/image";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";
import { Loader } from "lucide-react";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" width={160} height={50} alt="mascot" />
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem
          label="Aprender"
          href="/learn"
          iconSrc="icons/aprender.svg"
          size="lg"
        />
        <SidebarItem
          label="Ligas"
          href="/leaderboard"
          iconSrc="icons/ligas.svg"
          size="lg"
        />
        <SidebarItem
          label="Missões"
          href="/quests"
          iconSrc="icons/missoes.svg"
          size="lg"
        />
        <SidebarItem
          label="Sons"
          href="/characters"
          iconSrc="icons/sons.svg"
          size="lg"
        />
        <SidebarItem
          label="Shop"
          href="/shop"
          iconSrc="icons/loja.svg"
          size="lg"
        />
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>
      </div>
    </div>
  );
};
