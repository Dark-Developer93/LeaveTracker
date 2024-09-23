import Image from "next/image";
import { TiThMenu } from "react-icons/ti";
import { User } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { RenderRoutes } from "./RenderRoutes";
import { AdminRoutes, ModeratorRoutes, UserRoutes } from "./Routes";

type SideBarDrawerProps = {
  user: User;
};

const SideBarDrawer = ({ user }: SideBarDrawerProps) => {
  const adminRouter = () => {
    return <>{RenderRoutes({ routes: AdminRoutes })}</>;
  };

  const userRouter = () => {
    return <>{RenderRoutes({ routes: UserRoutes })}</>;
  };

  const moderatorRouter = () => {
    return <>{RenderRoutes({ routes: ModeratorRoutes })}</>;
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="p-2 text-primary border-primary rounded-full hover:text-white hover:bg-primary"
        >
          <TiThMenu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col justify-between w-52">
        <div>
          <div className="flex mt-3 justify-center">
            <Image src="/logo.png" width={50} height={50} alt="logo" />
          </div>
          <nav className="flex flex-col items-center px-3 py-4 overflow-y-auto">
            {user?.role === "ADMIN" && adminRouter()}
            {user?.role === "USER" && userRouter()}
            {user?.role === "MODERATOR" && moderatorRouter()}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideBarDrawer;
