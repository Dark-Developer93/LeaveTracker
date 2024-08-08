import Link from "next/link";
import React from "react";
import { AuthForm } from "./AuthForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import Image from "next/image";

const AuthComponent = (): JSX.Element => {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">RC Portal</h1>
            <p className="text-balance text-muted-foreground">
              login to your Portal account using your RC email
            </p>
          </div>
          <div className="grid gap-4">
            <AuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to RemoteCoders{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/RemoteCoders-logo_RGB-2048x505.png.webp"
          alt="Image"
          width={250}
          height={250}
          className="h-full w-full object-scale-down dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>

    // <div className="min-h-screen flex items-center justify-center">
    //   <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    //     <Card className="mx-auto max-w-sm">
    //       <CardHeader>
    //         <CardTitle className="text-2xl">RC Portal</CardTitle>
    //         <CardDescription>
    //           login to your Portal account using your RC email
    //         </CardDescription>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="grid gap-4">
    //           <AuthForm />
    //           <p className="px-8 text-center text-sm text-muted-foreground">
    //             By clicking continue, you agree to RemoteCoders{" "}
    //             <Link
    //               href="/terms"
    //               className="underline underline-offset-4 hover:text-primary"
    //             >
    //               Terms of Service
    //             </Link>{" "}
    //             and{" "}
    //             <Link
    //               href="/privacy"
    //               className="underline underline-offset-4 hover:text-primary"
    //             >
    //               Privacy Policy
    //             </Link>
    //             .
    //           </p>
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </div>
    // </div>
  );
};

export default AuthComponent;
