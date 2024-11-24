"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Calendar, Moon, Sun } from "lucide-react";

export default function PrivacyPolicy() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4 sm:px-6 lg:px-8">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Calendar className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">
                Leave Tracker
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="outline" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              At Leave Tracker App, we are committed to protecting your privacy
              and ensuring the security of your personal information. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              2. Information We Collect
            </h2>
            <p className="mb-4">
              We collect information that you provide directly to us, such as
              when you create an account, submit a leave request, or contact our
              support team. This may include:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>Name and contact information</li>
              <li>Employment details</li>
              <li>Leave request information</li>
              <li>Communication records with our support team</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              3. How We Use Your Information
            </h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-8 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and manage leave requests</li>
              <li>Communicate with you about our services</li>
              <li>Respond to your inquiries and support needs</li>
              <li>Analyze usage patterns and improve user experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              4. Data Sharing and Disclosure
            </h2>
            <p className="mb-4">
              We do not sell your personal information. We may share your
              information in the following circumstances:
            </p>
            <ul className="list-disc pl-8 mb-4">
              <li>
                With your employer, as necessary for leave management purposes
              </li>
              <li>With service providers who assist in our operations</li>
              <li>To comply with legal obligations</li>
              <li>
                In connection with a merger, sale, or acquisition of our company
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized or unlawful
              processing, accidental loss, destruction, or damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding
              your personal information, including the right to access, correct,
              or delete your data. To exercise these rights, please contact us
              using the information provided below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              7. Changes to This Policy
            </h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the &ldquo;Last Updated&rdquo; date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please
              contact us at privacy@leavetracker.com.
            </p>
          </section>

          <p className="text-sm text-muted-foreground">
            Last Updated: June 15, 2023
          </p>
        </div>
      </main>

      <footer className="w-full border-t py-6 bg-background">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 Leave Tracker App. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="/terms"
            >
              Terms of Service
            </Link>
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="/privacy"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
