"use client";

import { signOut } from "next-auth/react";
import { TbLogout } from "react-icons/tb";
import { Button } from "@/components/ui/button";

const LogoutBtn = () => {
  return (
    <Button
      title="Logout"
      variant="outline"
      onClick={(e) => {
        e.preventDefault();
        signOut({ callbackUrl: "/" });
      }}
    >
      <TbLogout size={24} />
    </Button>
  );
};

export default LogoutBtn;
