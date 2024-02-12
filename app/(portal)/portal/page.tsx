import React from "react";
import { User } from "@prisma/client";
import WelcomeBanner from "./WelcomeBanner";
import { getCurrentUser } from "@/lib/session";

const Portal = async () => {
  const user = await getCurrentUser();
  return (
    <>
      <WelcomeBanner user={user as User} />
    </>
  );
};

export default Portal;
