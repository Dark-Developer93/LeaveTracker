"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Calendar,
  Users,
  Table,
  PieChart,
  CheckSquare,
  Moon,
  Sun,
  Menu,
} from "lucide-react";
import toast from "react-hot-toast";

export default function LandingPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/email/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error(`Failed to send message. Please try again. ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Calendar className="h-6 w-6" />
              <span className="font-bold">Leave Tracker</span>
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-end space-x-4">
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#features">Features</Link>
              <Link href="#team">Team</Link>
              <Link href="#testimonials">Testimonials</Link>
              <Link href="#contact">Contact</Link>
              {/* <Button asChild>
              <Link href="/login">Log in</Link>
              </Button> */}
              <Button asChild variant="outline">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/login">Sign up</Link>
              </Button>
              <Button variant="outline" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </nav>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col space-y-4">
                    <Link href="#features">Features</Link>
                    <Link href="#team">Team</Link>
                    <Link href="#testimonials">Testimonials</Link>
                    <Link href="#contact">Contact</Link>
                    {/* <Button asChild>
              <Link href="/login">Log in</Link>
              </Button> */}
                    <Button asChild variant="outline">
                      <Link href="/login">Log in</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/login">Sign up</Link>
                    </Button>
                    <Button variant="outline" size="icon" onClick={toggleTheme}>
                      {theme === "dark" ? (
                        <Sun className="h-[1.2rem] w-[1.2rem]" />
                      ) : (
                        <Moon className="h-[1.2rem] w-[1.2rem]" />
                      )}
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Simplify Your Leave Management
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Streamline your organization&apos;s leave tracking process
                  with our intuitive and powerful Leave Tracker App.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <CheckSquare className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-lg font-bold mb-2">
                    Leave Request Submission
                  </h3>
                  <p className="text-center text-muted-foreground">
                    Easy-to-use interface for submitting leave requests
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <Users className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-lg font-bold mb-2">
                    Supervisor Approval
                  </h3>
                  <p className="text-center text-muted-foreground">
                    Streamlined approval process for supervisors
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <Calendar className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-lg font-bold mb-2">
                    Calendar Integration
                  </h3>
                  <p className="text-center text-muted-foreground">
                    Sync leaves with your favorite calendar apps
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <Table className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-lg font-bold mb-2">
                    Detailed Leave Breakdown
                  </h3>
                  <p className="text-center text-muted-foreground">
                    Comprehensive tables for leave history and status
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <PieChart className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-lg font-bold mb-2">Balance Tracking</h3>
                  <p className="text-center text-muted-foreground">
                    Real-time tracking of different leave type balances
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="team" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((member) => (
                <Card key={member}>
                  <CardContent className="flex flex-col items-center p-6">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt={`Team member ${member}`}
                      width={100}
                      height={100}
                      className="rounded-full mb-4"
                    />
                    <h3 className="text-lg font-bold mb-2">
                      Team Member {member}
                    </h3>
                    <p className="text-center text-muted-foreground">
                      Position
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Testimonials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((testimonial) => (
                <Card key={testimonial}>
                  <CardContent className="p-6">
                    <p className="mb-4 italic">
                      &ldquo;The Leave Tracker App has revolutionized our leave
                      management process. It&apos;s intuitive, efficient, and
                      has saved us countless hours.&rdquo;
                    </p>
                    <p className="font-bold">- Happy Customer {testimonial}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Contact Us
            </h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Textarea
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 bg-background">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8 px-4">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 Leave Tracker App. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="/terms"
              target="_blank"
            >
              Terms of Service
            </Link>
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="/privacy"
              target="_blank"
            >
              Privacy & Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
