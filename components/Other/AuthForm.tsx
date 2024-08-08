"use client";

import { Icons } from "@/components/Other/icons";
import { Button } from "@/components/ui/button";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export const AuthForm = (): JSX.Element => {
  const [providers, setProviders] = useState<
    Record<string, ClientSafeProvider>
  >({});

  useEffect(() => {
    async function getProvidersValue() {
      const res = await getProviders();
      setProviders(res as Record<string, ClientSafeProvider>);
    }
    getProvidersValue();
  }, []);

  return (
    <div className="grid gap-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs-uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Continue with
          </span>
        </div>
      </div>

      {Object.keys(providers).length === 0 ? (
        <Skeleton className="h-10 w-[350px]" />
      ) : (
        Object.values(providers).map((provider) => (
          <Button
            key={provider.name}
            variant="outline"
            type="button"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: "/portal",
                // redirect: false
              })
            }
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Login with Google
          </Button>
        ))
      )}
    </div>
  );
};
