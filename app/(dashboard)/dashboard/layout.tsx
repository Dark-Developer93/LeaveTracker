import Header from "@/components/Common/Header";
import SideBar from "@/components/Common/SideBar";

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="min-h-screen bg-slate-100 dark:bg-black">
        <SideBar />
        <div className="sm:ml-[6rem]">
          <Header />
          {children}
        </div>
      </div>
    </section>
  );
}
