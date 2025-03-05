import { MobileFooter } from "@/components/mobile-footer";
import { Sidebar } from "@/components/sidebar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <MobileFooter />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px] h-full lg:pt-5">
        <div className="max-w-[1056px] mx-auto h-full">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
