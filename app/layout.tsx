import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import Provider from "./Provider";

export const metadata: Metadata = {
  title: "LeaveTracker",
  description: "...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <Provider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
