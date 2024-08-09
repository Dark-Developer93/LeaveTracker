"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import toast from "react-hot-toast";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { IoCalendarOutline } from "react-icons/io5";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface EventFormProps {
  mode: "add" | "update";
  initialState?: {
    id: string;
    title: string;
    description: string;
    startDate: Date;
  };
}

const EventForm = ({ mode, initialState }: EventFormProps) => {
  const router = useRouter();

  const formSchema = z.object({
    title: z
      .string({
        required_error: "Please add a Title.",
      })
      .max(500),

    description: z.string({
      required_error: "Please add a Description.",
    }),

    startDate: z.date({
      required_error: "A start date is required.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialState || {
      title: "",
      description: "",
      startDate: new Date(),
    },
  });

  console.log("initialState", initialState);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formattedValues = {
        ...values,
        startDate: values.startDate.toISOString(),
      };

      const endpoint = mode === "add" ? "/api/event" : "/api/event/eventId";
      const method = mode === "add" ? "POST" : "PATCH";

      const res = await fetch(endpoint, {
        method,
        body: JSON.stringify(formattedValues),
      });

      if (res.ok) {
        toast.success(mode === "add" ? "Event Added" : "Event Updated", {
          duration: 4000,
        });
        form.reset();
        router.refresh();
      } else {
        const errorMessage = await res.text();

        toast.error(`An error occured ${errorMessage}`, { duration: 6000 });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error(`An Unexpected error occured ${error}`);
    }
  }

  return (
    <div className=" bg-white p-4 rounded-md shadow-md dark:bg-black">
      <h2 className="text-2xl text-center font-bold tracking-tight">
        {mode === "add" ? "Add an Event" : "Update an Event"}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>Add a title to the event.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormDescription>
                  Describe briefly the Event details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "  inline-flex justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <IoCalendarOutline className=" h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{mode === "add" ? "Submit" : "Update"}</Button>
        </form>
      </Form>
    </div>
  );
};

export default EventForm;
