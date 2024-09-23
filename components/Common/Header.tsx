"use client";

import { useState } from "react";
// import { PiBellRingingDuotone } from "react-icons/pi";
import { BiSolidChevronDown } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import Container from "./Container";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SideBarDrawer from "./SideBarDrawer";
import ToggleDarkLight from "./ToggleDarkLight";
import LogoutBtn from "./LogoutBtn";
import DialogWrapper from "./DialogWrapper";

type HeaderProps = {
  user: User;
};

const Header = ({ user }: HeaderProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <header className=" z-10 bg-white rounded-md shadow-sm dark:bg-black dark:border-b ">
        <nav className="p-4 transition-all ">
          <div className="flex flex-wrap justify-between items-center mx-8 ">
            {/* LEFT SIDE */}
            <div className="flex justify-start items-center">
              {" "}
              <SideBarDrawer user={user} />{" "}
            </div>

            {/* RIGHT SIDE  */}

            <div className="flex items-center space-x-3 md:space-x-6">
              {/* TODO: add a notification component */}
              {/* <button className="p-2 bg-blue-100 rounded-full text-blue-500">
                <PiBellRingingDuotone size={28} />
              </button> */}
              <Avatar>
                <AvatarImage src={user?.image as string} alt="user image" />
                <AvatarFallback>
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className=" text-slate-500 dark:text-slate-300"
                  >
                    <BiSolidChevronDown size={22} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* TODO: Create the Profile Page */}
                  <DropdownMenuItem className="hover:underline cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <DialogWrapper
                      linkTitle="Support"
                      title="Support Dialog"
                      description=" This is the support dialog"
                      isLink
                      open={open}
                      setOpen={() => setOpen(!open)}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <p>
                        Please for any issue contact us by sending an email to{" "}
                        <a
                          className="text-slate-500 dark:text-muted-foregroun"
                          href="mailto:Test@gmail.com"
                        >
                          test@gmail.com
                        </a>
                      </p>
                    </DialogWrapper>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <div className="flex items-center gap-3 justify-center py-2.5 ">
                    <LogoutBtn />
                    <ToggleDarkLight />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
