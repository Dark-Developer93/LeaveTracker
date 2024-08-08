"use client";

import { signOut } from "next-auth/react";
import { TbLogout2 } from "react-icons/tb";

const LogoutBtn = () => {
  return (
    <button
      className="p-1 bg-primary text-white rounded-full dark:bg-primary"
      onClick={(e) => {
        e.preventDefault();
        signOut({ callbackUrl: "/" });
      }}
    >
      <TbLogout2 size={24} />
    </button>
  );
};

export default LogoutBtn;
